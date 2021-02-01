package org.egovernment.mseva;

/*
* Giving right credit to developers encourages them to create better projects, just want you to know that :)
*/

import android.Manifest;
import android.annotation.SuppressLint;
import android.annotation.TargetApi;
import android.app.Activity;
import android.app.ActivityManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.content.res.Configuration;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.os.Handler;
import android.provider.MediaStore;
import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.appcompat.app.AppCompatActivity;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewTreeObserver;
import android.view.WindowManager;
import android.webkit.CookieManager;
import android.webkit.GeolocationPermissions;
import android.webkit.URLUtil;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;
import java.io.File;
import java.io.IOException;
import java.math.BigInteger;
import java.net.URISyntaxException;
import java.security.SecureRandom;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import android.app.AlertDialog;
import android.webkit.DownloadListener;
import android.app.DownloadManager;
//import android.os.AsyncTask;
//import java.net.HttpURLConnection;
//import java.net.URL;
//import java.util.regex.Matcher;
//import java.util.regex.Pattern;
//import java.io.FileOutputStream;
//import java.io.BufferedInputStream;
//import java.io.InputStream;
//import java.io.OutputStream;

import org.egovernment.mseva.BuildConfig;
import org.egovernment.mseva.R;


import static android.webkit.CookieManager.*;


public class MainActivity extends AppCompatActivity implements  ViewTreeObserver.OnScrollChangedListener{


	final private int REQUEST_CODE_ASK_MULTIPLE_PERMISSIONS = 124;
	private static String URL   =BuildConfig.url;
	private String FILE_TYPE    = "image/*";  //to upload any file type using "*/*"; check file type references for more
	public static String HOST	= getHost(URL);
	public static String PAYMENTURL	= getHost("https://pilot.surepay.ndml.in");
	public static String PAYMENTURL_2	= getHost("https://api.razorpay.com/");

	//Careful with these variable names if altering
    private WebView webView;
	//private SwipeRefreshLayout mSwipeRefreshLayout;
	private ViewTreeObserver.OnScrollChangedListener mOnScrollChangedListener;

    private String asw_cam_message;
    private ValueCallback<Uri> asw_file_message;
    private ValueCallback<Uri[]> asw_file_path;


    // permissions code
	private final static int MY_PERMISSIONS_REQUEST_LOCATION = 21;
    private final static int asw_file_req = 1;
	private final static int REQUEST_FILE_PERMISSIONS = 2;
	private final static int loc_perm = 3;
	private final static int sms_receive_perm = 4;



	private SecureRandom random = new SecureRandom();


	private GeolocationPermissions.Callback mGeoLocationCallback = null;
	private String mGeoLocationRequestOrigin = null;

	private AppJavaScriptProxy proxy = null;


	private static final String TAG = MainActivity.class.getSimpleName();

//	private static int RETRIES_MAX_NUMBER = 3; //nr of retries
//	private static int alreadyRetried;
//	private static boolean isEntered = false;
	private DownloadManager downloadManager = null;
	private long lastDownload=-1L;




	@Override
    protected void onActivityResult(int requestCode, int resultCode, Intent intent) {
        super.onActivityResult(requestCode, resultCode, intent);
        if (Build.VERSION.SDK_INT >= 21) {
            getWindow().addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            getWindow().setStatusBarColor(getResources().getColor(R.color.colorPrimary));
            Uri[] results = null;
            if (resultCode == Activity.RESULT_OK) {
                if (requestCode == asw_file_req) {
                    if (null == asw_file_path) {
                        return;
                    }
                    if (intent == null || intent.getFlags() == 0) {
                        if (asw_cam_message != null) {
                            results = new Uri[]{Uri.parse(asw_cam_message)};
                        }
                    } else {
                        String dataString = intent.getDataString();
                        if (dataString != null) {
                            results = new Uri[]{ Uri.parse(dataString) };
                        }
                    }
                }
            }
            asw_file_path.onReceiveValue(results);
            asw_file_path = null;
        } else {
            if (requestCode == asw_file_req) {
                if (null == asw_file_message) return;
                Uri result = intent == null || resultCode != RESULT_OK ? null : intent.getData();
                asw_file_message.onReceiveValue(result);
                asw_file_message = null;
            }
        }
    }

	@SuppressLint({"SetJavaScriptEnabled", "WrongViewCast"})
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        if (proxy == null) {
        	proxy = new AppJavaScriptProxy(this);
		}

		if (Build.VERSION.SDK_INT >= 23) {
			// Marshmallow+ Permission APIs
			handleMarshMellow();
		}

