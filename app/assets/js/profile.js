document.addEventListener('DOMContentLoaded', () => {

    let addButton = document.getElementById('add');
    let cancelButton = document.getElementById('cancel');
    let createButton = document.getElementById('create');
    let createPetCard = document.getElementById('createPet');

    let petName = document.getElementById('petName');
    let dateofBirth = document.getElementById('DOB');
    let sex = document.getElementById('sex');
    let breed = document.getElementById('breed');
    let species = document.getElementById('species');
    let neutered = document.getElementById('neutered');
    let microchip = document.getElementById('microchip');

    let clearForm = function() {
        petName.value = '';
        dateofBirth.value = '';
        sex.value = '';
        breed.value = '';
        species.value = '';
        neutered.value = '';
        microchip.value = '';
    }

    addButton.addEventListener('click', () => {
        
    })

    createButton.addEventListener('click', () => {
        clearForm();

        createPetCard.classList.remove('hidden');
        createButton.classList.remove('block');
        createButton.classList.add('hidden');
    })

    cancelButton.addEventListener('click', () => {
        createPetCard.classList.add('hidden');
        createButton.classList.add('block');
        createButton.classList.remove('hidden');
    })

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

    if (localStorage.getItem('theme') === 'dark') { 
        document.body.setAttribute('data-theme', 'dark'); 
    } else { 
        document.body.removeAttribute('data-theme', 'dark');
    }
});