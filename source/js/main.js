import {ieFix} from './utils/ie-fix';
import {iosVhFix} from './utils/ios-vh-fix';

import {initRange} from './modules/init-range';
import {initPendulum} from './modules/pendulum';

// Utils
// ---------------------------------

ieFix();
iosVhFix();

// Modules
// ---------------------------------

initRange();
initPendulum();
