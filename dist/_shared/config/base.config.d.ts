export declare abstract class BaseConfig {
    private static logger;
    static checkFile(fileNames: string[], content: any): void;
    static checkFolders(paths: string[]): void;
    static createUpload(): void;
    static fileFilter: (req: any, file: any, callback: any) => any;
    static imageFileFilter: (req: any, file: any, callback: any) => any;
    static DocFileFilter: (req: any, file: any, callback: any) => any;
    static getFilePath: (filename: string) => string;
    static setFilePath: (req: any, file: any, callback: any) => void;
    static editFileName: (req: any, file: any, callback: any) => void;
}
