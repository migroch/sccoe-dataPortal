// publications.js
// Publish mongo collections
import { Meteor } from 'meteor/meteor';

import menuitems from '../../api/menuitems';
import highlights from '../../api/highlights';
import visualizations from '../../api/visualizations';

Meteor.publish("menuitems", function(){
    return menuitems.find({});
});

Meteor.publish("highlights", function(){
    return highlights.find({});
});

Meteor.publish("visualizations", function(){
    return visualizations.find({});
});
