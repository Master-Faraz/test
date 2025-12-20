/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { loginDTO, registerDTO } from './dto/registerUser.dto';
import bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }

    // dto contails all the credentials 
    async registerUser(registerUserDTO: registerDTO) {

        // hashing the password  
        const hash = await bcrypt.hash(registerUserDTO.password, 10)



        // // Creating the user 
        const user = await this.userService.registerUser({ ...registerUserDTO, password: hash })

        console.log("USER")
        // console.log(user)

        // creating jwt token 
        const payload = { sub: user.id, email: user.email };

        const token = await this.jwtService.signAsync(payload)
        return { access_token: token }
    }

    async login(loginUserDTO: loginDTO) {
        // getting the data -> comparing the email and password -> creating jwt token and send

        try {
            // getting the user details
            const user = await this.userService.loginUser(loginUserDTO)

            //    comparing the password
            const result = await bcrypt.compare(loginUserDTO.password, user.password)
            if (!result) throw new UnauthorizedException("Invalid credentials")

            // creating jwt token 
            const payload = { sub: user.id, email: user.email };

            const token = await this.jwtService.signAsync(payload)
            return { access_token: token }

        } catch (error) {
            console.error(error)
            throw error
        }
    }
}
