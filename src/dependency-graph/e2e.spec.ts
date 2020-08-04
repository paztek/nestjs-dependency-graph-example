import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../app.module';
import { DependencyGraphModule } from './dependency-graph.module';

describe('Dependency graph E2E', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                AppModule
            ],
        }).compile();

        app = moduleRef.createNestApplication();
        DependencyGraphModule.graph(app);
        await app.init();

    });

    it('GET /dependency-graph/data', () => {
        return request(app.getHttpServer())
            .get('/dependency-graph/data')
            .expect(200)
            .expect({
                name: 'AppModule',
                children: [
                    {
                        name: 'AModule',
                        children: [
                            {
                                name: 'ConfigModule',
                                children: [],
                            },
                            {
                                name: 'CModule',
                                children: [],
                            },
                            {
                                name: 'SharedModule',
                                children: [],
                            },
                        ],
                    },
                    {
                        name: 'BModule',
                        children: [
                            {
                                name: 'SharedModule',
                                children: [],
                            },
                        ],
                    }
                ],
            });
    });

    it('GET /dependency-graph', () => {
        return request(app.getHttpServer())
            .get('/dependency-graph')
            .expect(200)
            .expect('Content-Type', 'text/html; charset=utf-8')
    });

    afterAll(async () => {
        await app.close();
    });
});
