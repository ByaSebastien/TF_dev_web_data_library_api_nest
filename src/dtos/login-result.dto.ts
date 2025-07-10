import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from "./user.dto";
import { UserEntity } from "src/entities/user.entity";

export class LoginResultDto {
    @ApiProperty()
    token: string;

    @ApiProperty()
    user: UserDto

    constructor(token: string, user: UserEntity) {
        this.token = token;
        this.user = new UserDto(user);
    }
}