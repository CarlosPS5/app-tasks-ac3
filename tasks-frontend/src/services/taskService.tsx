import axios from 'axios'
import {task} from '../models/models'

export const getTasks = () => {
    const res = axios.get('tasks/getAll')
    return res
}

export const createTask = (task:task) => {
    const res = axios.post('tasks/create', task)
    return res

}

export const getTaskById = (id:any) => {
    const res = axios.get(`tasks/getById/${id}`)
    return res
}

export const updateTask = (task:task) => {
    const res = axios.post('tasks/edit',task)
    return res
}

export const removeTask = (id:any) => {
    const res = axios.delete(`tasks/remove/${id}`)
    return res
}