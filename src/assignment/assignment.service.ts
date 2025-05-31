import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { assignment } from './schema/assignment.schema';
import { Model } from 'mongoose';
import { createassignamentdto } from './dto/create-assignmenty.dto';
import { updateassignmentdto } from './dto/update-assignment.dto';
import { tools } from 'src/tools/schemas/tools.schema';
import { users } from 'src/users/schemas/users.schema';
import { ToolsService } from 'src/tools/tools.service';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectModel('assignment') private assignmentModel: Model<assignment>,
    @InjectModel('tools') private toolModel: Model<tools>,
    @InjectModel('users') private userModel: Model<users>,
    private readonly toolsService: ToolsService,
  ) {}

  async getassignments() {
    const assignments = await this.assignmentModel
      .find()
      .populate({ path: 'tool', strictPopulate: false })
      .populate({ path: 'worker', strictPopulate: false });
    return assignments;
  }

  async getassignment(id: string) {
    const existassignment = await this.assignmentModel
      .findById(id)
      .populate({ path: 'tool', strictPopulate: false })
      .populate({ path: 'worker', strictPopulate: false });

    if (!existassignment) {
      throw new ConflictException(`assignement with ${id} no exist`);
    }
    return existassignment;
  }

  async createassignment(createassignment: createassignamentdto) {
    const tool = await this.toolModel
      .findOne({ _id: createassignment.toolId })
      .lean();
    const worker = await this.userModel.findById(createassignment.workerId);

    if (!tool) {
      throw new ConflictException(
        `the assignment can't created because tools with code${tool} dont exist`,
      );
    }
    if (tool.amount <= 0) {
      throw new ConflictException(
        `the assignment can't created because no have tools`,
      );
    }
    if (
      !worker ||
      createassignment.workerId.toString() !== worker._id.toString()
    ) {
      throw new ConflictException(
        `The assignment can't be created because worker with ID ${createassignment.workerId} doesn't exist`,
      );
    }
    if (tool.maintenance == true) {
      console.log(tool.maintenance);
      throw new ConflictException(
        `The assignment can't be created because tool with ID ${tool.code} is in maintenance`,
      );
    }
    if (tool.operating == false) {
      throw new ConflictException(
        `The assignment can't be created because tool with ID ${tool.code} is out of service`,
      );
    }
    const identify = `ASSIGN-${Date.now()}`;
    const assignment = new this.assignmentModel({
      identify,
      worker: createassignment.workerId,
      tool: createassignment.toolId,
      place: createassignment.place,
      status: createassignment.status,
      date_of_loan: new Date(),
      delivery_date: null,
    });
    await this.toolsService.reduceamount(createassignment.toolId);

    return assignment.save();
  }

  async deleteassignment(id: string) {
    const existselement = await this.assignmentModel.findById(id);
    if (!existselement) {
      throw new ConflictException(`No existe una asignación con el ID ${id}`);
    }
    await this.assignmentModel.findByIdAndDelete(id);
    return existselement;
  }

  async updateuassignment(id:string , element: updateassignmentdto) {
    const existselementOri = await this.assignmentModel.findById(id)
      .populate({ path: 'tool', strictPopulate: false });    
      console.log('entre');
      if (!existselementOri) {
        throw new ConflictException(
          `La asignación con código ${element.identify} no existe`,
        );
      }
    await this.assignmentModel.updateOne(
    { _id: id },
    { $set: element },
  );
      const updated = await this.assignmentModel
        .findOne({ identify: element.identify })
        .populate({ path: 'tool', strictPopulate: false })
        .populate({ path: 'worker', strictPopulate: false });
      return updated;
    }

  async changestatus(id: string) {
    const element = await this.assignmentModel.findById(id).populate('tool');
    if (!element) {
      throw new ConflictException(`No existe una asignación con el ID ${id}`);
    }

    if (element.status) {
      element.status = false;
      element.delivery_date = new Date();
       await this.toolsService.increaseamount(element.tool._id.toString());
    } else {
      element.status = true;
      element.delivery_date = new Date();
       await this.toolsService.reduceamount(element.tool._id.toString());
    }
    await element.save();
    return element;
  }
}
