import {JetView} from "webix-jet";
import {words} from "models/words";
import {part} from "models/partOfSpeech";

export default class newWordPopup extends JetView{
	config(){

		const _ = this.app.getService("locale")._;

		let popup =  {
			view:"window",
			position:"center",
			modal:true,
			localId:"newWord",
			head:{
				view:"toolbar", 
				cols:[
					{view:"label", label:_("Add word")}
				]
			},
			width:400,
			body:{
				view:"form", 
				localId:"form",
				elements:[
					{ view:"text", name: "originalName", label:_("Original name"), required: true, labelWidth:170},
					{ view:"text", name: "translationEng", label:_("Translation"), required: true, labelWidth:170},
					{ view:"combo", label:_("Part of speech"), options:{data:part}, name:"partOfSpeech", labelPosition:"top", required:true},
					{cols:[
						{ view:"button", value:_("Add"), type:"form", hotkey: "enter", click:()=>{
							let word = this.$$("form").getValues();							
							words.add(word);
							this.hideWindow();
						} },
						{gravity:0.1},
						{ view:"button", value:_("Cancel"), click:()=>{
							this.$$("newWord").hide();
						}
						}
					]},
				]
			}
		};
		
		return popup;

	}

	showWindow(){
        this.$$("form").clear();
		this.$$("newWord").show();
	}

	hideWindow(){
		this.$$("newWord").hide();
	}
}