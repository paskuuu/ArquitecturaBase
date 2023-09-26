const modelo = require("./modelo.js")

describe("El sistema", function () {
  let sistema;

  beforeEach(function () {
    sistema = new modelo.Sistema();
  });

  it("inicialmente no hay usuarios", function () {
    expect(sistema.numeroUsuarios()).toEqual(0);
  });

  //escribe un bloque it() por cada método (agregarUsuario, obtenerUsuarios, usuarioActivo y eliminarUsuario).

  it("numero usuarios", function(){
    expect(sistema.numeroUsuarios()).toEqual(0);
    sistema.agregarUsuario("prueba");
    expect(sistema.numeroUsuarios()).toEqual(1);
  })

  it("agregar usuario", function() {
    let num = Object.keys(sistema.usuarios).length
    expect(num).toEqual(0);
    sistema.agregarUsuario("prueba");
    num = Object.keys(sistema.usuarios).length
    expect(num).toEqual(1);
    expect(sistema.usuarioActivo("prueba")).toEqual(true)
  })

  it("obtener usuarios", function() {
    expect(sistema.usuarios).toEqual(sistema.obtenerUsuarios())
  })

  it("usuario activo", function(){
    sistema.agregarUsuario("prueba2");
    expect(sistema.usuarioActivo("prueba2")).toEqual(true);
  })

  it("eliminar usuario", function(){
    sistema.agregarUsuario("prueba3");
    sistema.eliminarUsuario("prueba3");
    expect(sistema.usuarioActivo("prueba3")).toEqual(false);
  })

});