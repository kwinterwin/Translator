import {JetView} from "webix-jet";
import {tests} from "models/tests";

export default class List extends JetView{
	config(){

		const _ = this.app.getService("locale")._;
        
		let datatable = {
			view:"datatable",
			localId:"datatable",
			columns:[
				{id:"groupName", header:_("Group of words"), fillspace:1},
				{id:"date", header:_("Date of the test"), fillspace:1},
				{id:"result", header:_("Result")}
			]
		};
		
		return datatable;

	}
	init(){
		this.$$("datatable").sync(tests);
	}
}