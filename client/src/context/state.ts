export interface ContextState {
    user: any;
    ready: boolean;
}

const initialState = (): ContextState => {
    return {
        user: null,
        ready: false
    };
};

export default initialState;