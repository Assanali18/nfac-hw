import 'dotenv/config';
import express from 'express';
import connectDB from './db';
import globalRouter from './global-router';
import { logger } from './logger';

import EventService from './events/event-service';

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(logger);
app.use(express.json());
app.use('/api/',globalRouter);




app.listen(PORT, () => {
  console.log(`Server runs at http://localhost:${PORT}`);
});




const eventService = new EventService();
eventService.seedEvents().then(() => {
    console.log('Initial events have been seeded');
});