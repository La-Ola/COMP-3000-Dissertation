//declaring a name for our cache
const staticFamiliarSystems = "familiar-systems-app"

//all things needed to run app, these need to be stored in the cache
const asset = [
    "./",
    "./index.php",
    "./assets/css/index/style.css",
    "./assets/js/index.js",
    "./templogo.png",
]

/**self refers to the service worker
 *this event is triggered as soon as a service worker is installed, only runs once per service worker
 *open() then creates cache, returns a promise and stores assets
 *this helps handle fetching data when offline
 */
self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticFamiliarSystems).then(cache => {
            cache.addAll(asset);
        })
    )
})

/**
 * to fetch assets
 * respondWith prevents browsers default response
 * once cache is ready, apply caches.match(...) to check if something in the cache matches the request.
 */
self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})