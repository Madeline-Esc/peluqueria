import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Avatar } from 'react-native-elements'
import firebase from 'firebase'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import Loading from '../Loading'

export default function InfoUser(props){
    const {userInfo: {uid, photoURL, displayName, email,}, toastRef} = props
    const [isLoading,setIsLoading] = useState(false)
    const changeAvatar= async()=>{
        const resultPermissions = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        const resultPermissionsCamera = resultPermissions.permissions.mediaLibrary.status
    
    if(resultPermissionsCamera === 'denied'){
        toastRef.current.show({
            type:'info',
            position: 'top',
            text1: 'Permissions',
            text2: 'Es necesario aceptar los permisos de la galería',
            visibilityTime: 3000,
        })
        } else {
            const result = await ImagePicker.launchImageLibraryAsync(
                {
                allowsEditing:true,
                aspect:[4,4]
            })
            console.log(result)
            if (result.cancelled){
                toastRef.current.show({
                    type:'info',
                    position: 'top',
                    text1: 'Cancelled',
                    text2: 'No elegiste avatar de la galería',
                    visibilityTime: 3000,
                })
        } else {
            uploadImage(result.uri).then(()=>{
                console.log('Imagen dentro de firebase')
                updatePhotoUrl()
            }).catch(()=>{
                toastRef.current.show({
                    type:'error',
                    position: 'top',
                    text1: 'Firebase',
                    text2: 'Error al actualizar el avatar',
                    visibilityTime: 3000,
                })
            })
        }
    }
}

const uploadImage = async (uri) => {
    console.log(uri)
    const response = await fetch(uri)
    console.log(JSON.stringify(response))
    const blob = await response.blob()
    console.log(JSON.stringify(blob))
    const ref = firebase.storage().ref().child(`Avatar/${uid}`)
    return ref.put(blob)
}

    const updatePhotoUrl = () =>{
        firebase.storage().ref(`Avatar/${uid}`).getDownloadURL()
        .then(async (response)=>{
            setIsLoading(true)
            console.log(response)
            const update = { photoURL : response}
            await firebase.auth().currentUser.updateProfile(update)
            console.log('Imagen actualizada')
            setIsLoading(false)
        })
    }
    return(
        <View style={styles.viewUserInfo}>
           <Avatar
           title=''
           rounded
           size='large'
           onPress={changeAvatar}
           containerStyle={styles.userInfoAvatar}
           source={
            photoURL ? {uri:photoURL} : require('../../../assets/img/Avatar.png')
           }
           />
           <View style={styles.User}>
                <Text style={styles.displayName}>
                {displayName ? displayName : 'Invitado'}
                </Text>
                <Text >{email ? email : 'Entrada por Facebook'}</Text>
                <Loading isVisible = {isLoading} text = 'Cargando imagen...'/>
            </View>
        </View>
    )

}
const styles = StyleSheet.create({
    viewUserInfo:{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#f2f2f2",
        paddingVertical: 30

    },
    userInfoAvatar:{
        marginTop: 10,
        backgroundColor: '#051C37',
    },
    displayName:{
        fontWeight: "bold",
        paddingBottom: 5
    },
    User:{
        marginLeft: 20
    }
})