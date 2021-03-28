import { Document } from 'mongoose';

export interface IContact  extends Document {
    readonly  name: string;
    readonly  phone: number;
    readonly  surname: string;
}
