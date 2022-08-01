class Quizz {
    constructor(length, datas) {
        this.length = length;
        this.datas = datas;
    }

    makeQuestions() {

        let newDatas = this.datas;

        let questions = [];
        for (let i = 0; i < this.length; i++) {

            let index = (Math.random() * (newDatas.length - 1)).toFixed();

            if (Math.random() > 0.5) {
                let question = `Quelle est la couleur de ${newDatas[index][1]} ?`
                let answers = this.makeAnswers(newDatas[index][2], 2);
                questions.push([question, newDatas[index][2], answers.sort()]);
            } else {
                let question = `A quelle famille appartient ${newDatas[index][1]} ?`
                let answers = this.makeAnswers(newDatas[index][3], 3);
                questions.push([question, newDatas[index][3], answers.sort()]);
            }

            newDatas.splice(index, 1);
        }
        return questions;
    }

    makeAnswers(data, index) {
        
        let answers = [data];
        while (answers.length < 4) {
            let answer = this.datas[(Math.random() * (this.datas.length - 1)).toFixed()][index];
            if (!answers.includes(answer)) {
                answers.push(answer);
            }
        }
        return answers;
    }
}

export default Quizz;