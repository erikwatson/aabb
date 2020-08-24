!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){const{game:r,graphics:o,keyboard:i,mouse:l,vec2:a}=n(1),c=document.querySelector(".bramble-view"),u=800,s=800;function d(e,t){if(0==e.velocity.x&&0==e.velocity.y)return!1;const n=a.clone(e.position);n.add(e.velocity);return function(e,t){const n=a.create(e.from.x,e.from.y),r=a.create(e.to.x,e.to.y);let o=a.clone(r);o.subtract(n);const i=1/o.x,l=1/o.y;let c={x:(t.x-e.from.x)*i,y:(t.y-e.from.y)*l},u={x:(t.x+t.width-e.from.x)*i,y:(t.y+t.height-e.from.y)*l};if(isNaN(c.x)||isNaN(c.y))return!1;if(isNaN(u.x)||isNaN(u.y))return!1;let s={...c},d={...u};if(s.x>d.x&&(c.x=d.x,u.x=s.x),s={...c},d={...u},s.y>d.y&&(c.y=d.y,u.y=s.y),c.x>u.y||c.y>u.x)return!1;const f=Math.max(c.x,c.y),b=Math.min(u.x,u.y);if(b<0)return!1;if(f>1)return!1;if(f<0)return!1;let h=a.create(0,0);return c.x>c.y?i<0?(h.x=1,h.y=0):(h.x=-1,h.y=0):c.x<c.y&&(l<0?(h.x=0,h.y=1):(h.x=0,h.y=-1)),{normal:h,near:a.create(n.x+f*o.x,n.y+f*o.y),far:a.create(n.x+b*o.x,n.y+b*o.y),timeOfCollision:f}}({from:e.position,to:n},{x:t.position.x-e.width,y:t.position.y-e.height,width:t.width+e.width,height:t.height+e.height})}r.attachTo(c);const f={position:a.create(100,400),velocity:a.create(0,0),width:50,height:50,maxSpeed:8},b=[{position:{x:100,y:500},width:600,height:10}];for(let e=0;e<50;e++)b.push({position:{x:75*e,y:750},width:75,height:32});const h={gravity:a.create(0,15)},p={highlights:[]};r.setUpdate(()=>{f.velocity.add(h.gravity),i.left.pressed&&(f.velocity.x=-f.maxSpeed),i.right.pressed&&(f.velocity.x=f.maxSpeed),i.right.pressed||i.left.pressed||(f.velocity.x=0),i.space.pressed&&(f.velocity.y-=20),p.highlights=[],b.forEach(e=>{const t=d(f,e);if(t){const n=t.normal;n.multiply(a.create(Math.abs(f.velocity.x),Math.abs(f.velocity.y))),n.multiplyScalar(1-t.timeOfCollision),f.velocity.add(n),p.highlights.push(e)}}),f.position.add(f.velocity)}),r.setRender(()=>{o.clear("#cccccc"),b.forEach(e=>{o.rect(e.position.x,e.position.y,e.width,e.height)}),p.highlights.forEach(e=>{o.rect(e.position.x,e.position.y,e.width,e.height,{fill:{color:"red",opacity:1},line:{width:2,color:"black"}})}),o.rect(f.position.x,f.position.y,f.width,f.height)}),r.setSize(u,s),r.setSmoothing(!1),r.start()},function(e,t,n){var r;window,r=function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/js/",n(n.s="./src/bramble.js")}({"./src/assets.js":
/*!***********************!*\
  !*** ./src/assets.js ***!
  \***********************/
/*! exports provided: loadText, loadAllText, loadJson, loadAllJson, loadImage, loadAllImages, loadSound, loadAllSounds, loadMusic, loadAllMusic, loadTerrain, loadAllTerrain, default */function(e,t,n){"use strict";n.r(t),n.d(t,"loadText",(function(){return l})),n.d(t,"loadAllText",(function(){return a})),n.d(t,"loadJson",(function(){return c})),n.d(t,"loadAllJson",(function(){return u})),n.d(t,"loadImage",(function(){return s})),n.d(t,"loadAllImages",(function(){return d})),n.d(t,"loadSound",(function(){return f})),n.d(t,"loadAllSounds",(function(){return b})),n.d(t,"loadMusic",(function(){return h})),n.d(t,"loadAllMusic",(function(){return p})),n.d(t,"loadTerrain",(function(){return v})),n.d(t,"loadAllTerrain",(function(){return y}));var r=n(/*! ./terrain */"./src/terrain.js"),o=n(/*! ./sound */"./src/sound.js");function i(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"text";return new Promise((function(n,r){var o=new XMLHttpRequest;o.responseType=t,o.addEventListener("load",(function(e){switch(t){case"text":n(e.target.responseText);break;case"json":n(e.target.response);break;default:console.error("invalid type provided to load: ".concat(t," is unknown"))}})),o.addEventListener("error",(function(e){r(e)})),o.open("GET",e,!0),o.send()}))}function l(e){return i(e,"text")}function a(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return Promise.all(e.map((function(e){return i(e,"text")})))}function c(e){return i(e,"json")}function u(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return Promise.all(e.map((function(e){return i(e,"json")})))}function s(e){return new Promise((function(t,n){var r=new Image;r.addEventListener("load",(function(e){t(r)})),r.addEventListener("error",(function(e){n(e)})),r.src=e}))}function d(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return Promise.all(e.map((function(e){return s(e)})))}function f(e){return new Promise((function(t,n){window.fetch(e).then((function(e){return e.arrayBuffer()})).then((function(e){return o.default.decode(e)})).then((function(e){return t(e)})).catch((function(e){return n(e)}))}))}function b(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return Promise.all(e.map((function(e){return f(e)})))}function h(e){return new Promise((function(e,t){}))}function p(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return Promise.all(e.map((function(e){return h()})))}function v(e){var t=null;return c(e).then((function(e){return s((t=e).path)})).then((function(e){return r.default.create(t.name,t.type,e,t.tiles)})).catch((function(e){console.error(e)}))}function y(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return Promise.all(e.map((function(e){return v(e)})))}t.default={loadText:l,loadJson:c,loadImage:s,loadAllText:a,loadAllImages:d,loadSound:f,loadAllSounds:b,loadTerrain:v,loadAllTerrain:y}},"./src/bramble.js":
/*!************************!*\
  !*** ./src/bramble.js ***!
  \************************/
/*! exports provided: assets, game, grid, graphics, keyboard, mouse, music, sfx, sprite, textbox, sound, vec2 */function(e,t,n){"use strict";n.r(t);var r=n(/*! ./assets */"./src/assets.js");n.d(t,"assets",(function(){return r.default}));var o=n(/*! ./game */"./src/game.js");n.d(t,"game",(function(){return o.default}));var i=n(/*! ./grid */"./src/grid.js"),l=n.n(i);n.d(t,"grid",(function(){return l.a}));var a=n(/*! ./graphics */"./src/graphics.js");n.d(t,"graphics",(function(){return a.default}));var c=n(/*! ./input */"./src/input.js");n.d(t,"keyboard",(function(){return c.keyboard})),n.d(t,"mouse",(function(){return c.mouse}));var u=n(/*! ./music */"./src/music.js");n.d(t,"music",(function(){return u.default}));var s=n(/*! ./sfx */"./src/sfx.js");n.d(t,"sfx",(function(){return s.default}));var d=n(/*! ./sprite */"./src/sprite.js");n.d(t,"sprite",(function(){return d.default}));var f=n(/*! ./textbox */"./src/textbox.js");n.d(t,"textbox",(function(){return f.default}));var b=n(/*! ./sound */"./src/sound.js");n.d(t,"sound",(function(){return b.default}));var h=n(/*! ./vec2 */"./src/vec2.js");n.d(t,"vec2",(function(){return h.default}))},"./src/canvas.js":
/*!***********************!*\
  !*** ./src/canvas.js ***!
  \***********************/
/*! exports provided: canvas, default */function(e,t,n){"use strict";n.r(t),n.d(t,"canvas",(function(){return o}));var r=n(/*! ./graphics */"./src/graphics.js"),o=document.createElement("canvas");o.id="bramble-game";var i=o.getContext("2d");t.default={element:o,setSize:function(e,t){o.width=e,o.height=t},attachTo:function(e){e.appendChild(o),r.default.setContext(i)},setSmoothing:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];i.imageSmoothingEnabled=e},disableContextMenu:function(){o.addEventListener("contextmenu",(function(e){e.preventDefault()}))}}},"./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */function(e,t,n){"use strict";n.r(t);var r=n(/*! ./canvas */"./src/canvas.js"),o=n(/*! ./graphics */"./src/graphics.js"),i=n(/*! ./input */"./src/input.js"),l="#000000",a=null,c=null;function u(){a&&a(1/60),c&&(o.default.clear(l),c()),i.default.update(),window.requestAnimationFrame(u)}t.default={setSize:r.default.setSize,setUpdate:function(e){a=e},setRender:function(e){c=e},setBackgroundColor:function(e){l=e},attachTo:r.default.attachTo,disableContextMenu:r.default.disableContextMenu,setSmoothing:r.default.setSmoothing,start:function(){i.default.start(),window.requestAnimationFrame(u)}}},"./src/graphics.js":
/*!*************************!*\
  !*** ./src/graphics.js ***!
  \*************************/
