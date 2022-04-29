import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Barberias from '../screens/Peluquerias/Barberias'
import AddBarberia from '../screens/Peluquerias/AddBarberia'

const Stack = createStackNavigator()

export default function BarberiasStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='barberias'
                component={Barberias}
                options={{title:'Barberías'}}
            />
            <Stack.Screen
                name='add-barberia'
                component={AddBarberia}
                options={{title:'Agregar barbería'}}
            />
        </Stack.Navigator>
    )
}