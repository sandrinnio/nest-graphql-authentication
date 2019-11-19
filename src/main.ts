import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

const port = config.get('server.port');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
bootstrap();
