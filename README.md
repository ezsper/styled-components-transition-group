# styled-components-transition-group
A simple example of how styled-components could implement react-transition-group (based on issue [#1036](https://github.com/styled-components/styled-components/issues/1036)) to solve transitions.

```
import styled from 'styled-components-transition-group';

// transition() wraps TransitionGroup
const List = styled.div.transition() ``;

// animated() wraps CSSTransition
const ListItem = styled.div.animated() `
  transition: opacity 300ms cubic-bezier(0.4, 0.0, 0.2, 1) 0ms;

  &:appear, &:enter, &:exit {
    opacity: 0;
  }
  &:appear-active, &:enter-active {
    opacity: 1;
  }
`;
```

Launch storybook for a working example of this proposition.

![storybook](https://user-images.githubusercontent.com/798804/28619716-1e739c46-71e0-11e7-97b7-cfab48a1339b.gif)
