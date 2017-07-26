# styled-components-transition-group
A simple example of how styled-components should be using react-transition-group

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

Lunch storybook for the following example.

![storybook](https://user-images.githubusercontent.com/798804/28619716-1e739c46-71e0-11e7-97b7-cfab48a1339b.gif)
