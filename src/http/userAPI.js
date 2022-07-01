import jwt_decode from "jwt-decode"
import { $authHost, $host } from "./index"

export const registration = async (login, password) => {
    const {data} = await $host.post('api/user/registration', {login, password, role: 'admin'})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const auth = async (login, password) => {
    const {data} = await $host.post('api/user/login', {login, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const fetchInfo = async (id) => {
    const {data} = await $authHost.get('api/user/info/' + id)
    return data
}
