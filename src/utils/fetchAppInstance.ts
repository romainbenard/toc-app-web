import config from '@/config'

const { appUrl } = config

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

const fetchAppInstance = async <T>(
  url: string,
  method: HTTPMethod,
  body?: T,
  customHeaders?: { [key: string]: string }
) => {
  const headers = {
    'Content-Type': 'application/json',
    ...customHeaders,
  }

  const options = {
    method,
    headers,
  }

  return fetch(`${appUrl}/api${url}`, {
    ...options,
    body: JSON.stringify(body),
  })
    .then(res => {
      if (!res.ok) {
        // TODO: Update after server response status improvement
        throw new Error(`Request failed: \n ${res}`)
      }

      return res.json()
    })
    .catch(err => {
      console.error('[#fetchAppInstance]', err)

      throw new Error(err)
    })
}

export default fetchAppInstance
