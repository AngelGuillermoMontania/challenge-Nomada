export function loadFamous(info) {
    console.log(info)
    return ({
        type: 'LOAD_FAMOUS',
        payload: info.response.actorName
    })
}