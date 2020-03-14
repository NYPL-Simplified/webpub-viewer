var express = require('express');
var request = require("request");
var app = express();
var port = process.env.PORT || 4444;
var path = require('path');

var serverManifestJson = require("r2-streamer-js/dist/es5/src/http/server-manifestjson").serverManifestJson;
var serverMediaOverlays = require("r2-streamer-js/dist/es5/src/http/server-mediaoverlays").serverMediaOverlays;
var serverPub = require("r2-streamer-js/dist/es5/src/http/server-pub").serverPub;
var remoteServerPub = require("r2-streamer-js/dist/es5/src/http/server-url").serverRemotePub;
var serverAssets = require("r2-streamer-js/dist/es5/src/http/server-assets").serverAssets;
var Server = require("r2-streamer-js/dist/es5/src/http/server").Server

var encodeURIComponent_RFC3986 = require("r2-utils-js/dist/es5/src/_utils/http/UrlUtils").encodeURIComponent_RFC3986;

app.use("/viewer", express.static(__dirname + "/../../viewer"));
app.use("/", express.static(__dirname + "/../../node_modules/requirejs"));
app.set('views', __dirname);
app.set('view engine', 'ejs');

/** This is based on r2-streamer-js' server.ts functionality.
 * However, it only serves the NYPL reader and not the other readers.
 */
class RemoteEpubServer extends Server {
  constructor() {
    super();
    this.disableReaders=true;
    this.publications = [];
    this.pathPublicationMap = {};
    this.expressApp = express();

    this.expressApp.use("/readerNYPL", express.static(__dirname + "/../../viewer"));

    this.expressApp.use("/", express.static(__dirname + "/../../node_modules/requirejs"));
  
    this.expressApp.get("/", (req, res) => {
      res.render("index.html.ejs");
    });

    this.expressApp.get("/pub", (req, res) => {
      const isSecureHttp = req.secure ||
      req.protocol === "https" ||
      req.get("X-Forwarded-Proto") === "https";

      const prefix = isSecureHttp ? "https://" : "http://";
      const valueStr = Buffer.from(req.query.url).toString("base64");

      const queryUrl = prefix + req.headers.host + "/pub/" + valueStr + "/manifest.json"

      res.redirect('/readerNYPL?url=' + encodeURIComponent_RFC3986(queryUrl));
    })

    remoteServerPub(this, this.expressApp);
    const router = serverPub(this, this.expressApp);
    serverManifestJson(this, router);
    serverAssets(this, router);
    serverMediaOverlays(this, router);
  }
}
(async () => {
  const streamer = new RemoteEpubServer();

  const url = await streamer.start(4444, false);
  console.log("Streamer started at " + port);
})();
