import { Client, Databases, Storage } from 'appwrite'

let _client: Client | null = null
let _databases: Databases | null = null
let _storage: Storage | null = null

function getClient(): Client {
  if (!_client) {
    const config = useRuntimeConfig()
    const ep = config.public.appwriteEndpoint.replace(/\/$/, '')
    const fullEndpoint = ep.endsWith('/v1') ? ep : `${ep}/v1`

    _client = new Client()
    _client
      .setEndpoint(fullEndpoint)
      .setProject(config.public.appwriteProjectId)
  }
  return _client
}

export function useAppwriteClient() {
  const client = getClient()

  if (!_databases) _databases = new Databases(client)
  if (!_storage) _storage = new Storage(client)

  return {
    client,
    databases: _databases,
    storage: _storage,
  }
}
