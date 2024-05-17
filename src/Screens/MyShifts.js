import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import * as shifts from '../services/shifts';

const MyShifts = () => {
  useEffect(() => {
    const getAllShifts = async () => {
      const res = await shifts.getAllShifts();
      console.log('res===', res);
    };
    getAllShifts();
  }, []);

  return (
    <View>
      <Text>My shifts!</Text>
    </View>
  );
};

export default MyShifts;
