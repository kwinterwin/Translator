import {JetView} from "webix-jet";
import {wordGroup} from "models/wordGroup";

export default class newWordGroupPopup extends JetView{
	config(){

		const _ = this.app.getService("locale")._;

		let popup =  {
			view:"popup",
			position:"center",
			modal:true,
			localId:"newWordGroup",
			head:{
				view:"toolbar", 
				cols:[
					{view:"label", label:_("Add word group")}
				]
			},
			autoheight:true,
			width:500,
			body:{
				view:"form", 
				localId:"form",
				elements:[
					{ view:"text", name: "name", label:_("Group name"), required: true, labelWidth:150},
					{cols:[
						{ view:"button", value:_("Add"), type:"form", hotkey: "enter", click:()=>{
							let values = this.$$("form").getValues();
							wordGroup.add(values);
							this.hideWindow();
						} },
						{gravity:0.1},
						{ view:"button", value:_("Cancel"), click:()=>{
							this.$$("newWordGroup").hide();
						}
						}
					]},
				]
			}
		};
		
		return popup;

	}

	showWindow(){
		this.$$("newWordGroup").show();
	}

	hideWindow(){
		this.$$("newWordGroup").hide();
	}
}