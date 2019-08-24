function update(port){
	 port.postMessage({type: 'update'});
	 port.onMessage.addListener(function(msg) {
	      if(msg.status == "success"){
			console.log(msg.data);
			$.parseJSON(msg.data).forEach(function(eip) {
			  $("<tr><td>EIP"+eip.eip_num+" "+eip.eip_status.display+"</td></tr>").appendTo("#eipsTable");
			});

	      }
	 });
}


$( document ).ready(function() {


	 var port = chrome.extension.connect({
	      name: "connect"
	 });

	 update(port);


	 /*
	 port.postMessage({type: 'update'});
	 port.onMessage.addListener(function(msg) {
	      console.log("message recieved" + msg);
	 });
	*/



});



