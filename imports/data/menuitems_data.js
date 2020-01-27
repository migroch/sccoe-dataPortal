// menuitems_data.js
// Initial menu items data

import highlights_data from './highlights_data.js';
import visualizations_data from './visualizations_data.js';

export default menuitems_data = [
    {
	key:'Highlights',
	title:'Highlights',
	route:'/highlights',
	submenu_items: get_highlights_short_titles(highlights_data)
    },
    {
	key:'About',
	title:'About',
	route:'/about',
	submenu_items:[]
    },
    {
	key:'Visualizations',
	title:'Visualizations',
	route:'/visualizations',
	submenu_items:get_visualizations_short_titles(visualizations_data)
    },
    {
	key:'Reports',
	title:'Reports',
	route:'/reports',
	submenu_items:[]
    },
    {
	key:'DataSets',
	title:'Data Sets',
	route:'/datasets',
	submenu_items:[]
     },
    {
	key:'DataLiteracy',
	title:'Data Literacy',
	route:'/data101',
	submenu_items:[]
    }
];

function get_highlights_short_titles(highlights_data) {
    return (
	highlights_data.map((highlight, index)=>{
	   return  highlight.short_title;
	})
    );
}

function get_visualizations_short_titles(visualizations_data) {
    return (
	visualizations_data.map((visualization, index)=>{
	    return (
		{
		    key: visualization.key,
		    short_title: visualization.short_title
		}
	    );
	})
    );
}
