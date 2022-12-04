## About The App
Podcast App for Android & iOS built using React Native that includes Firebase Cloud Messaging and react-native-video component.

## Features

- User Sign Up, Sign In and Forgot Password
- @react-navigation Bottom Tabs Navigator along with Stack Navigator
- A full-screen Video Player component using react-native-video
- Firebase Push Notifications for iOS and Android with react-native-push-notification, @react-native-community/push-notification-ios & @react-native-firebase/messaging


## Requirements

- Node 12 or newer
- Java SE Development Kit (JDK) version 8 or newer
- Android Studio

## Development

```bash
# Clone the repo
git clone   
cd react-native-podcast-app  

# Dependencies  
npm install  

# iOS only  
cd ios && pod install && cd ..  

# Run iOS  
npx react-native run-ios  

# Run Android  
npx react-native run-android  

```

## Project Structure


* 📄 `App.js`: The main component that gets registered by `index.js`. This acts as a main navigator, navigating either to the Login Page or the Dashboard Page depending on whether the user has logged in or not.


* 📁 `src`: Contains the actual React front-end for the App.
  * 📄 `src/assets`: Exposes all the assets such as fonts, icons and images.
  * 📄 `src/components`: Reusable components such as header, footer placed here.
  * 📄 `src/interceptor`: Axios request interceptor to attach authorization bearer token in all api request.
  * 📄 `src/navigations`: @react-navigation component that registers all the screen as a stack or tab navigator.
  * 📄 `src/screens`: Contains the actual UI for the App's front-end.
  * 📄 `src/services`: Axios api request functions.
  * 📄 `src/styles`: react-native StyleSheet.


* 📁 `ios`: Contains the basic skeleton for a React Native iOS appn.


* 📁 `android`: Contains the basic skeleton for a React Native Android app.
  * 📄 `android/app/build.gradle`: The gradle build file for the Android project.
  * 📁 `android/app/src/main/java/com/cninfotech/andelskungen`: Contains the actual Java source code of the Project.


## Note

- In android/local.properties add following line: sdk.dir = YOUR_ANDROID_SDK_PATH
