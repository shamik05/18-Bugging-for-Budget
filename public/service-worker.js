const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";

const iconSizes = ["192", "512"];
const iconFiles = iconSizes.map(
  (size) => `/icons/icon-${size}x${size}.png`
);

const staticFilesToPreCache = [
  "/",
  "/index.js",
  "/styles.css",
  "/index.html",
  "/db.js",
  "/manifest.webmanifest",
].concat(iconFiles);

// install
self.addEventListener("install", function(event) {
  // event.waitUntil(
  //   caches.open(CACHE_NAME).then(cache => cache.add("/api/transaction"))
  //   // console.log("API requests pre-cached successfully!");
  // );
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(staticFilesToPreCache))
    // console.log("Your files were pre-cached successfully!");
  );
  self.skipWaiting();
});

// activate
self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            console.log("Removing old cache data", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// fetch
self.addEventListener("fetch", function(event) {
  const {url} = event.request;
  // 
  if (url.includes("/api/transaction" || url.includes("/api"))) {
    event.respondWith(
      caches.open(DATA_CACHE_NAME).then(cache => {
        return fetch(event.request)
          .then(response => {
            // If the response was good, clone it and store it in the cache.
            if (response.status === 200) {
              cache.put(event.request.url, response.clone());
            }

            return response;
          })
          .catch(err => {
            // Network request failed, try to get it from the cache.
            return cache.match(event.request);
          });
      }).catch(err => console.log(err))
    );
  } else {
    // respond from static cache, request is not for /api/*
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return cache.match(event.request).then(response => {
          return response || fetch(event.request);
        });
      })
    );
  }
});
