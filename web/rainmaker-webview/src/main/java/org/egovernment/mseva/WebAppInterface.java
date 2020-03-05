package org.egovernment.mseva;

import android.content.Context;
import android.content.Intent;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

import java.util.HashMap;
import java.util.Map;

import android.support.v7.app.AppCompatActivity;

import org.json.JSONException;
import org.json.JSONObject;

import static org.egovernment.mseva.MainActivity.SEND_PYAMENT_INFORMATION;

//public class WebAppInterface extends AppCompatActivity {
//	Context mContext;
//	HashMap<String, JSONObject> mObjectsFromJS = new HashMap<String, JSONObject>();
//
//	/**
//	 * Instantiate the interface and set the context
//	 */
//	WebAppInterface(Context c) {
//		mContext = c;
//	}
//
//	/**
//	 * Show a toast from the web page
//	 */
//	@JavascriptInterface
//	public void sendPaymentData(String name, String json) throws JSONException {
//		mObjectsFromJS.put(name, new JSONObject(json));
//		Toast.makeText(mContext, json, Toast.LENGTH_SHORT).show();
////		call call back function with paymentDataMap
//		Intent sendPaymentIntent = new Intent(Intent.ACTION_SEND);
//		sendPaymentIntent.setClassName("com.example.pospocapp", "com.example.pospocapp.MainActivity");
//		//it should be come from web applicaiton
//		sendPaymentIntent.putExtra("instrumentType", "CASH");
//		sendPaymentIntent.putExtra("paymentAmount", "CASH");
//		sendPaymentIntent.putExtra("customerName", "Murali M");
//		sendPaymentIntent.putExtra("customerMobile", "6360807028");
//		sendPaymentIntent.putExtra("message", "Payment details");
//		sendPaymentIntent.putExtra("emailId", "murali.m@goodworklabs.com");
//		sendPaymentIntent.putExtra("billNumber", "12123");
//		sendPaymentIntent.putExtra("consumerCode", "12132");
//		sendPaymentIntent.putExtra("businessService", "PT");
//		sendPaymentIntent.putExtra("collectorName", "Murali");
//		sendPaymentIntent.putExtra("collectorId", "12132");
//		sendPaymentIntent.putExtra("instrumentDate", "12123123123");
//		sendPaymentIntent.putExtra("instrumentNumber", "12132");
//		startActivityForResult(sendPaymentIntent, 2);
//	}
//
//}
