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

questions.forEach(question => {
    let p = document.createElement("p");
    p.textContent = question[0]
    document.querySelector("#quizz").appendChild(p);
})
