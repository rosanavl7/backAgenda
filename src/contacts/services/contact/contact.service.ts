import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IReturn } from 'src/assets/interfaces/i-return.interface';
import{CreateContactDto} from '../../dto/create-contact-dto'
import{UpdateContactDto} from '../../dto/update-contact-dto'
import { IContact } from '../../interfaces/i-contact.interface';

@Injectable()
export class ContactService {
  /*****************************************************************
   * @param IContact
   * @returns
   *****************/
  constructor(
    @Inject('CONTACT_MODEL')
    private readonly contactModel: Model<IContact>,
  ) { }

  /*****************************************************************
   * @param CreateContactDto
   * @returns Promise<IReturn>
   *****************/
  async create(createContactDto: CreateContactDto): Promise<IReturn> {
    const existContact = await this.contactModel.exists({ name: createContactDto.name});
    //Se llama a la promesa
    const myPromise = new Promise<IReturn>((resolve, reject) => {
      if (!existContact) {
        new this.contactModel(createContactDto).save().then(saved => {
          resolve({ msg: 'Contact creado', status: 400, data: saved, code: '400',  validRequest: true})
        });
      }
      else {
        resolve({ msg: 'El nombre de contacto ya existe', status: 500, data: undefined, code: '500',  validRequest: false });
      }
    });
    return myPromise;
  }

  /*****************************************************************
   * @param
   * @returns Promise<IReturn>
   *****************/
  async findAll(): Promise<IReturn> {
    const myPromise = new Promise<IReturn>((resolve, reject) => {
      this.contactModel.find().exec().then(r => {
        resolve({ msg: 'Contact:', status: 400, data: r, code: '400',  validRequest: true});
      });
    });
    return myPromise;
  }

  /*****************************************************************
   * @param id
   * @returns Promise<IReturn>
   *****************/
  async delete(id: string): Promise<IReturn> {
    const exist = await this.contactModel.exists({ _id: id });
    const myPromise = new Promise<IReturn>((resolve, reject) => {
      if (!exist) {
        resolve({ msg: 'El contacto no existe', status: 500, data: undefined, code: '500',  validRequest: false });
      }
      else {
        this.contactModel.deleteOne({ _id: id }).exec();
        resolve({ msg: 'El contacto fue eliminado',  status: 400, data: id, code: '400',  validRequest: true });
      }
    });
    return myPromise;
  }

  /*****************************************************************
   * @param UpdateContactDto
   * @returns Promise<IReturn>
   *****************/
  async update(updateContactDto: UpdateContactDto): Promise<IReturn> {
    if(updateContactDto._id === undefined || updateContactDto._id === '' || updateContactDto._id.trim() === ''){
      return new Promise<IReturn>((resolve,reject) => {
        resolve({ msg: 'Falta id', status: 400, data: undefined, code: '405',  validRequest: false});
      })
    }
    const exist = await this.contactModel.exists({ _id: updateContactDto._id });
    const myPromise = new Promise<IReturn>((resolve, reject) => {
      if (!exist) {
        resolve({ msg: 'El contacto no existe', status: 500, data: undefined, code: '500',  validRequest: false });
      }
      else {
        this.contactModel.findOneAndUpdate({_id:updateContactDto._id},updateContactDto,{ new: true}).exec();
        resolve({ msg: 'El contacto existe', status: 400, data: updateContactDto, code: '400',  validRequest: true });
      }
    });
    return myPromise;
  }

}

