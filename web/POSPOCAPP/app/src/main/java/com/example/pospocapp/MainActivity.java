package com.example.pospocapp;

import android.app.Activity;
import android.net.Uri;
import android.os.Bundle;

import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.snackbar.Snackbar;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;
import android.content.Intent;


public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        // Get the intent that started this activity
        Intent intent = getIntent();
        String action = intent.getAction();
        String type = intent.getType();

        // Figure out what to do based on the intent type
      if (Intent.ACTION_SEND.equals(action) && type != null) {
          if ("text/plain".equals(type))
          {
//               Handle intents with text ...
            String instructionType= intent.getStringExtra("instructionType");
            String paymentAmount=intent.getStringExtra("paymentAmount");
            String customerName=intent.getStringExtra("customerName");
            String customerMobile=intent.getStringExtra("customerMobile");
            String message=intent.getStringExtra("message");
            String emailId=intent.getStringExtra("emailId");
            String billNumber=intent.getStringExtra("billNumber");
            String consumerCode=intent.getStringExtra("consumerCode");
            String businessService=intent.getStringExtra("businessService");
            String collectorName=intent.getStringExtra("collectorName");
            String collectorId=intent.getStringExtra("collectorId");
            String instrumentDate=intent.getStringExtra("instrumentDate");
            String instrumentNumber=intent.getStringExtra("instrumentNumber");
//            TextView text=(TextView) findViewById(R.id.textView);
//            text.setText(instructionType);
            Toast.makeText(getBaseContext(), instructionType , Toast.LENGTH_SHORT ).show();
          }

        }
//        Button print = (Button) findViewById(R.id.print);
//        print.setOnClickListener(new View.OnClickListener() {
//            public void onClick(View v)  {
//                Toast.makeText(getBaseContext(), "Printing!" , Toast.LENGTH_SHORT ).show();
//                //connect to printer driver for print
//            }
//        });

        Button success = (Button) findViewById(R.id.success);
        success.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v)  {
                Toast.makeText(getBaseContext(), "Success!" , Toast.LENGTH_SHORT ).show();
                Intent sendAckIntent = new Intent(Intent.ACTION_SEND);
                sendAckIntent.setClassName("org.egovernment.mseva.RESULT_ACTION", "org.egovernment.mseva.MainActivity");
                //it should be come from web applicaiton
                sendAckIntent.putExtra("amountPaid","100");
                sendAckIntent.putExtra("transactionId","2000");
                sendAckIntent.putExtra("transactionStatus","COMPLETE");
                setResult(Activity.RESULT_OK, sendAckIntent);
                finish();
            }
        });


        Button failure = (Button) findViewById(R.id.failure);
        failure.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v)  {
                Toast.makeText(getBaseContext(), "Failure!" , Toast.LENGTH_SHORT ).show();
                Intent sendAckIntent = new Intent(Intent.ACTION_SEND);
                sendAckIntent.setClassName("org.egovernment.mseva.RESULT_ACTION", "org.egovernment.mseva.MainActivity");
                //it should be come from web applicaiton
                sendAckIntent.putExtra("amountPaid","100");
                sendAckIntent.putExtra("transactionId","2000");
                sendAckIntent.putExtra("transactionStatus","FAILED");
                setResult(Activity.RESULT_OK, sendAckIntent);
                finish();
            }
        });
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
}
