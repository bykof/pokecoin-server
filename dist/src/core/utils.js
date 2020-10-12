"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfBrowser = void 0;
const ua_parser_js_1 = require("ua-parser-js");
exports.checkIfBrowser = (userAgentString) => {
    var userAgent = new ua_parser_js_1.UAParser(userAgentString);
    return userAgent.getBrowser().name !== undefined;
};
//# sourceMappingURL=utils.js.map