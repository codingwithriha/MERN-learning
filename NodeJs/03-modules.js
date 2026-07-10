//Modules
//CommonJS, every file is module(by default)
//Modules - Encapsulated Code (only share minimum)
const names = require('./04-names');
const SayHi = require('./05-utils');
const data = require('./06-alternative-flavour');
require('./07-mind-grenade');
SayHi(names.riha);
SayHi(names.shahzadi);
