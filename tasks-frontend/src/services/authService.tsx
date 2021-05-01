import axios from 'axios'
import {registro as registerInterface, login as loginInterface} from '../models/models'

export const register = (user:registerInterface) => {
    const res = axios.post('user/register',user)
    return res
}

export const login = (user:loginInterface) => {
    const res = axios.post('user/login', user)
    return res
}

export const logout = () => {
    const res = axios.get('user/logout')
    return res
}

export const getUsers = () => {
    const res = axios.get('user/usersData')
    return res
}

export const removeUser = (id:any) => {
    const res = axios.delete(`user/deleteUser/${id}`)
    return res
}

export const isLogged = () => {
    const res = axios.get('user/auth')
    return res
}