import { useContext } from 'react';
import { interfaces } from 'inversify';
import { InversifyContext } from '../context';

export function useService<T>(identifier: interfaces.ServiceIdentifier<T>) {
    const { container } = useContext(InversifyContext);
    if (!container) {
        throw new Error('useService must be used within a InversifyContext.Provider');
    }
    return container.get<T>(identifier);
}
