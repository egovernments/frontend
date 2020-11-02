package com.mcollect;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.eze.api.EzeAPI;
import com.facebook.react.BuildConfig;
import com.facebook.react.PackageList;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactPackage;
import com.facebook.react.ReactRootView;
import com.facebook.react.bridge.Callback;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.facebook.soloader.SoLoader;
import com.mcollect.paymentInterface.PaymentInterfacePackage;
import com.mcollect.printerInterface.PrinterInterfacePackage;

import org.json.JSONObject;

import java.util.List;

import static com.mcollect.utils.Constant.REQUEST_CODE_CASH_TXN;
import static com.mcollect.utils.Constant.REQUEST_CODE_CLOSE;
import static com.mcollect.utils.Constant.REQUEST_CODE_SALE_TXN;
import com.mcollect.paymentInterface.PaymentInterfaceModule;


//public class MainActivity extends ReactActivity {
public class MainActivity extends AppCompatActivity implements DefaultHardwareBackBtnHandler {
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
//  @Override
//  protected String getMainComponentName() {
//    return "mCollect";
//  }

  private ReactRootView mReactRootView;
  private ReactInstanceManager mReactInstanceManager;



//  public Callback paymentSuccessCallback;
//  public Callback paymentCancelCallback;
  private PaymentInterfacePackage paymentInterfacePackage = new PaymentInterfacePackage();

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    SoLoader.init(this, false);

    mReactRootView = new ReactRootView(this);
    List<ReactPackage> packages = new PackageList(getApplication()).getPackages();
    packages.add(paymentInterfacePackage);
    packages.add(new PrinterInterfacePackage());

    // Packages that cannot be autolinked yet can be added manually here, for example:
    // packages.add(new MyReactNativePackage());
    // Remember to include them in `settings.gradle` and `app/build.gradle` too.

    mReactInstanceManager = ReactInstanceManager.builder()
            .setApplication(getApplication())
            .setCurrentActivity(this)
            .setBundleAssetName("index.android.bundle")
            .setJSMainModulePath("index")
            .addPackages(packages)
            .setUseDeveloperSupport(BuildConfig.DEBUG)
            .setInitialLifecycleState(LifecycleState.RESUMED)
            .build();
    // The string here (e.g. "MyReactNativeApp") has to match
    // the string in AppRegistry.registerComponent() in index.js
    mReactRootView.startReactApplication(mReactInstanceManager, "mCollect", null);

