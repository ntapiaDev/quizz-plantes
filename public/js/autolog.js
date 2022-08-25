const submit = document.querySelector('.autolog');

submit.addEventListener('click', (e) => {
    e.preventDefault();

    let formData = new FormData;
    formData.append('username', 'invite');
    formData.append('password', 'invite');

    let request = new XMLHttpRequest();
    request.open("POST", "users/login");
    request.send(formData);

    window.location.replace("quizz");
})