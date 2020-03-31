// Reports.jsx
// Reports showcae component

import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import reports from '../../api/reports';
import permissions_data from '../../data/permissions_data.js';

import {tableau} from 'tableau-api';
import TableauViz  from '../reusable/TableauViz.jsx';

class Reports extends Component {
  constructor(props) {
    super(props);

    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight - $('.navbar').outerHeight(),
      selectedReport: {}
    };
    
    this.openReport = this.openReport.bind(this);
    this.closeReport = this.closeReport.bind(this);
  }

  render() {

    const containerStyle = {
      width: this.state.windowWidth,
      //height: this.state.height,
      height:"auto"
    }

    const { user, loading, reportsExists, reports } = this.props;

    if(loading){
      return(
	<div className="d-flex justify-content-center text-primary">
	  <div className="spinner-border" role="status">
	    <span className="sr-only">Loading...</span>
	  </div>
	</div>
      );
    } else {
      return (
	<div id="Reports" className="scrollspy container-fluid pt-2" style={containerStyle}>
	  <div className="container-fluid  pb-2">
	    <div className="m-auto">
	      <h2 className=" text-primary text-center pt-5">Reports</h2>
	      <h5 className="pb-2 pt-2 text-center">Viisualization layouts designed for printing.</h5>
	    </div>
	    <div className='row'>
	      {this.makeReportsList(reports)}
	    </div>
	  </div>
	</div>
      );
    }
  }

  makeReportsList(reports){
    let selectedReport = null;
    if (this.state.selectedReport) selectedReport = this.state.selectedReport.key;
    return(
      reports.map((report, index)=>{
	if (report.key == selectedReport){
	  return(this.openedReport(report, index))
	} else {
	  return(this.closedReport(report, index))
	}
     })
    );
  }

  closedReport(report, index){
    return(
      <div id={report.key} key={index} className="media d-flex bg-light scrollspy m-2">
	<img src={report.image} alt={report.short_title+" Image"} className="mr-3 img-fluid" width="20%"></img>
	<div className="media-body mt-auto mb-auto">
	  <h5 className="mt-0">{report.title}</h5>
	  <p className="text-justify mr-3" dangerouslySetInnerHTML={{ __html: report.caption }}></p>
	  <button className="btn btn-primary ml-auto mr-auto" data-report={report.key} onClick={this.openReport}>Open Report</button>
	</div>
      </div>
      )
  }

  openedReport(report, index){
    return(
      <div  id={report.key} key={index} className="container-fluid pt-2 pb-2 bg-light scrollspy ml-2 mr-3">
	<button type="button"  className="close"  aria-label="Close" onClick={this.closeReport}> <span aria-hidden="true">&times;</span></button>
	<h3 className="">{report.title}</h3>
	<p className="text-justify" dangerouslySetInnerHTML={{ __html: report.caption }}></p>
	<ol>
	  <li><p className="mb-0">Select a school or district to to compare against county results. <span className="text-danger">Reports showing district data are available after login with a district domain email or another authorized email</span>.</p>
	    <div className="d-flex p-2 container justify-content-center">
	      {this.makeDistrictSelector()}
	    </div>
	  </li>
	  <li><p>Click on any of the questions in the report to see the 3-year trend for that question at the bottom of the page. If you don't want the selected question to appear highlighted in your download image click on the question once it rendered and before.</p></li>
	  <li><p><strong>If the view goes blank wait a couple seconds</strong>, this view can take a few secods to render at first and after each interaction.</p></li>
	  <li>
	    <p className="mb-0">Click on the download pdf button and follow the instructions on the export dialog.</p>
	    <div className="d-flex p-2 container justify-content-center">
	      <button className="btn btn-danger m-1" onClick={this.handleDownload}>Download PDF</button>
	    </div>
	  </li>
	</ol>

	
	<div className="d-flex ml-auto mr-auto" style={{width:0.93*this.state.windowWidth, height:report.size.height}}>
	  <TableauViz vizId={'ReportViz'+report.key} url={report.vizUrl_print} options={report.options} />
	</div>
	<div className="container-fluid">
	  <div className="d-flex justify-content-center m-2">
	    <button className="btn btn-primary m-1 " onClick={this.closeReport}>Close Report</button>
	    <button className="btn btn-danger m-1" onClick={this.handleDownload}>Download PDF</button>
	  </div>
	</div>
      </div>
    )
  }

  makeDistrictSelector(){
    let districtList = this.makeDistrictList()
    return(
      <div className="dropdown">
	<button className="btn btn-light dropdown-toggle m-1 border border-dark" type="button" id="districtsDropDown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	  Select District
	</button>
	<div className="dropdown-menu" aria-labelledby="districtsDropDown">
	  <button className="dropdown-item active" type="button" data-key="County" onClick={this.handleDistrictSelection}>Santa Cruz County</button>
	  {districtList}
	</div>
      </div>
    )
  }

  makeDistrictList(){
    let user = this.props.user
    let districts_keys = Object.keys(permissions_data).filter( (key) => !["Admin", "All", "County","BonnyDoon",'HappyValley', 'Mountain', 'Pacific', 'SantaCruzCityE' ].includes(key) )

    if (user && user.verified_email) {
      let userId = this.props.user._id;
      let roles = Roles.getRolesForUser(userId);
      return(
	districts_keys.map((key, index)=>{
	  let displayName = permissions_data[key].displayName;
	  if (roles.includes('All') || roles.includes('Admin')) {
	    return (<button key={index} className="dropdown-item" type="button" data-key={key} onClick={this.handleDistrictSelection}>{displayName}</button>)
	  } else {
	    if (roles.includes(key)) return (<button key={index} className="dropdown-item" type="button" data-key={key} onClick={this.handleDistrictSelection}>{displayName}</button>)
	  }
	}))
    } 
  }

  handleDistrictSelection(event) {
    let target = event.target;
    let key = $(target).data('key');
    let district = $(target).html();
    let vizs = tableauSoftware.VizManager.getVizs();
    let viz = vizs.find((viz) => viz.getParentElement().id.includes('ReportViz'));
    let  worksheets = viz.getWorkbook().getActiveSheet().getWorksheets();
    
    worksheets.forEach((sheet)=>{
      if (!sheet.getName().includes("County")){
	sheet.applyFilterAsync("Institution", [ "Santa Cruz County", district],  tableauSoftware.FilterUpdateType.REPLACE);
      }
    });
    $(target).siblings().each( (i,s) => $(s).removeClass('active'))
    $(target).addClass('active')
  }

  handleDownload(){
    let vizs = tableauSoftware.VizManager.getVizs();
    let viz = vizs.find((viz) => viz.getParentElement().id.includes('ReportViz'));
    viz.showExportPDFDialog();
  }
  
  openReport(event){
    let target = event.target;
    let report_key = $(target).data('report');
    let report = this.props.reports.find((report)=>report.key==report_key)
    this.setState({selectedReport: report})
  }
  
  closeReport(){
    this.setState({selectedReport: {}})
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

export default withTracker(() => {
  const user = Meteor.user();
  const reportsHandle = Meteor.subscribe('reports');
  const loading = !reportsHandle.ready();
  const reports_fetch = reports.find({}, { sort: { createdAt: -1 } }).fetch();
  const reportsExists = !loading && !!reports;
  return {
    user,
    loading,
    reportsExists,   
    reports: reportsExists ? reports_fetch : {}
  };
})(Reports);

