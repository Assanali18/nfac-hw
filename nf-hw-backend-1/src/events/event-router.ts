import { Router } from 'express';
import EventController from './event-controller';
import EventService from './event-service';
import AuthService from '../auth/auth-service';

//in order to provide our frontend with the user data, we need to specify user routes

const eventRouter = Router();

const eventService = new EventService();
const authService = new AuthService();
const eventController = new EventController(eventService, authService);

eventRouter.get('/events/', eventController.getEvents);
eventRouter.post('/events/', eventController.createEvent);
eventRouter.get('/events/:id', eventController.getEventById);

export default eventRouter;
