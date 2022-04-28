import axios from "axios"
const apiKeyTMDB = process.env.REACT_APP_KEY_TMDB

export function loadActorName(data) {
    return ({
        type: 'LOAD_ACTOR_NAME',
        payload: data.response.actorName
    })
}

export function loadActorDetail(name) {
    if(name === "clean") {
        return({
            type: "DETAIL_ACTOR",
            payload: []
        })
    } else {
        return async (dispatch) => {
            try {
                const data = await axios(`https://api.themoviedb.org/3/search/person?api_key=${apiKeyTMDB}&query=${name.replace(" ", "+")}`)
                return dispatch({
                    type: "DETAIL_ACTOR",
                    payload: data.data.results
                })
            } catch (error) {
                console.log(error.message)
            }
        }
    }
}