package com.mcollect.paymentInterface;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.eze.api.EzeAPI;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.mcollect.MainActivity;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.UUID;

import static android.app.Activity.RESULT_CANCELED;
import static android.app.Activity.RESULT_OK;
import static com.mcollect.utils.Constant.REQUEST_CODE_CASH_TXN;
import static com.mcollect.utils.Constant.REQUEST_CODE_INITIALIZE;
import static com.mcollect.utils.Constant.REQUEST_CODE_SALE_TXN;

public class PaymentInterfaceModule extends ReactContextBaseJavaModule{

//    static final int SEND_PYAMENT_INFORMATION = 2;
    public static Callback paymentSuccessCallback;
    public static Callback paymentCancelCallback;

    private String strTxnId = null;
    private String stramount = null;
    private String strsettlementStatus = null;
    private ReactApplicationContext mReactContext = null;
   // private MainActivity mainActivity;

    public PaymentInterfaceModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
       // reactContext.addActivityEventListener(this);


    }


//    @Override
//    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
//        try {
//            if (data != null && data.hasExtra("response")) {
//                //  Toast.makeText(this, intent.getStringExtra("response"), Toast.LENGTH_LONG).show();
//                Log.d("SampleAppLogs", data.getStringExtra("response"));
//            }
//
//            if (requestCode == REQUEST_CODE_SALE_TXN) {
//                Intent sendAckIntent;
//                if (resultCode == RESULT_OK) {
//                    Log.v("JSONRST", data.getStringExtra("response"));
//                    JSONObject response = new JSONObject(data.getStringExtra("response"));
//                    JSONObject mainObject = new JSONObject(data.getStringExtra("response"));
//                    response = response.getJSONObject("result");
//                    response = response.getJSONObject("txn");
//                    String strTxnId = response.getString("txnId");
//                    String stramount = response.getString("amount");
//                    String strsettlementStatus = response.getString("settlementStatus");
//                    // Log.v("SETTLEMENTSTATUS", settlementStatus);
//
//                    sendBackResultToProductApp(stramount,strTxnId,strsettlementStatus,"Payment success");
//
//                } else if (resultCode == RESULT_CANCELED) {
//                    JSONObject response = new JSONObject(data.getStringExtra("response"));
//                    response = response.getJSONObject("error");
//                    String errorCode = response.getString("code");
//                    String errorMessage = response.getString("message");
//                }
//            }
//
//            if (requestCode == REQUEST_CODE_CASH_TXN) {
//                Intent sendAckIntent;
//                if (resultCode == RESULT_OK) {
//                    Log.v("JSONRST", data.getStringExtra("response"));
//                    JSONObject response = new JSONObject(data.getStringExtra("response"));
//                    JSONObject mainObject = new JSONObject(data.getStringExtra("response"));
//                    response = response.getJSONObject("result");
//                    response = response.getJSONObject("txn");
//                    String strTxnId = response.getString("txnId");
//                    String stramount = response.getString("amount");
//                    String strsettlementStatus = response.getString("settlementStatus");
////                    Log.v("SETTLEMENTSTATUS", settlementStatus);
//
//                    sendBackResultToProductApp(stramount,strTxnId,strsettlementStatus,"Payment success");
//                } else {
//                    System.out.println("------------------------api cashbackCallback-------4");
//                    JSONObject response = new JSONObject(data.getStringExtra("response"));
//                    response = response.getJSONObject("error");
//                    String errorCode = response.getString("code");
//                    String errorMessage = response.getString("message");
//                    sendBackResultToProductApp(stramount,strTxnId,strsettlementStatus,"Payment failure");
//                }
//            }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
////        if (paymentSuccessCallback != null) {
////            if (resultCode == RESULT_CANCELED) {
////                paymentCancelCallback.invoke("Transaction was cancelled");
////            } else if (resultCode == RESULT_OK && requestCode == SEND_PYAMENT_INFORMATION) {
////                String uri = data.getStringExtra("transactionStatus");
////
////                if (uri == null) {
////                    paymentCancelCallback.invoke("No transactionStatus found");
////                } else {
////                    try {
////                        paymentSuccessCallback.invoke(uri);
////                    } catch (Exception e) {
////                        paymentCancelCallback.invoke("No transactionStatus found");
////                    }
////                }
////            }
////        }
//    }
//
//    @Override
//    public void onNewIntent(Intent intent) {
//
//    }

    @NonNull
    @Override
    public String getName() {
        return "PaymentInterface";
    }

    @ReactMethod
    public void sendPaymentData(String name, String json,Callback successCallback, Callback cancelCallback )throws JSONException {

        Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) {
           paymentCancelCallback.invoke("Activity doesn't exist");
            return;
        }
        paymentSuccessCallback = successCallback;
        paymentCancelCallback = cancelCallback;

        //Toast.makeText(currentActivity.getApplicationContext(), json, Toast.LENGTH_SHORT).show();
        //android:roundIcon="@mipmap/ic_launcher_round"

