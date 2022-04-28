import React,{useState} from "react"
import { StyleSheet, View } from "react-native"
import { Input, Button, Icon } from "react-native-elements"
import firebase from "firebase"
import { validateEmail } from "../../utils/Validation"

export default function ChangeDisplayEmailForm(props){
    const {displayEmail,setShowModal,toastRef, setReloadUserInfo} = props
    const [newDisplayEmail, setNewDisplayEmail] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading,setIsLoading] = useState(false)
    const [currentPassword,setCurrentPassword] = useState(null)
    const[showPassword, setShowPassword] = useState(false)
    const reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser
        var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword)
        return user.reauthenticateWithCredential((cred))
}   

    const onSubmit= ()=>{
        
        setError(null)
        if(!currentPassword){
            setError('Escribe el password actual.')
        }else{
        reauthenticate(currentPassword).then(()=>{
            if(!newDisplayEmail){
                setError('El e-mail no puede estar vacio.')
            }else if(displayEmail === newDisplayEmail){
                setError('El e-mail no puede ser igual al actual.')
            }else if(!validateEmail(newDisplayEmail)){
                setError('E-mail invalido.')
            }    else{
                setIsLoading(true)
                const update = newDisplayEmail
                firebase
                    .auth()
                    .currentUser.updateEmail(update)
                    .then(()=>{      
                        toastRef.current.show({
                            type: 'info',
                            position: 'top',
                            text1: 'Excelente',
                            text2: 'E-mail cambiado correctamente.',
                            visibilityTime: 3000,
                        })
                        setIsLoading(false)
                        setReloadUserInfo(true)
                        setShowModal(false)
                    })
                    .catch(()=>{
                        toastRef.current.show({
                            type: 'error',
                            position: 'top',
                            text1: 'Error',
                            text2: 'El E-mail se encuentra en uso.',
                            visibilityTime: 3000,
                        })  
                        setIsLoading(false)
                    })
            }
        }).catch((error)=>{
            setError(error.message)
        })
        
    }
}
    return(
        <View style={styles.view}>
            <Input
                placeholder="Escriba la Contraseña"
                containerStyle={styles.input}                
                password={true}
                secureTextEntry={showPassword ? false : true}               
                rightIcon={
                    <Icon type='material-community' 
                    name= {showPassword ? 'eye-off-outline' : 'eye-outline'}
                    iconStyle={styles.iconRight}                    
                    onPress={()=> setShowPassword(!showPassword)}
                    />}         
                onChange={(e)=>setCurrentPassword(e.nativeEvent.text)}
            />
            <Input
                placeholder="Nuevo Correo"
                containerStyle={styles.input}
                rightIcon={{
                    type:'material-community',
                    name:'email-outline',
                    color: '#c2c2c2'
                }}
                defaultValue={''}
                onChange={(e)=>setNewDisplayEmail(e.nativeEvent.text)}
                errorMessage={error}
            />
            <Button
                title='Cambiar Email'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}
            />
        </View>

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