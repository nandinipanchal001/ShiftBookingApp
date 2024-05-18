import _ from 'lodash';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, ScrollView, Pressable} from 'react-native';
import * as shifts from '../services/shifts';
import styles from '../common/styles';
import COLORS from '../common/colors';
import Loader from '../common/loader';

const AvailableShifts = () => {
  const [availableShifts, setAvailableShifts] = useState([]);
  const [filterCities, setFilterCities] = useState([]);
  const [filterBy, setFilterBy] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

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
      setLoading(false);
    }
  }, [filterBy]);

  const displayAvailableShifts = item => {
    /* spinner not implemented in Book/cancel button as cancel and book apis are not working */
    const shifts = item.item;
    let BookBtn = {
      ...styles.cancelButton,
      borderColor: !shifts.booked && COLORS.BOOK_BTN_BORDER,
    };
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
          <Pressable
            style={({pressed}) => [
              BookBtn,
              pressed && {
                ...styles.cancelButton,
                borderColor: !shifts.booked && COLORS.BOOK_BTN_BORDER,
                backgroundColor: '#CAEFD8',
              },
            ]}>
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
          </Pressable>
        </View>
      </View>
    );
  };

  return isLoading ? (
    <Loader />
  ) : (
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
              onPress={() => {
                setFilterBy(item.city);
                // setLoading(true);
              }}>
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
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionHeaderText}>{key}</Text>
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
