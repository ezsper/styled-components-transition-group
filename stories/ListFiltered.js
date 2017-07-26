import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '../src';
import List from './List';
import ListItem from './ListItem';

const Root = styled.div ``;
const Input = styled.input ``;

const defaultRenderItem = item => (
  <ListItem key={item.label}>
    {item.label}
  </ListItem>
);

const defaultFilter = (item, value) =>
  item.label.toLowerCase().includes(value.toLowerCase());

export default class ListFiltered extends Component {

  static propTypes = {
    children: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
      }),
    ),
    renderItem: PropTypes.func,
    filter: PropTypes.func,
  }

  static defaultProps = {
    renderItem: defaultRenderItem,
    filter: defaultFilter,
  }

  state = {
    value: '',
  };

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ value });
  }

  render() {
    const {
      children,
      filter,
      renderItem,
    } = this.props;

    const filteredChildren = [];
    children.forEach((child) => {
      if (filter(child, this.state.value)) {
        filteredChildren.push(renderItem(child));
      }
    });

    return (
      <Root>
        <Input
          value={this.state.value}
          onChange={this.handleChange}
        />
        <List>
          {filteredChildren}
        </List>
      </Root>
    );
  }
}
