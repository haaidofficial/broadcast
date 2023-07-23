export function windowHistoryApi(data) {
    const {state, key, url} = data;
    window.history.pushState(state, key, url);
}


export function windowHistoryRemoveState(data) {
    const {state, key, url} = data;
    window.history.replaceState(state, key, url)
}