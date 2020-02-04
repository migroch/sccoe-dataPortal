// fixtures.js
// Insert startup data from imports/data/

import { Meteor } from 'meteor/meteor';

// Import Mongo collections
import menuitems from '../../api/menuitems';
import highlights from '../../api/highlights';
import visualizations from '../../api/visualizations';

// Import data 
import menuitems_data from '../../data/menuitems_data.js';
import highlights_data from '../../data/highlights_data.js';
import visualizations_data from '../../data/visualizations_data.js';

// Insert data into colllections
Meteor.startup(() => {

    // Upsert menuitems_data into menuitems  collection
    menuitems_data.forEach((menuitem)=>{
	menuitems.upsert({key: menuitem.key}, menuitem, {upsert: true});
    });

    // Upsert highlights_data into highlights  collection
    highlights_data.forEach((highlight)=>{
	highlights.upsert({key: highlight.key}, highlight, {upsert: true});
    });

    // Upsert visualizations_data into visualizations collection
    visualizations_data.forEach((category)=>{
	visualizations.upsert({category: category}, category, {upsert: true});
    });    
});

