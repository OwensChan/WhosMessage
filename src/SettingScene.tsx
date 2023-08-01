import React ,{ useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Platform,
  StatusBar,
  Switch,
  useWindowDimensions,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MyPressable from './components/MyPressable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppImages } from './assets';

const SettingScene: React.FC = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<DrawerNavigationProp<{}>>();
  const { top } = useSafeAreaInsets();

  const imageSize = width - 32;
  const marginTop = Platform.OS === 'ios' ? top : StatusBar.currentHeight ?? 24;

  const item = route?.params
  const [chatGPTLoading, setChatGPTLoading] = React.useState(false)
  const [bardLoading, setBardLoading] = React.useState(false)
  const [chatGPTBody, setChatGPTBody] = React.useState('')
  const [bardBody, setBardBody] = React.useState('')

  const [isChatGPT, setIsChatGPT] = useState(async () => {
    const data = await AsyncStorage.getItem('isChatGPT') //get data and store them in constat
    console.log('data', data)
    if (!data || data === 'true') {
      setIsChatGPT(true)
    } else {
      setIsChatGPT(false)
    }

  })

  const [isBard, setIsBard] = useState(async () => {
    const data1 = await AsyncStorage.getItem('isBard') //get data and store them in constat
    console.log('data1', data1)
    if (!data1 || data1 === 'true') {
      setIsBard(true)
    } else {
      setIsBard(false)
    }

  })

  const handleChatGPTChange = async () => {
    console.log(isChatGPT)
    const isOpen = await AsyncStorage.getItem('isChatGPT');
    if (!isOpen || isOpen === 'true') {
      setIsChatGPT(false)
      await AsyncStorage.setItem('isChatGPT', 'false');
    } else {
      setIsChatGPT(true)
      await AsyncStorage.setItem('isChatGPT', 'true');
    }
  }
  console.log(isChatGPT, 'ischat gpt');

  const handleBardChange = async () => {
    console.log(isBard)
    const isOpen = await AsyncStorage.getItem('isBard');
    if (!isOpen || isOpen === 'true') {
      setIsChatGPT(false)
      await AsyncStorage.setItem('isBard', 'false');
    } else {
      setIsChatGPT(true)
      await AsyncStorage.setItem('isBard', 'true');
    }
  }
  console.log(isBard, 'isBard');


  return (
    <SafeAreaView
      edges={['bottom', 'left', 'right']}
      style={{ flex: 1, backgroundColor: '#FEFEFE' }}
    >
      <Text style={styles.title}>Enable ChatGPT: </Text>
      <Switch onValueChange={handleChatGPTChange} value={isChatGPT}></Switch>
      <Text style={styles.title}>Enable Bard: </Text>
      <Switch onValueChange={handleBardChange} value={isBard}></Switch>

      <MyPressable
        style={[styles.menuBtn, { marginTop: marginTop + 8 }]}
        android_ripple={{ color: 'grey', radius: 20, borderless: true }}
        onPress={() => navigation.openDrawer()}
      >
        <Icon name="menu" size={25} color="black" />
      </MyPressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    backgroundColor: '#FEFEFE',
    alignSelf: 'center',
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'WorkSans-Bold',
    textAlign: 'center',
    paddingTop: 8,
  },
  subTitle: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'WorkSans-Regular',
    textAlign: 'center',
    paddingTop: 16,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 140,
    height: 40,
    padding: 8,
    backgroundColor: 'dodgerblue',
    borderRadius: 4,
    elevation: 8,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
    padding: 4,
  },
  menuBtn: {
    position: 'absolute',
    padding: 8,
    left: 8,
  },
});

export default SettingScene;
