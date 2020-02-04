// Visualizations.jsx
// Visualizations list component

import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import visualizations from '../../api/visualizations';

import {tableau} from 'tableau-api';
import TableauViz  from '../reusable/TableauViz.jsx';

class Visualizations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedViz: {},
      width: window.innerWidth,
      height: window.innerHeight - $('.navbar').outerHeight(),
    };

    this.makeCategoryList = this.makeCategoryList.bind(this);
    this.makeVizList = this.makeVizList.bind(this);
    this.makeVizModal = this.makeVizModal.bind(this);
    this.openViz = this.openViz.bind(this);
    this.closeViz = this.closeViz.bind(this);
  }

  render() {
    
    const containerStyle = {
      width: this.state.width,
      height: this.state.height,
    }

    const { user, loading, visualizationsExists, visualizations } = this.props;

    if(loading){
      return(
	<div className="d-flex justify-content-center text-primary">
	  <div className="spinner-border" role="status">
	    <span className="sr-only">Loading...</span>
	  </div>
	</div>
      )
    }else{
      return (
	<div id="Visualizations" className="scrollspy container-fluid pt-1" style={containerStyle}>
	  <div className="container-fluid text-center bg-light pb-1"><h2 className="m-auto text-primary">Charts and Dashboards</h2></div>
	  {this.makeCategoryList(visualizations)}
	  {this.makeVizModal(this.state.selectedViz)}
	</div>
      );
    }
  }

  makeCategoryList(visualizations){
    return(
      visualizations.map((category, index) => {
	return(
	  <div id={category.category_key} key={index} className="pt-1 scrollspy text-center">
	    <h5 className="">{category.category_title}</h5>
	    <div className="row justify-content-center p-1">
	      {this.makeVizList(category.vizs)}
	    </div>
	  </div>
	  )
      })
    )
  }

  makeVizList(visualizations){
    return(
      visualizations.map((visualization, index) => {
	return(
	  <div key={index} className="col-md-3 text-wrap mh-25">
	    <a href="" id={visualization.key+"Button"} role="button" onClick={this.openViz} data-vizkey={visualization.key} data-toggle="modal" data-target="#vizModal">
	      <img  src={visualization.image} alt={visualization.short_title+' Image'} className="img-fluid img-thumbnail max-vh-25"></img>
	      <h6 className="text-center">{visualization.title}</h6>
	    </a>
	  </div>
	)
      })
    )
  }
 
  openViz(event) {
    let target = event.target;
    let vizKey = $(target).parent().data('vizkey');  
    if (!vizKey){    // openViz() called from links in nav menu
      vizKey = $(target).data('vizkey');
      $("#"+vizKey+"Button").click();
    }
    let visualization = ""
    this.props.visualizations.forEach((category) =>{
      let viz = category.vizs.find((viz)=>viz.key==vizKey);
      if (viz) visualization = viz;
    } );
    this.setState({selectedViz: visualization});
   }

  closeViz(){
    if (this.state.selectedViz.title){
      let vizs = tableauSoftware.VizManager.getVizs();
      let viz = vizs.find((viz) => viz.getParentElement().id == 'VisualizationsModalViz');
      viz.dispose();
      this.setState({selectedViz: {}});
    }
  }

  makeVizModal(selectedViz){
    let vizTitle = (selectedViz) ?  selectedViz.title : 'No viz selected';
    let vizUrl = (selectedViz) ? selectedViz.vizurl : null ;
    let viz = null
    if (vizUrl){
      viz = (<TableauViz vizId='VisualizationsModalViz' url={vizUrl} />)
    }
    return(
      <div id="vizModal" className="modal fade p-0"  tabIndex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
	<div id="vizModalDialog" className="modal-dialog" role="document" style={{maxWidth:'98vw', height:'98vh'}}>
	  <div className="modal-content h-100 w-100">
	    <div className="modal-header align-items-center">
	      <img className="rounded-circle pr-2" style={{ width:'4em', height: 'auto'}} alt="Santa Cruz COE Logo" src="SCCOE_Logo_Color.png"/>
	      <h5 className="modal-title" id="ModalLabel">{vizTitle}</h5>
	      <button  id="closeVizModal" type="button"  className="close" data-dismiss="modal" aria-label="Close">
		<span aria-hidden="true">&times;</span>
	      </button>
	    </div>
	    <div id="vizModalBody" className="modal-body">
	      {viz} 
	    </div>
	  </div>
	</div>
      </div>
    )
  }
  
  updateDimensions(){
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight - $('.navbar').outerHeight(),
    });
  }

  componentDidMount(){
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentDidUpdate(){
    $("#vizModal" ).on('hide.bs.modal', this.closeViz);
    //let openViz = this.openViz;
    //$('#VisualizationsSubMenu').children().each((index, link)=>{ $(link).on("click", openViz) });
  }
  
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
    this.closeViz();
  }
  
}

export default withTracker(() => {
  const user = Meteor.user();
  const visualizationsHandle = Meteor.subscribe('visualizations');
  const loading = !visualizationsHandle.ready();
  const visualizations_fetch = visualizations.find({}, { sort: { createdAt: -1 } }).fetch();
  const visualizationsExists = !loading && !!visualizations;
  return {
    user,
    loading,
    visualizationsExists,   
    visualizations: visualizationsExists ? visualizations_fetch : {}
  };
})(Visualizations);


  
