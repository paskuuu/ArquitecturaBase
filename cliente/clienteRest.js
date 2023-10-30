function ClienteRest() {
  // this.agregarUsuario = function (nick) {
  //   var cli = this;
  //   $.getJSON("/agregarUsuario/" + nick, function (data) {
  //     let msg = "El nick " + nick + " está ocupado";
  //     if (data.nick != -1) {
  //       console.log("Usuario " + nick + " ha sido registrado");
  //       msg = "Bienvenido al sistema, " + nick;
  //       localStorage.setItem("nick", nick);
  //     } else {
  //       console.log("El nick ya está ocupado");
  //     }
  //     cw.mostrarMensaje(msg);
  //   });
  // };

  this.agregarUsuario = function (nick) {
    var cli = this;
    $.getJSON("/agregarUsuario/" + nick, function (data) {
      let msg = "El nick " + nick + " está ocupado";
      if (data.nick != -1) {
        console.log("Usuario " + nick + " ha sido registrado");
        msg = "Bienvenido al sistema, " + nick;
        $.cookie("nick", nick);
      } else {
        console.log("El nick ya está ocupado");
      }
      cw.mostrarMsg(msg);
    });
  };

  this.agregarUsuario2 = function (nick) {
    $.ajax({
      type: "GET",
      url: "/agregarUsuario/" + nick,
      success: function (data) {
        if (data.nick != -1) {
          console.log("Usuario " + nick + " ha sido registrado");
        } else {
          console.log("El nick ya está ocupado");
        }
      },
      error: function (xhr, textStatus, errorThrown) {
        console.log("Status: " + textStatus);
        console.log("Error: " + errorThrown);
      },
      contentType: "application/json",
    });
  };

  this.obtenerUsuarios = function () {
    var cli = this;
    $.getJSON("/obtenerUsuarios", function (data) {
      if (data.usuarios != -1) {
        console.log(data);
      } else {
        console.log("No hay usuarios");
      }

      msg = "";
      for (usuario in obtenerUsuarios) {
        msg = msg + "\n Nombre: " + usuario;
      }

      if (msg == null) msg = "No hay usuarios";

      cw.mostrarMsg(msg);
    });
  };

  this.numeroUsuarios = function () {
    var cli = this;
    $.getJSON("/numeroUsuarios", function (data) {
      console.log("Numero de usuarios: " + data.usuarios);
    });
  };

  this.usuariosActivo = function (nick) {
    var cli = this;
    $.getJSON("/usuarioActivo/" + nick, function (data) {
      if (data.activo != false) {
        console.log("Usuario " + nick + " existe");
      } else {
        console.log("Usuario " + nick + " no existe");
      }
    });
  };

  this.eliminarUsuario = function (nick) {
    var cli = this;
    $.getJSON("/usuarioActivo/" + nick, function (data) {
      if (data.usuarios != -1) {
        console.log(
          "Usuario " +
            nick +
            " ha sido borrado. La lista de usuarios es " +
            data.usuarios
        );
      } else {
        console.log("No se ha podido ese usuario");
      }
    });
  };

  this.enviarJwt = function (jwt) {
    $.ajax({
      type: "POST",
      url: "/enviarJwt",
      data: JSON.stringify({ jwt: jwt }),
      success: function (data) {
        let msg = "El nick " + data.nick + " está ocupado";
        if (data.nick != -1) {
          console.log("Usuario " + data.nick + " ha sido registrado");
          //mostrar un mensaje
          msg = "Bienvenido al sistema, " + data.nick;
          $.cookie("nick", data.nick);
        } else {
          console.log("El nick ya está ocupado");
        }
        cw.limpiar();
        cw.mostrarMsg(msg);
      },
      error: function (xhr, textStatus, errorThrown) {
        //console.log(JSON.parse(xhr.responseText));
        console.log("Status: " + textStatus);
        console.log("Error: " + errorThrown);
      },
      contentType: "application/json",
      //dataType:'json'
    });
  };

  this.registrarUsuario = function (email, password) {
    $.ajax({
      type: "POST",
      url: "/registrarUsuario",
      data: JSON.stringify({ email: email, password: password }),
      success: function (data) {
        if (data.nick != -1) {
          console.log("Usuario " + data.nick + " ha sido registrado");
          // mostrar un mensaje diciendo: consulta tu email
          //$.cookie("nick",data.nick);
          cw.limpiar();
          //cw.mostrarMensaje("Bienvenido al sistema, "+data.nick);
//                                                                        cw.mostrarLogin();
        } else {
          console.log("El nick está ocupado");
          //cw.mostrarMensajeLogin("El nick está ocupado");
        }
      },
      error: function (xhr, textStatus, errorThrown) {
        console.log("Status: " + textStatus);
        console.log("Error: " + errorThrown);
      },
      contentType: "application/json",
    });
  };
}
