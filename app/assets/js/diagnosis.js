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