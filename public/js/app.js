import Quizz from "./Class/Quizz";

//Taille du quizz
let length = 5;
let choices = 4;

let counter = 0;

let proposals = [];

//Récupération des données et initialisation du quizz
let datas = [];
const getAllDatas = () => {
    fetch(`/quizz/getAllPlantes`)
        .then(response => response.json())
        .then(response => {
            datas = response;
            // console.log(datas);

            //Lancement du quizz
            let quizz = new Quizz(length, choices, datas);
            let questions = quizz.makeQuestions();
            console.log(questions);

            //Affichage du quizz
            const updateQuizz = (e) => {

                if (e != undefined) {
                    proposals.push(e.target.textContent != "" ? e.target.textContent : e.target.src.split("/")[4]);
                }

                //update
                let image = document.querySelector(".solo-image");
                if (counter < (length)) {
                    document.querySelector(".counter").textContent = length - counter;
                    document.querySelector(".question").textContent = questions[counter][0][0];

                    //reset here
                    document.querySelector('.btns').textContent = "";
                    image.classList.add("hidden");
                    image.src = "";

                    if (questions[counter][0][1] != "") {
                        image.classList.remove("hidden");
                        image.src = `/img/${questions[counter][0][1]}`;
                        questions[counter][2].forEach((option) => {
                            let btn = document.createElement("button");
                            btn.textContent = option
                            btn.addEventListener("click", updateQuizz)
                            document.querySelector('.btns').appendChild(btn);
                        })
                    } else {
                        questions[counter][2].forEach((option) => {
                            let img = document.createElement("img");
                            img.classList.add("image");
                            img.src = `/img/${option}`;
                            img.addEventListener("click", updateQuizz)
                            document.querySelector('.btns').appendChild(img);
                        })
                    }

                    counter++;

                } else if (counter == length) {

                    let f = document.createElement('form');
                    f.action = 'quizz/results';
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