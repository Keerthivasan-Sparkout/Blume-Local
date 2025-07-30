import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { TaskServices } from "../service/task.service";
import { ResponseUtil } from "src/common/utils/response.utils";
import { CreateTaskDto } from "../dto/create.task.dto";

@Controller("/task")
export class TaskController {

    constructor(private taskservice: TaskServices) { }

    @Post("/:email")
    async createTask(@Body() data: any, @Param('email') email: string) {
        const result =await this.taskservice.createTask(data, email)
        return ResponseUtil.success("Task updated ", result)
    }

    @Get("/:email")
    async getAllTask(@Param('email') email:string){
        const result = await this.taskservice.getTaskAllTask(email)
        return ResponseUtil.success("Fetch all Task", result)
    }
}