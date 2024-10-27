import userDao from "../dao/user.dao.js"

class UserRepository{

    async createUser(userData){
        //console.log("USER REPOSITORY CreateUser: userData ", userData);
        return await userDao.save(userData)
    }

    async getUserById(id){
        return await userDao.findById(id)
    }

    async getUserByEmail(email){
        //console.log("USER REPOSITORY: Email ", email);
        return await userDao.findOne({email})
    }

    async getUserByUser(usuario){
        return await userDao.findOne({usuario})
    }

    async updateUser(id,userData){
        return await userDao.update(id,userData)
    }

    async deleteUser(id){
        return await userDao.delete(id)
    }

}

export default new UserRepository();