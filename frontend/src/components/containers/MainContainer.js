import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';

class MainContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Container>
          <Header>
            <Title>{this.props.title}</Title>
            <button isVisible={this.props.createFeature}><AddIcon /></button>
          </Header>
          {this.props.children}
        </Container>
    );
  }
}

//STYLED-COMPONENTS
const Container = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  height: calc(100% - 40px);
  box-shadow: 0 0 30px 0 rgba(43, 64, 104, 0.1);

  button {
    background-color: transparent;
    background-repeat: no-repeat;
    border: none;
    cursor: pointer;
    overflow: hidden;
    outline: none;
    color: #FF7A67;;
    transition: 250ms;
    padding: 0;

    &:hover, &::selection {
      color: #BBC8E3;
    }

    svg {
      width: 1.2em;
      height: 1.2em;
    }
}
`

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Title = styled.div`
    font-family: Montserrat;
    font-size: 12pt;
    color: black;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-weight: 500;
`

MainContainer.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    createFeature: PropTypes.bool.isRequired,
};

export default MainContainer;
