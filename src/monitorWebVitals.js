import UAParser from 'ua-parser-js';
import Amplify, { Analytics } from 'aws-amplify';
import flatten from 'flat';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const parser = new UAParser();

const monitorWebVitals = (metric) => {
  const data = {
    url: window.location.href,
    ...parser.getResult()
  };
  Analytics.record({
    name:  metric.name,
    attributes: {
      ...flatten(data)
    },
    metrics: {
      value: metric.value
    }
  });
};

export default monitorWebVitals;
