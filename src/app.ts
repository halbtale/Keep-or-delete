import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import router from './router';
const app = express();

app.use(express.static(path.join(process.cwd(), 'static')));

app.use(express.json())

app.use('/api', router);

// Error Handler
app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
    res.status(500).json({
        message: err.message,
    });
});

export default app;
