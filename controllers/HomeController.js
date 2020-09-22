const RestauranteModel = require('../models/RestauranteModel')

class HomeController {

    listRestaurants(){
        
        return async (req,res)=>{

            const restaurantsList = await RestauranteModel.findAll();

            res.render('index',{restaurantes:restaurantsList})
        }

    }


    showRestaurant(){
        
        return async (req,res)=>{
            const idToShow = req.params.id
  
            const restaurantData = await RestauranteModel.findAll({where:{id:idToShow}});


            res.render('restaurante',{restaurante:restaurantData[0]})
        }

    }


    formRestaurant=()=>{

        return (req,res)=>{
            res.render('cadastro')
        }
        
    }


    createRestaurant=()=>{

        return async (req,res)=>{
            
            const restauranteData = {
                image:req.body.image,
                name:req.body.name,
                address:req.body.address,
            }

            await RestauranteModel.create(restauranteData)         
            
            res.render('cadastro',{message:'DEU CERTO'})
        }
        
    }

    deleteRestaurant(){
        return async (req,res)=>{
            const idToDestroy = req.params.id
            RestauranteModel.destroy({where:{id:idToDestroy}})
            res.redirect('/')
        }
    }


}

module.exports = new HomeController()
          

   
      
