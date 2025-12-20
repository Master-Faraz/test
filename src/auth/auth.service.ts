import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { registerDTO } from './dto/registerUser.dto';
import bcrypt from "bcrypt"

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) { }

    // dto contails all the credentials 
    async registerUser(registerUserDTO: registerDTO) {

        // hashing the password  
        const hash = await bcrypt.hash(registerUserDTO.password, 10)
        // Creating the user 
        return this.userService.registerUser({ ...registerUserDTO, password: hash })
    }
}
