import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AvailableShifts from '../Screens/AvailableShifts';
import MyShifts from '../Screens/MyShifts';

const Tab = createBottomTabNavigator();

const ApplicationNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Available Shifts" component={AvailableShifts} />
        <Tab.Screen name="My Shifts" component={MyShifts} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
