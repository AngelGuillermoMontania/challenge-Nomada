const initialState = {
    actorName: "",
    actorDetail: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOAD_ACTOR_NAME":
            return ({
                ...state,
                actorName: action.payload
            })
        case "DETAIL_ACTOR": 
            return ({
                ...state,
                actorDetail: action.payload
            });
        default:
            return {
                ...state,
            };
    };
};

export default rootReducer;