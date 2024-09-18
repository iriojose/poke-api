import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: "*",
        methods: ["GET", "POST", "PUT"],
        allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true,
    })

    const options = new DocumentBuilder()
        .setTitle('Poke App')
        .setDescription('Api for return pokemons informations')
        .setVersion('1.0')
        .addServer('http://localhost:3000/', 'Local environment')
        .build();
  
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document);

    await app.listen(3000);
}
bootstrap();
