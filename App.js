import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Importacion de componentes 
import Tab1Screen from './screens/GestionGastos';
import Tab2Screen from './screens/Comparador';


const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="GestionGastos" component={Tab1Screen} />
        <Tab.Screen name="Comparador" component={Tab2Screen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

