import { Router, Request, Response } from 'express'
import { createClient } from '@supabase/supabase-js'

const router = Router()

const getSupabase = () => {
  return createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  )
}

router.post('/api/clique', async (req: Request, res: Response) => {
  try {
    const supabase = getSupabase()
    const { ref_id, evento_type = 'clique', fbclid, fbp, fbc, clicou_wpp_at } = req.body

    if (!ref_id) {
      return res.status(400).json({ error: 'Missing ref_id' })
    }

    const { data: existing } = await supabase
      .from('cliques_landing')
      .select('id')
      .eq('ref_id', ref_id)
      .single()

    if (existing) {
      const { error: updateError } = await supabase
        .from('cliques_landing')
        .update({
          evento_type,
          fbclid,
          fbp,
          fbc,
          clicou_wpp_at: clicou_wpp_at || new Date().toISOString(),
        })
        .eq('ref_id', ref_id)

      if (updateError) {
        console.error('[clique] Supabase update error:', updateError)
        return res.status(500).json({ error: updateError.message })
      }

      console.log(`[clique] ✅ Lead registrado (UPDATE) - ref_id: ${ref_id}`)
    } else {
      const { error: insertError } = await supabase
        .from('cliques_landing')
        .insert({
          ref_id,
          evento_type,
          fbclid,
          fbp,
          fbc,
          clicou_wpp_at: clicou_wpp_at || new Date().toISOString(),
          created_at: new Date().toISOString(),
        })

      if (insertError) {
        console.error('[clique] Supabase insert error:', insertError)
        return res.status(500).json({ error: insertError.message })
      }

      console.log(`[clique] ✅ Lead registrado (INSERT) - ref_id: ${ref_id}`)
    }

    res.json({ ok: true, ref_id })
  } catch (err: any) {
    console.error('[clique] Erro:', err)
    res.status(500).json({ error: err.message })
  }
})

export default router
