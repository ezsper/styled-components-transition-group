import React from 'react';
import PropTypes from 'prop-types';
import styled from '../src';

const duration = 400; // default 300

function createTransition(duration) { // eslint-disable-line no-shadow
  return () => `all ${duration}ms cubic-bezier(0.4, 0.0, 0.2, 1) 0ms`;
}

const Inner = styled.div `
  transition: ${createTransition(duration)};
  display: inline-block;
  opacity: 1;
`;

const Outer = styled.div.animated({ timeout: duration }) `
  transition: ${createTransition(duration)};
  max-height: 30px;
  overflow: hidden;

  &:appear, &:enter, &:exit {
    max-height: 0px;
  }

  &:appear > ${Inner} {
    background-color: red;
  }

  &:appear-active > ${Inner} {
    background-color: red;
  }

  &:appear > ${Inner}, &:enter > ${Inner} {
    transform: scale(0.8);
    opacity: 0;
    background-color: red;
  }

  &:appear-active > ${Inner}, &:enter-active > ${Inner} {
    transform: scale(1);
    opacity: 1;
    background-color: green;
  }

  &:exit > ${Inner} {
    transform: scale(0.8);
    opacity: 0;
  }
`;

export default function ListItem(props) {
  const {
    children,
    in: transitionIn,
    appear,
    enter,
    exit,
    onExited,
    ...rest
  } = props;

  const transitionProps = {
    in: transitionIn,
    appear,
    enter,
    exit,
    onExited,
  };

  return (
    <Outer {...transitionProps} {...rest}>
      <Inner>
        {children}
      </Inner>
    </Outer>
  );
}

ListItem.propTypes = {
  children: PropTypes.node,
  in: PropTypes.bool,
  appear: PropTypes.bool,
  enter: PropTypes.bool,
  exit: PropTypes.bool,
  onExited: PropTypes.func,
};
