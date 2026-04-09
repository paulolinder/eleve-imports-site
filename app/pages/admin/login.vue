<script setup lang="ts">
definePageMeta({ layout: false })

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function handleLogin() {
  error.value = ''
  loading.value = true
  try {
    const { Account } = await import('appwrite')
    const { client } = useAppwriteClient()
    const account = new Account(client)
    await account.createEmailPasswordSession(email.value, password.value)
    navigateTo('/admin')
  } catch (e: any) {
    error.value = 'Erro: ' + (e.message || 'Email ou senha incorretos.')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:#f3f4f6;">
    <div style="width:100%;max-width:400px;padding:24px;">
      <div style="background:#fff;border-radius:16px;padding:40px;box-shadow:0 4px 20px rgba(0,0,0,0.08);border:1px solid #e5e7eb;">
        <!-- Logo -->
        <div style="text-align:center;margin-bottom:32px;">
          <img src="/logo-dark.png" alt="Eleve Imports" style="height:48px;width:auto;margin:0 auto;display:block;" />
          <p style="margin-top:12px;font-size:14px;color:#6b7280;">Painel Administrativo</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin" style="display:flex;flex-direction:column;gap:16px;">
          <div>
            <label style="display:block;font-size:13px;font-weight:500;color:#374151;margin-bottom:6px;">Email</label>
            <input
              v-model="email"
              type="email"
              required
              placeholder="admin@eleveimports.com"
              style="width:100%;padding:10px 14px;border:1px solid #d1d5db;border-radius:8px;font-size:14px;outline:none;transition:border 0.15s;box-sizing:border-box;color:#111827;background:#fff;"
            />
          </div>
          <div>
            <label style="display:block;font-size:13px;font-weight:500;color:#374151;margin-bottom:6px;">Senha</label>
            <input
              v-model="password"
              type="password"
              required
              placeholder="••••••••"
              style="width:100%;padding:10px 14px;border:1px solid #d1d5db;border-radius:8px;font-size:14px;outline:none;transition:border 0.15s;box-sizing:border-box;color:#111827;background:#fff;"
            />
          </div>

          <p v-if="error" style="font-size:13px;color:#dc2626;margin:0;">{{ error }}</p>

          <button
            type="submit"
            :disabled="loading"
            style="width:100%;padding:12px;background:#111827;color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;transition:opacity 0.15s;"
            :style="loading ? 'opacity:0.6;cursor:not-allowed' : ''"
          >
            {{ loading ? 'Entrando...' : 'Entrar' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
