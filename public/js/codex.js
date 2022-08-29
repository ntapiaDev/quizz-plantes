const select = document.querySelector('#famille');
const search = document.querySelector('#latin');
const checkboxes = document.querySelectorAll('.checkbox-category');
const checkAll = document.querySelector('#checkAll');

let cards = document.querySelectorAll('.card-active');

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
    let count = 0;
    const addToFilter = (card) => {
        card.classList.remove('hidden');
        count++;
    }
    //Filtre par familles
    let famille = select.value;
    //Filtre par nom latin
    let latin = search.value.toLowerCase();
    //Filtre par catégories
    let checked = [];
    checkboxes.forEach(checkbox => checkbox.checked ? checked.push(checkbox.attributes[1].value) : '');

    cards.forEach(card => (famille == card.dataset.family || famille == 'all') && (card.children[0].textContent.toLowerCase().includes(latin) || latin === '') && checked.includes(card.dataset.category) ? addToFilter(card) : card.classList.add('hidden'));
    
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
const formVerify = (form) => {
    let children = Array.from(form.children);
    children.pop();
    let verified = true;
    children.forEach(child => !child.value ? verified = false : '');
    return verified;
}
const submitPlant = (e) => {
    e.preventDefault();
    if (formVerify(form)) {

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
            console.log(request.response);
            if (request.readyState === 4 && request.status === 200) {
                if (request.response === 'Soumission ajoutée') {
                    //Message de succès
                    message.classList.contains('error') ? message.classList.remove('error') : '';
                    !message.classList.contains('success') ? message.classList.add('success') : '';      
                    document.querySelector('.message').textContent = 'Merci pour votre soumission, celle-ci sera activée par l\'administrateur.'
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