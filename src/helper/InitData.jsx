import data from "../data/data.json";
import { v4 as uuidv4 } from "uuid";
export const initData = () => {
    
    let lists = data.lists;
    let tasks = data.tasks;

    lists.forEach(list => {
        if (!list.id) {
            list.id = uuidv4();
        }
    });

    tasks.forEach(task => {
        if (!task.id) {
            task.id = uuidv4();
        }
    });

    lists.forEach((list, index) => {
        const startIndex = index * 4;
        const endIndex = startIndex + 4;
        list.value = tasks.slice(startIndex, endIndex).map(task => task.id);
    });
    

    return { lists, tasks};
}