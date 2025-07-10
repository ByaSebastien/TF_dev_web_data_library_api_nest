import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "src/entities/user.entity";

export class UserDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    email: string;

    constructor(entity: UserEntity) {
        this.id = entity.id;
        this.email = entity.email;
    }
}