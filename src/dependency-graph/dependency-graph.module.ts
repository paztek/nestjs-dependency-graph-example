import { INestApplication } from '@nestjs/common';
import { Request, Response } from 'express';
import { ModulesContainer } from '@nestjs/core';
import { Module } from '@nestjs/core/injector/module';
import { join } from 'path';

export class DependencyGraphModule {

    static graph(app: INestApplication): void {
        /**
         * Build the tree:
         * 1. Find the AppModule
         * 2. Recursively browse its imports and
         * 3. Ignore core modules attached to each module like "InternalCoreModule" and "ConfigHostModule"
         */
        const container = app.get(ModulesContainer);
        const moduleWrappers = Array.from(container.values());
        const appModule = moduleWrappers.find((moduleWrapper) => moduleWrapper.metatype.name === 'AppModule');
        const tree = getTree(appModule);

        // Add the routes
        const basePath = '/dependency-graph';
        const adapter = app.getHttpAdapter();
        adapter.get(`${basePath}/data`, (req: Request, res: Response) => {
            return res.json(tree);
        });
        adapter.get(`${basePath}/index.html`, (req: Request, res: Response) => {
            res.sendFile(join(__dirname, 'static', 'index.html'));
        });
        adapter.get(`${basePath}/main.js`, (req: Request, res: Response) => {
            res.sendFile(join(__dirname, 'static', 'main.js'));
        });
    }
}

interface Tree {
    name: string;
    children: Tree[];
}

function getTree(module: Module): Tree {
    const interestingChildrenModules = Array
        .from(module.imports)
        .filter((childModule) => childModule.metatype.name !== 'InternalCoreModule' && childModule.metatype.name !== 'ConfigHostModule');

    return {
        name: module.metatype.name,
        children: interestingChildrenModules.map(getTree),
    };
}
