import React from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import Notiflix from 'notiflix';
import axios from '../configuration/axios'
import { createContext,context} from 'react'
// import {useNavigation} from 'react-router-dom'





export const UserContent = createContext()

export default function UserProvider({children}) {
    // const navigation= useNavigate()
    


    const LoginMutation = useMutation({
        mutationFn:async (data) =>{
            Notiflix.Loading.arrows();
            const response =await axios.post('/api/v1/auth/login',data)
            return response.data;
        },
        onSuccess:(data) => {
            localStorage.setItem("isLoggedIn",JSON.stringify(data));
            let user =JSON.parse(localStorage.getItem("isLoggedIn"));
            let userData = user.user;
            Notiflix.Loading.remove()
            Notiflix.Notify.success ('LoggedIn Sucessfully!!')
            setTimeout(() => {
                (userData.role !== 'admin') ? window.location.href = "/" : window.location.href = "/dashboard"
            }, 3000);
        },
        onError:(error) => {
            Notiflix.Loading.remove()
            Notiflix.Notify.failure(error.response.data.message)
            console.log(error.response.data.message)
        }
    })
    const RegisterMutation = useMutation({
        
        mutationFn:async (data) =>{
            Notiflix.Loading.arrows();
            const response =await axios.post('/api/v1/auth/signup',data)
            return response.data;
        },
        onSuccess:(data)=> {

            Notiflix.Notify.success ('Registered Sucessfully!!')
            window.location.href = "/login"
        },
        onError:(error) => {
            Notiflix.Loading.remove()
            Notiflix.Notify.failure(error.response.data.message)
            console.log(error.response.data.message)
        }
    })




  return (
    <UserContent.Provider value={{LoginMutation,RegisterMutation}}>
        {children}
    </UserContent.Provider>
  )
}
