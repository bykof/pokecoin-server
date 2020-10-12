"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packageJSON = require("../../package.json");
const swaggerConfig = {
    exposeRoute: true,
    routePrefix: '/docs',
    addModels: true,
    swagger: {
        info: {
            title: 'Pokecoin',
            description: 'The Pokecoin documentation',
            version: packageJSON.version,
        },
        consumes: ['application/json'],
        produces: ['application/json'],
        securityDefinitions: {
            token: {
                type: 'apiKey',
                name: 'token',
                in: 'header',
            },
        },
    },
};
if (!process.env.PRODUCTION) {
    swaggerConfig.swagger['host'] = '0.0.0.0:3000';
}
else {
    swaggerConfig.swagger['schemes'] = ['https'];
    swaggerConfig.swagger['host'] = 'rocky-lowlands-35145.herokuapp.com';
}
exports.default = swaggerConfig;
//# sourceMappingURL=swaggerConfig.js.map