import { Router, Request, Response } from 'express'
import { createClient } from '@supabase/supabase-js'

const router = Router()

const getSupabase = () => {
  return createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  )
}

router.post('/api/pageview', async (req: Request, res: Response) => {
  try {
    const supabase = getSupabase()
    const {
      ref_id,
      evento_type = 'pageview',
      landing_url,
      user_agent,
      fbclid,
      fbp,
      fbc,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
      utm_id,
    } = req.body

    if (!ref_id || !landing_url) {
      return res.status(400).json({ error: 'Missing ref_id or landing_url' })
    }

    const client_ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
      req.socket.remoteAddress ||
      null

    const { error } = await supabase
      .from('cliques_landing')
      .insert({
        ref_id,
        evento_type,
        landing_url,
        user_agent,
        client_ip,
        fbclid,
        fbp,
        fbc,
        utm_source,
        utm_medium,
        utm_campaign,
        utm_content,
        utm_term,
        utm_id,
        created_at: new Date().toISOString(),
      })
      .select()

    if (error) {
      console.error('[pageview] Supabase error:', error)
      if (error.code === '23505') {
        console.log(`[pageview] ref_id já registrado: ${ref_id}`)
        return res.json({ ok: true, ref_id, note: 'Already registered' })
      }
      return res.status(500).json({ error: error.message })
    }

    console.log(`[pageview] ✅ PageView registrado - ref_id: ${ref_id}`)
    res.json({ ok: true, ref_id })
  } catch (err: any) {
    console.error('[pageview] Erro:', err)
    res.status(500).json({ error: err.message })
  }
})

export default router
