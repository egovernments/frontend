import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from '../login';
import {CollectScreen} from '../collect';
import {MCFormScreen} from '../mcform';
import {PaymentScreen} from '../payment';
import{PaymentAckScreen} from '../paymentAck'
import {ChallanAckScreen} from '../challanAck';

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
            options={{title: 'Create Challan'}}
          />
          <Stack.Screen
            name="ChallanAck"
            component={ChallanAckScreen}
            options={{title: 'Challan'}}
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
            <Stack.Screen
            name="PaymentAck"
            component={PaymentAckScreen}
            options={{title: 'Failed'}}
          />

        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
