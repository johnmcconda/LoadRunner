//"'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//" Script Title       : 
//" Script Description : More etails are at http://wilsonmar.github.io/javascript-in-loadrunner
//"                                     and http://wilsonmar.github.io/loadrunner-javascript-coding
//"                      
//" Script Author      : Wilson Mar
//" Script Date        : Tue Apr 05 13:15:10 2016
//" Generated By       : LoadRunner Recorder (Build: 1096)
//"'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

var nRetries=0;
var  RunDataIn;
var  RunDataIn_key;
var  RunDataIn_rows;
var  RunType;        // controls scope of script generic processing (URL_Landing, SignUp, SignIn, SignOut).
var  ThinkTimeSecs   = lr.getAttribString("ThinkTimeSecs");
var nThinkTimeSecs   = Number(ThinkTimeSecs);

function vuser_init(){
    var rc=0; var TextString;

    rc=wi_library_init();
    if( rc != 0 ){ return rc; }

    //  Error: 'ReferenceError: ThinkTimeSecs is not defined'.
   	// nThinkTimeSecs.update();
    // WJS1_Config_print_warning();
    // lr.outputMessage(">> nThinkTimeSecs.show() = "+ nThinkTimeSecs.show() +".");
	//  wi_msg_print_reset();

//    
        TextString = lr.getAttribString("Retries");   // maximum number of retries before giving up.
    if( TextString === undefined || TextString == 0 ){
    	nRetries = 1; // FIXME: Retires not defined in RTS, yet not recognized as such in code.
   	    WJS1_Config_print_warning();
    	lr.outputMessage(">> Retries not defined in Run-Time Settings Attributes. Using default "+ nRetries +".");
	    wi_msg_print_reset();
    }else{
    	nRetries = Number(TextString); // Number() is a JavaScript standard function.
   	    WJS1_Config_print_trace();
    	lr.outputMessage(">> Retries in Run-Time Settings Attributes = "+ nRetries +".");
	    wi_msg_print_reset();
    }
	
    if( nRetries <= 0 ){
   	    WJS1_Config_print_warning();
	   	lr.outputMessage(">> Retries in Run-Time Settings Attributes of "+ nRetries +" will cause no execution.");
	    wi_msg_print_reset();
   	}
//
       RunDataIn = lr.getAttribString("RunDataIn"); // controls Input data source (file, VTS).
   if( RunDataIn === undefined){
    	RunDataIn = "1"; // the default, not "FILE" or "VTS".
	    WJS1_Config_print_warning();
    	lr.outputMessage(">> RunDataIn not defined in Run-Time Settings Attributes. Using default "+ RunDataIn +".");
	    wi_msg_print_reset();
    }else{
    	RunDataIn = RunDataIn.toUpperCase();
	    WJS1_Config_print_debug();
    	lr.outputMessage(">> RunDataIn UpperCased = "+ RunDataIn +".");
	    wi_msg_print_reset();
    }
//
   	if( RunDataIn === "0"){
    	// No operation, just run to ensure the script works.

    }else
   	if( RunDataIn === "1"){
    	// Example of a call to ensure connection:.
    	// This also "wakes up" the connection and server (but only one scenario/load generator needs to do it).
     	rc=WJS1_Access_landing( "T01_landing_init","http://127.0.0.1:1080/WebTours/index.htm",100,"Web Tours");

    }else
	if( RunDataIn === "FILE"){ // Loop thru file run_01.dat
    	RunDataIn_rows = wi_file_count( "run_URL" ); // Find count in file for looping.
	    WJS1_Config_print_info();
    	lr.outputMessage(">> RunDataIn =\""+ RunDataIn +"\", wi_file_count finds "+ RunDataIn_rows +" rows assuming no dups.");
	    wi_msg_print_reset();

    }else
	if( RunDataIn === "VTS"){
	    // TODO: Code to obtain data from VTS rather than run_01.dat.

    }else{
   	    WJS1_Config_print_error();
		lr.errorMessage(">> RunDataIn Run-Time Settings Attribute ="+ RunDataIn +" not recognized."); 
		lr.abort();
	    wi_msg_print_reset();
    }

	return rc;
}
