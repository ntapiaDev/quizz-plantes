import Quizz from "./Class/Quizz";

let datas = [
    [1, "la tomate", "rouge", "Solanacées"],
    [2, "la pomme", "verte", "Rosaceae"],
    [3, "la salade", "verte", "Asteraceae"],
    [4, "la cerise", "rouge", "Rosaceae"],
    [5, "la banane", "jaune", "Musaceae"],
    [6, "la poire", "jaune", "Poiraceae"],
    [7, "l'orange", "orange", "Orangaceae"],
    [8, "la carotte", "orange", "Carotaceae"],
    [9, "le choux", "violet", "Chouxaceae"],
    [10, "la mûre", "noire", "Plantaceae"]
]

let length = 5;

let quizz = new Quizz(length, datas);

let questions = quizz.makeQuestions();
console.log(questions);

let counter = 0;

let proposals = [];

//Affichage du quizz
const updateQuizz = (e) => {

    if (e != undefined) {
        proposals.push(e.target.textContent);
    }

    //update
    if (counter < (length)) {
        document.querySelector(".counter").textContent = length - counter;
        document.querySelector(".question").textContent = questions[counter][0];
        document.querySelector("button:nth-child(1)").textContent = questions[counter][2][0];
        document.querySelector("button:nth-child(2)").textContent = questions[counter][2][1];
        document.querySelector("button:nth-child(3)").textContent = questions[counter][2][2];
        document.querySelector("button:nth-child(4)").textContent = questions[counter][2][3];
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
            iq.value = question[0];
            f.appendChild(iq);

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

        // questions.forEach((question, index1) => {
        //     //Question
        //     let i1 = document.createElement('input');
        //     i1.type = 'hidden';
        //     i1.name = `questions[${index1}]`
        //     i1.value = question[0];
        //     f.appendChild(i1);

        //     //Réponse
        //     let i2 = document.createElement('input');
        //     i2.type = 'hidden';
        //     i2.name = `answers[${index1}]`
        //     i2.value = question[1];
        //     f.appendChild(i2);

        //     // Liste des choix proposés
        //     let options = question[2];
        //     options.forEach((option, index2) => {
        //         let i = document.createElement('input');
        //         i.type = 'hidden';
        //         i.name = `options[${index1}][${index2}]`;
        //         i.value = option;
        //         f.appendChild(i);
        //         index2++;
        //     })

        //     index1++;
        // })

        // //Proposition du joueur
        // answers.forEach((answer, index) => {
        //     let i = document.createElement('input');
        //     i.type = 'hidden';
        //     i.name = `proposals[${index}]`
        //     i.value = answer;
        //     f.appendChild(i);

        //     index++;
        // })

        document.body.appendChild(f);
        f.submit();
    }

}

const btns = document.querySelectorAll("button");
btns.forEach(btn => {
    btn.addEventListener("click", updateQuizz)
})

updateQuizz();

//POPUP si changement de page
window.addEventListener("beforeunload", function (e) {
    if (counter != length) {
        var confirmationMessage = 'It looks like you have been editing something. '
            + 'If you leave before saving, your changes will be lost.';

        (e || window.event).returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
    }
});