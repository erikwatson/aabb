const { game, graphics, keyboard, mouse, vec2 } = require('@erikwatson/bramble')

const container = document.querySelector('.bramble-view')

const gameProps = {
  width: 800,
  height: 800
}

// works
function pointVsRect (point, rect) {
  return point.x >= rect.x &&
    point.y >= rect.y &&
    point.x < rect.x + rect.width &&
    point.y < rect.y + rect.height
}

// works
function rectVsRect (rectA, rectB) {
  return rectA.x < rectB.x + rectB.width &&
    rectA.x + rectA.width > rectB.x &&
    rectA.y < rectB.y + rectB.height &&
    rectA.y + rectA.height > rectB.y
}

// works
// returns false if no collision occurred, otherwise it returns an object
// containing the results of the collision
// { near, far, normal }
function lineVsRect (line, rect) {
  const from = vec2.create(line.from.x, line.from.y)
  const to = vec2.create(line.to.x, line.to.y)

  let dir = vec2.clone(to)
  dir.subtract(from)

  const invdir = {
    x: 1.0 / dir.x,
    y: 1.0 / dir.y
  }

  let timeNear = {
    x: (rect.x - line.from.x) * invdir.x,
    y: (rect.y - line.from.y) * invdir.y
  }

  let timeFar = {
    x: (rect.x + rect.width - line.from.x) * invdir.x,
    y: (rect.y + rect.height - line.from.y) * invdir.y
  }

  if (isNaN(timeNear.x) || isNaN(timeNear.y)) {
    console.log('timeNear is NaN', timeNear.x, timeNear.y)
    return false
  }

  if (isNaN(timeFar.x) || isNaN(timeFar.y)) {
    console.log('timeFar is NaN', timeFar.x, timeFar.y)
    return false
  }

  // sort the distances
  let tempNear = { ...timeNear }
  let tempFar = { ...timeFar }

  if (tempNear.x > tempFar.x) {
    timeNear.x = tempFar.x
    timeFar.x = tempNear.x
  }

  tempNear = { ...timeNear }
  tempFar = { ...timeFar }

  if (tempNear.y > tempFar.y) {
    timeNear.y = tempFar.y
    timeFar.y = tempNear.y
  }

  // no collision detected
  if (timeNear.x > timeFar.y || timeNear.y > timeFar.x) {
    return false
  }

  const hitNear = Math.max(timeNear.x, timeNear.y)
  const hitFar = Math.min(timeFar.x, timeFar.y)

  // abort if ray is facing away from our object
  if (hitFar < 0) {
    return false
  }

  // abort if the ray does not reach the object
  if (hitNear > 1) {
    return false
  }

  // abort if the ray's first collision is behind us
  if (hitNear < 0) {
    return false
  }

  // construct a vector to hold the normal of the surface
  let normal = vec2.create(0, 0)

  if (timeNear.x > timeNear.y) {
    if (invdir.x < 0) {
      normal.x = 1
      normal.y = 0
    } else {
      normal.x = -1
      normal.y = 0
    }
  } else if (timeNear.x < timeNear.y) {
    if (invdir.y < 0) {
      normal.x = 0
      normal.y = 1
    } else {
      normal.x = 0
      normal.y = -1
    }
  }

  // collided with the object!
  return {
    normal,
    near: vec2.create(
      from.x + hitNear * dir.x,
      from.y + hitNear * dir.y
    ),
    far: vec2.create(
      from.x + hitFar * dir.x,
      from.y + hitFar * dir.y
    ),
    timeOfCollision: hitNear
  }
}

// a dynamic rect is one that can move - has a velocity
// static rect doesn't move
function dynamicRectVsStaticRect (dynamicRect, staticRect) {
  // assume no collision if the dynamic rect is not moving
  // avoiding using length here because it calculates a square root
  if (dynamicRect.velocity.x == 0 && dynamicRect.velocity.y == 0) {
    return false
  }

  const clone = vec2.clone(dynamicRect.position)
  clone.add(dynamicRect.velocity)

  const line = {
    from: dynamicRect.position,
    to: clone
  }

  const rect = {
    x: staticRect.position.x - dynamicRect.width,
    y: staticRect.position.y - dynamicRect.height,
    width: staticRect.width + dynamicRect.width,
    height: staticRect.height + dynamicRect.height
  }

  const result = lineVsRect(line, rect)
  return result
}

game.attachTo(container)

const player = {
  position: vec2.create(100, 400),
  velocity: vec2.create(0, 0),
  width: 50,
  height: 50,
  maxSpeed: 8
}

const walls = [
  {
    position: vec2.create(400 - 50, 100),
    width: 100,
    height: 600
  },

  {
    position: vec2.create(100, 350),
    width: 600,
    height: 100
  },

  {
    position: vec2.create(200, 200),
    width: 100,
    height: 300
  }
]

game.setUpdate(() => {
  if (keyboard.left.pressed) {
    player.velocity.x = -player.maxSpeed
  }

  if (keyboard.right.pressed) {
    player.velocity.x = player.maxSpeed
  }

  if (!keyboard.right.pressed && !keyboard.left.pressed) {
    player.velocity.x = 0
  }

  if (keyboard.up.pressed) {
    player.velocity.y = -player.maxSpeed
  }

  if (keyboard.down.pressed) {
    player.velocity.y = player.maxSpeed
  }

  if (!keyboard.down.pressed && !keyboard.up.pressed) {
    player.velocity.y = 0
  }

  walls.forEach(wall => {
    const result = dynamicRectVsStaticRect(player, wall)

    if (result) {
      const toAdd = result.normal

      toAdd.multiply(vec2.create(
        Math.abs(player.velocity.x),
        Math.abs(player.velocity.y)
      ))

      toAdd.multiplyScalar(1 - (result.timeOfCollision))

      player.velocity.add(toAdd)
    }
  })

  player.position.add(player.velocity)
})

game.setRender(() => {
  graphics.clear('#cccccc')

  walls.forEach(wall => {
    graphics.rect(
      wall.position.x,
      wall.position.y,
      wall.width,
      wall.height
    )
  })

  graphics.rect(
    player.position.x,
    player.position.y,
    player.width,
    player.height
  )
})

game.setSize(gameProps.width, gameProps.height)
game.setSmoothing(false)
game.start()