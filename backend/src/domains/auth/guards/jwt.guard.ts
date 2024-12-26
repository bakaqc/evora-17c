import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AuthService } from '@/domains/auth/auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly authService: AuthService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.get<boolean>(
			'isPublic',
			context.getHandler(),
		);
		if (isPublic) {
			return true;
		}

		const request = context.switchToHttp().getRequest();
		const authHeader = request.headers['authorization'];

		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			throw new UnauthorizedException(
				'Missing or invalid authorization header',
			);
		}

		const token = authHeader.split(' ')[1];
		const user = await this.authService.verifyJwt(token);
		if (!user) {
			throw new UnauthorizedException('Invalid token');
		}

		request.user = user;
		return true;
	}
}
