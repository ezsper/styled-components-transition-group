import {
  css as styledCSS,
} from 'styled-components';
import { transitionStyleRegExp } from './animated';

export default function css(strings, ...values) {
  const stylesheet = styledCSS(strings, ...values);
  if (transitionStyleRegExp.test(stylesheet)) {
    // eslint-disable-next-line no-console
    console.error(new Error('Using transition style out of animated'));
  }
  return stylesheet;
}
