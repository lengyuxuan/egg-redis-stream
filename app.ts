import { Application, IBoot } from 'egg';
import * as path from 'path';
import { Producer } from './lib/producer';

export default class AppBootHook implements IBoot {
  private readonly app: Application;
  constructor(app: Application) {
    this.app = app;
  }

  configDidLoad() {
    const app = this.app;
    const producerDir = path.join(app.baseDir, 'app/producer');
    app.loader.loadToApp(producerDir, 'producer', {
      initializer(factory: typeof Producer, options) {
        const name = path.basename(options.path).replace(/\.[^.]+?$/, '');
        const ctx = app.createAnonymousContext();
        return new factory(ctx, app.redis, app.config.producer[name]);
      },
    });

    const consumerDir = path.join(app.baseDir, 'app/consumer');
    app.loader.loadToApp(consumerDir, 'consumer', {
      initializer(factory: typeof Producer, options) {
        const name = path.basename(options.path).replace(/\.[^.]+?$/, '');
        const ctx = app.createAnonymousContext();
        return new factory(ctx, app.redis, app.config.consumer[name]);
      },
    });
  }
}

export { Producer } from './lib/producer';
export { Consumer } from './lib/consumer';