		if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
			if (0 != (getApplicationInfo().flags & ApplicationInfo.FLAG_DEBUGGABLE)) {
				WebView.setWebContentsDebuggingEnabled(true);
			}
		}

        //Move this to Javascript Proxy

		webView = (WebView) findViewById(R.id.webview);
		webView.addJavascriptInterface(proxy, "mSewaApp");


	//	mSwipeRefreshLayout = (SwipeRefreshLayout) findViewById(R.id.swipeToRefresh);


		String versionName = "";
		int versionCode = 0;
		try {
			versionName = getBaseContext().getPackageManager().getPackageInfo(getBaseContext().getPackageName(), 0 ).versionName;
			versionCode = getBaseContext().getPackageManager().getPackageInfo(getBaseContext().getPackageName(), 0 ).versionCode;
		} catch (PackageManager.NameNotFoundException e) {

		} finally {

		}

		WebSettings webSettings = webView.getSettings();

		webSettings.setUserAgentString(webSettings.getUserAgentString() + " eChhawani V." + versionName + "." + versionCode);
		webSettings.setJavaScriptEnabled(true);
		webSettings.setGeolocationEnabled(true);
		webSettings.setAllowFileAccess(true);
		webSettings.setAllowFileAccessFromFileURLs(true);
		webSettings.setAllowUniversalAccessFromFileURLs(true);
		webSettings.setUseWideViewPort(true);
		webSettings.setDomStorageEnabled(true);
		webSettings.setLayoutAlgorithm(WebSettings.LayoutAlgorithm.NARROW_COLUMNS);

		//improve performance
		webSettings.setLoadWithOverviewMode(true);
		webSettings.setCacheMode(WebSettings.LOAD_CACHE_ELSE_NETWORK);
		webSettings.setAppCachePath(this.getCacheDir().getAbsolutePath());
		webSettings.setDatabaseEnabled(true);
	//	webView.addJavascriptInterface(new WebAppInterface(this), "Android");
		webView.setScrollBarStyle(WebView.SCROLLBARS_OUTSIDE_OVERLAY);
		webView.setScrollbarFadingEnabled(true);

        if (Build.VERSION.SDK_INT >= 21) {
            getWindow().addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            getWindow().setStatusBarColor(getResources().getColor(R.color.colorPrimaryDark));
            webView.setLayerType(View.LAYER_TYPE_HARDWARE, null);
            webSettings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
			CookieManager cookieManager = getInstance();
			cookieManager.setAcceptThirdPartyCookies(webView, true);
        } else if (Build.VERSION.SDK_INT >= 19) {
            webView.setLayerType(View.LAYER_TYPE_HARDWARE, null);
        }
        else {
			webView.setLayerType(View.LAYER_TYPE_SOFTWARE, null);
		}
        webView.setVerticalScrollBarEnabled(false);
        webView.setWebViewClient(new CustomWebView());
		webView.getSettings().setGeolocationDatabasePath(getFilesDir().getPath());
		if (BuildConfig.DEBUG) {
			webView.setWebContentsDebuggingEnabled(true);
		}

		webView.setDownloadListener(new DownloadListener() {
			@Override
			public void onDownloadStart(String url, String userAgent, String contentDisposition, String mimeType, long contentLength) {
					if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
						if (checkSelfPermission(android.Manifest.permission.WRITE_EXTERNAL_STORAGE)
							== PackageManager.PERMISSION_GRANTED) {
							Log.v(TAG,"Permission is granted");
							lastDownload = downloadDialog(url,userAgent,contentDisposition,mimeType);


							if (lastDownload != 0) {
								Toast.makeText(getApplicationContext(), "Downloading File", Toast.LENGTH_LONG).show();
							}else {
								Toast.makeText(getApplicationContext(), "File is not available for download", Toast.LENGTH_LONG).show();
							}
						} else {

							Log.v(TAG,"Permission is revoked");
							//requesting permissions.
							ActivityCompat.requestPermissions(MainActivity.this, new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE}, 1);

						}
					}
					else {
						//Code for devices below API 23 or Marshmallow
						Log.v(TAG,"Permission is granted");
						lastDownload = downloadDialog(url,userAgent,contentDisposition,mimeType);
						if (lastDownload != 0) {
							Toast.makeText(getApplicationContext(), "Downloading File", Toast.LENGTH_LONG).show();
						}else {
							Toast.makeText(getApplicationContext(), "File is not available for download", Toast.LENGTH_LONG).show();
						}
					}
				}
		});


		/*webView.setDownloadListener(new DownloadListener() {
			public void onDownloadStart(String url, String userAgent,
										String contentDisposition, String mimetype,
										long contentLength) {

				//Checking runtime permission for devices above Marshmallow.

				if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
					if (checkSelfPermission(android.Manifest.permission.WRITE_EXTERNAL_STORAGE)
						== PackageManager.PERMISSION_GRANTED) {
						Log.v(TAG,"Permission is granted");
						downloadDialog(url,userAgent,contentDisposition,mimetype);
					} else {

						Log.v(TAG,"Permission is revoked");
						//requesting permissions.
						ActivityCompat.requestPermissions(MainActivity.this, new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE}, 1);

					}
				}
				else {
					//Code for devices below API 23 or Marshmallow
					Log.v(TAG,"Permission is granted");
					downloadDialog(url,userAgent,contentDisposition,mimetype);
				}
			}
		});
*/
        //Rendering the default URL
        loadView(URL,false);

        webView.setWebChromeClient(new WebChromeClient() {
            // handling geolocation

			@Override
			public void onGeolocationPermissionsShowPrompt(final String origin, final GeolocationPermissions.Callback callback) {

				if(!check_permission(1)){

					if(ActivityCompat.shouldShowRequestPermissionRationale(MainActivity.this,Manifest.permission.ACCESS_FINE_LOCATION)){
						String message  = "Allow Rainmaker to access location details?";
						showMessageOKCancel(message,
								new DialogInterface.OnClickListener() {

									@Override
									public void onClick(DialogInterface dialog, int which) {
										mGeoLocationCallback = callback;
										mGeoLocationRequestOrigin = origin;
										ActivityCompat.requestPermissions(MainActivity.this, new  String[]{Manifest.permission.ACCESS_FINE_LOCATION},MY_PERMISSIONS_REQUEST_LOCATION);
									}
								});
					}
					// code is duplication; to be changed!
					else{
						mGeoLocationCallback = callback;
						mGeoLocationRequestOrigin = origin;
						ActivityCompat.requestPermissions(MainActivity.this, new  String[]{Manifest.permission.ACCESS_FINE_LOCATION},MY_PERMISSIONS_REQUEST_LOCATION);
					}
				}
				else{
					callback.invoke(origin, true, false);
				}
			}

			//Handling input[type="file"] requests for android API 16+
            public void openFileChooser(ValueCallback<Uri> uploadMsg, String acceptType, String capture){
		  			asw_file_message = uploadMsg;
                    Intent i = new Intent(Intent.ACTION_GET_CONTENT);
                    i.addCategory(Intent.CATEGORY_OPENABLE);
                    i.setType(FILE_TYPE);
                    startActivityForResult(Intent.createChooser(i, "File Chooser"), asw_file_req);

            }
            //Handling input[type="file"] requests for android API 21+
            public boolean onShowFileChooser(WebView webView, ValueCallback<Uri[]> filePathCallback,WebChromeClient.FileChooserParams fileChooserParams){

				if (asw_file_path != null) {
					asw_file_path.onReceiveValue(null);
				}
				asw_file_path = filePathCallback;


				String[] perms = {Manifest.permission.WRITE_EXTERNAL_STORAGE, Manifest.permission.CAMERA};

				if (!check_permission(2) || !check_permission(3)) {
					ActivityCompat.requestPermissions(MainActivity.this, perms, REQUEST_FILE_PERMISSIONS);
				}
				else{
					showFileDialog();
				}
				return true;
            }


        });
        if (getIntent().getData() != null) {
            String path     = getIntent().getDataString();
            /*
            If you want to check or use specific directories or schemes or hosts

            Uri data        = getIntent().getData();
            String scheme   = data.getScheme();
            String host     = data.getHost();
            List<String> pr = data.getPathSegments();
            String param1   = pr.get(0);
            */
            loadView(path,false);
        }

