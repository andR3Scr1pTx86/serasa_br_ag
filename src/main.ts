import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
