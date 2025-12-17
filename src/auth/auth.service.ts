import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { registerDTO } from './dto/registerUser.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) { }


    registerUser(registerUserDTO:registerDTO) {
        // dto contails all the credentials now hashing the password
        

        return this.userService.createUser()
    }
}
