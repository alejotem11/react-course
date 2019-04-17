// To use es6 modules (imports and exports) save the file with the *.mjs extension
// and run the command:
// $ node --experimental-modules [your_file].mjs

import p, {sayMyName} from './person';

console.log(p.name);
console.log(sayMyName());
