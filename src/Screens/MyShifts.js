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
import Spinner from '../common/spinner';
import COLORS from '../common/colors';

const MyShifts = () => {
  const [myShifts, setMyShifts] = useState([]);
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
      newShifts = _.groupBy(newShifts, 'day');
      setMyShifts(newShifts);
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
  return (
    <ScrollView style={styles.container}>
      <View>
        {Object.keys(myShifts).map(key => {
          return (
            <View style={styles.sectionHeaderContainer}>
              <View>
                <Text style={styles.sectionHeader}>{key}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  sectionHeaderContainer: {
    backgroundColor: COLORS.CITY_LABEL_BG,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    height: 40,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  time: {
    fontSize: 16,
    color: '#333',
  },
  city: {
    fontSize: 14,
    color: '#999',
  },
  cancelButton: {
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ff4081',
    marginLeft: 'auto',
    width: 100,
    alignItems: 'center',
    height: 35,
  },
  cancelButtonText: {
    fontSize: 14,
    color: '#ff4081',
  },

  flatListContainer: {
    // marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 8,
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
});
