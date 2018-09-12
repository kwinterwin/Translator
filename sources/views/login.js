import {JetView} from "webix-jet";

export default class LoginView extends JetView{
	config(){

		const _ = this.app.getService("locale")._;

		const login_form = {
			view:"form", localId:"form",
			width:400, borderless:false, margin:10,
			rows:[
				{ view:"text", name:"login", label:_("Login"), labelPosition:"top" },
				{ view:"text", type:"password", name:"password", label:_("Password"), labelPosition:"top" },
				{ view:"button", value:"Login", click:() => this.do_login(), hotkey:"enter", localId:"loginBtn" },
				{ view:"button", value:"Authorization", click:() => this.authorization(), hotkey:"enter", hidden:true, localId:"authorizBtn" }
			],
			rules:{
				login:webix.rules.isNotEmpty,
				password:webix.rules.isNotEmpty
			}
		};

		let tabbar = {
			view:"tabbar", 
			localId:"tabbar", 
			value:"login", 
			options: [
				{"id":"login", "value":"Sign in"},
				{"id":"authorization", "value":"Authorization"}
			],
			on:{
				onItemClick:()=>{
					if(this.$$("tabbar").getValue()=="login"){
						this.$$("authorizBtn").hide();
						this.$$("loginBtn").show();
					}
					else{
						this.$$("loginBtn").hide();
						this.$$("authorizBtn").show();
					}
				}
			}
		};

		return {
			cols:[{}, { rows:[{},tabbar, login_form, {}]}, {}]
		};
	}

	init(view){
		view.$view.querySelector("input").focus();
	}

	authorization(){
		const form = this.$$("form");

		if (form.validate()){
			const data = form.getValues();
			webix.ajax().post("/server/login/authorization", data).then(function (result) {
				// console.log(result.json().message);
				webix.message({type:"error", text:result.json().message});
			}).fail(function () {
				webix.message({type: "error", text: "Registration failed"});
			});
		}
		this.$$("tabbar").setValue("login");
		this.$$("form").clear();
		this.$$("authorizBtn").hide();
		this.$$("loginBtn").show();
	}

	do_login(){
		const user = this.app.getService("user");
		const form = this.$$("form");

		if (form.validate()){
			const data = form.getValues();
			user.login(data.login, data.password);
		}
	}
}