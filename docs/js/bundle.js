!function(o){var t={};function r(e){if(t[e])return t[e].exports;var s=t[e]={i:e,l:!1,exports:{}};return o[e].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=o,r.c=t,r.d=function(o,t,e){r.o(o,t)||Object.defineProperty(o,t,{enumerable:!0,get:e})},r.r=function(o){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(o,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(o,"__esModule",{value:!0})},r.t=function(o,t){if(1&t&&(o=r(o)),8&t)return o;if(4&t&&"object"==typeof o&&o&&o.__esModule)return o;var e=Object.create(null);if(r.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:o}),2&t&&"string"!=typeof o)for(var s in o)r.d(e,s,function(t){return o[t]}.bind(null,s));return e},r.n=function(o){var t=o&&o.__esModule?function(){return o.default}:function(){return o};return r.d(t,"a",t),t},r.o=function(o,t){return Object.prototype.hasOwnProperty.call(o,t)},r.p="",r(r.s=1)}([function(o,t,r){},function(o,t,r){"use strict";r.r(t);r(0);let e=10,s=20,a=4,c=9,n=[700,500,450,350,300,250,200,150,100,50],l=400;const i=["I","J","L","O","S","T","Z"],u=[100,300,700,1500],w=1e3,d=10;let h=0,m=1,f={},g=!1;var F=class{constructor(o){this.type=o,this.stop=!1,this.startPos=e/2,this.currentFrame=1,this.className="cell--"+this.type}get getCoordinates(){return this.coordinates}set setCoordinates(o){this.coordinates=o}move(o){switch(o){case"UP":this.setCoordinates=this.getCoordinates.map(o=>({row:o.row-1,col:o.col}));break;case"LEFT":this.setCoordinates=this.getCoordinates.map(o=>({row:o.row,col:o.col-1}));break;case"RIGHT":this.setCoordinates=this.getCoordinates.map(o=>({row:o.row,col:o.col+1}));break;case"DOWN":default:this.setCoordinates=this.getCoordinates.map(o=>({row:o.row+1,col:o.col}))}}stopMoving(){this.stop=!0}};var C=[class extends F{constructor(){super(i[0]),this.defaultFrame=[{row:0,col:this.startPos-2},{row:0,col:this.startPos-1},{row:0,col:this.startPos},{row:0,col:this.startPos+1}],this.setCoordinates=this.defaultFrame}changeFrame(){2===this.currentFrame?this.currentFrame=1:this.currentFrame++}getFrame1Coords(){const o=this.getCoordinates;return[{row:o[0].row+1,col:o[0].col-1},{row:o[1].row,col:o[1].col},{row:o[2].row-1,col:o[2].col+1},{row:o[3].row-2,col:o[3].col+2}]}getFrame2Coords(){const o=this.getCoordinates;return[{row:o[0].row-1,col:o[0].col+1},{row:o[1].row,col:o[1].col},{row:o[2].row+1,col:o[2].col-1},{row:o[3].row+2,col:o[3].col-2}]}rotate(o){let t=[];switch(this.currentFrame){case 1:t=this.getFrame2Coords();break;case 2:t=this.getFrame1Coords();break;default:t=this.defaultFrame}if(o)return t;this.changeFrame(),this.setCoordinates=t}},class extends F{constructor(){super(i[1]),this.defaultFrame=[{row:0,col:this.startPos-1},{row:1,col:this.startPos-1},{row:1,col:this.startPos},{row:1,col:this.startPos+1}],this.setCoordinates=this.defaultFrame}changeFrame(){4===this.currentFrame?this.currentFrame=1:this.currentFrame++}getFrame1Coords(){const o=this.getCoordinates;return[{row:o[0].row,col:o[0].col-1},{row:o[1].row+1,col:o[1].col},{row:o[2].row,col:o[2].col+1},{row:o[3].row-1,col:o[3].col+2}]}getFrame2Coords(){const o=this.getCoordinates;return[{row:o[0].row+2,col:o[0].col},{row:o[1].row+1,col:o[1].col+1},{row:o[2].row,col:o[2].col},{row:o[3].row-1,col:o[3].col-1}]}getFrame3Coords(){const o=this.getCoordinates;return[{row:o[0].row-1,col:o[0].col+2},{row:o[1].row-2,col:o[1].col+1},{row:o[2].row-1,col:o[2].col},{row:o[3].row,col:o[3].col-1}]}getFrame4Coords(){const o=this.getCoordinates;return[{row:o[0].row-1,col:o[0].col-1},{row:o[1].row,col:o[1].col-2},{row:o[2].row+1,col:o[2].col-1},{row:o[3].row+2,col:o[3].col}]}rotate(o){let t=[];switch(this.currentFrame){case 1:t=this.getFrame2Coords();break;case 2:t=this.getFrame3Coords();break;case 3:t=this.getFrame4Coords();break;case 4:t=this.getFrame1Coords();break;default:t=this.defaultFrame}if(o)return t;this.changeFrame(),this.setCoordinates=t}},class extends F{constructor(){super(i[2]),this.defaultFrame=[{row:0,col:this.startPos+1},{row:1,col:this.startPos-1},{row:1,col:this.startPos},{row:1,col:this.startPos+1}],this.setCoordinates=this.defaultFrame}changeFrame(){4===this.currentFrame?this.currentFrame=1:this.currentFrame++}getFrame1Coords(){const o=this.getCoordinates;return[{row:o[0].row-2,col:o[0].col+1},{row:o[1].row+1,col:o[1].col},{row:o[2].row,col:o[2].col+1},{row:o[3].row-1,col:o[3].col+2}]}getFrame2Coords(){const o=this.getCoordinates;return[{row:o[0].row,col:o[0].col-2},{row:o[1].row+1,col:o[1].col+1},{row:o[2].row,col:o[2].col},{row:o[3].row-1,col:o[3].col-1}]}getFrame3Coords(){const o=this.getCoordinates;return[{row:o[0].row+1,col:o[0].col},{row:o[1].row-2,col:o[1].col+1},{row:o[2].row-1,col:o[2].col},{row:o[3].row,col:o[3].col-1}]}getFrame4Coords(){const o=this.getCoordinates;return[{row:o[0].row+1,col:o[0].col+1},{row:o[1].row,col:o[1].col-2},{row:o[2].row+1,col:o[2].col-1},{row:o[3].row+2,col:o[3].col}]}rotate(o){let t=[];switch(this.currentFrame){case 1:t=this.getFrame2Coords();break;case 2:t=this.getFrame3Coords();break;case 3:t=this.getFrame4Coords();break;case 4:t=this.getFrame1Coords();break;default:t=this.defaultFrame}if(o)return t;this.changeFrame(),this.setCoordinates=t}},class extends F{constructor(){super(i[3]),this.defaultFrame=[{row:0,col:this.startPos-1},{row:0,col:this.startPos},{row:1,col:this.startPos-1},{row:1,col:this.startPos}],this.setCoordinates=this.defaultFrame}rotate(o){if(o)return this.defaultFrame}},class extends F{constructor(){super(i[4]),this.defaultFrame=[{row:0,col:this.startPos},{row:0,col:this.startPos+1},{row:1,col:this.startPos-1},{row:1,col:this.startPos}],this.setCoordinates=this.defaultFrame}changeFrame(){2===this.currentFrame?this.currentFrame=1:this.currentFrame++}getFrame1Coords(){const o=this.getCoordinates;return[{row:o[0].row-1,col:o[0].col+1},{row:o[1].row,col:o[1].col+2},{row:o[2].row-1,col:o[2].col-1},{row:o[3].row,col:o[3].col}]}getFrame2Coords(){const o=this.getCoordinates;return[{row:o[0].row+1,col:o[0].col-1},{row:o[1].row,col:o[1].col-2},{row:o[2].row+1,col:o[2].col+1},{row:o[3].row,col:o[3].col}]}rotate(o){let t=[];switch(this.currentFrame){case 1:t=this.getFrame2Coords();break;case 2:t=this.getFrame1Coords();break;default:t=this.defaultFrame}if(o)return t;this.changeFrame(),this.setCoordinates=t}},class extends F{constructor(){super(i[5]),this.defaultFrame=[{row:0,col:this.startPos},{row:1,col:this.startPos-1},{row:1,col:this.startPos},{row:1,col:this.startPos+1}],this.setCoordinates=this.defaultFrame}changeFrame(){4===this.currentFrame?this.currentFrame=1:this.currentFrame++}getFrame1Coords(){const o=this.getCoordinates;return[{row:o[0].row-1,col:o[0].col-1},{row:o[1].row-1,col:o[1].col-1},{row:o[2].row,col:o[2].col},{row:o[3].row+1,col:o[3].col+1}]}getFrame2Coords(){const o=this.getCoordinates;return[{row:o[0].row+1,col:o[0].col-1},{row:o[1].row+1,col:o[1].col+1},{row:o[2].row,col:o[2].col},{row:o[3].row-1,col:o[3].col-1}]}getFrame3Coords(){const o=this.getCoordinates;return[{row:o[0].row+1,col:o[0].col+1},{row:o[1].row-1,col:o[1].col-1},{row:o[2].row,col:o[2].col},{row:o[3].row+1,col:o[3].col+1}]}getFrame4Coords(){const o=this.getCoordinates;return[{row:o[0].row-1,col:o[0].col+1},{row:o[1].row+1,col:o[1].col+1},{row:o[2].row,col:o[2].col},{row:o[3].row-1,col:o[3].col-1}]}rotate(o){let t=[];switch(this.currentFrame){case 1:t=this.getFrame2Coords();break;case 2:t=this.getFrame3Coords();break;case 3:t=this.getFrame4Coords();break;case 4:t=this.getFrame1Coords();break;default:t=this.defaultFrame}if(o)return t;this.changeFrame(),this.setCoordinates=t}},class extends F{constructor(){super(i[6]),this.defaultFrame=[{row:0,col:this.startPos-1},{row:0,col:this.startPos},{row:1,col:this.startPos},{row:1,col:this.startPos+1}],this.setCoordinates=this.defaultFrame}changeFrame(){2===this.currentFrame?this.currentFrame=1:this.currentFrame++}getFrame1Coords(){const o=this.getCoordinates;return[{row:o[0].row-2,col:o[0].col},{row:o[1].row-1,col:o[1].col+1},{row:o[2].row,col:o[2].col},{row:o[3].row+1,col:o[3].col+1}]}getFrame2Coords(){const o=this.getCoordinates;return[{row:o[0].row+2,col:o[0].col},{row:o[1].row+1,col:o[1].col-1},{row:o[2].row,col:o[2].col},{row:o[3].row-1,col:o[3].col-1}]}rotate(o){let t=[];switch(this.currentFrame){case 1:t=this.getFrame2Coords();break;case 2:t=this.getFrame1Coords();break;default:t=this.defaultFrame}if(o)return t;this.changeFrame(),this.setCoordinates=t}}];function p(){return C[Math.floor(Math.random()*C.length)]}function v(o,t){return{value:o,modifiers:t}}function b({value:o,modifiers:t}){const r=document.createElement("DIV");return r.classList.add("cell"),1===o&&r.classList.add("cell--occupied"),t&&r.classList.add(t.className),r}function y(o){const t=document.createElement("DIV");t.classList.add("row");for(let r=0;r<o.length;r++){let e=b(o[r]);t.appendChild(e)}return t}function P(o){const t=document.getElementById("game");M(t);for(let r=0;r<o.length;r++){let e=y(o[r]);t.appendChild(e)}}function k(o){document.getElementById("score").innerHTML=o}function x(o){document.getElementById("level").innerHTML=o}function M(o){o.innerHTML=""}function N(o,t){let r=[];for(let e=0;e<o;e++){let o=[];for(let r=0;r<t;r++)o.push({value:0,modifiers:null});r.push(o)}return r}function E(o,t,r,e=!0){return o.forEach(({row:o,col:e})=>t[o][e]=r),e&&P(t),t}function I(o,t,r=1){let e=Math.max.apply(null,o.map(o=>o.row))+r;if(t[e]){return![...new Set(o.map(o=>o.col))].some(e=>{let s=Math.max.apply(null,o.filter(o=>o.col===e).map(o=>o.row))+r;return!!t[s][e]&&Boolean(t[s][e].value)})}return!1}function L(o,t,r=1){let e=Math.min.apply(null,o.map(o=>o.col))-r;if(void 0!==t[0][e]){return![...new Set(o.map(o=>o.row))].some(e=>{let s=Math.min.apply(null,o.filter(o=>o.row===e).map(o=>o.col))-r;return!!t[e][s]&&Boolean(t[e][s].value)})}return!1}function T(o,t,r=1){let e=Math.max.apply(null,o.map(o=>o.col))+r;if(void 0!==t[0][e]){return![...new Set(o.map(o=>o.row))].some(e=>{let s=Math.max.apply(null,o.filter(o=>o.row===e).map(o=>o.col))+r;return!!t[e][s]&&Boolean(t[e][s].value)})}return!1}function O(o){let t=[];var r;o.forEach((o,r)=>{o.every(o=>1===o.value)&&t.push(r)}),t.sort((o,t)=>t-o),0!==t.length&&(!function(o,t){o.forEach(o=>t.splice(o,1))}(t,o),function(o,t){let r=new Array(e);r.fill({value:0,modifiers:null});for(let e=0;e<o;e++)t.unshift(r.slice(0))}(t.length,o),r=u[t.length-1],(h+=r)>=w*m**2&&(m<d&&m++,x(m)),k(h))}function S(o,t,r){if(!t.stop)switch(o.keyCode){case 37:if(!L(t.getCoordinates,r))return;D(t,"LEFT",r);break;case 38:{const o=t.rotate(!0);E(t.getCoordinates,r,v(0,null),!1),function(o,t){let r=Math.min.apply(null,o.map(o=>o.row));return Boolean(t[r])}(o,r)&&I(o,r)&&L(o,r,0)&&T(o,r,0)?H(t,r):E(t.getCoordinates,r,v(1,{className:t.className}),!1);break}case 39:if(!T(t.getCoordinates,r))return;D(t,"RIGHT",r);break;case 40:if(!I(t.getCoordinates,r))return;D(t,"DOWN",r);break;case 32:for(;I(t.getCoordinates,r);)D(t,"DOWN",r)}}const B=function(o,t){let r;return function(...e){r&&clearTimeout(r),r=setTimeout(()=>{o(...e),r=null},t)}}(function(o){switch(o.code){case"KeyP":(function(o){document.getElementById("pause").innerHTML=o?"paused":""})(g=!g),g||W()}},l);function j(o){return new o}function D(o,t,r){E(o.getCoordinates,r,v(0,null)),o.move(t),E(o.getCoordinates,r,v(1,{className:o.className}))}function H(o,t){o.rotate(),E(o.getCoordinates,t,v(1,{className:o.className}))}function _(o){let t=N(a,c);!function(o){const t=document.getElementById("next");M(t);for(let r=0;r<o.length;r++){let e=y(o[r]);t.appendChild(e)}}(t=E(o.getCoordinates.map(({row:o,col:t})=>({row:o+1,col:Math.floor(t/(10/c))})),t,v(1,{className:o.className}),!1))}function W(){A(f.grid,{figure:f.figure,nextFigure:f.nextFigure})}function G(){let o=N(s,e);P(o),A(o),document.addEventListener("keypress",B)}function R(){confirm("Game over! Your score is "+h+" points. Would you like to start a new game?")&&(k(h=0),function(o){m=o}(1),x(m),G())}function V(o,t,r){let e=setInterval(()=>{if(!g)return I(o.getCoordinates,r)?void D(o,"DOWN",r):(O(r),o.stopMoving(),void clearInterval(e));clearInterval(e)},t)}function A(o,t){let r,e;function s(t){S(t,r,o)}t?(r=t.figure,e=t.nextFigure):(r=j(p()),e=j(p())),E(r.getCoordinates,o,v(1,{className:r.className})),_(e),document.addEventListener("keydown",s),V(r,n[m-1],o);let a=setInterval(()=>{if(r.stop){if(r=e,e=j(p()),!function(o,t){return!o.some(({row:o,col:r})=>1===t[o][r].value)}(r.getCoordinates,o))return clearInterval(a),document.removeEventListener("keydown",s),document.removeEventListener("keypress",B),void R();E(r.getCoordinates,o,v(1,{className:r.className})),_(e),V(r,n[m-1],o)}if(g)return clearInterval(a),document.removeEventListener("keydown",s),void function(o){f=o}({grid:o,figure:r,nextFigure:e})},l)}r.d(t,"moveFigure",function(){return D}),r.d(t,"rotateFigure",function(){return H}),r.d(t,"loadGameState",function(){return W}),G()}]);
//# sourceMappingURL=bundle.js.map