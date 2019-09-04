export const FILE_MODEL_TEXT = 'FILE_MODEL_TEXT';

export type TextFileModel = {
    type: typeof FILE_MODEL_TEXT;
    uri: string;
    content: string;
}

export type FileModelTypes = TextFileModel;