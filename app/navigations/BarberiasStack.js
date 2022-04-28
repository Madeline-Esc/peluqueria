import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Barberias from '../screens/Peluquerias/Barberias'

const Stack = createStackNavigator()

export default function BarberiasStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='barberias'
                component={Barberias}
                options={{title:'Barberías'}}
            />
        </Stack.Navigator>
    )
}