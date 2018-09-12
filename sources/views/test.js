import {JetView} from "webix-jet";
import {wordGroup} from "models/wordGroup";
import {words} from "models/words";
import {tests} from "models/tests";

export default class Test extends JetView{

	groupWords(list){
		this.groupName = list;
		this.testNumber = 1;
		this.result = 0;
		let group;
		wordGroup.filter((obj)=>{
			if(obj.name == list)
				group=obj;
		});
		webix.ajax().post("/server/words/test", {filter: group.words}, (text, json)=>{
			let data = json.json();
			if(data.problem){
				webix.message({text:data.message,type:"error"});
			} else {
				this.getData(data);
				return data;
			}
		});
	}

	getData(data){
		this.dataGroupWords = data;
		this.getRandomGroupWord(data);
	}

	getRandomGroupWord(data){
		let number = this.getRandomArbitary(0,data.length-1);
		this.choosePartOfSpeech(data[number]);
		this.randomGroupWord = data[number];
	}

	choosePartOfSpeech(data){
		let wordsToRandom = new Array();
		this.partOfSpeech = data.partOfSpeech;
		words.filter((obj)=>{
			if ((obj.partOfSpeech==data.partOfSpeech) && (obj.id != data._id))  
				wordsToRandom.push(obj);
		});
		this.setButtonValue(data,wordsToRandom);
	}

	setButtonValue(data, wordsToRandom){
		let massButton = ["1", "2", "3", "4"];
		let numberButt = this.getRandomArbitary(0, massButton.length-1);
		let numberWord = 0;

		this.$$("label").setValue(data[this.lbProperty]);
		this.$$(massButton[numberButt]).setValue(data[this.btProperty]);
		massButton.splice(numberButt,1);
		for (let i=0; i<massButton.length; i++){
			numberWord = this.getRandomArbitary(0, wordsToRandom.length-1);
			this.$$(massButton[i]).setValue(wordsToRandom[numberWord][this.btProperty]);
			wordsToRandom.splice(numberWord,1);
		}
	}

	checkTranslation(translation){
		const _ = this.app.getService("locale")._;
		
		if(this.randomGroupWord[this.btProperty] == translation){
			if(this.partOfSpeech == "Noun" || this.partOfSpeech == "Verb")
				this.result += 2;
			else this.result += 1;
			webix.message({text:_("It's right")});
		}
		else {
			webix.message({text:_("Wrong"),type:"error"});
			this.result += 0;
		} 
		if(this.testNumber<10){
			this.getRandomGroupWord(this.dataGroupWords);
			this.testNumber++;
		}
		else {
			this.$$("test").hide();
			this.$$("resultMessage").show();
			this.$$("resultMessage").setValues(this.result);
			tests.add({"groupName":this.groupName, "result": this.result});
		}
	}

	getRandomArbitary(min, max){
		return Math.round(Math.random() * (max - min) + min);
	}

	config(){

		const _ = this.app.getService("locale")._;
        
		let richselect = {
			view:"richselect",
			label:_("Please, select a list of words for the test:"),
			inputWidth:300,
			labelWidth:300,
			labelPosition:"top",
			localId:"richselect",
			options:{body:{template:"#name#", data: wordGroup} }
		};
        
		let select = {
			rows:[
				richselect,
				{
					view:"radio", 
					label:_("Type of test"), 
					labelPosition:"top",
					localId:"radio",
					value:1, 
					options:[
						{"id":1, "value":_("from English into Russian")}, 
						{"id":2, "value":_("from Russian into English")}
					]
				},
				{view:"button", label:_("Generate test"), inputWidth:200, click:()=>{
					this.$$("select").hide();
					this.$$("test").show();
					this.groupWords(this.$$("richselect").getText());
					if(this.$$("radio").getValue()==1){
						this.btProperty = "translationEng";
						this.lbProperty = "originalName";
					}
					else {
						this.btProperty = "originalName";
						this.lbProperty = "translationEng";
					}
				}}
			],
			localId:"select"
		};
		
		let test = {
			rows:[
				{
					rows:[
						{height:30},
						{view:"label", label:"", align:"center", localId:"label"},
						{height:30},
						{
							cols:[
								{},
								{view:"button", label:"", localId:"1", click:()=>{
									let translation = this.$$("1").getValue();
									this.checkTranslation(translation);
								}},
								{},
								{view:"button", label:"", localId:"2", click:()=>{
									let translation = this.$$("2").getValue();
									this.checkTranslation(translation);
								}},
								{}
							]
						},
						{height:30},
						{
							cols:[
								{},
								{view:"button", label:"", localId:"3", click:()=>{
									let translation = this.$$("3").getValue();
									this.checkTranslation(translation);
								}},
								{},
								{view:"button", label:"", localId:"4", click:()=>{
									let translation = this.$$("4").getValue();
									this.checkTranslation(translation);
								}},
								{}
							]
						}
					],
					localId:"test",
					hidden:true
				},
				{template:(obj)=>{
					return _("Your result: ") + `<b>${obj}</b>`;
				}, localId:"resultMessage", css:"result", hidden:true},
			]
		};

		return {
			rows:[
				select,
				test,
				{}
			]
		};
	}
	init(){
		this.btProperty = "";
		this.lbProperty = "";
	}
}