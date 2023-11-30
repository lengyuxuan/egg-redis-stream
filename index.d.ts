import 'egg-redis';
import { ConsumerOptions } from './lib/consumer';

declare module 'egg' {
  interface IProducer {}
  interface IConsumer {}
  interface EggAppConfig {
    producer: Record<keyof IProducer, string>;
    consumer: Record<keyof IConsumer, ConsumerOptions>;
  }
}

export { Producer } from './lib/producer';
export { Consumer } from './lib/consumer';
