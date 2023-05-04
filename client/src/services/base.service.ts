import { AxiosResponse } from 'axios';
import { injectable } from 'inversify';
import { backendUrl } from '../config';
import 'reflect-metadata';

@injectable()
abstract class BaseService {
    protected _api: string;

    constructor() {
        this._api = backendUrl || '';
    }

    protected doCall<T>(callProducer: () => Promise<AxiosResponse<T>>, errorMessage?: string): Promise<T> {
        return new Promise((resolve, reject) => {
            callProducer()
                .then((resp) => resolve(resp.data))
                .catch((err) => {
                    if (!err.response) {
                        // only handle request errors, that actually are an error but not things like request aborted
                        // i.e. whenever a request is running in the background and the user is logging out or gets
                        // gets logged out because the token expired
                        reject(err);
                        return;
                    }

                    reject(err);
                });
        });
    }
}

export default BaseService;
