import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/error-handler/all-exceptions.filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({ 
      transform:true,
      whitelist:true}
    )
  )
  const config=new DocumentBuilder()
  .setTitle("Blume")
  .setDescription("The Blume api's")
  .setVersion('1.0')
  .addBearerAuth()
  .build()
  const swaggerDocument=()=>SwaggerModule.createDocument(app,config)
  SwaggerModule.setup('api',app,swaggerDocument)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
