/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDTO } from './dto/registerUser.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authservice: AuthService) {
        this.authservice = authservice
    }


    // /auth/register
    @Post('register')
    async register(@Body() registerUserDTO: registerDTO) {
        // console.log(registerUserDTO)
        const createdUser = await this.authservice.registerUser(registerUserDTO)
        return createdUser
    }
}
