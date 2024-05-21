import _ from 'lodash';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, ScrollView, Pressable} from 'react-native';
import * as shifts from '../services/shifts';
import styles from '../common/styles';
import Loader from '../common/loader';

const MyShifts = () => {
  const [myShifts, setMyShifts] = useState([]);
  const [isLoading, setLoading] = useState(false);

  /**
   * Get time difference between two time intervals in hours and minutes
   */
  const getTimeDifference = (start, end) => {
    const startMoment = moment(start, 'HH:mm');
    const endMoment = moment(end, 'HH:mm');
    const duration = moment.duration(endMoment.diff(startMoment));
    const hours = duration.hours();
    const minutes = duration.minutes();
    return {hours, minutes};
  };

  /**
   * Fetch all shifts
   */
  useEffect(() => {
    const getAllShifts = async () => {
      setLoading(true);
      const res = await shifts.getAllShifts();
      let newShifts = res.map(item => {
        let startTime = moment(item.startTime).format('H:mm');
        let endTime = moment(item.endTime).format('H:mm');
        const totaHrs = getTimeDifference(startTime, endTime);
        return {
          ...item,
          day: moment(item.startTime).format('MMM DD'),
          startTime: startTime,
          endTime: endTime,
          total_hrs: totaHrs,
        };
      });
      newShifts = _.groupBy(newShifts, 'day');
      setMyShifts(newShifts);
      !_.isEmpty(newShifts) && setLoading(false);
    };
    getAllShifts();
  }, []);

  /**
   * Cancel shift
   * @param {*} shift
   */
  const handleCancelShift = async shift => {
    try {
      const res = await shifts.cancelShift(shift.id);
      console.log('shift cancel', res);
    } catch (e) {
      console.log('error', shifts);
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <ScrollView style={styles.container}>
      <View>
        {Object.keys(myShifts).map(key => {
          let totalHrs = 0;

          myShifts[key].map(item => {
            totalHrs =
              item.total_hrs?.hours + item.total_hrs?.minutes + totalHrs;
          });
          return (
            <View style={styles.sectionHeaderContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>{key}</Text>
                <Text style={styles.sectionHeaderShiftText}>
                  {`${myShifts[key].length} Shifts,`} {`${totalHrs} Hrs`}
                </Text>
              </View>
              {myShifts[key].map(item => {
                return (
                  <DisplayMyShifts
                    item={item}
                    handleCancelShift={handleCancelShift}
                  />
                );
              })}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

/**
 * Displays a list of Shifts
 *
 * @param {Shifts[]} item
 * @returns
 */
export const DisplayMyShifts = ({item, handleCancelShift}) => {
  /* spinner has not been implemented in Book/cancel button as cancel and book apis are not working */
  const shifts = item;
  return (
    <View style={styles.flatListContainer}>
      <View style={styles.item}>
        <View>
          <Text style={styles.time}>
            {shifts.startTime}-{shifts.endTime}
          </Text>
          <Text style={styles.city}>{shifts.area}</Text>
        </View>
        <Pressable
          style={({pressed}) => [
            styles.cancelButton,
            pressed && {
              ...styles.cancelButton,
              backgroundColor: '#EED2DF',
            },
          ]}>
          <Text
            style={styles.cancelButtonText}
            onPress={() => handleCancelShift(shifts)}>
            Cancel
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default MyShifts;
