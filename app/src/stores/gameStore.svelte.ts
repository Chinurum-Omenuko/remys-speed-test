import { writable } from "svelte/store";
import { createQuestions } from "../utils/gameUtils";

function createGameStore(){
    let allQuestions = $state<any[]>([])
    let selectedTables: number[] = $state([])


    return{
        selectedTables,
        get allQuestions(){
            return allQuestions;
        },
        clearSelectedTables: () => {
            selectedTables = []
        },
        getTables: () => selectedTables,
        addTables: (table: number) => {
            let index = selectedTables.indexOf(table)

            if(!selectedTables.includes(table)){
                selectedTables.push(table)
                return
            }
            
            selectedTables.splice(index,1)
            
        },
        generateQuestions: (table: number[]) => {
            let questions = createQuestions(table)
            
            let flat = Object.values(questions).flat();
            allQuestions = [...allQuestions, ...flat];
            
            
        },

        removeQuestions: () => allQuestions = []
    }
}

export const GameStore = createGameStore()