const datos = require("./cad.js");

function Sistema(test) {
 
  this.usuarios = {};
  this.test = test;
  this.cad = new datos.CAD();
  this.agregarUsuario = function (nick) {
    let res = { nick: -1 };
    if (!this.usuarios[nick]) {
      this.usuarios[nick] = new Usuario(nick);
      res.nick = nick;
      console.log("Nuevo usuario en el sistema" + nick);
    } else {
      console.log("el nick " + nick + " está en uso");
    }
    return res;
  };

  this.obtenerOCrearUsuario = function (email) {
    this.cad.buscarOCrearUsuario(email, function (res) {
      console.log("El usuario " + res.email + " esta registrado");
    });
  };
  this.obtenerUsuarios = function () {
    return this.usuarios;
  };
  this.usuarioActivo = function (nick) {
    if (this.usuarios[nick]) {
      return true;
    } else {
      return false;
    }
  };

  this.eliminarUsuario = function (nick) {
    if (this.usuarioActivo(nick)) {
      delete this.usuarios[nick];
      console.log("Usuario con nick" + nick + "borrado");
    }
  };

  this.numeroUsuarios = function () {
    if (Object.keys(this.usuarios).length > 0) {
      return Object.keys(this.usuarios).length + "";
    } else {
      return "0";
    }
  };

  if (!this.test) {
    this.cad.conectar(function () {
      console.log("Conectado a Mongo Atlas");
    });
  }
}
function Usuario(nick) {
  this.nick = nick;
}
module.exports.Sistema = Sistema;