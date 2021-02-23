import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import InnerContainer from '../components/containers/InnerContainer.js';
import MainContainer from '../components/containers/MainContainer.js';
import FieldContainer from '../components/containers/FieldContainer.js';
import GradientButton from '../components/GradientButton';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <MainContainer title="Login">
            <InnerContainer title="User">
                <LoginForm action="">
                    <div>
                        <FieldContainer>
                            <TextInput type="email" id="email" name="email" placeholder="email" />
                        </FieldContainer>
                        <FieldContainer>
                            <TextInput type="password" id="password" name="password" placeholder="password" />
                        </FieldContainer>
                
                    </div>
                    <GradientButton type="submit" buttonValue="Login" />
                </LoginForm>
            </InnerContainer>
        </MainContainer>
    );
  }
}

//STYLED-COMPONENTS

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    height: calc(100% - 20px);
    justify-content: space-between;
`

const TextInput = styled.input`
    border: 0;
    font-family: Montserrat;
    font-size: 9pt;
    color: #556C99;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-weight: 500;
    margin: 8px;
    width: 400px;

    &:focus {
        outline: none;
    }

    ::placeholder {
        color: #BBC8E3;
    }
`
const Title = styled.div`
    font-family: Montserrat;
    font-size: 10pt;
    color: black;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-weight: 500;
    margin-top: 20px;
`

Login.propTypes = {
    // innerTitle: PropTypes.string.isRequired,
    // mainTitle: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
};

export default Login;
