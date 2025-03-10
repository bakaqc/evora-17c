import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ROLE_KEY } from '@/domains/auth/decorators/roles.decorator';
import { Role } from '@/domains/auth/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
			context.getHandler(),
			context.getClass(),
		]);

		if (!requiredRoles || requiredRoles.length === 0) {
			return true;
		}

		const request = context.switchToHttp().getRequest();
		const user = request.user;

		if (!user?.role) {
			throw new ForbiddenException(
				'You do not have the required role to access this resource',
			);
		}

		const hasRequiredRole = requiredRoles.some((role) => user.role === role);

		if (!hasRequiredRole) {
			throw new ForbiddenException(
				'You do not have the required role to access this resource',
			);
		}

		return true;
	}
}
