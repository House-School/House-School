// to-do list
// based on taskServices.js from https://github.com/sk-Jahangeer/todo-mern-app/blob/master/client/src/services/taskServices.js

import axios from "axios";
const apiUrl = '/api/tasks/';

export function getTasks() {
    return axios.get(apiUrl);
}

export function addTask(task) {
    return axios.post(apiUrl, task);
}

export function updateTask(id, task) {
    return axios.put(apiUrl + "/" + id, task);
}

export function deleteTask(id) {
    return axios.delete(apiUrl + "/" + id);
}