//		mSwipeRefreshLayout.setOnRefreshListener(new SwipeRefreshLayout.OnRefreshListener() {
//			@Override
//			public void onRefresh() {
////				webView.loadUrl( "javascript:window.location.reload( true )" );
//				mSwipeRefreshLayout.setRefreshing(false);
//				webView.reload();
//				if (null != mSwipeRefreshLayout) {
//					mSwipeRefreshLayout.setRefreshing(false);
//				}
//			}
//		});
//

		downloadManager = (DownloadManager) getSystemService(Context.DOWNLOAD_SERVICE);
//        registerReceiver(receiver,new IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE));
//
//		PRDownloaderConfig config = PRDownloaderConfig.newBuilder()
//				.setReadTimeout(30_000)
//				.setConnectTimeout(30_000)
//				.build();
//		PRDownloader.initialize(getApplicationContext(),config);

	}


//	private BroadcastReceiver receiver = new BroadcastReceiver() {
//		@Override
//		public void onReceive(Context context, Intent intent) {
//
//			String action = intent.getAction();
//
//			if (DownloadManager.ACTION_DOWNLOAD_COMPLETE.equals(action)) {
//
//
//				DownloadManager.Query ImageDownloadQuery = new DownloadManager.Query();
//				//set the query filter to our previously Enqueued download
//				ImageDownloadQuery.setFilterById(lastDownload);
//
//				//Query the download manager about downloads that have been requested.
//				Cursor cursor = downloadManager.query(ImageDownloadQuery);
//
//				if (cursor.moveToFirst()) {
//
//					Toast.makeText(MainActivity.this, DownloadStatus(cursor), Toast.LENGTH_SHORT).show();
//				}
//
//
//			}
//
//		}
//	};


	public long downloadDialog(final String url,final String userAgent,String contentDisposition,String mimeType)
	{
		long downloadReference = 0;
//		if(url.startsWith("blob") == true) {
//		url_actions(webView,url);
//
//
			startActivity(Intent.makeMainSelectorActivity(
					Intent.ACTION_MAIN, Intent.CATEGORY_APP_BROWSER)
					.setData(Uri.parse(url)));
			downloadReference=1;
//		}
//		else{

//			try {
//				DownloadManager.Request request = new DownloadManager.Request(
//						Uri.parse(url));
//				request.setMimeType(mimeType);
//				String cookies = CookieManager.getInstance().getCookie(url);
//				request.addRequestHeader("cookie", cookies);
//				request.addRequestHeader("User-Agent", userAgent);
//				request.setDescription("Downloading File...");
//				request.setTitle(URLUtil.guessFileName(url, contentDisposition, mimeType));
//				request.allowScanningByMediaScanner();
//				request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
//				request.setDestinationInExternalPublicDir(
//						Environment.DIRECTORY_DOWNLOADS, URLUtil.guessFileName(
//								url, contentDisposition, mimeType));
//				//downloadManager = (DownloadManager) getSystemService(DOWNLOAD_SERVICE);
//				lastDownload = downloadManager.enqueue(request);
//
//				//manageDownloadProcess(url, Environment.DIRECTORY_DOWNLOADS,  URLUtil.guessFileName(
//				//		url, contentDisposition, mimeType), lastDownload,userAgent,contentDisposition,mimeType);
//				Toast.makeText(getApplicationContext(), "Downloading File", Toast.LENGTH_LONG).show();

//				String filename =  URLUtil.guessFileName(url, contentDisposition, mimeType);
//				Toast.makeText(getApplicationContext(), filename, Toast.LENGTH_SHORT).show();
//
//				int downloadId = PRDownloader.download(url,  Environment.DIRECTORY_DOWNLOADS, filename)
//						.build()
//						.setOnStartOrResumeListener(new OnStartOrResumeListener() {
//							@Override
//							public void onStartOrResume() {
//
//							}
//						})
//
//						.start(new OnDownloadListener() {
//							@Override
//							public void onDownloadComplete() {
//								Toast.makeText(getApplicationContext(), "Downloaded Completed", Toast.LENGTH_LONG).show();
//
//							}
//
//							@Override
//							public void onError(Error error) {
//								Toast.makeText(getApplicationContext(), "Download Failed", Toast.LENGTH_SHORT).show();
//
//							}
//
//						});
//					Toast.makeText(getApplicationContext(), "DID:"+downloadId, Toast.LENGTH_LONG).show();

//
//						}catch(Exception e ){
//				Log.d("DownloadManager","Failed");
//				Toast.makeText(getApplicationContext(), "Downloading Failed", Toast.LENGTH_SHORT).show();
//			}
	//	}
		return lastDownload;


	}


