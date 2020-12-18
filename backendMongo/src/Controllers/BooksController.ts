import {Request, Response} from 'express';
import Books from '../model/BookModel';

export default{
    async create (request: Request, response: Response){
        const {
            name,
            year,
            autor,
            genres
        } = request.body;
        console.log(request.body);

        await Books.create({
            name,
            year,
            autor,
            genres
        }).then(function(data){
            return response.status(201).send(data)
        })
    },

    async index(request: Request, response: Response){
        await Books.find()
            .then(function(data){
                return response.status(200).send(data)
        })
    },

    async update(request: Request, response: Response){
        const dados = request.body;
        const id = request.params.id;

        await Books.findByIdAndUpdate(id, dados)
            .then(function(old_book){
                Books.findOne({_id: request.params.id})
                    .then(function(new_book){
                        return response.status(200).send(new_book);
            })
        })
    },

    async delete(request: Request, response: Response){
        return await Books.findByIdAndRemove({_id: request.params.id}).then((book)=>{
            response.send(book);
        })
    }
}