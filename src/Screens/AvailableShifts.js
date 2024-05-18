import _ from 'lodash';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  ScrollView,
  StyleSheet,
} from 'react-native';
import * as shifts from '../services/shifts';
import styles from '../common/styles';
import COLORS from '../common/colors';

const AvailableShifts = () => {
  const [availableShifts, setAvailableShifts] = useState([]);
  const [filterCities, setFilterCities] = useState([]);
  const [filterBy, setFilterBy] = useState('');
  const [data, setData] = useState([]);

  const handleCancelShift = async shift => {
    try {
      const res = await shifts.cancelShift(shift.id);
      console.log('shift cancel', res);
    } catch (e) {
      console.log('error', shifts);
    }
  };

  const handleBookShift = async shift => {
    try {
      const res = await shifts.bookShift(shift.id);
      console.log('shift cancel', res);
    } catch (e) {
      console.log('error', shifts);
    }
  };

  useEffect(() => {
    const getAllShifts = async () => {
      const res = await shifts.getAllShifts();
      let newShifts = res.map(item => {
        return {
          ...item,
          day: moment(item.startTime).format('MMM DD'),
          startTime: moment(item.startTime).format('H:mm'),
          endTime: moment(item.endTime).format('H:mm'),
        };
      });
      setData(newShifts);

      let citiesCount = _.groupBy(res, 'area');
      let cities = _.map(res, 'area');
      cities = _.uniqBy(cities);
      let newCities = cities.map(item => {
        return {
          city: item,
          count: citiesCount[item].length,
        };
      });
      /*
       * set Filter cities and and the default city for which list to be displayed
       */
      setFilterCities(newCities);
      setFilterBy(cities[0]);
    };
    getAllShifts();
  }, []);

  useEffect(() => {
    /* set final data in the list depending on the filtered city/area */
    if (filterBy) {
      let newData = data.filter(item => item.area == filterBy);
      newData = _.groupBy(newData, 'day');
      console.log('shifts filter', newData);
      setAvailableShifts(newData);
    }
  }, [filterBy]);

  const displayAvailableShifts = item => {
    const shifts = item.item;
    return (
      <View style={{...styles.flatListContainer, paddingVertical: 6}}>
        <View style={styles.item}>
          <View>
            <Text style={styles.time}>
              {shifts.startTime}-{shifts.endTime}
            </Text>
          </View>
          <View>
            <Text>{shifts.booked ? 'Booked' : ''}</Text>
          </View>
          <View
            style={{
              ...styles.cancelButton,
              borderColor: !shifts.booked && COLORS.BOOK_BTN_BORDER,
            }}>
            <Text
              style={{
                ...styles.cancelButtonText,
                color: !shifts.booked && COLORS.BOOK_TEXT,
              }}
              // title={shifts.booked ? 'Cancel' : 'Book'}
              onPress={() => {
                let res;
                if (shifts.booked) {
                  res = handleCancelShift(shifts);
                } else {
                  res = handleBookShift(shifts);
                }
              }}>
              {shifts.booked ? 'Cancel' : 'Book'}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {filterCities.map(item => {
          let isActive = false;
          if (item.city == filterBy) {
            isActive = true;
          }
          return (
            <Text
              style={{
                ...styles.headerLabel,
                color: isActive
                  ? COLORS.FILTER_ACTIVE_TEXT
                  : COLORS.FILTER_INACTIVE_TEXT,
              }}
              onPress={() => setFilterBy(item.city)}>
              {item.city}
              {`(${item.count})`}
            </Text>
          );
        })}
      </View>

      <ScrollView>
        <View>
          {Object.keys(availableShifts).map(key => {
            return (
              <View style={styles.sectionHeaderContainer}>
                <View>
                  <Text style={styles.sectionHeader}>{key}</Text>
                </View>
                <FlatList
                  keyExtractor={item => item.id}
                  data={availableShifts[key]}
                  renderItem={item => displayAvailableShifts(item)}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default AvailableShifts;