//	private void manageDownloadProcess(final  String urlLink, final  String pathUri, final String fileName, final  long downloadReference,final String userAgent,final String contentDisposition,final String mimeType) {
//		DownloadManager.Query query = new DownloadManager.Query();
//		query.setFilterByStatus(DownloadManager.STATUS_PENDING | DownloadManager.STATUS_SUCCESSFUL | DownloadManager.STATUS_PAUSED | DownloadManager.STATUS_RUNNING | DownloadManager.STATUS_FAILED);
//
//		final Cursor cursor = downloadManager.query(query.setFilterById(downloadReference));
//		final Handler handler = new Handler();
//		handler.postDelayed(new Runnable() {
//			@Override
//			public void run() {
//				if (cursor.moveToFirst()) {
//					Toast.makeText(getApplicationContext(),DownloadStatus(cursor),Toast.LENGTH_SHORT).show();
//
//					Log.d(getClass().getName(), "COLUMN_ID: "+
//							cursor.getLong(cursor.getColumnIndex(DownloadManager.COLUMN_ID)));
//					Toast.makeText(getApplicationContext(),"COLUMN_ID: "+
//							cursor.getLong(cursor.getColumnIndex(DownloadManager.COLUMN_ID)), Toast.LENGTH_LONG).show();
//					Log.d(getClass().getName(), "COLUMN_BYTES_DOWNLOADED_SO_FAR: "+
//							cursor.getLong(cursor.getColumnIndex(DownloadManager.COLUMN_BYTES_DOWNLOADED_SO_FAR)));
//					Toast.makeText(getApplicationContext(),"COLUMN_BYTES_DOWNLOADED_SO_FAR: "+
//							cursor.getLong(cursor.getColumnIndex(DownloadManager.COLUMN_BYTES_DOWNLOADED_SO_FAR)), Toast.LENGTH_LONG).show();
//					Log.d(getClass().getName(), "COLUMN_LAST_MODIFIED_TIMESTAMP: "+
//							cursor.getLong(cursor.getColumnIndex(DownloadManager.COLUMN_LAST_MODIFIED_TIMESTAMP)));
//					Toast.makeText(getApplicationContext(),"COLUMN_LAST_MODIFIED_TIMESTAMP: "+
//							cursor.getLong(cursor.getColumnIndex(DownloadManager.COLUMN_LAST_MODIFIED_TIMESTAMP)), Toast.LENGTH_LONG).show();
//					Log.d(getClass().getName(), "COLUMN_LOCAL_URI: "+
//							cursor.getString(cursor.getColumnIndex(DownloadManager.COLUMN_LOCAL_URI)));
//					Toast.makeText(getApplicationContext(),"COLUMN_LOCAL_URI: "+
//							cursor.getString(cursor.getColumnIndex(DownloadManager.COLUMN_LOCAL_URI)), Toast.LENGTH_LONG).show();
//					Log.d(getClass().getName(), "COLUMN_STATUS: "+
//							cursor.getInt(cursor.getColumnIndex(DownloadManager.COLUMN_STATUS)));
//					Toast.makeText(getApplicationContext(),"COLUMN_STATUS: "+
//							cursor.getInt(cursor.getColumnIndex(DownloadManager.COLUMN_STATUS)), Toast.LENGTH_LONG).show();
//					Log.d(getClass().getName(), "COLUMN_REASON: "+
//							cursor.getInt(cursor.getColumnIndex(DownloadManager.COLUMN_REASON)));
//					Toast.makeText(getApplicationContext(),"COLUMN_REASON: "+
//							cursor.getInt(cursor.getColumnIndex(DownloadManager.COLUMN_REASON)), Toast.LENGTH_LONG).show();
//
//					Toast.makeText(getApplicationContext(), statusMessage(cursor), Toast.LENGTH_LONG).show();
//					switch (status) {
//
//						/*I introdused 'isEntered' param to eliminate first response from this method
//						 * I don't know why but I get STATUS_PENDING always on first run, so this is an ugly workaround*/
//						case DownloadManager.STATUS_PENDING: {
//							Log.d("status", "STATUS_PENDING - timeout");
//							Toast.makeText(getApplicationContext(), "STATUS_PENDING - timeout", Toast.LENGTH_SHORT).show();
//							if (isEntered) {
//								if (alreadyRetried < RETRIES_MAX_NUMBER) {
//									alreadyRetried++;
//									downloadManager.remove(downloadReference);
//								//	downloadFile(urlLink, pathUri, fileName);
//									long downloadRef = downloadDialog(urlLink,userAgent,contentDisposition, mimeType);
//									manageDownloadProcess(urlLink, pathUri, fileName, downloadRef,userAgent,contentDisposition, mimeType);
//
//								}
//							} else {
//								isEntered = true;
//								manageDownloadProcess(urlLink, pathUri, fileName, downloadReference,userAgent,contentDisposition, mimeType);
//							}
//							break;
//						}
//
//						case DownloadManager.STATUS_PAUSED: {
//							Log.d("status", "STATUS_PAUSED - error");
//							Toast.makeText(getApplicationContext(), "STATUS_PAUSED - error", Toast.LENGTH_SHORT).show();
//
//							if (alreadyRetried < RETRIES_MAX_NUMBER) {
//								alreadyRetried++;
//								downloadManager.remove(downloadReference);
//								long downloadRef = downloadDialog(urlLink,userAgent,contentDisposition, mimeType);
//							}
//							break;
//						}
//
//						case DownloadManager.STATUS_RUNNING: {
//							Log.d("status", "STATUS_RUNNING - good");
//							Toast.makeText(getApplicationContext(), "STATUS_RUNNING - good", Toast.LENGTH_SHORT).show();
//							manageDownloadProcess(urlLink, pathUri, fileName, downloadReference,userAgent,contentDisposition, mimeType);
//							break;
//						}
//
//						case DownloadManager.STATUS_SUCCESSFUL: {
//							alreadyRetried =0;
//							Log.d("status", "STATUS_SUCCESSFUL - done");
//							Toast.makeText(getApplicationContext(), "STATUS_SUCCESSFUL - done", Toast.LENGTH_SHORT).show();
//							break;
//						}
//
//						case DownloadManager.STATUS_FAILED: {
//							Log.d("status", "STATUS_FAILED - error");
//							Toast.makeText(getApplicationContext(), "STATUS_FAILED - error", Toast.LENGTH_SHORT).show();
//							if (alreadyRetried < RETRIES_MAX_NUMBER) {
//								alreadyRetried++;
//								downloadManager.remove(downloadReference);
//								long downloadRef = downloadDialog(urlLink,userAgent,contentDisposition, mimeType);
//							}
//							break;
//						}
//					}
//				}
//			}
//		}, 5000);//do this after 5 sec
//	}

