const mtconf = require('mtconf');

// https://docs.launchdarkly.com/sdk/server-side/node-js
const LaunchDarkly = require('launchdarkly-node-server-sdk');

const sdk_key = mtconf.get('LAUNCHDARKLY_SDK_KEY');

// LDClient must be a singleton
const ldClient = LaunchDarkly.init(sdk_key);

// Do User é obrigatório a propriedade "key"
const user = {
  'firstName': 'Tiago',
  'lastName': 'Carmo',
  'key': 'tiago.carmo@minu.co'
};

ldClient.once('ready', function () {

  // formato padrão, sugerido pela documentação
  // exibindo todas as flags
  ldClient.allFlagsState(user, (err, flagsState) => {
    if (err) {
      console.log('Não foi possivel obter a lista de Feature Flags.');
    }
    console.log('flagsState.allValues', flagsState.allValues());
  });

  // exibindo uma flag expecifica
  // const feature_flag = 'nova-funcionalidade-da-api';
  // ldClient.variation(feature_flag, user, false, function (err, showFeature) {
  //   if (err) {
  //     console.log('Não foi possivel obter o valor da Feature Flag. Usar valor default.');
  //   }
  //   if (showFeature) {
  //     console.log(`${feature_flag}: Ativa`);
  //   } else {
  //     console.log(`${feature_flag}: Inativa`);
  //   }
  // });

  // fechando a conexão
  ldClient.close();
});