//        try {
//            Intent sendPaymentIntent = new Intent(Intent.ACTION_SEND);
//            sendPaymentIntent.setClassName("ritika.com.myapplication", "ritika.com.myapplication.MainActivity");
//            sendPaymentIntent.setType("text/plain");
//            sendPaymentIntent.putExtra(name, json);
//            currentActivity.startActivityForResult(sendPaymentIntent, SEND_PYAMENT_INFORMATION);
//        } catch (Exception e) {
//            cancelCallback.invoke(e);
//        }
        doInitializeEzeTap();
        JSONObject jsonObject = new JSONObject(json);
        String modeOfPayment = jsonObject.getString("instrumentType");
        if(modeOfPayment.equalsIgnoreCase("Cash"))
        {
            onCash(json);
        }
        else if(modeOfPayment.equalsIgnoreCase("Card")){
            onCard(json);
        }
        else{
            paymentCancelCallback.invoke("Payment Mode does not exist");
            return;
        }
    }
    void onCash(String json) {
        //TODO implement
        try {
            //  REQUEST

            JSONObject jsonObject = new JSONObject(json);


            JSONObject jsonRequest = new JSONObject();
            JSONObject jsonOptionalParams = new JSONObject();
            JSONObject jsonReferences = new JSONObject();
            JSONObject jsonCustomer = new JSONObject();

            //Building Customer Object
            jsonCustomer.put("name", jsonObject.getString("customerName"));
            jsonCustomer.put("mobileNo",jsonObject.getString("customerMobile"));
            // jsonCustomer.put("email", et_email_adrs.getText().toString().trim());

            //int refNo = SharedPrefrences.getRefNo(PaymentoptionActivity.this);
            jsonReferences.put("reference1", "" + UUID.randomUUID());
            //SharedPrefrences.setReferenceNo(PaymentoptionActivity.this, (refNo + 1));

            //Passing Additional References
            JSONArray array = new JSONArray();
            array.put("addRef_xx1");
            array.put("addRef_xx2");
            jsonReferences.put("additionalReferences", array);

            //Building Optional params Object
            //Cannot have amount cashback in cash transaction.
            jsonOptionalParams.put("amountCashback", "0.00");
            jsonOptionalParams.put("amountTip", "0.00");
            jsonOptionalParams.put("references", jsonReferences);
            jsonOptionalParams.put("customer", jsonCustomer);


            //Building final request object
            jsonRequest.put("amount",jsonObject.getString("paymentAmount"));
            jsonRequest.put("options", jsonOptionalParams);

            doCashTxn(jsonRequest);

            //EzeAPI.cashTransaction(this, REQUESTCODE_, jsonRequest);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }


    private void doCashTxn(JSONObject jsonRequest) {
        /******************************************
         {
         "amount": "123",
         "options": {
         "references": {
         "reference1": "1234",
         "additionalReferences": [
         "addRef_xx1",
         "addRef_xx2"
         ]
         },
         "customer": {
         "name": "xyz",
         "mobileNo": "1234567890",
         "email": "abc@xyz.com"
         }
         }
         }
         ******************************************/
        Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) {
            return;
        }

        EzeAPI.cashTransaction(currentActivity, REQUEST_CODE_CASH_TXN, jsonRequest);
    }


    void onCard(String json) {

        JSONObject jsonRequest = new JSONObject();
        try {
            JSONObject jsonObject = new JSONObject(json);
            jsonRequest = new JSONObject();
            JSONObject jsonOptionalParams = new JSONObject();
            JSONObject jsonReferences = new JSONObject();
            JSONObject josnAdtionakRefrence = new JSONObject();

            // Building References Object
            jsonReferences.put("reference1", "ref" +  UUID.randomUUID());


            // Passing Additional References
            JSONArray array = new JSONArray();
            array.put("addRef_xx1");
            array.put("addRef_xx2");
            jsonReferences.put("additionalReferences", array);

            jsonOptionalParams.put("amountCashback", "0");// Cannot
            // have
            // amount cashback in SALE transaction.
            jsonOptionalParams.put("amountTip", 0.00);
            jsonOptionalParams.put("references", jsonReferences);


            JSONObject jsonCustomer = new JSONObject();

            // Building Customer Object
            jsonCustomer.put("name", jsonObject.getString("customerName"));
            jsonCustomer.put("mobileNo",jsonObject.getString("customerMobile"));
            //  jsonCustomer.put("email", et_email_adrs.getText().toString().trim());

            jsonRequest.put("amount",jsonObject.getString("paymentAmount"));
            jsonRequest.put("options", jsonOptionalParams);

            jsonRequest.put("references", jsonReferences);
            jsonRequest.put("additionalReferences", josnAdtionakRefrence);
            jsonRequest.put("mode", "SALE");//Card payment Mode
            doSaleTxn(jsonRequest);


        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    private void doSaleTxn(JSONObject jsonRequest) {
        /******************************************
         {
         "amount": "123",
         "options": {
         "amountCashback": 0,
         "amountTip": 0,
         "references": {
         "reference1": "1234",
         "additionalReferences": [
         "addRef_xx1",
         "addRef_xx2"
         ]
         },
         "customer": {
         "name": "xyz",
         "mobileNo": "1234567890",
         "email": "abc@xyz.com"
         }
         },
         "mode": "SALE"
         }
         ******************************************/
        Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) {
            return;
        }
        EzeAPI.cardTransaction(currentActivity, REQUEST_CODE_SALE_TXN, jsonRequest);
    }

//
//    public void sendBackResultToProductApp(String amountPaid,String transactionId,String transactionStatus,
//                                           String tosterMessage) {
////        Intent sendBackAckIntent = new Intent();
////        sendBackAckIntent.putExtra("amountPaid", amountPaid);
////        sendBackAckIntent.putExtra("transactionId", transactionId);
////        sendBackAckIntent.putExtra("transactionStatus", transactionStatus);
////        setResult(MainActivity.RESULT_OK, sendBackAckIntent);
////        Toast.makeText(this, tosterMessage, Toast.LENGTH_SHORT).show();
//
//        if (paymentSuccessCallback != null) {
//            if (transactionStatus == "Payment failure" || transactionStatus == null) {
//                paymentCancelCallback.invoke("Transaction was cancelled");
//            } else if (transactionStatus == "Payment success") {
//                try {
//                    paymentSuccessCallback.invoke(transactionStatus);
//                } catch (Exception e) {
//                    paymentCancelCallback.invoke("No transactionStatus found");
//                }
//            }
//
//        }
//    }

    private void doInitializeEzeTap() {
        /**********************************************
         {
         "demoAppKey": "your demo app key",
         "prodAppKey": "your prod app key",
         "merchantName": "your merchant name",
         "userName": "your user name",
         "currencyCode": "INR",
         "appMode": "DEMO/PROD",
         "captureSignature": "true/false",
         "prepareDevice": "true/false"
         }
         **********************************************/
        JSONObject jsonRequest = new JSONObject();
        try {
            jsonRequest.put("demoAppKey", "94416339-08f9-45b4-a5d2-b150f49842f5");
            jsonRequest.put("prodAppKey", "94416339-08f9-45b4-a5d2-b150f49842f5");
            jsonRequest.put("merchantName", "BHARAT_ELECTRONICS_LIMITE");
            jsonRequest.put("userName", "9611039988");
            jsonRequest.put("currencyCode", "INR");
            jsonRequest.put("appMode", "Demo");
            jsonRequest.put("captureSignature", "true");
            jsonRequest.put("prepareDevice", "false");
        } catch (JSONException e) {
            e.printStackTrace();
        }
       Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
           System.out.println("current Activity is null");
            return;
        }
        EzeAPI.initialize(currentActivity, REQUEST_CODE_INITIALIZE, jsonRequest);
    }


}


