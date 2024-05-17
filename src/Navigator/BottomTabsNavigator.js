import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AvailableShifts from '../screens/AvailableShifts';
import MyShifts from '../screens/MyShifts';

const Tab = createBottomTabNavigator();

const ApplicationNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="My Shifts" component={MyShifts} />
        <Tab.Screen name="Available Shifts" component={AvailableShifts} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
