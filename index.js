const fs = require("fs");
const express = require("express");
const app = express();
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./servidor/passport-setup.js");
const modelo = require("./servidor/modelo.js");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3000;
const args = process.argv.slice(2);
let test = false;
test = eval(args[0]); //test=true

app.use(express.static(__dirname + "/"));

app.use(
  cookieSession({
    name: "Batalla Naval",
    keys: ["key1", "key2"],
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

let sistema = new modelo.Sistema(test);
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/", function (request, response) {
  var contenido = fs.readFileSync(__dirname + "/cliente/index.html");
  response.setHeader("Content-type", "text/html");
  response.send(contenido);
});

app.listen(PORT, () => {
  console.log("App está escuchando en el puerto" + PORT);
  console.log("Ctrl+C para salir");
});

app.get("/agregarUsuario/:nick", function (request, response) {
  let nick = request.params.nick;
  let res = sistema.agregarUsuario(nick);
  response.send(res);
});

app.get("/usuarioActivo/:nick", function (request, response) {
  let nick = request.params.nick;
  let res = sistema.usuarioActivo(nick);
  response.send(res);
});

app.get("/numeroUsuarios", function (request, response) {
  let res = sistema.numeroUsuarios();
  response.send(res);
});

app.get("/obtenerUsuarios", function (request, response) {
  let res = sistema.obtenerUsuarios();
  response.send(res);
});

app.get("/eliminarUsuario/:nick", function (request, response) {
  let nick = request.params.nick;
  let res = sistema.eliminarUsuario(nick);
  response.send(res);
});

app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/fallo" }),
  function (req, res) {
    res.redirect("/good");
  }
);

app.get("/good", function (request, response) {
  let email = request.user.emails[0].value;
  sistema.usuarioGoogle({ email: email }, function (usr) {
    response.cookie("nick", usr.email);
    response.redirect("/");
  });
});

app.get("/fallo", function (request, response) {
  response.send({ nick: "nook" });
});

app.post("/enviarJwt", function (request, response) {
  let jwt = request.body.jwt;
  let user = JSON.parse(global.atob(jwt.split(".")[1]));
  let email = user.email;
  sistema.usuarioGoogle({"email":email}, function (obj) {
    response.send({ 'nick': obj.email });
  });
});
