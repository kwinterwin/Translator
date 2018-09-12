import "./styles/app.css";
import {JetApp, plugins} from "webix-jet";
import session from "models/session";

webix.ready(() => {

	var app = new JetApp({
		id:			APPNAME,
		version:	VERSION,
		//router:        UrlRouter,
		start:		"/start/list",
		debug:      true
	});
	app.render();

	app.use(plugins.Locale,{lang:"en"});
	app.use(plugins.User, { model : session });

});
