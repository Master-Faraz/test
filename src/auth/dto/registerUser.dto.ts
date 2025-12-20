import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class registerDTO {
    id: string

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    createdAt: Date;
    updatedAt: Date;
}
export class loginDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

}