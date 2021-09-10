import { ExcelService } from './excel.service';
import { ApiTags } from '@nestjs/swagger';
import { ExcelStudentInfo } from './entities/excelstudentinfo.entity';
import {
  Controller,
  Get,
  Post,
  Response,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { SkipAuth } from '../decorators/auth.decorator';
import { join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { createWriteStream } from 'fs';
import { Crud, CrudController } from '@nestjsx/crud';
import { Response as Rs } from 'express';

@ApiTags('excel')
@Controller('excel')
@Crud({
  model: {
    type: ExcelStudentInfo,
  },
  routes: {
    only: ['createManyBase'],
  },
})
export class ExcelController implements CrudController<ExcelStudentInfo> {
  constructor(public service: ExcelService) {}

  get base(): CrudController<ExcelStudentInfo> {
    return this;
  }

  @Get()
  @SkipAuth()
  async downloadExcel(@Response() res: Rs): Promise<string> {
    const result = await this.service.exportStudentInfo();
    
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats;charset=utf-8',
    );
    res.setHeader('Content-Disposition', 'attachment; filename=download.xlsx');
    res.setTimeout(30 * 60 * 1000);
    res.end(result, 'binary');

    return '导出excel成功！'
  }

  @Post()
  @SkipAuth()
  @UseInterceptors(FileInterceptor('excel'))
  uploadExcel(@UploadedFile() file) {
    const outputName = join(
      __dirname,
      '../upload/',
      `${uuid() + '_' + file.originalname}`,
    );

    createWriteStream(outputName).write(file.buffer, () => {
      this.service.createMulStudent(outputName);
    });

    return '导入excel成功!';
  }
}
