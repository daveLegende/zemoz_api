"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const helmet_1 = require("helmet");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./_shared/adapter/exception/http-exception.filter");
const nest_winston_1 = require("nest-winston");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const helmetOptions = {};
    app.enableCors();
    app.use((0, helmet_1.default)(helmetOptions));
    app.useGlobalPipes(new common_1.ValidationPipe({
        forbidUnknownValues: true,
        whitelist: true,
        transform: true,
    }));
    app.useLogger(app.get(nest_winston_1.WINSTON_MODULE_NEST_PROVIDER));
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.setGlobalPrefix('api/v1');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('ZEMOZ STARTER API')
        .setDescription('The basic nestjs project of infinitus')
        .addTag('API STARTER')
        .addBearerAuth()
        .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'x-api-key')
        .addBasicAuth()
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    const customOptions = {
        swaggerOptions: { persistAuthorization: true },
        customSiteTitle: 'Zemoz API',
    };
    swagger_1.SwaggerModule.setup('doc', app, document, customOptions);
    const configService = app.get(config_1.ConfigService);
    const PORT = configService.get('APP_PORT');
    await app.listen(PORT, () => {
        const logger = new common_1.Logger('STARTER::API');
        logger.log(`API successfully started on port ${PORT} at ${new Date().toISOString()}`);
    });
}
void bootstrap();
//# sourceMappingURL=main.js.map