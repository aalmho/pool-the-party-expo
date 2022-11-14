import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Join: {
            screens: {
              JoinParty: 'join',
            },
          },
          MyParties: {
            screens: {
              MyParties: 'myparty',
            },
          },
          CreateParty: {
            screens: {
              CreateParty: 'createparty',
            },
          },
        },
      },
      Modal: 'modal',
      NotFound: '*',
      Party: 'party/:id',
    },
  },
};

export default linking;
