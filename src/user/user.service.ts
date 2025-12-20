/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { loginDTO, registerDTO } from 'src/auth/dto/registerUser.dto';
import { DbService } from 'src/db/db.service';
import * as schema from "../db/schemas/user.schema";
import { eq } from 'drizzle-orm';

@Injectable()
export class UserService {
    // init the db service where db config is set
    constructor(private dbService: DbService) { }



    async registerUser(registerUserDTO: registerDTO) {

        // creating the user
        try {
            const [user] = await this.dbService.getDb()
                .insert(schema.users)           // Insert into users table
                .values(registerUserDTO)               // With this data
                .returning(); //.   IMPORTANT TO GET THE data from the drizzle orm

            // console.log(user)
            return user as registerDTO

        }
        catch (error: unknown) {
            const DUPLICATE_KEY_ERROR_CODE = '23505'
            console.log(error);

            const pgError = (error as any)?.cause;

            if (pgError?.code === DUPLICATE_KEY_ERROR_CODE) {
                throw new ConflictException('Email already taken');
            }

            throw error;
        }

    }

    async loginUser(loginUserDTO: loginDTO) {

        try {
            // getting the user from drizzle and neon db
            const user = await this.dbService.getDb().query.users.findFirst({
                where: eq(schema.users.email, loginUserDTO.email),
            });

            // checking if user exists or not 
            if (!user) throw new UnauthorizedException("User not found")

            return user as registerDTO

        } catch (error) {
            console.error(error)
            throw error
        }

    }
}
