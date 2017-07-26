'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = styled2;

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _domElements = require('styled-components/lib/utils/domElements');

var _domElements2 = _interopRequireDefault(_domElements);

var _animated = require('./animated');

var _transition = require('./transition');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function styled2(MyComponent) {
  return (0, _transition.injectStyledTransition)((0, _animated.injectStyledAnimate)((0, _styledComponents2.default)(MyComponent)));
}

_domElements2.default.forEach(function (domElement) {
  styled2[domElement] = (0, _transition.injectStyledTransition)((0, _animated.injectStyledAnimate)(_styledComponents2.default[domElement]));
});