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
document.addEventListener('DOMContentLoaded', () => {

    if (localStorage.getItem('font') === 'small') {
        document.body.setAttribute('font-size', 'small');
        localStorage.setItem('font', 'small');
    } else if (localStorage.getItem('font') === 'large') { 
        document.body.setAttribute('font-size', 'large');
        localStorage.setItem('font', 'large');
    } else {
        document.body.removeAttribute('font-size');
        localStorage.removeItem('font');
    }

    if (localStorage.getItem("theme") === "dark") { 
        document.body.setAttribute("data-theme", "dark"); 
    } else { 
        document.body.removeAttribute("data-theme", "dark");
    }
});
