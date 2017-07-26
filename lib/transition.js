'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.injectStyledTransition = injectStyledTransition;

var _TransitionGroup2 = require('react-transition-group/TransitionGroup');

var _TransitionGroup3 = _interopRequireDefault(_TransitionGroup2);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable react/prop-types, import/prefer-default-export */


var defaults = {
  appear: true,
  exit: true,
  enter: true
};

var transitionProps = ['appear', 'exit', 'enter'];

function create(templateFunction) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var templateFunctionWithTransition = function templateFunctionWithTransition(strings) {
    for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      values[_key - 1] = arguments[_key];
    }

    var StyledComponent = templateFunction.apply(undefined, [strings].concat(values));
    var attrs = Object.assign({}, StyledComponent.attrs);

    var StyledTransitionComponent = function (_TransitionGroup) {
      _inherits(StyledTransitionComponent, _TransitionGroup);

      function StyledTransitionComponent() {
        _classCallCheck(this, StyledTransitionComponent);

        return _possibleConstructorReturn(this, (StyledTransitionComponent.__proto__ || Object.getPrototypeOf(StyledTransitionComponent)).apply(this, arguments));
      }

      return StyledTransitionComponent;
    }(_TransitionGroup3.default);

    var resolveProp = function resolveProp(prop) {
      return (0, _utils.coalesceProp)(prop, attrs, config, defaults);
    };

    StyledTransitionComponent.defaultProps = _extends({}, config, _TransitionGroup3.default.defaultProps, {
      appear: resolveProp('appear'),
      enter: resolveProp('enter'),
      exit: resolveProp('exit'),
      component: StyledComponent
    });

    if (StyledComponent.attrs) {
      StyledTransitionComponent.attrs = attrs;
      transitionProps.forEach(function (prop) {
        delete StyledComponent.attrs[prop];
      });
    }

    var displayName = StyledComponent.displayName;

    StyledTransitionComponent.displayName = 'Transition(' + displayName + ')';
    StyledTransitionComponent.styledComponentId = StyledComponent.styledComponentId;

    return StyledTransitionComponent;
  };

  return templateFunctionWithTransition;
}

function injectStyledTransition(templateFunction) {
  var styledMethods = ['withConfig', 'attrs'];

  Object.assign(templateFunction, {
    transition: function transition(config) {
      var templateFunctionWithTransition = create(templateFunction, config);
      styledMethods.forEach(function (method) {
        templateFunctionWithTransition[method] = function () {
          return create(templateFunction[method].apply(templateFunction, arguments), config);
        };
      });
      return templateFunctionWithTransition;
    }
  });

  styledMethods.forEach(function (method) {
    // eslint-disable-next-line no-param-reassign
    templateFunction.transition[method] = function () {
      var _templateFunction$tra;

      return (_templateFunction$tra = templateFunction.transition())[method].apply(_templateFunction$tra, arguments);
    };
  });

  return templateFunction;
}