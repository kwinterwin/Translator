import {JetView} from "webix-jet";
import {wordGroup} from "models/wordGroup";
import {words} from "models/words";

export default class newWordGroupPopup extends JetView{
	config(){

		const _ = this.app.getService("locale")._;

		let popup =  {
			view:"window",
			position:"center",
			modal:true,
			localId:"newWordGroup",
			head:{
				view:"toolbar", 
				cols:[
					{view:"label", label:_("Add word group"), localId:"toolbarLabel"}
				]
			},
			height:800,
			width:800,
			body:{
				view:"form", 
				localId:"form",
				elements:[
					{ view:"text", name: "name", label:_("Group name"), required: true, labelWidth:200},
					{
						template:_("Click on any cell to select it.<br>Use <b>ctrl</b>-click and <b>shift</b>-click to select multiple cells."),
						autoheight:true,
						borderless:true
					},
					{
						view:"datatable",
						localId:"datatable",
						select:"row",
						scrollY: true,
						multiselect:true,
						columns:[
							{id:"originalName", header:_("Original word"), fillspace:1},
							{id:"translationEng", header:_("Translation"), fillspace:1},
							{id:"partOfSpeech", header:_("Parts of speech")}
						]
					},
					{cols:[
						{ view:"button", value:_("Add"), localId:"addButton", type:"form", hotkey: "enter", click:()=>{
							let group = this.$$("form").getValues();
							group.values = this.$$("datatable").getSelectedItem();
							if(group.hasOwnProperty("id")){
								wordGroup.updateItem(group.id, group);
							}
							else{
								wordGroup.add(group);
							}
							this.hideWindow();
						}},
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

	showWindow(values){
		const _ = this.app.getService("locale")._;
		this.$$("newWordGroup").show();
		this.$$("datatable").sync(words);
		this.$$("form").clear();
		this.$$("datatable").unselectAll();
		if (typeof values != "undefined"){
			this.$$("addButton").setValue(_("Edit"));
			this.$$("toolbarLabel").setValue(_("Edit word group: ") + values.name);
			this.$$("form").setValues(values);
			for (let i=0; i<values.words.length; i++){
				this.$$("datatable").select(values.words[i], true);
			}
		}
		else {
			this.$$("addButton").setValue(_("Add"));
			this.$$("toolbarLabel").setValue(_("Add word group"));
		}
	}

	hideWindow(){
		this.$$("newWordGroup").hide();
	}
}