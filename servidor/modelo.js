function Sistema() {
    this.usuarios = {};

    this.agregarUsuario = function (nick) {
        if (this.usuarioActivo(nick)) {
            console.log("Ya existe el usuario " + nick);
            return;
        }
        console.log("Nuevo usuario con nick: " + nick);
        this.usuarios[nick] = new Usuario(nick);
    }

    this.obtenerUsuarios = function () {
        return this.usuarios;
    }

    this.usuarioActivo = function (nick) {
        return nick in this.usuarios;
    }

    this.eliminarUsuario = function(nick){
        if (this.usuarioActivo(nick)) {
            delete this.usuarios[nick];
            console.log("Usuario eliminado: " + nick);
        } else {
            console.log("El usuario " + nick + " no existe");
        }
    }

    this.numeroUsuarios = function(){
        let lista=Object.keys(this.usuarios)
        return lista.length
    }
}

function Usuario(nick) {
    this.nick = nick;
}

module.exports.Sistema=Sistema

