import config from '@/config'

const { appUrl } = config

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

const fetchAppInstance = async <T>(
  url: string,
  method: HTTPMethod,
  body?: T
) => {
  const headers = {
    'Content-Type': 'application/json',
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
        throw new Error('Request failed')
      }

      return res.json()
    })
    .catch(() => {
      return { success: false }
    })
}

export default fetchAppInstance
