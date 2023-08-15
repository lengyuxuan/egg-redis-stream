import { Redis } from 'ioredis';
import { BaseContextClass, Context } from 'egg';
export declare class Producer<T extends Record<string, any> = any> extends BaseContextClass {
    private redis;
    private topic;
    constructor(ctx: Context, redis: Redis, topic: string);
    push(message: T, id?: string): Promise<string>;
}
