import { Request, Response } from 'express';
import { CreateEventDto } from './dtos/CreateEvent.dto';
import EventService from './event-service';
import AuthService from '../auth/auth-service';

class EventController {
    private eventService: EventService;
    private authService: AuthService;

    constructor(eventService: EventService, authService: AuthService) {
        this.eventService = eventService;
        this.authService = authService;
    }

    createEvent = async (req: Request, res: Response): Promise<void> => {
        try {
            const eventDto: CreateEventDto = req.body;
            const newEvent = await this.eventService.createEvent(eventDto);
            res.status(201).json(newEvent);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    };


    getEventById = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id;
            const event = await this.eventService.getEventById(id);
            if (!event) {
                res.status(404).json({ error: "Event not found" });
            } else {
                res.status(200).json(event);
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    };

    getEvents = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            
            if (!token) {
                res.status(401).json({ message: 'Authentication token is missing!' });
                return;
            }
            const decoded = this.authService.verifyJwt(token);
            if (!decoded) {
                res.status(401).json({ message: 'Invalid token!' });
                return;
            }

            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const sortBy = req.query.sortBy as string || 'date';
            const sortDirection = req.query.sortDirection as string || 'asc';

            if (!['date', 'name'].includes(sortBy)) {
                res.status(400).json({ error: "Invalid sortBy parameter" });
                return;
            }
            if (!['asc', 'desc'].includes(sortDirection)) {
                res.status(400).json({ error: "Invalid sortDirection parameter" });
                return;
            }
            
            const userCity = decoded.city;
            const allEvents = await this.eventService.getEvents(page, limit, sortBy, sortDirection);
            const events = allEvents.filter(event => {
                const cityFromLocation = event.location.split(',')[0].trim(); 
                return cityFromLocation === userCity;
            });
            
            
            res.status(200).json(events);
        } catch (err) {
            res.status(500).json({ message: 'Error retrieving events' });
        }
    };
}

export default EventController;
