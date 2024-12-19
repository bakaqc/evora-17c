import { version } from '../../package.json';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication<any>) => {
	const config = new DocumentBuilder()
		.setTitle('Evora API documentation')
		.setDescription(
			'Evora connects customers with event organizers quickly through detailed online booking.',
		)
		.setVersion(version)
		.setLicense(
			'GPL-3.0 license',
			'https://github.com/bakaqc/evora-17c/blob/main/LICENSE',
		)
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api-docs', app, document, {
		swaggerOptions: {
			tagsSorter: 'alpha',
			operationsSorter: 'method',
			syntaxHighlight: true,
			displayRequestDuration: true,
		},
	});
};
