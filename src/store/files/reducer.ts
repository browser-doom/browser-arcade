import { FilesState, FilesActionTypes, FILES_LOAD, FILES_LOAD_FAILED, FILES_LOAD_COMPLETE, FILES_UPLOAD, FILES_UPLOAD_FAILED, FILES_UPLOAD_COMPLETE, FILES_SELECT_TOGGLE, FILES_SELECT_ALL, FILES_SELECT_NONE } from "./types";

const initialState: FilesState = {
    cwd: '/',
    initialized: false,
    entries: [],
    loading: false,
    saving: false,
    deleting: false,
    error: null,
    selected: {},
    openFile: null
};

export function filesReducer(state = initialState, action: FilesActionTypes) {
    switch(action.type) {
        case FILES_LOAD:
            return { ...state, initialized: true, loading: true, error: null };
        case FILES_LOAD_FAILED:
            return  { ...state, loading: false, error: action.reason };
        case FILES_LOAD_COMPLETE:
            return { ...state, loading: false, entries: action.entries, cwd: action.path, selected: {} };
        case FILES_UPLOAD:
            return { ...state, saving: true, error: null };
        case FILES_UPLOAD_FAILED:
            return { ...state, saving: false, error: action.reason };
        case FILES_UPLOAD_COMPLETE:
            return { ...state, saving: false };
        case FILES_SELECT_TOGGLE:
            return { ...state, selected: { ...state.selected, [action.name]: !state.selected[action.name] }};
        case FILES_SELECT_ALL:
            var selected : {[index: string]: boolean} = {};
            for(var x of state.entries) {
                selected[x.name] = true;
            }
            return { ...state, selected };
        case FILES_SELECT_NONE:
            var unselected : {[index: string]: boolean} = {};
            for(var y of state.entries) {
                unselected[y.name] = false;
            }
            return { ...state, selected: unselected };
    }
    return state;
}