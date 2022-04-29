import React, {useRef, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AddEsteticaForm from '../../components/Esteticas/AddEsteticaForm'
import Toast from 'react-native-toast-message'
import Loading from '../../components/Loading'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default function AddEstetica( {navigation}) {
    const toastRef = useRef()
    const [loading, setLoading] = useState(false)

  return (
    <KeyboardAwareScrollView>
      <AddEsteticaForm 
          toastRef={toastRef} 
          setLoading={setLoading}
          navigation={navigation}
      />
      <Loading isVisible={loading} text= "Agregando estética..."/>
      <Toast ref={toastRef}/>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({})