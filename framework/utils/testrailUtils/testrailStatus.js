"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testrailStatus = void 0;
var testrailStatus;
(function (testrailStatus) {
    testrailStatus[testrailStatus["PASSED"] = 1] = "PASSED";
    testrailStatus[testrailStatus["BLOCKED"] = 2] = "BLOCKED";
    testrailStatus[testrailStatus["UNTESTED"] = 3] = "UNTESTED";
    testrailStatus[testrailStatus["RETEST"] = 4] = "RETEST";
    testrailStatus[testrailStatus["FAILED"] = 5] = "FAILED";
})(testrailStatus = exports.testrailStatus || (exports.testrailStatus = {}));
