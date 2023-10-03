function ControlWeb() {
  this.mostrarAgregarUsuario = function () {
    let cadena = '<div class="form-group">';
    cadena += '<label for="nick">Introduce el nick:</label>';
    cadena += '<input type="text" class="form-control" id="nick">';
    cadena += '<button id="btnAU" type="submit" class="btn btn-primary">Submit</button>';
    cadena += "</div>";

    $("#au").append(cadena); //au = agregar usuario
    $("#btnAU").on("click", function(){
        let nick=$("#nick").val();
        rest.agregarUsuario(nick) 
    })
  };
}
