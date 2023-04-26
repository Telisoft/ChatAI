import { APIClient } from './apiCore'
import * as url from './urls'

const api = new APIClient()

const postJwtLogin = (data) => api.create(url.ADMIN_LOGIN, data)
export { postJwtLogin }
