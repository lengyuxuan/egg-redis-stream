import { Application, IBoot } from 'egg';
export default class AppBootHook implements IBoot {
    private readonly app;
    constructor(app: Application);
    configDidLoad(): void;
}
export { Producer } from './lib/producer';
export { Consumer } from './lib/consumer';
