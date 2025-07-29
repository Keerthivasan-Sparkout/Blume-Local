import { Body, Controller, Post } from "@nestjs/common";
import { TaskServices } from "../service/task.service";

@Controller("/task")
export class TaskController{

    constructor(private taskservice:TaskServices){}

    @Post()
    createTask(@Body() data:any ){
        return this.taskservice.createTask(data)
    }
}