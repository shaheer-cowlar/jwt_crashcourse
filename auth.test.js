const request = require('supertest');
const {app,server} = require('./index');
const { users } = require("./db")



describe('Auth API', () => {
  let token;

  it('should sign up a new user', async () => {
    const response = await request(app)
      .post('/auth/signup')
      .send({
        "email":"s2@hotmail.com",
        "password":"123456"
    });
    
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });


  it('should login user and return token', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        "email":"shaheer@hotmail.com",
        "password":"123456"
    });
    
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
    token = response.body.token;
  });

  it('should return all users', async () => {
    const response = await request(app)
      .get('/auth/getall')
      ;
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(users);
  });

  
});
