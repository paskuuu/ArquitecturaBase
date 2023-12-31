function ControlWeb() {
  this.mostrarAgregarUsuario = function () {
    $("#bnv").remove();
    $("#mAU").remove();
    let cadena = '<div id="mAU">';
    cadena = cadena + '<div class="card"><div class="card-body">';
    cadena = cadena + '<div class="form-group">';
    cadena = cadena + '<label for="nick">Nick:</label>';
    cadena =
      cadena +
      '<p><input type="text" class="form-control" id="nick" placeholder="introduce un nick"></p>';
    cadena =
      cadena +
      '<button id="btnAU" type="submit" class="btn btn-primary">Submit</button>';
    cadena =
      cadena +
      '<div><a href="/auth/google"><img src="./cliente/img/btn_google_signin_dark_normal_web.png" style="height:40px;"></a></div>';
    cadena = cadena + "</div>";
    cadena = cadena + "</div></div></div>";

    $("#au").append(cadena); //au = agregar usuario

    $("#btnAU").on("click", function () {
      let nick = $("#nick").val();
      if (nick) {
        $("#mAU").remove();
        rest.agregarUsuario(nick);
      }
    });
  };

  this.mostrarMsg = function (msg) {
    $("#mMsg").remove();
    let cadena = '<h2 id="mMsg">' + msg + "</msg>";
    $("#msg").append(cadena);
  };

  // - obtenerUsuarios
  // - numeroUsuarios
  // - usuarioActivo(nick)
  // - eliminarUsuario(nick)

  this.mostrarObtenerUsuarios = function () {
    $("#linkOU").on("click", function () {
      $("#mAU").remove();
      rest.obtenerUsuarios();
    });
  };

  // this.comprobarSesion = function () {
  //   let nick = localStorage.getItem("nick");

  //   if (nick) {
  //     cw.mostrarMsg("Bienvenido al sistema, " + nick);
  //   } else {
  //     cw.mostrarAgregarUsuario();
  //   }
  // };

  // this.salir = function () {
  //   localStorage.removeItem("nick");
  //   location.reload();
  // };

  this.comprobarSesion = function () {
    //let nick=localStorage.getItem("nick");
    let nick = $.cookie("nick");
    if (nick) {
      cw.mostrarMsg("Bienvenido al sistema, " + nick);
    } else {
      //cw.mostrarAgregarUsuario();
      cw.mostrarLogin();
      cw.init();
    }
  };

  this.init = function () {
    let cw = this;
    google.accounts.id.initialize({
      client_id:
        "661794186721-h1qmatb73ojdehhgm5hadr2qchstucn7.apps.googleusercontent.com", //prod
      auto_select: false,
      callback: cw.handleCredentialsResponse,
    });
    google.accounts.id.prompt();
  };

  this.salir = function () {
    $.removeCookie("nick");
    location.reload();
  };

  this.handleCredentialsResponse = function (response) {
    let jwt = response.credential;
    let user = JSON.parse(atob(jwt.split(".")[1]));
    console.log(user.name);
    console.log(user.email);
    console.log(user.picture);
    rest.enviarJwt(jwt);
  };

  this.limpiar = function () {
    $("#mAU").remove();
  };

  this.mostrarRegistro = function () {
    if ($.cookie("nick")) {
      return true;
    }
    $("#fmRegistro").remove();
    $("#registro").load("./cliente/registro.html", function () {
      $("#btnRegistro").on("click", function () {
        let email = $("#email").val();
        let pwd = $("#pwd").val();
        if (email && pwd) {
          rest.registrarUsuario(email, pwd);
          console.log(email + " " + pwd);
        }
      });
    });
  };

  this.mostrarLogin = function () {
    if ($.cookie("nick")) {
      return true;
    }
    $("#fmLogin").remove();
    $("#registro").load("./cliente/login.html", function () {
      $("#btnLogin").on("click", function () {
        let email = $("#email").val();
        let pwd = $("#pwd").val();
        if (email && pwd) {
          rest.loginUsuario(email, pwd);
          console.log(email + " " + pwd);
        }
      });
    });
  };

  this.buscarUsuario = function (obj, callback) {
    buscar(this.usuarios, { email: obj.email }, callback);
  };

  this.insertarUsuario = function (usuario, callback) {
    insertar(this.usuarios, usuario, callback);
  };

  function buscar(coleccion, criterio, callback) {
    let col = coleccion;
    coleccion.find(criterio).toArray(function (error, usuarios) {
      if (usuarios.length == 0) {
        callback(undefined);
      } else {
        callback(usuarios[0]);
      }
    });
  }

  function insertar(coleccion, elemento, callback) {
    coleccion.insertOne(elemento, function (err, result) {
      if (err) {
        console.log("error");
      } else {
        console.log("Nuevo elemento creado");
        callback(elemento);
      }
    });
  }
}
