// visualizations_data.js
// Initial visualizations data

export default visualizations_data = [
    {
	category_key: 'CAASPP',
	category_title: 'California Assessment of Student Performance and Progress (CAASPP)',
	category_short_title: 'CAASPP',
	vizs:[
	    {
		key:"SCCAASPPDash",
		title:'Santa Cruz CAASPP | 2015-2019',
		short_title:'SC CAASPP',
		caption: 'Explore CAASPP results for Santa Cruz County.',
		vizurl:"https://public.tableau.com/views/SC_CAASPP_v2/SCCAASPPDashboard",
		vizurl_restricted: "https://public.tableau.com/views/SC_CAASPP_v2/SCCAASPPDashboardRestricted",
		options:{
		    "Governance":["County"],
		},
		image:"SCCAASPPDash.png"
	    },
	     {
    		key:"CAST",
    		title:'California Science Test (CAST) | 2019',
    		short_title:'CAST',
    		caption: "See the results from the first California Science Test in 2019.",
    		vizurl:"https://public.tableau.com/views/CAST_15853454266330/CASTDashboard",
		vizurl_restricted: 'https://public.tableau.com/views/CAST_15853454266330/CASTDashboardRestricted',
    		options:{
    		    //"Governance":["State","County"],
		    "Restricted": true,
		    //"District_County_State":"(All)",

    		},
    		image:"CAST.png"
    	    }
	]
    },
     {
    	category_key: 'ELPAC-ELPI',
    	category_title: 'English Language Proficiency Assessments for California (ELPAC)',
    	category_short_title: 'ELPAC/ELPI',
    	vizs:[
    	    {
    		key:"ELPI",
    		title:'English Learner Progress Indicator (ELPI) Current Status | 2019',
    		short_title:'ELPI Status',
    		caption: "Look at the English Learners Progress status in Santa Cruz County districts and schools.",
    		vizurl:"https://public.tableau.com/views/ELPI/ELPICurrentStatus",
		vizurl_restricted: "https://public.tableau.com/views/ELPI/ELPICurrentStatusRestricted",
    		options:{
    		     //"Governance":["State","County"],
		     "Restricted": true,
    		},
    		image:"ELPIDash.png"
    	    }
    	]
    },
    {
	category_key: 'CHKS',
	category_title: 'California Healthy Kids Survey (CHKS)',
	category_short_title: 'CHKS',
	vizs:[
	    {
		key:"CHKSSuicideDepression",
		title:'Santa Cruz CHKS Suicide & Depression LGBTQ+ Dashboard',
		short_title:'CHKS Suicide & Depression',
		caption: "See the reponses to the suicide and depression questions in the CHKS survey, from LGBT and Non-LGBT students.",
		vizurl:"https://public.tableau.com/views/SIBHIcharts/SuicideDepression_Dashboard",
		options:{},
		image:"SuicideIdeationLGBTQDash.png"
	    },
	    {
		key:"CHKSIndicators",
		title:'Santa Cruz CHKS Indicators Dashboard | 2015-2019',
		short_title:'Explore the responses to all the questions and indicators in the CHKS survey across years.',
		caption: 'Browse the student responses to the CHKS survey questions and idicators across time.',
		vizurl:"https://public.tableau.com/views/ChksTrends_v0_1/IndicatorsDashboard",
		options:{
		     "Governance":["County"]
		},
		image:"CHKSIndicatorsDash.png"
	    },
	    {
		key:"CHKSDemographics",
		title:'Santa Cruz CHKS Demographics Dashboard | 2015-2019',
		short_title:'CHKS Demographics',
		caption: "Demographic information of students that have taken the CHKS survey in Santa Cruz County.",
		vizurl:"https://public.tableau.com/views/ChksTrends_v0_1/DemographicsDashboard",
		options:{},
		image:"CHKSDemographicsDash.png"
	    }   
	]
    },
   
     
    // {
    // 	category_key: 'MathMindset',
    // 	category_title: 'Math Mindset',
    // 	category_short_title: 'Math Mindset',
    // 	vizs:[
    // 	    {
    // 		key:"MathMindset",
    // 		title:'Kevin Drinkard Math Mindset Survey Results',
    // 		short_title:'Math Mindest',
    // 		caption: 'Sample caption',
    // 		vizurl:"https://public.tableau.com/views/MathMindset/MindMindsetDashboard",
    // 		options:{},
    // 		image:"MathMindsetDash.png"
    // 	    }
    // 	]
    // }
];