    setContentView(mReactRootView);
  }


  @Override
  public void invokeDefaultOnBackPressed() {
    super.onBackPressed();
  }
  @Override
  protected void onPause() {
    super.onPause();

    if (mReactInstanceManager != null) {
      mReactInstanceManager.onHostPause(this);
    }
  }

  @Override
  protected void onResume() {
    super.onResume();

    if (mReactInstanceManager != null) {
      mReactInstanceManager.onHostResume(this, this);
    }
  }

  @Override
  protected void onDestroy() {
    super.onDestroy();

    if (mReactInstanceManager != null) {
      mReactInstanceManager.onHostDestroy(this);
    }
    if (mReactRootView != null) {
      mReactRootView.unmountReactApplication();
    }
  }
  @Override
  public void onBackPressed() {
    if (mReactInstanceManager != null) {
      mReactInstanceManager.onBackPressed();
    } else {
      super.onBackPressed();
    }
  }

  @Override
  public boolean onKeyUp(int keyCode, KeyEvent event) {
    if (keyCode == KeyEvent.KEYCODE_MENU && mReactInstanceManager != null) {
      mReactInstanceManager.showDevOptionsDialog();
      return true;
    }
    return super.onKeyUp(keyCode, event);
  }

  @Override
  protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent intent) {
    super.onActivityResult(requestCode, resultCode, intent);
    //  Log.d("SampleAppLogs", "requestCode = " + requestCode + "resultCode = " + resultCode);
    try {
      if (intent != null && intent.hasExtra("response")) {
        //Toast.makeText(this, intent.getStringExtra("response"), Toast.LENGTH_LONG).show();
        Log.d("SampleAppLogs", intent.getStringExtra("response"));
      }

      if (intent != null){
        if (requestCode == REQUEST_CODE_SALE_TXN) {
          //  Intent sendAckIntent;
          if (resultCode == RESULT_OK) {

            Log.v("JSONRST", intent.getStringExtra("response"));
            JSONObject response = new JSONObject(intent.getStringExtra("response"));
            // JSONObject mainObject = new JSONObject(intent.getStringExtra("response"));
            response = response.getJSONObject("result");
            response = response.getJSONObject("txn");
            String strTxnId = response.getString("txnId");
            String stramount = response.getString("amount");
            String strsettlementStatus = response.getString("settlementStatus");
            // Log.v("SETTLEMENTSTATUS", settlementStatus);

            sendBackResultToProductApp(stramount,strTxnId,strsettlementStatus,"Payment success");



          } else if (resultCode == RESULT_CANCELED) {
            // JSONObject response = new JSONObject(intent.getStringExtra("response"));
            // response = response.getJSONObject("error");
            // String errorCode = response.getString("code");
            // String errorMessage = response.getString("message");
          }
        }

        if (requestCode == REQUEST_CODE_CASH_TXN) {
          Intent sendAckIntent;
          if (resultCode == RESULT_OK) {
            Log.v("JSONRST", intent.getStringExtra("response"));
            JSONObject response = new JSONObject(intent.getStringExtra("response"));
            JSONObject mainObject = new JSONObject(intent.getStringExtra("response"));
            response = response.getJSONObject("result");
            response = response.getJSONObject("txn");
            String strTxnId = response.getString("txnId");
            String stramount = response.getString("amount");
            String strsettlementStatus = response.getString("settlementStatus");
//                    Log.v("SETTLEMENTSTATUS", settlementStatus);

          sendBackResultToProductApp(stramount,strTxnId,strsettlementStatus,"Payment success");
//            if (paymentInterfacePackage.paymentInterfaceModule.paymentSuccessCallback != null) {
////              if (transactionStatus == "Payment failure" || transactionStatus == null) {
////                paymentCancelCallback.invoke("Transaction was cancelled");
////              } else if (transactionStatus == "Payment success") {
//                try {
//                  paymentInterfacePackage.paymentInterfaceModule.paymentSuccessCallback.invoke("Payment success");
//                } catch (Exception e) {
//                  paymentInterfacePackage.paymentInterfaceModule.paymentCancelCallback.invoke("No transactionStatus found");
//                }
//              }

           // }
          } else {
            System.out.println("------------------------api cashbackCallback-------4");
            JSONObject response = new JSONObject(intent.getStringExtra("response"));
            response = response.getJSONObject("error");
            // String errorCode = response.getString("code");
            // String errorMessage = response.getString("message");
            sendBackResultToProductApp(null,null,null,"Payment failure");
          }
        }
//        if (requestCode == REQUEST_CODE_GET_INCOMPLETE_TXN) {
//          JSONObject response = new JSONObject(intent.getStringExtra("response"));
//          if (resultCode == RESULT_OK) {
//            response = response.getJSONObject("result");
//          }
//          else {
//            response = response.getJSONObject("error");
//            String message = response.getString("message");
//            Toast.makeText(this,message, Toast.LENGTH_LONG).show();
//          }
//
//
//        }
      }





    } catch (Exception e) {
      e.printStackTrace();
    }

  }

  public void sendBackResultToProductApp(String amountPaid,String transactionId,String transactionStatus,
                                         String tosterMessage)
  {
//    Intent sendBackAckIntent = new Intent();
//    sendBackAckIntent.putExtra("amountPaid", amountPaid);
//    sendBackAckIntent.putExtra("transactionId", transactionId);
//    sendBackAckIntent.putExtra("transactionStatus", transactionStatus);
//    setResult(MainActivity.RESULT_OK, sendBackAckIntent);
//    Toast.makeText(this, tosterMessage, Toast.LENGTH_SHORT).show();
    EzeAPI.close(this, REQUEST_CODE_CLOSE);
//    finish();

    if (paymentInterfacePackage.paymentInterfaceModule.paymentSuccessCallback != null) {
      if (transactionStatus == "Payment failure" || transactionStatus == null) {
        paymentInterfacePackage.paymentInterfaceModule.paymentCancelCallback.invoke("Transaction was cancelled");
      } else if (tosterMessage.equalsIgnoreCase("Payment success")) {
        try {
          paymentInterfacePackage.paymentInterfaceModule.paymentSuccessCallback.invoke(transactionStatus);
        } catch (Exception e) {
          paymentInterfacePackage.paymentInterfaceModule.paymentCancelCallback.invoke("No transactionStatus found");
        }
      }

    }
  }

}