/*! exports provided: default */function(e,t,n){"use strict";n.r(t);var r=n(/*! ./number */"./src/number.js");function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var i=null,l={fill:{color:"#ffffff",opacity:1},line:{width:2,color:"#000000",opacity:1}};function a(e,t,n,r){var o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:l;void 0!==o.fill&&(i.fillStyle=o.fill.color,i.fillRect(e,t,n,r)),void 0!==o.line&&(i.strokeStyle=o.line.color,i.lineWidth=o.line.width,i.strokeRect(e,t,n,r))}var c={width:2,color:"#000000"},u={fill:{color:"#000000",opacity:1},line:{color:"#ffffff",opacity:1,width:2}};function s(e,t,n,r,o){i.drawImage(o,e,t,n,r)}function d(e,t,n,r,o,l,a,c,u){i.drawImage(u,o,l,a,c,e,t,n,r)}var f={shadowColor:"#000000",shadowBlur:6,shadowOffsetX:4,shadowOffsetY:4};t.default={circle:function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:u;void 0!==r.fill&&(i.fillStyle=r.fill.color),i.beginPath(),i.strokeStyle=r.line.color,i.lineWidth=r.line.width,i.arc(e,t,n,0,2*Math.PI),i.closePath(),void 0!==r.fill&&i.fill(),i.stroke()},clear:function(e){a(0,0,i.canvas.width,i.canvas.height,{fill:{color:e}})},image:s,line:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:c;i.strokeStyle=n.color,i.lineWidth=n.width,i.beginPath(),i.moveTo(e.x,e.y),i.lineTo(t.x,t.y),i.stroke()},rect:a,getContext:function(){return i},setContext:function(e){i=e},sprite:function(e){var t=e.width/2,n=e.height/2;i.save(),i.translate(e.x+t,e.y+n),i.rotate(r.default.toRadians(e.rotation)),e.frames.length>1?d(-t,-n,e.width,e.height,e.frames[e.frame].x,e.frames[e.frame].y,e.frames[e.frame].width,e.frames[e.frame].height,e.texture):s(-t,-n,e.width,e.height,e.texture),i.restore()},square:function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:l;a(e,t,n,n,r)},subImage:d,text:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"#000000",o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"16pt sans-serif";i.fillStyle=r,i.font=o,i.textAlign="left",i.textBaseline="top",i.fillText(n,e,t)},textbox:function(e){i.fillStyle="#ffffff",i.font="16pt sans-serif",i.textAlign="left",i.textBaseline="top",i.measureText(e.text).width>e.width&&(e.text=e.text.substr(0,10)+"\n"+e.text.substr(10)),i.fillText(e.text,e.x,e.y)},tiles:function(e,t,n,r,i,l,a){for(var c=1,u=2,s=4,f=8,b=16,h=32,p=64,v=128,y=function(l){for(var a=function(o){if(0===n[l][o])return"continue";var a=l>0?n[l-1][o-1]:0,y=l>0?n[l-1][o]:0,g=l>0?n[l-1][o+1]:0,m=n[l][o-1],x=n[l][o],j=n[l][o+1],w=l<n.length-1?n[l+1][o-1]:0,O=l<n.length-1?n[l+1][o]:0,P=l<n.length-1?n[l+1][o+1]:0,S=c*(x===y&&x===m&&x===a?1:0)+u*(x===y?1:0)+s*(x===y&&x===j&&x===g?1:0)+f*(x===j?1:0)+b*(x===O&&x===j&&x===P?1:0)+h*(x===O?1:0)+p*(x===O&&x===m&&x===w?1:0)+v*(x===m?1:0),k=r.filter((function(e){return e.type===n[l][o]}))[0];if(!k)return console.error("Sheet ".concat(n[l][o]," not found!")),{v:{v:void 0}};var M=k.tiles.filter((function(e){return e.type===S})),T=M[Math.floor(Math.random()*M.length)];T?function(e,t,n,r,o,i,l,a,c,u){d(e+a*(r*c),t+a*(o*u),a*c,a*u,c*i,u*l,c,u,n)}(e,t,k.image,o,l,T.position.x,T.position.y,i,T.size.width,T.size.height):console.log("Tile not defined ".concat(S))},y=0;y<n[l].length;y++){var g=a(y);if("continue"!==g&&"object"===o(g))return g.v}},g=0;g<n.length;g++){var m=y(g);if("object"===o(m))return m.v}},shadow:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:f;i.save(),i.shadowColor=t.shadowColor,i.shadowBlur=t.shadowBlur,i.shadowOffsetX=t.shadowOffsetX,i.shadowOffsetY=t.shadowOffsetY,e(),i.restore()},dodge:function(e){i.save(),i.globalCompositeOperation="color-dodge",e(),i.restore()},overlay:function(e){i.save(),i.globalCompositeOperation="overlay",e(),i.restore()},transparency:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:.25;i.save(),i.globalAlpha=t,e(),i.restore()}}},"./src/grid.js":
/*!*********************!*\
  !*** ./src/grid.js ***!
  \*********************/
