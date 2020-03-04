// TableauViz.jsx
// Tableau visualization component

import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {tableau} from 'tableau-api';


class TableauViz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inview: true,
    };

    this.handleGovernance = this.handleGovernance.bind(this);
  }

  render() {

    const vizContainerStyle = {
      width: (this.props.width) ? this.props.width : '100%',
      height:(this.props.height) ? this.props.height : '100%' ,
    }
    
    return (
  	<div className="ml-auto mr-auto" id={this.props.vizId} style={vizContainerStyle}></div>
    );
  }

  renderTableauViz(url){
    const vizContainer = document.getElementById(this.props.vizId);
    let options ={
      hideTabs: true,
      hideToolbar: true,
      device: 'desktop',
      width: '100%',
      height: '100%',
      onFirstInteractive: this.handleGovernance,
    }
    options = Object.assign({}, options, this.props.options);
    this.viz = new tableauSoftware.Viz(vizContainer, url, options);
  }

  updateDimensions(){
    //this.setState({
    //  width: 0.9*window.innerWidth,
    //  height: window.innerHeight - $('.navbar').outerHeight(),
   // });
  }
  
  handleGovernance() {
    let viz = this.viz;
    let worksheets;
    if (viz.getWorkbook().getActiveSheet().getSheetType() == "worksheet"){
      worksheets = [viz.getWorkbook().getActiveSheet()]
    } else {
      worksheets = viz.getWorkbook().getActiveSheet().getWorksheets();
    }
    let user = this.props.user;
    if (user && user.verified_email) {
      let userId = this.props.user._id;
      let roles = Roles.getRolesForUser(userId);
      if (roles.includes('All') || roles.includes('Admin')) {
	worksheets.forEach((sheet)=>{sheet.applyFilterAsync("Governance", "",  tableauSoftware.FilterUpdateType.ALL);})
      } else {
	worksheets.forEach((sheet)=>{sheet.applyFilterAsync("Governance", roles,  tableauSoftware.FilterUpdateType.ADD);})
      }
    } else {
      worksheets.forEach((sheet)=>{sheet.applyFilterAsync("Governance", ["State", "County"],  tableauSoftware.FilterUpdateType.REPLACE);})
    }
  }

  componentDidMount(){
    this.renderTableauViz(this.props.url);
    $('.tab-vizItems').css("display","none");
    this.viz.addEventListener("parametervaluechange", this.handleGovernance)
    //this.updateDimensions();
    //window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  
  componentDidUpdate(){
    $('.tab-vizItems').css("display","none");
    this.handleGovernance();
    //console.log(this.state.width, this.state.height);
   // console.log($('#vizContainer').outerWidth(), $('#vizContainer').outerHeight()) ;  
  }

  componentWillUnmount() {
    //window.removeEventListener("resize", this.updateDimensions.bind(this));
  }
  
}

export default withTracker(() => {
  return {
    user: Meteor.user(),
  };
})(TableauViz);

  
