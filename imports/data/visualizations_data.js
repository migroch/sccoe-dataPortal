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
		title:'Santa Cruz CAASPP Dashboard',
		short_title:'SC CAASPP',
		caption: 'Explore CAASPP results for Santa Cruz County districts.',
		vizurl:"https://public.tableau.com/views/SC_CAASPP_v2/SCCAASPPDashboard",
		options:{
		    "Governance":["County"]
		},
		image:"SCCAASPPDash.png"
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
		caption: "Compare reponses to the suicide and depression questions in the CHKS survey between self-identified LGBTQ+ and Non-LGBTQ+ students.",
		vizurl:"https://public.tableau.com/views/SIBHIcharts/SuicideDepression_Dashboard",
		options:{},
		image:"SuicideIdeationLGBTQDash.png"
	    },
	    {
		key:"CHKSIndicators",
		title:'Santa Cruz CHKS Indicators Dashboard',
		short_title:'Explore the responses from Santa Cruz County students to the CHKS survey across years, with the ability to group and compare based on demographic information',
		caption: 'Browse the student responses to the CHKS survey questions and idicators across time.',
		vizurl:"https://public.tableau.com/views/ChksTrends_v0_1/IndicatorsDashboard",
		options:{
		     "Governance":["County"]
		},
		image:"CHKSIndicatorsDash.png"
	    },
	    {
		key:"CHKSDemographics",
		title:'Santa Cruz CHKS Demographics Dashboard',
		short_title:'CHKS Demographics',
		caption: "Explore the demographic information of students that have taken the CHKS survey in Santa Cruz County.",
		vizurl:"https://public.tableau.com/views/ChksTrends_v0_1/DemographicsDashboard",
		options:{},
		image:"CHKSDemographicsDash.png"
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
    		title:'English Learner Progress Indicator (ELPI) - Current Status',
    		short_title:'ELPI Status',
    		caption: "Look at the English learners progress status in Santa Cruz County districts and schools based on the ELPAC's English Learner Progress Indicator (ELPI).",
    		vizurl:"https://public.tableau.com/views/ELPI/ELPICurrentStatus",
    		options:{
    		    "Governance":["State","County"]
    		},
    		image:"ELPIDash.png"
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
