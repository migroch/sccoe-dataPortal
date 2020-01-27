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
  
  handleClick(event) {
    event.preventDefault();
  }
  
  componentDidMount(){
    this.renderTableauViz(this.props.url);
    $('.tab-vizItems').css("display","none");
    //this.updateDimensions();
    //window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  
  componentDidUpdate(){
    $('.tab-vizItems').css("display","none");
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

  
