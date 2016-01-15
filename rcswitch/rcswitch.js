module.exports = function(RED) {
function RCSwitchNode(config){
	RED.nodes.createNode(this,config);
        var node = this;
	this.on('input', function(msg) {
	var rcswitch = require('rcswitch');

		try{
			var json = JSON.parse(msg.payload);
			if(json != null){
				if(json.hasOwnProperty('status') && json.hasOwnProperty('deviceid')){
					var group = json.deviceid.substring(0,5);
					var device = json.deviceid.substring(5,6);
					
					if(json.status == "on"){
						rcswitch.enableTransmit(0); // Set WiringPi Pin 0 on OUTPUT (see http://wiringpi.com/pins/ for pin numerotation)
						rcswitch.switchOn(group,parseInt(device));
						rcswitch.disableTransmit();
					}else if(json.status == "off"){
					rcswitch.enableTransmit(0); // Set WiringPi Pin 0 on OUTPUT (see http://wiringpi.com/pins/ for pin numerotation)
						rcswitch.switchOff(group,parseInt(device));
						rcswitch.disableTransmit();
					}
				}
			}
		}
		catch(err){
			console.log(err);
		}
		
	
});
}
    RED.nodes.registerType("rcswitch",RCSwitchNode);

	
function RCSwitchtsNode(n) {
    var node = this;
    RED.nodes.createNode(node,n);
		
	
	node.systemcode=n.systemcode;
	node.pin=parseInt (n.pin);
	//node.log ("systemcode " + n.systemcode);
	
	
	this.on('input', function(msg) {
	var rcswitch = require('rcswitch');
        //node.log ("systemcode " + node.systemcode);
		//node.log ("Starte test");
		try{

			if (node.systemcode.length>5)
			  {
			  node.log ("send code " + node.systemcode + " auf PIN " + node.pin);
			  rcswitch.enableTransmit(node.pin); 
			  rcswitch.sendTriState(node.systemcode);
			  rcswitch.disableTransmit();
			  }
			  
			 else if(msg.payload.length>5)
			  {
			  node.log ("send code " + msg.payload + " auf PIN " + node.pin);
			  rcswitch.enableTransmit(node.pin); 
			  rcswitch.sendTriState(msg.payload);
			  rcswitch.disableTransmit();
			  }
		}
		catch(err){
			node.error(err);
		}
	
});
}
    RED.nodes.registerType("rcswitchts",RCSwitchtsNode);
}


