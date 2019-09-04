import { FilesActionTypes, FILES_LOAD, FileSystemEntry, FILES_LOAD_COMPLETE, FILES_LOAD_FAILED, FILES_UPLOAD, FILES_UPLOAD_COMPLETE, FILES_UPLOAD_FAILED, FILES_SELECT_TOGGLE, FILES_SELECT_ALL, FILES_SELECT_NONE } from "./types";
import { AppState } from "..";
import { ThunkAction } from "redux-thunk";
import { readdir, stat, writeFile } from '../../services/fs';
import path from "../../services/path";
import { arrayBuffer2Buffer } from "browserfs/dist/node/core/util";

type ThunkResult<R> = ThunkAction<R, AppState, undefined, FilesActionTypes>;

async function browseFiles(cwd: string): Promise<FileSystemEntry[]> {
    var entries = await readdir(cwd);
    var result: FileSystemEntry[] = [];
    var stats = await Promise.all(entries.map(entry => stat(path.join(cwd, entry))));

    for (var i = 0; i < entries.length; i++) {
        var name = entries[i];
        var st = stats[i];

        if (st.isFile()) {
            result.push({ type: 'file', name: name, ctime: st.ctime, atime: st.atime, mtime: st.mtime });
        } else if (st.isDirectory()) {
            result.push({ type: 'dir', name: name, ctime: st.ctime, atime: st.atime, mtime: st.mtime });
        }
    }
    return result;
}

export function loadFiles(cwd: string): ThunkResult<void> {
    return dispatch => {
        dispatch({ type: FILES_LOAD, path: cwd });
        browseFiles(cwd)
            .then(files => {
                dispatch({ type: FILES_LOAD_COMPLETE, path: cwd, entries: files });
            })
            .catch(err => {
                dispatch({ type: FILES_LOAD_FAILED, path: cwd, reason: err.toString() });
            });
    };
}

async function uploadFiles(cwd: string, files: { [index: string]: Buffer }): Promise<void> {
    await Promise.all(Object.keys(files).map(file => writeFile(path.join(cwd, file), files[file])));
}

async function loadBuffer(file: File): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.onerror = (err) => {
            reject(new Error('failed to read file buffer'));
        };
        reader.onload = () => {
            resolve(arrayBuffer2Buffer(reader.result as ArrayBuffer));
        };

        reader.readAsArrayBuffer(file);
    });
}

export function saveFiles(fileList: FileList): ThunkResult<void> {
    return async (dispatch, getState) => {
        var fileArray = Array.prototype.slice.call(fileList);
        var state = getState();
        var files: { [index: string]: Buffer } = {};
        var fileData = await Promise.all(fileArray.map(loadBuffer));
        for (var i = 0; i < fileList.length; i++) {
            files[fileList[i].name] = fileData[i];
        }

        dispatch({ type: FILES_UPLOAD, files: files });
        uploadFiles(state.files.cwd, files)
            .then(() => {
                dispatch({ type: FILES_UPLOAD_COMPLETE });
                dispatch(loadFiles(state.files.cwd));
            })
            .catch(err => {
                dispatch({ type: FILES_UPLOAD_FAILED, reason: err.toString() });
            });
    };
}

export function selectEntry(name: string): FilesActionTypes {
    return {
        type: FILES_SELECT_TOGGLE,
        name
    };
}

export function selectAll(): FilesActionTypes {
    return {
        type: FILES_SELECT_ALL
    };
}

export function unselectAll(): FilesActionTypes {
    return {
        type: FILES_SELECT_NONE
    };
}