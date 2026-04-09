/**
 * Utilitário Appwrite para uso exclusivo no server-side (Nitro).
 * Usa a API Key privada via variável de ambiente.
 * NUNCA importe este arquivo em componentes ou páginas do lado do cliente.
 */
import { Client, Databases, Storage, Query } from 'node-appwrite'

let _serverClient: Client | null = null

function getServerClient(): Client {
  if (!_serverClient) {
    const config = useRuntimeConfig()

    if (!config.appwriteApiKey) {
      throw new Error('[Appwrite] APPWRITE_API_KEY não configurada no ambiente.')
    }

    const endpoint = config.appwriteEndpoint.replace(/\/$/, '')
    const fullEndpoint = endpoint.endsWith('/v1') ? endpoint : `${endpoint}/v1`

    _serverClient = new Client()
    _serverClient
      .setEndpoint(fullEndpoint)
      .setProject(config.appwriteProjectId)
      .setKey(config.appwriteApiKey)
  }
  return _serverClient
}

export function getAppwriteServer() {
  const client = getServerClient()
  return {
    client,
    databases: new Databases(client),
    storage: new Storage(client),
  }
}

export { Query }
