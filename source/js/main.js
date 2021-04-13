import {ieFix} from './utils/ie-fix';
import {iosVhFix} from './utils/ios-vh-fix';

import {initPurchaseRange} from './modules/init-purchase-range';
import {initPendulum} from './modules/pendulum';

// Utils
// ---------------------------------

ieFix();
iosVhFix();

// Modules
// ---------------------------------

initPurchaseRange();
initPendulum();
