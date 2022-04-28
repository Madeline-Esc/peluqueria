import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { Input, Icon, Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { validateEmail } from '../../utils/Validation'
import firebase from 'firebase'
import Loading from '../Loading'

export default function LoginForm(props) {
    const {toastRef} = props
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState(defaultFormValues())
    const navigation = useNavigation()

    const onSubmit = () =>{
      if(formData.email.length===0||formData.password.length===0){
          toastRef.current.show({
             type: 'error',
             position: 'top',
             text1: 'Opps!',
             text2: 'Hay campos vacios. Intente nuevamente.',
             visibilityTime: 3000,
         });
      } else if (!validateEmail(formData.email)){
          toastRef.current.show({
              type: 'error',
              position: 'top',
              text1: 'Email',
              text2: 'El Correo electrónico es incorrecto. Inténtalo de nuevo.',
              visibilityTime: 3000,
          });
      }else{
      setIsLoading(true) 
        firebase
            .auth()
            .signInWithEmailAndPassword(formData.email, formData.password)
            .then(()=>{
      
              navigation.navigate('perfil')
            })
            .catch(()=>{
              toastRef.current.show({
                  type: 'error',
                  position: 'top',
                  text1: 'Cuenta',
                  text2: 'Correo electrónico o la contraseña que has introducido no son correctas.',
                  visibilityTime: 3000,
              })
        setIsLoading(false)
          })

      }
   
  }
    const onChange = (e, type) =>{
      setFormData({ ...formData, [type]: e.nativeEvent.text})
  }

  return (
    <View style={styles.container}>
        <Input
            placeholder='Correo Electrónico'
            containerStyle={styles.inputForm}
            onChange={(e)=>onChange(e, 'email')}
            rightIcon={<Icon 
                type='material-community' 
                name='gmail' 
                iconStyle={styles.iconRight}/>}
        />
        <Input
            placeholder='Contraseña'
            containerStyle={styles.inputForm}
            onChange={(e)=>onChange(e, 'password')}
            password={true}
            secureTextEntry={showPassword ? false : true}
            rightIcon={<Icon 
                type='material-community' 
                name={showPassword ?'eye-off' : 'eye'} 
                iconStyle={styles.iconRight}
                onPress={()=> setShowPassword(!showPassword)}
            />
            }
          />
          <Button
                title='Inicia Sesión'
                containerStyle={styles.btnContainerLogin}
                buttonStyle={styles.btnLogin}
                onPress={onSubmit}
            />
          <Loading isVisible = {isLoading} text = 'Iniciando Sesión..'/>
    </View>
  )
}

function defaultFormValues(){
  return{
      email: '',
      password: ''
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 30
  },
  inputForm:{
    width: '100%',
    marginBottom: 15
  },
  btnContainerLogin:{
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 10,
    width: '95%'
  },
  btnLogin:{
    backgroundColor:'#0833A2'
  },
  iconRight:{
    color: '#c1c1c1'
  }
})