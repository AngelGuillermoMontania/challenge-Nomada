const initialState = {
    nameFamous: ""
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOAD_FAMOUS":
            return ({
                ...initialState,
                nameFamous: action.payload
            })
            break
        default:
            return {
                ...state,
            };
    }
};

export default rootReducer;