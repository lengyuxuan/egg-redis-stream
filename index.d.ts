import 'egg-redis';

declare module 'egg' {
  interface IProducer {}
  interface IConsumer {}
  interface EggAppConfig {
    producer: Record<keyof IProducer, string>;
    consumer: Record<keyof IConsumer, {
      topic: string,
      group: string,
      name: string,
    }>;
  }
}

export { Producer } from './lib/producer';
export { Consumer } from './lib/consumer';
