<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

## Smoke Test

Dưới đây là các kịch bản kiểm thử nhanh để xác minh hoạt động của ứng dụng:

### 1. Kịch bản Happy Path (Chế độ Development)
- **Mô tả:** Chạy ứng dụng trong môi trường phát triển với đầy đủ biến môi trường và gửi yêu cầu `POST` tới `/payments/charge`.
- **Dòng log JSON tương ứng trong `logs/app.log`:**
```json
{"amount":120000,"context":"PaymentGatewayService","hostname":"DESKTOP-2VJO9SQ","level":"info","message":"charging","orderId":"ORD-001","service":"payment-gateway","timestamp":"2026-05-23T14:03:07.076Z"}
```

### 2. Kịch bản Crash-on-missing-env (Thiếu biến môi trường bắt buộc)
- **Mô tả:** Chạy ứng dụng khi thiếu biến môi trường bắt buộc `PAYMENT_API_KEY`. Ứng dụng thoát ngay lập tức (exit code ≠ 0) và báo lỗi chi tiết qua stderr thông qua cơ chế validate Joi schema.
- **Toàn bộ thông báo lỗi trong stderr:**
```
[Nest] 36832  - 05/23/2026, 9:03:21 PM     LOG [NestFactory] Starting Nest application...
[Nest] 36832  - 05/23/2026, 9:03:21 PM   ERROR [ExceptionHandler] Error: Config validation error: "PAYMENT_API_KEY" is required
    at ConfigModule.forRoot (D:\Nghia-project\escape-beta\payment-gateway-config-namespaces\node_modules\@nestjs\config\dist\config.module.js:96:23)
    at Object.<anonymous> (D:\Nghia-project\escape-beta\payment-gateway-config-namespaces\dist\app.module.js:30:35)
    at Module._compile (node:internal/modules/cjs/loader:1760:14)
    at Object..js (node:internal/modules/cjs/loader:1892:10)
    at Module.load (node:internal/modules/cjs/loader:1480:32)
    at Module._load (node:internal/modules/cjs/loader:1299:12)
    at TracingChannel.traceSync (node:diagnostics_channel:328:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:245:24)
    at Module.require (node:internal/modules/cjs/loader:1503:12)
    at require (node:internal/modules/helpers:152:16)
```

### 3. Kịch bản Chế độ Production
- **Mô tả:** Chạy ứng dụng trong chế độ production. Logger chỉ in ra các dòng log từ cấp độ `info` trở lên (không hiển thị log mức độ `debug`).
- **Dòng log JSON tương ứng trong `logs/app.log` khi gọi API `/payments/charge`:**
```json
{"amount":250000,"context":"PaymentGatewayService","hostname":"DESKTOP-2VJO9SQ","level":"info","message":"charging","orderId":"ORD-PROD-001","service":"payment-gateway","timestamp":"2026-05-23T14:03:47.103Z"}
```

