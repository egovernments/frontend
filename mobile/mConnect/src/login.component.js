import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Picker,
} from 'react-native';
import {getTenants} from './login.helper';
import {setValToStorage} from './storage.helper';

export class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      tenant: '',
      tenants: [],
    };
  }

  componentDidMount() {
    console.log('props', this.props);
    //fetching tenants
    getTenants().then(res => this.setState({tenants: res}));
  }

  onLogin = () => {
    fetch('https://mseva-uat.lgpunjab.gov.in/user/oauth/token', {
      credentials: 'include',
      headers: {
        accept: 'application/json, text/plain, */*',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
        authorization: 'Basic ZWdvdi11c2VyLWNsaWVudDplZ292LXVzZXItc2VjcmV0',
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded',
        pragma: 'no-cache',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
      },
      referrer: 'https://mseva-uat.lgpunjab.gov.in/employee/user/login',
      referrerPolicy: 'no-referrer-when-downgrade',
      body:
        'username=' +
        this.state.username +
        '&password=' +
        this.state.password +
        '&grant_type=password&scope=read&tenantId=' +
        this.state.tenant +
        '&userType=EMPLOYEE',
      method: 'POST',
      mode: 'cors',
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setValToStorage('@User', res['access_token']);
      })
      .then(this.props.navigation.navigate('MCScreen'))
      .catch(err => console.log(err));
  };

  renderCity() {
    console.log(this.state.tenants);
    return this.state.tenants
      ? this.state.tenants.map(tenant => {
          return (
            <Picker.Item
              label={tenant.name}
              value={tenant.code}
              key={tenant.code}
            />
          );
        })
      : [];
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            //value={this.state.username}
            style={styles.inputs}
            placeholder="username"
            underlineColorAndroid="transparent"
            onChangeText={username => this.setState({username})}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={password => this.setState({password})}
          />
        </View>

        <View style={styles.inputContainer}>
          <Picker
            selectedValue={this.state.tenant}
            style={styles.inputs}
            onValueChange={itemValue => this.setState({tenant: itemValue})}>
            {this.renderCity()}
          </Picker>
        </View>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.onLogin()}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

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
