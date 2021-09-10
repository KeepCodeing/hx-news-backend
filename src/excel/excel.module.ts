import { ExcelStudentInfo } from './entities/excelstudentinfo.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExcelController } from './excel.controller';
import { ExcelService } from './excel.service';

@Module({
  controllers: [ExcelController],
  providers: [ExcelService],
  exports: [ExcelService],
  imports: [TypeOrmModule.forFeature([ExcelStudentInfo])],
})
export class ExcelModule {}
