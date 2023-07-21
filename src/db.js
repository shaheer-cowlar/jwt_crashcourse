const users = [
  {
    email:"shaheer@hotmail.com",
    password:"123456"
  },
  {
    email:"shah@mail.com",
    password:"123456"
  },  
];

const publicPosts = [
{
    title:"XYZ POST",
    content:"here you goo..."
},
{
    title:"XYZ POST",
    content:"here you goo..."
},
{
    title:"XYZ POST",
    content:"here you goo..."
},
];

const privatePosts = [
{
    title:"abc posts",
    content:"here you not go "
},
{
    title:"abc posts",
    content:"here you not go "
},
{
    title:"abc posts",
    content:"here you not go "
},
];


const weather = [
    { 
        city:"Karachi",
        temperature:"30",
        humidity:"10"
    },
    { 
        city:"Islamabad",
        temperature:"20",
        humidity:"20"
    },
    { 
        city:"Lahore",
        temperature:"40",
        humidity:"15"
    },
    ];



module.exports = {
    users,
    privatePosts,
    publicPosts,
    weather
};