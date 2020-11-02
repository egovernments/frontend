import React from 'react';
import {View, Image, ToastAndroid} from 'react-native';
import {ImageOverlay} from '../components/image-overlay.component';
import {
  Button,
  Input,
  useStyleSheet,
  StyleService,
  Layout,
  Autocomplete,
} from '@ui-kitten/components';
import DigitSVG from './asset/digit';

export const LoginScreen = props => {
  const {navigation, fetchTenants, loginUser, tenants} = props;

  const onSignUpButtonPress = () => {
    if(username != null && password != null && tenantCode != null){
      loginUser({username, password, tenantCode});
    }
    else{
      displayToast();

    }
    
  };

  const styles = useStyleSheet(themedStyles);
  const [username, setUsername] = React.useState();
  const [tenant, setTenant] = React.useState();
  const [tenantCode, setTenantCode] = React.useState();
  const [password, setPassword] = React.useState();
  const [data, setData] = React.useState();

  React.useEffect(() => {
    fetchTenants();
  }, []);

  React.useEffect(() => {
    setData(tenants);
  }, [tenants]);

  const onChangeText = query => {
    setTenant(query);
    setData(
      tenants.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()),
      ),
    );
  };
  const onselect = item => {
    setTenant(item.title);
    setTenantCode(item.code);
  };

  const displayToast = () => {

    ToastAndroid.showWithGravity(
      'Please fill all the fields.',
      ToastAndroid.SHORT, //can be SHORT, LONG
      ToastAndroid.BOTTOM, //can be TOP, BOTTON, CENTER
    );
  };
  
  const passwordlabel = <p>PASSWORD<span style={{ color: "red" }} >*</span></p>
  const tenantlabel = <p>TENANT<span style={{ color: "red" }} >*</span></p>

  return (
    <Layout style={styles.container}>
      <ImageOverlay
        style={styles.imageContainer}
        source={require('./asset/banner.jpg')}>
        <View style={[styles.formContainer]}>
          <Image style={styles.digit} source={require('./asset/eChhawani.png')} />
          <Input
            style={styles.formInput}
            placeholder="Enter Username"
            label="USERNAME"
            autoCapitalize="words"
            value={username}
            onChangeText={setUsername}
          />
          <Input
            style={styles.formInput}
            label="PASSWORD"
            placeholder="Enter Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <Autocomplete
            style={styles.formInput}
            placeholder="Select CB"
            label="Cantonment Board"
            value={tenant}
            data={data}
            onChangeText={onChangeText}
            onSelect={onselect}
          />
          <Button
            style={styles.signUpButton}
            size="large"
            onPress={onSignUpButtonPress}>
            SIGN IN
          </Button>
        </View>
      </ImageOverlay>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '80%',
    margin: 10,
    padding: 16,
    backgroundColor: 'background-basic-color-1',
  },
  digit: {alignSelf: 'center', marginVertical: 16},
  signUpButton: {
    marginVertical: 24,
    marginHorizontal: 16,
  },
  divider: {
    flex: 1,
  },
  formInput: {
    marginTop: 16,
  },
  termsCheckBox: {
    marginTop: 20,
  },
  termsCheckBoxText: {
    fontSize: 11,
    lineHeight: 14,
    color: 'text-hint-color',
  },
});
