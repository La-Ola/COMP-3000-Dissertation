document.addEventListener('DOMContentLoaded', () => {
    let togglePosition = document.getElementById('toggle-button');
    let toggleContainer = document.getElementById('toggle');

    let smlButton = document.getElementById('smallFont');
    let regButton = document.getElementById('regularFont');
    let lrgButton = document.getElementById('largeFont');

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

    if (localStorage.getItem('theme') === 'dark') { 
		document.body.setAttribute('data-theme', 'dark'); 
        togglePosition.classList.add('toggle-button-active');
        localStorage.setItem('theme', 'dark');
	} else { 
		document.body.removeAttribute('data-theme', 'dark');
	}
});