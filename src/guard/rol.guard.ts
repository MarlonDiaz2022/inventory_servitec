import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoles } from 'src/Enum/user-roler.enum';
import { ROLES_KEY } from 'src/decorators/rol.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRoles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true; // Si no hay roles definidos, la ruta es pública (o se asume que un guard de autenticación anterior ya la protegió)
    }

    // Aquí necesitamos obtener el usuario que está intentando acceder a la ruta.
    // En un sistema de login sin JWT o tokens, la forma más sencilla es
    // si el usuario está adjunto a la solicitud (request) después de la autenticación.
    // Esto implicaría que tu proceso de autenticación (si es de sesión)
    // guarda el usuario en `req.user`.

    const request = context.switchToHttp().getRequest();
    const user = request.user; // <-- Asumimos que el objeto usuario está en request.user

    // Si tu sistema de autenticación no adjunta el usuario a `request.user`,
    // tendrías que modificar tu flujo para hacerlo (ej. un middleware simple).
    // Por ahora, asumamos que `request.user` está disponible y contiene el rol.

    if (!user || !user.role) {
        return false; // No hay usuario o no tiene rol definido
    }

    return requiredRoles.some((role) => user.role === role); // Si el rol del usuario es uno de los roles requeridos
  }
}