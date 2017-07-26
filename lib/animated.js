'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transitionStyleRegExpAll = exports.transitionStyleRegExp = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/animated.js';
exports.injectStyledAnimate = injectStyledAnimate;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _StyledCSSTransition = require('./StyledCSSTransition');

var _StyledCSSTransition2 = _interopRequireDefault(_StyledCSSTransition);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /* eslint-disable react/prop-types */


var transitionStyleRegExp = exports.transitionStyleRegExp = /:((appear|enter|exit)(-active)?)/;
var transitionStyleRegExpAll = exports.transitionStyleRegExpAll = new RegExp(transitionStyleRegExp, 'g');

var classPrefix = 'styled-transition-';

var defaults = {
  in: true,
  appear: true,
  exit: true,
  enter: true,
  timeout: 300,
  nestedTransition: false
};

var animatedProps = ['nestedTransition', 'appear', 'exit', 'enter', 'timeout', 'in', 'onExit', 'onExiting', 'onExited', 'onEnter', 'onEntering', 'onEntered'];

function create(templateFunction) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var templateFunctionWithAnimate = function templateFunctionWithAnimate(strings) {
    for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      values[_key - 1] = arguments[_key];
    }

    var hasTransitionStyle = false;
    var transitionStyle = function transitionStyle(part) {
      return part.replace(transitionStyleRegExpAll, function () {
        hasTransitionStyle = true;
        return '.' + classPrefix + (arguments.length <= 1 ? undefined : arguments[1]);
      });
    };
    var StyledComponent = templateFunction.apply(undefined, [strings.map(transitionStyle)].concat(values));
    var attrs = Object.assign({}, StyledComponent.attrs);

    if (!hasTransitionStyle) {
      return StyledComponent;
    }

    function StyledAnimateComponent(props) {
      var transitionIn = props.in,
          transitionTimeout = props.timeout,
          nestedTransition = props.nestedTransition,
          appear = props.appear,
          onExit = props.onExit,
          onExiting = props.onExiting,
          onExited = props.onExited,
          onEnter = props.onEnter,
          onEntering = props.onEntering,
          onEntered = props.onEntered,
          enter = props.enter,
          exit = props.exit,
          className = props.className,
          rest = _objectWithoutProperties(props, ['in', 'timeout', 'nestedTransition', 'appear', 'onExit', 'onExiting', 'onExited', 'onEnter', 'onEntering', 'onEntered', 'enter', 'exit', 'className']);

      var resolveProp = function resolveProp(prop) {
        return (0, _utils.coalesceProp)(prop, props, attrs, config, defaults);
      };

      return _react2.default.createElement(
        _StyledCSSTransition2.default,
        _extends({}, config, {
          'in': resolveProp('in'),
          timeout: resolveProp('timeout'),
          appear: resolveProp('appear'),
          nestedTransition: resolveProp('nestedTransition'),
          onExit: onExit,
          onExiting: onExiting,
          onExited: onExited,
          onEnter: onEnter,
          onEntering: onEntering,
          onEntered: onEntered,
          enter: resolveProp('enter'),
          exit: resolveProp('exit'),
          classNames: {
            appear: classPrefix + 'appear',
            appearActive: classPrefix + 'appear-active',
            enter: classPrefix + 'enter',
            enterActive: classPrefix + 'enter-active',
            exit: classPrefix + 'exit',
            exitActive: classPrefix + 'exit-active'
          },
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 71
          }
        }),
        _react2.default.createElement(StyledComponent, _extends({}, rest, {
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 94
          }
        }))
      );
    }

    if (StyledComponent.attrs) {
      StyledAnimateComponent.attrs = attrs;
      animatedProps.forEach(function (prop) {
        delete StyledComponent.attrs[prop];
      });
    }

    var displayName = StyledComponent.displayName;

    StyledAnimateComponent.displayName = 'Animated(' + displayName + ')';
    StyledAnimateComponent.styledComponentId = StyledComponent.styledComponentId;

    return StyledAnimateComponent;
  };

  return templateFunctionWithAnimate;
}

function injectStyledAnimate(templateFunction) {
  var styledMethods = ['withConfig', 'attrs'];

  Object.assign(templateFunction, {
    animated: function animated(config) {
      var templateFunctionWithAnimate = create(templateFunction, config);
      styledMethods.forEach(function (method) {
        templateFunctionWithAnimate[method] = function () {
          return create(templateFunction[method].apply(templateFunction, arguments), config);
        };
      });
      return templateFunctionWithAnimate;
    }
  });

  styledMethods.forEach(function (method) {
    // eslint-disable-next-line no-param-reassign
    templateFunction.animated[method] = function () {
      var _templateFunction$ani;

      return (_templateFunction$ani = templateFunction.animated())[method].apply(_templateFunction$ani, arguments);
    };
  });

  return templateFunction;
}