/*! no static exports found */function(e,t){function n(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function r(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r=[],o=0;o<t;o++){for(var i=[],l=0;l<e;l++)i.push(n);r.push(i)}return r}function l(e){return e.map((function(e){return e.slice()}))}var a={pos:{x:0,y:0},visible:!0,divisions:4,tileWidth:8,tileHeight:8,scale:1};e.exports={create:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:a;n=r(r({},a),n);var o=i(e,t,0),l={x:n.pos.x,y:n.pos.y},c=n.visible,u=n.divisions,s=n.tileWidth,d=n.tileHeight,f=n.tileWidth,b=n.scale;return{divisions:u,pos:l,tileHeight:d,tiles:o,tileWidth:s,visible:c,width:e,height:t,tileSize:f,scale:b}},fill:function(e,t,n,r){var o=l(e);return function e(t,n,r){n!==r&&o[t.y][t.x]===n&&t.x<o[t.y].length&&t.x>=0&&t.y<o.length&&t.y>=0&&(o[t.y][t.x]=r,t.y<o.length-1&&e({x:t.x,y:t.y+1},n,r),t.y>0&&e({x:t.x,y:t.y-1},n,r),t.x<o[0].length-1&&e({x:t.x+1,y:t.y},n,r),t.x>0&&e({x:t.x-1,y:t.y},n,r))}(t,n,r),o},copyTiles:l}},"./src/input.js":
/*!**********************!*\
  !*** ./src/input.js ***!
  \**********************/
