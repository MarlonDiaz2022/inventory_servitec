import {
  Injectable,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { createuserdto } from './dto/create-user.dto';
import { updateuserdto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { users } from './schemas/users.schema';
import { Model } from 'mongoose';
import { assignment } from 'src/assignment/schema/assignment.schema';
import { tools } from 'src/tools/schemas/tools.schema';
import { LoginUserDto } from 'src/auth/dto/loginusers.dto';

@Injectable()
export class UsersService {
  usersService: any;

  constructor(
    @InjectModel(users.name) private usersModel: Model<users>,
    @InjectModel('assignment') private assigmentmodel: Model<assignment>,
    @InjectModel('tools') private toolsmodel: Model<tools>,
  ) {}

  getusers() {
    return this.usersModel.find();
  }

  async getuser(cedula: string) {
    const existsusers = await this.usersModel.findOne({ cedula });
    if (!existsusers) {
      throw new ConflictException(`user with ${cedula} no exist`);
    }
    return this.usersModel.findOne({ cedula });
  }

  async findOneByCedulaWithPassword(cedula: string): Promise<users | null> {
    console.log('Buscando cédula:', cedula); // Agrega este log
    const user = await this.usersModel
      .findOne({ cedula })
      .select('+password')
      .exec();
    console.log('Resultado de la búsqueda:', user); // Y este log
    return user;
  }
  async createuser(user: createuserdto) {
    const existsusers = await this.usersModel.findOne({ name: user.name });

    if (existsusers) {
      throw new ConflictException(`User ${user.name} already exists`);
    }
    const newUser = new this.usersModel(user);
    return newUser.save();
  }

  async updateuser(id: string, user: updateuserdto) {
    const existsUser = await this.usersModel.findById(id);

    if (!existsUser) {
      throw new ConflictException(`El usuario con ID ${id} no existe`);
    }
    if (user.name) {
      const nameConflict = await this.usersModel.findOne({ name: user.name });
      if (nameConflict && nameConflict._id.toString() !== id) {
        throw new ConflictException(`El nombre ${user.name} ya está en uso`);
      }
    }
    await this.usersModel.findByIdAndUpdate(id, { $set: user }, { new: true });
    return this.usersModel.findById(id);
  }

  async deleteuser(cedula: string) {
    const existsUser = await this.usersModel.findOne({ cedula });
    if (!existsUser) {
      throw new ConflictException(`El usuario con cédula ${cedula} no existe`);
    }
    await this.usersModel.deleteOne({ cedula });

    return existsUser;
  }

  async listtools(cedula: string) {
  const existsUser = await this.usersModel.findOne({ cedula });

  if (!existsUser) {
    throw new ConflictException(`El usuario con cédula ${cedula} no existe`);
  }

  const identificator = existsUser._id.toString();

  const assignments = await this.assigmentmodel
    .find({ worker: identificator })
    .populate({ path: 'tool', select: 'name code serial imageUrl' })
    .sort({ fechaAsignacion: -1 }); 
  return assignments;
}

  async validateUser(cedula: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByCedulaWithPassword(cedula);

    if (!user) {
      throw new UnauthorizedException('Cédula o contraseña incorrecta');
    }

    const isPasswordValid = await (user as any).comparePassword(pass);

    if (user && isPasswordValid) {
      // Excluimos la contraseña del objeto de retorno.
      // El rol ya debería estar incluido si se recupera del modelo.
      const { password, ...result } = user.toObject();
      return result; // 'result' contendrá el usuario con el campo 'role'
    }
    throw new UnauthorizedException('Cédula o contraseña incorrecta');
  }

  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto.cedula, userDto.password);
    return user;
  }
}
