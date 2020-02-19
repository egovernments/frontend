import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from './login.component';
import {MCScreen} from './mform.component';
import {CollectionScreen} from './collection.component';
import {getValfromStorage} from './storage.helper';

const Stack = createStackNavigator();

export function HomeNavigation() {
  const [user, setUser] = React.useState();
  React.useEffect(() => {
    getValfromStorage('@User').then(val => {
      console.log('user in nav', val);
      setUser(val);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="auth" component={LoginScreen} />

        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{title: 'Login'}}
        />

        <Stack.Screen
          name="MCScreen"
          component={MCScreen}
          options={{title: 'Miscellaneous Collection'}}
        />

        <Stack.Screen
          name="CollectionScreen"
          component={CollectionScreen}
          options={{title: 'Collection'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
