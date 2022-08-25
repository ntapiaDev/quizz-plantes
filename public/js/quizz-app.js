import Quizz from "./Class/Quizz";

//Taille du quizz
let length = 15;
let choices = 4;

//Quizz Chrono
let timer = 5;
let time = 0;
let showTimer = document.querySelector('.timer span');
let progressTimer = document.querySelector('.timer progress');
let timout;

let counter = 0;

let proposals = [];

//Quizz normal, chrono ou hiver :
let type = window.location.href.split('/')[4];
document.querySelector('h1 span').textContent = type;
let uri = type == "normal" || "chrono" ? "/quizz/getAllPlantes" : "/quizz/getWinterPlantes";

if (type == "hiver") {
    document.querySelector('.line').classList.add('hiver');
    document.querySelector('.colored-bg').classList.add('hiver');
} else if (type == "chrono") {
    document.querySelector('.timer').classList.add('visible');
}

//Récupération des données et initialisation du quizz
let datas = [];
const getAllDatas = () => {
    fetch(uri)
        .then(response => response.json())
        .then(response => {
            datas = response;
            // console.log(datas);

            //Lancement du quizz
            let quizz = new Quizz(length, choices, datas);
            let questions = quizz.makeQuestions();
            console.log(questions);

            //Affichage du quizz
            document.querySelector('.total').textContent = length;

            //Quizz chronométré
            const updateTimer = () => {
                showTimer.textContent = timer - time;
                progressTimer.max = timer;
                progressTimer.value = time;
                time++;
                if (time <= timer) {
                    timout = setTimeout(updateTimer, 1000);
                } else {
                    proposals.push(null);
                    updateQuizz();
                }
            }

            let startTimer = new Date();
            const updateQuizz = (e) => {
                clearTimeout(timout);
                time = 0;
                type == "chrono" ? updateTimer() : '';

                if (e != undefined) {
                    proposals.push(e.target.textContent != "" ? e.target.textContent : e.target.src.split("/")[4]);
                }

                console.log(proposals);

                //update
                let image = document.querySelector(".solo-image");
                let imageContainer = document.querySelector(".image-container");
                if (counter < (length)) {
                    document.querySelector(".counter").textContent = counter + 1;
                    document.querySelector(".progress-content").style.width = ((counter + 1) / length) * 100 + "%";
                    document.querySelector(".question").textContent = questions[counter][0][0];

                    //reset here
                    document.querySelector('.btns').textContent = "";
                    imageContainer.classList.add("hidden");
                    image.src = "";

                    if (questions[counter][0][1] != "") {
                        imageContainer.classList.remove("hidden");
                        image.src = `/img/${questions[counter][0][1]}`;
                        questions[counter][2].forEach((option) => {
                            let btn = document.createElement("button");
                            btn.textContent = option
                            type == 'hiver' ? btn.classList.add('hiver') : "";
                            btn.addEventListener("click", updateQuizz)
                            document.querySelector('.btns').appendChild(btn);
                        })
                    } else {
                        questions[counter][2].forEach((option, index) => {
                            let img = document.createElement("img");
                            img.classList.add("image");
                            img.src = `/img/${option}`;
                            img.addEventListener("click", updateQuizz)
                            document.querySelector('.btns').appendChild(img);

                            let numberContainer = document.createElement('div');
                            numberContainer.classList.add('number-container');
                            let number = document.createElement('div');
                            number.textContent = index + 1;
                            number.classList.add('number');
                            numberContainer.appendChild(number);
                            document.querySelector('.btns').appendChild(numberContainer);
                        })
                    }

                    counter++;

                } else if (counter == length) {

                    let f = document.createElement('form');
                    f.action = '/quizz/results';
                    f.method = 'POST';

                    questions.forEach((question, index) => {
                        //Question
                        let iq = document.createElement('input');
                        iq.type = 'hidden';
                        iq.name = `quizz[${index + 1}][question]`
                        iq.value = question[0][0];
                        f.appendChild(iq);

                        //Images
                        let ii = document.createElement('input');
                        ii.type = 'hidden';
                        ii.name = `quizz[${index + 1}][image]`
                        ii.value = question[0][1];
                        f.appendChild(ii);

                        //Réponse
                        let ia = document.createElement('input');
                        ia.type = 'hidden';
                        ia.name = `quizz[${index + 1}][answer]`
                        ia.value = question[1];
                        f.appendChild(ia);

                        //Options
                        question[2].forEach((option, index2) => {
                            let io = document.createElement('input');
                            io.type = 'hidden';
                            io.name = `quizz[${index + 1}][options][${index2 + 1}]`;
                            io.value = option;
                            f.appendChild(io);
                            index2++;
                        })

                        //Proposition du joueur
                        let ip = document.createElement('input');
                        ip.type = 'hidden';
                        ip.name = `quizz[${index + 1}][proposal]`
                        ip.value = proposals[index];
                        f.appendChild(ip);

                        //Type de quizz
                        let it = document.createElement('input');
                        it.type = 'hidden';
                        it.name = `infos[type]`
                        it.value = type;
                        f.appendChild(it);

                        //Longueur du quizz
                        let il = document.createElement('input');
                        il.type = 'hidden';
                        il.name = `infos[length]`
                        il.value = length;
                        f.appendChild(il);

                        //Nombre de propositions
                        let inb = document.createElement('input');
                        inb.type = 'hidden';
                        inb.name = `infos[choices]`
                        inb.value = choices;
                        f.appendChild(inb);

                        //Durée du quizz
                        let id = document.createElement('input');
                        id.type = 'hidden';
                        id.name = `infos[duration]`
                        id.value = Math.round((new Date() - startTimer) / 1000);
                        f.appendChild(id);
                    })

                    document.body.appendChild(f);
                    f.submit();
                }

            }

            updateQuizz();

        })
        .catch(error => console.log(error));
}

getAllDatas();

// POPUP si changement de page
window.addEventListener("beforeunload", function (e) {
    if (counter != length) {
        var confirmationMessage = 'It looks like you have been editing something. '
            + 'If you leave before saving, your changes will be lost.';

        (e || window.event).returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
    }
});