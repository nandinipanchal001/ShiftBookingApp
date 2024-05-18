import _ from 'lodash';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, ScrollView} from 'react-native';
import * as shifts from '../services/shifts';
import Spinner from '../common/spinnerIcon';
import styles from '../common/styles';
import Loader from '../common/loader';

const MyShifts = () => {
  const [myShifts, setMyShifts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const getAllShifts = async () => {
      setLoading(true);
      const res = await shifts.getAllShifts();
      let newShifts = res.map(item => {
        return {
          ...item,
          day: moment(item.startTime).format('MMM DD'),
          startTime: moment(item.startTime).format('H:mm'),
          endTime: moment(item.endTime).format('H:mm'),
        };
      });
      newShifts = _.groupBy(newShifts, 'day');
      setMyShifts(newShifts);
      !_.isEmpty(newShifts) && setLoading(false);
    };
    getAllShifts();
  }, []);

  const handleCancelShift = async shift => {
    try {
      const res = await shifts.cancelShift(shift.id);
      console.log('shift cancel', res);
    } catch (e) {
      console.log('error', shifts);
    }
  };

  const displayMyShifts = item => {
    const shifts = item.item;
    return (
      <View style={styles.flatListContainer}>
        <View style={styles.item}>
          <View>
            <Text style={styles.time}>
              {shifts.startTime}-{shifts.endTime}
            </Text>
            <Text style={styles.city}>{shifts.area}</Text>
          </View>
          <View style={styles.cancelButton}>
            <Text
              style={styles.cancelButtonText}
              onPress={() => handleCancelShift(shifts)}>
              Cancel
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return isLoading ? (
    <Loader />
  ) : (
    <ScrollView style={styles.container}>
      <View>
        {Object.keys(myShifts).map(key => {
          return (
            <View style={styles.sectionHeaderContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>{key}</Text>
                <Text
                  style={
                    styles.sectionHeaderShiftText
                  }>{`${myShifts[key].length} Shifts`}</Text>
              </View>
              <FlatList
                keyExtractor={item => item.id}
                data={myShifts[key]}
                renderItem={item => displayMyShifts(item)}
              />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default MyShifts;
