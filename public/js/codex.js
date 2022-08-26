const select = document.querySelector('#famille');
const search = document.querySelector('#latin');
const checkboxes = document.querySelectorAll('.checkbox-category');
const checkAll = document.querySelector('#checkAll');

let cards = document.querySelectorAll('.card');

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
