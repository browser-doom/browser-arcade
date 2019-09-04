import { FileModelTypes } from "../../models";

export const FILES_LOAD               = 'FILES_LOAD';
export const FILES_LOAD_FAILED        = 'FILES_LOAD_FAILED';
export const FILES_LOAD_COMPLETE      = 'FILES_LOAD_COMPLETE';
export const FILES_UPLOAD             = 'FILES_UPLOAD';
export const FILES_UPLOAD_FAILED      = 'FILES_UPLOAD_FAIELD';
export const FILES_UPLOAD_COMPLETE    = 'FILES_UPLOAD_COMPLETE';
export const FILES_SELECT_TOGGLE      = 'FILES_SELECT_TOGGLE';
export const FILES_SELECT_ALL         = 'FILES_SELECT_ALL';
export const FILES_SELECT_NONE        = 'FILES_SELECT_NONE';
export const FILES_OPEN_FILE          = 'FILES_OPEN_FILE';
export const FILES_OPEN_FILE_FAILED   = 'FILES_OPEN_FILE_FAILED';
export const FILES_OPEN_FILE_COMPLETE = 'FILES_OPEN_FILE_COMPLETE';

export type FileSystemEntry = {
    name: string;
    type: 'file'|'dir';
    atime: Date;
    ctime: Date;
    mtime: Date;
};

export type FilesState = {
    cwd: string;
    initialized: boolean;
    entries: FileSystemEntry[];
    loading: boolean;
    saving: boolean;
    deleting: boolean;
    error: string|null;
    selected: { [index: string]: boolean };
    openFile: FileModelTypes|null;
};

export type FilesLoadAction = {
    type: typeof FILES_LOAD;
    path: string;
};

export type FilesLoadFailedAction = {
    type: typeof FILES_LOAD_FAILED;
    path: string;
    reason: string;
};

export type FilesLoadCompleteAction = {
    type: typeof FILES_LOAD_COMPLETE;
    path: string;
    entries: FileSystemEntry[];
};

export type FilesUploadAction = {
    type: typeof FILES_UPLOAD;
    files: { [index: string]: Buffer };
};

export type FilesUploadFailedAction = {
    type: typeof FILES_UPLOAD_FAILED;
    reason: string;
}

export type FilesUploadCompleteAction = {
    type: typeof FILES_UPLOAD_COMPLETE;
}

export type FilesSelectToggleAction = {
    type: typeof FILES_SELECT_TOGGLE;
    name: string;
};

export type FilesSelectAllAction = {
    type: typeof FILES_SELECT_ALL;
}

export type FilesSelectNoneAction = {
    type: typeof FILES_SELECT_NONE;
}

export type FilesOpenFile = {
    type: typeof FILES_OPEN_FILE;
    name: string;
}

export type FilesOpenFileFailed = {
    type: typeof FILES_OPEN_FILE_FAILED;
    name: string;
    reason: string;
};

export type FilesOpenFileComplete = {
    type: typeof FILES_OPEN_FILE_COMPLETE;
    model: FileModelTypes;
};

export type FilesActionTypes = FilesLoadAction | FilesLoadFailedAction | FilesLoadCompleteAction |
    FilesUploadAction | FilesUploadFailedAction | FilesUploadCompleteAction |
    FilesSelectToggleAction | FilesSelectAllAction | FilesSelectNoneAction;
