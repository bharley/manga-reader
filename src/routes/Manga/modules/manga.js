import api from 'utils/api';

// ------------------------------------
// Constants
// ------------------------------------
export const LOAD = 'manga/LOAD';
export const LOAD_SUCCESS = 'manga/LOAD_SUCCESS';
export const LOAD_FAIL = 'manga/LOAD_FAIL';

// ------------------------------------
// Helpers
// ------------------------------------
export function isLoaded(state, manga, chapter = null) {
  return state
    && state.manga
    && state.manga[manga]
    && (chapter || state.manga[manga][chapter])
    && (!chapter || state.manga[manga].latest);
}

// ------------------------------------
// Actions
// ------------------------------------
export function loadTitle(title) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: () => api.get(`manga/${title}`),
  };
}

export function loadChapter(chapter) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: () => api.get(`manga/chapter/${chapter}`),
  };
}

export const actions = {
  loadTitle,
  loadChapter,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOAD]: () => ({
    loading: true,
    error: null,
  }),
  [LOAD_SUCCESS]: (state, { response }) => ({
    ...state,
    loading: false,
    ...response,
  }),
  [LOAD_FAIL]: (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {};
export default function mangaReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
