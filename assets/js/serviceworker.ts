import { cleanupOutdatedCaches } from "workbox-precaching";
import { clientsClaim } from "workbox-core"
import { imageCache, offlineFallback, pageCache, staticResourceCache } from 'workbox-recipes'
import { precacheAndRoute } from "workbox-precaching";
import { skipWaiting } from "workbox-core"

declare const self: ServiceWorkerGlobalScope;

skipWaiting();

clientsClaim();

cleanupOutdatedCaches();

precacheAndRoute(self.__WB_MANIFEST);

pageCache();

staticResourceCache();

imageCache();

offlineFallback();