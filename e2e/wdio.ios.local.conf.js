/**
 * WebDriver Configuration for Local Testing (iOS Simulator)
 */
const path = require('path');
const os = require('os');
const glob = require('glob');
const { config } = require('./wdio.shared.conf');

config.capabilities = [{
  maxInstances: 1,
  platformName: 'iOS',
  platformVersion: '11.1', // Change to the version of your simulator
  deviceName: 'iPhone X', // Change to the device name of your simulator
  // Change the path below to find the .app or .ipa file
  app: glob.sync(path.resolve(os.homedir(), 'Library/Developer/Xcode/DerivedData/e2etesting-*/Build/Products/Release-iphonesimulator/e2etesting.app')).pop(),
  automationName: 'XCUITest',
}];

exports.config = config;
