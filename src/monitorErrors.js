import * as StackTrace from 'stacktrace-js';
import UAParser from 'ua-parser-js';
import { Analytics, AWSKinesisProvider } from 'aws-amplify';
import awsconfig from './aws-exports';

Analytics.configure({
  AWSKinesis: {
      region: awsconfig.aws_project_region,
      bufferSize: 1000,
      flushSize: 100,
      flushInterval: 5000, 
      resendLimit: 5
  } 
});

Analytics.addPluggable(new AWSKinesisProvider());

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
      msg: msg,
      url: file,
      line: line,
      column: col || null,
      stack: stringifiedStack,
      ...parser.getResult()
    };
    Analytics.record({
      data: data,
      streamName: 'errors'
    }, 'AWSKinesis');
  });
};

export default monitorErrors;
