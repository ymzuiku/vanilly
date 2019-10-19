!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e=e||self).vanilly={})}(this,function(e){"use strict";var t;t=["pushState","replaceState","back","forward","go","scrollRestoration"],void 0===window.history?(window.history={length:0,state:{}},t.forEach(function(e){void 0===window.history[e]&&(window.history[e]=function(){})})):t.forEach(function(e){void 0===window.history[e]&&(window.history[e]=function(){})}),[Element.prototype,CharacterData.prototype,DocumentType.prototype].forEach(function(e){e.hasOwnProperty("remove")||Object.defineProperty(e,"remove",{configurable:!0,enumerable:!0,writable:!0,value:function(){this.parentNode.removeChild(this)}})}),[Element.prototype,CharacterData.prototype,DocumentType.prototype].forEach(function(e){e.hasOwnProperty("append")||Object.defineProperty(e,"append",{configurable:!0,enumerable:!0,writable:!0,value:function(){for(var t=this,e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];e.forEach(function(e){t.appendChild(e)})}})});var n=navigator.userAgent,i=window.devicePixelRatio||1,r=window.innerWidth,o=/(?:Android)/.test(n),a=/(?:Firefox)/.test(n),s=/(?:Chrome|CriOS)/.test(n),d=/(?:iPad|PlayBook)/.test(n)||o&&!/(?:Mobile)/.test(n)||a&&/(?:Tablet)/.test(n),l=/(?:iPhone)/.test(n)&&!d,u=/MicroMessenger/.test(n),c=!l&&!o,p=1<i?r<=320:r<=640,f=1<i?r<=375:r<=750,h=1<i?r<=512:r<=1024,v=1<i?r<=640:r<=1280,m=Object.freeze({__proto__:null,isAndroid:o,isFireFox:a,isChrome:s,isPad:d,isIos:l,isWechat:u,isPc:c,isSmall:p,isMiddle:f,isLarge:h,isExtraLarge:v}),_="vanilly-onupdate",y="vanilly-onappend",w="vanilly-onmount",g="vanilly-onremove",b=function(){return(b=Object.assign||function(e){for(var t,n=1,i=arguments.length;n<i;n++)for(var r in t=arguments[n])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e}).apply(this,arguments)};function x(e){try{return decodeURIComponent(e.replace(/\+/g," "))}catch(e){return null}}function C(e,t){if(!e)return null;for(var n,i=/([^=?&]+)=?([^&]*)/g,r={};n=i.exec(e);){var o=x(n[1]),a=x(n[2]);null===o||null===a||o in r||(t||(a=isNaN(Number(a))?a:Number(a)),r[o]=a)}return r}function E(e,t){void 0===t&&(t="");var n,i,r=[];for(i in"string"!=typeof t&&(t="?"),e)if(Object.prototype.hasOwnProperty.call(e,i)){if((n=e[i])||null!=n&&!isNaN(n)||(n=""),i=encodeURIComponent(i),n=encodeURIComponent(n),null===i||null===n)continue;r.push(i+"="+n)}return r.length?t+r.join("&"):""}function M(s){function d(e,t){var n=e+t;if(c.has(n))return c.get(n);var i=e&&e.split("/"),r=t&&t.split("/");if(!r||!i)return c.set(n,!1),!1;var o=!0;return i.forEach(function(e,t){"*"!==e&&e!==r[t]&&(o=!1)}),c.set(n,o),o}function a(){if(0<window.location.hash.length){var e=window.location.hash.split("?"),t=e[0],n=e[1],i=void 0===n?"":n;return[t.replace(f,""),i]}return[window.location.pathname,window.location.search||""]}function l(e,t){for(var n=0,i=r;n<i.length;n++){(0,i[n])(e,t,s.getState())}}function u(i,r,o){i!==s.getState().paths[s.getState().paths.length-1]&&(s.update(function(e){e.paths.push(i);var t=b({},e.history[i],r);if(e.history[i]=t,"undefined"!=typeof window&&!o&&!h){var n=E(t);window.history.pushState(null,""+f+i,""===n?""+f+i:""+f+i+"?"+n)}}),l(i,r))}function o(e,n){var t=s.getState(),i="number"==typeof e?e:t.paths.length-1,r=t.paths[i-1],o=t.history[r];s.update(function(e){for(var t=0;t<e.paths.length-i;t++)n||window.history.back(),e.history[r]={},e.paths.pop()}),l(r,o)}var c=new Map,p=new Map,f="",h=!1,r=[];if("undefined"!=typeof window){window.addEventListener("popstate",function(){var e=s.getState().paths;if(a()[0]!==e[e.length-1]){var n=!1;if(e.forEach(function(e,t){e===a()[0]&&(n=!0)}),n)o(void 0,!0);else{var t=a(),i=t[0],r=t[1];u(i,""!==r?C(r):void 0,!0)}}else l(a()[0],void 0)})}return{checkPathMatch:function(e){var t=s.getState().paths,n=e+":"+t.join(",");if(p.has(n))return p.get(n);for(var i=!1,r=0,o=0;o<t.length;o++){d(e,t[o])&&(r=o,i=!0)}var a=[d(e,t[t.length-1]),i,r];return p.set(n,a),a},init:function(e,t,n){if(void 0===n&&(n="#"),h=t||!1,f=n,s.update(function(e){e.paths=[],e.history=b({},e.history)}),"undefined"!=typeof window){var i=a(),r=i[0],o=C(i[1]);"/"===r||r===e?u(e,o):(u(e),u(r,o))}},listen:function(e){r.push(e)},pop:o,push:u,replace:function(i,r){var e=s.getState(),o=i||e.paths[e.paths.length-1];s.update(function(e){var t=b({},e.history[i],r);if(e.history[i]=t,e.paths[e.paths.length-1]=o,"undefined"!=typeof window){var n=E(t);window.history.replaceState(null,""+f+o,""===n?""+f+o:""+f+o+"?"+n)}}),l(o,r)}}}var R="block",S="block",L="absolute",T="auto",A="none";var O,P={__listenFns:new Set,__listenNodes:new Set,__state:{},mutationObserver:function(e){return e},middleware:{update:[],getState:[]},getState:function(){return 0<P.middleware.getState.length&&P.middleware.getState.forEach(function(e){P.__state=e(P.__state)}),P.__state},update:function(e){0<P.middleware.update.length&&P.middleware.update.forEach(function(e){P.__state=e(P.__state)});var t=e(P.__state);t&&(P.__state=t),P.__listenFns.forEach(function(e){var t=e(P.__state);t&&(P.__state=t)}),P.__listenNodes.forEach(function(e){if(e&&e.__onMemo&&e.__onUpdate){var t=e.__onMemo(P.__state);e.__lastMemo!==t&&(e.__onUpdate(t||[],e),e.__lastMemo=t)}})},listen:function(e){P.__listenFns.has(e)||P.__listenFns.add(e)}},k={routeManage:O=M(P),Route:function(e){var a=e.path,s=e.component,d=e.delay,t=e.keep,l=void 0===t||t,u=e.leaveTime,c=B("div");c.setAttribute("route",a),c.style({width:"100%",height:"100%",overflow:"hidden",left:"0px",top:"0px",backgroundColor:"#fff",pointerEvents:A,display:S,position:L,zIndex:1});var p={animeTimer:null,unListen:null,isRenderChild:!1,style:{},realChild:null},f=function(){var e=O.checkPathMatch(a),t=e[0],n=e[1],i=e[2];if(t)p.realChild||(void 0===d?(p.realChild=s(),c.innerHTML("").append(p.realChild),f()):s().then(function(e){p.realChild=e(),c.innerHTML("").append(p.realChild),f()})),p.isRenderChild=!0,p.style={pointerEvents:T,display:R,position:"relative",zIndex:3},c.style(p.style);else{var r=l&&n,o=p.isRenderChild;void 0!==p.isRenderChild&&!0!==p.isRenderChild||(0<i&&u&&0<u?(p.style={pointerEvents:T,display:R,position:L,zIndex:R},c.style(p.style),setTimeout(function(){p.isRenderChild=r,p.style={pointerEvents:A,display:S,position:L,zIndex:1},c.style(p.style),o&&!p.isRenderChild?c.innerHTML(""):o||c.innerHTML("").append(p.realChild)},u)):(p.isRenderChild=r,p.style={pointerEvents:A,display:S,position:L,zIndex:0<i?2:1},c.style(p.style),o&&!p.isRenderChild?c.innerHTML(""):o||c.innerHTML("").append(p.realChild)))}};return c.onAppend(function(){p.unListen=O.listen(f)}),c.onRemove(function(){p.unListen&&p.unListen(),p.realChild=null,p.animeTimer=null}),c}},N=k.Route,j=k.routeManage,I=1e4,H=16/I,U=[0,0];function F(e,t){var n;void 0===e&&(e=.5),void 0===t&&(t=.5);for(var i,r,o,a,s,d=Math.min(Math.max(350*e,20),350),l=Math.min(Math.max(40-40*t,1),40),u=[],c=0,p=0;c!==I||0!==p;)void 0,s=(i=c)+(a=(o=p)+(-d*(i-(r=I))+-l*o)*H)*H,Math.abs(a)<1&&Math.abs(s-r)<1?(U[0]=r,U[1]=0):(U[0]=s,U[1]=a),c=(n=U)[0],p=n[1],u.push(c/I);return function(e){return u[Math.ceil(e*(u.length-1))]}}var z=new Set,D={"@media-sm":"@media (min-width: 640px)","@media-md":"@media (min-width: 768px)","@media-lg":"@media (min-width: 1024px)","@media-xl":"@media (min-width: 1280px)","@media-ios":"@media (min-width: "+(l?"0px":"9999px")+")","@media-android":"@media (min-width: "+(o?"0px":"9999px")+")","@media-pc":"@media (min-width: "+(c?"0px":"9999px")+")","@media-phone":"@media (min-width: "+(c?"9999px":"0px")+")","@media-wechat":"@media (min-width: "+(u?"9999px":"0px")+")","@media-pad":"@media (min-width: "+(d?"9999px":"0px")+")"};function q(r){var a={__isChain:!0,element:r,ref:function(e){return e(a),a},addEvent:function(e,t,n){return r.__events||(r.__events=new Set),r.__events.add([e,t,n]),r.addEventListener(e,t,n),a},addEventListener:function(e,t,n){return r.addEventListener(e,t,n),a},removeEventListener:function(e,t,n){return r.removeEventListener(e,t,n),a},innerText:function(e){return r.innerText=e,a},innerHTML:function(e){return r.innerHTML=e,a},textContent:function(e){return r.textContent=e,a},querySelector:function(e,t){return t(a.element.querySelector(e)),a},clearChildren:function(){for(var e=0;e<r.children.length;e++){q(r.children.item(e)).remove()}return a},removeChild:function(e){for(var t=0;t<r.children.length;t++){var n=r.children.item(t);e(n,t)&&q(n).remove()}return a},remove:function(){return a.clearChildren(),r.__onRemove&&(r.__onRemove(r.__lastMemo,r),P.__listenNodes.delete(r)),r.__events&&(r.__events.forEach(function(e){r.removeEventListener.apply(r,e)}),r.__events.clear(),r.__events=null),r.remove(),a},append:function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return e.forEach(function(e){if(e){var t=e.__isChain?e.element:e;if(t.__onUpdate&&(P.__listenNodes.has(t)||P.__listenNodes.add(t)),r.appendChild(t),t.__onAppend&&t.__onAppend(t.__lastMemo,t),t.__onRendered){t.id||(t.id=Math.random().toString(16).slice(2));var n=0,i=function(){n++,document.getElementById(t.id)?t.__onRendered(t.__lastMemo,t):n<100&&setTimeout(i,40)};setTimeout(i,40)}}}),a},setProps:function(t){return Object.keys(t).forEach(function(e){r[e]=t[e]}),a},setAttribute:function(e,t){return r.setAttribute(e,t),a},removeAttribute:function(e){return r.removeAttribute(e),a},cssText:function(e){return r.style.cssText=e,a},css:function(t,e){var n=""+t+e;if(!z.has(n)){var i=document.createElement("style");-1<t.indexOf("@media-")&&Object.keys(D).forEach(function(e){t=t.replace(e,D[e])}),e&&(t=t.replace(/\.\^/g,"."+e+"-")),i.textContent=t,document.head.appendChild(i),z.add(n)}return a},class:function(e,t){return t&&(e=e.replace(/\^/g,t+"-")),r.setAttribute("class",e),a},updateClass:function(e){if("string"==typeof e)r.setAttribute("class",(r.className||"")+e);else{var t=e(r.className||"");r.setAttribute("class",t)}return a},style:function(t){return Object.keys(t).forEach(function(e){r.style[e]=t[e]}),a},keyframesSpring:function(e,t,n,i){if(!z.has(e)){var r=document.createElement("style"),o=function(e,t,n,i){void 0===t&&(t=.5),void 0===n&&(n=.5);var r="";r+="0%{"+i(0)+"} ";for(var o=F(t,n),a=2;a<100;a+=1){r+=a+"%{"+i(o(a/100))+"} "}r+="100%{"+i(1)+"} ";var s="";s+="0%{"+i(1)+"} ";var d=F(t,n);for(a=2;a<100;a+=2){s+=a+"%{"+i(1-d(a/100))+"} "}return"@keyframes "+e+" {"+r+"} @keyframes "+e+"-reverse {"+(s+="100%{"+i(0)+"} ")+"}"}(e,t,n,i);r.textContent=o,document.head.appendChild(r),z.add(e)}return a},onUpdate:function(e,t){return r.__onMemo=e,r.__onUpdate=t,r.setAttribute(_,"1"),a},onAppend:function(e){return r.__onAppend=e,r.setAttribute(y,"1"),a},onRendered:function(e){return r.__onRendered=e,r.setAttribute(w,"1"),a},onRemove:function(e){return r.__onRemove=e,r.setAttribute(g,"1"),a}};return a}var B=function(e,t){return q("string"!=typeof e?e||document.createElement("div"):document.createElement(e,t))};e.DOM=B,e.Route=N,e.Springer=F,e.device=m,e.routeManage=j,e.store=P,Object.defineProperty(e,"__esModule",{value:!0})});
//# sourceMappingURL=index.js.map
