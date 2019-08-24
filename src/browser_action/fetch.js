function update(port){
	 port.postMessage({type: 'update'});
	 port.onMessage.addListener(function(msg) {
	      if(msg.status == "success") {
			console.log(msg.data);
			$.parseJSON(msg.data).forEach(function(eip) {
			  $("<tr><td style='white-space: nowrap; text-overflow:ellipsis; overflow: hidden; max-width:1px;'><a href='https://tennagraph.com/eip/"+eip.eip_num+"/' class='eipTitle'><b>EIP "+eip.eip_num+"</b> "+eip.eip_title+"</a> </td><td width='100px' align='right'><span class='statusButton'>"+eip.eip_status.display.toUpperCase()+"</span></td></tr>").appendTo("#eipsTable");
			});

	      }
	 });
}


$( document ).ready(function() {

   $('body').on('click', 'a', function(){
     chrome.tabs.create({url: $(this).attr('href')});
     return false;
   });
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



