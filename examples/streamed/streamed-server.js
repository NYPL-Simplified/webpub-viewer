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

// app.use(express.static(__dirname + "/../opds-web-client/dist"));

app.use("/readerNYPL", express.static(__dirname + "/../../viewer"));
app.use("/", express.static(__dirname + "/../../node_modules/requirejs"));
app.set('views', __dirname);
app.set('view engine', 'ejs');

(async () => {
  console.log("asyncced");
  const server = new Server();
  server.expressUse("/readerNYPL", express.static(__dirname + "/../../viewer"));
  server.expressUse("/", express.static(__dirname + "/../../node_modules/requirejs"));

  server.expressGet("/", (req, res) => {
    server.setResponseCORS(res);
  });
  
  const url = await server.start(4444, false);
  console.log("Server listening on port " + port);
})();
