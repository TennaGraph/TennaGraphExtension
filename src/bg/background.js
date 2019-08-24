// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
/*
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.pageAction.show(sender.tab.id);
    sendResponse();
  });
*/

function notify(title, message, url, iconUrl){
	chrome.notifications.create(
	    url,{   
	    type: 'basic', 
	    iconUrl: iconUrl, 
	    title: title, 
	    message: message 
	    },

	function() {} 

	);
}



 chrome.extension.onConnect.addListener(function(port) {
      
      port.onMessage.addListener(function(msg) {
           console.log("message recieved" + msg);
           /*port.postMessage("Hi Popup.js");
			if(msg.type == 'notify'){
				notify(msg.title, msg.message, msg.url, msg.iconUrl);
			}*/
			if(msg.type == 'update'){
		        chrome.storage.local.get(['eips'], function(result) {
		          port.postMessage({status: "success", data: result.eips});
		        });
			}

			if(msg.type == 'apiGet'){
				
				apiGet(msg.get).then(data => {port.postMessage({status: "success", data: data})});
				
			}

      });
 })

chrome.notifications.onClicked.addListener(function(notificationId) {
  chrome.tabs.create({url: notificationId});
});  


function update(){
	apiGet('eip/?is_voting_enabled=true&format=json').then(result => {
	        var eips = JSON.parse(result);
	        chrome.storage.local.get(['eips_index'], function(result2) {
	          var eips_index = result2.eips_index;
	          if(eips_index === undefined) eips_index = [];

	          eips.forEach(function(element) {
				  //console.log(eips[0].id);
				  if(eips_index[element.id] === undefined){
				  	eips_index[element.id] = true;
				  	notify("EIP "+element.eip_num+" voting enabled", "Click here to vote", "https://tennagraph.com/eip/"+element.eip_num, "/icons/logo.png");
				  }
				});

				chrome.storage.local.set({eips_index: eips_index}, function() {
		  		//console.log('Value is set to ' + value);
				});
	        });

			chrome.storage.local.set({eips: result}, function() {
	  		//console.log('Value is set to ' + value);
			});
	});

}

function apiGet(get){
	return new Promise((resolve, reject) => {
		fetch('https://api.tennagraph.com/'+get).then(r => r.text()).then(result => {
	    	resolve(result);
		});
	});
}






update();
setInterval(update, 5000);




