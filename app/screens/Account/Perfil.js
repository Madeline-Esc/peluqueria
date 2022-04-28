import React, {useState, useEffect} from 'react'
import { View, Text } from 'react-native'
import firebase from 'firebase'
import Invitado from './Invitado'
import Miembro from './Miembro'
import Loading from '../../components/Loading'

export default function Perfil(){
    const [login, setLogin] = useState(null)

    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user)=>{
            !user ? setLogin(false) : setLogin(true)
        })
    }, [])
if (login === null) return <Loading isVisible = {true} text = 'cargando...'/>

    return login ? <Miembro/> : <Invitado/>
}