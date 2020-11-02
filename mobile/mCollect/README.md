# mCollect

This is POC for mobile application to collect Miscellaneous Fees in Digit platform.

App is developed using [`react-native`](https://reactnative.dev/) framework developed by facebook. [`Learn more`](https://reactnative.dev/)

This app is bootstraped using the 
Command line tools that ship with react-native please find documentation [`here`](https://github.com/react-native-community/cli#documentation).

## Starting mCollect

Please visit this [`page`](https://reactnative.dev/docs/environment-setup) to setup the environment for mobile development.

It contains configurations for both android and ios.

Once you configured environment navigate  inside the project, use Yarn or npm to download dependecies and start the app.

command to download the dependencies

```sh
yarn
# or:
npm install
```


To start the android app please use below commands

```sh
yarn android
# or:
npm run android
```

To start the ios app please use below commands

```sh
#install cocoapods:
cd ios && pod install && cd ..

yarn ios
# or:
npm run ios
```

### Libraries

- Used UI Kitten for UI components. Please find the documentation [`here`](https://akveo.github.io/react-native-ui-kitten/docs/getting-started/what-is-ui-kitten#what-is-ui-kitten).
- React Navigation for routing in the app. Please find the documentation [`here`](https://reactnavigation.org/docs/getting-started).
- React Redux for state management in the app. Please find the documentation [`here`](https://react-redux.js.org/introduction/quick-start).

### App Flow
- Employee logs in to the platform
- Fill out MCS form
- Collects Payment
- Payment Confirmation (Print Receipt)

![](preview.gif)

### DIGIT API endpoints used
1. Authentication:​ ​/user/oauth/token  
2. Fetch Tenants and services : /egov-mdms-service/v1/_search
3. Demand Creation: /billing-service/demand/_create  
4. To generate unique consumer code: /egov-idgen/id/_generate 
5. User search: /user/_search 
6. For creating payment request: /billing-service/bill/v2/_fetchbill
7. For collecting Payment: /collection-services/payments/_create

### TODOS

- Integration with the payment system