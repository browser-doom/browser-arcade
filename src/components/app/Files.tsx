import './Files.scss';
import React from 'react';
import { FileSystemEntry, FilesActionTypes } from '../../store/files/types';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { ThunkDispatch } from 'redux-thunk';
import { loadFiles, saveFiles, selectEntry, selectAll, unselectAll } from '../../store/files/action';
import path from '../../services/path';
import Checkbox from '../ui/Checkbox';
import { FileModelTypes } from '../../models';
import Button from '../ui/Button';

type OwnProps = {
    initialized: boolean;
    loading: boolean;
    saving: boolean;
    deleting: boolean;
    error: string | null;
    selected: { [index: string]: boolean }
    cwd: string;
    entries: FileSystemEntry[];
    noneSelected: boolean;
    allSelected: boolean;
    anySelected: boolean;
    openFile: FileModelTypes | null;
};

type DispatchProps = {
    loadFiles(cwd: string): void;
    saveFiles(event: React.ChangeEvent<HTMLInputElement>): void;
    loadEntry(event: React.MouseEvent<HTMLElement>): void;
    selectEntry(event: React.ChangeEvent<HTMLInputElement>): void;
    toggleSelectAll(event: React.ChangeEvent<HTMLInputElement>): void;
}

type FilesProps = OwnProps & DispatchProps;

const Files: React.FC<FilesProps> = (props: FilesProps) => {
    if (!props.initialized) {
        props.loadFiles('/');
    }

    const uploadInput = React.createRef<HTMLInputElement>();
    const uploadArchiveInput = React.createRef<HTMLInputElement>();

    const upload = (event: React.BaseSyntheticEvent<MouseEvent,HTMLButtonElement>) => {
        if(uploadInput.current) {
            uploadInput.current.click();
        }
    };
    const uploadArchive = (event: React.BaseSyntheticEvent<MouseEvent, HTMLButtonElement>) => {
        if(uploadArchiveInput.current) {
            uploadArchiveInput.current.click();
        }
    };

    return (<div className="ba-files">
        <input type="file" onChange={props.saveFiles} />
        <Button onClick={upload}><input type="file" ref={uploadInput} style={{display: 'none'}} multiple/>Upload</Button>
        <Button onClick={uploadArchive}><input type="file" ref={uploadArchiveInput} style={{display: 'none'}} accept=".zip,application/zip,application/x-zip,application/x-zip-compressed" multiple/>Upload Archive</Button>
        <table className="ba-files-table">
            <thead>
                <tr>
                <td className="ba-files-checkbox"></td>
                <td>Name</td>
                <td className="ba-files-ctime">Created</td>
                <td className="ba-files-mtime">Modified</td>
                </tr>
            </thead>
            <tbody>
                {props.cwd !== '/' ? (<tr className="ba-files-entry ba-files-up">
                    <td className="ba-files-checkbox"></td>
                    <td data-name={path.join(props.cwd, '..')} data-type="dir" onClick={props.loadEntry}><i className="fas fa-level-up-alt"></i><span style={{ marginLeft: '1em' }}>..</span></td>
                    <td className="ba-files-ctime"></td>
                    <td className="ba-files-mtime"></td>
                </tr>) : null}
                {props.entries.filter(e => e.type === 'dir').sort((a, b) => a > b ? -1 : b > a ? 1 : 0).map(entry => (<tr key={entry.name} className="ba-files-entry ba-files-directory">
                    <td className="ba-files-checkbox"><Checkbox checked={!!props.selected[entry.name]} name={entry.name} onChange={props.selectEntry} /></td>
                    <td data-name={path.join(props.cwd, entry.name)} data-type="dir" onClick={props.loadEntry}>
                        <span className="ba-files-name" >
                            <i className="mr-2 fas fa-folder"></i><span style={{ marginLeft: '0.4em' }}>{entry.name}</span>
                        </span>
                    </td>
                    <td className="ba-files-ctime"></td>
                    <td className="ba-files-mtime"></td>
                </tr>))
                }
                {props.entries.filter(e => e.type === 'file').sort((a, b) => a > b ? -1 : b > a ? 1 : 0).map(entry => (<tr key={entry.name} className="ba-files-entry ba-files-file">
                    <td className="ba-files-checkbox"><Checkbox checked={!!props.selected[entry.name]} name={entry.name} onChange={props.selectEntry} /></td>
                    <td>
                        <span className="ba-files-name" data-name={path.join(props.cwd, entry.name)} data-type="file" onClick={props.loadEntry}>
                            <i className="fas fa-file"></i><span style={{ marginLeft: '0.4em' }}>{entry.name}</span>
                        </span>
                    </td>
                    <td className="ba-files-ctime">{entry.ctime.toLocaleDateString()}</td>
                    <td className="ba-files-mtime">{entry.mtime.toLocaleDateString()}</td>
                </tr>))
                }
            </tbody>
            <tfoot>
                <tr>
                    <td className="ba-files-checkbox"><Checkbox checked={props.allSelected} onChange={props.toggleSelectAll} /></td>
                    <td colSpan={3}><Button disabled={props.noneSelected}><i className="fa fa-trash" aria-label="Delete"></i></Button></td>
                </tr>
            </tfoot>
        </table>
    </div>);
};

function all<T>(arr: T[], predicate: (value: T) => boolean) {
    for(var x of arr) {
        if(!predicate(x)) {
            return false;
        }
    }
    return true;
}
function any<T>(arr: T[], predicate: (value: T) => boolean) {
    for(var x of arr) {
        if(predicate(x)) {
            return true;
        }
    }
    return false;
}

const mapStateToProps = (state: AppState) => {
    var allSelected = all(state.files.entries, file => state.files.selected[file.name]);
    var noneSelected = all(state.files.entries, file => !state.files.selected[file.name]);
    var anySelected = any(state.files.entries, file => state.files.selected[file.name]);

    return {
        ...state.files,
        noneSelected,
        allSelected,
        anySelected
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, undefined, FilesActionTypes>) => {
    return {
        loadFiles: (cwd: string) => { dispatch(loadFiles(cwd)); },
        saveFiles: (event: React.ChangeEvent<HTMLInputElement>) => { dispatch(saveFiles(event.target.files as FileList)); },
        loadEntry: (event: React.MouseEvent<HTMLElement>) => {
            var name = (event.currentTarget as HTMLElement).getAttribute('data-name');
            var type = (event.currentTarget as HTMLElement).getAttribute('data-type');
            if (type === 'dir' && name) {
                dispatch(loadFiles(name));
            } else if(type === 'file' && name) {
                // TODO: Download File
            }
        },
        selectEntry: (event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(selectEntry(event.target.name));
        },
        toggleSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => {
            if(event.currentTarget.checked) {
                dispatch(selectAll());
            } else {
                dispatch(unselectAll());
            }
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Files);