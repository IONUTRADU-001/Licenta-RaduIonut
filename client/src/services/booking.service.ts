import { injectable } from "inversify";
import BaseService from "./base.service";
import axios from "axios";

@injectable()
export class BookingService extends BaseService {
    public async getAllBookings(tokenPromise: any): Promise<any[]> {
        let token = await tokenPromise
        
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        return this.doCall(() => axios.get<any[]>(`${this._api}/bookings`, { headers }));
    }

    public async bookPlace(params: any): Promise<any> {
        return this.doCall(() => axios.post<any>(`${this._api}/bookings`, params));
    }
}