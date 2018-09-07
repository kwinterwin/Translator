import {JetView} from "webix-jet";
import {wordGroup} from "models/wordGroup";
import {words} from "models/words";
import newWordGroupPopup from "./newWordGroup";

export default class List extends JetView{
	config(){

		const _ = this.app.getService("locale")._;
        
		let listToolbar = {
			view:"toolbar",
			localId:"listToolbar",
			cols:[
				{},
				{ view:"button", value:_("Add word group"), align:"right", inputWidth:200, click:()=>{
					this._jetPopup.showWindow();
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
					template:"#name#",
					select:true,
					on:{
						onAfterSelect: ()=>{
							let groupId = this.$$("list").getSelectedItem().id;
							wordGroup.updateItem(groupId, {Name:"jfkdjf"});
							// console.log(groupId);
                            // console.log(words.data.exists(groupId));
                            // if (words.getItem().groupId==groupId){
                            //     this.$$("datatable").clearAll();
                            //     this.$$("datatable").add()
                            // }
							this.$$("datatable").show();
						}
					}
				},
				{}
			],
		};

		let datatableToolbar = {
			view:"toolbar",
			localId:"datatableToolbar",
			cols:[
                { view:"button", value:_("Add words to selected group"), align:"left", inputWidth:300},
                { view:"button", value:"dfdfvdfv", inputWidth:300, click:()=>{
                    let groupId = this.$$("list").getSelectedItem().id;
                    wordGroup.updateItem({Name:"jfkdjf"});}}
			]
		};
        
		let datatable = {
			rows:[
				datatableToolbar,
				{
					view:"datatable",
					columns:[
						{id:"originalWord", header:_("Original word"), fillspace:1},
						{id:"translationEng", header:_("Translation"), fillspace:1},
						{id:"partOfSpeech", header:_("Parts of speech")}
					]
				}
			],
			localId:"datatable",
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
	}
}