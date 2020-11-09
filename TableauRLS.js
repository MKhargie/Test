
// When the workbook is opened then run our extension without a trigger.
//Note that prompts for extensions can be configured via the Tableau Server Settings
var includedVar = []
var includedLabels = []
var excludedLabels = []
var includedCountry = []
var excludedCountry = []
var bearerToken = "Bearer eyJraWQiOiJScktSNm5kWnlUblR6VjI1LXp4RjRUNG5MWE1ZQnRINHhSZnVLOTBXdnlrIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULjNENkFoWGs3UGt3STc2MHFweHNfVEVMX1ZWWlNKVWlCeUxJdTNWY3ZSX1UiLCJpc3MiOiJodHRwczovL3dtZy5va3RhcHJldmlldy5jb20vb2F1dGgyL2F1c3Fha3Jsbm5ScjlvdTd3MGg3IiwiYXVkIjoiYXBpOi8vb3B1cyIsImlhdCI6MTU5NDU4OTkzNywiZXhwIjoxNTk0NTkzNTM3LCJjaWQiOiIwb2FxNDMycXd5VTl4OVpxNjBoNyIsInVpZCI6IjAwdXJqaTBiaG1mcTVTcXcyMGg3Iiwic2NwIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJncm91cHMiXSwic3ViIjoiTWF0dGhldy5LaGFyZ2llQHdtZy5jb20iLCJpc0V4dGVybmFsIjp0cnVlLCJncm91cHMiOlsiT2t0YV8zNjUiLCJUYWJsZWF1X0RldiIsIkV2ZXJ5b25lIiwiT2t0YV9TeW5jaHRhbmsiLCJPa3RhX0FsbF9Vc2VycyIsIlF1YWRBX0FkbWlucyIsIk9rdGFfQURfVXNlcnMiXX0.dH8YcEUMhCqVe_97ohNRzrwyxY-9y5ST4_d5N77MpwNRjRaoFDglplatsdIDwgp0umTm05AOlXeo1PFgXhN8VjEObQrz7NWaeTCXHI_s2PtZDXMz8Y2itZQVsKLwVul8-lfSrZgGbxymgquTfPhMsd1Gciv8rUHr_SZFGoM_8yxHMSP7bpF-NkKleZlWyrsKBvOFBY4peYAMx4ZbPOxej66Hj5Bd1g7ucMPRlcc6MfvmnXfppVt0StXiskxwdSWyxEeXozzw50XSOgyjbyS7XpN8ZlBTMQPmfp70qcTLoqWbEZs78spjb_xP4XT4P4uwNZQfZHXaCAsow8Y5hbgH5A"
tableau.extensions.initializeAsync()


/* Username Query
  ====================================================================
  Query the User Endpoint for the logged in user, by passing the Username()
  functions value from Tableau into our script. Additional work must be completed
  to finish the development on returning the proper results from the user endpoint.

  Currently this section is commented out and hardcoded for our test user.

*/

/*
.then(function(){
tableau.extensions.dashboardContent.dashboard.findParameterAsync('Username').then((username) => {

  var settings = {
  "url": "http://quada-service.dev.wmg.com/api/v1/users?limit=50&q="+username,
  "method": "GET",
  "timeout": 0,
  "headers": {
    "accept": "application/json",
    "Authorization": bearerToken
  },
};

$.ajax(settings).done(function (response) {

});
})
*/

/* =======================================================*/






/*Permissions Query
==========================================================
After the username is returned with the ID needed for the permissions Endpoint
we pass that ID into the endpoint and return permission values
*/


.then(function(){

/*NOTE: Below is the logic for hitting the endpoint, however due to this current being hosted
locally we will be hardcoding the results*/

/*

var settings = {
  "url": "http://quada-service.dev.wmg.com/api/v1/auth/permissions/0oamb5qe2jhBgH9230h7",
  "method": "GET",
  "timeout": 0,


  "headers": {
    "accept": "application/json",

    "Authorization": bearerToken
  },
};

var localCopy = $.ajax(settings).done(function (response) {

  return (response)
})

*/



// NOTE: Below are the hardcoded results from the query above edited to have BMG Labels



var localCopy = {"userId": "00urji0bhmfq5Sqw20h7","applicationId": "0oamb5qe2jhBgH9230h7","groups": [{"id": "00gsjvzu7y3hVJ0p00h7","name": "Tableau_Dev"}],
   "permissions": [
       {
           "userId": null,
           "groupId": "00gsjvzu7y3hVJ0p00h7",
           "applicationId": "0oamb5qe2jhBgH9230h7",
           "subjects": [
               {
                   "type": "label_keys",
                   "operation": "include",
                   "values": [
                       "1CK",
                       "BME",
                       "NCD"
                   ]
               },
               {
                   "type": "country",
                   "operation": "include",
                   "values": [
                       "US",
                       "MX",
                       "CA",
                       "JP",
                       "CN"
                   ]
               },
               {
                   "type": "artist",
                   "operation": "include",
                   "values": [
                       "1367126",
                       "1889065",
                       "1285826"
                   ]
               }
           ],
           "scopes": [
               "view"
           ]
       }
   ]
};



return(localCopy);
})


/*After the json with permissions are returned we then parse the results and prepare
  to pass the results into our Tableau Parameters */


.then((response)=>{

var jjson = response;


var strjson = JSON.stringify(jjson,'permissions')

var obj = JSON.parse(strjson);


for (y in obj["permissions"][0]["subjects"]) {


  var category = obj["permissions"][0]["subjects"][y];
  var type = category['type'];
  var operations = category['operation']



/*Returns the values of included labels and pushes into a list called includedLabels
  the same logic can be applied for additional criteria*/



if (type == 'label_keys') {
  if (operations == 'include') {

    for (i in category['values']){

      includedLabels.push(category['values'][i]);

      }
    }


  }

  else if (type == 'label_keys') {
    if (operations == 'exclude') {

      for (x in category['values']){

        excludedLabels.push(category['values'][x]);

        }
      }
  }


    else if (type == 'country') {
      if (operations == 'include') {

        for (x in category['values']){

          includedCountry.push(category['values'][x]);

          }
        }
}

else if (type == 'country') {
  if (operations == 'excude') {

    for (x in category['values']){

      excludedCountry.push(category['values'][x]);

      }
    }
}





}
includedVar.push(includedLabels) ;
includedVar.push(includedCountry) ;
includedVar.push(excludedLabels);
includedVar.push(excludedCountry);
 console.log(includedVar);
//Change the value of Label Parameter in Tableau to the list we created
return(includedVar);
})

.then((includedVar)=>{
tableau.extensions.dashboardContent.dashboard.findParameterAsync('IncludedLabels').then((u)=>{
  u.changeValueAsync(JSON.stringify(includedVar[0]))
});

tableau.extensions.dashboardContent.dashboard.findParameterAsync('IncludedCountry').then((u)=>{
  u.changeValueAsync(JSON.stringify(includedVar[1]))
});

tableau.extensions.dashboardContent.dashboard.findParameterAsync('ExcludedLabels').then((u)=>{
  u.changeValueAsync(JSON.stringify(includedVar[2]))
});

tableau.extensions.dashboardContent.dashboard.findParameterAsync('ExcludedCountry').then((u)=>{
  u.changeValueAsync(JSON.stringify(includedVar[3]))
});



});
