import * as React from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Picker,
} from 'react-native';
import {getValfromStorage} from './storage.helper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {getServices} from './mform.helper';

export const MCScreen = () => {
  const [mform, setMform] = React.useState({
    RequestInfo: {
      apiId: 'Mihy',
      ver: '.01',
      action: '',
      did: '1',
      key: '',
      msgId: '20170310130900|en_IN',
      requesterId: '',
      authToken: '78577d3c-5c59-4f38-8c97-e314e0a9770e',
    },
    Demands: [
      {
        tenantId: 'TODO',
        consumerCode: 'TODO',
        serviceType: 'TODO',
        businessService: 'TODO',
        demandDetails: [
          {
            taxHeadMasterCode: 'TODO',
            collectionAmount: 0,
            taxAmount: '1000',
          },
          {
            taxHeadMasterCode: 'TODO',
            collectionAmount: 0,
            taxAmount: '1000',
          },
          {
            taxHeadMasterCode: 'TODO',
            collectionAmount: 0,
            taxAmount: '100',
          },
          {
            taxHeadMasterCode: 'TODO',
            collectionAmount: 0,
            taxAmount: '100',
          },
        ],
        mobileNumber: 'TODO',
        consumerName: 'TODO',
        taxPeriodFrom: 'TODO',
        taxPeriodTo: 'TODO',
        additionalDetails: {comment: 'TODO'},
        payer: {uuid: 'TODO'},
        consumerType: 'TODO',
      },
    ],
  });

  const [serviceTypes, setServiceTypes] = React.useState();
  const [user, setUser] = React.useState();
  React.useEffect(() => {
    getValfromStorage('@User').then(val => {
      setUser(val);
      getServices(val).then(services => {
        setServiceTypes(services.serviceCategory);
      });
    });
  }, []);

  const renderList = list => {
    console.log(this.state.tenants);
    return list
      ? list.map(tenant => {
          return (
            <Picker.Item
              label={tenant.name}
              value={tenant.code}
              key={tenant.code}
            />
          );
        })
      : [];
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            //value={this.state.username}
            style={styles.inputs}
            placeholder="City"
            underlineColorAndroid="transparent"
            onChangeText={username => this.setState({username})}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Mobile No."
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={password => this.setState({password})}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            //value={this.state.username}
            style={styles.inputs}
            placeholder="Consumer Name"
            underlineColorAndroid="transparent"
            onChangeText={username => this.setState({username})}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Service Category"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={password => this.setState({password})}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            //value={this.state.username}
            style={styles.inputs}
            placeholder="Service Type"
            underlineColorAndroid="transparent"
            onChangeText={username => this.setState({username})}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="From Date"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={password => this.setState({password})}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            //value={this.state.username}
            style={styles.inputs}
            placeholder="To Date"
            underlineColorAndroid="transparent"
            onChangeText={username => this.setState({username})}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Tax"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={password => this.setState({password})}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            //value={this.state.username}
            style={styles.inputs}
            placeholder="Field Fee"
            underlineColorAndroid="transparent"
            onChangeText={username => this.setState({username})}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="CGST"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={password => this.setState({password})}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            //value={this.state.username}
            style={styles.inputs}
            placeholder="SGST"
            underlineColorAndroid="transparent"
            onChangeText={username => this.setState({username})}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Comments"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={password => this.setState({password})}
          />
        </View>
        {/*show && (
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={date}
            mode={mode}
            is24Hour
            display={display}
            onChange={onChange}
          />
        )}

        {/* <View style={styles.inputContainer}>
      <Picker
        //selectedValue={this.state.tenant}
        style={styles.inputs}
        onValueChange={itemValue => this.setState({tenant: itemValue})}>
        {this.renderCity()}
      </Picker>
    </View> */}

        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.onLogin()}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: '#00b5ec',
  },
  loginText: {
    color: 'white',
  },
});
