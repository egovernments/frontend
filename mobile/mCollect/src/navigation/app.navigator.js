import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from '../login';
import {CollectScreen} from '../collect';
import {MCFormScreen} from '../mcform';
import {PaymentScreen} from '../payment';

const Stack = createStackNavigator();

export const AppNavigator = props => {
  const {user} = props;

  return (
    <NavigationContainer>
      {!user ? (
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{headerLeft: null}}>
          {/* <Stack.Screen name="Search" component={SearchScreen} /> */}
          <Stack.Screen
            name="MCForm"
            component={MCFormScreen}
            options={{title: 'Collection Form'}}
          />
          <Stack.Screen
            name="Collect"
            component={CollectScreen}
            options={{title: 'Payment'}}
          />
          <Stack.Screen
            name="Payment"
            component={PaymentScreen}
            options={{title: 'Successful'}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
