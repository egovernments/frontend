import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {
  Button,
  Datepicker,
  Input,
  useStyleSheet,
  StyleService,
  Layout,
  Icon,
  Select,
} from '@ui-kitten/components';

export const MCFormScreen = props => {
  const {
    services,
    tenantid,
    token,
    fetchServices,
    createDemand,
    navigation,
  } = props;

  React.useEffect(() => {
    fetchServices();
  }, []);

  React.useEffect(() => {
    if (props.demand && props.demand.consumerCode) {
      navigation.replace('Collect', {
        consumerCode: props.demand.consumerCode,
        businessService: props.demand.businessService,
        mobileNumber: mobile,
        consumerName: consumerName,
      });
    }
  }, [props.demand]);

  const onSubmit = () => {
    const demand = {
      token,
      tenantId: tenantid,
      consumerCode: '',
      mobileNumber: mobile,
      consumerName: consumerName,
      serviceType: serviceCategoryCode + '.' + serviceTypeCode,
      businessService: serviceCategoryCode + '.' + serviceTypeCode,
      demandDetails: [
        {
          taxHeadMasterCode:
            serviceCategoryCode + '.' + serviceTypeCode.toUpperCase() + '_TAX',
          collectionAmount: 0,
          taxAmount: tax ? tax : 0,
        },
        {
          taxHeadMasterCode:
            serviceCategoryCode +
            '.' +
            serviceTypeCode.toUpperCase() +
            '_FIELD_FEE',
          collectionAmount: 0,
          taxAmount: fieldFee ? fieldFee : 0,
        },
        {
          taxHeadMasterCode:
            serviceCategoryCode + '.' + serviceTypeCode.toUpperCase() + '_CGST',
          collectionAmount: 0,
          taxAmount: CGST ? CGST : 0,
        },
        {
          taxHeadMasterCode:
            serviceCategoryCode + '.' + serviceTypeCode.toUpperCase() + '_SGST',
          collectionAmount: 0,
          taxAmount: SGST ? SGST : 0,
        },
      ],
      taxPeriodFrom: fromDate.getTime(),
      taxPeriodTo: toDate.getTime(),
      additionalDetails: {
        comment: comments,
      },
      payer: {
        uuid: '',
      },
      consumerType: serviceCategoryCode,
    };
    createDemand(demand);
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
  const [serviceCategoryCode, setServiceCategoryCode] = React.useState();
  const [serviceTypeCode, setServiceTypeCode] = React.useState();
  const [fromDate, setFromDate] = React.useState(new Date());
  const [toDate, setToDate] = React.useState(new Date());
  const [tax, setTax] = React.useState();
  const [fieldFee, setFieldFee] = React.useState();
  const [CGST, setCGST] = React.useState();
  const [SGST, setSGST] = React.useState();
  const [comments, setComments] = React.useState();

  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout style={styles.container}>
        <ScrollView style={[styles.container, styles.formContainer]}>
          <Input
            style={styles.formInput}
            placeholder="Mobile no"
            label="MOBILE NO."
            value={mobile}
            onChangeText={setMobile}
          />
          <Input
            style={styles.formInput}
            placeholder="Consumer Name"
            label="CONSUMER NAME"
            autoCapitalize="words"
            value={consumerName}
            onChangeText={setConsumerName}
          />
          <Select
            style={styles.formInput}
            data={services.serviceCategory}
            label="SERVICE CATEGORY"
            placeholder="Select Service Category"
            selectedOption={serviceCategory}
            onSelect={selectServiceCategory}
          />
          {serviceCategory && (
            <Select
              style={styles.formInput}
              label="SERVICE TYPE"
              placeholder="Select Service Type"
              data={services.serviceTypes[serviceCategoryCode]}
              selectedOption={serviceType}
              onSelect={selectServiceType}
            />
          )}
          <Datepicker
            style={styles.formInput}
            label="FROM DATE"
            date={fromDate}
            onSelect={onDateSelection}
            icon={CalendarIcon}
          />
          <Datepicker
            style={styles.formInput}
            label="TO DATE"
            date={toDate}
            onSelect={setToDate}
            icon={CalendarIcon}
          />
          {serviceCategory && serviceType && (
            <>
              <Input
                style={styles.formInput}
                placeholder="Tax"
                label="TAX"
                value={tax}
                onChangeText={setTax}
              />
              <Input
                style={styles.formInput}
                label="FIELD FEE"
                placeholder="Field fee"
                value={fieldFee}
                onChangeText={setFieldFee}
              />
              <Input
                style={styles.formInput}
                placeholder="SGST"
                label="SGST"
                value={CGST}
                onChangeText={setCGST}
              />
              <Input
                style={styles.formInput}
                label="SGST"
                placeholder="SGST"
                value={SGST}
                onChangeText={setSGST}
              />
            </>
          )}
          <Input
            style={styles.formInput}
            label="COMMENTS"
            placeholder="Enter Comments"
            value={comments}
            onChangeText={setComments}
          />
        </ScrollView>
        <Button style={styles.button} size="large" onPress={onSubmit}>
          SUBMIT
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
