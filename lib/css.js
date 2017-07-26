'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = css;

var _styledComponents = require('styled-components');

var _animated = require('./animated');

function css(strings) {
  for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }

  var stylesheet = _styledComponents.css.apply(undefined, [strings].concat(values));
  if (_animated.transitionStyleRegExp.test(stylesheet)) {
    // eslint-disable-next-line no-console
    console.error(new Error('Using transition style out of animated'));
  }
  return stylesheet;
}