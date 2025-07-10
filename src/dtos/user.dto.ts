import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "src/entities/user.entity";

export class UserDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    username: string;
    @ApiProperty()
    email: string;

    constructor(entity: UserEntity) {
        this.id = entity.id;
        this.username = entity.username;
        this.email = entity.email;
    }
}