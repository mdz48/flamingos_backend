import { Router } from 'express';
import { getSalons, getSalonById, createSalon, updateSalon, deleteSalon } from '../controllers/salonController';

const salonRoutes: Router = Router();

salonRoutes.get('/', getSalons);
salonRoutes.get('/:salon_id', getSalonById);
salonRoutes.post('/', createSalon);
salonRoutes.put('/:salon_id', updateSalon);
salonRoutes.delete('/:salon_id', deleteSalon);

export default salonRoutes;
