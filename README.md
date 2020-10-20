# React Native e2e testing with Appium (node), WebdriverIO and AWS device farm

This repository is an example of how you can utilize AWS Device Farm for testing your 
React Native applications. We can take advantage of [Appium](http://appium.io/) 
and [WebdriverIO](https://webdriver.io/) to run our tests against our application 
on emulator/simulators and physical devices.

It als includes a short description how to use this kind of testing as part of your CI/CD pipeline.

## Getting Started

Clone the repository and npm install. Verify you can run the application through React Native.

Once you are able to run the application your React Native CLI, you are now ready to install Appium.

This repository uses the following versions:

- Appium 1.14.2

- React Native 63.3

- React 16.13.1

- XCode 12.0.1

## Installing and Starting the Appium Server Locally

To test locally you will need the Appium server running. You can either use the Appium CLI or Appium Desktop App.

To use the CLI:

`npm install -g appium@1.14.2 && appium`

This will start a basic Appium server. You can see more about the CLI here http://appium.io/docs/en/writing-running-appium/server-args/

You will also want to install appium-doctor to ensure your environment is setup to use Appium correctly:

`npm install -g appium-doctor`

See more information here: https://github.com/appium/appium-doctor

## Build Android APK

To build the Android APK, we can use the Gradle build script in the _android_ folder:

`cd android && ./gradlew assembleRelease`

The APK should be located at android/app/build/outputs/apk/release/app-release.apk.

## Build iOS .app

To build the iOS .app file for a simulator device, open the _RNDeviceFarm.xcodeproj_ file in the _ios_ directory.

Now, select the iOS simulator you wish to build for and then go to _Product -> Scheme -> Manage Schemes_. Update the scheme _Build Configuration_ to _Release_ in the _Run_ tab. This will build our application in production mode.

Finally, click _Product -> Clean and Product -> Build_. This will create a .app file in your XCode build output directory. The default should be ~/Library/Developer/Xcode/DerivedData/. Once your app builds and you have verified the .app file exists, you are ready to test on the simulator locally.

If you have problems building the iOS app for the simulator on XCode 12 (Error: `building for iOS Simulator, but linking in object file 
built for iOS, for architecture arm64`) please check out this [link](https://stackoverflow.com/questions/63607158/xcode-12-building-for-ios-simulator-but-linking-in-object-file-built-for-ios).

## Running tests locally

To run the tests locally using Appium, you will need an APK for Android or a .app file for the iOS simulator.

`cd e2e && npm install`

This will install the WebdriverIO and dependencies we need to test.

You can edit the _wdio.*.local.conf.js_ files for local testing (update app location, change simulator, ...).

Once you are ready to test, start the Appium server, start the emulator/simulator, and run the desired test. 

Android:

`npm run test:android:local`

iOS

`npm run test:ios:local`

## Deploying to Device Farm

To deploy to Device Farm, simply run the package script to generate the zip file needed.

`npm run package`

In the AWS console, start a new run in Device Farm, upload the APK or IPA (not .app file) and use the zip file for your test package.

For the Appium YAML configuration, use either the _appium.android.yml_ file or the _appium.ios.yml_ file.

## Working with CI/CD

When working with CLI tools like [Bitrise](https://www.bitrise.io), you have to know the ARNs of you project, 
device pool and test configuration.

To get this ANRs you have to work with the AWS CLI, which is pretty easy to understand. 

### Setup AWS CLI

You can find a detailed instruction about installing the AWS CLI here: https://aws.amazon.com/de/cli/.

After installing the CLI you have to configure your credentials for connecting to AWS device farm (you can create your AWS Access Key in AWS IAM).

`aws configure`

### Working with AWS CLI

Get all information about your projects (including ANRs)

`aws devicefarm list-projects`

Get all information about your device pools (including ANRs)

`aws devicefarm list-device-pools`

Get all information about all your uploads (including test configurations and ANRs)

`aws devicefarm list-uploads`

### Working with Bitrise

Bitrise provides predefined steps for uploading and running tests. 

**Upload tests**

`Amazon Device Farm File Deploy`

_Please note that you have to upload your tests during the "File Deploy" step, not your app bundle._ 

**Run tests**

`Amazon Device Farm Runner`

Now you can upload your app bundle. 

## Credits

This repo is based on the awesome work of [Nicolas Ames](https://names144.github.io/). You can find the original repository [here](https://github.com/names144/RNDeviceFarm).
