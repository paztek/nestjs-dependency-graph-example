import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CModule } from './c/c.module';
import { SharedModule } from '../shared/shared.module';

@Module({
    imports: [
        ConfigModule,
        CModule,
        SharedModule,
    ],
})
export class AModule {}
