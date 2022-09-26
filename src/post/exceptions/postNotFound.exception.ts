import { NotFoundException } from "@nestjs/common";

export class PostNotFoundException extends NotFoundException {
    constructor(postId:number){
        super(`Post with id ${postId} is not found`)
    }
}