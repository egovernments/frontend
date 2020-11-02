import React from 'react';
import {SafeAreaView, View,NativeModules} from 'react-native';
import {
  StyleService,
  Icon,
  useStyleSheet,
  Layout,
  Text,
  Button,
} from '@ui-kitten/components';

export const ChallanAckScreen = props => {
  const {navigation, clearChallanState,tenantId,challans} = props;

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

  const {challanNo,mobileNumber,consumerName} = props.route.params;
  const styles = useStyleSheet(themedStyles);


  const onSubmit = challantData => {
    console.log(challantData)
    var NEXTLINE = '&&';
    var receiptString = '   ' + challantData.ulbType + 'Cantonment Board'
    receiptString =
      receiptString + NEXTLINE + '      CHALLAN' + NEXTLINE;
    receiptString =
      receiptString + '******************************************' + NEXTLINE;
    receiptString =
      receiptString +' Challan No    : ' +challantData.challanNumber +NEXTLINE;
    receiptString =
      receiptString + ' Consumer Name : ' + challantData.consumerName + NEXTLINE;
    receiptString =
      receiptString +' Category      : ' +challantData.businessService +NEXTLINE;
    receiptString =
      receiptString + ' From Period   : ' + challantData.fromPeriod + NEXTLINE;
    receiptString =
      receiptString + ' To Period     : ' + challantData.toPeriod + NEXTLINE;
    receiptString =
      receiptString +' Amount   : Rs.' +challantData.challanAmount +NEXTLINE;
    receiptString =
      receiptString + '******************************************' + NEXTLINE;
    console.log(receiptString.replace(/&&/g, '\n'));


    NativeModules.PrinterInterface.sendPrintData(
      "printdata",receiptString,
      (success) => { 
        console.log(success)

       }, 
      (error) => { console.log(error) }
    )
    //var SendIntentAndroid = require("react-native-send-intent");
 
    // SendIntentAndroid.sendText({
    //   title: "printdata",
    //   text: 'egov://print/' + receiptString,
    //   type: SendIntentAndroid.TEXT_PLAIN,
    // });
    // return 'egov://print/' + receiptString;
  };
  const getChallanData =()=>{
    const totalAmt = challans.amount.reduce(function(total, arr) { 
      // return the sum with previous value
      return total + arr.amount;
    
      // set initial value as 0
    },0);

      const challanData={
        'ulbType': capitalize(tenantId.split(".")[1]),
        'challanNumber': challanNo,
        'consumerName': consumerName,
        'businessService': challans.businessService,
        'fromPeriod': getDateFromEpoch(challans.taxPeriodFrom),
        'toPeriod':  getDateFromEpoch(challans.taxPeriodTo),
        'challanAmount':totalAmt,
      }

    return challanData;
  
  }

  const  proceedPayment = ()=>{

    console.log("BS:",props.challans.businessService)
    if (props.challans && props.challans.challanNo) {
      navigation.replace('Collect', {
        consumerCode: props.challans.challanNo,
        businessService: props.challans.businessService,
        mobileNumber: mobileNumber,
        consumerName: consumerName,
      });
    }
  }
  
  function capitalize(s)
  {
      return s[0].toUpperCase() + s.slice(1);
  }

  function getDateFromEpoch(dt) {
    var parsedDate = new Date(dt);
    return parsedDate.getDate() + "/" + (parsedDate.getMonth() + 1) + "/" + parsedDate.getFullYear();
  }


  React.useEffect(() => {
    iconRef.current.startAnimation();
  }, []);

  const iconRef = React.createRef();
  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.textView}>
            <Text>Challan No. </Text>
            <Text category="h4">{challanNo}</Text>
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
            <Text category="h4">Challan has been generated successfully!</Text>
            <Text>
              A notification regarding Challan generation has been sent to the
              consumer at registered Mobile No.
            </Text>
          </View>
        </View>
        <Button
          style={styles.button}
          appearance="outline"
          size="large"
          onPress={() => onSubmit(getChallanData())}>
          PRINT CHALLAN
        </Button>
        <Button style={styles.button} size="large"
        onPress={() => proceedPayment()} >
          PROCEED TO PAYMENT 
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
    marginVertical: 12,
    marginHorizontal: 16,
  },
});
