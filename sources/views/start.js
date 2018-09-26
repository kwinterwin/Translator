import {JetView} from "webix-jet";


export default class Start extends JetView{
	config(){

		const _ = this.app.getService("locale")._;

		let header =  { 
			view: "toolbar",
			elements: [
				{
					view: "button", 
					type: "icon", 
					icon: "bars", 
					width: 30, 
					align: "left", 
					click: ()=>{
						this.getRoot().queryView({view:"sidebar"}).toggle();
					}
				},
				{ view: "label", label: _("Translator")},
				{gravity:3},
				{
					view: "button", 
					type: "icon", 
					label: _("Sign in"),
					icon: "user", 
					width:150,
					click:()=>{
						this._jetPopup.showWindow();
					}
				},
				{view:"segmented", localId:"locale", options:[
					{ "id":"en", "value":_("English"), width:150}, 
					{ "id":"ru", "value":_("Russian"), width:150}
				],click:()=>{
					const langs = this.app.getService("locale");
					const value = this.$$("locale").getValue();
					langs.setLang(value);
				}
				}
			]
		};

		let sidebar = { 
			view: "sidebar",
			localId:"sidebar",
			data:[
				{id:"list", icon: "list", value: _("List of words groups")},
				{id:"test", icon: "leanpub", value: _("Test")},
				{id:"testResults", icon: "edit", value: _("Test results")},
				{id:"login", icon: "hand-o-right", value: _("Sign out")}
			],
			on:{
				onAfterSelect:(id)=>{
					if(this.$$("sidebar").getItem(id).id == "login")
						this.show("/logout");
					else
						this.show(`../start/${this.$$("sidebar").getItem(id).id}`);
				}
			}
		};
		
		return {
			rows:[
				header,
				{cols:[
					{ rows:[
						sidebar,
						{height:1}]
					},
					{$subview:true}
				]
				}
			]
		};

	}
    

	ready(){
		let sidebar = this.getRoot().queryView({view:"sidebar"});
		sidebar.select(sidebar.getFirstId());
	}
}