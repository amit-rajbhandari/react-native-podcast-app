import React, {useEffect, useReducer, useMemo} from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Dashboard from '../screens/dashboard';
import Podcast from '../screens/podcast';
import Andelsspel from '../screens/andelsspel';
import Notification from '../screens/notification';
import Push from '../screens/push';
import NotificationDetail from '../screens/notification/detail';
import Setting from '../screens/setting';
import Login from '../screens/auth/login';
import Register from '../screens/auth/register';
import Video from '../screens/video';
import ResetPassword from '../screens/auth/reset-password';
import ForgotPassword from '../screens/auth/forgot-password';
import tokenService from '../services/token.service';
import AuthContext from '../provider/auth-context';
import VideoContextProvider from '../provider/video-context-provider';
import SplashScreen from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Platform} from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const NotificationStack = createStackNavigator();

function NotificationStackScreen() {
  return (
    <NotificationStack.Navigator headerMode="none">
      <NotificationStack.Screen name="Notification" component={Notification} />
      <NotificationStack.Screen
        name="NotificationDetail"
        component={NotificationDetail}
      />
    </NotificationStack.Navigator>
  );
}

function Root() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeBackgroundColor: '#123F68',
        inactiveBackgroundColor: '#123F68',
        tabStyle: {paddingBottom: 5, paddingTop: 5},
        style: {backgroundColor: '#123F68'},
        labelStyle: {
          color: '#fff',
          fontFamily: 'SourceSansPro-Regular',
          fontSize: 12,
        },
      }}
      backBehavior={'initialRoute'}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Hem',
          tabBarIcon: () => (
            <Image
              style={{width: 30, height: 30}}
              source={require('../assets/icons/home.png')}
            />
          ),
        }}
        name="Home"
        component={Dashboard}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Podcasts',
          tabBarIcon: () => (
            <Image
              style={{width: 30, height: 30}}
              source={require('../assets/icons/podcast.png')}
            />
          ),
        }}
        name="Podcasts"
        component={Podcast}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Notiser',
          tabBarIcon: () => (
            <Image
              style={{width: 30, height: 30}}
              source={require('../assets/icons/notification.png')}
            />
          ),
        }}
        name="Notifications"
        component={NotificationStackScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Andelsspel',
          tabBarIcon: () => (
            <Image
              style={{width: 30, height: 30}}
              source={require('../assets/icons/dollar.png')}
            />
          ),
        }}
        name="Andelsspel"
        component={Andelsspel}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Inställningar',
          tabBarIcon: () => (
            <Image
              style={{width: 30, height: 30}}
              source={require('../assets/icons/setting.png')}
            />
          ),
        }}
        name="Settings"
        component={Setting}
      />
    </Tab.Navigator>
  );
}
const Navigation = () => {
  const isMountedRef = React.createRef();
  const navigationRef = React.createRef();
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  useEffect(() => {
    const checkLoggedIn = async () => {
      let res;
      try {
        res = await tokenService.getToken();
      } catch (e) {}
      dispatch({type: 'RESTORE_TOKEN', token: res});
    };
    checkLoggedIn();
  }, []);

  useEffect(() => {
    if (!state.isLoading) {
      SplashScreen.hide();
    }
  }, [state.isLoading]);

  const authContext = useMemo(
    () => ({
      signIn: () => {
        dispatch({type: 'SIGN_IN', token: '1234567890'});
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
    }),
    [],
  );

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      Platform.OS === 'ios'
        ? PushNotificationIOS.presentLocalNotification({
            alertBody: remoteMessage.notification.body,
            alertTitle: remoteMessage.notification.title,
          })
        : PushNotification.localNotification({
            title: remoteMessage.notification.title,
            message: remoteMessage.notification.body,
          });
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        JSON.stringify(remoteMessage),
      );

      if (isMountedRef.current && navigationRef.current) {
        navigationRef.current?.navigate('Notifications', {
          screen: 'NotificationDetail',
          params: {
            notificationDetail: {
              title: remoteMessage.data.title,
              content: remoteMessage.data.long_message,
              published_date: remoteMessage.sentTime,
              thumbnail: remoteMessage.data.image,
            },
          },
        });
      }
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            JSON.stringify(remoteMessage),
          );
          if (isMountedRef.current && navigationRef.current) {
            navigationRef.current?.navigate('Push', {
              title: remoteMessage.data.title,
              content: remoteMessage.data.long_message,
              published_date: remoteMessage.sentTime,
              thumbnail: remoteMessage.data.image,
            });
          }
        }
      });

    return unsubscribe;
  }, [isMountedRef, navigationRef]);

  useEffect(() => {
    isMountedRef.current = true;

    return () => (isMountedRef.current = false);
  }, [isMountedRef]);

  return (
    <AuthContext.Provider value={authContext}>
      <VideoContextProvider>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator headerMode="none">
            {state.userToken == null ? (
              <>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen
                  name="ForgotPassword"
                  component={ForgotPassword}
                />
                <Stack.Screen name="ResetPassword" component={ResetPassword} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Push" component={Push} />
              </>
            ) : (
              <>
                <Stack.Screen name="Root" component={Root} />
                <Stack.Screen name="Push" component={Push} />
                <Stack.Screen name="Video" component={Video} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </VideoContextProvider>
    </AuthContext.Provider>
  );
};

export default Navigation;
