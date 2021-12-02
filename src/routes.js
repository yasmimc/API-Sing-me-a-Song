import { Router } from 'express';

const routes = Router();

routes.get('/health', (req, res) => {
    res.send('Healthy');
});

export default routes;
