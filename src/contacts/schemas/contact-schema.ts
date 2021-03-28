import * as mongoose from 'mongoose';

export const ContactSchema = new mongoose.Schema ({
    name: { type: String, required: true},
    phone: { type: Number, required: true },
    surname: { type: String, default: 'Desconocido' },
});
