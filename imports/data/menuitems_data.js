// menuitems_data.js
// Initial menu items data

import highlights_data from './highlights_data.js';
import visualizations_data from './visualizations_data.js';
import reports_data from './reports_data.js';

export default menuitems_data = [
     {
	key:'About',
	title:'About',
	route:'/about',
	submenu_items:[]
    },
    {
	key:'Highlights',
	title:'Highlights',
	route:'/highlights',
	submenu_items: get_highlights_short_titles(highlights_data)
    },
    {
	key:'Visualizations',
	title:'Visualizations',
	route:'/visualizations',
	submenu_items:get_vizcategories_keys(visualizations_data)
    },
    {
	key:'Reports',
	title:'Reports',
	route:'/reports',
	submenu_items:get_reports_short_titles(reports_data)
    },
    {
	key: 'DataRequest',
	title: 'Data Request Ticket',
	route:'',
	externalLink: 'https://forms.gle/pCqNLSSZyE6LDehVA',
	submenu_items:[],
    }
    // {
    // 	key:'DataSets',
    // 	title:'Data Sets',
    // 	route:'/datasets',
    // 	submenu_items:[]
    //  },
    // {
    // 	key:'DataLiteracy',
    // 	title:'Data Literacy',
    // 	route:'/data101',
    // 	submenu_items:[]
    // }
];

function get_highlights_short_titles(highlights_data) {
    return (
	highlights_data.map((highlight, index)=>{
	   return  highlight.short_title;
	})
    );
}

function get_reports_short_titles(reports_data) {
    return (
	reports_data.map((report, index)=>{
	    return (
		{
		    key: report.key,
		    short_title: report.short_title
		}
	    ); 
	})
    );
}

function get_vizcategories_keys(visualizations_data) {
    return (
	visualizations_data.map((category, index)=>{
	    return (
		{
		    key: category.category_key,
		    short_title: category.category_short_title
		}
	    );
	})
    );
}
