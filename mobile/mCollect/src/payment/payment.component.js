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

export const PaymentScreen = props => {
  const {navigation, clearState} = props;

  navigation.setOptions({
    headerLeft: () => (
      <Button
        appearance="ghost"
        icon={() => (
          <Icon width={32} height={32} fill="#FE7A51" name="home-outline" />
        )}
        onPress={() => {
          clearState();
          navigation.replace('MCForm');
        }}
      />
    ),
  });

  const {receiptNumber} = props.route.params;
  const styles = useStyleSheet(themedStyles);

  const onSubmit = receiptData => {
    var NEXTLINE = '&&';
    receiptString = '     ' + receiptData.ulbType;
    receiptString =
      receiptString + NEXTLINE + '        Collection Receipt' + NEXTLINE;
    receiptString =
      receiptString + '******************************************' + NEXTLINE;
    receiptString =
      receiptString +
      ' Receipt No    : ' +
      receiptData.receiptNumber +
      NEXTLINE;
    receiptString =
      receiptString + ' Receipt Date  : ' + receiptData.receiptDate + NEXTLINE;
    receiptString =
      receiptString + ' Consumer Name : ' + receiptData.consumerName + NEXTLINE;
    receiptString =
      receiptString +
      ' Category      : ' +
      receiptData.businessService +
      NEXTLINE;
    receiptString =
      receiptString + ' From Period   : ' + receiptData.fromPeriod + NEXTLINE;
    receiptString =
      receiptString + ' To Period     : ' + receiptData.toPeriod + NEXTLINE;
    receiptString =
      receiptString +
      ' Paid Amount   : Rs.' +
      receiptData.receiptAmount +
      NEXTLINE;
    receiptString =
      receiptString + ' Payment Mode  : ' + receiptData.paymentMode + NEXTLINE;
    receiptString =
      receiptString +
      ' Collector Name: ' +
      receiptData.collectorName +
      NEXTLINE;
    receiptString =
      receiptString + '******************************************' + NEXTLINE;
    console.log(receiptString.replace(/&&/g, '\n'));

    return 'egov://print/' + receiptString;
  };

  React.useEffect(() => {
    iconRef.current.startAnimation();
  }, []);

  const iconRef = React.createRef();
  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.textView}>
            <Text>Payment Receipt No. </Text>
            <Text category="h4">{receiptNumber}</Text>
          </View>
          <Icon
            style={styles.icon}
            width={128}
            height={128}
            fill="#35BA45"
            ref={iconRef}
            animation="zoom"
            animationConfig={{cycles: 1}}
            name="checkmark-circle-2"
          />
          <View style={styles.textView}>
            <Text category="h4">Payment has been collected successfully!</Text>
            <Text>
              A notification regarding Payment Collection has been sent to the
              consumer at registered Mobile No.
            </Text>
          </View>
        </View>
        <Button
          style={styles.button}
          appearance="outline"
          size="large"
          onPress={() => onSubmit({})}>
          PRINT RECEIPT
        </Button>
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
    marginVertical: 24,
    marginHorizontal: 16,
  },
});
