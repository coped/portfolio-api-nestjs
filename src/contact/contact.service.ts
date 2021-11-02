import axios from 'axios';
import {
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ErrorMsgs, StatusTexts, Urls } from 'src/utils/constants';
import { Recaptcha } from './interface/recaptcha.interface';

@Injectable()
export class ContactService {
  mockContactMessage() {
    return 'Contact endpoint';
  }

  async verifyRecaptcha(responseToken: string): Promise<void> {
    const body = new URLSearchParams({
      secret: process.env.RECAPTCHA_SECRET_KEY ?? '',
      response: responseToken,
    });

    const response = await axios.post(Urls.RECAPTCHA_VERIFY, body);
    if (response.statusText !== StatusTexts.OK) {
      throw new ServiceUnavailableException(ErrorMsgs.RECAPTCHA_SERVICE_FAIL);
    }

    const recaptcha = response.data as Recaptcha;
    if (recaptcha.score < 0.5) {
      throw new BadRequestException(ErrorMsgs.RECAPTCHA_VERIFY_FAIL);
    }
  }
}
