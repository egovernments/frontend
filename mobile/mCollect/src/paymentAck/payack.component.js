import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {
  StyleService,
  Icon,
  useStyleSheet,
  Layout,
  Text,
  Button,
} from '@ui-kitten/components';

export const PaymentAckScreen = props => {
  const {navigation, clearChallanState,tenantId} = props;

  navigation.setOptions({
    headerLeft: () => (
      <Button
        appearance="ghost"
        icon={() => (
          <Icon width={32} height={32} fill="#FE7A51" name="home-outline" />
        )}
        onPress={() => {
          clearChallanState();
          navigation.replace('MCForm');
        }}
      />
    ),
  });

  const styles = useStyleSheet(themedStyles);



  React.useEffect(() => {
    iconRef.current.startAnimation();
  }, []);

  const iconRef = React.createRef();
  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout style={styles.container}>
        <View style={styles.formContainer}>
          <Icon
            style={styles.icon}
            width={100}
            height={100}
            fill="#ba3535"
            ref={iconRef}
            animation="zoom"
            animationConfig={{cycles: 1}}
            name="close-circle-outline"
          />
          <View style={styles.textView}>
            <Text category="h4">Payment Failed!</Text>
            <Text>
              A notification regarding payment failure has been sent to the
              consumer at registered Mobile No.
            </Text>
          </View>
        </View>
      </Layout>
    </SafeAreaView>
  );
};


const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
  },
  formContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginVertical: 32,
  },
  textView: {
    marginVertical: 24,
  },
  button: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
});
