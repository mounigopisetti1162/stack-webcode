import axios from "axios"
import { API } from "../login/global"
export const signuppost=(data)=>{
    console.log("intoto")
    return axios.post(`${API}/user`,data)
}

export const getans=(id)=>{
    return axios.get(`${API}/answer/${id}`)
}