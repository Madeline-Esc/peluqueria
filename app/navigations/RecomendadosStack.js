import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Recomendados from '../screens/Recomendados'


const Stack = createStackNavigator()

export default function RecomendadosStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='recomendados'
                component={Recomendados}
                options={{title:'Recomendados'}}
            />
        </Stack.Navigator>
    )
}