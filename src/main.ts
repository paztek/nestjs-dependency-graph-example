import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { DependencyGraphModule } from './dependency-graph/dependency-graph.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    if (process.env.NODE_ENV === 'development') {
        DependencyGraphModule.graph(app);
    }

    await app.listen(3000);
}
bootstrap();
