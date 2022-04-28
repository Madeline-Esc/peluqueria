import React, {useState} from 'react'
import { StyleSheet, View, Text } from 'react-native'
import {Input, Icon, Button} from 'react-native-elements'
import { validateEmail } from '../../utils/Validation'
import { validatePhone } from '../../utils/Validation'
import firebase from 'firebase'
import { useNavigation} from '@react-navigation/native'
import Loading from '../Loading'

export default function RegisterForm(props){
    const {toastRef} = props
    const [showPassword, setShowPassword] = useState(false)
    const [showRepeatPassword, setshowRepeatPassword] = useState(false) 
    const [formData, setFormData] = useState(defaultFormValues())
    const navigation = useNavigation()
    const [isloading, setIsLoading] = useState(false)

    const onSubmit = () =>{
        if(formData.email.length===0||formData.phone.length===0||formData.password.length===0||formData.repeatpassword.length===0){
            toastRef.current.show({
                type: 'error',
                position: 'top',
                text1: 'Empty',
                text2: 'Todos los campos son requeridos',
                visibilityTime: 3000,
            });
        } else if (!validateEmail(formData.email)){
            toastRef.current.show({
                type: 'error',
                position: 'top',
                text1: 'Email',
                text2: 'El email no es correcto',
                visibilityTime: 3000,
            });
        }else if (!validatePhone(formData.phone)){
            toastRef.current.show({
                type: 'error',
                position: 'top',
                text1: 'Phone',
                text2: 'Teléfono inválido',
                visibilityTime: 3000,
            });
        }else if (formData.password !== formData.repeatpassword){
            toastRef.current.show({
                type: 'error',
                position: 'top',
                text1: 'Password',
                text2: 'Las contraseñas deben ser idénticas',
                visibilityTime: 3000,
            });
        } else if (formData.password.length < 6){
            toastRef.current.show({
                type: 'error',
                position: 'top',
                text1: 'Password',
                text2: 'La longitud mínima de la contraseña es de 6 caracteres ',
                visibilityTime: 3000,
            });
        } else{
            setIsLoading(true)
            firebase
            .auth()
            .createUserWithEmailAndPassword(formData.email, formData.password)
            .then((response)=>{
                navigation.navigate('perfil')
            })
            .catch(()=>{
                toastRef.current.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Password',
                    text2: 'Este correo ya ha sido registrado ',
                    visibilityTime: 3000,
                })
            setIsLoading(false)
            })
        }
    }

    const onChange = (e, type) =>{
        setFormData({ ...formData, [type]: e.nativeEvent.text})
    }

    return(
        <View style={styles.formContainer}>
            <Input
                placeholder='Correo electrónico'
                containerStyle={styles.inputForm}
                onChange={(e)=>onChange(e, 'email')}
                rightIcon={<Icon
                     type='material-community' 
                     name='gmail' 
                     iconStyle={styles.iconRight}
                />}
            />
            <Input
                placeholder='Celular'
                containerStyle={styles.inputForm}
                onChange={(e)=>onChange(e, 'phone')}
                rightIcon={<Icon
                     type='material-community' 
                     name='cellphone' 
                     iconStyle={styles.iconRight}
                />}
            />
            <Input
                placeholder='Contraseña'
                containerStyle={styles.inputForm}
                password={true}
                secureTextEntry={showPassword ? false : true}
                onChange={(e)=>onChange(e, 'password')}
                rightIcon={<Icon
                     type='material-community' 
                     name={showPassword ? 'eye-off' : 'eye' }
                     iconStyle={styles.iconRight}
                     onPress={()=> setShowPassword(!showPassword)}
                     />}
            />
            <Input
                placeholder='Repetir contraseña'
                containerStyle={styles.inputForm}
                password={true}
                secureTextEntry={showRepeatPassword ? false : true}
                onChange={(e)=>onChange(e, 'repeatpassword')}
                rightIcon={<Icon
                     type='material-community' 
                     name={showRepeatPassword ? 'eye-off' : 'eye' }
                     iconStyle={styles.iconRight}
                     onPress={()=> setshowRepeatPassword(!showRepeatPassword)}
                     />}
            />
            <Button
                title='Únete'
                containerStyle={styles.btnContainerRegister}
                buttonStyle={styles.btnRegister}
                onPress={onSubmit}
            />
            <Loading isVisible={isloading} text="Creando cuenta..."/>
        </View>
    )
}

function defaultFormValues(){
    return{
        email: '',
        phone: '',
        password: '',
        repeatpassword: ''
    }
}

const styles = StyleSheet.create({
    formContainer:{
        marginTop: 30,
        
    },
    inputForm:{
        width: '100%',
        marginTop: 20,
    },
    btnContainerRegister:{
        marginTop: 20,
        width: '95%',
        alignSelf: 'center'
    },
    btnRegister:{
        backgroundColor: '#0833A2',
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 20,
        
    },
    iconRight:{
        color:'#c1c1c1'
    }

})