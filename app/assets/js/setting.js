document.addEventListener('DOMContentLoaded', () => {

    //all global variables required
    let togglePosition = document.getElementById('toggle-button');
    let toggleContainer = document.getElementById('toggle');

    let smlButton = document.getElementById('smallFont');
    let regButton = document.getElementById('regularFont');
    let lrgButton = document.getElementById('largeFont');

    /**
     * @desc button to activate small font adds selected to local storage
     */
    smlButton.addEventListener('click', () => {
        if (document.body.hasAttribute('font-size', 'large')) {
            document.body.removeAttribute('font-Size', 'large');
            localStorage.removeItem('font', 'large');
        }
        lrgButton.classList.remove('fontBoxActive');
        smlButton.classList.add('fontBoxActive');
        regButton.classList.remove('fontBoxActive');

        document.body.setAttribute('font-Size', 'small');
        localStorage.setItem('font', 'small');
    });

    /**
     * @desc button to activate medium font adds selected to local storage
     */
    regButton.addEventListener('click', () => {
        if (document.body.hasAttribute('font-size', 'small')) {
            document.body.removeAttribute('font-Size', 'small');
            localStorage.removeItem('font', 'small');
        } else if (document.body.hasAttribute('font-size', 'large')) {
            document.body.removeAttribute('font-Size', 'large');
            localStorage.removeItem('font', 'large');
        }
        lrgButton.classList.remove('fontBoxActive');
        regButton.classList.add('fontBoxActive');
        smlButton.classList.remove('fontBoxActive');
    });

    /**
     * @desc button to activate large font adds selected to local storage
     */
    lrgButton.addEventListener('click', () => {
        if (document.body.hasAttribute('font-size', 'small')) {
            document.body.removeAttribute('font-Size', 'small');
            localStorage.removeItem('font', 'small');
        }
        lrgButton.classList.add('fontBoxActive');
        regButton.classList.remove('fontBoxActive');
        smlButton.classList.remove('fontBoxActive');

        document.body.setAttribute('font-Size', 'large');
        localStorage.setItem('font', 'large');
    });

    /**
     * @desc when toggle is clicked, the page will switch between a light mode and dark mode
     * adds and removes the theme appropriatly from local storage
     */
    toggleContainer.addEventListener('click', function() {
        if (document.body.hasAttribute('data-theme', 'dark')) {
            document.body.removeAttribute('data-theme', 'dark');
            togglePosition.classList.remove('toggle-button-active');
            localStorage.removeItem('theme', 'dark');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            togglePosition.classList.add('toggle-button-active');
            localStorage.setItem('theme', 'dark');
        }
    });

    /**
     * @desc checks local storage for font size selected and sets the active size button to
     * to a different colour.
     */
    if (localStorage.getItem('font') === 'small') {
		document.body.setAttribute('font-size', 'small');
        smlButton.classList.add('fontBoxActive');
		regButton.classList.remove('fontBoxActive');
        localStorage.setItem('font', 'small');
    } else if (localStorage.getItem('font') === 'large') { 
		document.body.setAttribute('font-size', 'large');
        lrgButton.classList.add('fontBoxActive');
		regButton.classList.remove('fontBoxActive');
        localStorage.setItem('font', 'large');
    } else {
        document.body.removeAttribute('font-size');
        localStorage.removeItem('font');
		regButton.classList.add('fontBoxActive');
    }

    /**
     * @desc checks local storage for theme of page and sets the toggle to the correct side
     */
    if (localStorage.getItem('theme') === 'dark') { 
		document.body.setAttribute('data-theme', 'dark'); 
        togglePosition.classList.add('toggle-button-active');
        localStorage.setItem('theme', 'dark');
	} else { 
		document.body.removeAttribute('data-theme', 'dark');
	}
});