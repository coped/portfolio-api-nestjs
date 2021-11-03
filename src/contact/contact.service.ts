import type { SendEmailCommandInput } from '@aws-sdk/client-ses';
import { SendEmailCommand } from '@aws-sdk/client-ses';
import {
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { ErrorMsgs, StatusTexts, Urls } from '../utils/constants';
import { Recaptcha } from './interface/recaptcha.interface';
import { ContactDto } from './dto/contact.dto';
import { sesClient } from '../libs/sesClient';

@Injectable()
export class ContactService {
  constructor(private readonly configService: ConfigService) {}

  async verifyRecaptcha(responseToken: string): Promise<void> {
    const secretKey =
      this.configService.get<string>('RECAPTCHA_SECRET_KEY') ?? '';
    const body = new URLSearchParams({
      secret: secretKey,
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

  async sendAWSEmail(content: ContactDto): Promise<void> {
    const msg = `Name: ${content.name}\nEmail: ${content.email}\nMessage: ${content.message}`;

    const input: SendEmailCommandInput = {
      Destination: {
        /* required */
        ToAddresses: ['dennisaaroncope@gmail.com'], // Receiving address
      },
      Message: {
        /* required */
        Body: {
          Text: {
            Charset: 'UTF-8',
            Data: msg,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Message from coped.dev!',
        },
      },
      Source: 'noreply@coped.dev', // Sender address
    };

    const response = await sesClient.send(new SendEmailCommand(input));
    const status: number = response.$metadata.httpStatusCode ?? 503;

    if (status > 399) {
      throw new ServiceUnavailableException(ErrorMsgs.AWS_SERVICE_FAIL);
    }
  }
}
