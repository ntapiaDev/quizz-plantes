const select = document.querySelector('#famille');
const search = document.querySelector('#latin');
const checkboxes = document.querySelectorAll('.checkbox-category');
const checkAll = document.querySelector('#checkAll');

let cards = [];

let count = 0;
const update = (e) => {
    //Gestion des checkbox
    if(e && e.target.dataset.id === 'checkAll') {
        checkboxes.forEach(checkbox => e.target.checked === true ? checkbox.checked = true : checkbox.checked = false);
    } else {
        let allChecked = true;
        checkboxes.forEach(checkbox => checkbox.checked === false ? allChecked = false : '');
        allChecked === true ? checkAll.checked = true : checkAll.checked = false;
    }

    //Filtre
    count = 0;
    const addToFilter = (card) => {
        card.classList.remove('hidden');
        !card.classList.contains('deleted') ? count++ : '';
    }
    //Filtre par familles
    let famille = select.value;
    //Filtre par nom latin
    let latin = search.value.toLowerCase();
    //Filtre par catégories
    let checked = [];
    checkboxes.forEach(checkbox => checkbox.checked ? checked.push(checkbox.attributes[1].value) : '');

    cards = document.querySelectorAll('.card-container-active');
    cards.forEach(card => (famille == card.dataset.family || famille == 'all') && (card.children[0].children[2].textContent.toLowerCase().includes(latin) || latin === '') && checked.includes(card.dataset.category) ? addToFilter(card) : card.classList.add('hidden'));
    
    document.querySelector('.count').textContent = count;
}

select.addEventListener('change', update);
search.addEventListener('input', (e) => update(e));
checkboxes.forEach(checkbox => checkbox.addEventListener('click', (e) => update(e)));
checkAll.addEventListener('click', (e) => update(e));

update();

//AJOUTER DES PLANTES

//Ouverture du formulaire d'ajout
const addBtn = document.querySelector('.addBtn');
const openAddForm = () => {
    document.querySelector('.addForm').classList.toggle('hidden');
}
addBtn.addEventListener('click', openAddForm);

//Traitement du formulaire d'ajout
const form = document.querySelector('.addForm form');
const message = document.querySelector('.message');

const addSubmit = document.querySelector('.addSubmit');
const formVerify = (form, pop) => {
    let children = Array.from(form.children);
    for(let i = 0; i < pop; i++) {
        children.pop();
    }
    let verified = true;
    children.forEach(child => !child.value ? verified = false : '');
    return verified;
}
const resetForm = (form) => {
    let children = Array.from(form.children);
    children.pop();
    children.forEach(child => child.value = '');
}
const submitPlant = (e) => {
    e.preventDefault();
    if (formVerify(form, 1)) {

        let formData = new FormData();
        formData.append('nameFr', document.querySelector('#nameFr').value);
        formData.append('nameEn', document.querySelector('#nameEn').value);
        formData.append('family', document.querySelector('#family').value);
        formData.append('gender', document.querySelector('#gender').value);
        formData.append('species', document.querySelector('#species').value);
        formData.append('cultivar', document.querySelector('#cultivar').value);
        formData.append('blossom', document.querySelector('#blossom').value);
        formData.append('category', document.querySelector('#category').value);
        formData.append('image', document.querySelector('#image').files[0]);

        let request = new XMLHttpRequest();
        request.open("POST", "codex/add");
        request.send(formData);

        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                if (request.response === 'Soumission ajoutée') {
                    //Message de succès
                    message.classList.contains('error') ? message.classList.remove('error') : '';
                    !message.classList.contains('success') ? message.classList.add('success') : '';      
                    document.querySelector('.message').textContent = 'Merci pour votre soumission, celle-ci sera activée par l\'administrateur.'
                    resetForm(form);
                } else {
                    message.classList.contains('success') ? message.classList.remove('success') : '';
                    !message.classList.contains('error') ? message.classList.add('error') : '';
                    document.querySelector('.message').textContent = request.response;
                }
            }
        }        
    } else {
        //Message d'erreur
        message.classList.contains('success') ? message.classList.remove('success') : '';
        !message.classList.contains('error') ? message.classList.add('error') : '';
        document.querySelector('.message').textContent = 'Merci de remplir tous les champs.'
    }
}
addSubmit.addEventListener('click', submitPlant);

