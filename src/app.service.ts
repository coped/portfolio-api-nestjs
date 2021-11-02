import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  greeting() {
    return {
      message: 'Welcome to the coped.dev API.',
    };
  }
}
