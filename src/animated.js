/* eslint-disable react/prop-types */
import React from 'react';
import StyledCssTransition from './StyledCSSTransition';
import { coalesceProp } from './utils';

export const transitionStyleRegExp = /:((appear|enter|exit)(-active)?)/;
export const transitionStyleRegExpAll = new RegExp(transitionStyleRegExp, 'g');

const classPrefix = 'styled-transition-';

const defaults = {
  in: true,
  appear: true,
  exit: true,
  enter: true,
  timeout: 300,
  nestedTransition: false,
};

const animatedProps = [
  'nestedTransition',
  'appear',
  'exit',
  'enter',
  'timeout',
  'in',
  'onExit',
  'onExiting',
  'onExited',
  'onEnter',
  'onEntering',
  'onEntered',
];

function create(templateFunction, config = {}) {
  const templateFunctionWithAnimate = (strings, ...values) => {
    let hasTransitionStyle = false;
    const transitionStyle = part =>
      part.replace(transitionStyleRegExpAll, (...matches) => {
        hasTransitionStyle = true;
        return `.${classPrefix}${matches[1]}`;
      });
    const StyledComponent = templateFunction(strings.map(transitionStyle), ...values);
    const attrs = Object.assign({}, StyledComponent.attrs);

    if (!hasTransitionStyle) {
      return StyledComponent;
    }

    function StyledAnimateComponent(props) {
      const {
        in: transitionIn,
        timeout: transitionTimeout,
        nestedTransition,
        appear,
        onExit,
        onExiting,
        onExited,
        onEnter,
        onEntering,
        onEntered,
        enter,
        exit,
        className,
        ...rest
      } = props;

      const resolveProp = prop => coalesceProp(prop, props, attrs, config, defaults);

      return (
        <StyledCssTransition
          {...config}
          in={resolveProp('in')}
          timeout={resolveProp('timeout')}
          appear={resolveProp('appear')}
          nestedTransition={resolveProp('nestedTransition')}
          onExit={onExit}
          onExiting={onExiting}
          onExited={onExited}
          onEnter={onEnter}
          onEntering={onEntering}
          onEntered={onEntered}
          enter={resolveProp('enter')}
          exit={resolveProp('exit')}
          classNames={{
            appear: `${classPrefix}appear`,
            appearActive: `${classPrefix}appear-active`,
            enter: `${classPrefix}enter`,
            enterActive: `${classPrefix}enter-active`,
            exit: `${classPrefix}exit`,
            exitActive: `${classPrefix}exit-active`,
          }}
        >
          <StyledComponent {...rest} />
        </StyledCssTransition>
      );
    }

    if (StyledComponent.attrs) {
      StyledAnimateComponent.attrs = attrs;
      animatedProps.forEach((prop) => {
        delete StyledComponent.attrs[prop];
      });
    }

    const displayName = StyledComponent.displayName;

    StyledAnimateComponent.displayName = `Animated(${displayName})`;
    StyledAnimateComponent.styledComponentId = StyledComponent.styledComponentId;

    return StyledAnimateComponent;
  };

  return templateFunctionWithAnimate;
}

export function injectStyledAnimate(templateFunction) {
  const styledMethods = ['withConfig', 'attrs'];

  Object.assign(templateFunction, {
    animated(config) {
      const templateFunctionWithAnimate = create(templateFunction, config);
      styledMethods.forEach((method) => {
        templateFunctionWithAnimate[method] = (...args) =>
          create(templateFunction[method](...args), config);
      });
      return templateFunctionWithAnimate;
    },
  });

  styledMethods.forEach((method) => {
    // eslint-disable-next-line no-param-reassign
    templateFunction.animated[method] = (...args) =>
      templateFunction.animated()[method](...args);
  });

  return templateFunction;
}
