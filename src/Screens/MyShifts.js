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

const MyShifts = () => {
  const [myShifts, setMyShifts] = useState([]);
  const [loading, setLoading] = useState(false);
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

  const handleCancelShift = shift => {
    console.log('shift book', shift);
  };

  const displayMyShifts = item => {
    const shifts = item.item;
    return (
      <View style={styles.flatListContainer}>
        <View style={styles.item}>
          <View>
            <Text>
              {shifts.startTime}-{shifts.endTime}
            </Text>
            <Text>{shifts.area}</Text>
          </View>
          <View style={styles.cancelBtn}>
            <Button title="Cancel" onPress={() => handleCancelShift(shifts)} />
          </View>
        </View>
      </View>
    );
  };
  return (
    <ScrollView>
      <View>
        {Object.keys(myShifts).map(key => {
          return (
            <View>
              <View>
                <Text style={styles.title}>{key}</Text>
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
});
