var config = require("./config.json"),
	express = require("express"),
	favicon = require("serve-favicon"),
	morgan = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	errorHandler = require('errorhandler'),
	routes = require("./routes.js"),
	dbs = require("./libs/connectDbs.js"),
	app = express();

config.server.port = process.env.PORT || config.server.port;
config.server.public_dir = process.env.PUBLIC_DIR || config.server.public_dir;

app.use(favicon(config.server.public_dir + '/favicon.ico'));
app.use(morgan('dev'));

app.use(bodyParser());
app.use(cookieParser());
app.use(methodOverride());

app.use(express["static"](config.server.public_dir));

if (process.env.NODE_ENV === 'development') {
	app.use(errorHandler({
	    dumpException: true,
	    showStack: true
	}));
}

dbs.connect(config.dbs, function(errs, clients){
	var db;
	if(errs){
		for(db in errs){
			console.log("Error: db[" + db + "] " + errs[db]);
		}
	}else{
		routes.load(app, clients);
		app.listen(config.server.port);
		console.log("App listening on port: " + config.server.port);
	}
});