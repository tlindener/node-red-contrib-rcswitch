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
}


