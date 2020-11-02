package com.mcollect.paymentInterface;

import android.app.Activity;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.mcollect.MainActivity;


import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class PaymentInterfacePackage implements ReactPackage {

   // private MainActivity mainActivity;
    public PaymentInterfaceModule paymentInterfaceModule ;

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        paymentInterfaceModule = new PaymentInterfaceModule(reactContext);
        List<NativeModule> modules = new ArrayList<>();

        modules.add(new PaymentInterfaceModule(reactContext));

        return modules;
    }

    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }


//
//    // Constructor
//    public PaymentInterfacePackage(MainActivity activity) {
//
//        // Save instance of main class for future use
//        mainActivity = activity;
//
//    }
}
