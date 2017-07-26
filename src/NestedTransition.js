import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';

const transitionGroupProp = PropTypes.shape({
  isMounting: PropTypes.bool,
});

export default class NestedTransition extends Transition {

  static propTypes = {
    ...Transition.propTypes,
    nestedTransition: PropTypes.bool,
  }

  static contextTypes = {
    transitionGroup: transitionGroupProp,
    nestedTransition: transitionGroupProp,
  };

  static childContextTypes = {
    transitionGroup: transitionGroupProp,
    nestedTransition: transitionGroupProp,
  };

  getChildContext() {
    let transitionGroup;
    if (this.props.nestedTransition) {
      transitionGroup = this.context.nestedTransition
        ? this.context.nestedTransition
        : this.context.transitionGroup;
    } else {
      transitionGroup = { isMounting: null };
    }
    return {
      transitionGroup,
      nestedTransition: {
        isMounting: !this.appeared,
      },
    };
  }

  componentDidMount() {
    super.componentDidMount();
    this.appeared = true;
  }

}