// Soumissions en attente :
const pending = document.querySelector('.pending-grid');
const pendingCards = pending ? Array.from(pending.children) : [];

const accepts = document.querySelectorAll('.accept');
const rejects = document.querySelectorAll('.reject');
const edits = document.querySelectorAll('.edit');

let pendingCount = pendingCards.length;
if(pendingCount > 0) {
    document.querySelector('.pending-count').textContent = '(' + pendingCount + ' en attende de validation)';
    document.querySelector('.pending-title').classList.add('visible');
}

const pendingCountUpdate = (cible) => {
    if(cible === 'list') {
        count -=1;
        document.querySelector('.count').textContent = count;
    } else {
        pendingCount -= 1;
        if(pendingCount > 0) {
            document.querySelector('.pending-count').textContent = '(' + pendingCount + ' en attende de validation)';
        } else {
            document.querySelector('.pending-count').textContent = '';
        }
    }
}
const pendingUpdate = (node) => {
    pendingCountUpdate();
    clone = node.cloneNode(true);
    clone.classList.remove('card-container-inactive');
    clone.classList.add('card-container-active');
    clone.children[1].firstChild.style.display = 'none';
    clone.children[1].children[1].addEventListener('click', deleteSubmission);
    clone.children[1].children[2].addEventListener('click', openEdit);
    let latin = clone.children[0].children[2].textContent;
    //Clone de la card dans la liste des cards :
    const sibling = Array.from(cards).find(card => card.children[0].children[2].textContent > latin);
    document.querySelector('.codex-grid').insertBefore(clone, sibling);
    clone.classList.remove('hidden');
    update();
    }

const activate = async (e) => {
    const response = await fetch(`/codex/activate/${e.target.parentNode.dataset.id}`);
    const statut = await response.json();
    if(statut.code === 200) {
        pendingUpdate(e.target.parentNode.parentNode);
        e.target.parentNode.parentNode.children[0].children[0].children[0].textContent = 'Accepté'
        e.target.parentNode.parentNode.children[0].children[0].classList.add('accept');
        e.target.parentNode.parentNode.children[0].children[0].classList.add('alert-visible');
        e.target.parentNode.style.display = 'none';
    }
}
const deleteSubmission = async (e) => {
    const response = await fetch(`/codex/delete/${e.target.parentNode.dataset.id}`);
    const statut = await response.json();
    if(statut.code === 200) {
        e.target.parentNode.parentNode.children[0].children[0].children[0].textContent = 'Supprimé'
        e.target.parentNode.parentNode.children[0].children[0].classList.add('reject');
        e.target.parentNode.parentNode.children[0].children[0].classList.add('alert-visible');
        e.target.parentNode.style.display = 'none';
        //Mettre à jour le count (liste principale ou soumissions)
        e.target.parentNode.parentNode.classList.add('deleted');
        e.target.parentNode.parentNode.classList.contains('card-container-active') ? pendingCountUpdate('list') : pendingCountUpdate('submit');         
    }
}

