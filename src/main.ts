import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ValidationErrorFilter } from '@common/exception-filters/http-exception.filter';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new ValidationErrorFilter());

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    disableErrorMessages: false
  }))

  const swagger_config = new DocumentBuilder()
    .setTitle('Brain Ag - API')
    .setDescription('API documentation for managing rural producer registration.')
    .setVersion('1.0')
    .build()

  const swagger_document = SwaggerModule.createDocument(app, swagger_config)

  SwaggerModule.setup('doc', app, swagger_document)

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
