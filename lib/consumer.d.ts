import { Redis } from 'ioredis';
import { BaseContextClass, Context } from 'egg';
export type OnMessage = (messageList: any[]) => void;
export interface ConsumerOptions {
    topic: string;
    /** 消费组名称 */
    group: string;
    /** 消费者名称 */
    name: string;
    /** 拉取间隔 */
    interval?: number;
    /** 并行数量 */
    parallel?: number;
}
export declare abstract class Consumer<T = Record<string, any>> extends BaseContextClass {
    private redis;
    private topic;
    private group;
    private name;
    private interval;
    private parallel;
    constructor(ctx: Context, redis: Redis, options: ConsumerOptions);
    private createGroup;
    pull(id?: string): Promise<void>;
    private getMessage;
    ack(this: Consumer, id: string): Promise<number>;
    protected abstract process(id: string, data: T): Promise<void>;
}
