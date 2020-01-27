// Nav.jsx
// Navigation bar component

import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import menuitems from '../../api/menuitems';

import styled from 'styled-components'
import {LogIn} from 'styled-icons/feather/LogIn';
import {LogOut} from 'styled-icons/feather/LogOut';
import {User} from 'styled-icons/feather/User';
import {Menu} from 'styled-icons/material/Menu';

import AccountsUIWrapper from './AccountsUI.jsx';

const styles = {
  logoStyle:{
    width:'4em',
    height: 'auto'
  },
  navToggler:{
    color:'#005d80',
    border:'none'
  },
  subMenus:{
    border: 'none',
    fontSize: 'smaller',
    height: 'fit-content',
    padding: 0,
    position: 'absolute',
  }
}

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inview: true,
    };

    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.scrollSpy = this.scrollSpy.bind(this);
    this.activateScrollSpy = this.activateScrollSpy.bind(this);
  }
  
  render() {
    const { user, loading, menuitemsExists, menuitems } = this.props;
    
    if(loading){
      return(
	<div className="d-flex justify-content-center text-primary">
	  <div className="spinner-border" role="status">
	    <span className="sr-only">Loading...</span>
	  </div>
	</div>
      )
    }else{
      
      const signIO = this.signIOButton(user) ;
      const menuItems = this.makeMenu(menuitems);
      
      return (
	<div>
	  <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
	    
	    {/*Logo & Brand*/}
	    <a  className="navbar-brand" href="#"><img className="rounded-circle " style={styles.logoStyle} alt="Santa Cruz COE Logo" src="SCCOE_Logo_Color.png"/><div className="d-inline-block text-center align-middle pl-2"><h5 className="m-0" style={{color:'#005d80'}}>Sant Cruz COE</h5><h5 className="m-0" style={{color:'#00a6a3'}}>Data Portal</h5></div></a>

	    {/*Collapse Toggler Button*/}
	    <button className="navbar-toggler btn text-primary" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style={styles.navToggler}>
	      <Menu size="50" />
	    </button>

	    {/*Menus*/}
	    <div className="collapse navbar-collapse text-right" id="navbarSupportedContent">

	      {/*Left Menu*/}
	      <ul id="LeftNavMenu" className="navbar-nav nav-tabs d-flex w-100">
		  {menuItems}
	      </ul> 
	      
	      {/*Right Menu*/}
	      <ul className="navbar-nav ml-auto ">
		<li className="nav-item">
		  {signIO}
		</li>
	      </ul>
	    </div>
	  </nav>

	  <AccountsUIWrapper />
      
	</div>
      );
    }
  }

  makeMenu(menuitems){
    return(
      menuitems.map( (item, index) =>{
	let active = (index == 0) ? 'active' : ''
	let invisible = (index == 0) ? '' : 'invisible'
	let Link
	if(['Highlights', 'About', 'Visualizations'].includes(item.key)){
	  Link = (<a href={"#"+item.key} id={item.key+'Link'} className={"nav-link "+active}  onClick={this.handleLinkClick}>{item.title}</a>)
	} else {
	  Link = (<button type="button" href={"#"+item.key} id={item.key+'Link'} className={"nav-link btn "+active}  onClick={this.handleLinkClick} data-toggle="tooltip" data-placement="right" title="Coming soon!">{item.title}</button>)
	}
	return(
	  <li key={index} className="nav-item">
	    {Link}
	    <div id={item.key+"SubMenu"} className={"submenu d-sm-none d-md-none d-lg-inline-flex bg-transparent "+invisible} style={styles.subMenus}>
	      {this.makeSubMenu(item)}
	    </div>
	  </li>
	)
      }));
  }  

  makeSubMenu(menu_item){
    let submenu_items = menu_item.submenu_items;
    return(
      submenu_items.map( (item, index) =>{
	let active = (index == 0) ? 'active' : ''
	if (menu_item.key == 'Highlights'){
	  return(
	    <a  href="#" key={index} id={item+"Link"} className={"dropdown-item "+active} data-target="#HighlightsCarousel" data-slide-to={index}>{item}</a>
	  );
	} else {
	  return(
	    <a  href="#" key={index} id={item.key+"Link"} className={"dropdown-item"} data-vizkey={item.key} onClick={this.handleSubLinkClick}>{item.short_title}</a>
	  );
	}
      })  
    )}
  
  handleLinkClick(event){
    event.preventDefault();
    let target = event.target;
    let offset = $($(target).attr('href')).offset();
    let offsetTop =  offset.top-$(".navbar").outerHeight();
    $('html, body').animate({
      scrollTop: offsetTop,
      scrollLeft: offset.left,
    }, 700);
    this.setActiveLink(target);
  }

  handleSubLinkClick(event){
    event.preventDefault();
  }
  
  setActiveLink(target){
    history.pushState({}, '', $(target)[0].href);
    $('.nav-link').removeClass('active');
    $('.submenu').addClass('invisible');
    $(target).addClass('active');
    $(target).siblings().removeClass('invisible');
  }

  activateScrollSpy(){
    const NavThis = this
    $(window).bind('scroll', ()=>{
      NavThis.scrollSpy($('.scrollspy'));
    });
  }
  
  scrollSpy(spyelements){
    let topDistance = spyelements.map((index, elem) => {
      let windowHeight = window.innerHeight;
      let navbarHeight = $('.navbar').outerHeight();
      let windowTop = $(window).scrollTop();
      let elemHeight = $(elem).outerHeight();
      let elemTop = $(elem).offset().top;
      //let elemBottom = elemTop + $(elem).outerHeight();
      return Math.abs(windowTop + navbarHeight - elemTop);
    }).get();
    let minDistanceElem = spyelements[topDistance.indexOf(Math.min(...topDistance))]
    let id = $(minDistanceElem).attr('id');
    let navLink = $('a[href="#' + id + '"]');
    this.setActiveLink(navLink);
  }

  
  signIOButton(user){
    if (user) {
      $('#closeLoginModal').click();
      return(
	<div>
	  <div className="text-center align-middle p-0 m-0 d-table ml-auto">
	    <User size="50"/>
	    <p className="m-0 p-0">{user.profile.name}</p>
	  </div>
	  <button id="signIOButton"  className="btn text-primary p-0 m-0" onClick={Meteor.logout}>
	    <small className="p-0 m-0">Sign Out </small>
	    <LogOut size="20" />
	  </button>
	</div>
      )
    } else {
      return(
	<button id="signIOButton" type="button" className="btn text-primary"  data-toggle="modal" data-target="#loginModal">
	  <LogIn size="50" />
	  <p className="m-0">Sign In</p>
	</button>
      )
    }
  }

  componentDidMount(){

  }

  componentDidUpdate(){
    let navheight = $(".navbar").outerHeight();
    $("body").css("padding-top", navheight);
    this.activateScrollSpy();
  
    $('#LeftNavMenu').css({position:'relative', top:'-13px'});
    $('.submenu').offset({left:$('#LeftNavMenu').offset().left});
    
    window.addEventListener('resize',()=>{
      $('.submenu').each((index, submenu) => {
	if( $(submenu).siblings().hasClass('active') ){
	  let left = $(submenu).position().left;
	  let right = left + $(submenu).width();
	  if (right > window.innerWidth-100) {
	    $(submenu).addClass('invisible'); 
	  } else {
	    $(submenu).removeClass('invisible');
	  }
	}
      });
    });
    
    window.dispatchEvent(new Event('resize'));
    $('[data-toggle="tooltip"]').tooltip();
  }

  
}

export default Nav = withTracker(() => {
  const user = Meteor.user();
  const menuitemsHandle = Meteor.subscribe('menuitems');
  const loading = !menuitemsHandle.ready();
  const menuitems_fetch = menuitems.find({}, { sort: { createdAt: -1 } }).fetch();
  const menuitemsExists = !loading && !!menuitems;
  return {
    user,
    loading,
    menuitemsExists,   
    menuitems: menuitemsExists ? menuitems_fetch : {}
  };
})(Nav);


