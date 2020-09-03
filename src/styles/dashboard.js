import {StyleSheet} from 'react-native';
const dashboardStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 16,
    color: '#123F68',
    marginBottom: 15,
  },
  latestPodcastTitle: {
    fontSize: 16,
    color: '#123F68',
    marginTop: 10,
  },
  latestPodcastSubTitle: {
    fontSize: 14,
    color: '#123F68',
  },
  podcast: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginRight: 20,
  },
  podcastTitle: {
    fontSize: 14,
    color: '#123F68',
    marginTop: 10,
  },
  notificationCard: {
    margin: 0,
    padding: 0,
    height: 130,
    borderRadius: 1,
    overflow: 'hidden',
    backgroundColor: '#FAFAFA',
    width: 300,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 60,
    marginRight: 10,
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
    marginBottom: 5,
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
});
export default dashboardStyle;
