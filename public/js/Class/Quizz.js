class Quizz {
    constructor(length, choices, datas) {
        this.length = length;
        this.choices = choices;
        this.datas = datas;
    }

    makeQuestions() {

        let newDatas = [...this.datas];

        let questions = [];
        let nomsMasculins = ['arbre', 'arbuste', 'arbrisseau'];

        for (let i = 0; i < this.length; i++) {

            let index = (Math.random() * (newDatas.length - 1)).toFixed();
            let random = Math.random();
            let adverbe = nomsMasculins.includes(newDatas[index]['Categorie']) ? "cet" : "cette";

            if (random < (1/6)) {
                
                let question = `Quel est le nom latin de ${adverbe} ${newDatas[index]['Categorie']} ?`;
                let image = newDatas[index]['image'];
                let answers = this.makeAnswers(newDatas[index]['nom_latin'], 'nom_latin');
                questions.push([[question, image], newDatas[index]['nom_latin'], answers.sort(() => Math.random() - 0.5)]);
            } else if (random < (2/6)) {
                let question = `Quel est le nom vernaculaire de ${adverbe} ${newDatas[index]['Categorie']} ?`;
                let image = newDatas[index]['image'];
                let answers = this.makeAnswers(newDatas[index]['nom_fr'], 'nom_fr');
                questions.push([[question, image], newDatas[index]['nom_fr'], answers.sort(() => Math.random() - 0.5)]);
            } else if (random < (3/6)) {
                let question = `Quelle est la famille de ${adverbe} ${newDatas[index]['Categorie']} ?`;
                let image = newDatas[index]['image'];
                let answers = this.makeAnswers(newDatas[index]['famille'], 'famille');
                questions.push([[question, image], newDatas[index]['famille'], answers.sort(() => Math.random() - 0.5)]);
            } else if (random < (4/6)) {
                let question = `Laquelle de ces images correspond au ${newDatas[index]['nom_fr']} ?`;
                let image = "";
                let answers = this.makeAnswers(newDatas[index]['image'], 'image');
                questions.push([[question, image], newDatas[index]['image'], answers.sort(() => Math.random() - 0.5)]);
            } else if (random < (5/6)) {
                let question = `Laquelle de ces images correspond à ${newDatas[index]['nom_latin']} ?`;
                let image = "";
                let answers = this.makeAnswers(newDatas[index]['image'], 'image');
                questions.push([[question, image], newDatas[index]['image'], answers.sort(() => Math.random() - 0.5)]);
            } else {
                let question = `Laquelle de ces images appartient à la famille des ${newDatas[index]['famille']} ?`;
                let image = "";
                let answers = this.makeAnswers(newDatas[index]['image'], 'image');
                questions.push([[question, image], newDatas[index]['image'], answers.sort(() => Math.random() - 0.5)]);
            } 

            newDatas.splice(index, 1);
        }
        return questions;
    }

    makeAnswers(data, index) {

        let answers = [data];
        while (answers.length < this.choices) {
            let answer = this.datas[(Math.random() * (this.datas.length - 1)).toFixed()][index];
            if (!answers.includes(answer)) {
                answers.push(answer);
            }
        }
        return answers;
    }
}

export default Quizz;