/*! exports provided: keyboard, mouse, default */function(e,t,n){"use strict";n.r(t),n.d(t,"keyboard",(function(){return i})),n.d(t,"mouse",(function(){return l}));var r=n(/*! ./input/keyboard */"./src/input/keyboard.js"),o=n(/*! ./input/mouse */"./src/input/mouse.js"),i=r.default.state,l=o.default.state;t.default={start:function(){r.default.start(),o.default.start()},update:function(){r.default.update(),o.default.update()}}},"./src/input/keyboard.js":
/*!*******************************!*\
  !*** ./src/input/keyboard.js ***!
  \*******************************/
/*! exports provided: default */function(e,t,n){"use strict";n.r(t),n(/*! ../canvas */"./src/canvas.js");var r=n(/*! ./keys */"./src/input/keys.js");function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var a=function(){var e={pressed:!1,justPressed:!1,released:!1,justReleased:!1};return r.default.reduce((function(t,n){var r=n.label;return delete n.label,t[r]=i(i({},n),e),t}),{})}();function c(e,t){for(var n=null,r=Object.keys(t),o=0;o<r.length;o++)t[r[o]].code===e.keyCode&&(n=t[r[o]]);return n}function u(e){!function(e){["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)&&e.preventDefault()}(e),c(e,a).pressed=!0}function s(e){c(e,a).pressed=!1}t.default={start:function(){document.addEventListener("keydown",u),document.addEventListener("keyup",s)},update:function(){},state:a}},"./src/input/keys.js":
/*!***************************!*\
  !*** ./src/input/keys.js ***!
  \***************************/
/*! exports provided: default */function(e,t,n){"use strict";n.r(t),t.default=[{code:8,label:"backspace"},{code:9,label:"tab"},{code:13,label:"enter"},{code:16,label:"shift"},{code:17,label:"ctrl"},{code:18,label:"alt"},{code:20,label:"caps"},{code:27,label:"escape"},{code:32,label:"space"},{code:33,label:"pageUp"},{code:34,label:"pageDown"},{code:35,label:"end"},{code:36,label:"home"},{code:37,label:"left"},{code:38,label:"up"},{code:39,label:"right"},{code:40,label:"down"},{code:45,label:"insert"},{code:46,label:"delete"},{code:48,label:"zero"},{code:49,label:"one"},{code:50,label:"two"},{code:51,label:"three"},{code:52,label:"four"},{code:53,label:"five"},{code:54,label:"six"},{code:55,label:"seven"},{code:56,label:"eight"},{code:57,label:"nine"},{code:65,label:"A"},{code:66,label:"B"},{code:67,label:"C"},{code:68,label:"D"},{code:69,label:"E"},{code:70,label:"F"},{code:71,label:"G"},{code:72,label:"H"},{code:73,label:"I"},{code:74,label:"J"},{code:75,label:"K"},{code:76,label:"L"},{code:77,label:"M"},{code:78,label:"N"},{code:79,label:"O"},{code:80,label:"P"},{code:81,label:"Q"},{code:82,label:"R"},{code:83,label:"S"},{code:84,label:"T"},{code:85,label:"U"},{code:86,label:"V"},{code:87,label:"W"},{code:88,label:"X"},{code:89,label:"Y"},{code:90,label:"Z"},{code:91,label:"superLeft"},{code:92,label:"superRight"},{code:93,label:"select"},{code:96,label:"num0"},{code:97,label:"num1"},{code:98,label:"num2"},{code:99,label:"num3"},{code:100,label:"num4"},{code:101,label:"num5"},{code:102,label:"num6"},{code:103,label:"num7"},{code:104,label:"num8"},{code:105,label:"num9"},{code:106,label:"multiply"},{code:107,label:"add"},{code:109,label:"subtract"},{code:110,label:"point"},{code:111,label:"divide"},{code:112,label:"F1"},{code:113,label:"F2"},{code:114,label:"F3"},{code:115,label:"F4"},{code:116,label:"F5"},{code:117,label:"F6"},{code:118,label:"F7"},{code:119,label:"F8"},{code:120,label:"F9"},{code:121,label:"F10"},{code:122,label:"F11"},{code:123,label:"F12"},{code:144,label:"numLock"},{code:145,label:"scrollLock"},{code:186,label:"semiColon"},{code:187,label:"equals"},{code:188,label:"comma"},{code:189,label:"dash"},{code:190,label:"dot"},{code:191,label:"forewardSlash"},{code:192,label:"graveAccent"},{code:219,label:"openBracket"},{code:220,label:"backSlash"},{code:221,label:"closeBracket"},{code:222,label:"singleQuote"}]},"./src/input/mouse.js":
/*!****************************!*\
  !*** ./src/input/mouse.js ***!
  \****************************/
/*! exports provided: default */function(e,t,n){"use strict";n.r(t);var r=n(/*! ../canvas */"./src/canvas.js");function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}c();var a=c();function c(){return{x:0,y:0,left:{pressed:!1,justPressed:!1,released:!1,justReleased:!1},wheel:i(i({},{pressed:!1,justPressed:!1,released:!1,justReleased:!1}),{},{moved:!1}),right:{pressed:!1,justPressed:!1,released:!1,justReleased:!1}}}function u(e){var t=function(e,t){var n=r.canvas.getBoundingClientRect();return{x:e.clientX-n.left,y:e.clientY-n.top}}(e,r.canvas);a.x=t.x,a.y=t.y}function s(e){switch(e.which){case 1:a.left.pressed=!0;break;case 2:a.middle.pressed=!0;break;case 3:a.right.pressed=!0}}function d(e){switch(e.which){case 1:a.left.pressed=!1;break;case 2:a.middle.pressed=!1;break;case 3:a.right.pressed=!1}}function f(e){a.wheel.moved=0!==e.delta,!1!==a.wheel.moved&&(a.wheel.direction=e.deltaY<0?"up":"down")}t.default={start:function(){r.canvas.addEventListener("mousemove",u),r.canvas.addEventListener("mousedown",s),r.canvas.addEventListener("mouseup",d),r.canvas.addEventListener("wheel",f),a.x=r.canvas.width/2,a.y=r.canvas.height/2},update:function(){var e;a.wheel.moved=!1,e=a,Object.assign({},e)},state:a}},"./src/music.js":
/*!**********************!*\
  !*** ./src/music.js ***!
  \**********************/
/*! exports provided: default */function(e,t,n){"use strict";n.r(t),n(/*! ./sound */"./src/sound.js"),t.default={}},"./src/number.js":
/*!***********************!*\
  !*** ./src/number.js ***!
  \***********************/
/*! exports provided: toRadians, toDegrees, default */function(e,t,n){"use strict";function r(e){return e*(Math.PI/180)}function o(e){return e*(180/Math.PI)}n.r(t),n.d(t,"toRadians",(function(){return r})),n.d(t,"toDegrees",(function(){return o})),t.default={toRadians:r,toDegrees:o}},"./src/sfx.js":
/*!********************!*\
  !*** ./src/sfx.js ***!
  \********************/
/*! exports provided: default */function(e,t,n){"use strict";n.r(t),n(/*! ./sound */"./src/sound.js"),t.default={}},"./src/sound.js":
/*!**********************!*\
  !*** ./src/sound.js ***!
  \**********************/
/*! exports provided: default */function(e,t,n){"use strict";n.r(t);var r=new AudioContext;r.createOscillator(),r.createGain(),t.default={decode:function(e){return new Promise((function(t,n){r.decodeAudioData(e).then((function(e){return t(e)})).catch((function(e){return n(e)}))}))},play:function(e){var t=r.createBufferSource();t.buffer=e,t.connect(r.destination),t.start()}}},"./src/sprite.js":
/*!***********************!*\
  !*** ./src/sprite.js ***!
  \***********************/
/*! exports provided: default */function(e,t,n){"use strict";function r(e,t){for(var n in t)(i=t[n]).configurable=i.enumerable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,n,i);if(Object.getOwnPropertySymbols)for(var r=Object.getOwnPropertySymbols(t),o=0;o<r.length;o++){var i,l=r[o];(i=t[l]).configurable=i.enumerable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,l,i)}return e}n.r(t),t.default={create:function(){var e,t,n,o,i,l,a,c,u=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,d=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,f=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,b=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,h=arguments.length>5&&void 0!==arguments[5]?arguments[5]:null,p=arguments.length>6&&void 0!==arguments[6]?arguments[6]:"#ffffff",v=[];return a={x:u,y:s,width:d,height:f,rotation:b,texture:h,color:p,frame:0,setFrames:function(e){v=e},addFrame:function(e){v.push(e)},get frames(){return v}},(c={})[e="x"]=c[e]||{},c[e].get=function(){return u},c[t="x"]=c[t]||{},c[t].set=function(e){u=e},c[n="y"]=c[n]||{},c[n].get=function(){return s},c[o="y"]=c[o]||{},c[o].set=function(e){s=e},c[i="rotation"]=c[i]||{},c[i].get=function(){return b},c[l="rotation"]=c[l]||{},c[l].set=function(e){b=e>=360?360-e:e},r(a,c),a}}},"./src/terrain.js":
/*!************************!*\
  !*** ./src/terrain.js ***!
  \************************/
/*! exports provided: default */function(e,t,n){"use strict";n.r(t),t.default={create:function(e,t,n,r){return{name:e,type:t,image:n,tiles:r}}}},"./src/textbox.js":
/*!************************!*\
  !*** ./src/textbox.js ***!
  \************************/
/*! exports provided: default */function(e,t,n){"use strict";n.r(t),t.default={create:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:100,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:50,o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"";return{x:e,y:t,width:n,height:r,text:o}}}},"./src/vec2.js":
/*!*********************!*\
  !*** ./src/vec2.js ***!
  \*********************/
/*! exports provided: default */function(e,t,n){"use strict";function r(e,t){var n=e,i=t,l=function(){return Math.sqrt(n*n+i*i)},a=function(e){n*=e,i*=e},c=function(){var e=l();n/=e,i/=e};return{add:function(e){n+=e.x,i+=e.y},addScalar:function(e){n+=e,i+=e},clone:o,divide:function(e){n/=e.x,i/=e.y},divideScalar:function(e){n/=e,i/=e},dot:function(e){return n*e.x+i*e.y},getLength:l,getOpposite:function(e){return r(-e.x,-e.y)},getPerp:function(){return r(-i,n)},isEqualTo:function(e){return n==e.x&&i==e.y},multiply:function(e){n*=e.x,i*=e.y},multiplyScalar:a,normalise:c,setLength:function(e){c(),a(e)},subtract:function(e){n-=e.x,i-=e.y},subtractScalar:function(e){n-=e,i-=e},set x(e){n=e},get x(){return n},set y(e){i=e},get y(){return i}}}n.r(t);var o=function(e){return r(e.x,e.y)};t.default={clone:o,create:r,fromDegrees:function(e){var t=e*(Math.PI/180);return r(Math.cos(t),Math.sin(t))}}}})},e.exports=r()}]);