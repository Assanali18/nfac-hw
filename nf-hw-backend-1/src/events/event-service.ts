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
                { name: "Fronted Day", description: "", date: new Date("2024-08-09"), location: "Almaty, Satbayev University", duration: "9:00 AM - 12:00 PM" },
                { name: "A Day", description: "dsdasd", date: new Date("2024-08-09"), location: "Almaty, Satbayev University", duration: "9:00 AM - 12:00 PM" },
                { name: "B Day", description: "dasdas", date: new Date("2024-07-09"), location: "Almaty, Satbayev University", duration: "9:00 AM - 12:00 PM" },
                { name: "C Day", description: "egaewg", date: new Date("2024-06-09"), location: "Almaty, Satbayev University", duration: "9:00 AM - 12:00 PM" },
                { name: "D Day", description: "geaaeg", date: new Date("2024-05-09"), location: "Almaty, Satbayev University", duration: "9:00 AM - 12:00 PM" },
                { name: "E Day", description: "grearg", date: new Date("2024-03-09"), location: "Almaty, Satbayev University", duration: "9:00 AM - 12:00 PM" },
                { name: "F Day", description: "regear", date: new Date("2024-01-09"), location: "Almaty, Satbayev University", duration: "9:00 AM - 12:00 PM" },
                { name: "G Day", description: "ergaerg", date: new Date("2023-08-09"), location: "Almaty, Satbayev University", duration: "9:00 AM - 12:00 PM" },
                { name: "H Day", description: "ergaerg", date: new Date("2022-08-09"), location: "Almaty, Satbayev University", duration: "9:00 AM - 12:00 PM" },
                { name: "I Day", description: "aegra", date: new Date("2021-08-09"), location: "Almaty, Satbayev University", duration: "9:00 AM - 12:00 PM" },
                { name: "J Day", description: "aegaeg", date: new Date("2020-08-09"), location: "Almaty, Satbayev University", duration: "9:00 AM - 12:00 PM" },
            ];
            await EventModel.insertMany(initialEvents);
        }
    }
}

export default EventService;
