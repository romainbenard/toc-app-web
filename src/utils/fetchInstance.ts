import config from '@/config'

const { appUrl } = config

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

const fetchAppInstance = async <T>(
  url: string,
  method: HTTPMethod,
  body?: T,
  customHeaders?: { [key: string]: string }
) => {
  console.log('fetchAppInstance')
  const headers = {
    'Content-Type': 'application/json',
    ...customHeaders,
  }

  const options = {
    method,
    headers,
  }
  console.log({ body })
  console.log(`${appUrl}/api${url}`)
  return fetch(`${appUrl}/api${url}`, {
    ...options,
    body: JSON.stringify(body),
  }).then(response => {
    if (!response.ok) {
      throw new Error(`Request failed: \n ${response}`)
    }

    return response.json()
  })
}

export default fetchAppInstance
