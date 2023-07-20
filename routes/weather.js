const router = require("express").Router();
const { weather } = require("../db");
//const { privatePosts } = require("../db");
const checkAuth = require("../routes/middleware/checkAuth")

router.get('/all',(req,res)=>{
  res.json({
    weather
  })
 
});


router.get('/khi',(req,res)=>{
   
    let weath = weather.find((weath)=>{
        return weath.city === "Karachi"
    });
    res.json({
      weath

      })
    })
   


router.get('/isb',(req,res)=>{
   
        let weath = weather.find((weath)=>{
            return weath.city === "Islamabad"
        });
        res.json({
          weath
    
          })
        })
       
    

router.get('/lhr',(req,res)=>{
   
     let weath = weather.find((weath)=>{
        return weath.city === "Lahore"
         });
res.json({
    weath
         })  })
           
  module.exports = router;