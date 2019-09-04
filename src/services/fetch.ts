import { readFile }  from './fs';
import { arrayBuffer2Buffer } from 'browserfs/dist/node/core/util';

export function fetchFile(url: string, encoding: 'utf8'): Promise<string>
export function fetchFile(url: string): Promise<Buffer>
export function fetchFile(url: string, encoding?: 'utf8'): Promise<string|Buffer>
{
    if(url.indexOf('file://') === 0) {
        var path = url.substr('file://'.length);
        if(encoding) return readFile(path, encoding);
        return readFile(path);
    }

    return fetch(url).then(response => {
        if(response.ok) {
            if(encoding === 'utf8') {
                return response.text();
            } else {
                return response.arrayBuffer().then(arrayBuffer2Buffer);
            }
        }
        var err = new Error(response.statusText);
        err.name = "HttpError";
        throw err;
    });
}