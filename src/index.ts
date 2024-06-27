import express, { Application } from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';

// Importar rutas de módulos
import employeeRoutes from './employee/routes/employeeRoutes';
import salonRoutes from './salon/routes/salonRoutes';
import reservationRoutes from './reservation/routes/reservationRoutes';
import mobiliaryRoutes from './mobiliary/routes/mobiliaryRoutes';
import clientRoutes from './client/routes/clientRoutes';
import userRoutes from './user/routes/userRoutes';

// Importar middlewares compartidos
import { errorHandler } from './shared/middlewares/errorHandler';
import { notFoundHandler } from './shared/middlewares/notFoundHandler';
import { authMiddleware } from './shared/middlewares/auth';

// Configuración de variables de entorno
dotenv.config();

// Crear la aplicación de Express
const app: Application = express();
const port: number = parseInt(process.env.PORT as string, 10);

// Middleware de análisis del cuerpo
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas de los módulos
app.use('/api/employee', employeeRoutes);
app.use('/api/user', userRoutes);
app.use('/api/salon', salonRoutes);
app.use('/api/reservation', reservationRoutes);
app.use('/api/mobiliary', mobiliaryRoutes);
app.use('/api/client', clientRoutes);

// Middleware para manejar rutas no encontradas
app.use(notFoundHandler);

// Middleware de manejo de errores
app.use(errorHandler);

// Middleware para autentificación
app.use(authMiddleware);


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
