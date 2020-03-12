var express = require('express');
var cors = require('cors')
var request = require("request");
var app = express();
var port = process.env.PORT || 4444;
var path = require('path');

var serverManifestJson = require("r2-streamer-js/dist/es5/src/http/server-manifestjson").serverManifestJson;
var serverMediaOverlays = require("r2-streamer-js/dist/es5/src/http/server-mediaoverlays").serverMediaOverlays;
var serverPub = require("r2-streamer-js/dist/es5/src/http/server-pub").serverPub;
var serverAssets = require("r2-streamer-js/dist/es5/src/http/server-assets").serverAssets;
var Server = require("r2-streamer-js/dist/es5/src/http/server").Server
var encodeURIComponent_RFC3986 = require("r2-utils-js/dist/es5/src/_utils/http/UrlUtils").encodeURIComponent_RFC3986;
// app.use(express.static(__dirname + "/../opds-web-client/dist"));
// The following files are needed for /reader which calls /viewer for
// the required files.
app.use("/viewer", express.static(__dirname + "/../../viewer"));
// The /dist folder for the webpub viewer does not contain requirejs.
app.use("/", express.static(__dirname + "/../../node_modules/requirejs"));
app.set('views', __dirname);
app.set('view engine', 'ejs');

/** This is based on r2-streamer-js' server.ts functionality.
 * However, it only serves the NYPL reader and not the other readers.
 */
class RemoteEpubServer {
  constructor() {
    this.publications = [];
    this.pathPublicationMap = {};
    this.expressApp = express();

    const staticOptions = {
      etag: false,
  };
    this.expressApp.use("/readerNYPL", express.static(__dirname + "/../../viewer"));
    this.expressApp.use("/", express.static(__dirname + "/../../node_modules/requirejs"));
  
    this.expressApp.get("/", (req, res) => {
      res.render("index.html.ejs");
    });

    this.expressApp.get("/pub", (req, res) => {

      const isSecureHttp = req.secure ||
      req.protocol === "https" ||
      req.get("X-Forwarded-Proto") === "https";

      console.log("req", req);
      const prefix = isSecureHttp ? "https://" : "http://";
      const valueStr = Buffer.from(req.query.url).toString("base64");

      const queryUrl = prefix + req.headers.host + "/pub/" + valueStr + "/manifest.json"
      console.log("queryUrl", queryUrl);

      res.redirect('/readerNYPL?url=' + encodeURIComponent_RFC3986(queryUrl));
    })
    
    const router = serverPub(this, this.expressApp);
    serverManifestJson(this, router);
    serverAssets(this, router);
    serverMediaOverlays(this, router);
  }

  addPublications(pubs) {
    Server.prototype.addPublications.call(this, pubs);
  }
  isPublicationCached(filePath) {
    Server.prototype.isPublicationCached.call(this, filePath);
  }
  cachedPublication(filePath) {
    Server.prototype.cachedPublication.call(this, filePath);
  }
  cachePublication(filePath, pub) {
    Server.prototype.cachePublication.call(this, filePath, pub);
  }
  setResponseCors(res) {
    Server.prototype.setResponseCORS.call(this, res);
  }
  isStarted() {
    Server.prototype.cachePublication.call(this);
  }
  serverInfo() {
    Server.prototype.serverInfo.call(this);
  }
  start(port, secure) {
    Server.prototype.start.call(this, port, secure);
  }
}

// app.get("/", function(req, res, next) {
//   console.log("headers", res.headers);
//   res.render("index.html.ejs");
// });

// app.listen(port, function() {
//   console.log("Server listening on port " + port);
// });

(async () => {
  const streamer = new RemoteEpubServer();

  const url = await streamer.start(4444, false);
  console.log("Streamer started at 4444");
})();
