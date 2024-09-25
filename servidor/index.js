const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
// const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const Usuario = require('./modelos/usuario');

//CONEXIÓN A LA BASE DE DATOS
mongoose.connect('mongodb://127.0.0.1:27017/blog-prueba');
const db = mongoose.connection; 

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Base de datos conectada");
});
//CONEXIÓN A LA BASE DE DATOS

//CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header(
      "Access-Control-Allow-Headers",
      "X-Requested-With, Content-Type, Accept, Origin, Authorization"
    );
    next();
});
//CORS

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

//PASSPORT Y SESSION
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log(profile);
            const usuarioEncontrado = await Usuario.findOne({ googleId: profile.id });
            if (usuarioEncontrado) {
                return done(null, usuarioEncontrado);
            } else {
                const nuevoUsuario = new Usuario({
                    nombre: profile.displayName,
                    googleId: profile.id,
                    email: profile.emails[0].value,
                });
                await nuevoUsuario.save();
                return done(null, nuevoUsuario);
            }           
        }    
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    const usuario = Usuario.findById(user.id);
    console.log(user);
    
    done(null, user);
});

//PASSPORT Y SESSION

//RUTAS
const rutasUsuarios = require("./rutas/usuarios");
app.use("/api/usuarios", rutasUsuarios);

const rutasPublicaciones = require("./rutas/publicaciones");
app.use("/api/publicaciones", rutasPublicaciones);

app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
//RUTAS

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
})