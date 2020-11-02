package com.mcollect.printerInterface;

import android.app.Activity;
import android.content.Intent;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.json.JSONException;

public class PrinterInterfaceModule extends ReactContextBaseJavaModule implements ActivityEventListener {

    static final int SEND_PRINT_DATA = 2;
    private Callback printerSuccessCallback;
    private Callback printerCancelCallback;

    public PrinterInterfaceModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(this);
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        if (printerSuccessCallback != null) {
            if (resultCode == Activity.RESULT_CANCELED) {
                printerCancelCallback.invoke("Printing was cancelled");
            } else if (resultCode == Activity.RESULT_OK && requestCode == SEND_PRINT_DATA) {
                String uri = data.getStringExtra("printStatus");

                if (uri == null) {
                    printerCancelCallback.invoke("No Printer found");
                } else {
                    try {
                        printerSuccessCallback.invoke(uri);
                    } catch (Exception e) {
                        printerCancelCallback.invoke("No Printer found");
                    }
                }
            }
        }
    }

    @ReactMethod
    public void sendPrintData(String name, String data, Callback successCallback, Callback cancelCallback )throws JSONException {

        Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) {
            printerCancelCallback.invoke("Printer doesn't exist");
            return;
        }

        printerSuccessCallback = successCallback;
        printerCancelCallback = cancelCallback;



        try {
            Intent sendPrintIntent = new Intent(Intent.ACTION_SEND);
            sendPrintIntent.setClassName("com.example.bluetoothprinting", "com.example.bluetoothprinting.MainActivity");
            sendPrintIntent.setType("text/plain");

            sendPrintIntent.putExtra(name, data);
            currentActivity.startActivityForResult(sendPrintIntent, SEND_PRINT_DATA);
        } catch (Exception e) {
            cancelCallback.invoke(e);
        }
    }

    @Override
    public void onNewIntent(Intent intent) {

    }

    @NonNull
    @Override
    public String getName() {
        return "PrinterInterface";
    }
}
