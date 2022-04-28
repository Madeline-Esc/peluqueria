import React, {useRef} from "react"
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native'
import { Divider } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LoginForm from '../../components/Account/LoginForm'
import Toast from 'react-native-toast-message'


export default function Login(){
    const toastRef = useRef()
    return(
    <KeyboardAwareScrollView>
        <Image
            source={require('../../../assets/img/LogoPH.png')}
            resizeMode='contain'
            style={styles.logo}
        
        />
            <View style={styles.viewContainer}>
                <LoginForm toastRef={toastRef}/> 
                <CreateAccount/>
            </View>
            <Toast ref={toastRef}/>
            <Divider style={styles.divider}/>
    </KeyboardAwareScrollView>
    )
}

function CreateAccount(){
    const navigation = useNavigation()
    return(
        <Text style = {styles.textRegister}>
           ¿Aún no tienes cuenta? { ' '}
            <Text 
                style= {styles.linkRegister}
                onPress={()=>navigation.navigate('register')}
            >
                Regístrate
            </Text>
        </Text>

    )
}

const styles = StyleSheet.create({
    logo:{
        width: '100%',
        height: 250,
        marginTop: 5,
    },
    viewContainer:{
        marginRight:40,
        marginLeft: 40
    },
    divider:{
        backgroundColor: '#0833A2',
        margin: 40
    },
    textRegister:{
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
        textAlign: 'center'
    },
    linkRegister:{
        color: '#0833A2',
        fontWeight: 'bold'
    }

})