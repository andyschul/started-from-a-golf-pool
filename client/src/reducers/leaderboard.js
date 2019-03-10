export function leaderboardHasErrored(state = false, action) {
    switch (action.type) {
        case 'LEADERBOARD_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;
    }
}

export function leaderboardIsLoading(state = false, action) {
    switch (action.type) {
        case 'LEADERBOARD_IS_LOADING':
            return action.isLoading;
        default:
            return state;
    }
}

export function leaderboard(state = {status: '', leaderboard: []}, action) {
    switch (action.type) {
        case 'LEADERBOARD_FETCH_DATA_SUCCESS':
            return action.leaderboard;
        case 'LEADERBOARD_EXPAND_ROW':
            return {
              ...state,
              leaderboard: state.leaderboard.map(item =>
                item.id === action.id ? { ...item, expanded: !item.expanded } : item
              )
            }
        default:
            return state;
    }
}