import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateContactDto } from 'src/contacts/dto/create-contact-dto';
import { UpdateContactDto } from 'src/contacts/dto/update-contact-dto';
import { ContactService } from 'src/contacts/services/contact/contact.service';

//Aqui es donde indicamos la URL
@Controller('api/agendaEdibo/v0/contactos')
export class ContactController {
  /***************************************************************
   * @param ContactService
   * @returns
   ************/
  constructor(private contactService: ContactService) {}

  /***************************************************************
   * @param CreateContactDto
   * @returns create()
   ************/
  @Post('create')
  create(@Body() contactDetail: CreateContactDto) {
    //se llama a la promesa
    return this.contactService.create(contactDetail).then(r => {
      return r;
    });
  }

  /***************************************************************
   * @param
   * @returns findAll()
   ************/
  @Get('readAll')
  readAll() {
    return this.contactService.findAll();
  }

  /***************************************************************
   * @param id
   * @returns delete()
   ************/
  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.contactService.delete(id).then(r => {
      return r;
    });
  }

  /***************************************************************
   * @param UpdateContactDto
   * @returns update()
   ************/
  @Post('update')
  update(@Body() contactDetail:UpdateContactDto) {
    return this.contactService.update(contactDetail).then(r => {
      return r;
    });
  }
}

