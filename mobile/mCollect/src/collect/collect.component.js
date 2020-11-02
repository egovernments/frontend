import React from 'react';
import {SafeAreaView, View, ScrollView,NativeModules} from 'react-native';
import {
  Button,
  Input,
  Select,
  StyleService,
  useStyleSheet,
  Layout,
  Text,
} from '@ui-kitten/components';



export const CollectScreen = props => {
  const {
    consumerCode,
    businessService,
    mobileNumber,
    consumerName,
  } = props.route.params;
  const {fetchBill, createPayment, tenantId, token, bill} = props;
  const styles = useStyleSheet(themedStyles);
  const [mobile, setMobile] = React.useState(mobileNumber);
  const [payerName, setPayerName] = React.useState(consumerName);
  const [paidBy, setPaidBy] = React.useState({text: 'Owner'});
  const [collectionType, setCollectionType] = React.useState({text: 'Cash'});
  const [mscDate, setMscDate] = React.useState();
  const [mscNo, setMscNo] = React.useState();

  const getAmount = (tag, bill) => {

    const bad = bill.billDetails
      ? bill.billDetails[0].billAccountDetails.find(e =>
          e.taxHeadCode.includes(tag),
        )
      : null;
    if (bad){ return bad.amount;} 
    else return 0;
  };

  React.useEffect(() => {
    fetchBill({consumerCode, businessService, tenantId, token});
  }, []);

  React.useEffect(() => {
    if (props.payment && props.payment.paymentDetails) {
      props.navigation.replace('Payment', {
        receiptNumber: props.payment.paymentDetails[0].receiptNumber,
      });
    }
  }, [props.payment]);

  const onSubmit = () => {

    const paymentData={
      instrumentType:collectionType.text,
      paymentAmount:bill.billDetails[0].amount,
      customerName:payerName,
      customerMobile:mobileNumber,
      message:"Pos payment",
      emailId:"",
      amountDetails:bill.billDetails,
      billNumber:bill.billNumber,
      consumerCode:bill.consumerCode,
      businessService:bill.businessService,
      collectorName:"",
      collectorId:"",
      instrumentDate:new Date().toString(),
      instrumentNumber:""
    }
    
    //console.log("paymentData",JSON.stringify(paymentData));


    // var SendIntentAndroid = require("react-native-send-intent");
 
    // SendIntentAndroid.sendText({
    //   title: "paymentData",
    //   text: JSON.stringify(paymentData),
    //   type: SendIntentAndroid.TEXT_PLAIN,
    // });


    NativeModules.PaymentInterface.sendPaymentData(
      "paymentData",JSON.stringify(paymentData),
      (success) => { 
        console.log(success)
            createPayment({
      token,
      amountPaid: bill.billDetails[0].amount,
      tenantId,
      paidBy: payerName,
      payer: paidBy.text,
      bill: {
        ...bill,
  
        billDetails: [
          {
            ...bill.billDetails[0],
            collectionType: collectionType.text,
            amountPaid: bill.billDetails[0].amount,
            manualReceiptNumber: mscNo,
            manualReceiptDate: mscDate,
          },
        ],
        paidBy: payerName,
        payerMobileNumber: mobileNumber,
        payer: paidBy.text,
        mobileNumber: mobileNumber,
        payerName: payerName,
        payerAddress: '',
      },
    });
       }, 
      (error) => { console.log(error);
        props.navigation.replace('PaymentAck');
      }
    )

    // createPayment({
    //   token,
    //   amountPaid: bill.billDetails[0].amount,
    //   tenantId,
    //   paidBy: payerName,
    //   payer: paidBy.text,
    //   bill: {
    //     ...bill,
    //     // taxAndPayments: [
    //     //   {
    //     //     ...bill.taxAndPayments[0],
    //     //     amountPaid: bill.billDetails[0].amount,
    //     //   },
    //     // ],
    //     billDetails: [
    //       {
    //         ...bill.billDetails[0],
    //         collectionType: 'COUNTER',
    //         amountPaid: bill.billDetails[0].amount,
    //         manualReceiptNumber: mscNo,
    //         manualReceiptDate: mscDate,
    //       },
    //     ],
    //     paidBy: payerName,
    //     payerMobileNumber: mobileNumber,
    //     payer: paidBy.text,
    //     mobileNumber: mobileNumber,
    //     payerName: payerName,
    //     payerAddress: '',
    //   },
    // });
  };

  const selectPaidBy = paidBy => {
    setPaidBy(paidBy);
  };

  const selectCollectionType = collectionType => {
    setCollectionType(collectionType);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout style={styles.container}>
        <ScrollView style={[styles.container, styles.formContainer]}>
          <View style={styles.alternativeContainer}>
            <Text style={styles.idtext} category="h6" appearance="alternative">
              {consumerCode}
            </Text>
          </View>

          <View style={styles.section}>
            <View style={styles.headingContainer}>
              <Text style={styles.text} category="h6">
                Fee Details
              </Text>
            </View>

            <View style={styles.feeView}>
              <Text style={styles.feeText} category="p1">
                Tax
              </Text>
              <Text style={styles.feeText} category="p1">
                {getAmount('TAX', bill)}
              </Text>
            </View>
            <View style={styles.feeView}>
              <Text style={styles.feeText} category="p1">
                Field Fee
              </Text>
              <Text style={styles.feeText} category="p1">
                {getAmount('FIELD_FEE', bill)}
              </Text>
            </View>
            <View style={styles.feeView}>
              <Text style={styles.feeText} category="p1">
                CGST
              </Text>
              <Text style={styles.feeText} category="p1">
                {getAmount('CGST', bill)}
              </Text>
            </View>
            <View style={styles.feeView}>
              <Text style={styles.feeText} category="p1">
                SGST
              </Text>
              <Text style={styles.feeText} category="p1">
                {getAmount('SGST', bill)}
              </Text>
            </View>
            <View style={styles.feeView}>
              <Text style={styles.feeText} category="p1">
                Security Deposit
              </Text>
              <Text style={styles.feeText} category="p1">
                {getAmount('SEC_DEP', bill)}
              </Text>
            </View>

            <View
              style={{
                borderBottomColor: 'rgba(0, 0, 0, 0.4)',
                borderBottomWidth: 1,
                margin: 8,
              }}
            />
            <View style={styles.feeView}>
              <Text style={styles.feeText} category="p1">
                Total Amount
              </Text>
              <Text style={styles.feeText} category="p1">
                {bill.billDetails ? bill.billDetails[0].amount : 0}
              </Text>
            </View>
          </View>

          <View style={styles.headingContainer}>
            <Text style={styles.text} category="h6">
              Capture Payment
            </Text>
          </View>
          <Select
            style={styles.formInput}
            data={[{text: 'Cash'}, {text: 'Card'}]}
            label="Collection Type"
            selectedOption={collectionType}
            onSelect={selectCollectionType}
          />
          <Select
            style={styles.formInput}
            data={[{text: 'Other'}, {text: 'Owner'}]}
            label="PAID BY"
            selectedOption={paidBy}
            onSelect={selectPaidBy}
          />
          <Input
            style={styles.formInput}
            placeholder="Mobile no"
            label="PAYER MOBILE NO."
            value={mobile}
            onChangeText={setMobile}
          />
          <Input
            style={styles.formInput}
            placeholder="Payer Name"
            label="PAYER NAME"
            autoCapitalize="words"
            value={payerName}
            onChangeText={setPayerName}
          />

          <View style={styles.headingContainer}>
            <Text style={styles.text} category="h6">
              GEN/G8 Receipt Details
            </Text>
          </View>
          <Input
            style={styles.formInput}
            placeholder="Receipt no"
            label="GEN/G8 RECEIPT NO."
            value={mscNo}
            onChangeText={setMscNo}
          />
          <Input
            style={styles.formInput}
            placeholder="Receipt issue date"
            label="GEN/G8 RECEIPT ISSUE DATE"
            autoCapitalize="words"
            value={mscDate}
            onChangeText={setMscDate}
          />
        </ScrollView>
        <Button style={styles.button} size="large" onPress={onSubmit}>
          COLLECT
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
  },
  idtext: {
    textAlign: 'center',
    margin: 8,
  },
  alternativeContainer: {
    borderRadius: 4,
    margin: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  headingContainer: {
    margin: 8,
  },
  feeText: {
    margin: 8,
  },
  section: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    margin: 8,
    borderRadius: 4,
  },
  formInput: {
    margin: 8,
  },
  button: {
    marginVertical: 24,
    marginHorizontal: 16,
  },
  feeView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
