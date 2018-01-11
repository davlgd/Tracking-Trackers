chrome.browserAction.setBadgeBackgroundColor({color:"black"});

var counter = 0;
var result = new Object();
var isUpdatable = true;

var timer = setTimeout(function(){ 
	console.log(result);
	isUpdatable = false;
}, 15000);
					
chrome.webRequest.onCompleted.addListener(function(thisRequest) 
{
	if (thisRequest.initiator)
	{
		var initHost = new URL(thisRequest.initiator).host;
		var urlHost = new URL(thisRequest.url).host;
		
		if (initHost != urlHost && isUpdatable)
		{
			if (!result[initHost]) result[initHost] = 1; 
			else result[initHost]++;
			
			counter++;
			console.log(thisRequest);
			chrome.browserAction.setBadgeText({text:counter.toString()});
		}
	}
	
},{urls: ["<all_urls>"]});

chrome.browserAction.onClicked.addListener(function()
{
	clearTimeout(timer);
	counter = 0;
	result = new Object();
	isUpdatable = true;
	
	console.clear();
	console.log("Nouvelle session :");
	
	timer = setTimeout(function(){ 
		console.log(result);
		isUpdatable = false;
	}, 15000);
});