import {StyleSheet} from 'react-native';
const notificationStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contentWrapper: {
    marginTop: 20,
  },
  title: {
    fontSize: 16,
    color: '#123F68',
    paddingLeft: 15,
    marginBottom: 15,
  },
  notificationCard: {
    margin: 0,
    padding: 0,
    backgroundColor: '#FAFAFA',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 80,
    borderWidth: 0.3,
    borderStyle: 'solid',
    borderColor: '#D8D8D8',
  },
  notificationContentWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  notificationImage: {
    borderRadius: 30,
    overflow: 'hidden',
    marginRight: 20,
  },
  notificationContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  notificationTitle: {
    fontSize: 14,
    color: '#123F68',
    lineHeight: 20,
    marginBottom: 5,
  },
  notificationLink: {
    fontSize: 14,
    color: '#0000FF',
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  notificationTimeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationTime: {
    fontSize: 12,
    color: '#123F68',
  },
  notificationDetailContentWrapper: {
    marginTop: 25,
    paddingLeft: 20,
    paddingRight: 20,
  },
  notificationDetailTitle: {
    fontSize: 16,
    color: '#123F68',
    marginBottom: 20,
  },
  notificationDetailContent: {
    fontSize: 14,
    color: '#123F68',
    lineHeight: 20,
  },
  notificationDetailTimeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  notificationDetailTime: {
    fontSize: 14,
    color: '#123F68',
  },
  notificationDetailBtn: {
    padding: 10,
    marginTop: 20,
    width: 120,
    backgroundColor: '#123F68',
    borderRadius: 25,
    overflow: 'hidden',
  },
  notificationDetailBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
  },
});
export default notificationStyle;
