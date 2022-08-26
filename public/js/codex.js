const checkboxes = document.querySelectorAll('.checkbox input');

let cards = document.querySelectorAll('.card');

const updateCategory = () => {
    let checked = [];
    checkboxes.forEach(checkbox => checkbox.checked ? checked.push(checkbox.attributes[1].value) : '');
    cards.forEach(card => !checked.includes(card.dataset.category) ? card.classList.add('hidden') : card.classList.remove('hidden'))
}
checkboxes.forEach(checkbox => checkbox.addEventListener('click', updateCategory));