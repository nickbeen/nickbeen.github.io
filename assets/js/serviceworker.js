(()=>{try{self["workbox:core:6.5.0"]&&_()}catch{}var Me=(r,...e)=>{let t=r;return e.length>0&&(t+=` :: ${JSON.stringify(e)}`),t};var _e=Me;var l=class extends Error{constructor(e,t){let o=_e(e,t);super(o);this.name=e,this.details=t}};var g={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:typeof registration<"u"?registration.scope:""},H=r=>[g.prefix,r,g.suffix].filter(e=>e&&e.length>0).join("-"),Ie=r=>{for(let e of Object.keys(g))r(e)},h={updateDetails:r=>{Ie(e=>{typeof r[e]=="string"&&(g[e]=r[e])})},getGoogleAnalyticsName:r=>r||H(g.googleAnalytics),getPrecacheName:r=>r||H(g.precache),getPrefix:()=>g.prefix,getRuntimeName:r=>r||H(g.runtime),getSuffix:()=>g.suffix};function O(r,e){let t=e();return r.waitUntil(t),t}try{self["workbox:precaching:6.5.0"]&&_()}catch{}var Ke="__WB_REVISION__";function ke(r){if(!r)throw new l("add-to-cache-list-unexpected-type",{entry:r});if(typeof r=="string"){let n=new URL(r,location.href);return{cacheKey:n.href,url:n.href}}let{revision:e,url:t}=r;if(!t)throw new l("add-to-cache-list-unexpected-type",{entry:r});if(!e){let n=new URL(t,location.href);return{cacheKey:n.href,url:n.href}}let o=new URL(t,location.href),s=new URL(t,location.href);return o.searchParams.set(Ke,e),{cacheKey:o.href,url:s.href}}var G=class{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:o})=>{if(e.type==="install"&&t&&t.originalRequest&&t.originalRequest instanceof Request){let s=t.originalRequest.url;o?this.notUpdatedURLs.push(s):this.updatedURLs.push(s)}return o}}};var J=class{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:t,params:o})=>{let s=o?.cacheKey||this._precacheController.getCacheKeyForURL(t.url);return s?new Request(s,{headers:t.headers}):t},this._precacheController=e}};var k;function Y(){if(k===void 0){let r=new Response("");if("body"in r)try{new Response(r.body),k=!0}catch{k=!1}k=!1}return k}async function z(r,e){let t=null;if(r.url&&(t=new URL(r.url).origin),t!==self.location.origin)throw new l("cross-origin-copy-response",{origin:t});let o=r.clone(),s={headers:new Headers(o.headers),status:o.status,statusText:o.statusText},n=e?e(s):s,a=Y()?o.body:await o.blob();return new Response(a,n)}var $=r=>new URL(String(r),location.href).href.replace(new RegExp(`^${location.origin}`),"");function ve(r,e){let t=new URL(r);for(let o of e)t.searchParams.delete(o);return t.href}async function X(r,e,t,o){let s=ve(e.url,t);if(e.url===s)return r.match(e,o);let n=Object.assign(Object.assign({},o),{ignoreSearch:!0}),a=await r.keys(e,n);for(let i of a){let c=ve(i.url,t);if(s===c)return r.match(i,o)}}var L=class{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}};var P=new Set;async function Z(){for(let r of P)await r()}function S(r){return new Promise(e=>setTimeout(e,r))}try{self["workbox:strategies:6.5.0"]&&_()}catch{}function q(r){return typeof r=="string"?new Request(r):r}var ee=class{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new L,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(let o of this._plugins)this._pluginStateMap.set(o,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){let{event:t}=this,o=q(e);if(o.mode==="navigate"&&t instanceof FetchEvent&&t.preloadResponse){let a=await t.preloadResponse;if(a)return a}let s=this.hasCallback("fetchDidFail")?o.clone():null;try{for(let a of this.iterateCallbacks("requestWillFetch"))o=await a({request:o.clone(),event:t})}catch(a){if(a instanceof Error)throw new l("plugin-error-request-will-fetch",{thrownErrorMessage:a.message})}let n=o.clone();try{let a;a=await fetch(o,o.mode==="navigate"?void 0:this._strategy.fetchOptions);for(let i of this.iterateCallbacks("fetchDidSucceed"))a=await i({event:t,request:n,response:a});return a}catch(a){throw s&&await this.runCallbacks("fetchDidFail",{error:a,event:t,originalRequest:s.clone(),request:n.clone()}),a}}async fetchAndCachePut(e){let t=await this.fetch(e),o=t.clone();return this.waitUntil(this.cachePut(e,o)),t}async cacheMatch(e){let t=q(e),o,{cacheName:s,matchOptions:n}=this._strategy,a=await this.getCacheKey(t,"read"),i=Object.assign(Object.assign({},n),{cacheName:s});o=await caches.match(a,i);for(let c of this.iterateCallbacks("cachedResponseWillBeUsed"))o=await c({cacheName:s,matchOptions:n,cachedResponse:o,request:a,event:this.event})||void 0;return o}async cachePut(e,t){let o=q(e);await S(0);let s=await this.getCacheKey(o,"write");if(!t)throw new l("cache-put-with-no-response",{url:$(s.url)});let n=await this._ensureResponseSafeToCache(t);if(!n)return!1;let{cacheName:a,matchOptions:i}=this._strategy,c=await self.caches.open(a),u=this.hasCallback("cacheDidUpdate"),b=u?await X(c,s.clone(),["__WB_REVISION__"],i):null;try{await c.put(s,u?n.clone():n)}catch(d){if(d instanceof Error)throw d.name==="QuotaExceededError"&&await Z(),d}for(let d of this.iterateCallbacks("cacheDidUpdate"))await d({cacheName:a,oldResponse:b,newResponse:n.clone(),request:s,event:this.event});return!0}async getCacheKey(e,t){let o=`${e.url} | ${t}`;if(!this._cacheKeys[o]){let s=e;for(let n of this.iterateCallbacks("cacheKeyWillBeUsed"))s=q(await n({mode:t,request:s,event:this.event,params:this.params}));this._cacheKeys[o]=s}return this._cacheKeys[o]}hasCallback(e){for(let t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(let o of this.iterateCallbacks(e))await o(t)}*iterateCallbacks(e){for(let t of this._strategy.plugins)if(typeof t[e]=="function"){let o=this._pluginStateMap.get(t);yield n=>{let a=Object.assign(Object.assign({},n),{state:o});return t[e](a)}}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,o=!1;for(let s of this.iterateCallbacks("cacheWillUpdate"))if(t=await s({request:this.request,response:t,event:this.event})||void 0,o=!0,!t)break;return o||t&&t.status!==200&&(t=void 0),t}};var w=class{constructor(e={}){this.cacheName=h.getRuntimeName(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){let[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});let t=e.event,o=typeof e.request=="string"?new Request(e.request):e.request,s="params"in e?e.params:void 0,n=new ee(this,{event:t,request:o,params:s}),a=this._getResponse(n,o,t),i=this._awaitComplete(a,n,o,t);return[a,i]}async _getResponse(e,t,o){await e.runCallbacks("handlerWillStart",{event:o,request:t});let s;try{if(s=await this._handle(t,e),!s||s.type==="error")throw new l("no-response",{url:t.url})}catch(n){if(n instanceof Error){for(let a of e.iterateCallbacks("handlerDidError"))if(s=await a({error:n,event:o,request:t}),s)break}if(!s)throw n}for(let n of e.iterateCallbacks("handlerWillRespond"))s=await n({event:o,request:t,response:s});return s}async _awaitComplete(e,t,o,s){let n,a;try{n=await e}catch{}try{await t.runCallbacks("handlerDidRespond",{event:s,request:o,response:n}),await t.doneWaiting()}catch(i){i instanceof Error&&(a=i)}if(await t.runCallbacks("handlerDidComplete",{event:s,request:o,response:n,error:a}),t.destroy(),a)throw a}};var p=class extends w{constructor(e={}){e.cacheName=h.getPrecacheName(e.cacheName);super(e);this._fallbackToNetwork=e.fallbackToNetwork!==!1,this.plugins.push(p.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){let o=await t.cacheMatch(e);return o||(t.event&&t.event.type==="install"?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,t){let o,s=t.params||{};if(this._fallbackToNetwork){let n=s.integrity,a=e.integrity,i=!a||a===n;if(o=await t.fetch(new Request(e,{integrity:a||n})),n&&i){this._useDefaultCacheabilityPluginIfNeeded();let c=await t.cachePut(e,o.clone())}}else throw new l("missing-precache-entry",{cacheName:this.cacheName,url:e.url});return o}async _handleInstall(e,t){this._useDefaultCacheabilityPluginIfNeeded();let o=await t.fetch(e);if(!await t.cachePut(e,o.clone()))throw new l("bad-precaching-response",{url:e.url,status:o.status});return o}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(let[o,s]of this.plugins.entries())s!==p.copyRedirectedCacheableResponsesPlugin&&(s===p.defaultPrecacheCacheabilityPlugin&&(e=o),s.cacheWillUpdate&&t++);t===0?this.plugins.push(p.defaultPrecacheCacheabilityPlugin):t>1&&e!==null&&this.plugins.splice(e,1)}};p.defaultPrecacheCacheabilityPlugin={async cacheWillUpdate({response:r}){return!r||r.status>=400?null:r}};p.copyRedirectedCacheableResponsesPlugin={async cacheWillUpdate({response:r}){return r.redirected?await z(r):r}};var A=class{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:o=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new p({cacheName:h.getPrecacheName(e),plugins:[...t,new J({precacheController:this})],fallbackToNetwork:o}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){let t=[];for(let o of e){typeof o=="string"?t.push(o):o&&o.revision===void 0&&t.push(o.url);let{cacheKey:s,url:n}=ke(o),a=typeof o!="string"&&o.revision?"reload":"default";if(this._urlsToCacheKeys.has(n)&&this._urlsToCacheKeys.get(n)!==s)throw new l("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(n),secondEntry:s});if(typeof o!="string"&&o.integrity){if(this._cacheKeysToIntegrities.has(s)&&this._cacheKeysToIntegrities.get(s)!==o.integrity)throw new l("add-to-cache-list-conflicting-integrities",{url:n});this._cacheKeysToIntegrities.set(s,o.integrity)}if(this._urlsToCacheKeys.set(n,s),this._urlsToCacheModes.set(n,a),t.length>0){let i=`Workbox is precaching URLs without revision info: ${t.join(", ")}
This is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(i)}}}install(e){return O(e,async()=>{let t=new G;this.strategy.plugins.push(t);for(let[n,a]of this._urlsToCacheKeys){let i=this._cacheKeysToIntegrities.get(a),c=this._urlsToCacheModes.get(n),u=new Request(n,{integrity:i,cache:c,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:a},request:u,event:e}))}let{updatedURLs:o,notUpdatedURLs:s}=t;return{updatedURLs:o,notUpdatedURLs:s}})}activate(e){return O(e,async()=>{let t=await self.caches.open(this.strategy.cacheName),o=await t.keys(),s=new Set(this._urlsToCacheKeys.values()),n=[];for(let a of o)s.has(a.url)||(await t.delete(a),n.push(a.url));return{deletedURLs:n}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){let t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){let t=e instanceof Request?e.url:e,o=this.getCacheKeyForURL(t);if(o)return(await self.caches.open(this.strategy.cacheName)).match(o)}createHandlerBoundToURL(e){let t=this.getCacheKeyForURL(e);if(!t)throw new l("non-precached-url",{url:e});return o=>(o.request=new Request(e),o.params=Object.assign({cacheKey:t},o.params),this.strategy.handle(o))}};var te,f=()=>(te||(te=new A),te);try{self["workbox:routing:6.5.0"]&&_()}catch{}var F="GET";var R=r=>r&&typeof r=="object"?r:{handle:r};var y=class{constructor(e,t,o=F){this.handler=R(t),this.match=e,this.method=o}setCatchHandler(e){this.catchHandler=R(e)}};var re=class extends y{constructor(e,t,o){let s=({url:n})=>{let a=e.exec(n.href);if(!!a&&!(n.origin!==location.origin&&a.index!==0))return a.slice(1)};super(s,t,o)}};var oe=class{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{let{request:t}=e,o=this.handleRequest({request:t,event:e});o&&e.respondWith(o)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&e.data.type==="CACHE_URLS"){let{payload:t}=e.data,o=Promise.all(t.urlsToCache.map(s=>{typeof s=="string"&&(s=[s]);let n=new Request(...s);return this.handleRequest({request:n,event:e})}));e.waitUntil(o),e.ports&&e.ports[0]&&o.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){let o=new URL(e.url,location.href);if(!o.protocol.startsWith("http"))return;let s=o.origin===location.origin,{params:n,route:a}=this.findMatchingRoute({event:t,request:e,sameOrigin:s,url:o}),i=a&&a.handler,c=[],u=e.method;if(!i&&this._defaultHandlerMap.has(u)&&(i=this._defaultHandlerMap.get(u)),!i)return;let b;try{b=i.handle({url:o,request:e,event:t,params:n})}catch(C){b=Promise.reject(C)}let d=a&&a.catchHandler;return b instanceof Promise&&(this._catchHandler||d)&&(b=b.catch(async C=>{if(d)try{return await d.handle({url:o,request:e,event:t,params:n})}catch(Ce){Ce instanceof Error&&(C=Ce)}if(this._catchHandler)return this._catchHandler.handle({url:o,request:e,event:t});throw C})),b}findMatchingRoute({url:e,sameOrigin:t,request:o,event:s}){let n=this._routes.get(o.method)||[];for(let a of n){let i,c=a.match({url:e,sameOrigin:t,request:o,event:s});if(c)return i=c,(Array.isArray(i)&&i.length===0||c.constructor===Object&&Object.keys(c).length===0||typeof c=="boolean")&&(i=void 0),{route:a,params:i}}return{}}setDefaultHandler(e,t=F){this._defaultHandlerMap.set(t,R(e))}setCatchHandler(e){this._catchHandler=R(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new l("unregister-route-but-not-found-with-method",{method:e.method});let t=this._routes.get(e.method).indexOf(e);if(t>-1)this._routes.get(e.method).splice(t,1);else throw new l("unregister-route-route-not-registered")}};var v,V=()=>(v||(v=new oe,v.addFetchListener(),v.addCacheListener()),v);function N(r,e,t){let o;if(typeof r=="string"){let n=new URL(r,location.href),a=({url:i})=>i.href===n.href;o=new y(a,e,t)}else if(r instanceof RegExp)o=new re(r,e,t);else if(typeof r=="function")o=new y(r,e,t);else if(r instanceof y)o=r;else throw new l("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});return V().registerRoute(o),o}function De(r,e=[]){for(let t of[...r.searchParams.keys()])e.some(o=>o.test(t))&&r.searchParams.delete(t);return r}function*Ue(r,{ignoreURLParametersMatching:e=[/^utm_/,/^fbclid$/],directoryIndex:t="index.html",cleanURLs:o=!0,urlManipulation:s}={}){let n=new URL(r,location.href);n.hash="",yield n.href;let a=De(n,e);if(yield a.href,t&&a.pathname.endsWith("/")){let i=new URL(a.href);i.pathname+=t,yield i.href}if(o){let i=new URL(a.href);i.pathname+=".html",yield i.href}if(s){let i=s({url:n});for(let c of i)yield c.href}}var W=class extends y{constructor(e,t){let o=({request:s})=>{let n=e.getURLsToCacheKeys();for(let a of Ue(s.url,t)){let i=n.get(a);if(i){let c=e.getIntegrityForCacheKey(i);return{cacheKey:i,integrity:c}}}};super(o,e.strategy)}};function se(r){let e=f(),t=new W(e,r);N(t)}var Be="-precache-",Te=async(r,e=Be)=>{let o=(await self.caches.keys()).filter(s=>s.includes(e)&&s.includes(self.registration.scope)&&s!==r);return await Promise.all(o.map(s=>self.caches.delete(s))),o};function ae(){self.addEventListener("activate",r=>{let e=h.getPrecacheName();r.waitUntil(Te(e).then(t=>{}))})}function D(r){return f().matchPrecache(r)}function ne(r){f().precache(r)}function ie(r,e){ne(r),se(e)}function ce(r){P.add(r)}function U(r){r.then(()=>{})}function le(){self.addEventListener("activate",()=>self.clients.claim())}function ue(){self.skipWaiting()}var M={cacheWillUpdate:async({response:r})=>r.status===200||r.status===0?r:null};var I=class extends w{constructor(e={}){super(e);this.plugins.some(t=>"cacheWillUpdate"in t)||this.plugins.unshift(M)}async _handle(e,t){let o=[],s=t.fetchAndCachePut(e).catch(()=>{});t.waitUntil(s);let n=await t.cacheMatch(e),a;if(!n)try{n=await s}catch(i){i instanceof Error&&(a=i)}if(!n)throw new l("no-response",{url:e.url,error:a});return n}};var K=class extends w{async _handle(e,t){let o=[],s=await t.cacheMatch(e),n;if(!s)try{s=await t.fetchAndCachePut(e)}catch(a){a instanceof Error&&(n=a)}if(!s)throw new l("no-response",{url:e.url,error:n});return s}};try{self["workbox:cacheable-response:6.5.0"]&&_()}catch{}var he=class{constructor(e={}){this._statuses=e.statuses,this._headers=e.headers}isResponseCacheable(e){let t=!0;return this._statuses&&(t=this._statuses.includes(e.status)),this._headers&&t&&(t=Object.keys(this._headers).some(o=>e.headers.get(o)===this._headers[o])),t}};var E=class{constructor(e){this.cacheWillUpdate=async({response:t})=>this._cacheableResponse.isResponseCacheable(t)?t:null,this._cacheableResponse=new he(e)}};var He=(r,e)=>e.some(t=>r instanceof t),Oe,$e;function Ge(){return Oe||(Oe=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Je(){return $e||($e=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var Le=new WeakMap,me=new WeakMap,Pe=new WeakMap,pe=new WeakMap,fe=new WeakMap;function Qe(r){let e=new Promise((t,o)=>{let s=()=>{r.removeEventListener("success",n),r.removeEventListener("error",a)},n=()=>{t(m(r.result)),s()},a=()=>{o(r.error),s()};r.addEventListener("success",n),r.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Le.set(t,r)}).catch(()=>{}),fe.set(e,r),e}function Ye(r){if(me.has(r))return;let e=new Promise((t,o)=>{let s=()=>{r.removeEventListener("complete",n),r.removeEventListener("error",a),r.removeEventListener("abort",a)},n=()=>{t(),s()},a=()=>{o(r.error||new DOMException("AbortError","AbortError")),s()};r.addEventListener("complete",n),r.addEventListener("error",a),r.addEventListener("abort",a)});me.set(r,e)}var de={get(r,e,t){if(r instanceof IDBTransaction){if(e==="done")return me.get(r);if(e==="objectStoreNames")return r.objectStoreNames||Pe.get(r);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return m(r[e])},set(r,e,t){return r[e]=t,!0},has(r,e){return r instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in r}};function Se(r){de=r(de)}function ze(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){let o=r.call(B(this),e,...t);return Pe.set(o,e.sort?e.sort():[e]),m(o)}:Je().includes(r)?function(...e){return r.apply(B(this),e),m(Le.get(this))}:function(...e){return m(r.apply(B(this),e))}}function Xe(r){return typeof r=="function"?ze(r):(r instanceof IDBTransaction&&Ye(r),He(r,Ge())?new Proxy(r,de):r)}function m(r){if(r instanceof IDBRequest)return Qe(r);if(pe.has(r))return pe.get(r);let e=Xe(r);return e!==r&&(pe.set(r,e),fe.set(e,r)),e}var B=r=>fe.get(r);function Ae(r,e,{blocked:t,upgrade:o,blocking:s,terminated:n}={}){let a=indexedDB.open(r,e),i=m(a);return o&&a.addEventListener("upgradeneeded",c=>{o(m(a.result),c.oldVersion,c.newVersion,m(a.transaction))}),t&&a.addEventListener("blocked",()=>t()),i.then(c=>{n&&c.addEventListener("close",()=>n()),s&&c.addEventListener("versionchange",()=>s())}).catch(()=>{}),i}function Fe(r,{blocked:e}={}){let t=indexedDB.deleteDatabase(r);return e&&t.addEventListener("blocked",()=>e()),m(t).then(()=>{})}var Ze=["get","getKey","getAll","getAllKeys","count"],et=["put","add","delete","clear"],ge=new Map;function qe(r,e){if(!(r instanceof IDBDatabase&&!(e in r)&&typeof e=="string"))return;if(ge.get(e))return ge.get(e);let t=e.replace(/FromIndex$/,""),o=e!==t,s=et.includes(t);if(!(t in(o?IDBIndex:IDBObjectStore).prototype)||!(s||Ze.includes(t)))return;let n=async function(a,...i){let c=this.transaction(a,s?"readwrite":"readonly"),u=c.store;return o&&(u=u.index(i.shift())),(await Promise.all([u[t](...i),s&&c.done]))[0]};return ge.set(e,n),n}Se(r=>({...r,get:(e,t,o)=>qe(e,t)||r.get(e,t,o),has:(e,t)=>!!qe(e,t)||r.has(e,t)}));try{self["workbox:expiration:6.5.0"]&&_()}catch{}var tt="workbox-expiration",T="cache-entries",Ve=r=>{let e=new URL(r,location.href);return e.hash="",e.href},we=class{constructor(e){this._db=null,this._cacheName=e}_upgradeDb(e){let t=e.createObjectStore(T,{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1})}_upgradeDbAndDeleteOldDbs(e){this._upgradeDb(e),this._cacheName&&Fe(this._cacheName)}async setTimestamp(e,t){e=Ve(e);let o={url:e,timestamp:t,cacheName:this._cacheName,id:this._getId(e)},n=(await this.getDb()).transaction(T,"readwrite",{durability:"relaxed"});await n.store.put(o),await n.done}async getTimestamp(e){let o=await(await this.getDb()).get(T,this._getId(e));return o?.timestamp}async expireEntries(e,t){let o=await this.getDb(),s=await o.transaction(T).store.index("timestamp").openCursor(null,"prev"),n=[],a=0;for(;s;){let c=s.value;c.cacheName===this._cacheName&&(e&&c.timestamp<e||t&&a>=t?n.push(s.value):a++),s=await s.continue()}let i=[];for(let c of n)await o.delete(T,c.id),i.push(c.url);return i}_getId(e){return this._cacheName+"|"+Ve(e)}async getDb(){return this._db||(this._db=await Ae(tt,1,{upgrade:this._upgradeDbAndDeleteOldDbs.bind(this)})),this._db}};var ye=class{constructor(e,t={}){this._isRunning=!1,this._rerunRequested=!1,this._maxEntries=t.maxEntries,this._maxAgeSeconds=t.maxAgeSeconds,this._matchOptions=t.matchOptions,this._cacheName=e,this._timestampModel=new we(e)}async expireEntries(){if(this._isRunning){this._rerunRequested=!0;return}this._isRunning=!0;let e=this._maxAgeSeconds?Date.now()-this._maxAgeSeconds*1e3:0,t=await this._timestampModel.expireEntries(e,this._maxEntries),o=await self.caches.open(this._cacheName);for(let s of t)await o.delete(s,this._matchOptions);this._isRunning=!1,this._rerunRequested&&(this._rerunRequested=!1,U(this.expireEntries()))}async updateTimestamp(e){await this._timestampModel.setTimestamp(e,Date.now())}async isURLExpired(e){if(this._maxAgeSeconds){let t=await this._timestampModel.getTimestamp(e),o=Date.now()-this._maxAgeSeconds*1e3;return t!==void 0?t<o:!0}else return!1}async delete(){this._rerunRequested=!1,await this._timestampModel.expireEntries(1/0)}};var j=class{constructor(e={}){this.cachedResponseWillBeUsed=async({event:t,request:o,cacheName:s,cachedResponse:n})=>{if(!n)return null;let a=this._isResponseDateFresh(n),i=this._getCacheExpiration(s);U(i.expireEntries());let c=i.updateTimestamp(o.url);if(t)try{t.waitUntil(c)}catch{}return a?n:null},this.cacheDidUpdate=async({cacheName:t,request:o})=>{let s=this._getCacheExpiration(t);await s.updateTimestamp(o.url),await s.expireEntries()},this._config=e,this._maxAgeSeconds=e.maxAgeSeconds,this._cacheExpirations=new Map,e.purgeOnQuotaError&&ce(()=>this.deleteCacheAndMetadata())}_getCacheExpiration(e){if(e===h.getRuntimeName())throw new l("expire-custom-caches-only");let t=this._cacheExpirations.get(e);return t||(t=new ye(e,this._config),this._cacheExpirations.set(e,t)),t}_isResponseDateFresh(e){if(!this._maxAgeSeconds)return!0;let t=this._getDateHeaderTimestamp(e);if(t===null)return!0;let o=Date.now();return t>=o-this._maxAgeSeconds*1e3}_getDateHeaderTimestamp(e){if(!e.headers.has("date"))return null;let t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(let[e,t]of this._cacheExpirations)await self.caches.delete(e),await t.delete();this._cacheExpirations=new Map}};try{self["workbox:recipes:6.5.0"]&&_()}catch{}function x(r){self.addEventListener("install",e=>{let t=r.urls.map(o=>r.strategy.handleAll({event:e,request:new Request(o)})[1]);e.waitUntil(Promise.all(t))})}function Ne(r={}){let e=({request:c})=>c.destination==="image",t=r.cacheName||"images",o=r.matchCallback||e,s=r.maxAgeSeconds||30*24*60*60,n=r.maxEntries||60,a=r.plugins||[];a.push(new E({statuses:[0,200]})),a.push(new j({maxEntries:n,maxAgeSeconds:s}));let i=new K({cacheName:t,plugins:a});N(o,i),r.warmCache&&x({urls:r.warmCache,strategy:i})}function be(r={}){let e=({request:a})=>a.destination==="style"||a.destination==="script"||a.destination==="worker",t=r.cacheName||"static-resources",o=r.matchCallback||e,s=r.plugins||[];s.push(new E({statuses:[0,200]}));let n=new I({cacheName:t,plugins:s});N(o,n),r.warmCache&&x({urls:r.warmCache,strategy:n})}var Ee=class extends w{constructor(e={}){super(e);this.plugins.some(t=>"cacheWillUpdate"in t)||this.plugins.unshift(M),this._networkTimeoutSeconds=e.networkTimeoutSeconds||0}async _handle(e,t){let o=[],s=[],n;if(this._networkTimeoutSeconds){let{id:c,promise:u}=this._getTimeoutPromise({request:e,logs:o,handler:t});n=c,s.push(u)}let a=this._getNetworkPromise({timeoutId:n,request:e,logs:o,handler:t});s.push(a);let i=await t.waitUntil((async()=>await t.waitUntil(Promise.race(s))||await a)());if(!i)throw new l("no-response",{url:e.url});return i}_getTimeoutPromise({request:e,logs:t,handler:o}){let s;return{promise:new Promise(a=>{s=setTimeout(async()=>{a(await o.cacheMatch(e))},this._networkTimeoutSeconds*1e3)}),id:s}}async _getNetworkPromise({timeoutId:e,request:t,logs:o,handler:s}){let n,a;try{a=await s.fetchAndCachePut(t)}catch(i){i instanceof Error&&(n=i)}return e&&clearTimeout(e),(n||!a)&&(a=await s.cacheMatch(t)),a}};function xe(r={}){let e=({request:i})=>i.mode==="navigate",t=r.cacheName||"pages",o=r.matchCallback||e,s=r.networkTimeoutSeconds||3,n=r.plugins||[];n.push(new E({statuses:[0,200]}));let a=new Ee({networkTimeoutSeconds:s,cacheName:t,plugins:n});N(o,a),r.warmCache&&x({urls:r.warmCache,strategy:a})}function We(r){V().setCatchHandler(r)}function Re(r={}){let e=r.pageFallback||"offline.html",t=r.imageFallback||!1,o=r.fontFallback||!1;self.addEventListener("install",n=>{let a=[e];t&&a.push(t),o&&a.push(o),n.waitUntil(self.caches.open("workbox-offline-fallbacks").then(i=>i.addAll(a)))}),We(async n=>{let a=n.request.destination,i=await self.caches.open("workbox-offline-fallbacks");return a==="document"?await D(e)||await i.match(e)||Response.error():a==="image"&&t!==!1?await D(t)||await i.match(t)||Response.error():a==="font"&&o!==!1&&(await D(o)||await i.match(o))||Response.error()})}ue();le();ae();ie([{"revision":"f7421204641c7594b14c0e4cd01762fe","url":"css/tailwind.css"},{"revision":"e563addd6a508b244b67f44baea8a900","url":"js/webshare.js"}]);xe();be();Ne();Re();})();
