import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackModule } from './track/track.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env${'.' + (process.env.NODE_ENV || 'development')}`,
    }),
    TrackModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: +(process.env.PG_PORT || 5432),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      logger: 'simple-console',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
