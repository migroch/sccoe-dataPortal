// reports_data.js
// Initial reports data

export default reports_data = [
        {
	key:"CHKS",
	title:"Santa Cruz CHKS Overview | 2015-2019",
	short_title:"CHKS Overview",
	caption:"This report is a descriptive overview of a selected set of questions and indicators from the California Healthy Kids Surveys (CHKS) administered in Santa Cruz County from 2015 to 2019. The CHKS is an anonymous assessment that students in Santa Cruz County schools take every other year. For traditional schools the survey is taken during grades 7th, 9th and 11th. The report includes countywide results as well as per district inserts." ,
	fileList:{
	    "Santa Cruz CHKS": "CHKSoverviewReport/Santa Cruz CHKS.pdf",
	    "Santa Cruz CHKS (Booklet Version)": "CHKSoverviewReport/Santa Cruz CHKS (Booklet).pdf",
	    "Live Oak Insert": "CHKSoverviewReport/Live Oak Insert.pdf",
	    "Pajaro Valley Insert": "CHKSoverviewReport/Pajaro Valley Insert.pdf",
	    "San Lorenzo Valley Insert": "CHKSoverviewReport/San Lorenzo Valley Insert.pdf",
	    "Santa Cruz City Insert":"CHKSoverviewReport/Santa Cruz City Insert.pdf",
	    "Santa Cruz COE Insert": "CHKSoverviewReport/Santa Cruz COE Insert.pdf",
	    "Scotts Valley Insert": "CHKSoverviewReport/Scotts Valley Insert.pdf",
	    "Soquel Insert": "CHKSoverviewReport/Soquel Insert.pdf"
	},
	options:{
	},
	size:{"width":1275, "height": 1710},
	image:"CHKSoverviewReport/Santa Cruz CHKS cover.png"
    },
    {
	key:"CHKSLGBT",
	title:"CHKS LGBT Report",
	short_title:"CHKS LGBT",
	caption:"This report shows the responses to a selection of questions in the 2019 California Healthy Kids Survey (CHKS). The selected questions asses Mental Health, School Safety and School Engagement & Supports. The responses from students identified as LGBT are compared to those from Non-LGBT students in order to bring awareness about the fact that <strong>our LGBT students experience more bullying, feel less safe at school and show significantly higher rates of depression and suicide ideation</strong>. A trend chart showing the responses from 2015 to 2019 is shown at the bottom of the page." ,
	vizUrl:"https://public.tableau.com/profile/miguel.rocha5573#!/vizhome/CHKS_LGBT_Report/LGBT1stReport",
	vizUrl_print: "https://public.tableau.com/views/CHKS_LGBT_Report/LGBT1stReportForprinting",
	options:{
	    "Governance":["County"],
	    //"Institution":["Santa Cruz County"],
	    "Institution Type Parameter":"Districts"
	},
	size:{"width":1275, "height": 1710},
	image:"CHKSLGBT.png"
    },
]
