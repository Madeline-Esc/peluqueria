import React, {useRef, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AddBarberiaForm from '../../components/Barberias/AddBarberiaForm'
import Toast from 'react-native-toast-message'
import Loading from '../../components/Loading'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'



export default function AddBarberia( {navigation}) {
    const toastRef = useRef()
    const [loading, setLoading] = useState(false)

  return (
    <KeyboardAwareScrollView>
      <AddBarberiaForm 
          toastRef={toastRef} 
          setLoading={setLoading}
          navigation={navigation}
      />
      <Loading isVisible={loading} text= "Agregando barbería..."/>
      <Toast ref={toastRef}/>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({})