import Quizz from "./Class/Quizz";

let datas = [
    [1, "Tomate", "rouge", "Solanacées"],
    [2, "Pomme", "verte", "Rosaceae"],
    [3, "Salade", "verte", "Asteraceae"],
    [4, "Cerise", "rouge", "Rosaceae"],
    [5, "Banane", "jaune", "Musaceae"],
    [6, "Poire", "jaune", "Poiraceae"],
    [7, "Orange", "orange", "Orangaceae"],
    [8, "Carotte", "orange", "Carotaceae"],
    [9, "Choux", "violet", "Chouxaceae"],
    [10, "Mûre", "noire", "Plantaceae"]
]

let length = 5;

let quizz = new Quizz(length, datas);

let questions = quizz.makeQuestions();
console.log(questions);

let counter = 0

//Affichage du quizz
const updateQuizz = () => {
    document.querySelector(".counter").textContent = 5 - counter;
    document.querySelector(".question").textContent = questions[counter][0];
    document.querySelector("button:nth-child(1)").textContent = questions[counter][2][0];
    document.querySelector("button:nth-child(2)").textContent = questions[counter][2][1];
    document.querySelector("button:nth-child(3)").textContent = questions[counter][2][2];
    document.querySelector("button:nth-child(4)").textContent = questions[counter][2][3];
    counter++;
}

const btns = document.querySelectorAll("button");
btns.forEach(btn => {
    btn.addEventListener("click", updateQuizz)
})

updateQuizz();

window.addEventListener("beforeunload", function (e) {
    var confirmationMessage = 'It looks like you have been editing something. '
                            + 'If you leave before saving, your changes will be lost.';

    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
});