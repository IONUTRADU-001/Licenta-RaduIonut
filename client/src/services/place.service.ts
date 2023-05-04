import { injectable } from "inversify";
import BaseService from "./base.service";
import axios from "axios";
import { Place } from "models/place.model";

@injectable()
export class PlaceService extends BaseService {
    public async getAllPlaces(): Promise<Place[]> {
        return this.doCall(() => axios.get<any[]>(`${this._api}/places`));
    }

    public async getPlaceById(id: string): Promise<Place> {
        return this.doCall(() => axios.get<Place>(`${this._api}/places/${id}`));
    }

    public async getUserPlaces(tokenPromise: any, idPromise: any): Promise<Place[]> {
        let token = await tokenPromise
        let id = await idPromise

        const headers = {
            'Authorization': `Bearer ${token} ${id}`
        };

        return this.doCall(() => axios.get<Place[]>(`${this._api}/user-places`, { headers }));
    }

    public async createPlace(placeData: any): Promise<any> {
        return this.doCall(() => axios.post<any[]>(`${this._api}/places`, placeData));
    }

    public async updatePlace(id: string, placeData: any): Promise<any> {
        return this.doCall(() => axios.put<any[]>(`${this._api}/places`, { id, ...placeData }));
    }
}