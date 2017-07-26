/* eslint-disable react/prop-types, import/prefer-default-export */
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { coalesceProp } from './utils';

const defaults = {
  appear: true,
  exit: true,
  enter: true,
};

const transitionProps = [
  'appear',
  'exit',
  'enter',
];

function create(templateFunction, config = {}) {
  const templateFunctionWithTransition = (strings, ...values) => {
    const StyledComponent = templateFunction(strings, ...values);
    const attrs = Object.assign({}, StyledComponent.attrs);

    class StyledTransitionComponent extends TransitionGroup {}

    const resolveProp = prop => coalesceProp(prop, attrs, config, defaults);

    StyledTransitionComponent.defaultProps = {
      ...config,
      ...TransitionGroup.defaultProps,
      appear: resolveProp('appear'),
      enter: resolveProp('enter'),
      exit: resolveProp('exit'),
      component: StyledComponent,
    };

    if (StyledComponent.attrs) {
      StyledTransitionComponent.attrs = attrs;
      transitionProps.forEach((prop) => {
        delete StyledComponent.attrs[prop];
      });
    }

    const displayName = StyledComponent.displayName;

    StyledTransitionComponent.displayName = `Transition(${displayName})`;
    StyledTransitionComponent.styledComponentId = StyledComponent.styledComponentId;

    return StyledTransitionComponent;
  };

  return templateFunctionWithTransition;
}

export function injectStyledTransition(templateFunction) {
  const styledMethods = ['withConfig', 'attrs'];

  Object.assign(templateFunction, {
    transition(config) {
      const templateFunctionWithTransition = create(templateFunction, config);
      styledMethods.forEach((method) => {
        templateFunctionWithTransition[method] = (...args) =>
          create(templateFunction[method](...args), config);
      });
      return templateFunctionWithTransition;
    },
  });

  styledMethods.forEach((method) => {
    // eslint-disable-next-line no-param-reassign
    templateFunction.transition[method] = (...args) =>
      templateFunction.transition()[method](...args);
  });

  return templateFunction;
}
