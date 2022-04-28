import React from "react"
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native'
import { Button } from 'react-native-elements'
import { useNavigation} from '@react-navigation/native'

export default function Invitado(){
    const navigation = useNavigation()
    return(
        <ScrollView style={StyleSheet.container}>
            <Image
                style={styles.stretch}
                source={require('../../../assets/img/Registro.png')}
            />
            <Text style={styles.title}>Accede a tu perfil</Text>
            <Text style={styles.description}>
                ¡Conoce todas las opciones de peluquerías y estéticas de la ciudad!
            </Text>
            <View style={styles.viewBtn}>
                <Button
                    title='Ver tu perfil'
                    buttonStyle={styles.btnStyle}
                    containerStyle={styles.btnContainer}
                    onPress={()=>navigation.navigate('login')}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingTop: 10
    },
    stretch:{
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        marginBottom: 40,
        marginTop: 30
    },
    title:{
        fontWeight: 'bold',
        fontSize: 19,
        marginBottom: 10,
        textAlign: 'center'
    },
    description:{
        marginBottom: 20,
        textAlign: 'center'
    },
    viewBtn:{
        flex:1,
        alignItems: 'center'
    },
    viewBtn:{
        flex:1,
        alignItems: 'center'
    },
    btnStyle:{
        backgroundColor:'#0833A2',
        borderRadius: 10     
    },
    btnContainer:{
        width:'70%',
        marginTop: 15
    }
})
