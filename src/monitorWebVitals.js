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

const monitorErrors = (metric) => {
  const data = {
    name: metric.name,
    value: metric.value,
    url: window.location.href,
    ...parser.getResult()
  };
  Analytics.record({
    data: data,
    streamName: 'web-vitals'
  }, 'AWSKinesis');
};

export default monitorErrors;
