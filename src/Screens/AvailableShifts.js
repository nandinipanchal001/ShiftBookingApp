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
      <View style={styles.flatListContainer}>
        <View style={styles.item}>
          <View>
            <Text>
              {shifts.startTime}-{shifts.endTime}
            </Text>
          </View>
          <View>
            <Text>{shifts.booked ? 'Booked' : ''}</Text>
          </View>
          <View style={styles.cancelBtn}>
            <Button
              title={shifts.booked ? 'Cancel' : 'Book'}
              onPress={() => {
                let res;
                if (shifts.booked) {
                  res = handleCancelShift(shifts);
                } else {
                  res = handleBookShift(shifts);
                }
              }}
            />
          </View>
        </View>
      </View>
    );
  };
  return (
    <View>
      <View style={styles.header}>
        {filterCities.map(item => {
          return (
            <Text
              style={styles.headerLabel}
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
              <View>
                <View>
                  <Text style={styles.title}>{key}</Text>
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

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  flatListContainer: {
    marginBottom: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: 2,
  },
  cancelBtn: {marginLeft: 'auto'},
  header: {
    display: 'flex',
    flexDirection: 'row',
    // backgroundColor: 'green',
    padding: 10,
    justifyContent: 'space-between',
  },
  headerLabel: {
    margin: 10,
    // backgroundColor:'yellow',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
