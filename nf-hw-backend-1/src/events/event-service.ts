import { CreateEventDto } from './dtos/CreateEvent.dto';
import EventModel from './models/Event';

class EventService {
    async getEvents(page: number = 1, limit: number = 10, sortBy: string = 'date', sortDirection: string = 'asc'): Promise<any[]> {
        const skip = (page - 1) * limit;
        let sortObject = {};
        sortObject[sortBy] = sortDirection === 'desc' ? -1 : 1;
    
        return EventModel.find().sort(sortObject).skip(skip).limit(limit);
    }

    async getEventById(id: string): Promise<any | null> {
        console.log(id);    
        
        return EventModel.findById(id).exec();
    }

    async createEvent(eventDto: CreateEventDto): Promise<any> {
        const newEvent = new EventModel(eventDto);
        await newEvent.save();
        return newEvent;
    }

    async seedEvents(): Promise<void> {
        const existingCount = await EventModel.countDocuments();
        if (existingCount === 0) {
            const initialEvents = [
                { name: "Art Fair", description: "Explore the latest works from local and international artists", date: new Date(), location: "Almaty, KBTU", duration: "10:00 AM - 6:00PM" },
                { name: "Backend Lecture", description: "", date: new Date("2024-06-11"), location: "Almaty, Satbayev University", duration: "9:15 AM - 11:15AM" },
                { name: "Demo Day", description: "", date: new Date("2024-08-09"), location: "Almaty, Satbayev University", duration: "9:00 AM - 12:00 PM" }
            ];
            await EventModel.insertMany(initialEvents);
        }
    }
}

export default EventService;