//	private String DownloadStatus(Cursor cursor){
//
//		//column for download  status
//		int columnIndex = cursor.getColumnIndex(DownloadManager.COLUMN_STATUS);
//		int status = cursor.getInt(columnIndex);
//		//column for reason code if the download failed or paused
//		int columnReason = cursor.getColumnIndex(DownloadManager.COLUMN_REASON);
//		int reason = cursor.getInt(columnReason);
//
//
//
//		String statusText = "";
//		String reasonText = "";
//
//		switch(status){
//			case DownloadManager.STATUS_FAILED:
//				statusText = "STATUS_FAILED";
//				switch(reason){
//					case DownloadManager.ERROR_CANNOT_RESUME:
//						reasonText = "ERROR_CANNOT_RESUME";
//						break;
//					case DownloadManager.ERROR_DEVICE_NOT_FOUND:
//						reasonText = "ERROR_DEVICE_NOT_FOUND";
//						break;
//					case DownloadManager.ERROR_FILE_ALREADY_EXISTS:
//						reasonText = "ERROR_FILE_ALREADY_EXISTS";
//						break;
//					case DownloadManager.ERROR_FILE_ERROR:
//						reasonText = "ERROR_FILE_ERROR";
//						break;
//					case DownloadManager.ERROR_HTTP_DATA_ERROR:
//						reasonText = "ERROR_HTTP_DATA_ERROR";
//						break;
//					case DownloadManager.ERROR_INSUFFICIENT_SPACE:
//						reasonText = "ERROR_INSUFFICIENT_SPACE";
//						break;
//					case DownloadManager.ERROR_TOO_MANY_REDIRECTS:
//						reasonText = "ERROR_TOO_MANY_REDIRECTS";
//						break;
//					case DownloadManager.ERROR_UNHANDLED_HTTP_CODE:
//						reasonText = "ERROR_UNHANDLED_HTTP_CODE";
//						break;
//					case DownloadManager.ERROR_UNKNOWN:
//						reasonText = "ERROR_UNKNOWN";
//						break;
//				}
//				break;
//			case DownloadManager.STATUS_PAUSED:
//				statusText = "STATUS_PAUSED";
//				switch(reason){
//					case DownloadManager.PAUSED_QUEUED_FOR_WIFI:
//						reasonText = "PAUSED_QUEUED_FOR_WIFI";
//						break;
//					case DownloadManager.PAUSED_UNKNOWN:
//						reasonText = "PAUSED_UNKNOWN";
//						break;
//					case DownloadManager.PAUSED_WAITING_FOR_NETWORK:
//						reasonText = "PAUSED_WAITING_FOR_NETWORK";
//						break;
//					case DownloadManager.PAUSED_WAITING_TO_RETRY:
//						reasonText = "PAUSED_WAITING_TO_RETRY";
//						break;
//				}
//				break;
//			case DownloadManager.STATUS_PENDING:
//				statusText = "STATUS_PENDING";
//				break;
//			case DownloadManager.STATUS_SUCCESSFUL:
//				statusText = "Image Saved Successfully";
//				//reasonText = "Filename:\n" + filename;
//				Toast.makeText(MainActivity.this, "Download Status:" + "\n" + statusText + "\n" + reasonText, Toast.LENGTH_SHORT).show();
//				break;
//		}
//
//		return statusText + reasonText;
//
//
//	}

	@Override
    public void onResume() {
        super.onResume();
        //Coloring the "recent apps" tab header; doing it onResume, as an insurance
        if (Build.VERSION.SDK_INT >= 23) {
            Bitmap bm = BitmapFactory.decodeResource(getResources(), R.mipmap.ic_launcher);
            ActivityManager.TaskDescription taskDesc = null;
            taskDesc = new ActivityManager.TaskDescription(getString(R.string.app_name), bm, getColor(R.color.colorPrimary));
            MainActivity.this.setTaskDescription(taskDesc);
        }


	}

	@Override
	public void onScrollChanged() {
//		if (webView.getScrollY() == 0) {
//			mSwipeRefreshLayout.setEnabled(true);
//		} else {
//			mSwipeRefreshLayout.setEnabled(false);
//		}

	}

	//Setting activity layout visibility
	private class CustomWebView extends WebViewClient {
        public void onPageStarted(WebView view, String url, Bitmap favicon) {

        }

        public void onPageFinished(WebView view, String url) {
			loadView("javascript:window.localStorage.setItem('Citizen.isMobileApp',true)",false);

        }
        //For android below API 23
		@SuppressWarnings("deprecation")
		@Override
        public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
            Toast.makeText(getApplicationContext(), description, Toast.LENGTH_SHORT).show();
//			loadView("file:///android_asset/error.html", false);
		}

        @Override
        public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
			if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
				Toast.makeText(getApplicationContext(), error.getDescription(), Toast.LENGTH_SHORT).show();
			}
