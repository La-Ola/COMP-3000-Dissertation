document.addEventListener("DOMContentLoaded", () => {
    let togglePosition = document.getElementById("toggle-button");
    let toggleContainer = document.getElementById("toggle");

    let logout = document.getElementById("logout");

    /**
     * @desc when toggle is clicked, the page will switch between a light mode and dark mode
     * adds and removes the theme appropriatly from local storage
     */
    toggleContainer.addEventListener("click", function() {
        if (document.body.hasAttribute("data-theme","dark")) {
            document.body.removeAttribute("data-theme", "dark");
            togglePosition.classList.remove("toggle-button-active");
            localStorage.removeItem("theme", "dark");
        } else {
            document.body.setAttribute("data-theme", "dark");
            togglePosition.classList.add("toggle-button-active");
            localStorage.setItem("theme", "dark");
        }
    });

    if (localStorage.getItem("theme") === "dark") { 
		document.body.setAttribute("data-theme", "dark"); 
        togglePosition.classList.add("toggle-button-active");
        localStorage.setItem("theme", "dark");
	} else { 
		document.body.removeAttribute("data-theme", "dark");
	}
});