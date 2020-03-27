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
      )
    }else{
      return (
	<div id="Visualizations" className="scrollspy container-fluid pt-2 bg-light" style={containerStyle}>
	  <div className="container-fluid bg-light pb-2">
	    <h2 className="m-auto text-primary text-center">Visualizations</h2>
	    <h5 className="">Below you can find a set of dashboards and charts that we have created to explore education related datasets for Santa Cruz County and its school districts.</h5>
	  </div>
	  <div className='row'>
	    {this.makeCategoryList(visualizations)}
	  </div>
	  {this.makeVizModal(this.state.selectedViz)}
	</div>
      );
    }
  }

  makeCategoryList(visualizations){
    return(     
      visualizations.map((category, index) => {
	let colsize = category.vizs.length*3;
	colsize = colsize.toString();
	let title = (colsize > 3) ? category.category_title : category.category_short_title
	return(
	  <div id={category.category_key} key={index} className={"pt-1 scrollspy  col-md-"+colsize}>
	    <div className="container-fluid bg-white text-center">
	      <h5>{title}</h5>
	    </div>
	    <div className="row  p-1">
	      {this.makeVizList(category.vizs)}
	    </div>
	  </div>
	)})
    )
  }

  makeVizList(vizs){
    let colsize = Math.floor(12/vizs.length);
    colsize = colsize.toString();
    return(
      vizs.map((viz, index) => {
	return(
	  <div key={index} className={"card pb-3 text-wrap mh-25 max-vh-25 col-md-"+colsize}>
	    <a href="" id={viz.key+"Button"} role="button" onClick={this.openViz} data-vizkey={viz.key} data-toggle="modal" data-target="#vizModal">
	      <h6 className="card-title text-center pt-3">{viz.title}</h6>
	      <img  src={viz.image} alt={viz.short_title+' Image'} className="img-fluid img-thumbnail max-vh-25"></img>
	      <p className="card-text text-body">{viz.caption}</p>
	    </a>
	  </div>
	)})
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
    let vizUrlRestricted =  (selectedViz) ? selectedViz.vizurl_restricted : null ;
    let vizOptions = (selectedViz) ? selectedViz.options : null ;
    let viz = null
    if (vizUrl){
      
      viz = (<TableauViz vizId='VisualizationsModalViz' url={vizUrl} url_restricted={vizUrlRestricted} options={vizOptions} />)
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
    if (!this.props.loading){
      $("#vizModal" ).on('hide.bs.modal', this.closeViz);
    //let openViz = this.openViz;
      //$('#VisualizationsSubMenu').children().each((index, link)=>{ $(link).on("click", openViz) });
    }
  }
  
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
    //this.closeViz();
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


  
