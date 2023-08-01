import React from 'react';
import { StatusBar, StyleSheet, useWindowDimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  HomeScene,
  DrawerContent,
  HelpScene,
  FeedbackScene,
  InviteFriendScene,
} from '.';
import { CourseInfoScreen, HomeDesignCourse, HomeScreen } from './design_course';
import { IntroductionAnimationScreen } from './introduction_animation';
import  AboutUsScene from './AboutUsScene';
import  SettingScene from './SettingScene';

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

const DrawerNavigator: React.FC = () => {
  const window = useWindowDimensions();

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          width: window.width * 0.75,
          backgroundColor: 'rgb(237, 240, 242, 0.5)',
        },
        sceneContainerStyle: styles.drawerSceneContainer,
        drawerActiveBackgroundColor: '#5cbbff',
        drawerType: 'back',
        overlayColor: 'transparent',
        swipeEdgeWidth: window.width,
        headerShown: false,
      }}
      drawerContent={props => <DrawerContent {...props} />}
      detachInactiveScreens={false}
    >
      <Drawer.Screen name="DesignCourse" component={HomeDesignCourse} />
      <Drawer.Screen name="help" component={HelpScene} />
      <Drawer.Screen name="feedback" component={FeedbackScene} />
      <Drawer.Screen name="invite_friend" component={InviteFriendScene} />
      <Drawer.Screen name="about_us" component={AboutUsScene} />
       <Drawer.Screen name="setting" component={SettingScene} />
    </Drawer.Navigator>
  );
};

export default () => {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(null);

  React.useEffect(() => {
    const checkappData = async () => {
      const appData = await AsyncStorage.getItem('isAppFirstLaunched');
      if (appData == null) {
        setIsAppFirstLaunched(true);
        AsyncStorage.setItem('isAppFirstLaunched', 'false');
      } else {
        setIsAppFirstLaunched(false);
      }
    };
    checkappData();
  }, []);

  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {  isAppFirstLaunched && (
                <Stack.Screen name="onBoarding" component={IntroductionAnimationScreen} />
        )}
        <Stack.Screen name="MainDrawer" component={DrawerNavigator} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="CourseInfo" component={CourseInfoScreen} />
      </Stack.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  drawerSceneContainer: {
    elevation: 24,
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
  },
});
