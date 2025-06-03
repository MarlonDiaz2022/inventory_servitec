import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

   app.useGlobalPipes(new ValidationPipe({
    whitelist: false, // Remueve propiedades que no están en el DTO
    forbidNonWhitelisted: false, // Lanza un error si hay propiedades no permitidas
    transform: false, // Transforma los payloads a instancias del DTO
  }));
  


  app.enableCors({
    origin: 'http://localhost:4200', 
    credentials: true  
  });

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/', // Así podrás acceder desde /uploads/tools/...
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
