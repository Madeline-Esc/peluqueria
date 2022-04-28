import React,{useState} from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import firebase from "firebase";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function ChangeDisplayPasswordForm(props){
    const {toastRef, setShowModal} = props
    const [error, setError] = useState(null)
    const [errorCurrentPassword, setErrorCurrentPassword] = useState(null)
    const [newDisplayPassword, setNewDisplayPassword] = useState(null)
    const [currentPassword, setCurrentPassword] = useState(null)    
    const [repeatNewDisplayPassword, setRepeatNewDisplayPassword] = useState(null)
    const [isLoading,setIsLoading] = useState(false)
    const[showPassword, setShowPassword] = useState(false)
    const[showRepeatPassword, setShowRepeatPassword] = useState(false)
    const[showCPassword, setShowCPassword] = useState(false)
const reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser
        var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword)
        return user.reauthenticateWithCredential((cred))
}   

const onChangePasswordPress = () =>{
    if(!currentPassword){
        setError('Escribe el password actual.')
    }else{
    reauthenticate(currentPassword).then(()=>{
        if(!newDisplayPassword || !repeatNewDisplayPassword){            
            setError('Rellena los campos')   
        }   else if(newDisplayPassword.length < 6){
            setError('El password debe tener al menos 6 caracteres')
        }   else if(newDisplayPassword !== repeatNewDisplayPassword){
            setError('Los password deben coincidir.')
        }else if(newDisplayPassword === currentPassword){
            setError('Introduce una contraseña diferente al actual.')
        }
        else{
            setIsLoading(true)    
        firebase
        .auth()
        .currentUser.updatePassword(newDisplayPassword).then(() =>{
            toastRef.current.show({
                type: 'info',
                position: 'top',
                text1: 'Excelente',
                text2: 'Contraseña cambiada correctamente.',
                visibilityTime: 3000,
            })           
            setIsLoading(false)
            setShowModal(false)
            
        }).catch((error)=>{
            toastRef.current.show({
                type: 'error',
                position: 'top',
                text1: 'Error',
                text2: 'No es posible cambiar la contraseña.',
                visibilityTime: 3000,
            })  
            setError(error.message)
            setIsLoading(false)            
        })
    }
    }).catch((error) => {
        setErrorCurrentPassword(error.message)
    })
    
    setError(null)
    setErrorCurrentPassword(null)    
}
}


    return(
        <KeyboardAwareScrollView>
        <View style={styles.view}>
            <Input      
                placeholder="Contraseña actual"
                containerStyle={styles.input}                
                password={true}
                secureTextEntry={showCPassword ? false : true}
                rightIcon={
                    <Icon type='material-community' 
                    name= {showCPassword ? 'eye-off-outline' : 'eye-outline'}
                    iconStyle={styles.iconRight}                    
                    onPress={()=> setShowCPassword(!showCPassword)}
                    />}
                errorMessage={errorCurrentPassword}                
                onChange={(e)=>setCurrentPassword(e.nativeEvent.text)}
            />
            <Input
                placeholder="Nueva contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showPassword ? false : true}
                defaultValue={''}
                rightIcon={
                    <Icon type='material-community' 
                    name= {showPassword ? 'eye-off-outline' : 'eye-outline'}
                    iconStyle={styles.iconRight}                    
                    onPress={()=> setShowPassword(!showPassword)}
                    />}
                onChange={(e)=>setNewDisplayPassword(e.nativeEvent.text)}
            />
            <Input
                placeholder="Confirme la nueva contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showRepeatPassword ? false : true}
                rightIcon={
                    <Icon type='material-community' 
                    name= {showRepeatPassword ? 'eye-off-outline' : 'eye-outline'}
                    iconStyle={styles.iconRight}                    
                    onPress={()=> setShowRepeatPassword(!showRepeatPassword)}
                    />}
                errorMessage={error}
                onChange={(e)=>setRepeatNewDisplayPassword(e.nativeEvent.text)}
            />
            <Button
                title='Cambiar Password'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onChangePasswordPress}
                loading={isLoading}
            />
        </View>
        </KeyboardAwareScrollView>       
    )
}

const styles = StyleSheet.create({
    input:{
        marginBottom: 10
    },
    view:{
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    btnContainer:{
        marginTop:20,
        width: '95%'
    },
    btn:{
        backgroundColor: '#0833A2',
        borderRadius: 10
    },
    iconRight:{
        color: '#c2c2c2'
    }
})