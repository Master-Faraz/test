import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { registerDTO } from './dto/registerUser.dto';
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
}
