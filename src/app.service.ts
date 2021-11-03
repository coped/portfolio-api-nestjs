import { Injectable } from '@nestjs/common';
import { Msgs } from './utils/constants';

@Injectable()
export class AppService {
  greeting() {
    return {
      message: Msgs.INDEX_GREETING,
    };
  }
}
