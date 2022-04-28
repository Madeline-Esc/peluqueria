import React, {useState} from "react"
import { StyleSheet, View } from "react-native"
import { Input, Button } from "react-native-elements"
import firebase from "firebase"

export default function ChangeDisplayNameForm(props){
    const {displayName, setShowModal, toastRef, setReloadUserInfo} = props
    const [newDisplayName, setNewDisplayName] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit= ()=>{
        setError(null)
        if(!newDisplayName){
            setError('El nombre no puede ser vacío.')
        } else if(displayName === newDisplayName){
            setError('El nombre no puede ser igual al actual.')
        }else{
            setIsLoading(true)
            const update = {
                displayName: newDisplayName
            }
            firebase
                .auth()
                .currentUser.updateProfile(update)
                .then(()=>{
                    toastRef.current.show({
                        type: 'info',
                        position: 'top',
                        text1: 'Excelente',
                        text2: 'Cambios realizados correctamente.',
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
                        text2: 'Error al actualizar el nombre.',
                        visibilityTime: 3000,
                    })
                    setIsLoading(false)
                })
        }
    }

    return(
        <View style={styles.view}>
            <Input
                placeholder='Nombre y Apellidos'
                containerStyle={styles.input}
                rightIcon={{
                    type:'material-community',
                    name:'account-circle-outline',
                    color:'#c2c2c2'
                }}
                defaultValue={displayName || ''}
                onChange={(e)=>setNewDisplayName(e.nativeEvent.text)}
                errorMessage={error}
            />
            <Button
                title= 'Cambiar nombre'
                containerStyle={styles.btnContair}
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
    btnContair:{
        marginTop:20,
        width: '95%'
    },
    btn:{
        backgroundColor: '#0833A2',
        borderRadius: 10
    }
})