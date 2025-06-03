import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dto/loginusers.dto';


@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(cedula: string, pass: string): Promise<any> {
    // Usamos el nuevo método que busca el password
    const user = await this.usersService.findOneByCedulaWithPassword(cedula);
    if (!user) {
      
      throw new UnauthorizedException('Cédula o contraseña incorrecta');
    }

    // Verificar si la contraseña proporcionada coincide con la hasheada
    const isPasswordValid = await (user as any).comparePassword(pass);

    if (user && isPasswordValid) {
      // Excluimos la contraseña del objeto de retorno
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Cédula o contraseña incorrecta');
  }

  // Método de login
  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto.cedula, userDto.password);
    // Aquí puedes retornar el usuario sin el password, o un mensaje de éxito,
    // o un token de sesión si decides implementarlo de alguna manera.
    // Para este ejemplo simple, solo retornamos el usuario validado.
    return user;
  }
}