import {StyleSheet} from 'react-native';
const authStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#123F68',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '90%',
  },
  inputContainer: {
    borderBottomWidth: 0,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginVertical: 10,
    fontSize: 16,
    color: '#123F68',
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    paddingLeft: 30,
    paddingRight: 10,
  },
  actionLinkWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  actionLink: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 25,
  },
  rememberContainer: {
    backgroundColor: '#123F68',
    borderColor: '#123F68',
  },
  rememberLink: {
    color: '#fff',
    fontSize: 14,
  },
  actionBtn: {
    backgroundColor: '#DBB110',
    borderRadius: 25,
    height: 50,
    paddingHorizontal: 35,
  },
  actionBtnText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  error: {color: '#DBB110', fontSize: 12, paddingLeft: 30},
});
export default authStyle;
