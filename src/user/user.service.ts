/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ConflictException, Injectable } from '@nestjs/common';
import { registerDTO } from 'src/auth/dto/registerUser.dto';
import { DbService } from 'src/db/db.service';
import * as schema from "../db/schemas/user.schema";

@Injectable()
export class UserService {
    // init the db service where db config is set
    constructor(private dbService: DbService) { }



    async registerUser(registerUserDto: registerDTO) {

        // creating the user
        try {
            const [user] = await this.dbService.getDb()
                .insert(schema.users)           // Insert into users table
                .values(registerUserDto)               // With this data
                .returning();

            return { user }
        }
        catch (error: unknown) {
            const DUPLICATE_KEY_ERROR_CODE ='23505'
            console.log(error);

            const pgError = (error as any)?.cause;

            if (pgError?.code === DUPLICATE_KEY_ERROR_CODE) {
                throw new ConflictException('Email already taken');
            }

            throw error;
        }

    }
}
