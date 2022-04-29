import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Esteticas from '../screens/Peluquerias/Esteticas'
import AddEstetica from '../screens/Peluquerias/AddEstetica'

const Stack = createStackNavigator()

export default function EsteticasStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='esteticas'
                component={Esteticas}
                options={{title:'Estéticas'}}
            />
             <Stack.Screen
                name='add-estetica'
                component={AddEstetica}
                options={{title:'Agregar estética'}}
            />
        </Stack.Navigator>
    )
}