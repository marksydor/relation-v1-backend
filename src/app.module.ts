import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { envValidation } from './env.validation';
import { CharacterModule } from './character/character.module';
import { RelationModule } from './relation/relation.module';
import { AssetsModule } from './assets/assets.module';
import { PlaceModule } from './place/place.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FactionModule } from './faction/faction.module';
import { LifeEventModule } from './life-event/life-event.module';

import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: envValidation,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'upload'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    CharacterModule,
    RelationModule,
    AssetsModule,
    PlaceModule,
    FactionModule,
    LifeEventModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
