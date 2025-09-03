import { DEV } from "./constants";

class Logger {
    private prefix = 'simple-singal|'
    warn = DEV ? (...messages: any[]) => {
        console.warn(this.prefix, 'WARN|', ...messages)
    } : null
    error(...messages: any[]) {
        console.error(this.prefix, 'ERROR|', ...messages)
    }
}
export const logger = new Logger()