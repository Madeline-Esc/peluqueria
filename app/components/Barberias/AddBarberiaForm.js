import React, {useState} from 'react'
import { Alert, StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native'
import { Avatar, Button, Input, Icon, Image } from 'react-native-elements'
import { loadImageFromGallery } from '../../utils/Helpers'
import {map, size, filter, isEmpty} from 'lodash'
import Toast from 'react-native-toast-message'
import uuid from 'random-uuid-v4'
import { addDocumentWithoutId, uploadImage, getCurrentUser } from '../../utils/Actions'
import { validateEmail, validatePhone } from '../../utils/Validation'

const widthScreen = Dimensions.get('window').width

export default function AddBarberiaForm(props) {
  const {toastRef, setLoading, navigation} = props
  const [formData, setFormData] = useState(defaultFormValues())
  const [errorName, setErrorName] = useState(null)
  const [errorDescription, setErrorDescription] = useState(null)
  const [errorEmail, setErrorEmail] = useState(null)
  const [errorAdress, setErrorAdress] = useState(null)
  const [errorPhone, setErrorPhone] = useState(null)
  const [imagesSelected, setImagesSelected] = useState([])

  const addBarberia =  async () => {
    if (!validForm()) {
      return 
    }

    setLoading(true)
    const responseUploadImages = await uploadImages()
    const barberia = {
      name: formData.name, 
      adress: formData.adress,
      email: formData.email,
      description: formData.description,
      phone: formData.phone,
      images: responseUploadImages,
      rating: 0,
      ratingTotal: 0,
      quantityVoting: 0,
      createAt: new Date(),
      createBy: getCurrentUser().uid
      
    }
   const responseAddDocument = await addDocumentWithoutId("barberias")
    setLoading(false)

    if (!responseAddDocument.statusResponse) {
    console.log('Error al grabar el restaurante.')
    return
    }

    navigation.navigate("barberias")


    console.log(response)

    console.log(formData)
    console.log('Todo ok')
  }

  const uploadImages = async() => {
    const imageUrl = []
    await Promise.all(
       map(imagesSelected, async(image) => {
         const response = await uploadImage(image, "barberias", uuid())
       if (response.statusResponse) {
          imageUrl.push(response.url)
       }
        })
    )

  }

  const validForm = () => {
       clearErrors()
       let isValid = true
       
       if(isEmpty(formData.name)){
         setErrorName('Debes ingresar el nombre de la barbería.')
         isValid = false
       }

       
       if(isEmpty(formData.adress)){
        setErrorAdress('Debes ingresar la dirección de la barbería.')
        isValid = false
      }

      if(!validatePhone(formData.phone)){
        setErrorPhone('Debes ingresar el teléfono de la barbería.')
        isValid = false
      }

      if(isEmpty(formData.description)){
        setErrorDescription('Debes ingresar una descripción de la barbería.')
        isValid = false
      }

      
      if(!validateEmail(formData.email)){
        setErrorEmail('Debes ingresar un email válido.')
        isValid = false
      }
      
      if(size(imagesSelected) === 0) {
      isValid = false
  }
  
  return isValid
}
const clearErrors = () => {
  setErrorDescription(null)
  setErrorEmail(null)
  setErrorName(null)
  setErrorAdress(null)
  setErrorPhone(null)
}


  
  return (
    <ScrollView style={styles.formContainer}>
      <ImageBarberia
      imageBarberia={imagesSelected[0]}
      />
      <FormAdd
          formData={formData}
          setFormData={setFormData}
          errorName={errorName}
          errorDescription={errorDescription}
          errorEmail={errorEmail}
          errorAdress={errorAdress}
          errorPhone={errorPhone}
      />
      <UploadImage
          toastRef={toastRef}
          imagesSelected={imagesSelected}
          setImagesSelected={setImagesSelected}
      />
          
      <Button
          title='Agregar barbería'
          containerStyle={styles.btnContainerAdd}
          onPress={addBarberia}
          buttonStyle={styles.btnAddBarberia}
      />
    </ScrollView>
  )

}


function ImageBarberia({ imageBarberia}) {
  return (
    <View style={styles.viewPhoto}>
      <Image
      style={{width: widthScreen, height: 200}}
        source={
          imageBarberia
          ? { uri: imageBarberia}
          : require("../../../assets/img/noimagen.jpg")
        }
      />

    </View>
  )
}

function UploadImage({toastRef, imagesSelected, setImagesSelected}){
  const imageSelect = async() => {
    const response = await loadImageFromGallery([4, 3])
    if (!response.status){
      toastRef.current.show("No has seleccionado ninguna imagen", 3000)
      return
    }
    setImagesSelected([...imagesSelected, response.image])
  }

  const removeImage = (image) => {
    Alert.alert(
      "Eliminar imagen",
      "¿Estás seguro que quieres eliminar la imagen"
      [
        {
          text: "No",
          style: "cancel"
        },
        {
          text: "Sí",
          onPress: () => {
            setImagesSelected(
              filter(imagesSelected, (imageUrl) => imageUrl !== image)

           )
          }
        }
      ],
      {
        cancelable: false
      }
    )
  }
  
  return (
    <ScrollView
          horizontal
          style={styles.viewImages}
    >
     { 
       size(imagesSelected) < 1 && (
     <Icon 
        type="material-community"
        name="camera"
        color="#7a7a7a"
        containerStyle={styles.containerIcon}
        onPress={imageSelect}
        />
      )
     }
     {
        map(imagesSelected, (imageBarberia, index) => (
          <Avatar
            key={index}
            style={styles.miniatureStyle}
            source={{uri: imageBarberia}}
            onPress={() => removeImage(imageBarberia)}
          />
        ))

     }
     

    </ScrollView>
  )
}



function FormAdd({formData, setFormData, errorName, errorDescription, errorEmail, errorAdress, errorPhone}) {
  
   const onChange =(e,type)=>{
     setFormData({...formData,[type] : e.nativeEvent.text})
   }


    return (
      <View style={styles.formContainer}>
           <Input
              placeholder='Nombre de la barbería'
              containerStyle={styles.inputForm}
              defaultValue={formData.name}
              onChange={(e) => onChange(e, "name")}
              errorMessage={errorName}
           />
           <Input
              placeholder='Descripción'
              multiline
              containerStyle={styles.inputForm}
              defaultValue={formData.description}
              onChange={(e) => onChange(e, "description")}
              errorMessage={errorDescription}
           />
            <Input
              placeholder='Dirección de la barbería'
              containerStyle={styles.inputForm}
              defaultValue={formData.adress}
              onChange={(e) => onChange(e, "adress")}
              errorMessage={errorAdress}
           />
          <Input
              placeholder='Teléfono'
              containerStyle={styles.inputForm}
              keyboardType='phone-pad'
              defaultValue={formData.phone}
              onChange={(e) => onChange(e, "phone")}
              errorMessage={errorPhone}
           />
             <Input
              placeholder='Email'
              containerStyle={styles.inputForm}
              defaultValue={formData.email}
              onChange={(e) => onChange(e, "email")}
              errorMessage={errorEmail}

           />
  
         </View>
    )
}


const defaultFormValues = () => {
  return {
    name: "",
    description: "",
    phone: "",
    adress: "",
    email: ""
  }
}

const styles = StyleSheet.create({
  formContainer:{
    marginTop: 30,
    
},
inputForm:{
    width: '85%',
    marginTop: 20,
    alignSelf: 'center'
},
btnContainerAdd:{
  marginTop: 20,
  width: '95%',
  alignSelf: 'center'
},
btnAddBarberia:{
  marginTop: 30,
  borderRadius: 10,
  backgroundColor: '#0833A2',
  borderTopColor: '#e3e3e3',
  alignItems: 'center',
  justifyContent: 'center',
  borderBottomWidth: 1,
  borderBottomColor: '#e3e3e3',
  alignSelf: 'center',
  paddingTop: 10,
  paddingBottom: 10,
  width: '75%'
 },
 viewImages: {
   flexDirection: 'row',
   marginHorizontal: 20,
   marginTop: 30
 },
 containerIcon:{
   alignItems: 'center',
   justifyContent: 'center',
   marginRight: 10,
   height: 70,
   width: 70,
   backgroundColor: '#e3e3e3'
 }, 
 miniatureStyle: {
   width: 70,
   height: 70,
   marginRight: 10
 },
 viewPhoto: {
   alignItems: 'center',
   height: 200,
   marginBottom: 20
 }
}) 

