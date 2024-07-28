import express, { Application } from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import cors from 'cors';
import https from 'https';
import fs from 'fs';

// Importar rutas de módulos
import salonRoutes from './salon/routes/salonRoutes';
import reservationRoutes from './reservation/routes/reservationRoutes';
import mobiliaryRoutes from './mobiliary/routes/mobiliaryRoutes';
import clientRoutes from './client/routes/clientRoutes';
import userRoutes from './user/routes/userRoutes';
import suppliesRoutes from './supplies/routes/suppliesRoutes';
import rentedMobiliaryRoutes from './rentedMobiliary/routes/rentedMobiliaryRoutes';
import packageTypeRoutes from './package_type/routes/packageTypesRoutes';

// Importar middlewares compartidos
import { errorHandler } from './shared/middlewares/errorHandler';
import { notFoundHandler } from './shared/middlewares/notFoundHandler';
import { authMiddleware } from './shared/middlewares/auth';

// Configuración de variables de entorno
dotenv.config();

// Crear la aplicación de Express
const app: Application = express();
const port: number = parseInt(process.env.PORT as string, 10) || 8000;

// Middleware de análisis del cuerpo
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Middleware para autentificación
app.use(authMiddleware);

// Rutas de los módulos
app.use('/api/user', userRoutes);
app.use('/api/salon', salonRoutes);
app.use('/api/reservation', reservationRoutes);
app.use('/api/mobiliary', mobiliaryRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/supplies', suppliesRoutes);
app.use('/api/rentedmobiliary', rentedMobiliaryRoutes);
app.use('/api/packageTypes', packageTypeRoutes);

// Middleware para manejar rutas no encontradas
app.use(notFoundHandler);

// Middleware de manejo de errores
app.use(errorHandler);

// Ruta de prueba
app.get('/', (_req, res) => {
  res.send('HTTPS!');
});

// Iniciar el servidor
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
} else {
  try {
    const options = {
      key: fs.readFileSync('/etc/letsencrypt/live/flamingoapi.integrador.xyz/privkey.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/live/flamingoapi.integrador.xyz/fullchain.pem')
    };

    https.createServer(options, app).listen(port, () => {
      console.log(`Servidor HTTPS corriendo en el puerto ${port}`);
    });
  } catch (error) {
    console.error('Error al leer los certificados SSL:', error);
    process.exit(1);
  }
}
