// ==============================================================================
// PIXEL TRACKING COM CUPOM - Sistema de rastreamento para landing pages
// ==============================================================================
// Envia ref_id como "cupom" na mensagem WhatsApp
// Baseado em v7/v8 - Compatível com schema_v8_secure.sql
// ==============================================================================

class PixelTrackerCupom {
  constructor(config) {
    this.config = {
      tenantId: config.tenantId || "default",
      pixelId: config.pixelId,
      whatsappNumber: config.whatsappNumber,
      whatsappMessage: config.whatsappMessage || "Quero saber mais",
      pageviewUrl: config.pageviewUrl || "/api/pageview",
      leadUrl: config.leadUrl || "/api/clique",
      cupomPrefix: "cupom",
      ...config,
    };

    this.refId = this.getOrCreateRefId();
    this.initialized = false;
  }

  // Gera ref_id no formato alfanumérico (12 caracteres)
  // Igual v7: ABCDEFG123XY
  generateRefIdAlpha() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 12; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  // Gera ref_id em UUID (mantém compatibilidade com versão anterior)
  generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  getOrCreateRefId() {
    const storageKey = `pixel_tracking_ref_id_${this.config.tenantId}`;
    let refId = sessionStorage.getItem(storageKey);

    if (!refId) {
      // Usa formato alfanumérico (12 chars) como v7
      refId = this.generateRefIdAlpha();
      sessionStorage.setItem(storageKey, refId);
    }

    return refId;
  }

  // Formata mensagem com cupom (ref_id)
  // Suporta placeholder {cupom} na mensagem do .env
  formatMessageWithCupom(refId) {
    // Se a mensagem tem {cupom}, substitui. Senão, append no final
    if (this.config.whatsappMessage.includes('{cupom}')) {
      return this.config.whatsappMessage.replace(/{cupom}/g, refId);
    }
    return `${this.config.whatsappMessage}, número do meu ${this.config.cupomPrefix} promocional: ${refId}`;
  }

  // Constrói URL do WhatsApp com mensagem personalizada
  buildWhatsAppUrl(refId) {
    const message = this.formatMessageWithCupom(refId);
    return `https://wa.me/${this.config.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  init() {
    if (this.initialized) return;
    this.initialized = true;

    this.trackPageView();
    this.setupLeadTracking();
  }

  trackPageView() {
    if (!this.config.pixelId) {
      console.warn("❌ Pixel ID não configurado");
      return;
    }

    // Captura fbclid e outros parâmetros Meta
    const params = new URLSearchParams(window.location.search);
    const fbclid = params.get("fbclid") || null;
    const utm_source = params.get("utm_source") || null;
    const utm_medium = params.get("utm_medium") || null;
    const utm_campaign = params.get("utm_campaign") || null;
    const utm_content = params.get("utm_content") || null;
    const utm_term = params.get("utm_term") || null;
    const utm_id = params.get("utm_id") || null;

    // Lê cookies Meta (_fbp, _fbc)
    const fbp = this.readCookie("_fbp") || null;
    const fbc = this.readCookie("_fbc") || null;

    const payload = {
      ref_id: this.refId,
      evento_type: "pageview",
      landing_url: window.location.href,
      user_agent: navigator.userAgent,
      client_ip: null, // Será preenchido pelo backend
      fbclid: fbclid,
      fbp: fbp,
      fbc: fbc,
      utm_source: utm_source,
      utm_medium: utm_medium,
      utm_campaign: utm_campaign,
      utm_content: utm_content,
      utm_term: utm_term,
      utm_id: utm_id,
    };

    fetch(this.config.pageviewUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(err => console.warn("Erro ao rastrear pageview:", err));

    console.log("📊 PageView rastreado:", payload);
  }

  setupLeadTracking() {
    document.addEventListener("click", (e) => {
      const target = e.target.closest("[data-track-wpp]");
      if (target) {
        e.preventDefault();
        this.handleWhatsAppClick();
      }
    }, true);
  }

  trackLead() {
    const params = new URLSearchParams(window.location.search);
    const fbclid = params.get("fbclid") || null;
    const fbp = this.readCookie("_fbp") || null;
    const fbc = this.readCookie("_fbc") || null;

    const payload = {
      ref_id: this.refId,
      evento_type: "clique",
      fbclid: fbclid,
      fbp: fbp,
      fbc: fbc,
      clicou_wpp_at: new Date().toISOString(),
    };

    fetch(this.config.leadUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(err => console.warn("Erro ao rastrear lead:", err));

    console.log("📊 Lead rastreado:", payload);
  }

  // Lê cookie por nome
  readCookie(name) {
    const match = document.cookie.match(
      new RegExp(`(?:^|; )${name}=([^;]*)`)
    );
    const value = match?.[1];
    return value ? decodeURIComponent(value) : null;
  }

  // Click no WhatsApp com redirect
  handleWhatsAppClick() {
    console.log("[clique] botão WhatsApp clicado");
    console.log("[clique] ref_id/cupom", this.refId);

    // Rastreia o clique
    this.trackLead();

    // Aguarda um pouco para garantir que o registro chegou
    setTimeout(() => {
      const url = this.buildWhatsAppUrl(this.refId);
      console.log("[clique] redirecionando para", url);
      window.location.href = url;
    }, 100);
  }

  trackCustomEvent(eventName, eventData = {}) {
    const payload = {
      event: eventName,
      ref_id: this.refId,
      timestamp: new Date().toISOString(),
      ...eventData,
    };

    console.log(`📊 Evento ${eventName} rastreado:`, payload);
  }

  // Expor ref_id e cupom para acessar programaticamente
  getCupom() {
    return this.refId;
  }

  getWhatsAppUrl() {
    return this.buildWhatsAppUrl(this.refId);
  }
}

// ==============================================================================
// EXPORTAR
// ==============================================================================

if (typeof module !== "undefined" && module.exports) {
  module.exports = PixelTrackerCupom;
}
