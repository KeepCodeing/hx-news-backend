import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: '账号名',
        example: 'xiaoming',
    })
    account: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: '账号密码',
        example: '123456',
    })
    password: string;
}