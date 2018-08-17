parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"HUaJ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const o=exports.log=console.log.bind(console),e=exports.random=function(o,e){return o+Math.floor(Math.random()*(e-o+1))};
},{}],"Qf6V":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});class e{constructor(e,t){this.x=e,this.y=t}}exports.default=e;
},{}],"sAMS":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});class t{constructor(t){void 0===t?(this.x=0,this.y=0):(this.x=t.x,this.y=t.y)}getMagnitude(){return Math.sqrt(this.x**2+this.y**2)}add(e){const r=new t;return r.x=this.x+e.x,r.y=this.y+e.y,r}subtract(e){const r=new t;return r.x=this.x-e.x,r.y=this.y-e.y,r}dotProduct(t){return this.x*t.x+this.y*t.y}edge(t){return this.subtract(t)}perpendicular(){const e=new t;return e.x=this.y,e.y=0-this.x,e}normalize(){const e=new t(0,0),r=this.getMagnitude();return 0!==r&&(e.x=this.x/r,e.y=this.y/r),e}normal(){return this.perpendicular().normalize()}}exports.default=t;
},{}],"HTKg":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("../vector/vector"),e=n(t);function n(t){return t&&t.__esModule?t:{default:t}}class s{constructor(t){if(t.length<=0)throw new Error("need points");this.points=t}getAxes(){const t=this.points.length;if(t<=0)throw new Error("need points");const n=[],s=new e.default,o=new e.default;for(let e=0;e<t-1;e++){const t=this.points[e];s.x=t.x,s.y=t.y;const i=this.points[e+1];o.x=i.x,o.y=i.y,n.push(s.edge(o).normal())}return s.x=this.points[t-1].x,s.y=this.points[t-1].y,o.x=this.points[0].x,o.y=this.points[0].y,n.push(s.edge(o).normal()),n}getprojectionRangeOnAxis(t){const e=this.getAllprojectionOnAxis(t);if(e.length>0){const t={max:e[0],min:e[0]};return e.forEach(e=>{e<t.min&&(t.min=e),e>t.max&&(t.max=e)}),t}return null}getAllprojectionOnAxis(t){const n=[];return this.points.forEach(s=>{n.push(new e.default(s).dotProduct(t))}),n}isCollideOnAxes(t,e){for(let n=0;n<t.length;n++){const s=t[n],o=this.getprojectionRangeOnAxis(s),i=e.getprojectionRangeOnAxis(s);if(o.max<i.min||o.min>i.max)return!1}return!0}isCollideWithOther(t){const e=this.getAxes().concat(t.getAxes());return this.isCollideOnAxes(e,t)}}exports.default=s;
},{"../vector/vector":"sAMS"}],"Q+Kw":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("../shape/point"),e=h(t),i=require("../shape/polygon"),s=h(i);function h(t){return t&&t.__esModule?t:{default:t}}class r{constructor(t,e){this.game=t,this.x=e.x,this.y=e.y,this.width=e.width,this.height=e.height,this.speedX=2}isDead(){return this.x<0}isInGame(){return this.x>0&&this.x<this.game.canvas.width}update(){this.x-=this.speedX}getPolygon(){return new s.default([new e.default(this.x,this.y),new e.default(this.x+this.width,this.y),new e.default(this.x+this.width/2,this.y-this.height)])}render(){if(this.isInGame()){const{context:t}=this.game;t.save(),t.beginPath(),t.moveTo(this.x,this.y),t.lineTo(this.x+this.width,this.y),t.lineTo(this.x+this.width/2,this.y-this.height),t.closePath(),t.stroke(),t.restore()}}}exports.default=r;
},{"../shape/point":"Qf6V","../shape/polygon":"HTKg"}],"s9ZZ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=exports.GAME_STATUS={RUNNING:"running",PAUSE:"pause",DEAD:"dead"},s=exports.PLAYER_STATUS={JUMPING:"jumping",SLIDING:"sliding"};
},{}],"iXnD":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("../utils/utils"),s=require("../obj/obstacle"),e=a(s),i=require("../constant/constant");function a(t){return t&&t.__esModule?t:{default:t}}class n{constructor(t){this.canvas=document.querySelector(t),this.context=this.canvas.getContext("2d"),this.actions=[],this.obstacles=[],this.score=0,document.addEventListener("keydown",t=>{this.actions[t.code]&&this.actions[t.code].forEach(t=>{t()})})}registerAction(t,s){this.actions[t]?this.actions[t].push(s):this.actions[t]=[s]}addPlayer(t){this.player=t}addObstacle(t){t.isDead()||this.obstacles.push(t)}restart(){this.score=0,this.obstacles=[],this.start()}start(){this.status=i.GAME_STATUS.RUNNING,this.run()}generateObstacle(){const{obstacles:s}=this,i=new e.default(this,{x:this.canvas.width,y:450,width:15,height:20});if(s.length>0){const e=s[s.length-1],a=(0,t.random)(60,300);i.x=e.x+a,this.addObstacle(i)}else this.addObstacle(i)}run(){this.id=window.requestAnimationFrame(()=>this.run()),(0,t.log)("running"),this.status===i.GAME_STATUS.RUNNING?(this.generateObstacle(),this.update(),this.render()):this.status===i.GAME_STATUS.DEAD&&window.cancelAnimationFrame(this.id)}update(){const{obstacles:t,player:s}=this;s.update();for(let s=0;s<t.length;s++)t[s].update();const e=t[0];s.x+Math.sqrt(s.width**2+s.height**2)>=e.x&&s.isCollideWithObstacle(e)?this.over():this.score+=1}over(){this.status=i.GAME_STATUS.DEAD}toggle(){this.status===i.GAME_STATUS.PAUSE?this.continueGame():this.status===i.GAME_STATUS.RUNNING&&this.pause()}pause(){this.status=i.GAME_STATUS.PAUSE}continueGame(){this.status=i.GAME_STATUS.RUNNING}renderObstacles(){for(let t=0;t<this.obstacles.length;t++){const s=this.obstacles[t];s.isDead()?(this.obstacles.splice(t,1),t-=1):s.render()}}renderScore(){const{context:t}=this;t.font="24px serif",t.fillText(`distance: ${this.score}`,600,50)}renderGameOver(){const{context:t}=this;t.font="30px serif",t.fillText("Game Over ! ",this.canvas.width/2,this.canvas.height/2)}render(){const{canvas:t,context:s}=this;s.clearRect(0,0,t.width,t.height),s.textBaseline="middle",s.textAlign="center",this.renderScore(),this.status===i.GAME_STATUS.DEAD&&this.renderGameOver(),s.beginPath(),s.moveTo(0,450),s.lineTo(t.width,450),s.stroke(),this.player.render(),this.renderObstacles()}}exports.default=n;
},{"../utils/utils":"HUaJ","../obj/obstacle":"Q+Kw","../constant/constant":"s9ZZ"}],"sG76":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("../constant/constant"),i=require("../shape/point"),e=o(i),s=require("../shape/polygon"),h=o(s);function o(t){return t&&t.__esModule?t:{default:t}}class n{constructor(i,e){this.x=e.x,this.y=e.y,this.positionY=e.y,this.width=e.width,this.height=e.height,this.angle=0,this.speedY=0,this.speedAngle=15*Math.PI/180,this.game=i,this.maxY=this.positionY-100,this.speedVelocity=1,this.status=t.PLAYER_STATUS.SLIDING,i.registerAction("Space",()=>{this.game.status===t.GAME_STATUS.RUNNING&&this.jump()})}isCollideWithLine(){return this.y>this.positionY}isCollideWithMaxHeight(){return this.y<=this.maxY}isCollideWithObstacle(t){return this.getPolygon().isCollideWithOther(t.getPolygon())}getPolygon(){return new h.default([new e.default(this.x,this.y),new e.default(this.x,this.y+this.height),new e.default(this.x+this.width,this.y+this.height),new e.default(this.x+this.width,this.y)])}jump(){this.isJumping()||(this.status=t.PLAYER_STATUS.JUMPING,this.speedY=-15)}isJumping(){return this.status===t.PLAYER_STATUS.JUMPING}revertSpeed(){this.y=this.positionY,this.angle=0,this.status=t.PLAYER_STATUS.SLIDING}update(){this.status===t.PLAYER_STATUS.JUMPING&&(this.moveY(),this.rotate(),this.isCollideWithLine()&&this.revertSpeed())}moveY(){const t=this;t.y+=t.speedY,t.speedY+=t.speedVelocity,t.isCollideWithLine()&&(t.speedY*=-1)}rotate(){this.angle+=this.speedAngle}render(){const{context:t}=this.game;t.save(),t.translate(this.x+this.width/2,this.y+this.height/2),t.rotate(this.angle),t.strokeRect(this.width/-2,this.height/-2,this.width,this.height),t.restore()}}exports.default=n;
},{"../constant/constant":"s9ZZ","../shape/point":"Qf6V","../shape/polygon":"HTKg"}],"d6sW":[function(require,module,exports) {
"use strict";var e=require("./game/game"),t=s(e),a=require("./obj/player"),r=s(a),n=require("./constant/constant");function s(e){return e&&e.__esModule?e:{default:e}}function u(){const e=new t.default("#canvas"),a=new r.default(e,{x:100,y:429,width:20,height:20});e.addPlayer(a),e.registerAction("Space",()=>{e.status===n.GAME_STATUS.DEAD&&(e.addPlayer(a),e.restart())}),e.start()}u();
},{"./game/game":"iXnD","./obj/player":"sG76","./constant/constant":"s9ZZ"}]},{},["d6sW"], null)
//# sourceMappingURL=main.17a87eb4.map