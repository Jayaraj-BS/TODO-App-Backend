import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Tasks } from './tasks.model';

@Injectable()
export class TasksService {
     constructor(
          @InjectModel(Tasks)
          private readonly tasksModel: typeof Tasks,
     ) { }

     async getAllTasks(): Promise<Tasks[]> {
          return this.tasksModel.findAll();
        }

     async findTaskByid(id : any) {
          const task = await this.tasksModel.findByPk(id)
          if(!id){
               throw 'Task Not Found'
          }
          return task;
     }  

     async createTheTask(dataToUpdate : any) {
          return await this.tasksModel.create(dataToUpdate)
     }
     
     async updateTheTask(id : any, dataToUpdate : any) {
          const checkTask = await this.findTaskByid(id)
          return checkTask.update(dataToUpdate)
     }

     async deleteThetask(id : any) {
          return await this.tasksModel.destroy({
               where : {
                    id : id
               }
          })
     }
}
