// HighLights.jsx
// Highlights carousel component

import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import highlights from '../../api/highlights';

import {tableau} from 'tableau-api';
import TableauViz  from '../reusable/TableauViz.jsx';

import styled from 'styled-components';
import {Play} from 'styled-icons/feather/Play';
import {Pause} from 'styled-icons/feather/Pause';
import {NavigateBefore} from 'styled-icons/material/NavigateBefore';
import {NavigateNext} from 'styled-icons/material/NavigateNext';
import {ArrowForward} from 'styled-icons/typicons/ArrowForward';

const StyledNavigateBefore = styled(NavigateBefore)`
       height: 100%;
       width: 100%;
       color: black;
`

const StyledNavigateNext = styled(NavigateNext)`
       height: 100%;
       width: 100%;
       color: black;
`

class HighLights extends Component {
  constructor(props) {
    super(props);

    this.state = {
      carouselState: 'play',
      width: window.innerWidth,
      height: window.innerHeight - $('.navbar').outerHeight(),
    };

    this.playCarousel = this.playCarousel.bind(this);
    this.pauseCarousel = this.pauseCarousel.bind(this);
    this.makeCarouselItems = this.makeCarouselItems.bind(this);
  }
  
  render() {

    const carouselStyle = {
      width: this.state.width,
      height: this.state.height,
    }

    const carouselInnerStyle = {
      width: '90%',
      height: '98%',
      margin: 'auto'
    }

    const controlsStyle = {
      width: '5%',
      height: '100%',
    }

    const { user, loading, highlightsExists, highlights } = this.props;

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
	<div id="Highlights" className="scrollspy container-fluid px-0 pt-1" style={carouselStyle}>

	  {/* <div className="container-fluid text-center bg-light pb-1"><h2 className="m-auto text-primary">Highlights</h2></div> */}
	  
	  <div id="HighlightsCarousel" className="carousel slide ml-auto mr-auto" data-ride="carousel" data-intervail="15000" style={carouselStyle}>

	    {/* Indicators */}
	    <ul className="play-pause bg-transparent w-25 ml-auto mr-auto justify-content-start">
	      {this.makeCarouselPlayPause(this.state.carouselState)}
	      <ul className="carousel-indicators bg-dark ml-auto mr-auto w-100 h-100">
		{this.makeCarouselIndicators(highlights)}
	      </ul>
	    </ul>
	    
	    {/* Items */}
	    <div className="carousel-inner" style={carouselInnerStyle} >
	      {this.makeCarouselItems(highlights)}
	    </div>
	    
	    {/* Controls  */}
	    <a className="carousel-control-prev"  href="#HighlightsCarousel" data-slide="prev" style={controlsStyle}>
	      <div className="w-100 h-100 m-auto d-flex align-items-center"><span className="h-100 w-100"><StyledNavigateBefore /></span></div>
	    </a>
	    <a className="carousel-control-next" href="#HighlightsCarousel" data-slide="next" style={controlsStyle}>
	      <div className="w-100 h-100 m-auto d-flex align-items-center"><span className="h-100 w-100"><StyledNavigateNext /></span></div>
	    </a>
	  </div>
	</div>
      );
    }
  }
  
  makeCarouselItems(highlights){
    const exploreMoreStyle={
      position: 'absolute',
      top:5,
      right: 5,
      //width: '15%',
      opacity: '50%'
    }
    return(
      highlights.map( (hilight, index) => {
	let active = (index == 0) ? 'active' : ''
	return(
	  <div key={index} className={"carousel-item w-100 h-100 "+active} data-interval="10000">
	    <button id={"exploreMore"+hilight.key} className="btn btn-primary btn-sm text-center text-wrap" style={exploreMoreStyle} data-vizkey={hilight.key} data-fulldashkey={hilight.full_dashboard_key} data-toggle="tooltip" data-placement="top"  title="Explore the full dashboard" onClick={this.switchToDashboard}><span><ArrowForward size="30"/></span></button>

	    <TableauViz vizId={hilight.key} url={hilight.vizurl} options={hilight.options} />

	    {/* <div className="carousel-caption bg-dark d-none d-md-block">
	    <h5>{hilight.title}</h5>
	    <p>{hilight.caption}</p>
	    </div> */}
	    
	  </div>
	);
      })
    )}

  switchToDashboard(event){
    let target = event.currentTarget;
    console.log(target);
    let vizKey = $(target).data('vizkey');
    let fulldashKey = $(target).data('fulldashkey');
    let vizs = tableauSoftware.VizManager.getVizs();
    let viz = vizs.find((viz) => viz.getParentElement().id == vizKey);
    viz.getWorkbook().activateSheetAsync(fulldashKey);
    $('#exploreMore'+vizKey).hide();
  }
  
  makeCarouselIndicators(highlights){
    return(
      highlights.map( (hilight, index) => {
	let active = (index == 0) ? 'active' : ''
	return(
	  <li key={index} data-target="#HighlightsCarousel" data-slide-to={index} className={active}></li>
	);
      })
    )}

  makeCarouselPlayPause(carouselState){
    const playPauseStyle ={
      zIndex: 20,
    }
    if (carouselState == 'play'){
      return(
	<a href="" id="CarouselPlayToggler" className="h-100 d-flex align-items-center" onClick={this.pauseCarousel} style={playPauseStyle} role="button"><Pause size="23" color="white" fill="white" /></a>
	)
    } else {
      return(
	<a href="" id="CarouselPlayToggler" className="h-100 d-flex align-items-center" onClick={this.playCarousel} style={playPauseStyle} role="button"><Play size="23" color="white" fill="white" /></a>
      )
    }
  }

  pauseCarousel(event){
    event.preventDefault()
    $('#HighlightsCarousel').carousel('pause');
    this.setState({carouselState:'pause'});
  }

  playCarousel(event){
    event.preventDefault()
    $('#HighlightsCarousel').carousel('next');
    this.setState({carouselState:'play'});
    
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
    if (this.state.carouselState=='play'){
      $('#HighlightsCarousel').carousel({
	interval:10000
      });
    }
    
    $('#HighlightsCarousel').on('slide.bs.carousel', (e) => {
      $('#HighlightsSubMenu').children().removeClass('active');
      $($('#HighlightsSubMenu').children()[e.to]).addClass('active');
    });
    
    $('[data-toggle="tooltip"]').tooltip();
   
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }
  
}

export default withTracker(() => {
  const user = Meteor.user();
  const highlightsHandle = Meteor.subscribe('highlights');
  const loading = !highlightsHandle.ready();
  const highlights_fetch = highlights.find({}, { sort: { createdAt: -1 } }).fetch();
  const highlightsExists = !loading && !!highlights;
  return {
    user,
    loading,
    highlightsExists,   
    highlights: highlightsExists ? highlights_fetch : {}
  };
})(HighLights);

