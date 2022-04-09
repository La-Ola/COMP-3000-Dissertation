document.addEventListener('DOMContentLoaded', () => {

    let addButton = document.getElementById('add');
    let cancelButton = document.getElementById('cancel');
    let createButton = document.getElementById('create');
    let createPetCard = document.getElementById('createPet');

    let profiles = document.getElementById('petList');

    let petName = document.getElementById('petName');
    let dateofBirth = document.getElementById('DOB');
    let sex = document.getElementById('sex');
    let breed = document.getElementById('breed');
    let species = document.getElementById('species');
    let neutered = document.getElementById('neutered');
    let microchip = document.getElementById('microchip');

    let checkPage = function() {
        

        let xhr = new XMLHttpRequest();

        xhr.addEventListener('readystatechange', function() {
            profiles.innerHTML = '';
            if (xhr.readyState === XMLHttpRequest.DONE) {
                try {
                    let json = xhr.responseText.substring(7);
                    let patients = JSON.parse(json).data;
                    let keys = Object.keys(patients);

                    keys.map(key => {
                        let header = document.createElement('div');
                        header.classList.add('profileHeader');
                        header.innerText = patients[key].patientName;

                        let card = document.createElement('div');
                        card.classList.add('card');

                        let table = document.createElement('table');
                        let holder = document.createElement('div');
                        holder.classList.add('hidden');

                        let show = document.createElement('button');
                        let emf = document.createElement('button');
                        let update = document.createElement('button');
                        let del = document.createElement('button');

                        show.classList.add('profileBut');
                        emf.classList.add('hidden');
                        update.classList.add('hidden');
                        del.classList.add('profileBut');

                        show.innerHTML = 'More';
                        emf.innerHTML = 'EMF';
                        update.innerHTML = 'Update';
                        del.innerHTML = 'Delete';

                        let r1 = document.createElement('tr');
                        r1.classList.add('biTableSpacing');
                        let d11 = document.createElement('td');
                        d11.innerHTML = '<b>Birthday:</b>';
                        let d12 = document.createElement('td');
                        if (patients[key].DOB != '0000-00-00') {
                            d12.innerHTML = patients[key].DOB;
                        } else {
                            d12.innerHTML = 'Unknown';
                        }
                        r1.append(d11);
                        r1.append(d12);

                        let r2 = document.createElement('tr');
                        r2.classList.add('biTableSpacing');
                        let d21 = document.createElement('td');
                        d21.innerHTML = '<b>Sex:</b>';
                        let d22 = document.createElement('td');
                        if (patients[key].sex != '') {
                            d22.innerHTML = patients[key].sex;
                        } else {
                            d22.innerHTML = 'Unknown';
                        }
                        r2.append(d21);
                        r2.append(d22);

                        let r3 = document.createElement('tr');
                        r3.classList.add('biTableSpacing');
                        let d31 = document.createElement('td');
                        d31.innerHTML = '<b>Breed:</b>';
                        let d32 = document.createElement('td');
                        if (patients[key].breed != '') {
                            d32.innerHTML = patients[key].breed;
                        } else {
                            d32.innerHTML = 'Unknown';
                        }
                        r3.append(d31);
                        r3.append(d32);

                        let r4 = document.createElement('tr');
                        r4.classList.add('biTableSpacing');
                        let d41 = document.createElement('td');
                        d41.innerHTML = '<b>Species:</b>';
                        let d42 = document.createElement('td');
                        if (patients[key].species != '') {
                            d42.innerHTML = patients[key].species;
                        } else {
                            d42.innerHTML = 'Unknown';
                        }
                        r4.append(d41);
                        r4.append(d42);

                        let r5 = document.createElement('tr');
                        r5.classList.add('biTableSpacing');
                        let d51 = document.createElement('td');
                        d51.innerHTML = '<b>Neutered:</b>';
                        let d52 = document.createElement('td');
                        if (patients[key].neutered != '') {
                            d52.innerHTML = patients[key].neutered;
                        } else {
                            d52.innerHTML = 'Unknown';
                        }
                        r5.append(d51);
                        r5.append(d52);

                        let r6 = document.createElement('tr');
                        r6.classList.add('biTableSpacing');
                        let d61 = document.createElement('td');
                        d61.innerHTML = '<b>Microchip No.:</b>';
                        let d62 = document.createElement('td');
                        if (patients[key].microchip != 0) {
                            d62.innerHTML = patients[key].microchip;
                        } else {
                            d62.innerHTML = 'Unknown';
                        }
                        r6.append(d61);
                        r6.append(d62);

                        table.append(r1);
                        table.append(r2);
                        table.append(r3);
                        table.append(r4);
                        table.append(r5);
                        table.append(r6);

                        holder.append(table);
                        card.append(holder);
                        card.append(del);
                        card.append(update);
                        card.append(emf);
                        card.append(show);
                        profiles.append(header);
                        profiles.append(card);

                        show.addEventListener('click', () => {
                            if (holder.classList.contains('hidden')) {
                                holder.classList.remove('hidden');
                                show.innerHTML = 'Hide';
                                update.classList.remove('hidden');
                                update.classList.add('profileBut');
                                emf.classList.remove('hidden');
                                emf.classList.add('profileBut');
                            } else {
                                holder.classList.add('hidden');
                                show.innerHTML = 'Show';
                                update.classList.add('hidden');
                                update.classList.remove('profileBut');
                                emf.classList.add('hidden');
                                emf.classList.remove('profileBut');
                            }
                        })

                        emf.addEventListener('click', () => {})

                        update.addEventListener('click', () => {})

                        del.addEventListener('click', () => {
                            let xhr = new XMLHttpRequest();
                            let body = {
                                patientID: patients[key].patientID
                            };

                            xhr.addEventListener('readystatechange', function() {
                                if (xhr.readyState === XMLHttpRequest.DONE) {
                                    let responseJSON = xhr.responseText.substring(7);
                                    let notifier = new AWN();
                                    try {
                                        if (xhr.status == 200) {
                                            notifier.success('Successfully Deleted Profile');
                                        } else {
                                            notifier.alert('Has Not Deleted Booking. Check Connection.');
                                        }
                                    } catch (error) {
                                        console.log(error);
                                        notifier.alert('Has Not Deleted Booking. Check Connection.');
                                    }
                                }
                            });
                            xhr.open('DELETE', '../api/profile/delete.php?', true);
                            xhr.send(JSON.stringify(body));

                            window.location = window.location;
                        })
                    });

                } catch (error) {
                    console.log(error);
                }
            }
        });

        xhr.open('GET', '../api/profile/read.php?', true);
        xhr.send();
    }

    checkPage()

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
        let xhr = new XMLHttpRequest();

        let body = {
            patientName: petName.value,
            DOB : dateofBirth.value,
            sex : sex.value,
            breed : breed.value,
            species : species.value,
            neutered : neutered.value,
            microchip : microchip.value
        };

        xhr.addEventListener('readystatechange', function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                let responseJSON = xhr.responseText;
                let notifier = new AWN();
                try {
                    if (xhr.status == 200) {
                        notifier.success('Successfully Submitted Patient Information');
                    } else {
                        notifier.alert('Has Not Submitted Booking. Check Connection.');
                    }
                } catch (error) {
                    console.log(error);
                    notifier.alert('Has Not Submitted Booking. Check Connection.');
                }
            }
        });

        xhr.open('POST', '../api/profile/create.php?', true);
        xhr.send(JSON.stringify(body));
        createPetCard.classList.add('hidden');
        createButton.classList.add('block');
        createButton.classList.remove('hidden');
        window.location = window.location;
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