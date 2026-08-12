/**
 * TrackingInit - Inicializa pixel tracking com cupom
 *
 * Script vanilla: pixel-tracking-cupom.js
 * Schema: schema_v8_secure.sql (Supabase)
 *
 * Funcionalidades:
 * - Gera ref_id único por sessão
 * - Rastreia PageView automaticamente
 * - Detecta cliques em botões com data-track-wpp
 * - Inclui ref_id como "cupom" na mensagem WhatsApp
 * - Envia fbclid, fbp, fbc, utm_* para backend
 */

import { useEffect } from 'react'

export function TrackingInit() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Aguarda script estar disponível
    const checkInterval = setInterval(() => {
      if (typeof (window as any).PixelTrackerCupom === 'function') {
        clearInterval(checkInterval)

        const tracker = new (window as any).PixelTrackerCupom({
          tenantId: import.meta.env.VITE_TENANT_ID || 'paulo_robson',
          pixelId: import.meta.env.VITE_PIXEL_ID,
          whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER,
          whatsappMessage: import.meta.env.VITE_WHATSAPP_MESSAGE || 'Quero saber mais',
          pageviewUrl: import.meta.env.VITE_PAGEVIEW_URL || '/api/pageview',
          leadUrl: import.meta.env.VITE_LEAD_URL || '/api/clique',
        })

        tracker.init()
        ;(window as any).tracker = tracker

        console.log('[TrackingInit] ✅ Rastreamento inicializado')
        console.log('[TrackingInit] ref_id:', tracker.getCupom())
      }
    }, 50)

    return () => clearInterval(checkInterval)
  }, [])

  return null
}
