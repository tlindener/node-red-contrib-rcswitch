node-rcswitch2
=============

[![NPM version](https://badge.fury.io/js/node-red-contrib-rcswitch2.svg)](http://badge.fury.io/js/node-red-contrib-rcswitch2)

The node-red node node-rcswitch2 allows to control 315/433Mhz devices via the rcswitch library.
This is an extented version of tlindener/node-red-contrib-rcswitch with support of different switch types, tristate and binary strings.

The implementation based on https://github.com/marvinroger/node-rcswitch. The supported switch types are described there.

Node bindings for the [rcswitch RaspberryPi port (pin)](https://github.com/r10r/rcswitch-pi).

It should be compatible with all versions of Node.js starting from 0.10.x.

## Requirements

* Like the C++ version of rcswitch, [WiringPi must be installed](https://projects.drogon.net/raspberry-pi/wiringpi/download-and-install/) in order to compile the used packages.
* Both the data and the power Pins of the 315/433Mhz emitter must be connected to the RPi. Note the number of the WiringPi data Pin. (see http://wiringpi.com/pins/)
* The node command must be run with root access

## Usage
The attributs `PIN` and `Mode` must be set in the node properties (edit dialog). The other configuration can either be done in the node properties or in the incoming message object.
* `PIN` - (Number) data Pin to use following [the WiringPi schema](http://wiringpi.com/pins/)
* `Mode` - selects the operation mode of the node to support different manufacturers

This node supports the following modes:

* `group code + Device` - For devices without family code. The group code is either an binary string with length 5 or a numeric value (1-4) and could be set in field <b>Group</b> or <b>msg.group</b>. The switch/device could be set in field <b>Device</b> or <b>msg.device</b> (value [ABCD] (in this case Field Device must be set to "msg.device").  The Switchposition could be set in field <b>Switch Position</b> or in <b>msg.payload</b>. In this case the value 0 means off and the value 1 means on.</li>
* `Family + Group code + Device` -For devices with family code. The Family code must be one of the chars [abcdef] and could be set in field <b>Family</b> or <b>msg.family</b>. The group code is numeric and must be one of the values [1234] and could be set in field <b>Group</b> or <b>msg.group</b>. The switch/device could be set in field <b>Device</b> or <b>msg.device</b> (value [ABCD] (in this case Field Device must be set to "msg.device"). The Switchposition could be set in field <b>Switch Position</b> or in <b>msg.payload</b>. In this case the value 0 means off and the value 1 means on.</li>
* `Channel + Device (Tristate)` For devices with tristate code like micro-electric AS 73 witch is also sold as REV Telecontrol in Germany (Version with house code with 6 DIP switches). The Channel code must be a binary string with 0=off and 1=on and could be set in field <b>Channel</b> or <b>msg.channel</b> (in this case Field Channel must be empty). The switch/device could be set in field <b>Device</b> or <b>msg.device</b> (value [ABCD] (in this case Field Device must be set to "msg.device"). The Switchposition could be set in field <b>Switch Position</b> or in <b>msg.payload</b>. In this case the value 0 means off and the value 1 means on.</li>
* `Tristate String ` Send a tristate string. The String could be set in field <b>systemcode</b> or <b>msg.payload</b>. Only the chars 0,1,F and S without any blanks are alowed.</li>
* `Binary String` Send a binary string. The String could be set in field <b>systemcode</b> or <b>msg.payload</b>. Only the chars 0 and 1 without any blanks are alowed.</li>

An description of the types is on https://github.com/marvinroger/node-rcswitch".
