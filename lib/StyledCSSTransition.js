'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/StyledCSSTransition.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /*
                                                                                                                                                                                                                                                                   * This is just an experiment, a copy of CSSTransition, it should be using
                                                                                                                                                                                                                                                                   * CSSTransition by default. We are testing some kind of nested transition
                                                                                                                                                                                                                                                                   * with transition bounds.
                                                                                                                                                                                                                                                                   */


var _propTypes = require('prop-types');

var PropTypes = _interopRequireWildcard(_propTypes);

var _addClass = require('dom-helpers/class/addClass');

var _addClass2 = _interopRequireDefault(_addClass);

var _removeClass = require('dom-helpers/class/removeClass');

var _removeClass2 = _interopRequireDefault(_removeClass);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _PropTypes = require('react-transition-group/utils/PropTypes');

var _NestedTransition = require('./NestedTransition');

var _NestedTransition2 = _interopRequireDefault(_NestedTransition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var addClass = function addClass(node, classes) {
  return classes && classes.split(' ').forEach(function (c) {
    return (0, _addClass2.default)(node, c);
  });
};
var removeClass = function removeClass(node, classes) {
  return classes && classes.split(' ').forEach(function (c) {
    return (0, _removeClass2.default)(node, c);
  });
};

var propTypes = _extends({}, _NestedTransition2.default.propTypes, {

  /**
   * The animation classNames applied to the component as it enters or exits.
   * A single name can be provided and it will be suffixed for each stage: e.g.
   *
   * `classNames="fade"` applies `fade-enter`, `fade-enter-active`,
   * `fade-exit`, `fade-exit-active`, `fade-appear`, and `fade-appear-active`.
   * Each individual classNames can also be specified independently like:
   *
   * ```js
   * classNames={{
   *  appear: 'my-appear',
   *  appearActive: 'my-active-appear',
   *  enter: 'my-enter',
   *  enterActive: 'my-active-enter',
   *  exit: 'my-exit',
   *  exitActive: 'my-active-exit',
   * }}
   * ```
   *
   * @type {{
   *  appear?: string,
   *  appearActive?: string,
   *  enter?: string,
   *  enterActive?: string,
   *  exit?: string,
   *  exitActive?: string,
   * }}
   */
  classNames: _PropTypes.classNamesShape,

  /**
   * A `<Transition>` callback fired immediately after the 'enter' or 'appear' class is
   * applied.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEnter: PropTypes.func,

  /**
   * A `<Transition>` callback fired immediately after the 'enter-active' or
   * 'appear-active' class is applied.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: PropTypes.func,

  /**
   * A `<Transition>` callback fired immediately after the 'enter' or
   * 'appear' classes are **removed** from the DOM node.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntered: PropTypes.func,

  /**
   * A `<Transition>` callback fired immediately after the 'exit'  class is
   * applied.
   *
   * @type Function(node: HtmlElement)
   */
  onExit: PropTypes.func,

  /**
   * A `<Transition>` callback fired immediately after the 'exit-active' is
   * class is applied.
   *
   * @type Function(node: HtmlElement
   */
  onExiting: PropTypes.func,

  /**
   * A `<Transition>` callback fired immediately after the 'exit' classes
   * are **removed** from the DOM node.
   *
   * @type Function(node: HtmlElement)
   */
  onExited: PropTypes.func
});

/**
 * A `Transition` component using CSS transitions and animations.
 * It's inspired by the excellent [ng-animate](http://www.nganimate.org/) libary.
 *
 * `CSSTransition` applies a pair of class names during the `appear`, `enter`,
 * and `exit` stages of the transition. The first class is applied and then a
 * second "active" class in order to activate the css animation.
 *
 * When the `in` prop is toggled to `true` the Component will get
 * the `example-enter` CSS class and the `example-enter-active` CSS class
 * added in the next tick. This is a convention based on the `classNames` prop.
 *
 * ```js
 * import CSSTransition from 'react-transition-group/CSSTransition';
 *
 * const Fade = ({ children, ...props }) => (
 *  <CSSTransition
 *    {...props}
 *    timeout={500}
 *    classNames="fade"
 *  >
 *   {children}
 *  </CSSTransition>
 * );
 *
 * class FadeInAndOut extends React.Component {
 *   constructor(...args) {
 *     super(...args);
 *     this.state= { show: false }
 *
 *     setInterval(() => {
 *       this.setState({ show: !this.state.show })
 *     }, 5000)
 *   }
 *   render() {
 *     return (
 *       <Fade in={this.state.show}>
 *         <div>Hello world</div>
 *       </Fade>
 *     )
 *   }
 * }
 * ```
 *
 * And the coorresponding CSS for the `<Fade>` component:
 *
 * ```css
 * .fade-enter {
 *   opacity: 0.01;
 * }
 *
 * .fade-enter.fade-enter-active {
 *   opacity: 1;
 *   transition: opacity 500ms ease-in;
 * }
 *
 * .fade-exit {
 *   opacity: 1;
 * }
 *
 * .fade-exit.fade-exit-active {
 *   opacity: 0.01;
 *   transition: opacity 300ms ease-in;
 * }
 * ```
 */

var CSSTransition = function (_React$Component) {
  _inherits(CSSTransition, _React$Component);

  function CSSTransition() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CSSTransition);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CSSTransition.__proto__ || Object.getPrototypeOf(CSSTransition)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      transitionBounds: null
    }, _this.onEnter = function (node, appearing) {
      var _this$getClassNames = _this.getClassNames(appearing ? 'appear' : 'enter'),
          className = _this$getClassNames.className;

      _this.removeClasses(node, 'exit');
      addClass(node, className);

      if (_this.props.onEnter) {
        _this.props.onEnter(node);
      }
    }, _this.onEntering = function (node, appearing) {
      var _this$getClassNames2 = _this.getClassNames(appearing ? 'appear' : 'enter'),
          activeClassName = _this$getClassNames2.activeClassName;

      _this.reflowAndAddClass(node, activeClassName);

      if (_this.props.onEntering) {
        _this.props.onEntering(node);
      }
    }, _this.onEntered = function (node, appearing) {
      _this.removeClasses(node, appearing ? 'appear' : 'enter');

      if (_this.props.onEntered) {
        _this.props.onEntered(node);
      }
    }, _this.onExit = function (node) {
      var _this$getClassNames3 = _this.getClassNames('exit'),
          className = _this$getClassNames3.className;

      _this.removeClasses(node, 'appear');
      _this.removeClasses(node, 'enter');
      addClass(node, className);

      if (_this.props.onExit) {
        _this.props.onExit(node);
      }
    }, _this.onExiting = function (node) {
      var _this$getClassNames4 = _this.getClassNames('exit'),
          activeClassName = _this$getClassNames4.activeClassName;

      _this.reflowAndAddClass(node, activeClassName);

      if (_this.props.onExiting) {
        _this.props.onExiting(node);
      }
    }, _this.onExited = function (node) {
      _this.removeClasses(node, 'exit');

      if (_this.props.onExited) {
        _this.props.onExited(node);
      }
    }, _this.getClassNames = function (type) {
      var classNames = _this.props.classNames;


      var className = typeof classNames !== 'string' ? classNames[type] : classNames + '-' + type;

      var activeClassName = typeof classNames !== 'string' ? classNames[type + 'Active'] : className + '-active';

      return { className: className, activeClassName: activeClassName };
    }, _this.registerNode = function (component) {
      _this.node = _reactDom2.default.findDOMNode(component); // eslint-disable-line react/no-find-dom-node
      if (_this.props.innerRef) {
        _this.props.innerRef(_this.node);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CSSTransition, [{
    key: 'removeClasses',
    value: function removeClasses(node, type) {
      var _getClassNames = this.getClassNames(type),
          className = _getClassNames.className,
          activeClassName = _getClassNames.activeClassName;

      if (className) {
        removeClass(node, className);
      }
      if (activeClassName) {
        removeClass(node, activeClassName);
      }
    }
  }, {
    key: 'reflowAndAddClass',
    value: function reflowAndAddClass(node, className) {
      // eslint-disable-line class-methods-use-this
      // This is for to force a repaint,
      // which is necessary in order to transition styles when adding a class name.
      /* eslint-disable no-unused-expressions */
      node.scrollTop;
      /* eslint-enable no-unused-expressions */
      addClass(node, className);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.in !== nextProps.in && this.node) {
        this.setState({
          transitionBounds: {
            height: this.node.clientHeight,
            width: this.node.clientWidth
          }
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          innerRef = _props.innerRef,
          classNames = _props.classNames,
          children = _props.children,
          rest = _objectWithoutProperties(_props, ['innerRef', 'classNames', 'children']);

      var transitionBounds = this.state.transitionBounds;


      return _react2.default.createElement(
        _NestedTransition2.default,
        _extends({}, rest, {
          onEnter: this.onEnter,
          onEntered: this.onEntered,
          onEntering: this.onEntering,
          onExit: this.onExit,
          onExiting: this.onExiting,
          onExited: this.onExited,
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 296
          }
        }),
        _react2.default.cloneElement(children, {
          transitionBounds: transitionBounds,
          innerRef: this.registerNode
        })
      );
    }
  }]);

  return CSSTransition;
}(_react2.default.Component);

CSSTransition.propTypes = propTypes;

exports.default = CSSTransition;