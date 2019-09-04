import { BFSRequire, configure } from 'browserfs';
import { ApiError } from 'browserfs/dist/node/core/api_error';
import Stats from 'browserfs/dist/node/core/node_fs_stats';

var fs = BFSRequire('fs');

const fsReady = new Promise((resolve, reject) => {
    configure({ fs: 'IndexedDB', options: { store: 'rootfs' } }, (err: ApiError | null | undefined) => {
        if (err) {
            reject(err);
        } else {
            resolve();
        }
    });
});

export function access(path: string, mode?: number): Promise<void> {
    const afs = fs;
    return fsReady.then(() => new Promise((resolve, reject) => {
        const callback = (err: Error) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        };
        if (mode !== undefined) {
            afs.access(path, mode, callback);
        } else {
            afs.access(path, callback);
        }
    }));
}

export function appendFile(path: string, data: any, optionsOrEncoding?: { encoding?: string; mode?: number | string; flag?: string; } | string): Promise<void> {
    const afs = fs;
    return fsReady.then(() => new Promise((resolve, reject) => {
        const callback = (err?: Error | null) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        };
        if (optionsOrEncoding !== undefined) {
            afs.appendFile(path, data, optionsOrEncoding as string, callback);
        }
    }));
}

export function chmod(path: string, mode: string | number): Promise<void> {
    const afs = fs;
    return fsReady.then(() => new Promise((resolve, reject) => {
        afs.chmod(path, mode, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    }));
}

export function chown(path: string, uid: number, gid: number): Promise<void> {
    const afs = fs;
    return fsReady.then(() => new Promise((resolve, reject) => {
        afs.chown(path, uid, gid, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    }));
}

export function close(fd: number): Promise<void> {
    const afs = fs;
    return fsReady.then(() => new Promise((resolve, reject) => {
        afs.close(fd, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    }));
}

export function exists(path: string): Promise<boolean> {
    const afs = fs;
    return fsReady.then(() => new Promise((resolve) => {
        afs.exists(path, resolve);
    }));
}

export function fchmod(fd: number, mode: string | number): Promise<void> {
    const afs = fs;
    return fsReady.then(() => new Promise((resolve, reject) => {
        afs.fchmod(fd, mode, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    }));
}

export function fchown(fd: number, uid: number, gid: number): Promise<void> {
    const afs = fs;

    return fsReady.then(() => new Promise((resolve, reject) => {
        afs.fchown(fd, uid, gid, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    }));
}

export function fdatasync(fd: number): Promise<void> {
    const afs = fs;

    return fsReady.then(() => new Promise((resolve, reject) => {
        afs.fdatasync(fd, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    }));
}

export function fstat(fd: number): Promise<Stats> {
    const afs = fs;

    return fsReady.then(() => new Promise((resolve, reject) => {
        afs.fstat(fd, (err, stats) => {
            if (err) {
                reject(err);
            } else {
                resolve(stats);
            }
        });
    }));
}

export function fsync(fd: number): Promise<void> {
    const afs = fs;

    return fsReady.then(() => new Promise((resolve, reject) => {
        afs.fsync(fd, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    }));
}

export function ftruncate(fd: number, len?: number): Promise<void> {
    const afs = fs;

    return fsReady.then(() => new Promise((resolve, reject) => {
        const callback = (err?: ApiError | null) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        };
        if (len !== undefined) {
            afs.ftruncate(fd, len, callback);
        } else {
            afs.ftruncate(fd, callback);
        }
    }));
}

export function futimes(fd: number, atime: number | Date, mtime: number | Date): Promise<void> {
    const afs = fs;

    return fsReady.then(() => new Promise((resolve, reject) => {
        afs.futimes(fd, atime, mtime, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    }));
}

export function lchmod(path: string, mode: number | string): Promise<void> {
    const afs = fs;

    return fsReady.then(() => new Promise((resolve, reject) => {
        afs.lchmod(path, mode, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    }));
}

export function lchown(path: string, uid: number, gid: number) {
    const afs = fs;

    return fsReady.then(() => new Promise((resolve, reject) => {
        afs.lchown(path, uid, gid, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    }));
}

export function link(srcpath: string, dstpath: string): Promise<void> {
    const afs = fs;

    return fsReady.then(() => new Promise((resolve, reject) => {
        afs.link(srcpath, dstpath, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    }));
}

export function lstat(path: string): Promise<Stats> {
    const afs = fs;

    return fsReady.then(() => new Promise((resolve, reject) => {
        afs.lstat(path, (err, stats) => {
            if (err) {
                reject(err);
            } else {
                resolve(stats);
            }
        });
    }));
}

export function mkdir(path: string, mode?: string | number): Promise<void> {
    const afs = fs;

    return fsReady.then(() => new Promise((resolve, reject) => {
        const callback = (err?: ApiError | null) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        };
        if (mode !== undefined) {
            afs.mkdir(path, mode, callback);
        } else {
            afs.mkdir(path, callback);
        }
    }));
}

export type OpenFlags = 'r' | 'r+' | 'rs' | 'rs+' | 'w' | 'wx' | 'w+' | 'wx+' | 'a' | 'ax' | 'a+' | 'ax+';

export function open(path: string, flag: OpenFlags, mode?: string | number): Promise<number> {
    const afs = fs;

    return fsReady.then(() => new Promise((resolve, reject) => {
        const callback = (err?: ApiError | null, fd?: number) => {
            if (err) {
                reject(err);
            } else {
                resolve(fd);
            }
        };
        if (mode === undefined) {
            afs.open(path, flag, callback);
        } else {
            afs.open(path, flag, mode, callback);
        }
    }));
}

export function read(fd: number, length: number, position: number | null, encoding: string): Promise<[string, number]>
export function read(fd: number, buffer: Buffer, offset: number, length: number, position: number | null): Promise<[number, Buffer]>
export function read(fd: number, bufferOrLength: any, positionOrOffset: number | null, encodingOrLength: string | number, position?: number | null): Promise<any> {
    const afs = fs;

    return fsReady.then(() => new Promise((resolve, reject) => {
        if (typeof bufferOrLength === 'number' && (positionOrOffset === null || typeof position === 'number') && typeof encodingOrLength === 'string') {
            afs.read(fd, bufferOrLength, positionOrOffset, encodingOrLength, (err, value, bytesRead) => {
                if(err) {
                    reject(err);
                } else {
                    resolve([value, bytesRead]);
                }
            });
        } else if (typeof positionOrOffset === 'number' && typeof encodingOrLength === 'number' && (position === null || typeof position === 'number')) {
            afs.read(fd, bufferOrLength, positionOrOffset, encodingOrLength, position, (err, bytesRead, buffer) => {
                if(err) {
                    reject(err);
                } else {
                    resolve([bytesRead, buffer]);
                }
            });
        } else {
            var err = new Error('invalid arguments');
            err.name = 'EINVAL';
            throw err;
        }
    }));
}

export function readFile(path: string): Promise<Buffer>
export function readFile(path: string, options: { encoding?: null, flag?: string }): Promise<Buffer>
export function readFile(path: string, options: { encoding: 'utf8', flag?: string }): Promise<string>
export function readFile(path: string, encoding: 'utf8'): Promise<string>
export function readFile(path: string, optionsOrEncoding?: { encoding?: 'utf8'|null, flag?: string }|string): Promise<any>
{
    const afs = fs;

    return fsReady.then(() => new Promise((resolve, reject) => {
        if(optionsOrEncoding) {
            afs.readFile(path, optionsOrEncoding as string, (err?: ApiError|null, value?: string) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(value);
                }
            });
        } else {
            afs.readFile(path, (err, buffer) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(buffer);
                }
            })
        }
    }));
}

export function readdir(path: string): Promise<string[]> {
    const afs = fs;

    return fsReady.then(() => new Promise((resolve, reject) => {
        afs.readdir(path, (err, entries) => {
            if(err) {
                reject(err);
            } else {
                resolve(entries);
            }
        });
    }));
}

export function stat(path: string): Promise<Stats> {
    const afs = fs;

    return fsReady.then(() => new Promise((resolve, reject) => {
        afs.stat(path, (err, stats) => {
            if(err) {
                reject(err);
            } else {
                resolve(stats);
            }
        });
    }));
}

export function writeFile(path: string, data: any): Promise<void>
export function writeFile(path: string, data: any, encoding?: string): Promise<void>
export function writeFile(path: string, data: any, options?: { encoding?: string|null, flag?: string }): Promise<void>
export function writeFile(path: string, data: any, optionsOrEncoding?: { encoding?: string|null, flag?: string }|string): Promise<void>
{
    const afs = fs;

    return fsReady.then(() => new Promise((resolve, reject) => {
        const callback = (err?: ApiError|null) => {
            if(err) {
                reject(err);
            } else {
                resolve();
            }
        };
        if(optionsOrEncoding) {
            afs.writeFile(path, data, optionsOrEncoding as string, callback);
        } else {
            afs.writeFile(path, data, callback);
        }
    }));
}