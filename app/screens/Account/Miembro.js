import React, {useState, useRef, useEffect} from 'react'
import { StyleSheet, View, Text } from 'react-native'
import {Button } from 'react-native-elements'
import Toast from 'react-native-toast-message'
import firebase from 'firebase'
import InfoUser from '../../components/Account/InfoUser'
import AccountOptions from '../../components/Account/AccountOptions'

export default function Miembro(){
    const [userInfo, setUserInfo] = useState(null)
    const [reloadUserInfo, setReloadUserInfo] = useState(false)
    const toastRef = useRef() 

    useEffect(()=>{
        (async()=> {
            const user = await firebase.auth().currentUser
            setUserInfo(user)
        })()
    setReloadUserInfo(false)
    }, [reloadUserInfo])

    return(
        <View style={styles.ViewUserInfo}>
            {userInfo&& (<InfoUser userInfo={userInfo} toastRef={toastRef}/>)}
            <AccountOptions userInfo={userInfo} toastRef={toastRef} setReloadUserInfo={setReloadUserInfo}/>
            <Button 
            title='Cerrar sesión' 
            buttonStyle={styles.btnCloseSession}
            titleStyle={styles.btnCloseSessionText}
            onPress={()=>firebase.auth().signOut()}/>
            <Toast ref={toastRef}/>
        </View>
    )
}

const styles = StyleSheet.create({
    btnCloseSession:{
        marginTop: 30,
        borderRadius: 10,
        backgroundColor: '#0833A2',
        borderTopColor: '#e3e3e3',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3',
        alignSelf: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        width: '75%'
    },
    btnCloseSessionText:{
        color: '#fff'

    }
})