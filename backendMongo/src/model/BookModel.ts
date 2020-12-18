import {Document, Schema, model} from 'mongoose';

interface Book extends Document{
    name: string,
    genres: [string],
    year: number,
    autor: string,
}

const BookSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },

    genres:{
        type: Array,
        required: [true, 'Genre field is required']
    },

    year:{
        type: Number,
        required: [true, 'Year field is required']  
    },

    autor:{
        type: String,
        required: [true, 'Director field is required']
    }
})

export default model<Book>('Movie', BookSchema);