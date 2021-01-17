import * as StackTrace from 'stacktrace-js';
import UAParser from 'ua-parser-js';
import Amplify, { Analytics } from 'aws-amplify';
import flatten from 'flat';

import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const parser = new UAParser();

const callback = (stackframes) => {
  return stackframes.map((sf) => {
    return sf.toString();
  }).join('\n');
};

const errback = () => { return null; };

const monitorErrors = (msg, file, line, col, error) => {
  const stack = StackTrace.fromError(error).then(callback).catch(errback);
  stack.then((stringifiedStack) => {
    const data = {
      url: window.location.href,
      msg: msg,
      file: file,
      line: String(line),
      column: String(col) || "",
      stack: stringifiedStack || "",
      ...flatten(parser.getResult())
    };
    Analytics.record({
      name: 'ERROR',
      attributes: {
        ...data
      }
    });
  });
};

export default monitorErrors;
