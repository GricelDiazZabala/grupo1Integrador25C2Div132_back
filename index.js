import express from 'express';
import environments from './src/config/environments.js';
import cors from 'cors';
import { ventasRouter } from './src/api/routes/index.js';

const app = express();
const PORT = environments.port;
app.use(cors());
app.use(express.json());

app.use('/api/ventas', ventasRouter);


app.listen(PORT, () => {
    console.log("Server corriendo en puerto " + PORT);
});