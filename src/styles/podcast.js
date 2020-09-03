import { StyleSheet } from 'react-native';
const podcastStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contentWrapper: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    color: '#123F68',
    paddingLeft: 15,
    marginBottom: 10,
  },
  dateContainer: {
    marginBottom: 20,
  },
  dateInput: {
    backgroundColor: '#ffffff',
    marginHorizontal: 10,
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  dateInputTitle: {
    fontSize: 16,
    color: '#123F68',
  },
  podcastTitle: {
    fontSize: 16,
    color: '#123F68',
    marginTop: 15,
  },
  podcastSubTitle: {
    fontSize: 14,
    color: '#123F68',
    marginBottom: 15,
  },
  podcastDatePickerOk: {
    width: 100,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#123F68',
    alignSelf: 'flex-end',
    marginRight: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'transparent',
  },
  podcastBtnClose: {
    width: 35,
    height: 35,
    position: 'absolute',
    bottom: 26,
    right: 17,
    borderRadius: 50,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#123F68',
  },
});
export default podcastStyle;
