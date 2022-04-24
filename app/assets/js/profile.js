document.addEventListener('DOMContentLoaded', () => {

    //all global variables required
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

    /**
     * @desc read all pet profile information from db and sort into table appropriatly. within this
     * request it also allows owner to select medical file, update, and delete for each pet profile.
     */
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function() {
        profiles.innerHTML = '';
        if (xhr.readyState === XMLHttpRequest.DONE) {
            try {
                let json = xhr.responseText.substring(7);
                let patients = JSON.parse(json).data;
                let keys = Object.keys(patients);

                /**
                 * @desc for each patient key it makes a new card holding patient information
                 */
                keys.map(key => {
                    let header = document.createElement('div');
                    header.classList.add('profileHeader');
                    header.innerText = patients[key].patientName;

                    let card = document.createElement('div');
                    card.classList.add('card');

                    let table = document.createElement('table');
                    let tableHolder = document.createElement('div');
                    tableHolder.classList.add('hidden');

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
                    tableHolder.append(table);
                    
                    let updateHolder = document.createElement('div');
                    updateHolder.classList.add('hidden');
                    let updateTable = document.createElement('table');

                    let r7 = document.createElement('tr');
                    r7.classList.add('biTableSpacing');
                    let d71 = document.createElement('td');
                    d71.innerHTML = '<b>Name:</b>';
                    let d72 = document.createElement('td');
                    let newName = document.createElement('input');
                    newName.id = 'newName';
                    newName.classList.add('inputBox');
                    newName.placeholder = 'Name';
                    if (patients[key].patientName != '') {
                        newName.value = patients[key].patientName;
                    } else {
                        newName.value = '';
                    }
                    d72.append(newName);
                    r7.append(d71);
                    r7.append(d72);

                    let r8 = document.createElement('tr');
                    r8.classList.add('biTableSpacing');
                    let d81 = document.createElement('td');
                    d81.innerHTML = '<b>Birthday:</b>';
                    let d82 = document.createElement('td');
                    let newDOB = document.createElement('input');
                    newDOB.id = 'newDOB';
                    newDOB.classList.add('inputBox');
                    newDOB.placeholder = 'yyyy-mm-dd';
                    if (patients[key].DOB != '0000-00-00') {
                        newDOB.value = patients[key].DOB;
                    } else {
                        newDOB.value = '';
                    }
                    d82.append(newDOB);
                    r8.append(d81);
                    r8.append(d82);

                    let r9 = document.createElement('tr');
                    r9.classList.add('biTableSpacing');
                    let d91 = document.createElement('td');
                    d91.innerHTML = '<b>Sex:</b>';
                    let d92 = document.createElement('td');
                    let newSex = document.createElement('input');
                    newSex.id = 'newSex';
                    newSex.classList.add('inputBox');
                    newSex.placeholder = 'Male/Female';
                    if (patients[key].sex != '') {
                        newSex.value = patients[key].sex;
                    } else {
                        newSex.value = '';
                    }
                    d92.append(newSex);
                    r9.append(d91);
                    r9.append(d92);

                    let r10 = document.createElement('tr');
                    r10.classList.add('biTableSpacing');
                    let d101 = document.createElement('td');
                    d101.innerHTML = '<b>Breed:</b>';
                    let d102 = document.createElement('td');
                    let newBreed = document.createElement('input');
                    newBreed.id = 'newBreed';
                    newBreed.classList.add('inputBox');
                    newBreed.placeholder = 'Golden Retreiver';
                    if (patients[key].breed != '') {
                        newBreed.value = patients[key].breed;
                    } else {
                        newBreed.value = '';
                    }
                    d102.append(newBreed);
                    r10.append(d101);
                    r10.append(d102);

                    let r11 = document.createElement('tr');
                    r11.classList.add('biTableSpacing');
                    let d111 = document.createElement('td');
                    d111.innerHTML = '<b>Species:</b>';
                    let d112 = document.createElement('td');
                    let newSpecies = document.createElement('input');
                    newSpecies.id = 'newSpecies';
                    newSpecies.classList.add('inputBox');
                    newSpecies.placeholder = 'Dog';
                    if (patients[key].species != '') {
                        newSpecies.value = patients[key].species;
                    } else {
                        newSpecies.value = '';
                    }
                    d112.append(newSpecies);
                    r11.append(d111);
                    r11.append(d112);

                    let r12 = document.createElement('tr');
                    r12.classList.add('biTableSpacing');
                    let d121 = document.createElement('td');
                    d121.innerHTML = '<b>Neutered:</b>';
                    let d122 = document.createElement('td');
                    let newNeutered = document.createElement('input');
                    newNeutered.id = 'newNeutered';
                    newNeutered.classList.add('inputBox');
                    newNeutered.placeholder = 'Yes/No';
                    if (patients[key].neutered != '') {
                        newNeutered.value = patients[key].neutered;
                    } else {
                        newNeutered.value = '';
                    }
                    d122.append(newNeutered);
                    r12.append(d121);
                    r12.append(d122);

                    let r13 = document.createElement('tr');
                    r13.classList.add('biTableSpacing');
                    let d131 = document.createElement('td');
                    d131.innerHTML = '<b>Microchip No.:</b>';
                    let d132 = document.createElement('td');
                    let newChip = document.createElement('input');
                    newChip.id = 'newChip';
                    newChip.classList.add('inputBox');
                    newChip.placeholder = '0000000000000000';
                    if (patients[key].microchip != '0') {
                        newChip.value = patients[key].microchip;
                    } else {
                        newChip.value = '';
                    }
                    d132.append(newChip);
                    r13.append(d131);
                    r13.append(d132);

                    updateTable.append(r7);
                    updateTable.append(r8);
                    updateTable.append(r9);
                    updateTable.append(r10);
                    updateTable.append(r11);
                    updateTable.append(r12);
                    updateTable.append(r13);
                    
                    let updateCommit = document.createElement('button');
                    updateCommit.classList.add('hidden');
                    updateCommit.innerHTML = 'Update';
                    updateHolder.append(updateTable);

                    let emfHolder = document.createElement('div');
                    let emfTable = document.createElement('table');
                    emfHolder.append(emfTable)

                    card.append(tableHolder);
                    card.append(emfHolder);
                    card.append(updateHolder);
                    card.append(del);
                    card.append(updateCommit);
                    card.append(update);
                    card.append(emf);
                    card.append(show);
                    profiles.append(header);
                    profiles.append(card);

                    /**
                     * @desc on click displays all information about the pet selected, and sisplays an update button 
                     * and a medical file button. on second click it hides this information
                     */
                    show.addEventListener('click', () => {
                        if (tableHolder.classList.contains('hidden')) {
                            tableHolder.classList.remove('hidden');
                            show.innerHTML = 'Hide';
                            update.classList.remove('hidden');
                            update.classList.add('profileBut');
                            emf.classList.remove('hidden');
                            emf.classList.add('profileBut');
                        } else {
                            tableHolder.classList.add('hidden');
                            show.innerHTML = 'More';
                            update.classList.add('hidden');
                            update.classList.remove('profileBut');
                            emf.classList.add('hidden');
                            emf.classList.remove('profileBut');
                        }
                    });

                    /**
                     * @desc this button shows the medical file information about current pet
                     * gets the information through an xmlhttp request. upon a second click, the medical information
                     * gets hidden.
                     */
                    emf.addEventListener('click', () => {
                        let id = patients[key].patientID;
                        emfTable.innerHTML = '';
                        if (emfHolder.classList.contains('hidden')) {
                            emfHolder.classList.remove('hidden');
                            tableHolder.classList.add('hidden');
                            show.classList.add('hidden');
                            show.classList.remove('profileBut');
                            del.classList.add('hidden');
                            del.classList.remove('profileBut');
                            update.classList.add('hidden');
                            update.classList.remove('profileBut');
                            emf.innerHTML = 'Close';
                        
                            let xhr = new XMLHttpRequest();
                            xhr.addEventListener('readystatechange', function() {
                                if (xhr.readyState === XMLHttpRequest.DONE) {
                                    try {
                                        let json = xhr.responseText.substring(7);console.log(json);
                                        let emr = JSON.parse(json).data;
                                        let keys = Object.keys(emr);

                                        let headerRow = document.createElement('tr');
                                        let h1 = document.createElement('th');
                                        h1.innerHTML = 'Illness';
                                        let h2 = document.createElement('th');
                                        h2.innerHTML = 'Medication';
                                        let h3 = document.createElement('th');
                                        h3.innerHTML = 'Date';

                                        headerRow.append(h1);
                                        headerRow.append(h2);
                                        headerRow.append(h3);
                                        emfTable.append(headerRow);

                                        keys.map(k => {
                                            if (emr[k].patientID == id) {
                                                let row = document.createElement('tr');
                                                let c1 = document.createElement('td');
                                                c1.innerHTML = emr[k].illness;
                                                let c2 = document.createElement('td');
                                                c2.innerHTML = emr[k].medication;
                                                let c3 = document.createElement('td');
                                                c3.innerHTML = emr[k].date;
                                                row.append(c1);
                                                row.append(c2);
                                                row.append(c3);
                                                emfTable.append(row)
                                            }
                                        })
                                    } catch (error) {
                                        console.log(error);
                                    }
                                }
                            });
                            xhr.open('GET', '../api/emf/read.php?', true);
                            xhr.send();
                        } else {
                            emfHolder.classList.add('hidden');
                            tableHolder.classList.remove('hidden');
                            show.classList.remove('hidden');
                            show.classList.add('profileBut');
                            del.classList.remove('hidden');
                            del.classList.add('profileBut');
                            update.classList.remove('hidden');
                            update.classList.add('profileBut');
                            emf.innerHTML = 'EMF';
                        }
                    });

                    /**
                     * @desc update button presents user with editable information
                     */
                    update.addEventListener('click', () => {
                        if (updateHolder.classList.contains('hidden')) {
                            updateHolder.classList.remove('hidden');
                            tableHolder.classList.add('hidden');
                            show.classList.add('hidden');
                            show.classList.remove('profileBut');
                            del.classList.add('hidden');
                            del.classList.remove('profileBut');
                            emf.classList.add('hidden');
                            emf.classList.remove('profileBut');
                            updateCommit.classList.remove('hidden');
                            updateCommit.classList.add('profileBut');
                            update.innerHTML = 'Cancel';
                        } else {
                            updateHolder.classList.add('hidden');
                            tableHolder.classList.remove('hidden');
                            show.classList.remove('hidden');
                            show.classList.add('profileBut');
                            del.classList.remove('hidden');
                            del.classList.add('profileBut');
                            emf.classList.remove('hidden');
                            emf.classList.add('profileBut');
                            updateCommit.classList.add('hidden');
                            updateCommit.classList.remove('profileBut');
                            update.innerHTML = 'Update';
                        }
                    });

                    /**
                     * @desc update button allows for updating pet information, data is put to database with
                     * xmlhttp request
                     */
                    updateCommit.addEventListener('click', () => {
                        let id = patients[key].patientID;
                        let xhr = new XMLHttpRequest();

                        let body = {
                            patientID: id,
                            patientName: newName.value,
                            DOB : newDOB.value,
                            sex : newSex.value,
                            breed : newBreed.value,
                            species : newSpecies.value,
                            neutered : newNeutered.value,
                            microchip : newChip.value
                        };

                        xhr.addEventListener('readystatechange', function() {
                            if (xhr.readyState === XMLHttpRequest.DONE) {
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
                        xhr.open('PUT', '../api/profile/update.php?', true);
                        xhr.send(JSON.stringify(body));

                        
                        updateHolder.classList.add('hidden');
                        tableHolder.classList.remove('hidden');
                        show.classList.remove('hidden');
                        show.classList.add('profileBut');
                        del.classList.remove('hidden');
                        del.classList.add('profileBut');
                        emf.classList.remove('hidden');
                        emf.classList.add('profileBut');
                        updateCommit.classList.add('hidden');
                        updateCommit.classList.remove('profileBut');
                        update.innerHTML = 'Update';
                        window.location = window.location;
                    });

                    /**
                     * @desc allows for deletion of pet profile
                     */
                    del.addEventListener('click', () => {
                        let xhr = new XMLHttpRequest();
                        let body = {
                            patientID: patients[key].patientID
                        };

                        xhr.addEventListener('readystatechange', function() {
                            if (xhr.readyState === XMLHttpRequest.DONE) {
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
                    });
                });

            } catch (error) {
                console.log(error);
            }
        }
    });
    xhr.open('GET', '../api/profile/read.php?', true);
    xhr.send();

    /**
     * @desc clears the form of create pet by emptying the input box.
     */
    let clearForm = function() {
        petName.value = '';
        dateofBirth.value = '';
        sex.value = '';
        breed.value = '';
        species.value = '';
        neutered.value = '';
        microchip.value = '';
    }

    /**
     * @desc when add button is clicked all information for new pet is submitted to the profile table using
     * an xmlhttp request
     */
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

    /**
     * @desc allows for users to see form for creating a new pet profile
     */
    createButton.addEventListener('click', () => {
        clearForm()

        createPetCard.classList.remove('hidden');
        createButton.classList.remove('block');
        createButton.classList.add('hidden');
    })

    /**
     * @desc closes form to create a new pet
     */
    cancelButton.addEventListener('click', () => {
        createPetCard.classList.add('hidden');
        createButton.classList.add('block');
        createButton.classList.remove('hidden');
    })

    /**
     * @desc checks local storage for font size and sets font size for page
     */
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

    /**
     * @desc checks local storage for theme of page and sets the theme
     */
    if (localStorage.getItem('theme') === 'dark') { 
        document.body.setAttribute('data-theme', 'dark'); 
    } else { 
        document.body.removeAttribute('data-theme', 'dark');
    }
});