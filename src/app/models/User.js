import Sequelize, { Model } from "sequelize";
import bcrypt from "bcrypt"

class User extends Model {
  static init(sequelize) {
    super.init(  //super.init() é usado para chamar o método init() da classe pai (Model) e passar o objeto sequelize como argumento para configurar o modelo.
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL, //campo virtua => so axiste aq n vai para o banco de dados
        password_hash: Sequelize.STRING,
        admin: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    this.addHook("beforeSave", async(user) =>{  //para criptografar
      if(user.password){
        user.password_hash = await bcrypt.hash(user.password, 10)
      }
    })
    return this
  }

  checkPassword(password){
   return bcrypt.compare(password,this.password_hash)
  }

}
export default User