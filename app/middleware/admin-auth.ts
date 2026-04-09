export default defineNuxtRouteMiddleware(async (to) => {
  // Skip login page
  if (to.path === '/admin/login') return

  try {
    const { Account } = await import('appwrite')
    const { client } = useAppwriteClient()
    const account = new Account(client)
    await account.get()
  } catch {
    return navigateTo('/admin/login')
  }
})
