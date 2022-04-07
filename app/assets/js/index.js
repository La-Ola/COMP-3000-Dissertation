/**
 * firstly check to see if the browser supports the service worker.
 * on page load, it registers the service worker
 */
/** 
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker.register("./serviceWorker.js", {updateViaCache: 'none'})
        .then(navigator.serviceWorker.update())
        .catch(err => console.log("service worker not registered", err))
    })
}*/


