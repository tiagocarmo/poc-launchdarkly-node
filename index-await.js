const mtconf = require('mtconf');

// https://docs.launchdarkly.com/sdk/server-side/node-js
const LaunchDarkly = require('launchdarkly-node-server-sdk');

const sdk_key = mtconf.get('LAUNCHDARKLY_SDK_KEY');

const ldClient = LaunchDarkly.init(sdk_key);

const user = {
  'firstName': 'Tiago',
  'lastName': 'Carmo',
  'key': 'tiago.carmo@minu.co'
};

const flag = async () => {
  try {
    await ldClient.waitForInitialization();
    const flags = await ldClient.allFlagsState(user);
    console.log('flagsState.allValues', flags.allValues());
    ldClient.close();
  } catch (err) {
    console.log('Não foi possivel obter a lista de Feature Flags.');
  }
};

flag();
