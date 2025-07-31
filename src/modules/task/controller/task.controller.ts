import { Body, Controller, Get, Param, Post, Request, UseGuards } from "@nestjs/common";
import { TaskServices } from "../service/task.service";
import { ResponseUtil } from "src/common/utils/response.utils";
import { AuthGuard } from "@nestjs/passport";

@Controller("/task")
export class TaskController {

    constructor(private taskservice: TaskServices) { }

    @Post("/:email")
    async createTask(@Body() data: any, @Param('email') email: string) {
        const result =await this.taskservice.createTask(data, email)
        return ResponseUtil.success("Task updated ", result)
    }

    @Get("/mytask")
    @UseGuards(AuthGuard('jwt'))
    async getAllTask(@Request() req){
        const result = await this.taskservice.getTaskAllTask(req.user.sub)
        return ResponseUtil.success("Fetch all Task", result)
    }
}