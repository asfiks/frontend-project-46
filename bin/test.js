import _ from 'lodash';
const obj = [{key: "- host", value: "hexlet.io"}, {key: "- timeout", value: 50}, 
            {key: "proxy", value: "123.234.53.22"}, {key: '+ follow', value: false}, {key: "+ timeout", value: 50}];
  

const sor = _.sortBy(obj, 'key')
  console.log(sor);