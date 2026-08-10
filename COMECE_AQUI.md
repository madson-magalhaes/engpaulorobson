# 🚀 COMECE AQUI - Landing Page com Rastreamento

## ✅ O que foi feito?

A landing page está **100% pronta** com rastreamento completo de tracking:

- ✅ Script de rastreamento integrado (`pixel-tracking-cupom.js`)
- ✅ Endpoints backend criados (`/api/pageview`, `/api/clique`)
- ✅ Componente React de inicialização (`TrackingInit.tsx`)
- ✅ Botões WhatsApp atualizados com `data-track-wpp`
- ✅ Arquivo `.env.example` com todas as variáveis

---

## 🎯 3 Passos para Testar

### 1️⃣ Criar `.env.local`

```bash
cp .env.example .env.local
```

Preencha com seus valores:

```env
VITE_PIXEL_ID=seu_pixel_id_aqui
VITE_TENANT_ID=paulo_robson
VITE_WHATSAPP_NUMBER=5588999244628
VITE_WHATSAPP_MESSAGE=Vim pela página de INSS de obras do Eng Paulo Robson...

# Backend (PRIVADO!)
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua_chave_privada_aqui
```

### 2️⃣ Rodar Localmente

```bash
npm install
npm run dev

# Abre em http://localhost:5173/inss-de-obras
```

### 3️⃣ Testar Rastreamento

1. Abra **F12** (Console)
2. Recarregue página → Procure por `📊 PageView rastreado`
3. Clique botão WhatsApp → Procure por `📊 Lead rastreado`
4. Verifique cupom na mensagem do WhatsApp
5. Confirm dados no Supabase

---

## 🚀 Subir para Vercel

### 1️⃣ GitHub

```bash
git add .
git commit -m "feat: add tracking setup"
git push origin main
```

### 2️⃣ Vercel

- Acesse https://vercel.com/new
- Conecte repositório GitHub
- Configure **Environment Variables** (mesmas do .env.local)
- Deploy! ✅

### 3️⃣ Testar em Produção

```
URL: https://seu-projeto.vercel.app/inss-de-obras
```

Repita testes locais na URL do Vercel.

---

## 📂 Arquivos Criados

```
✅ client/public/pixel-tracking-cupom.js    (Script de rastreamento)
✅ client/src/components/TrackingInit.tsx   (Componente React)
✅ client/src/App.tsx                       (Modificado)
✅ client/src/main.tsx                      (Modificado)
✅ client/src/pages/Home.tsx                (Modificado)
✅ server/routes/pageview.ts                (Endpoint POST /api/pageview)
✅ server/routes/clique.ts                  (Endpoint POST /api/clique)
✅ server/index.ts                          (Modificado)
✅ .env.example                             (Template)
✅ TRACKING_SETUP.md                        (Documentação completa)
```

---

## 💡 Como Funciona

```
User visita landing
    ↓
Script detecta fbclid + utm_* de Meta Ads
    ↓
ref_id gerado: ABC123XY45ZW
    ↓
PageView registrado no Supabase
    ↓
User clica "Falar no WhatsApp"
    ↓
Mensagem: "... cupom: ABC123XY45ZW"
    ↓
Lead registrado no Supabase
    ↓
n8n pode disparar automações
```

---

## 📖 Documentação Completa

Leia `TRACKING_SETUP.md` para:
- Setup detalhado
- Troubleshooting
- RLS Policies
- Schema SQL
- Integração n8n

---

## ❓ Dúvidas?

- Verifique `.env.local` está preenchido
- Confirme Supabase keys estão corretas
- Verifique `schema_v8.cliques_landing` existe
- Abra F12 e procure por erros no console
- Verifique Vercel logs se problema em produção

---

**Pronto para começar! 🚀**
