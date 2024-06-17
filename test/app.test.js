const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../src/app')

describe('Test the root path', () => {
  test('It should response the GET method', () => {
    return request(app)
      .get('/')
      .expect(200)
  })
})

describe('Test the collection creation', () => {
  test('It should response the POST method', () => {
    return request(app)
      .get('/profile/collections')
      .expect(401)
  })
})

describe('Auth API', () => {
  let _token

  it('should login and return a token', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'rahul@example.com', password: 'rahul@123' })
      .expect(200)

    _token = response.body._token
    expect(response.body).toHaveProperty('_token')
  })

  it('should return user profile with token', async () => {
    const response = await request(app)
      .get('/profile')
      .set('Authorization', `Bearer ${_token}`)
      .expect(200)

    expect(response.body.message).toBe('Welcome Rahul')
  })

  it('should return collections', async () => {
    const response = await request(app)
      .get('/profile/collections')
      .set('Authorization', `Bearer ${_token}`)
      .expect(200)

    // Expect collections to be an array
    expect(Array.isArray(response.body.collections)).toBe(true)

    // Expect collections to have a specific length (optional)
    // Adjust the expected length as needed based on your database state
    expect(response.body.collections.length).toBeGreaterThanOrEqual(0)

    // If collections can be empty, you can use this expectation
    expect(response.body.collections).toBeDefined()
  })
})

afterAll(() => mongoose.connection.close())
