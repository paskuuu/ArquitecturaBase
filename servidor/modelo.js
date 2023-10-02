function Sistema() {
  this.usuarios = {};

  /*this.agregarUsuario = function (nick) {
    if (this.usuarioActivo(nick)) {
      console.log("Ya existe el usuario " + nick);
      return;
    }
    console.log("Nuevo usuario con nick: " + nick);
    this.usuarios[nick] = new Usuario(nick);
  };*/

  /*this.obtenerUsuarios = function () {
    return this.usuarios;
  };*/

  /*this.usuarioActivo = function (nick) {
    return nick in this.usuarios;
  };*/

  /*this.eliminarUsuario = function (nick) {
    if (this.usuarioActivo(nick)) {
      delete this.usuarios[nick];
      console.log("Usuario eliminado: " + nick);
    } else {
      console.log("El usuario " + nick + " no existe");
    }
  };*/

  /*this.numeroUsuarios = function () {
    let lista = Object.keys(this.usuarios);
    return lista.length;
  };*/

  this.agregarUsuario = function (nick) {
    let res = { nick: -1 };
    if (!this.usuarios[nick]) {
      this.usuarios[nick] = new Usuario(nick);
      res.nick = nick;
    } else {
      console.log("el nick " + nick + " está en uso");
    }
    return res;
  };

  this.obtenerUsuarios = function () {
    let res = { usuarios: -1 };

    if (this.usuarios != {}) {
      res.usuarios = this.usuarios;
    }
    return res;
  };

  this.usuarioActivo = function (nick) {
    let res = { activo: false };

    if (nick in this.usuarios) {
      res.activo = true;
    }

    return res;
  };

  this.numeroUsuarios = function () {
    let res = { usuarios: 0 };

    let lista = Object.keys(this.usuarios);
    res.usuarios = lista.length;
    return res;
  };

  this.eliminarUsuario = function (nick) {
    let res = { usuarios: -1 };

    if (this.usuarioActivo(nick)) {
      delete this.usuarios[nick];
      res.usuarios = this.usuarios;
      console.log("Usuario eliminado: " + nick);
    } else {
      console.log("El usuario " + nick + " no existe");
    }

    return res;
  };
}

function Usuario(nick) {
  this.nick = nick;
}

module.exports.Sistema = Sistema;
