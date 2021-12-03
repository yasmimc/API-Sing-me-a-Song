import { Router } from 'express';

const routes = Router();

routes.get('/health', (req, res) => {
    try {
        res.send('Healthy');
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

export default routes;
