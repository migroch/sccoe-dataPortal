// Reports.jsx
// Reports showcae component

import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import reports from '../../api/reports';

import {tableau} from 'tableau-api';
import TableauViz  from '../reusable/TableauViz.jsx';

class Reports extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: window.innerWidth,
      height: window.innerHeight - $('.navbar').outerHeight(),
    };

    
  }

  render() {

    const containerStyle = {
      width: this.state.width,
      //height: this.state.height,
      height:"auto"
    }

    const { user, loading, visualizationsExists, visualizations } = this.props;

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
	<div id="Reports" className="scrollspy container-fluid pt-1" style={containerStyle}>
	  <div className="container-fluid text-center bg-light pb-1"><h2 className="m-auto text-primary">Reports</h2></div>

	</div>
      );
    }
  }

  handleClick(event) {
    event.preventDefault();
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

