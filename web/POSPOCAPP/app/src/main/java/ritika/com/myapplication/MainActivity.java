package ritika.com.myapplication;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.eze.api.EzeAPI;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.UUID;

import ritika.com.myapplication.utils.Constant;

import static ritika.com.myapplication.utils.Constant.REQUEST_CODE_INITIALIZE;
import static ritika.com.myapplication.utils.Constant.REQUEST_CODE_SALE_TXN;

public class MainActivity extends AppCompatActivity {

    TextView et_type, et_consumer_code, et_name, et_email_adrs, et_message, et_service, et_bill_date, et_amtdue;
    EditText et_pay;
    Button submit;
    String paymentAmount = "";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Intent intent = getIntent();
        String action = intent.getAction();
        String type = intent.getType();

        if (Intent.ACTION_SEND.equals(action) && type != null) {
            if ("text/plain".equals(type)) {
                handleSendText(intent); // Handle text being sent
            }
        }
        setContentView(R.layout.activity_main);
        et_type = (TextView) findViewById(R.id.et_type);
        et_consumer_code = (TextView) findViewById(R.id.et_consumer_code);
        et_name = (TextView) findViewById(R.id.et_name);
        et_email_adrs = (TextView) findViewById(R.id.et_email_adrs);
        et_message = (TextView) findViewById(R.id.et_message);
        et_service = (TextView) findViewById(R.id.et_service);
        et_bill_date = (TextView) findViewById(R.id.et_bill_date);
        et_amtdue = (TextView) findViewById(R.id.et_amtdue);
        et_pay = (EditText) findViewById(R.id.et_pay);

        submit = (Button) findViewById(R.id.submit);

        submit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                final String[] items = {"Cash", "Card"};
                final AlertDialog.Builder builder = new AlertDialog.Builder(MainActivity.this);
                builder.setCancelable(false);
                builder.setItems(items, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        switch (which) {
                            case 0:
                                Toast.makeText(getApplicationContext(), "Cash", Toast.LENGTH_SHORT).show();
                                break;
                            case 1:
                                Toast.makeText(getApplicationContext(), "Card", Toast.LENGTH_SHORT).show();
                                data();
                                break;
                        }
                        dialog.dismiss();
                    }
                });

                builder.show();
            }
        });
        doInitializeEzeTap();
    }

    private void handleSendText(Intent intent)
    {
        String instrumentType = intent.getStringExtra("instrumentType");
        if (instrumentType != null) {
            Toast toast = Toast.makeText(getApplicationContext(),
                    instrumentType,
                    Toast.LENGTH_SHORT);

            toast.show();

            // Update UI to reflect text being shared
        }
    }

    /**
     * Take credit card transactions for Visa, Mastercard and Rupay. Debit card
     * transactions for Indian banks. Ability to perform EMI option.
     */
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
        EzeAPI.cardTransaction(this, REQUEST_CODE_SALE_TXN, jsonRequest);
    }


    private void data(){
        try {
            JSONObject jsonRequest = new JSONObject();
            JSONObject jsonOptionalParams = new JSONObject();
            JSONObject jsonReferences = new JSONObject();
            JSONObject jsonCustomer = new JSONObject();
            // Building Customer Object
            jsonCustomer.put("name", "name");
            jsonCustomer.put("mobileNo", "0000000000");
            jsonCustomer.put("email", "mail@gmail.com");

            // Building References Object
            jsonReferences.put("reference1", "orderNumbar");
            jsonReferences.put("reference2", "orderNumbar");
            jsonReferences.put("reference3", "orderNumbar");

            // Passing Additional References
            JSONArray array = new JSONArray();
            array.put("addRef_xx1");
            array.put("addRef_xx2");
            jsonReferences.put("additionalReferences", array);

            // Building Optional params Object
            jsonOptionalParams.put("amountCashback", "20" + "");// Cannot
            // have
            // amount cashback in SALE transaction.
            jsonOptionalParams.put("amountTip", 0.00);
            jsonOptionalParams.put("references", jsonReferences);
            jsonOptionalParams.put("customer", jsonCustomer);

            // Service Fee
            double serviceFee = -1.0;
            String paymentBy = null;
            /*if (serviceFeeEditText.getText().toString().length() > 0) {
                serviceFee = Double.parseDouble(serviceFeeEditText.getText().toString());
            }
            if (paymentByEditText.getText().toString().length() > 0) {
                paymentBy = paymentByEditText.getText().toString();
            }*/
            jsonOptionalParams.put("serviceFee", serviceFee);
            jsonOptionalParams.put("paymentBy", paymentBy);

            // Pay to Account
            String accountLabel = null;
            /*if (accountLabelEditTet.getText().toString().length() > 0) {
                accountLabel = accountLabelEditTet.getText().toString();
            }*/
            jsonOptionalParams.put("payToAccount", accountLabel);

            JSONObject addlData = new JSONObject();
            addlData.put("addl1", "addl1");
            addlData.put("addl2", "addl2");
            addlData.put("addl3", "addl3");
            jsonOptionalParams.put("addlData", addlData);

            JSONObject appData = new JSONObject();
            appData.put("app1", "app1");
            appData.put("app2", "app2");
            appData.put("app3", "app3");
            jsonOptionalParams.put("appData", appData);

            // Building final request object
            jsonRequest.put("amount", "1");
            jsonRequest.put("options", jsonOptionalParams);

            jsonRequest.put("mode", "SALE");//Card payment Mode
            doSaleTxn(jsonRequest);
        } catch (JSONException e) {
            e.printStackTrace();
        }

    }



    /**
     * invoke to initialize the SDK with the merchant key and the device (card
     * reader) with bank keys
     */
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
            jsonRequest.put("demoAppKey", Constant.API_KEY);
            jsonRequest.put("prodAppKey", Constant.API_KEY);
            jsonRequest.put("merchantName", Constant.MERCHANT_NAME);
            jsonRequest.put("userName", "ritika");
            jsonRequest.put("currencyCode", "INR");
            jsonRequest.put("appMode", "Demo");
            jsonRequest.put("captureSignature", "true");
            jsonRequest.put("prepareDevice", "false");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        EzeAPI.initialize(this, REQUEST_CODE_INITIALIZE, jsonRequest);
    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent intent) {
        super.onActivityResult(requestCode, resultCode, intent);
        Log.d("SampleAppLogs", "requestCode = " + requestCode + "resultCode = " + resultCode);
        try {
            if (intent != null && intent.hasExtra("response")) {
                Toast.makeText(this, intent.getStringExtra("response"), Toast.LENGTH_LONG).show();
                Log.d("SampleAppLogs", intent.getStringExtra("response"));
            }


            if(requestCode==REQUEST_CODE_SALE_TXN){
                if (resultCode == RESULT_OK) {
                    JSONObject response = new JSONObject(intent.getStringExtra("response"));
                    response = response.getJSONObject("result");
                    response = response.getJSONObject("txn");
                    String strTxnId = response.getString("txnId");
                    String emiID = response.getString("emiId");

                } else if (resultCode == RESULT_CANCELED) {
                    JSONObject response = new JSONObject(intent.getStringExtra("response"));
                    response = response.getJSONObject("error");
                    String errorCode = response.getString("code");
                    String errorMessage = response.getString("message");
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
