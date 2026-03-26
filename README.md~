# egg-redis-stream

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-redis-stream.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-redis-stream
[travis-image]: https://img.shields.io/travis/eggjs/egg-redis-stream.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-redis-stream
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-redis-stream.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-redis-stream?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-redis-stream.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-redis-stream
[snyk-image]: https://snyk.io/test/npm/egg-redis-stream/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-redis-stream
[download-image]: https://img.shields.io/npm/dm/egg-redis-stream.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-redis-stream

Redis Stream message queue.

## Install


```bash
$ npm i egg-redis-stream egg-redis --save
```

## Usage

This module dependent on [egg-redis] plugin, so we must enable both.

```js
// {app_root}/config/plugin.ts

const plugin: EggPlugin = {
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  redisStream: {
    enable: true,
    package: 'egg-redis-stream',
  },
};

export default plugin;
```

## Configuration

```typescript
// {app_root}/config/config.default.ts

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // other config...

  config.producer = {
    // {app_root}/producer/xxxx.ts
    xxxx: 'topic name',
  };

  config.consumer = {
    // {app_root}/consumer/xxxx.ts
    xxxx: {
      topic: 'topic name',
      group: 'consumer group',
      name: 'consumer name',
    },
  };

  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '123456',
    },
  };

  // the return config will combines to EggAppConfig
  return config;
};
```

## Example

### 1. Configure producer/consumer.

```typescript
// {app_root}/config/config.default.ts

config.consumer = {
  // {app_root}/consumer/order.ts
  order: {
    topic: 'order_topic',
    group: 'default',
    name: 'local',
  },
};

config.producer = {
  // {app_root}/producer/order.ts
  order: 'order_topic',
};
```

### 2. Create producer

```typescript
// {app_root}/producer/order.ts

export interface OrderItem {
  id: string;
  record: string;
}

export default class OrderProducer extends Producer<OrderItem> {
  // You can create some function
}
```

### 3. Produce a message

```typescript
// {app_root}/service/someService.ts

export default class SomeService extends Service {
  public async xxxx() {
    await app.producer.order.push({
      id: 'ORD5**********W9JJxokx',
      record: '...',
    });
  }
}
```

### 4. Create consumer

```typescript
// {app_root}/consumer/order.ts

export interface Order {
  id: string;
  record: string;
}

export default class OrderConsumer extends Consumer<Order> {
  protected async process(id: string, message: Order) {
    const { ctx } = this;
    ctx.logger.info(message);
    await this.ack(id);
    // or app.consumer.order.ack(id);
  }
}
```

## Questions & Suggestions

Please open an issue [here](https://github.com/lengyuxuan/egg-redis-stream/issues).

## License

[MIT](LICENSE)

[egg-redis]: https://github.com/eggjs/egg-redis
