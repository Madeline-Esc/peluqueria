import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'

import BarberiasStack from './BarberiasStack'
import FavoritosStack from './FavoritosStack'
import EsteticasStack from './EsteticasStack'
import BusquedaStack from './BusquedaStack'
import RecomendadosStack from './RecomendadosStack'
import PerfilStack from './PerfilStack'
import NovedadesStack from './NovedadesStack'

const Tab = createBottomTabNavigator()

export default function Navigation(){
    return(
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName='barberias'
                tabBarOptions={{
                    inactiveTintColor: '#9b9b9b',
                    activeTintColor: '#0833A2'
                }}
                screenOptions={({route}) => ({
                    tabBarIcon:({color}) =>screenOptions(route, color)
                })}
            >
                <Tab.Screen 
                name='barberias' 
                component={BarberiasStack}
                options={{title:"Barberías"}}
                />
                <Tab.Screen 
                name='esteticas' 
                component={EsteticasStack}
                options={{title:"Estéticas"}}
                />
                <Tab.Screen 
                name='favoritos' 
                component={FavoritosStack}
                options={{title:"Favoritos"}}
                />
                <Tab.Screen 
                name='busqueda' 
                component={BusquedaStack}
                options={{title:"Busqueda"}}
                />
                <Tab.Screen 
                name='recomendados' 
                component={RecomendadosStack}
                options={{title:"Recomendados"}}
                />
                <Tab.Screen 
                name='novedades' 
                component={NovedadesStack}
                options={{title:"Novedades"}}
                />
                <Tab.Screen 
                name='perfil' 
                component={PerfilStack}
                options={{title:"Perfil"}}
                />
            </Tab.Navigator>
            
        </NavigationContainer>
    )
}

function screenOptions(route, color){
    let iconName
    switch (route.name) {
        case 'barberias':
            iconName='smoking-pipe'
            break
        case 'esteticas':
            iconName='content-cut'
            break
        case 'favoritos':
            iconName='star'
            break
        case 'busqueda':
            iconName='home-search'
            break
        case 'perfil':
            iconName='card-account-details'
            break
        case 'recomendados':
            iconName='thumb-up'
            break
        case 'novedades':
            iconName='newspaper'
    }
    return(
        <Icon type='material-community' name={iconName} size={22} color={color}/>
    )
}