import {JetView} from "webix-jet";

export default class SignInPopup extends JetView{
	config(){

		const _ = this.app.getService("locale")._;

		let popup =  {
			view:"popup",
			position:"center",
			modal:true,
			localId:"signInPopup",
			head:{
				view:"toolbar", 
				cols:[
					{view:"label", label:_("Sign in | Authorization")}
				]
			},
			autoheight:true,
			width:500,
			body:{
				view:"form", 
				elements:[
					{ view:"text", name: "login", label:_("Login"), required: true, labelWidth:100 },
					{ view:"text", name:"password", type:"password", label:_("Password"), required:true, labelWidth:100 },
					{},
					{cols:[
						{ view:"button", value:_("Sign in"), type:"form" },
						{gravity:0.1},
						{ view:"button", value:_("Authorization") }
					]},
					{ view:"button", value:_("Cancel"), click:()=>{
						this.$$("signInPopup").hide();
					}}
				]
			}
		};
		
		return popup;

	}

	showWindow(){
		this.$$("signInPopup").show();
	}

	hideWindow(){
		this.$$("signInPopup").hide();
	}
}