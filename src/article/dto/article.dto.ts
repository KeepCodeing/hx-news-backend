import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ArticleDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: '文章状态',
    example: 0,
  })
  status: number;

  @IsString()
  @ApiProperty({
    description: '文章标签',
    example: '支部概况'
  })
  tags: string;

  @IsString()
  @ApiProperty({
    description: '文章标题',
    example: 'Hello World'
  })
  title: string;

  @IsString()
  @ApiProperty({
    description: '文章内容',
    example: 'Hello World'
  })
  content: string;

  @IsNumber()
  @ApiProperty({
    description: '审阅人ID',
    example: 1
  })
  judgerId: number;

  @IsString()
  @ApiProperty({
    description: '文章作者',
    example: 'rudk'
  })
  authors: string;

  @IsDate()
  ctime: Date;
}
