var mongo = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectId;

function CAD() {
  this.usuarios;

  this.buscarUsuario = function (criterio, callback) {
    buscar(this.usuarios, criterio, callback);
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

  function buscarOCrear(coleccion, criterio, callback) {
    coleccion.findOneAndUpdate(
      criterio,
      { $set: criterio },
      { upsert: true, returnDocument: "after", projection: { email: 1 } },
      function (err, doc) {
        if (err) {
          throw err;
        } else {
          console.log("Elemento actualizado");
          console.log(doc.value.email);
          //console.log(doc);
          callback({ email: doc.value.email });
        }
      }
    );
  }

  this.buscarOCrearUsuario = function (usr, callback) {
    buscarOCrear(this.usuarios, usr, callback);
  };

  this.conectar = async function (callback) {
    let cad = this;
    let client = new mongo(
      "mongodb+srv://usr:usr@cluster0.wodcdoc.mongodb.net/?retryWrites=true&w=majority"
    );
    await client.connect();
    const database = client.db("sistema");
    cad.usuarios = database.collection("usuarios");
    callback(database);
  };
}

module.exports.CAD = CAD;
