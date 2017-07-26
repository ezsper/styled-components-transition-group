'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Transition2 = require('react-transition-group/Transition');

var _Transition3 = _interopRequireDefault(_Transition2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var transitionGroupProp = _propTypes2.default.shape({
  isMounting: _propTypes2.default.bool
});

var NestedTransition = (_temp = _class = function (_Transition) {
  _inherits(NestedTransition, _Transition);

  function NestedTransition() {
    _classCallCheck(this, NestedTransition);

    return _possibleConstructorReturn(this, (NestedTransition.__proto__ || Object.getPrototypeOf(NestedTransition)).apply(this, arguments));
  }

  _createClass(NestedTransition, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var transitionGroup = void 0;
      if (this.props.nestedTransition) {
        transitionGroup = this.context.nestedTransition ? this.context.nestedTransition : this.context.transitionGroup;
      } else {
        transitionGroup = { isMounting: null };
      }
      return {
        transitionGroup: transitionGroup,
        nestedTransition: {
          isMounting: !this.appeared
        }
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      _get(NestedTransition.prototype.__proto__ || Object.getPrototypeOf(NestedTransition.prototype), 'componentDidMount', this).call(this);
      this.appeared = true;
    }
  }]);

  return NestedTransition;
}(_Transition3.default), _class.propTypes = _extends({}, _Transition3.default.propTypes, {
  nestedTransition: _propTypes2.default.bool
}), _class.contextTypes = {
  transitionGroup: transitionGroupProp,
  nestedTransition: transitionGroupProp
}, _class.childContextTypes = {
  transitionGroup: transitionGroupProp,
  nestedTransition: transitionGroupProp
}, _temp);
exports.default = NestedTransition;