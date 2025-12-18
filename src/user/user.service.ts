/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { registerDTO } from 'src/auth/dto/registerUser.dto';
import { DbService } from 'src/db/db.service';
import * as schema from "../db/schema";

@Injectable()
export class UserService {
    // init the db service where db config is set
    constructor(private dbService: DbService) { }



    // creating the user
    async createUser(registerUserDto: registerDTO) {
        const [user] = await this.dbService.getDb()
            .insert(schema.users)           // Insert into users table
            .values(registerUserDto)               // With this data
            .returning();

        return { user }
    }
}
