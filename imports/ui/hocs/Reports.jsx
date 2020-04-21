// Reports.jsx
// Reports showcae component

import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import reports from '../../api/reports';
import permissions_data from '../../data/permissions_data.js';

import ChksLGBTreport from '../reusable/ChksLGBTreport.jsx'
import ChksOverviewReport from '../reusable/ChksOverviewReport.jsx'

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
	      {/* <h5 className="pb-2 pt-2 text-center">Visualization layouts designed for printing.</h5> */}
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
    if (index % 2 == 0){
      return(
	<div id={report.key} key={index} className="media d-flex bg-light scrollspy m-2 ml-auto mr-auto" style={{"width":"93%"}}>
	  <img src={report.image} alt={report.short_title+" Image"} className="mr-3 ml-2 img-fluid" width="20%"></img>	    
	  <div className="media-body mt-auto mb-auto  mr-3 ml-3">
	    <h5 className="mt-0">{report.title}</h5>
	    <p className="text-justify" dangerouslySetInnerHTML={{ __html: report.caption }}></p>
	    <button className="btn btn-primary ml-auto mr-auto" data-report={report.key} onClick={this.openReport}>Open Report</button>
	  </div>
	</div>
      )
    } else {
      return(
	<div id={report.key} key={index} className="media d-flex bg-light scrollspy m-2 ml-auto mr-auto" style={{"width":"93%"}}>
	  <div className="media-body mt-auto mb-auto mr-3 ml-3">
	    <h5 className="mt-0">{report.title}</h5>
	    <p className="text-justify" dangerouslySetInnerHTML={{ __html: report.caption }}></p>
	    <button className="btn btn-primary ml-auto mr-auto" data-report={report.key} onClick={this.openReport}>Open Report</button>
	  </div>
	  <img src={report.image} alt={report.short_title+" Image"} className="mr-3 ml-3 img-fluid" width="20%"></img>	    
	</div>
      )
    }
  }

  openedReport(report, index){
    if (report.key == "CHKSLGBT")  {
      return (
	<ChksLGBTreport key={index} user={this.props.user} report={report} index={index} closeReport={this.closeReport} />
      ); 
    } else if (report.key == "CHKS") {
      return(
	<ChksOverviewReport key={index} user={this.props.user} report={report} index={index} closeReport={this.closeReport} />
      );
    }
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

