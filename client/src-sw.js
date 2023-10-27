const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
registerRoute(
  // checks if the request destination is one of 'style', 'script', or 'worker'.
  ({ request }) => ["style", "script", "worker"].includes(request.destination),
    // Uses the Stale-While-Revalidate caching strategy for  the registered route
  new StaleWhileRevalidate({
    //Sets the name of the cache to be used for storage
    cacheName: "asset-cache",
    plugins: [
      new CacheableResponsePlugin({
        // Specify the HTTP statuses that should be cached 0 or 200
        statuses: [0, 200],
      }),
    ],
  })
);