import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import MainContainer from '../components/containers/MainContainer.js';
import GradientButton from "../components/GradientButton.js"
import CustomDropdown from "../components/CustomDropdown";
import CustomRadioButton from "../components/CustomRadioButton";
import axios from "axios";

class Reports extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cloudReports: [],
    }

    this.initializeCloudReports = this.initializeCloudReports.bind(this);
  }

  componentDidMount() {
    this.initializeCloudReports();
  }

  initializeCloudReports() {
    axios.get('/files')
    .then(res =>
      this.setState({
        cloudReports: res.data, 
      }))
    .catch(err => console.log(err));
  }

  downloadDocument(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const documentID = form.get("docToDownload");

    axios({
      url: `/download/${documentID}`, //your url
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
       const url = window.URL.createObjectURL(new Blob([response.data]));
       const link = document.createElement('a');
       link.href = url;
       link.setAttribute('download', 'file.pdf');
       document.body.appendChild(link);
       link.click();
    });
  }

  uploadDocument(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const filePath = form.get("fileToUpload");

    console.log(filePath);

    form.append('file', filePath);

    axios.post("/upload", form, { // receive two parameter endpoint url ,form data 
      })
    .then(res => { // then print response status
      console.log(res.statusText)
    })
  }

  generateDocument(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const documentType = form.get("documentType");
    const documentFormat = form.get("documentFormat");

    console.log(`/${documentType}/report/${documentFormat}`);
    
    axios({
      url: `/${documentType}/report/${documentFormat}`, //your url
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
       const url = window.URL.createObjectURL(new Blob([response.data]));
       const link = document.createElement('a');
       link.href = url;

       let file = `file.${documentFormat}`
       link.setAttribute('download', file);
       document.body.appendChild(link);
       link.click();
    });
  }

  render() {
    let reportsOptions = <option>No files found</option>;

    if (this.state.cloudReports.length !== 0) {
      reportsOptions = this.state.cloudReports.map((report, index) => {
        return (
          <option key={index} id={report.name} value={report.id}>{report.name}</option>
        );
      });
    }

    return (
      <Container>
        <MainContainer title="Quality Data">
            
        </MainContainer>
        <ReportsContainer>
          <TopContainer>
            <Report title="Download">
              <DocumentForm onSubmit={this.downloadDocument}>
                <div>
                  <Caption>Select the document you wish to download from the cloud.</Caption>
                  <CustomDropdown key="docToDownload" dropdownName="docToDownload" dropddownID="docToDownload">
                    {reportsOptions}
                  </CustomDropdown>
                </div>
                <GradientButton type="submit" buttonValue="download document"/>
              </DocumentForm>
            </Report>
            <Report title="Upload">
              <DocumentForm onSubmit={this.uploadDocument}>
                <div>
                  <Caption>Choose the file you wish to upload to the cloud.</Caption>
                  <input type="file" name="fileToUpload"/>
                </div>
                <GradientButton GradientButton type="submit" buttonValue="upload document"/>
              </DocumentForm>
            </Report>
          </TopContainer>
          <Report title="Generate">
            <DocumentForm onSubmit={this.generateDocument}>
              <div>
                <Caption>Generate an updated document directly from the records.</Caption>
                <Title>Document Type</Title>
                <CustomRadioButton value="ledger" name="documentType" defaultChecked={true}>Ledger (all)</CustomRadioButton>
                <CustomRadioButton value="SaleOrders" name="documentType">Sale Orders</CustomRadioButton>
                <CustomRadioButton value="PurchaseOrders" name="documentType">Purchase Orders</CustomRadioButton>
                
                <Title>Document Format</Title>
                <CustomRadioButton value="pdf" name="documentFormat" defaultChecked={true}>PDF</CustomRadioButton>
                <CustomRadioButton value="csv" name="documentFormat">CSV</CustomRadioButton>
              </div>
              <GradientButton GradientButton type="submit" buttonValue="generate document"/>
            </DocumentForm>
          </Report>
        </ReportsContainer>
      </Container>
    );
  }
}

//STYLED-COMPONENTS
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-contents: space-between;
  height: 100%;

  & > div:nth-child(2) {
    margin-left: 20px;
  }

  & > div {
    flex: 1;
  }
`

const ReportsContainer = styled.div`
  display: flex;
  flex-direction: column;

  & > div:nth-child(2) {
    margin-top: 20px;
    width: calc(100% - 40px);
  }

  & > div {
    flex: 1;
  }
`

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;

  & > div {
    flex: 1;
  }

  & > div:nth-child(2) {
    margin-left: 20px;
  }
`

const Report = styled(MainContainer)`
  & > div {
    display: flex;
    justify-content: space-between;
    background: red;
  }
`

const Title = styled.div`
  margin-top: 20px;
  font-size: 10pt;
  color: black;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-weight: 500;
`

const Caption = styled.div`
  margin-bottom: 10px;
`

const DocumentForm = styled.form`
  display: flex;
  flex-direction: column;
  height: calc(100% - 20px);
  justify-content: space-between;
  margin-top: 20px;
`

Reports.propTypes = {
};

export default Reports;
