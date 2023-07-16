export function windowHistoryApi(data) {
    const {state, key, url} = data;
    window.history.pushState(state, key, url);
}