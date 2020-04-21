// ChksOverviewReport.jsx
// Component to show the CHKS Overview Report

import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import reports from '../../api/reports';
import permissions_data from '../../data/permissions_data.js';

import {tableau} from 'tableau-api';
import TableauViz  from '../reusable/TableauViz.jsx';

class ChksOverviewReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight - $('.navbar').outerHeight(),
    };

    
  }

  render() {

    const { user, report, index, closeReport } = this.props;
    
    return (
      <div  id={report.key} key={index} className="container-fluid pt-2 pb-2 bg-light scrollspy ml-2 mr-3">
	<button type="button"  className="close"  aria-label="Close" onClick={closeReport}> <span aria-hidden="true">&times;</span></button>
	<h3 className="">{report.title}</h3>
	<p className="text-justify" dangerouslySetInnerHTML={{ __html: report.caption }}></p>
	<ol>
	  <li><p className="mb-0">Click on any of the links below to open a single PDF file in a new tab. <span className="text-danger">Reports showing district data are available after signing in with a district domain email or another authorized email</span>.</p>
	  </li>
	  <li>
	    <p className="mb-0">Use the checkboxes to select multiple files and download them at once with the "Download Selection" button.</p>
	  </li>
	</ol>

	<div className="p-2 container ml-auto mr-auto">
	  {this.makeFileList(report)}
	</div>
	
	<div className="container-fluid">
	  <div className="d-flex justify-content-center m-2">
	    <button className="btn btn-primary m-1 " onClick={closeReport}>Close Report</button>
	    <button className="btn btn-danger m-1" onClick={this.handleDownload}>Download Selection</button>
	  </div>
	</div>
      </div>
    );
    
  }


  makeFileList(report){
    let user = this.props.user;
    //let districts_keys = Object.keys(permissions_data).filter( (key) => !["Admin", "All", "County","BonnyDoon",'HappyValley', 'Mountain', 'Pacific', 'SantaCruzCityE' ].includes(key) )
    let fileList = Object.keys(report.fileList);
    let roles = []
    let userId 
    
    if (user && user.verified_email) {
      userId = this.props.user._id;
      roles = Roles.getRolesForUser(userId);
    }
    
    if (roles.length == 0)  fileList = fileList.slice(0,2)
    
    return(
      fileList.map((key, index)=>{
	let displayName = key;
	let path = report.fileList[key];
	
	return (
	  <div key={index} className="form-check">
	    <input className="form-check-input" type="checkbox" value={path} id={"CHKSovFileCheckbox"+index} />
	    <label className="form-check-label" htmlFor={"CHKSovFileCheckbox"+index}>
	      <a href={path} target="_blank">{displayName}</a>
	    </label>
	  </div>
	)
      }))
  } 	
  

  handleDownload(){
    $(".form-check-input").filter(function(){return this.checked}).each(function(){
      let link = document.createElement('a');
      link.href = this.value;
      link.download = this.value.split('/').slice(-1)[0];
      link.dispatchEvent(new MouseEvent('click'));
      });
  }

  updateDimensions(){
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight - $('.navbar').outerHeight(),
    });
  }

  componentDidMount(){
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }
  
}

export default ChksOverviewReport;