// let editBtnReady = true;
const openEdit = async (e) => {
    let editScreen = e.target.parentNode.parentNode.children[0].children[1]
    let editForm = editScreen.children[1];
    editScreen.classList.toggle('edit-visible');

    //Reset des erreurs
    const editError = e.target.parentNode.parentNode.children[0].children[1].children[1].children[9];
    editError.textContent = ''                     
    editError.classList.remove('visible');

    //Récupération des données
    if(editScreen.classList.contains('edit-visible')) {
        const response = await fetch(`/quizz/getPlantById/${e.target.parentNode.dataset.id}`);
        const plant = await response.json();

        editForm.children[0].value = plant.nom_fr;
        editForm.children[1].value = plant.nom_en;
        editForm.children[2].value = plant.nom_latin;
        editScreen.children[0].style.backgroundColor = plant.Categorie == 'fougère' ?
        '#FFE588' : plant.Categorie == 'arbrisseau' ?
        '#FFB169' : plant.Categorie == 'arbuste' ?
        '#FF9FC2' : plant.Categorie == 'arbre' ?
        '#F15050' : plant.Categorie == 'palmier' ?
        '#9ACCA5' : plant.Categorie == 'liane' ?
        '#A1CED6' : '#6FC15A';
        editForm.children[3].value = plant.famille;
        editForm.children[4].value = plant.cultivar;
        editForm.children[5].value = plant.floraison;
        editForm.children[6].value = plant.Categorie;
        // editForm.children[7].value = plant.image;

        //Gestion de l'envoi
        const submitEdit = async (e, id) => {
            e.preventDefault();

            if(formVerify(e.target.parentNode, 3) && editForm.children[2].value.split(' ').length === 2) {
                let formData = new FormData();
                formData.append('id', id);
                formData.append('nom_fr', editForm.children[0].value);
                formData.append('nom_en', editForm.children[1].value);
                formData.append('nom_latin', editForm.children[2].value);
                formData.append('famille', editForm.children[3].value);
                formData.append('cultivar', editForm.children[4].value);
                formData.append('floraison', editForm.children[5].value);
                formData.append('Categorie', editForm.children[6].value);
                formData.append('image', editForm.children[7].files[0]);

                let request = new XMLHttpRequest();
                request.open("POST", "codex/edit");
                request.send(formData);
                const editedCard = e.target.parentNode;
                request.onreadystatechange = function () {
                    if (request.readyState === 4 && request.status === 200) {
                        console.log(request.response);
                        if (request.response === 'La soumission a bien été modifiée') {
                            //Actualisation des données
                            function capitalize(string) {
                                return string.charAt(0).toUpperCase() + string.slice(1);
                            }
                            function capitalizeAndLower(string) {
                                return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
                            }
                            const editedCard = e.target.parentNode.parentNode.parentNode;
                            editedCard.children[2].textContent = editForm.children[2].value;
                            editedCard.children[2].style.backgroundColor = editForm.children[6].value == 'fougère' ?
                            '#FFE588' : editForm.children[6].value == 'arbrisseau' ?
                            '#FFB169' : editForm.children[6].value == 'arbuste' ?
                            '#FF9FC2' : editForm.children[6].value == 'arbre' ?
                            '#F15050' : editForm.children[6].value == 'palmier' ?
                            '#9ACCA5' : editForm.children[6].value == 'liane' ?
                            '#A1CED6' : '#6FC15A';
                            editedCard.children[4].textContent = capitalize(editForm.children[0].value);
                            editedCard.children[6].textContent = capitalizeAndLower(editForm.children[3].value);
                            editedCard.children[8].textContent = capitalizeAndLower(editForm.children[2].value.split(' ')[0]);
                            editedCard.children[10].textContent = editForm.children[2].value.split(' ')[1].toLowerCase();
                            editedCard.children[12].textContent = capitalize(editForm.children[4].value);
                            //Update de l'image
                            editForm.children[7].files[0] ? editedCard.children[13].src = '/img/' + (editForm.children[2].value.split(' ')[0] + '_' +  editForm.children[2].value.split(' ')[1] + '.' + editForm.children[7].files[0]['name'].split('.')[1] ).toLowerCase() : '';
                            //Fermeture de la modale
                            editScreen.classList.remove('edit-visible');
                        } else {
                            editError.textContent = request.response;
                            editError.classList.add('visible');
                        }
                    }
                }
            } else {
                editError.textContent = 'Merci de remplir tous les champs.'
                editError.classList.add('visible');
            }
        }
        //Mise en place du listener de submit
        // if(editBtnReady) {
            const editBtn = editForm.children[8];
            editBtn.addEventListener('click', (e) => submitEdit(e, editBtn.dataset.id));
            // editBtnReady = false;
        // }
    }
}

accepts.forEach(accept => accept.addEventListener('click', activate));
rejects.forEach(reject => reject.addEventListener('click', deleteSubmission));
edits.forEach(edit => edit.addEventListener('click', openEdit));
