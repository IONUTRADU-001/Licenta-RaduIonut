import { Container } from 'inversify';
import { UserService } from "../services/user.service";
import { PlaceService } from "../services/place.service";
import { BookingService } from "../services/booking.service";

export const container = new Container();
container.bind(UserService).toSelf().inSingletonScope();
container.bind(PlaceService).toSelf().inSingletonScope();
container.bind(BookingService).toSelf().inSingletonScope();