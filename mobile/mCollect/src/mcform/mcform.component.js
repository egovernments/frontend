import React from 'react';
import {SafeAreaView, ScrollView, View,ToastAndroid} from 'react-native';
import {
  Button,
  Datepicker,
  Input,
  useStyleSheet,
  StyleService,
  Layout,
  Icon,
  Select,
  Card,
  Text
} from '@ui-kitten/components';

export const MCFormScreen = props => {
  const {
    services,
    tenantid,
    token,
    fetchServices,
    createDemand,
    navigation,
    fetchMohalla,
    mohallaData,
    createChallan
  } = props;

  React.useEffect(() => {
    fetchMohalla(tenantid);
  }, []);


  React.useEffect(() => {
    fetchServices();
  }, []);

  // React.useEffect(() => {
  //   if (props.demand && props.demand.consumerCode) {
  //     navigation.replace('Collect', {
  //       consumerCode: props.demand.consumerCode,
  //       businessService: props.demand.businessService,
  //       mobileNumber: mobile,
  //       consumerName: consumerName,
  //     });
  //   }
  // }, [props.demand]);

  React.useEffect(() => {
    if (props.challans && props.challans.challanNo) {
      navigation.replace('ChallanAck', {
        challanNo: props.challans.challanNo,
        consumerName: consumerName,
        mobileNumber:mobile
      });
    }
  }, [props.challans]);


  const displayToast = (msg) => {

    ToastAndroid.showWithGravity(
      msg,
      ToastAndroid.SHORT, //can be SHORT, LONG
      ToastAndroid.BOTTOM, //can be TOP, BOTTON, CENTER
    );
  };


  const validateTaxField  = ()=>{
    if(fromDate > toDate){
      displayToast("Please enter From Date less than or equal to To Date");
      return false
    }
    return true;
  }


  const validateFields = () => {
  
      var re = /^[6789][0-9]{9}$/i;
      var result = re.test(mobile);
      setIsValidMob(result);
  
      var re= /^[^{0-9}^\$\"'<>?\\\\~`!@#$%^()+={}\[\]*,._:;“”‘’]{1,50}$/i;
      var result = re.test(consumerName);
      if(consumerName != null)
        setIsValidName(result);
      else
        setIsValidName(false);
      
  
      re= /^[^\$\"'<>?\\\\~`!@$%^()+={}\[\]*.:;“”‘’]{1,50}$/i;
      result = re.test(doorNo);
      setIsValidDoorNo(result);
  
      re= /^[^\$\"'<>?\\\\~`!@$%^()+={}\[\]*.:;“”‘’]{1,100}$/i;
      result = re.test(buildingName);
      setIsValidBldName(result);
      result = re.test(streetName);
      setIsValidStName(result);
  
      if(pincode != null){
        re = /^[1-9][0-9]{5}$/i;
        result = re.test(pincode);
        setIsValidPincode(result);      
      }
      else{
        setIsValidPincode(true); 
      }

  
      // re = /^[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/i;
      // result = re.test(fromDate);
      // setIsValidFrom(result);
      // result = re.test(toDate);
      // setIsValidTo(result);

      re = /^[0-9]{0,9}$/i;
      if(fieldFee != null){
        result = re.test(fieldFee);
        setIsValidFee(result);
      }
      else{
        setIsValidFee(true);
      }
      if(CGST != null){
      result = re.test(CGST);
      setIsValidCGST(result);
    }
    else{
      setIsValidCGST(true);
    }
    if(SGST != null){
      result = re.test(SGST);
      setIsValidSGST(result);
    }
    else{
      setIsValidSGST(true);
    }
    if(SecurityDeposit != null){
      result = re.test(SecurityDeposit);
      setIsValidSecDEp(result);
    }
    else{
      setIsValidSecDEp(true);
    }

      re = /^[1-9][0-9]*$/i;
      result = re.test(tax);
      setIsValidTax(result);

     
      if(mohallaCode =='')
        setIsValidMohalla(false);
      else
        setIsValidMohalla(true);

      if(serviceTypeCode == '' )        
        setIsValidSerType(false);
      else
        setIsValidSerType(true);

      if(serviceCategoryCode == '')
        setIsValidSerCat(false);
      else
        setIsValidSerCat(true);

    if(isValidMob && isValidName && isValidFee && isValidTax &&
      isValidCGST && isValidSGST && isValidSecDep && isValidDoorNo && isValidBldName && isValidStName 
      && isValidStName && validateTaxField() && isValidMohalla &&isValidSerType && isValidSerCat) 
      return true;
    else
      return false;
    };
  const onSubmit = () => {
    // const demand = {
    //   token,
    //   tenantId: tenantid,
    //   consumerCode: '',
    //   mobileNumber: mobile,
    //   consumerName: consumerName,
    //   //serviceType: serviceCategoryCode + '.' + serviceTypeCode,
    //   businessService: serviceCategoryCode + '.' + serviceTypeCode,
    //   demandDetails: [
    //     {
    //       taxHeadMasterCode:
    //         serviceCategoryCode + '.' + serviceTypeCode.toUpperCase() + '_TAX',
    //       collectionAmount: 0,
    //       taxAmount: tax ? tax : 0,
    //       tenantId: tenantid,
    //     },
    //     {
    //       taxHeadMasterCode:
    //         serviceCategoryCode +
    //         '.' +
    //         serviceTypeCode.toUpperCase() +
    //         '_FIELD_FEE',
    //       collectionAmount: 0,
    //       taxAmount: fieldFee ? fieldFee : 0,
    //       tenantId: tenantid,
    //     },
    //     {
    //       taxHeadMasterCode:
    //         serviceCategoryCode + '.' + serviceTypeCode.toUpperCase() + '_CGST',
    //       collectionAmount: 0,
    //       taxAmount: CGST ? CGST : 0,
    //       tenantId: tenantid,
    //     },
    //     {
    //       taxHeadMasterCode:
    //         serviceCategoryCode + '.' + serviceTypeCode.toUpperCase() + '_SGST',
    //       collectionAmount: 0,
    //       taxAmount: SGST ? SGST : 0,
    //       tenantId: tenantid,
    //     },
    //     {
    //       taxHeadMasterCode:
    //         serviceCategoryCode + '.' + serviceTypeCode.toUpperCase() + '_SEC_DEP',
    //       collectionAmount: 0,
    //       taxAmount: SecurityDeposit ? SecurityDeposit : 0,
    //       tenantId: tenantid,
    //     },
    //   ],
    //   taxPeriodFrom: fromDate.getTime(),
    //   taxPeriodTo: toDate.getTime(),
    //   additionalDetails: {
    //     comment: comments,
    //   },
    //   payer: {
    //     uuid: '',
    //     userName: mobile,
    //     name: consumerName,
    //     mobileNumber: mobile
    //   },
    //   consumerType: serviceCategoryCode,
    // };
    
    // createDemand(demand);

    
    if(validateFields()){

      const challan = {
        token,
        accountId:'',
        tenantId: tenantid,
        //serviceType: serviceCategoryCode + '.' + serviceTypeCode,
        businessService: serviceCategoryCode + '.' + serviceTypeCode,
        address:{
          buildingName: buildingName,
          doorNo : doorNo,
          locality:{
            code: mohallaCode,
          },
          pincode:pincode,
          street: streetName
        },
        amount: [
          {
            taxHeadCode:
              serviceCategoryCode + '.' + serviceTypeCode.toUpperCase() + '_TAX',
            amount: tax ? tax : 0,
          },
          {
            taxHeadCode:
              serviceCategoryCode +
              '.' +
              serviceTypeCode.toUpperCase() +
              '_FIELD_FEE',
            amount: fieldFee ? fieldFee : 0,
          },
          {
            taxHeadCode:
              serviceCategoryCode + '.' + serviceTypeCode.toUpperCase() + '_CGST',
            amount: CGST ? CGST : 0,
          },
          {
            taxHeadCode:
              serviceCategoryCode + '.' + serviceTypeCode.toUpperCase() + '_SGST',
            amount: SGST ? SGST : 0,
          },
          {
            taxHeadCode:
              serviceCategoryCode + '.' + serviceTypeCode.toUpperCase() + '_SEC_DEP',
            amount: SecurityDeposit ? SecurityDeposit : 0,
          },
        ],
        taxPeriodFrom: fromDate.getTime(),
        taxPeriodTo: toDate.getTime(),
        description:comments,
        additionalDetails: {
          GLcode: "",
        },
        payer: {
          uuid: '',
          userName: mobile,
          name: consumerName,
          mobileNumber: mobile
        },
        consumerType: serviceCategoryCode,
        citizen:{
          mobileNumber : mobile,
          name : consumerName
        }
      };
      
      createChallan(challan);
    }

  };

  
  const selectMohalla = item => {  
    setMohalla(item);
    setMohallaCode(item.code);
  };

  const selectServiceCategory = item => {
    setServiceCategory(item);
    setServiceCategoryCode(item.code);
  };

  const selectServiceType = item => {
    setServiceType(item);
    setServiceTypeCode(item.code);
  };

  const onDateSelection = date => {
    setFromDate(date);
  };
  const CalendarIcon = style => <Icon {...style} name="calendar" />;
  const styles = useStyleSheet(themedStyles);

  const [mobile, setMobile] = React.useState();
  const [consumerName, setConsumerName] = React.useState();
  const [serviceCategory, setServiceCategory] = React.useState();
  const [serviceType, setServiceType] = React.useState();
  const [serviceCategoryCode, setServiceCategoryCode] = React.useState('');
  const [serviceTypeCode, setServiceTypeCode] = React.useState('');
  const [fromDate, setFromDate] = React.useState(new Date());
  const [toDate, setToDate] = React.useState(new Date());
  const [tax, setTax] = React.useState();
  const [fieldFee, setFieldFee] = React.useState();
  const [CGST, setCGST] = React.useState();
  const [SGST, setSGST] = React.useState();
  const [SecurityDeposit, setSecurityDeposit] = React.useState();
  const [comments, setComments] = React.useState();

  const [doorNo, setdoorNo] = React.useState();
  const [buildingName, setbuildingName] = React.useState();
  const [streetName, setStreetName] = React.useState();
  const [mohalla, setMohalla] = React.useState();
  const [mohallaCode, setMohallaCode] = React.useState('');
  const [pincode, setPincode] = React.useState();

  const [isValidMob,setIsValidMob] = React.useState(true);
  const [isValidName,setIsValidName] = React.useState(true);
  const [isValidMohalla,setIsValidMohalla] = React.useState(true);
  const [isValidSerType,setIsValidSerType] = React.useState(true);
  const [isValidSerCat,setIsValidSerCat] = React.useState(true);
  const [isValidFee,setIsValidFee] = React.useState(true);
  const [isValidTax,setIsValidTax] = React.useState(true);
  const [isValidCGST,setIsValidCGST] = React.useState(true);
  const [isValidSGST,setIsValidSGST] = React.useState(true);
  const [isValidSecDep,setIsValidSecDEp] = React.useState(true);
  const [isValidDoorNo,setIsValidDoorNo] = React.useState(true);
  const [isValidBldName,setIsValidBldName] = React.useState(true);
  const [isValidStName,setIsValidStName] = React.useState(true);
  const [isValidPincode,setIsValidPincode] = React.useState(true);

  return (

   
    <SafeAreaView style={{flex: 1}}>
      <Layout style={styles.container}>
        <ScrollView style={[styles.container, styles.formContainer]}>
        <Card style={styles.card} >
        <Text category='s1' >Consumer Details</Text>
      
          <Input
            style={styles.formInput}
            placeholder="Enter Mobile no"
            label="MOBILE NO. *"
            value={mobile}
            numeric
            keyboardType={'numeric'}
            onChangeText={setMobile}
            status={isValidMob?'':'danger'}
            required={true}
          />
          {!isValidMob && (
          <View >
          <Text style={{ color: 'red' }}>
            Invalid Mobile Number
          </Text>
          </View>
          )}
          <Input
            style={styles.formInput}
            placeholder="Enter Consumer Name"
            label="CONSUMER NAME *"
            autoCapitalize="words"
            value={consumerName}
            onChangeText={setConsumerName}
            status={isValidName?'':'danger'}
          />
          {!isValidName && (
          <View >
          <Text style={{ color: 'red' }}>
            Invalid Consumer Name
          </Text>
          </View>
          )}
          <Input
            style={styles.formInput}
            placeholder="Enter Door/House No."
            label="DOOR/HOUSE No."
            value={doorNo}
            onChangeText={setdoorNo}
            status={isValidDoorNo?'':'danger'}
          />
          {!isValidDoorNo && (
          <View >
          <Text style={{ color: 'red' }}>
            Invalid Mobile Number
          </Text>
          </View>
          )}
          <Input
            style={styles.formInput}
            placeholder="Enter Building/Colony Name"
            label="BUILDING/COLONY NAME"
            value={buildingName}
            onChangeText={setbuildingName}
            status={isValidBldName?'':'danger'}
          />
          {!isValidBldName && (
          <View >
          <Text style={{ color: 'red' }}>
            Invalid Building Name
          </Text>
          </View>
          )}
          <Input
            style={styles.formInput}
            placeholder="Enter Street Name"
            label="STREET NAME"
            value={streetName}
            onChangeText={setStreetName}
            status={isValidStName?'':'danger'}
          />
          {!isValidStName && (
          <View >
          <Text style={{ color: 'red' }}>
            Invalid Street Name
          </Text>
          </View>
          )}
          <Select
            style={styles.formInput}
            data={mohallaData.mohalla}
            placeholder="Select Mohalla"
            label="MOHALLA *"
            selectedOption={mohalla}
            onSelect={selectMohalla}
          />
          <Input
            style={styles.formInput}
            placeholder="Enter Pincode"
            label="PINCODE"
            value={pincode}
            onChangeText={setPincode}
            numeric
            keyboardType={'numeric'}
            status={isValidPincode?'':'danger'}
          />
          {!isValidPincode && (
          <View >
          <Text style={{ color: 'red' }}>
            Invalid Pincode
          </Text>
          </View>
          )}
           </Card>
           <Card style={styles.card} >
        <Text category='s1' >Service Details</Text>
          <Select
            style={styles.formInput}
            data={services.serviceCategory}
            label="SERVICE CATEGORY *"
            placeholder="Select Service Category"
            selectedOption={serviceCategory}
            onSelect={selectServiceCategory}
            status={isValidSerCat?'':'danger'}
          />
          {serviceCategory && (
            <Select
              style={styles.formInput}
              label="SERVICE TYPE *"
              placeholder="Select Service Type"
              data={services.serviceTypes[serviceCategoryCode]}
              selectedOption={serviceType}
              onSelect={selectServiceType}
              status={isValidSerType?'':'danger'}
            />
          )}
          <Datepicker
            style={styles.formInput}
            label="FROM DATE *"
            date={fromDate}
            onSelect={onDateSelection}
            icon={CalendarIcon}
          />
          <Datepicker
            style={styles.formInput}
            label="TO DATE *"
            date={toDate}
            onSelect={setToDate}
            icon={CalendarIcon}
          />
          {serviceCategory && serviceType && (
            <>
              <Input
                style={styles.formInput}
                placeholder="Enter Amount"
                label="Amount *"
                value={tax}
                numeric
                keyboardType={'numeric'}
                onChangeText={setTax}
                status={isValidTax?'':'danger'}
              />
                {!isValidTax && (
                <View >
                <Text style={{ color: 'red' }}>
                  Invalid Amount
                </Text>
                </View>
                )}
              <Input
                style={styles.formInput}
                label="FIELD FEE"
                placeholder="Enter Field fee"
                value={fieldFee}
                numeric
                keyboardType={'numeric'}
                onChangeText={setFieldFee}
                status={isValidFee?'':'danger'}
              />
                {!isValidFee && (
                <View >
                <Text style={{ color: 'red' }}>
                  Invalid Field Fee
                </Text>
                </View>
                )}
              <Input
                style={styles.formInput}
                placeholder="Enter CGST"
                label="CGST"
                value={CGST}
                numeric
                keyboardType={'numeric'}
                onChangeText={setCGST}
                status={isValidCGST?'':'danger'}
              />
                {!isValidCGST && (
                <View >
                <Text style={{ color: 'red' }}>
                  Invalid CGST
                </Text>
                </View>
                )}
              <Input
                style={styles.formInput}
                label="Enter SGST"
                placeholder="SGST"
                value={SGST}
                numeric
                keyboardType={'numeric'}
                onChangeText={setSGST}
                status={isValidSGST?'':'danger'}
              />
                {!isValidSGST && (
                <View >
                <Text style={{ color: 'red' }}>
                  Invalid SGST
                </Text>
                </View>
                )}
                <Input
                style={styles.formInput}
                label="Security Deposit"
                placeholder="Enter Security Deposit"
                value={SecurityDeposit}
                numeric
                keyboardType={'numeric'}
                onChangeText={setSecurityDeposit}
                status={isValidSecDep?'':'danger'}
              />
              {!isValidSecDep && (
                <View >
                <Text style={{ color: 'red' }}>
                  Invalid Security Deposit Amount
                </Text>
                </View>
              )}
            </>
          )}
          <Input
            style={styles.formInput}
            label="COMMENTS"
            placeholder="Enter Comments"
            value={comments}
            onChangeText={setComments}
          />
          </Card>
        </ScrollView>
        <Button style={styles.button} size="large" onPress={onSubmit}>
          GENERATE CHALLAN
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
  button: {
    marginVertical: 24,
    marginHorizontal: 16,
  },
  divider: {
    flex: 1,
  },
  card: {
    flex: 1,
    margin: 2,
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
