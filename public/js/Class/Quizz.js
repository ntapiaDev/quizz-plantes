class Quizz {
    constructor(length, datas) {
        this.length = length;
        this.datas = datas;
    }

    makeQuestions() {

        let newDatas = [...this.datas];
        console.log(newDatas[0]['nom_fr']);

        let questions = [];
        for (let i = 0; i < this.length; i++) {

            let index = (Math.random() * (newDatas.length - 1)).toFixed();
            let random = Math.random();

            if (random > 0) {
                let question = `Quelle est le nom latin de ${newDatas[index]['nom_fr']} ?`
                let answers = this.makeAnswers(newDatas[index]['nom_latin'], 'nom_latin');
                questions.push([question, newDatas[index]['nom_latin'], answers.sort(() => Math.random() - 0.5)]);
            } else {
                let question = `A quelle famille appartient ${newDatas[index][1]} ?`
                let answers = this.makeAnswers(newDatas[index][3], 3);
                questions.push([question, newDatas[index][3], answers.sort(() => Math.random() - 0.5)]);
            }

            newDatas.splice(index, 1);
        }
        return questions;
    }

    makeAnswers(data, index) {

        let answers = [data];
        while (answers.length < 6) {
            let answer = this.datas[(Math.random() * (this.datas.length - 1)).toFixed()][index];
            if (!answers.includes(answer)) {
                answers.push(answer);
            }
        }
        return answers;
    }
}

export default Quizz;