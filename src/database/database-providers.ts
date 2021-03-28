import * as mongoose from 'mongoose';
import { myConfig } from '../../myConfig';

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: (): Promise<typeof mongoose> =>
        //Se almacenara en el servidor y bbdd seleccionado
        mongoose.connect(`mongodb://${myConfig.mongoServer}/${myConfig. dataBase}`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false} )
    }
];
