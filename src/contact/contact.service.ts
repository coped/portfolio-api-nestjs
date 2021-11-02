import { Injectable } from '@nestjs/common';

@Injectable()
export class ContactService {
  mockContactMessage() {
    return 'Contact endpoint';
  }
}
