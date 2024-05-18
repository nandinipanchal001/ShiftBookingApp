import COLORS from './colors';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY_SCREEN_BG,
  },
  sectionHeaderContainer: {
    backgroundColor: COLORS.CITY_LABEL_BG,
    // borderBottomWidth: 1,
    // borderBottomColor: COLORS.BORDER_COLOR,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.DATE_COLOR,
    // borderBottomWidth: 1,
    // borderBottomColor: COLORS.BORDER_COLOR,
    height: 40,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_COLOR,
  },
  sectionHeaderShiftText: {
    paddingVertical: 8,
    // borderBottomWidth: 1,
    // borderBottomColor: COLORS.BORDER_COLOR,
    // color:''
  },
  time: {
    fontSize: 16,
    color: COLORS.TIME,
  },
  city: {
    fontSize: 14,
    color: COLORS.CITY,
  },
  cancelButton: {
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: COLORS.CANCEL_BTN_BORDER,
    marginLeft: 'auto',
    width: 100,
    alignItems: 'center',
    height: 35,
  },
  cancelButtonText: {
    fontSize: 14,
    color: COLORS.CANCEL_TEXT,
  },

  flatListContainer: {
    // marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_COLOR,
    backgroundColor: COLORS.PRIMARY_SCREEN_BG,
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
  header: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    borderBottomColor: COLORS.BORDER_COLOR,
  },
  headerLabel: {
    margin: 10,
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default styles;
