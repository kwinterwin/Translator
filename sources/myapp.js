import "./styles/app.css";
import {JetApp, plugins} from "webix-jet";
import session from "models/session";

webix.ready(() => {
	webix.CustomScroll.init();
	var app = new JetApp({
		id:			APPNAME,
		version:	VERSION,
		//router:        UrlRouter,
		start:		"/start/list",
		debug:      true
	});
	app.render();

	app.use(plugins.Locale,{lang:"en"});
	// app.use(plugins.User, { model : session });
	// const _ = this.app.getService("locale")._;

	app.attachEvent("app:error:resolve", function(name, error){
		window.console.error(error);
	});
});
