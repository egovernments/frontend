
package org.egovernment.mseva;

import android.app.Activity;
import android.content.Context;
import android.util.Log;
import android.widget.FrameLayout;

import com.mosambee.lib.MosCallback;
import com.mosambee.lib.ResultData;
import com.mosambee.lib.TransactionResult;

import org.json.JSONException;

public class MosambeeImplementation implements TransactionResult {
	private Context context;
	MosCallback moscCallback;
	private boolean isConnected;
	private Activity _activity;
	MainActivity m;

	void init(String user, String pswd) {
		moscCallback = new MosCallback(context);
		moscCallback.initialise(user, pswd, this);
		//moscCallback.getLocation();
	}


	void startProcess(FrameLayout container,String customerMobile, String customerEmail, String transType, String invoiceDate, String orderId, String amount, Activity activity) {

//		moscCallback = new MosCallback(context);
//		moscCallback.initialise(user, pswd, this);
		moscCallback.initializeSignatureView(container, "#55004A", "#750F5A");
		moscCallback.initialiseFields("sale", customerMobile, "cGjhE$@fdhj4675riesae", false, customerEmail, "merchantRef1", "", invoiceDate, orderId);
		moscCallback.processTransaction(orderId, Double.parseDouble(amount),
				Double.parseDouble("0"), orderId,"0356");
	}
	public void stopProcess() {
		//moscCallback = new MosCallback(context);
		moscCallback.posReset();
	}
	public void setContext(Context context) {
		this.context = context;
		//m = new MainActivity();
	}

	void setActivity(MainActivity act) {
		m = act;
	}

	@Override
	public void onCommand(String command) {
		//m = new MainActivity();
		m.setCommand(command);
	}

	@Override
	public void onResult(ResultData result) {
		System.out.println();
		System.out.println("\n-----Result: "+result.getResult()+ "\n-----Reason: " + result.getReason()+"\n-----Data: "+ result.getTransactionData() );
		result.getResult();
		//m = new MainActivity();
		try {
			m.setData(result);
		} catch (JSONException e) {
			e.printStackTrace();
		}
		Log.d("Mosambee","Transaction Response:::"+result.getTransactionData());
	}
}
