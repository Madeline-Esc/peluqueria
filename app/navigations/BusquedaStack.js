import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Busqueda from '../screens/Busqueda'

const Stack = createStackNavigator()

export default function BusquedaStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='busqueda'
                component={Busqueda}
                options={{title:'Busqueda'}}
            />
        </Stack.Navigator>
    )
}