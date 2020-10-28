import _ from 'lodash';

const lowercaseKeys = (obj) =>
  _.keys(obj).reduce((acc, key) => {
    acc[key.toLowerCase()] = _.unescape(obj[key]);
    return acc;
  }, {});

export default lowercaseKeys;
