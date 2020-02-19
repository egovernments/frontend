import * as React from 'react';
import {getValfromStorage} from './storage.helper';

export const Auth = navigation => {
  const [user, setUser] = React.useState();
  React.useEffect(() => {
    getValfromStorage('@User').then(val => {
      setUser(val);
    });
  }, []);

  if (user) {
    navigation.navigate('MCScreen');
  } else {
    navigation.navigate('LoginScreen');
  }
};
