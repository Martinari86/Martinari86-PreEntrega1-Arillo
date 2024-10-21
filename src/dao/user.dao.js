import UsuarioModel from "./models/users.model.js";

class UserDao{
        async findById(id){
            return await UsuarioModel.findById(id)
        }

        async findOne(query){
            console.log("USER DAO: Email ", query);
            return await UsuarioModel.findOne(query)
        }

        async save(userData){
            console.log("USER DAO: userData ", userData);            
            const user = new UsuarioModel(userData);
            console.log("USER DAO: user que va al MODEL ", user);
            return await user.save()
        }

        async update(id, userData){
            return await UsuarioModel.findByIdAndUpdate(id, userData)
        }

        async delete(id){
            return await UsuarioModel.findByIdAndDelete(id)
        }
}

export default new UserDao();