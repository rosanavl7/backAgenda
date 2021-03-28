import { Module } from '@nestjs/common';
import { contactProviders } from './providers/contact';
import { ContactService } from './services/contact/contact.service';
import { ContactController } from './api/contact/contact.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...contactProviders, ContactService],
  controllers: [ContactController]
})
export class ContactsModule {}