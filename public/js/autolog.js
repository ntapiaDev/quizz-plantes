const submit = document.querySelector('.autolog');

submit.addEventListener('click', (e) => {
    e.preventDefault();

    let formData = new FormData;
    formData.append('username', 'invite');
    formData.append('password', 'invite');

    let request = new XMLHttpRequest();
    request.open("POST", "users/login");
    request.send(formData);

    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            request.response === 'Utilisateur connecté' ? window.location.href = "quizz" : '';
        }
    }
})