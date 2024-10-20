import userRepository from "../repositories/user.repository.js";
import {createHash, isValidPassword} from "../utils/util.js"

class UserService{

        async registerUser(userData){
            const existingUser= await userRepository.getUserByUser(userData.usuario)
            if(existingUser) throw new Error("El usuario ya existe")
                  
            //Creo un carrito nuevo ... exportar SERVICE de CART y que lo cree
            //const nuevoCarrito = new CartModel();
            //await nuevoCarrito.save
              
            userData.password = createHash(userData.password);
            return await userRepository.createUser(userData)
        }

        async loginUser(usuario, password){
            const user = await userRepository.getUserByUser(usuario)
            if(!user || !isValidPassword(password,user)){
                throw new Error ("Credenciales No Validas")
            }
            return user 
        }

        async getUserById(id){
            return await userRepository.getUserById(id)
        }

        async updateUser(id, userData){
            return await userRepository.updateUser(id,userData)
        }

        async deleteUser(id){
            return await userRepository.deleteUser(id)
        }

}

export default new UserService()