//			loadView("file:///android_asset/error.html", false);
		}

		//Overriding org.egovernment.org.egovernment.org.egovernment.rainmaker URLs
		@SuppressWarnings("deprecation")
		@Override
		public boolean shouldOverrideUrlLoading(WebView view, String url) {
			return url_actions(view, url);
		}


		//Overriding org.egovernment.org.egovernment.org.egovernment.rainmaker URLs for API 23+ [suggested by github.com/JakePou]
		@TargetApi(Build.VERSION_CODES.N)
		@Override
		public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
//			startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(request.toString())));
			return url_actions(view, request.getUrl().toString());
//			return true;
        }


    }

	//Actions based on shouldOverrideUrlLoading
	public boolean url_actions(WebView view, String url){
		boolean returnValue = true;
		//Show toast error if not connected to the network
		if (!DetectConnection.isInternetAvailable(MainActivity.this)) {
			Toast.makeText(getApplicationContext(), "Please check your Network Connection!", Toast.LENGTH_SHORT).show();
			//Use this in a hyperlink to redirect back to default URL :: href="refresh:android"
		} else if (url.startsWith("refresh:")) {
			loadView(URL, false);
	//Use this in a hyperlink to launch default phone dialer for specific number :: href="tel:+919876543210"
		} else if (url.startsWith("tel:")) {
			Intent intent = new Intent(Intent.ACTION_DIAL, Uri.parse(url));
			startActivity(intent);

			//Use this to open your apps page on google play store app :: href="rate:android"
		} else if (url.startsWith("share:")) {
			Intent intent = new Intent(Intent.ACTION_SEND);
			intent.setType("text/plain");
			intent.putExtra(Intent.EXTRA_SUBJECT, view.getTitle());
			intent.putExtra(Intent.EXTRA_TEXT, view.getTitle()+"\nVisit: "+(Uri.parse(url).toString()).replace("share:",""));
			startActivity(Intent.createChooser(intent, "Share with your Friends"));

			//Use this in a hyperlink to exit your app :: href="exit:android"
		} else if (url.startsWith("exit:")) {
			Intent intent = new Intent(Intent.ACTION_MAIN);
			intent.addCategory(Intent.CATEGORY_HOME);
			intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
			startActivity(intent);

			//Use to do download support
		}
//		else if (url.contains("98jf4")) {
//			loadView(url, true);
//			//Opening external URLs in android default web browser
//		}
		else if (!getHost(url).equals(HOST)
		&& !getHost(url).equals(PAYMENTURL)
		&& !getHost(url).equals(PAYMENTURL_2)) {
			try {
				Intent intent = Intent.parseUri(url, Intent.URI_INTENT_SCHEME);

				String fallbackUrl = intent.getStringExtra("browser_fallback_url");
				if (fallbackUrl != null) {
					loadView(fallbackUrl,false);
					return true;
				}else {
					startActivity(intent);
				}}

			catch (URISyntaxException e) {
				//not an intent uri
				loadView(url,false);
			}

		} else {
			returnValue  = false;
		}
		return returnValue;
	}


	//Getting host name; move these to utils later
	private static String getHost(String url){
		if (url == null || url.length() == 0) {
			return "";
		}
		int dslash = url.indexOf("//");
		if (dslash == -1) {
			dslash = 0;
		} else {
			dslash += 2;
		}
		int end = url.indexOf('/', dslash);
		end = end >= 0 ? end : url.length();
		int port = url.indexOf(':', dslash);
		end = (port > 0 && port < end) ? port : end;
		Log.w("URL Host: ",url.substring(dslash, end));
		return url.substring(dslash, end);
	}


	//Random ID creation function to help get fresh cache every-time webview reloaded
	private String random_id() {
		return new BigInteger(130, random).toString(32);
	}



	//Opening URLs inside webview with request
	void loadView(String url, Boolean tab) {
		if (tab) {
			Intent intent = new Intent(Intent.ACTION_VIEW);
			intent.setData(Uri.parse(url));
			startActivity(intent);
		} else {
			webView.loadUrl(url);
		}
	}


	//Checking if particular permission is given or not
	public boolean check_permission(int permission){
		switch(permission){
			case 1:
				return ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED;

			case 2:
				return ContextCompat.checkSelfPermission(this, Manifest.permission.WRITE_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED;

			case 3:
				return ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED;

			case 4:
				return ContextCompat.checkSelfPermission(this, Manifest.permission.READ_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED;

		}
		return false;
	}

	private void showFileDialog(){
		Intent contentSelectionIntent = new Intent(Intent.ACTION_GET_CONTENT);
		contentSelectionIntent.addCategory(Intent.CATEGORY_OPENABLE);
		contentSelectionIntent.setType(FILE_TYPE);
		Intent[] intentArray;

		Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
		if (takePictureIntent.resolveActivity(MainActivity.this.getPackageManager()) != null) {
			File photoFile = null;
			try {
				photoFile = create_image();
				takePictureIntent.putExtra("PhotoPath", asw_cam_message);
			} catch (IOException ex) {
				Log.e(TAG, "Image file creation failed", ex);
			}
			if (photoFile != null) {
				asw_cam_message = "file:" + photoFile.getAbsolutePath();
				takePictureIntent.putExtra(MediaStore.EXTRA_OUTPUT, Uri.fromFile(photoFile));
			} else {
				takePictureIntent = null;
			}
		}
		if (takePictureIntent != null) {
			intentArray = new Intent[]{takePictureIntent};
		} else {
			intentArray = new Intent[0];
		}

		Intent chooserIntent = new Intent(Intent.ACTION_CHOOSER);
		chooserIntent.putExtra(Intent.EXTRA_INTENT, contentSelectionIntent);
		chooserIntent.putExtra(Intent.EXTRA_TITLE, "File Chooser");
		chooserIntent.putExtra(Intent.EXTRA_INITIAL_INTENTS, intentArray);
		startActivityForResult(chooserIntent, asw_file_req);

	}

	//Creating image file for upload
    private File create_image() throws IOException {
        @SuppressLint("SimpleDateFormat")
        String file_name    = new SimpleDateFormat("yyyy_mm_ss").format(new Date());
        String new_name     = "file_"+file_name+"_";
        File sd_directory   = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES);
        return File.createTempFile(new_name, ".jpg", sd_directory);
    }


	@Override
	protected void onNewIntent(Intent intent) {
		super.onNewIntent(intent);
		String message = intent.getStringExtra("message");
		Log.d(TAG,"OTP " + message);

		// call the javascript page
		webView.loadUrl("javascript:messageReceieved('" + message + "')");
	}


	//Action on back key tap/click
	@Override
	public boolean onKeyDown(int keyCode, @NonNull KeyEvent event) {
		if (event.getAction() == KeyEvent.ACTION_DOWN) {
			switch (keyCode) {
				case KeyEvent.KEYCODE_BACK:
					if (webView.canGoBack()) {
						String currentWebViewUrl =  webView.getUrl();
						String message = "Do you want to exit the App?";
						//path may be dynamic. need to be changed acc to UI
						if(currentWebViewUrl.endsWith("/employee/all-complaints") || currentWebViewUrl.endsWith("/citizen/")){
							showMessageOKCancel(message,
									new DialogInterface.OnClickListener() {
										@Override
										public void onClick(DialogInterface dialog, int which) {
											finish();
										}
									});
						}
						else if(currentWebViewUrl.contains("citizen/egov-common/acknowledgement?status")){
							webView.loadUrl(URL);

						}
						else{
							webView.goBack();
						}
					} else {
						finish();
					}
					return true;
			}
		}
		return super.onKeyDown(keyCode, event);
	}

    @Override
    protected void onStart() {
        super.onStart();
    }


	@Override
    protected void onStop() {
		super.onStop();
//		if (proxy.smsReceiverRunning()) {
//			proxy.stopSMSReceiver();
//		}
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
    }

    @Override
    protected void onSaveInstanceState(Bundle outState){
        super.onSaveInstanceState(outState);
        webView.saveState(outState);
    }

    @Override
    protected void onRestoreInstanceState(Bundle savedInstanceState){
        super.onRestoreInstanceState(savedInstanceState);
        webView.restoreState(savedInstanceState);
    }

	@Override
	public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
		switch (requestCode) {
			case REQUEST_CODE_ASK_MULTIPLE_PERMISSIONS: {
				Map<String, Integer> perms = new HashMap<String, Integer>();
				// Initial
				perms.put(Manifest.permission.ACCESS_FINE_LOCATION, PackageManager.PERMISSION_GRANTED);


				// Fill with results
				for (int i = 0; i < permissions.length; i++)
					perms.put(permissions[i], grantResults[i]);

				// Check for ACCESS_FINE_LOCATION
				if (perms.get(Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED

					) {
					// All Permissions Granted
					// Do nothing

				} else {
					// Permission Denied
					Toast.makeText(MainActivity.this, "One or More Permissions are DENIED Exiting App", Toast.LENGTH_SHORT)
							.show();
					finish();
				}

			}
			break;
			case MY_PERMISSIONS_REQUEST_LOCATION : {
				if(grantResults.length  > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED){
					if(mGeoLocationCallback != null) {
						mGeoLocationCallback.invoke(mGeoLocationRequestOrigin,true,false);
					}

				}
				else{
					if(mGeoLocationCallback != null){
						mGeoLocationCallback.invoke(mGeoLocationRequestOrigin,false,false);
					}
				}

			}
			break;

			case REQUEST_FILE_PERMISSIONS : {
				if (check_permission(2) && check_permission(3)){
				 	showFileDialog();
				}
				else{
					Toast.makeText(getApplicationContext(), "Please give access to External Storage and Camera", Toast.LENGTH_SHORT).show();
				}
			}
			break;
			default:
				super.onRequestPermissionsResult(requestCode, permissions, grantResults);
		}
	}

	@TargetApi(Build.VERSION_CODES.M)
	private void handleMarshMellow() {
		List<String> permissionsNeeded = new ArrayList<String>();

		final List<String> permissionsList = new ArrayList<String>();
		if (!addPermission(permissionsList, Manifest.permission.ACCESS_FINE_LOCATION))
			permissionsNeeded.add("Show Location");

		if (!addPermission(permissionsList, Manifest.permission.WRITE_EXTERNAL_STORAGE) || !addPermission(permissionsList, Manifest.permission.READ_EXTERNAL_STORAGE))
			permissionsNeeded.add("Read/Write Files");


		if (permissionsList.size() > 0) {
			if (permissionsNeeded.size() > 0) {

				for (int i = 1; i < permissionsNeeded.size(); i++)
					requestPermissions(permissionsList.toArray(new String[permissionsList.size()]),
							REQUEST_CODE_ASK_MULTIPLE_PERMISSIONS);
			}
			requestPermissions(permissionsList.toArray(new String[permissionsList.size()]),
					REQUEST_CODE_ASK_MULTIPLE_PERMISSIONS);
			return;
		}
	}


	private void showMessageOKCancel(String message, DialogInterface.OnClickListener okListener) {
		new AlertDialog.Builder(MainActivity.this)
				.setMessage(message)
				.setPositiveButton("OK", okListener)
				.setNegativeButton("Cancel", null)
				.create()
				.show();
	}


	@TargetApi(Build.VERSION_CODES.M)
	private boolean addPermission(List<String> permissionsList, String permission) {

		if (checkSelfPermission(permission) != PackageManager.PERMISSION_GRANTED) {
			permissionsList.add(permission);
			// Check for Rationale Option
			if (!shouldShowRequestPermissionRationale(permission))
				return false;
		}
		return true;
	}


}



