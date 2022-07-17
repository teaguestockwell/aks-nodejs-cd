import { server } from './src'

afterAll(() => {
  server.close()
})