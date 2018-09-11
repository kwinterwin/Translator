import {JetView} from "webix-jet";
import {wordGroup} from "models/wordGroup";
import * as words from "models/words";
import newWordGroupPopup from "./newWordGroup";
import newWordPopup from "./newWord";

export default class List extends JetView{
	config(){

		const _ = this.app.getService("locale")._;
        
		let listToolbar = {
			view:"toolbar",
			localId:"listToolbar",
			cols:[
				{ view:"button", value:_("Add word group"), align:"right", inputWidth:200, click:()=>{
					this._jetPopup.showWindow();
				}},
				{view:"button", value:_("Add word"), type:"form", inputWidth:200, click:()=>{
					this._jetPopupWord.showWindow();
				}}
			]
		};

		let list = {
			rows:[ 
				listToolbar,
				{
					view:"list",
					localId:"list",
					width:460,
					template:`#name# <span class='fa fa-trash delete' title = '${_("Remove")}'></span>  <span class='fa fa-pencil edit' title='${_("Edit")}'></span>`,
					select:true,
					onClick:{
						delete: function (e, id) {
							webix.confirm({
								text: _("Group will be removed. Continue?"), title: _("Attention"),
								ok: _("Yes"),
								cancel: _("No"),
								callback: (result)=>{
									if (result) {
										wordGroup.remove(id);
									}
								}
							});
							return false;
						}, 
						edit: (e,id)=>{
							let values = wordGroup.getItem(id);
							this._jetPopup.showWindow(values);
							return false;
						}
					},
					on:{
						onAfterSelect: ()=>{
							let word = this.$$("list").getSelectedItem().words;
							this.$$("datatable").clearAll();
							this.$$("datatable").parse(words.getWordsGroup(word));
							this.$$("dataTool").show();
						}
					}
				}
			],
		};

		let datatableToolbar = {
			view:"toolbar",
			localId:"datatableToolbar",
			cols:[
				{
					view: "button", 
					label: _("Export to excel"),
					inputWidth:250,
					click:()=>{
						webix.toExcel(this.$$("datatable"));
					}
				},
			]
		};
        
		let datatable = {
			rows:[
				datatableToolbar,
				{
					view:"datatable",
					localId:"datatable",
					columns:[
						{id:"originalName", header:_("Original word"), fillspace:1},
						{id:"translationEng", header:_("Translation"), fillspace:1},
						{id:"partOfSpeech", header:_("Parts of speech")}
					]
				}
			],
			localId:"dataTool",
			hidden:true
		};
		
		return {
			cols:[
				list,
				datatable
			]
		};

	}
	init(){
		this.$$("list").sync(wordGroup);
		this._jetPopup = this.ui(newWordGroupPopup);
		this._jetPopupWord = this.ui(newWordPopup);
	}
}