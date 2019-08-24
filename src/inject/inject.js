function twitterBlock(tweetId){
	return "<br/><div id='tennagraphBlock' style='text-align:left'><a href='https://tennagraph.com/?tweetId="+tweetId+"' target='_blank'>Stance to Tennagraph</a></div>";
}

function formatGas(gas){
	if(gas < 1000000){
		return parseInt(gas/1000)+ "K";
	}

	if(gas >= 1000000){
		return parseInt(gas/1000000)+ "M";
	}
}

function apiGet(port, get){
	 return new Promise((resolve, reject) => {
		 port.postMessage({type: 'apiGet', get: get});
		 port.onMessage.addListener(function(msg) {
		      if(msg.status == "success"){
				//console.log(msg.data);
				resolve(msg.data);
				//$.parseJSON(msg.data);

		      }
		 });
	})
}


$( document ).ready(function() {
	/*
	$("body").append(`<script>
	    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            ethereum.enable();
            // Acccounts now exposed
        } catch (error) {
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
    console.log(web3.fromWei(web3.eth.getBalance(web3.eth.coinbase)));
    </script>`);
    */

	 var port = chrome.extension.connect({
	      name: "connect"
	 });


	setInterval(function(){
		if (window.location.href.indexOf("//github.com/ethereum/EIPs/blob/master/EIPS/eip-") > -1) { //check that we are inside EIP
			if($('#readme').length > 0 && $('#tennagraphInfo').length<= 0){
				var p = window.location.href.split("//github.com/ethereum/EIPs/blob/master/EIPS/eip-");
				var eipN = parseInt(p[1]);
				/*$.get("https://api.tennagraph.com/eip/"+eipN+"/?format=json", function(data){
					console.log(data);
				});*/
				apiGet(port, "eip/"+eipN+"/?format=json").then(result => {
					var eip = $.parseJSON(result);
					$('#readme').prepend("<div id='tennagraphInfo' style='color: #3e00a3; font-weight:bold'></div>");
					//if(eip.voting_details == null){
						//$('#tennagraphInfo').append("This EIP is not proposed for voting yet. <br/>");
					//}else{
						//$('#tennagraphInfo').append("Voting is <a href='https://tennagraph.com/eip/"+eipN+"' target='_blank'>here</a><br/>");
						$('#tennagraphInfo').append("<iframe src='https://tennagraph.com/eip/"+eipN+"/voting' style='width:100%;height:300px;'  frameBorder='0'></iframe>");
						/*apiGet(port, "ethereum/gas-voting/"+eipN+"/?format=json").then(result => {
							//var voting = $.parseJSON(result);
							//$('#tennagraphInfo').append("Gas voting current results: yay "+formatGas(voting.yay)+" nay "+formatGas(voting.nay)+" abstain "+formatGas(voting.abstain));
						});*/
					//}
				});
			}
		}
	}, 1000);


	/*
	if (window.location.href.indexOf("//twitter.com/") > -1) {
		console.log("in twitter");
		setInterval(function(){
			$('article').each(function(){
				if($(this).find('div[id="tennagraphBlock"]').length > 0) return;
				var p = $(this).find('a[href*="status"]').attr("href").split("status/");
				var tweetId = parseInt(p[1]);
				console.log(tweetId);
				$(this).append(twitterBlock(tweetId));
			})
		}, 1000);

		setInterval(function(){
			$('div[data-tweet-id]').each(function(){
				if($(this).find('div[id="tennagraphBlock"]').length > 0) return;
				//console.log($(this).attr("data-tweet-id"));
				var tweetId = $(this).attr("data-tweet-id");
				//$(this).find("div[class|='ProfileTweet-actionList']").html("123");
				$(this).append(twitterBlock(tweetId));
			})
		}, 1000);

	}
	*/


});