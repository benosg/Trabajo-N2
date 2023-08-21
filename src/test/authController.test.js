
const request = require('supertest');
const app  = require('../app'); 
describe('Authentication Controller', () => {
  it('should register a new user', async () => {
    const newUser = {
      email: 'test@test.com',
      password: 'testpassword'
    };

    const response = await request(app) 
      .post('auth/register') 
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Usuario registrado exitosamente. Verifique su correo electrónico.');
  });

  it('should log in a user', async () => {
    const userCredentials = {
      email: 'test@example.com',
      password: 'testpassword',
    };

    const response = await request(app) 
      .post('auth/login') 
      .send(userCredentials);

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it('should verify user email', async () => {
    const token = 'exampleToken'; // Reemplaza con un token válido
    const response = await request(app) 
      .get(`auth/verify-email/${token}`); // Ajusta la ruta correcta para tu aplicación

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Correo electrónico verificado exitosamente.');
  });
});
