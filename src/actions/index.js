import axios from 'axios';
import {
    USER_LOGIN_SUCCESS, 
    USER_NOT_FOUND, 
    LOGIN_SYSTEM_ERROR,
    LOGIN_LOADING, LOGOUT,
    REGISTER_LOADING,
    COOKIE_CHECKED,
    SELECT_PRODUK
} from './types';
export const onUserLogout=()=>{
    return{type: LOGOUT }
}
export const keepLogin =(username)=>{
    return(dispatch)=> {
        axios.get('http://localhost:1997/users',{
            params:{
                username
            }
        }).then((res)=>{
            if(res.data.length > 0 ){
                dispatch({
                    type: USER_LOGIN_SUCCESS, payload: username
                })
            }
        })
    }
}
export const cookieChecked =()=>{
    return{type: COOKIE_CHECKED }
}
export const onUserLogin = ({username, password}) =>{
    return(dispatch)=>{
        dispatch({type: LOGIN_LOADING})
        axios.get('http://localhost:1997/users', {
            params:{
                username,
                password
            }
        }).then((res)=> {
            console.log(res)
            if(res.data.length>0){
                dispatch({type: USER_LOGIN_SUCCESS, payload: username})
            }else{
                dispatch({type: USER_NOT_FOUND})
            }
        }).catch((err)=>{
            console.log(err)
            dispatch({type: LOGIN_SYSTEM_ERROR})
        }) 
    }
}
export const onUserRegister = ({username,email,phone, password})=>{
    return (dispatch)=>{
        dispatch({type: REGISTER_LOADING})
        if(username ==='' || password === '' || phone === ''||email===''){
            dispatch({type: LOGIN_SYSTEM_ERROR, payload:'Semua form diatas wajib diisi!'})
        }else{
            axios.get('http://localhost:1997/users',{
                params:{
                    username
                }
            }).then((res)=>{
                if(res.data.length === 0 ){
                    axios.post('http://localhost:1997/users', {
                    username, email, password, phone
                    }).then((res)=>{
                        console.log(res)
                        dispatch({type: USER_LOGIN_SUCCESS, payload: username})
                    }).catch((err)=>{
                        console.log(err);
                        dispatch({type: LOGIN_SYSTEM_ERROR})
                    })
                }else{
                    dispatch({type: LOGIN_SYSTEM_ERROR, payload:'Username tidak tersedia atau sudah ada'})
                }
            }).catch((err)=>{
                dispatch({type: LOGIN_SYSTEM_ERROR, payload:'Sorry system error'})
            })
            
        }
        
    }
}
export const select_produk = (selectedProduk) => {
    return { 
        type: SELECT_PRODUK,
        payload: selectedProduk
    }
}
