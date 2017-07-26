import styled from 'styled-components';
import domElements from 'styled-components/lib/utils/domElements';
import { injectStyledAnimate } from './animated';
import { injectStyledTransition } from './transition';

export default function styled2(MyComponent) {
  return injectStyledTransition(injectStyledAnimate(styled(MyComponent)));
}

domElements.forEach((domElement) => {
  styled2[domElement] = injectStyledTransition(injectStyledAnimate(styled[domElement]));
});
