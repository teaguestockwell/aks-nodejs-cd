import app from './index'
import supertest from 'supertest'

describe('/', () => {
  it('200', async () => {
    const res = await supertest(app).get('/')
    expect(res.status).toBe(200)
    expect(res.body).toBe('hi mom')
  })
})