function makeQuestionObject(table: number){
    let questionsObjectArray = []
    for (let i = 1; i <= 12; i++){
        let question = {
            id: table + '-' + i,
            table: table,
            multiplier: i,
            question: `${table} x ${i}`,
            answer: table * i
        };
        questionsObjectArray.push(question);
    }
    return questionsObjectArray;
}

export function createQuestions(timeTable: number[]){
    let questions = {};
    
    timeTable.forEach(table => {
        let objectArray = makeQuestionObject(table)
        questions[table] = objectArray
    });
    return questions
}




