const path = process.env.NODE_ENV === 'production' ? './keys.prod' : './keys';

import keys from './keys';

// TODO set by NODE_ENV

// if (process.env.NODE_ENV === 'production') {
//
//     keys = a;
// } else {
//     import * as b from './keys';
//     keys = b;
//     // keys = import('./keys');
// }


export default keys;
