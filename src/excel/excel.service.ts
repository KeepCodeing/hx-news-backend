import xlsx from 'node-xlsx';
import { ExcelStudentInfo } from './entities/excelstudentinfo.entity';
import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ExcelService extends TypeOrmCrudService<ExcelStudentInfo> {
  constructor(@InjectRepository(ExcelStudentInfo) repo) {
    super(repo);
  }

  createMulStudent(outputName: string) {
    const ex = xlsx.parse(outputName)[0];

    const col: any = ex.data[0];
    const dataCnt = ex.data.length;
    const bulk: ExcelStudentInfo[] = [];

    for (let i = 1; i < dataCnt; i++) {
      const temp: ExcelStudentInfo | {} = {};
      for (const idx in col) {
        temp[col[idx]] = ex.data[i][idx];
      }
      bulk.push(temp as ExcelStudentInfo);
    }
    this.repo.save(bulk);
  }

  async exportStudentInfo() {
    const res = await this.repo.find();
    const colName = Object.keys(res[0]);
    const data: any[][] = [colName];
    for (const d of res) {
      const temp = [];
      for (const k of colName) {
        temp.push(d[k]);
      }
      data.push(temp);
    }
    const ex = {
      name: 'download_excel.xlsx',
      data: data
    }
    return xlsx.build([ex]);
  }
}
