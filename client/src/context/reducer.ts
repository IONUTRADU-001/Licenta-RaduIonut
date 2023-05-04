import { ContextState } from "./state";

export type ContextAction =
    | {
        type: 'setUser';
        user: ContextState['user'];
        ready: ContextState['ready'];
    }


export function reducer(state: ContextState, action: ContextAction): ContextState {
    switch (action.type) {
        case 'setUser': {
            const { user, ready } = action;
            return { user, ready };
        }

        default: {
            throw new Error(`Unhandled action type: ${action}`);
        }
    }
}