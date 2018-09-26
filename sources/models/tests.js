export const tests = new webix.DataCollection({ 
	scheme:{
		$init:(obj)=>{
			if(obj.hasOwnProperty("initializationDate")){
				let date = obj.initializationDate.split("T");
				let time = date[1].split(".");
				obj.date = date[0] + " " + time[0];
			}
			else {
				delete obj.date;
			}
		},
		$save:(obj)=>{
			delete obj.date;
		}
	},
	url:"/server/tests",
	save:"rest->/server/tests/",
});