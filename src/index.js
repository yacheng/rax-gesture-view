import {isWeb} from 'universal-env';

let GestureView;

if (isWeb) {
  GestureView = require('./gesture.web');
} else {
  GestureView = require('./gesture.weex');
}

export default GestureView;
module.exports = exports["default"];