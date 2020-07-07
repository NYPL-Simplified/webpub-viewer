const https = require("https");
const fs = require("fs");
const express = require("express");
// const { createProxyMiddleware } = require("http-proxy-middleware");

const options = {
  key: fs.readFileSync("webpubViewer.pem"),
  cert: fs.readFileSync("webpubViewer.pem"),
  requestCert: false,
  rejectUnauthorized: false,
};

const app = express();
const port = process.env.PORT || 3333;
const server = https.createServer(options, app);

server.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Express server listening on port " + server.address().port);
  }
});

// const apiProxy = createProxyMiddleware("/axis", {
//   target: "https://crummy.com/",
//   changeOrigin: true,
//   // protocolRewrite: true,
//   // port: 443,
//   // protocol: "https:",
//   secure: false,
//   // ignorePath: false,
//   ssl: {
//     key: fs.readFileSync("webpubViewer.pem"),
//     cert: fs.readFileSync("webpubViewer.pem"),
//     requestCert: false,
//     rejectUnauthorized: false,
//   },
// });

// app.use("/axis", apiProxy);

app.use("/TheCallOfTheWild", express.static(__dirname + "/TheCallOfTheWild"));
app.use(
  "/AJourneyToTheCentreOfTheEarth",
  express.static(__dirname + "/AJourneyToTheCentreOfTheEarth")
);
app.use("/backstop", express.static(__dirname + "/backstop"));

app.use("/catcherRye", express.static(__dirname + "/catcherRye"));

app.use(
  "/viewer",
  express.static(__dirname + "/../../viewer", {
    extensions: ["js"],
  })
);
app.get("/", function (req, res) {
  res.header("Content-type", "text/html");
  return res.end(
    "<h1>Webpub-viewer on https</h1>" +
      "<p>This example is running with static files on the same origin. Since it is https, Service Workers should register in compatible browsers.</p>" +
      "<p><a href='/viewer/?url=https%3A%2F%2Flocalhost%3A3333%2FAJourneyToTheCentreOfTheEarth%2Fmanifest.json'>A Journey to the Centre of the Earth</p>" +
      "<p><a href='/viewer/?url=https%3A%2F%2Flocalhost%3A3333%2FTheCallOfTheWild%2Fmanifest.json'>The Call of the Wild</p>" +
      // "<p><a href='/viewer/?url=https%3A%2F%2Flocalhost%3A3333%2FcatcherRye%2FOEBPS%2Fpackage.opf'>The Catcher in the Rye</p>" //+
    // "<p><a href='/viewer/?url=https%3A%2F%2Fwww.crummy.com%2Faxis%2Fcatcher%2Fplaintext%2FOEBPS%2Fpackage.opf'>Crummy - The Catcher in the Rye</p>" +
    // "<p><a href='/viewer/?url=https%3A%2F%2Flocalhost%3A3333%2Faxis%3A3333%2FcatcherRye%2FOEBPS%2Fpackage.opf'> Axis - The Catcher in the Rye</p>" +
    // "<p><a href='/viewer/?url=https%3A%2F%2Flocalhost%3A3333%2Faxis%2Fcatcher%2Fplaintext%2FOEBPS%2Fpackage.opf'> Axis2 - The Catcher in the Rye</p>"
  );
});
