import { Redis } from 'ioredis';
import { setTimeout } from 'timers/promises';
import { arrToObj } from './util';
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

export abstract class Consumer<T = Record<string, any>> extends BaseContextClass {
  private redis: Redis;
  private topic: string;
  private group: string;
  private name: string;
  private interval = 10;
  private parallel = 10;

  constructor(ctx: Context, redis: Redis, options: ConsumerOptions) {
    super(ctx);
    this.redis = redis;
    this.topic = options.topic;
    this.group = options.group;
    this.name = options.name;
    this.interval = options.interval ?? 10;
    this.parallel = options.parallel ?? 10;
    this.pull();
  }

  private createGroup(lastId: '$' | number = '$') {
    return this.redis.xgroup('CREATE', this.topic, this.group, lastId, 'MKSTREAM').catch((err) => {
      if (err.message !== 'BUSYGROUP Consumer Group name already exists') {
        this.ctx.logger.error(err.message);
      }
    });
  }

  public async pull(id = '0') {
    await this.createGroup();
    while (true) {
      try {
        const messageList = await this.getMessage(id);
        id = '>';
        if (messageList.length > 0) {
          await Promise.all(messageList.map((message) => this.process(message.id, message.data)));
        } else {
          await setTimeout(this.interval);
        }
      } catch (error) {
        await setTimeout(this.interval);
      }
    }
  }

  private async getMessage(id = '0') {
    const results: any = await this.redis.xreadgroup(
      'GROUP',
      this.group,
      this.name,
      'COUNT',
      this.parallel,
      'STREAMS',
      this.topic,
      id,
    );
    if (results) {
      const [, messageList] = results[0];
      return messageList.map((message) => {
        const data = arrToObj(message[1] as unknown as string[]);
        return { id: message[0], data };
      });
    }
    return [];
  }

  public ack(this: Consumer, id: string) {
    return this.redis.xack(this.topic, this.group, id);
  }

  protected abstract process(id: string, data: T): Promise<void>;
}
