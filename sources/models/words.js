export const words = new webix.DataCollection({ 
	url:"http://localhost:3000/words",
	save:"rest->http://localhost:3000/words/",
});


export function getWordsGroup(word){
	return webix.ajax().post("http://localhost:3000/words/test", {filter: word});
}