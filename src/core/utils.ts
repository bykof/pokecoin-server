import { UAParser } from "ua-parser-js";

export const checkIfBrowser = (userAgentString: string) => {
  var userAgent = new UAParser(userAgentString);
  return userAgent.getBrowser().name !== undefined;
};
