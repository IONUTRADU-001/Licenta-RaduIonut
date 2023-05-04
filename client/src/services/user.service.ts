import { injectable } from "inversify";
import BaseService from "./base.service";
import axios from "axios";
import { User } from "models/user.model";

@injectable()
export class UserService extends BaseService {
    public async login(email: string, password: string): Promise<User> {
        return this.doCall(() => axios.post<User>(`${this._api}/login`, { email, password }))
    }

    public async logout(): Promise<any> {
        return this.doCall(() => axios.post<any>(`${this._api}/logout`))
    }

    public async getUser(tokenPromise: any): Promise<User> {
        let token = await tokenPromise
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        
        return this.doCall(() => axios.get<User>(`${this._api}/profile`, { headers }))
    }

    public async registerNewUser(name: string, email: string, password: string): Promise<any> {
        return this.doCall(() => axios.post<any>(`${this._api}/register`, { name, email, password }))
    }
}