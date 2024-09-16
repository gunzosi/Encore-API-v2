import {ServerResponse} from 'http';

export async function parseRequestBody(req: NodeJS.ReadableStream): Promise<any> {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            } catch (error) {
                reject(new Error('Invalid JSON'));
            }
        });
    });
}

export function sendResponse(res: ServerResponse, status: number, data: any) {
    res.writeHead(status, {"Content-Type": "application/json"});
    res.end(JSON.stringify(data));
}
