# WhosMessage - HK Short Message Spam Detection Application

Hong Kong Short Message Spam Detection Application using Machine Learning in a Machine Learning Approach (Written by Owen Chan, created in React Native)



## 🧬 Result
Project
This is a React Native Android Project for Hong Kong Short Message Spam Detection Application in a Machine Learning Approach
The Android Application would like to achieve the following goals:
•	Less management time to keep tracking ingress short messages with their category (Spam/Ham)
•	Provide a simple and direct detection result with given a brief description of message categories
•	Enhance the knowledge of spam/ham message determination and gear up the awareness

The website output result from 3 sources:
Machine Learning model trained using Simple Neural Network
ChatGPT
Google Bard
All data submitted would be stored in the AWS DynamoDB for future model training purposes.


# 💪🏼 Getting Started
## Running on Android emulator - Development
### Step 1: Start the Metro Server
```bash
# using npm to install dependencies
npm install
```

### Step 2: Build the Android Application installer (.apk) for the first time and Run Android Application
```bash
npx react-native run-android
```

### Step 3: For upcoming use, Run Android Application
```bash
npx react-native start
```

## Running on Android physical phone - In Production
### Step 1: Generate a keystore for Android App compilation
```bash
# using npm to install dependencies
keytool -genkey -v -keystore whosmessage.keystore -alias whosmessage -keyalg RSA -keysize 2048 -validity 10000
```

### Step 2: Move the keystore to the project location and bind with React Native (android\app\build.gradle)

### Step 3: Android Application Installer - APK Generation
```bash
./gradlew assembleRelease
```
