import { Injectable } from '@nestjs/common';

//declare the user entity
export type User = any;


@Injectable()
export class UsersService {
  private readonly users = [
    {
      userID:1,
      username:'testUser',
      password: 'randomtest'
    },
    {
      userID:2,
      username:'testUser2',
      password: 'randomtest2'
    }

  ]

  async findOne(username:string): Promise<User | undefined>{
    return this.users.find(user=>user.username == username)
  }
}
