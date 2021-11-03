import { Controller, Post, Body } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactDto } from './dto/contact.dto';
import { Envs } from 'src/utils/constants';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async contact(@Body() contactDto: ContactDto) {
    await this.contactService.verifyRecaptcha(contactDto.token);

    if (process.env.NODE_ENV === Envs.PRODUCTION) {
      await this.contactService.sendAWSEmail(contactDto);
    }

    return;
  }
}
