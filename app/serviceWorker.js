/**
 * caches.open() creates new cache called cache1
 * cache1 is the first cacheof all the sites resources
 * addAll() waits for cache to be created then takes an array of URLs to put into cache
*/
const addResourcesToCache = async (resources) => {
    caches.delete('cache1');
    const cache = await caches.open('cache1');
    await cache.addAll(resources);
}

/**
 * clone gets added to the cache
 */
const putInCache = async (request, response) => {
    const cache = await caches.open('cache1');
    await cache.put(request, response);
}

/**
 * to fetch assets
 * respondWith prevents browsers default response
 * once cache is ready, apply caches.match(...) to check if something in the cache matches the request.
 * caches.match acts like a http request but to the cache
 * 
 * if request doesnt match, it runs a function to add page to cache for future
 * promise not returned by put in cache because i dont want to wait for it to be added before returning a response
 * 
 * preload starts download immediatly so that it doesnt have to wait for service worker to boot up
 */
const cacheFirst = async (request) => {
    const responseFromCache = await caches.match(request);

    if (responseFromCache && !navigator.onLine) {
        return responseFromCache;
    }
    const responseFromNetwork = await fetch(request);
    if (request.method === 'GET') {
        putInCache(request, responseFromNetwork.clone())
    }
    
    return responseFromNetwork;
};

self.addEventListener('fetch', (event) => {
    event.respondWith(cacheFirst(event.request));
});

/**
 * self refers to the service worker
 * service worker not installed until the 'waitUntil()' has successfully occured
 * this helps handle fetching data when offline
*/
self.addEventListener('install', (event) => {
    event.waitUntil(
        addResourcesToCache([
            '/COMP-3000/app',
            '/COMP-3000/app/manifest.json',
            '/COMP-3000/app/index.php',
            '/COMP-3000/app/assets/js/index.js',
            '/COMP-3000/app/appointment.php',
            '/COMP-3000/app/assets/css/appointment/style.css',
            '/COMP-3000/app/assets/js/appointment.js',
            '/COMP-3000/app/diagnosis.php',
            '/COMP-3000/app/assets/js/diagnosis.js',
            '/COMP-3000/app/profile.php',
            '/COMP-3000/app/assets/css/profile/style.css',
            '/COMP-3000/app/assets/js/profile.js',
            '/COMP-3000/app/setting.php',
            '/COMP-3000/app/assets/css/setting/style.css',
            '/COMP-3000/app/assets/js/setting.js',
            '/COMP-3000/app/assets/css/global.css',
            '/COMP-3000/app/assets/css/themes.css',
            '/COMP-3000/app/familiarsystems.ico'
        ])
    )
});

self.addEventListener('active', (event) => {

});