function ControlWeb() {
  this.mostrarAgregarUsuario = function () {
    let cadena = '<div id="mAU" class="form-group">';
    cadena += '<label for="nick">Introduce el nick:</label>';
    cadena += '<input type="text" class="form-control" id="nick">';
    cadena +=
      '<button id="btnAU" type="submit" class="btn btn-primary">Submit</button>';
    cadena += "</div>";

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
    let cadena = '<h2 id="mMsg">' + msg + '</msg>';
    $("#msg").append(cadena);
  };
}
