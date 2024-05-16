'use strict'

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import Publication from '../src/publication/publication.model.js';
import publicationRoutes from '../src/publication/publication.routes.js';
import commentRoutes from '../src/comment/comment.routes.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.publicationPath = '/blog/v1/publication';
        this.commentPath = '/blog/v1/comment';

        this.middlewares();
        this.conectarDB();
        this.routes();
        this.crearPublicaciones()
    }

    async conectarDB() {
        await dbConnection();
    }

    async crearPublicaciones() {
        const existenPublicaciones = await Publication.findOne({ title: 'TonnysKinal' });

        if (!existenPublicaciones) {

            const firstPublication = {
                title: 'TonnysKinal',
                descript: 'Aplicacion web para gestionar eventos hoteleras',
                text: 'Este proyecto fue elaborado en un lapso de 3 meses en donde aplicamos las tecnologias de: java, javaFX y MySQL',
                img: 'img'
            };

            const firstPub = new Publication(firstPublication);
            await firstPub.save();

            const secondPublication = {
                title: 'Kinepolis',
                descript: 'En este proyecto hicimos una aplicacion que gestionaba un cine similar a cinepolis',
                text: 'Este Proyecto fue elaborado en equipo echo en 2 meses con las tecnologias: Java, JavaScript, html, css y MySQL',
                img: 'img'
            };

            const secondPub = new Publication(secondPublication);
            await secondPub.save();

            const thirdPublication = {
                title: 'Api para Adopcion de mascotas',
                descript: 'Este proyecto sirve para register y conseguir a un nuevo amigo(mascota)',
                text: 'Este proyecto se llevo acabo en una semana echa con base a NodeJs con el framework de Expresss',
                img: 'img'
            };

            const thirdPub = new Publication(thirdPublication);
            await thirdPub.save();
        }
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes() {
        this.app.use(this.publicationPath, publicationRoutes);
        this.app.use(this.commentPath, commentRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port: ', this.port);
        });
    }
}

export default Server;