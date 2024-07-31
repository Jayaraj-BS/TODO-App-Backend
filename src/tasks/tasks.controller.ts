import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ResponseData } from 'src/dto/response-data';

@Controller('tasks')
export class TasksController {

     constructor(private readonly tasksService: TasksService) { 
     }

     @Get()
     async getAllTasks(): Promise<ResponseData> {
          const output = new ResponseData();
          try {
               const tasks = await this.tasksService.getAllTasks();
               output.data = tasks;
          } catch (error) {
               console.error(error);
               output.status = false;
               output.message = 'No Tasks were found';
          }
          return output;
     }

     @Post('createTask')
     async addNewtask(
          @Body() dataToCreate: any
     ) {
          const output = new ResponseData();
          try {
               const updateTask = await this.tasksService.createTheTask(dataToCreate)
               output.data = updateTask
          } catch (error) {
               console.error(error);
               output.status = false;
               output.message = 'No Tasks were found';
          }
          return output;
     }

     @Patch(':id')
     async updateTheTask(
          @Param('id') id: number,
          @Body() dataToUpdate: any
     ) {
          const output = new ResponseData();
          try {
               const updateTask = await this.tasksService.updateTheTask(id,dataToUpdate)
               output.data = updateTask
          } catch (error) {
               console.error(error);
               output.status = false;
               output.message = 'No Tasks were found';
          }
          return output;
     }

     @Delete(':id')
     async deleteTheTask(
          @Param('id') id: number,
     ) {
          const output = new ResponseData();
          try {
               const updateTask = await this.tasksService.deleteThetask(id)
               output.data = updateTask
          } catch (error) {
               console.error(error);
               output.status = false;
               output.message = 'No Tasks were found';
          }
          return output;
     }
}
