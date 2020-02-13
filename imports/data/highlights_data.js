// highlights_data.js
// Initial highlights data

export default highlights_data = [
    {
	key:"SCCAASPP",
	title:'Santa Cruz CAASPP Gap',
	short_title:'CAASPP Gap',
	caption: 'Sample caption',
	vizurl:"https://public.tableau.com/views/SC_CAASPP_v2/GapHighlightD",
	options:{
	    "Governance":["County"]
	},
	full_dashboard_key:"SC CAASPP Dashboard",
	full_dashboard_name:"Santa Cruz CAASPP Dashboard"
    },
    {
	key:"CHKSSuicide",
	title:'Santa Cruz CHKS Suicide Ideation',
	short_title:'CHKS Suicide Ideation',
	caption: 'Sample caption',
	vizurl:"https://public.tableau.com/views/SIBHIcharts/SuicideIdeationHighlight",
	options:{
	    "DepressionSuicideSwap_Parameter":"Suicide"
//	    "DepressionSuicideSwap_Parameter":"In the past 12 months, did you seriuously consider attempting suicide? (% that responded YES)"
	},
	full_dashboard_key:"SuicideDepression_Dashboard",
	full_dashboard_name:"Suicide & Depression LGBTQ+ Dashboard"
    },
    {
	key:"CHKSDepression",
	title:'Santa Cruz CHKS Depression',
	short_title:'CHKS Depression',
	caption: 'Sample caption',
	vizurl:"https://public.tableau.com/views/SIBHIcharts/DepressionHighlight",
	options:{
	    "DepressionSuicideSwap_Parameter":"Depression"
//	    "DepressionSuicideSwap_Parameter":"Past 12 Months, did you ever feel so sad or hopeless almost every day? (% that responded YES)"
	},
	full_dashboard_key:"SuicideDepression_Dashboard",
	full_dashboard_name:"Suicide & Depression LGBTQ+ Dashboard",
    },
    
    // {
    // 	key:"CHKSIndicators",
    // 	title:'Santa Cruz California Healthy Kids Survey - Trends',
    // 	short_title:'SC CHKS Trends',
    // 	caption: 'Sample caption',
    // 	vizurl:"https://public.tableau.com/views/ChksTrends_v0_1/IndicatorsDashboard"
    // },
    // {
    // 	key:"CHKSLGBTReport",
    // 	title:'Santa Cruz California Healthy Kids Survey - LGBTQ Report',
    // 	short_title:'SC CHKS LGBTQ',
    // 	caption: 'Sample caption',
    // 	vizurl:"https://public.tableau.com/views/CHKS_LGBT_Report/LGBT1stReport"
    //},
    // "MathMindset":{url:"https://public.tableau.com/views/MathMindset/MindMindsetDashboard"},
    // "ELPIstatus":{url:"https://public.tableau.com/views/ELPI/ELPICurrentStatus"}
];
