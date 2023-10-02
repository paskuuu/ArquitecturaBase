function ClienteRest() {

  this.agregarUsuario = function (nick) {
    var cli = this;
    $.getJSON("/agregarUsuario/" + nick, function (data) {
      if (data.nick != -1) {
        console.log("Usuario " + nick + " ha sido registrado");
      } else {
        console.log("El nick ya está ocupado");
      }
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
        console.log("Usuarios: " + data.usuarios);
      } else {
        console.log("No hay usuarios");
      }
    });
  };

  this.numeroUsuarios = function () {
    var cli = this;
    $.getJSON("/numeroUsuarios", function (data) {
      console.log("Numero de usuarios: " + data.usuarios)
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
        console.log("Usuario " + nick + " ha sido borrado. La lista de usuarios es " + data.usuarios);
      } else {
        console.log("No se ha podido ese usuario");
      }
    });
  };
}
