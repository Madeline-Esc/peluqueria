import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Perfil from '../screens/Account/Perfil'
import Login from '../screens/Account/Login'
import Register from '../screens/Account/Register'

const Stack = createStackNavigator()

export default function PerfilStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='perfil'
                component={Perfil}
                options={{title:'Perfil'}}
            />
            <Stack.Screen
                name='login'
                component={Login}
                options={{title:'Inicie sesión'}}
            />
            <Stack.Screen
                name='register'
                component={Register}
                options={{title:'Registro'}}
            />
        </Stack.Navigator>
    )
}