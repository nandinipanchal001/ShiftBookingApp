import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AvailableShifts from '../screens/AvailableShifts';
import MyShifts from '../screens/MyShifts';
import COLORS from '../common/colors';

const Tab = createBottomTabNavigator();

const tabOptions = {
  // tabBarActiveTintColor: '#004FB4',
  tabBarInactiveTintColor: COLORS.BOTTOM_TAB_NAVIGATOR_PRIMARY_COLOR,
  tabBarIconStyle: {display: 'none'},
  tabBarLabelStyle: {
    fontWeight: '500',
    fontSize: 16,
    paddingBottom:10
  },
  headerShown: false,
};

const ApplicationNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={tabOptions}>
        <Tab.Screen name="My Shifts" component={MyShifts} />
        <Tab.Screen name="Available Shifts" component={AvailableShifts} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
