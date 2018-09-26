export const words = new webix.DataCollection({ 
	url:"/server/words",
	save:"rest->/server/words/",
});


export function getWordsGroup(word){
	return webix.ajax().post("/server/words/test", {filter: word});
}