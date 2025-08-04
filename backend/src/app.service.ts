import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {

    return 'There are three endpoints available:<br><br>/folders<br><br>/files/by-date<br><br>/files/by-folders';
  }
}
