var BladeXLoader=function(){"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function n(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&i(t,e)}function a(t){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function i(t,e){return(i=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function c(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function s(t,e){return!e||"object"!=typeof e&&"function"!=typeof e?c(t):e}function u(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=a(t);if(e){var o=a(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return s(this,n)}}var l="blade-x-loader",h={TAG:"ajaxable",CACHE:"cache-for",AUTOLOAD:"autoload",HREF:"href"},f={ERRORS:{API:"API_ERROR"},EVENTS:{CLICK:"click",POPSTATE:"popstate"}};const d={method:"get",headers:{"X-PJAX":!0}};let p=function(){function e(){t(this,e)}return n(e,null,[{key:"dispatchEvent",value:function(t,e=null){const n=new CustomEvent(t,{detail:e});document.dispatchEvent(n)}}]),e}();r(p,"events",{INIT:`${l}:init`,BEFORE_VISIT:`${l}:before-visit`,AFTER_VISIT:`${l}:after-visit`,ERROR:`${l}:error`});let v=function(){function e(){t(this,e)}return n(e,[{key:"load",value:async function(t){return await fetch(t,d).then(t=>{if(t.ok&&t.headers.get("X-PJAX"))return t.text();throw p.dispatchEvent(p.events.ERROR,{type:f.ERRORS.API,status:t.status,message:t.message,data:t.data}),Error})}},{key:"checkCache",value:function(t){if(null===localStorage.getItem(t))return!1;try{return JSON.parse(localStorage.getItem(t)).expires_at>Date.now()}catch(t){return localStorage.clear(),!1}}}]),e}(),g=function(e){o(a,e);var r=u(a);function a(){return t(this,a),r.apply(this,arguments)}return n(a,[{key:"start",value:function(){window.onload=()=>{this.observer=new IntersectionObserver(t=>{t.forEach(t=>{if(t.isIntersecting){const e=t.target,n=new URL(e.getAttribute(h.HREF));if(!e.getAttribute(h.AUTOLOAD))return!1;this.checkCache(n.pathname)||this.load(n.toString()).then(t=>{this.cache(n.pathname,t,e.getAttribute(h.AUTOLOAD))})}})}),p.dispatchEvent(p.events.INIT)},document.addEventListener(p.events.INIT,this.observe.bind(this)),document.addEventListener(p.events.AFTER_VISIT,this.observe.bind(this))}},{key:"observe",value:function(){const t=document.querySelectorAll(`a[${h.AUTOLOAD}]`);t.length&&t.forEach(t=>{this.observer.observe(t)})}},{key:"cache",value:function(t,e,n){const r=new Date;r.setSeconds(r.getSeconds()+parseInt(n)),localStorage.setItem(t,JSON.stringify({html:e,expires_at:r.getTime()}))}}]),a}(v);return function(e){o(i,e);var a=u(i);function i(e){var n;return t(this,i),r(c(n=a.call(this)),"config",{rootID:null,html:{loaders:[]}}),Object.assign(n.config,e),n.init(),n.autoloader=new g,n.autoloader.start(),n}return n(i,[{key:"_getHtml",value:function(){return this.config.html}},{key:"getLoadersHTML",value:function(){return this._getHtml().loaders}},{key:"getRootID",value:function(){return`#${this.config.rootID}`}},{key:"init",value:function(){document.addEventListener("click",t=>{t.target&&t.target.hasAttribute(h.TAG)&&this.handleClick.bind(this)(t)}),window.addEventListener("popstate",this.handlePopstate.bind(this))}},{key:"handleClick",value:function(t){t.preventDefault(),p.dispatchEvent(p.events.BEFORE_VISIT,{type:f.EVENTS.CLICK,element:t.target});const e=new URL(window.location.href),n=new URL(t.target.getAttribute("href")),r=t.target.getAttribute("loader");this.checkCache(n.pathname)&&r&&this.putLoader(r),this.changeUrl(n.pathname),this.checkCache(n.pathname)?this.restoreFromCache(n.pathname):this.load(n.toString()).then(e=>{this.done(e),this.cache(t.target,n.pathname,e)}).catch(()=>{this.changeUrl(e)}),this.scrollToTop()}},{key:"handlePopstate",value:function(){p.dispatchEvent(p.events.BEFORE_VISIT,{type:f.EVENTS.POPSTATE});const t=new URL(window.location.href);this.checkCache(t.pathname)?this.restoreFromCache(t.pathname):this.load(t.toString()).then(t=>{this.done(t)})}},{key:"putLoader",value:function(t){const e=this.getLoadersHTML()[t];document.querySelector(this.getRootID()).innerHTML=e}},{key:"scrollToTop",value:function(){window.scrollTo(0,0)}},{key:"restoreFromCache",value:function(t){const e=JSON.parse(localStorage.getItem(t));this.done(e.html)}},{key:"cache",value:function(t,e,n){const r=t.getAttribute(h.CACHE);if(r){const t=new Date;t.setSeconds(t.getSeconds()+parseInt(r)),localStorage.setItem(e,JSON.stringify({html:n,expires_at:t.getTime()}))}}},{key:"changeUrl",value:function(t){window.history.pushState(window.location.href,null,t)}},{key:"done",value:function(t){document.querySelector(this.getRootID()).innerHTML=t,p.dispatchEvent(p.events.AFTER_VISIT)}}]),i}(v)}();