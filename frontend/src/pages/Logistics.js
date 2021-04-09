import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import MainContainer from '../components/containers/MainContainer.js';
import LogisticsContainer from '../components/containers/LogisticsContainer.js';
import InnerContainer from '../components/containers/InnerContainer.js';
import CustomRadioButton from '../components/CustomRadioButton.js';
import axios from "axios";

class Logistics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logs: [],
      currentPage: 0
    }

    this.initializeLogs = this.initializeLogs.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
  }

  componentDidMount() {
    this.initializeLogs();
  }

  initializeLogs() {
    const currPage = this.state.currentPage;
    axios.get(`/logs?pageNo=${currPage}&pageSize=20`)
    .then(res =>
      this.setState({
        logs: res.data, 
      }))
    .catch(err => console.log(err));
    }

  handleCategory(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const logCategory = form.get("logsDisplay");
    
    let url = `/logs/${logCategory}?pageNo=${this.state.currentPage}&pageSize=20`;

    if (logCategory === "all") {
      url = `/logs?pageNo=${this.state.currentPage}&pageSize=20`;
    }

    axios.get(url)
    .then(res =>
      this.setState({
        logs: res.data, 
      }))
    .catch(err => console.log(err));
  }

  handlePageChange(direction){
    console.log(direction)
    console.log(this.state.currentPage)
    if (direction === "+"){
      if (this.state.logs.length==0)
        return;
      this.setState({
        currentPage: this.state.currentPage+1
          })
      this.initializeLogs()
    }
    else{
      if (this.state.currentPage<1)
        return;
      this.setState({
        currentPage: this.state.currentPage-1
      })
      this.initializeLogs()
    }
  }

  render() {
    console.log(this.state.logs);

    let logsList = <div></div>;

    if (this.state.logs.length !== 0) {
      logsList = this.state.logs.map((entry, index) => {
        return (
          <LogEntry key={index}>{JSON.stringify(entry)}</LogEntry>
        );
      });
    }

    return (
        <LogisticsContainer title="Logistics">
            <LogContainer>
              <ChoicesContainer onSubmit={this.handleCategory}>
                <CustomRadioButton name="logsDisplay" value="inventory" >inventory</CustomRadioButton>
                <CustomRadioButton name="logsDisplay" value="manufacturing" >manufacturing</CustomRadioButton>
                <CustomRadioButton name="logsDisplay" value="accounting" >accounting</CustomRadioButton>
                <CustomRadioButton name="logsDisplay" value="all" defaultChecked={true} >all</CustomRadioButton>
                <button type="submit">display</button>
              </ChoicesContainer>
              {logsList}
              <button onClick={()=>this.handlePageChange("-")}>Back</button>
              <button onClick={()=>this.handlePageChange("+")}>Forward</button>
            </LogContainer>
            
        </LogisticsContainer>
        
    );
  }
}

//STYLED-COMPONENTS
const ChoicesContainer = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  background: #F9F9F9;
`

const LogEntry = styled.div`
  margin-bottom: 10px;
  font-family: 'Consolas';
  font-size: 10pt;
`

const LogContainer = styled(InnerContainer) `
  overflow-y: auto;
`

Logistics.propTypes = {
};

export default Logistics;