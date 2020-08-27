const { game, graphics, keyboard, mouse, vec2 } = require('@erikwatson/bramble')
const sortBy = require('lodash.sortby')

const container = document.querySelector('.bramble-view')

const debug = {
  highlights: [],
  expandedBounds: []
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
    // console.log('timeNear is NaN', timeNear.x, timeNear.y)
    return false
  }

  if (isNaN(timeFar.x) || isNaN(timeFar.y)) {
    // console.log('timeFar is NaN', timeFar.x, timeFar.y)
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
  } else if (timeNear.x === timeNear.y) {
    // console.log(invdir.x, invdir.y)
    if (invdir.x < 0 && invdir.y < 0) {
      console.log('tl')
      normal.x = -1
      normal.y = 1
    } else if (invdir.x > 0 && invdir.y < 0) {
      console.log('tr')
      normal.x = 1
      normal.y = 1
    } else if (invdir.x < 0 && invdir.y > 0) {
      console.log('bl')
      normal.x = -1
      normal.y = -1
    } else if (invdir.x > 0 && invdir.y > 0) {
      console.log('br')
      normal.x = 1
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

  const halfWidth = dynamicRect.width / 2
  const halfHeight = dynamicRect.height / 2

  const clone = vec2.clone(dynamicRect.position)
  clone.add(dynamicRect.velocity)
  clone.x += dynamicRect.width / 2
  clone.y += dynamicRect.height / 2

  const line = {
    from: {
      x: dynamicRect.position.x + halfWidth,
      y: dynamicRect.position.y + halfHeight
    },
    to: clone
  }

  const rect = {
    x: staticRect.position.x - halfWidth,
    y: staticRect.position.y - halfHeight,
    width: staticRect.width + dynamicRect.width,
    height: staticRect.height + dynamicRect.height
  }

  if (gameProps.debug) {
    debug.expandedBounds.push(rect)
  }

  const result = lineVsRect(line, rect)
  return result
}

game.attachTo(container)

const player = {
  position: vec2.create(104, 200),
  velocity: vec2.create(0, 0),
  width: 32,
  height: 50,
  maxSpeed: 8,
  inAir: false,
  againstWall: false
}

const walls = []
const tileSize = 32

const widthInTiles = Math.round(gameProps.width / tileSize)
const heightInTiles = Math.round(gameProps.height / tileSize)

const third = Math.round(heightInTiles / 3)
const quarter = Math.round(heightInTiles / 4)

for (let y = 0; y < quarter; y++) {
  for (let x = 0; x < widthInTiles; x ++) {

    if (Math.random() > 0.99) {
      walls.push({
        position: {
          x: x * tileSize,
          y: y * tileSize
        },
        width: tileSize,
        height: tileSize
      })
    }
  }
}

for (let y = quarter; y < quarter * 2; y++) {
  for (let x = 0; x < widthInTiles; x ++) {

    if (Math.random() > 0.95) {
      walls.push({
        position: {
          x: x * tileSize,
          y: y * tileSize
        },
        width: tileSize,
        height: tileSize
      })
    }
  }
}

for (let y = quarter * 2; y < quarter * 3; y++) {
  for (let x = 0; x < widthInTiles; x ++) {

    if (Math.random() > 0.9) {
      walls.push({
        position: {
          x: x * tileSize,
          y: y * tileSize,
        },
        width: tileSize,
        height: tileSize
      })
    }
  }
}

for (let y = quarter * 3; y < quarter * 4; y++) {
  for (let x = 0; x < widthInTiles; x ++) {

    if (Math.random() > 0.1) {
      walls.push({
        position: {
          x: x * tileSize,
          y: y * tileSize,
        },
        width: tileSize,
        height: tileSize
      })
    }
  }
}

const world = {
  gravity: vec2.create(0, 3)
}



game.setUpdate(() => {
  player.velocity.add(world.gravity)

  if (keyboard.left.pressed) {
    player.velocity.x = -player.maxSpeed
  }

  if (keyboard.right.pressed) {
    player.velocity.x = player.maxSpeed
  }

  if (!keyboard.right.pressed && !keyboard.left.pressed) {
    player.velocity.x = 0
  }

  if (player.inAir === false) {
    if (keyboard.space.pressed) {
      player.velocity.y -= 32
      player.inAir = true
    }
  }

  if (gameProps.debug) {
    debug.highlights = []
    debug.expandedBounds = []
  }

  debug.projection = {
    position: vec2.clone(player.position),
    width: player.width,
    height: player.height
  }

  debug.projection.position.add(player.velocity)

  const collisionCandidatesUnsorted = walls
    .filter(wall => wall) // just do it on all of them for now
    .map(wall => {
      return {
        wall,
        collision: dynamicRectVsStaticRect(player, wall)
      }
    })
    .filter(result => result.collision !== false)

    const collisionCandidates = sortBy(collisionCandidatesUnsorted, o => {
      o.timeOfCollision
    })

  if (gameProps.debug) {
    collisionCandidates.forEach(({ wall, collision }) => {
      debug.highlights.push(wall)
    })
  }

  let collided = false
  let againstWall = false

  collisionCandidates.forEach(({ wall, collision }) => {
    const collisionClone = dynamicRectVsStaticRect(player, wall)

    if (collisionClone === false) {
      return
    }

    const toAdd = vec2.clone(collisionClone.normal)

    toAdd.multiply(vec2.create(
      Math.abs(player.velocity.x),
      Math.abs(player.velocity.y)
    ))

    toAdd.multiplyScalar(1 - (collisionClone.timeOfCollision))

    player.velocity.add(toAdd)

    if (collision.normal.y === -1 && collisionClone.normal.x === 0) {
      collided = true
    }
  })

  if (collided) {
    player.inAir = false
  } else {
    player.inAir = true
  }

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

  if (gameProps.debug) {
    debug.highlights.forEach((wall, i) => {
      const color = (i === 0) ? 'green' : 'red'

      graphics.rect(
        wall.position.x,
        wall.position.y,
        wall.width,
        wall.height,
        {
          fill: {
            color,
            opacity: 1
          },
          line: {
            width: 2,
            color: 'black'
          }
        })
      }
    )
  }


  graphics.rect(
    player.position.x,
    player.position.y,
    player.width,
    player.height,
    {
      fill: {
        color: 'aqua',
        opacity: 1
      },
      line: {
        width: 2,
        color: 'black'
      }
    }
  )

  if (gameProps.debug) {
    graphics.rect(
      debug.projection.position.x,
      debug.projection.position.y,
      debug.projection.width,
      debug.projection.height,
      {
        line: {
          width: 2,
          color: 'yellow'
        }
      }
    )

    debug.expandedBounds.forEach(rect => {
      graphics.rect(
        rect.x,
        rect.y,
        rect.width,
        rect.height,
        {
          line: {
            width: 2,
            color: 'purple'
          }
        }
      )
    })
  }
})

game.setSize(gameProps.width, gameProps.height)
game.setSmoothing(false)
game.start()

const debugCheckbox = document.querySelector('#debug')
debugCheckbox.addEventListener('change', e => {
  gameProps.debug = !gameProps.debug
})