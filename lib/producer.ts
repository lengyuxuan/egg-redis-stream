import { Redis } from 'ioredis';
import { objToArr } from './util';
import { BaseContextClass, Context } from 'egg';

export class Producer<T extends Record<string, any> = any> extends BaseContextClass {
  constructor(ctx: Context, private redis: Redis, private topic: string) {
    super(ctx);
  }

  public async push(message: T, id = '*') {
    return this.redis.xadd(this.topic, id, ...objToArr(message));
  }
}
