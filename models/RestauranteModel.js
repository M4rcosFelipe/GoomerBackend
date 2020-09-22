const {Sequelize} = require('./db')
const {sequelize} = require('./db')

const Restaurante = sequelize.define('restaurantes',{
  image:{
    type:Sequelize.STRING
  },
  name:{
    type:Sequelize.STRING
  },
  address:{
    type:Sequelize.STRING
  },

})


module.exports = Restaurante