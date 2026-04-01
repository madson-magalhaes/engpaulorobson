import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, CheckCircle, AlertCircle, Play, Instagram, Linkedin, Mail, MessageCircle, ShieldCheck, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Link } from "wouter";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

/**
 * Landing Page INSS - Redução de INSS de Obras
 * Design: Modernizado "Prátice Hub Style"
 * Paleta: Slate Escuro (#020617) + Dourado (#EAB308) + Glassmorphism
 */

const WHATSAPP_LINK = "https://wa.me/5585987244624?text=Quero%20saber%20mais%20da%20regulariza%C3%A7%C3%A3o%20de%20INSS%20e%20receber%20meu%20diagn%C3%B3stico%20gratuito.";

const TESTIMONIAL_VIDEOS = [
  { id: "c0re4dk8nYg" },
  { id: "DWLi__1Jegs" },
  { id: "VbnNtVBaVWg" },
  { id: "4-kg4nhpo_U" },
  { id: "fstYQND6hRY" },
];

const CASE_VIDEOS = [
  { id: "qaNoHWSm4kw", title: "CASO 1", subtitle: "REDUÇÃO DRÁSTICA (75%)" },
  { id: "uIHgt-ILl6s", title: "CASO 2", subtitle: "ECONOMIA VALIDADA" },
  { id: "YyEyGoRj_XU", title: "CASO 3", subtitle: "ESTRATÉGIA INTELIGENTE" },
  { id: "36lZkaHTHKU", title: "CASO 4", subtitle: "RESULTADO REAL NO CNO" },
  { id: "sihr-myuzws", title: "CASO 5", subtitle: "NOTIFICAÇÃO EVITADA" },
  { id: "sXlYjtyy2lI", title: "CASO 6", subtitle: "REGULARIZAÇÃO EFICIENT" },
  { id: "Vy820y45KcE", title: "CASO 7", subtitle: "ECONOMIA DE 70%" },
  { id: "MoSyiOcQojw", title: "CASO 8", subtitle: "FIM DA MULTA DE OFÍCIO" },
  { id: "OnL1Mo1wZo0", title: "CASO 9", subtitle: "OBRA PROTEGIDA" },
  { id: "bo3AT70dKAU", title: "CASO 10", subtitle: "INTELIGÊNCIA FISCAL" },
  { id: "e7e2oCAvYXM", title: "CASO 11", subtitle: "SUCESSO NO SERO" },
  { id: "4eBB4rghZmw", title: "CASO 12", subtitle: "REDUÇÃO FINAL" },
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const laptopRef = useRef<HTMLDivElement>(null);

  // Refs para controle de scroll manual nos carrosséis (Mobile)
  const carousel1Ref = useRef<HTMLDivElement>(null);
  const carousel2Ref = useRef<HTMLDivElement>(null);
  const carousel3Ref = useRef<HTMLDivElement>(null);

  const scrollManual = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (!ref.current) return;
    const scrollAmount = ref.current.clientWidth * 0.8;
    ref.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };
  const [laptopScrollProgress, setLaptopScrollProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(typeof window !== "undefined" ? window.innerWidth >= 768 : true);
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [playingVideoKey, setPlayingVideoKey] = useState<string | null>(null);
  const [isDemoPlaying, setIsDemoPlaying] = useState(false);
  const [isTutorialPlaying, setIsTutorialPlaying] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setShowCookieConsent(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "true");
    setShowCookieConsent(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      // Animação da Tampa do Notebook baseada no Scroll
      if (laptopRef.current) {
        const rect = laptopRef.current.getBoundingClientRect();
        const viewHeight = window.innerHeight;
        const totalScroll = rect.height - viewHeight; // distância total de travamento

        // Inicia apenas quando a seção bate exatamente no top 0
        const currentScroll = -rect.top;

        if (currentScroll < 0) {
          setLaptopScrollProgress(0); // Fechado antes de travar
        } else if (currentScroll > totalScroll) {
          setLaptopScrollProgress(1); // Aberto depois de destravar
        } else {
          // Progresso de abertura suavizado apenas durante a rolagem travada
          setLaptopScrollProgress(Math.min(1, currentScroll / (totalScroll * 0.75)));
        }
      }
    };

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024); // lg: breakpoint is 1024px in default tailwind
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    
    // Initial call
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* SEÇÃO 1: HERO/GANCHO */}
      <section className="relative min-h-screen flex flex-col lg:justify-center pt-0 lg:pt-20 pb-20 overflow-hidden bg-[#020617]">

        {/* IMAGEM MOBILE EXCLUSIVA */}
        <div
          className="w-full h-[50vh] min-h-[400px] lg:hidden bg-cover bg-top bg-no-repeat relative z-0"
          style={{ backgroundImage: "url('hero-01-mobile.jpg')" }}
        >
          {/* Sombra para integrar suavemente a foto com o fundo escuro abaixo */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/20 to-transparent"></div>
        </div>

        {/* IMAGEM DESKTOP EXCLUSIVA */}
        <div
          className="hidden lg:block absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('background-hero.jpg')" }}
        >
          {/* Fundo mantido em design original: Sem overlay de gradiente, pois a imagem natural já possui fundo escuro para leitura */}
        </div>

        <div className="container relative z-10 mt-[-40px] lg:mt-0 pt-10 lg:pt-0 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 md:space-y-8 animate-fade-in-up text-center lg:text-left flex flex-col items-center lg:items-start">
              <img src="logo-pratice.png" alt="Prátice Group" className="w-[320px] md:w-[380px] h-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.05)] mb-2" />

              <div className="pill-badge">
                <span className="w-2 h-2 rounded-full bg-yellow-400 mr-2 animate-pulse"></span>
                OPORTUNIDADE DE ECONOMIA NA CONSTRUÇÃO
              </div>
              <h1 className="headline text-white drop-shadow-sm text-4xl sm:text-5xl lg:text-[4rem]">
                Tem obra economizando mais de <span className="highlight-yellow">R$ 50 mil</span> <br />
                <span className="text-white/50 text-2xl sm:text-3xl md:text-5xl font-semibold mt-2 block">sem mudar nada no projeto.</span>
              </h1>
              <p className="subheadline max-w-xl text-white/80">
                Você já sabe quanto pode economizar no imposto da CND do INSS de obras?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  <Button className="btn-primary" style={{ width: 'fit-content' }}>Quero Descobrir agora</Button>
                </a>
              </div>
            </div>

            {/* Bloco invisível na direita para manter o grid estruturado sem sobrepor a foto */}
            <div className="hidden lg:block h-[500px]"></div>
          </div>
        </div>

        {/* Borda dourada com fade nas bordas */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#EAB308] to-transparent opacity-80"></div>
      </section>

      {/* SEÇÃO 2: QUEBRA DE REALIDADE */}
      <section className="relative bg-[#020617] pt-0 lg:py-32 overflow-hidden flex flex-col lg:block">

        {/* IMAGEM MOBILE (Topo Isolado) */}
        <div className="w-full h-[40vh] min-h-[300px] lg:hidden bg-cover bg-center relative" style={{ backgroundImage: "url('bg-problema-obra.jpg')" }}>
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent"></div>
        </div>

        {/* IMAGEM DESKTOP (Esquerda Edge-to-Edge) */}
        <div className="hidden lg:block absolute left-0 top-0 w-1/2 h-full bg-cover bg-center" style={{ backgroundImage: "url('bg-problema-obra.jpg')" }}>
          {/* Fade escuro impecável fundindo o lado direito da foto escura com o resto do site */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#020617]/50 to-[#020617]"></div>
        </div>

        <div className="container relative z-10 pt-10 pb-20 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Espaço vazio (placeholder) na esquerda para respeitar a grade do container no desktop */}
            <div className="hidden lg:block h-[500px]"></div>

            <div className="space-y-6 md:space-y-8 animate-fade-in-up text-center lg:text-left flex flex-col items-center lg:items-start">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 text-red-500 font-medium text-sm tracking-wide">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                PROBLEMA COMUM
              </div>

              <h2 className="headline text-3xl sm:text-4xl lg:text-[3rem] text-white">
                A maioria dos donos de obra <span className="highlight-yellow">não faz ideia</span> de como o INSS é calculado.
              </h2>

              <div className="space-y-6 text-base md:text-lg text-white/75 font-light leading-relaxed max-w-2xl">
                <p>
                  E por isso, recebem uma guia de cobrança e acabam pagando valores muito acima do necessário — sem questionar, sem perceber.
                </p>
                <p className="pl-6 border-l-2 border-yellow-500 bg-gradient-to-r from-yellow-500/5 to-transparent py-4 text-white/90 text-left">
                  <strong className="text-white font-medium">O valor do INSS da obra não é fixo.</strong> Ele depende diretamente de como a sua obra é apresentada à prefeitura, enquadrada no alvará e informada no CNO.
                </p>
              </div>

              <div className="pt-6">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  <Button className="btn-primary" style={{ width: 'fit-content' }}>Descobrir minha economia</Button>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SEÇÃO 3: ONDE ESTÁ A ECONOMIA (LIGHT THEME PATTERN INTERRUPT) */}
      <section className="relative bg-white pt-12 pb-16 md:pt-16 md:pb-24 lg:py-32 overflow-hidden flex flex-col">

        {/* GRÁFICO COMPARATIVO MOBILE (DARK THEME) */}
        {/* MOCKUP IPHONE MOBILE (Substitui o Gráfico) */}
        <div className="container px-4 lg:hidden mb-12 relative z-20 flex justify-center">
          <div
            onClick={() => setIsDemoPlaying(true)}
            className="relative w-[280px] h-[580px] bg-slate-900 rounded-[3rem] border-[10px] border-slate-950 shadow-[0_20px_60px_rgba(2,6,23,0.5)] overflow-hidden transition-transform duration-500 hover:scale-[1.02] cursor-pointer ring-2 ring-white/5 group"
          >
            {/* Dynamic Island */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[90px] h-6 bg-black rounded-full z-30 flex justify-end items-center pr-3">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-800"></div>
            </div>

            {/* Tela de Vídeo */}
            <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center transition-colors z-10">
              {isDemoPlaying && !isDesktop ? (
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <div className="absolute inset-0 scale-[1.1] origin-center">
                    <iframe
                      src={`https://www.youtube.com/embed/94zZdAkMh-M?autoplay=1&modestbranding=1&rel=0&iv_load_policy=3&controls=0&disablekb=1&loop=1&playlist=94zZdAkMh-M`}
                      className="w-full h-full pointer-events-none"
                      allow="autoplay; encrypted-media"
                    />
                  </div>
                  {/* Overlay to stop/close */}
                  <div
                    className="absolute inset-0 z-20"
                    onClick={(e) => { e.stopPropagation(); setIsDemoPlaying(false); }}
                  ></div>
                </div>
              ) : (
                <div className="w-full h-full relative flex flex-col items-center justify-center group/card">
                  <img
                    src={`https://img.youtube.com/vi/94zZdAkMh-M/maxresdefault.jpg`}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                    alt="Capa do Vídeo"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
                  <Play className="w-20 h-20 text-amber-500 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)] z-20" fill="currentColor" />
                  <p className="mt-5 text-white/90 font-bold tracking-widest uppercase text-[10px] z-20 border-b border-white/30 pb-1">Assista à Demonstração</p>
                </div>
              )}
            </div>
            {/* Barra de Home IOS */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/20 rounded-full z-30"></div>
          </div>
        </div>

        {/* CONTAINER PRINCIPAL (GRID) */}
        <div className="container relative z-10 flex-grow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Esquerda: Texto Claro */}
            <div className="space-y-6 md:space-y-8 animate-fade-in-up text-center lg:text-left flex flex-col items-center lg:items-start">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-amber-200 bg-amber-50 text-amber-600 font-bold text-sm tracking-wide">
                ESTRATÉGIA INTELIGENTE
              </div>
              <h2 className="headline text-3xl sm:text-4xl lg:text-[3rem] text-slate-900">
                É exatamente aí que surgem as <span className="text-amber-500 block lg:inline">melhores oportunidades</span>.
              </h2>
              <div className="space-y-6 text-lg text-slate-600 font-medium leading-relaxed">
                <p>
                  Obras idênticas podem ter valores de impostos completamente diferentes — dependendo apenas de como o processo de regularização é conduzido no fisco.
                </p>

                {/* Destaque Modernizado Claro */}
                <div className="bg-slate-50 border border-slate-100 border-l-4 border-l-amber-500 p-6 md:p-8 rounded-xl shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-shadow cursor-default">
                  <p className="text-4xl font-black text-slate-900 leading-tight">De R$ 13.000,00 <br /><span className="text-amber-500 text-3xl">por apenas 5x de R$ 160,00</span></p>
                  <p className="text-xs md:text-sm tracking-widest uppercase text-slate-400 mt-3 font-bold">Baseado em caso real validado no SERO</p>
                </div>

                <p>
                  Isso <strong className="text-slate-900 bg-slate-100 px-1 rounded">não depende</strong> de trocar material ou alterar o projeto de engenharia. O resultado massivo vem da <strong className="text-amber-600">inteligência tributária</strong>.
                </p>
              </div>
            </div>

            {/* Direita: Mockup iPhone Desktop (Substitui o Gráfico) */}
            <div className="hidden lg:flex justify-center items-center relative">
              <div className="absolute -inset-10 bg-amber-100 blur-[120px] rounded-full pointer-events-none opacity-40"></div>

              <div
                onClick={() => setIsDemoPlaying(true)}
                className="relative w-[320px] h-[660px] bg-slate-900 rounded-[3.5rem] border-[12px] border-slate-950 shadow-[0_40px_100px_rgba(2,6,23,0.6)] overflow-hidden transition-all duration-700 hover:scale-[1.03] cursor-pointer ring-4 ring-white/5 group"
              >
                {/* Dynamic Island */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[110px] h-8 bg-black rounded-full z-30 flex justify-end items-center pr-4 shadow-inner">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
                </div>

                {/* Tela de Vídeo */}
                <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center transition-colors z-10">
                  {isDemoPlaying && isDesktop ? (
                    <div className="absolute inset-0 w-full h-full overflow-hidden">
                      <div className="absolute inset-0 scale-[1.1] origin-center">
                        <iframe
                          src={`https://www.youtube.com/embed/94zZdAkMh-M?autoplay=1&modestbranding=1&rel=0&iv_load_policy=3&controls=0&disablekb=1&loop=1&playlist=94zZdAkMh-M`}
                          className="w-full h-full pointer-events-none"
                          allow="autoplay; encrypted-media"
                        />
                      </div>
                      {/* Overlay to stop/close */}
                      <div
                        className="absolute inset-0 z-20"
                        onClick={(e) => { e.stopPropagation(); setIsDemoPlaying(false); }}
                      ></div>
                    </div>
                  ) : (
                    <div className="w-full h-full relative flex flex-col items-center justify-center group/card">
                      <img
                        src={`https://img.youtube.com/vi/94zZdAkMh-M/maxresdefault.jpg`}
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                        alt="Capa do Vídeo"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
                      <Play className="w-24 h-24 text-amber-500 opacity-90 group-hover:opacity-100 group-hover:scale-[1.10] transition-all duration-300 drop-shadow-[0_0_20px_rgba(234,179,8,0.4)] z-20" fill="currentColor" />
                      <p className="mt-8 text-white/90 font-bold tracking-[0.2em] uppercase text-xs z-20 border-b border-white/30 pb-2">Assista à Demonstração</p>
                    </div>
                  )}
                </div>

                {/* Barra de Home IOS */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-40 h-1.5 bg-white/20 rounded-full z-30"></div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTÃO ISOLADO E CENTRALIZADO NO BOTTOM */}
        <div className="w-full flex justify-center mt-12 lg:mt-20">
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            <Button className="btn-primary transform scale-[1.10] shadow-[0_15px_40px_rgba(234,179,8,0.35)]">
              Quero meu diagnóstico
            </Button>
          </a>
        </div>
      </section>

      {/* SEÇÃO 4: AUTORIDADE */}
      <section className="section-dark py-16 md:py-32 bg-slate-950">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center flex-col-reverse lg:flex-row">
            <div className="relative w-full flex flex-col items-center justify-end animate-fade-in pt-10">
              {/* Luzes Brancas de Fundo Piscando estáticas atrás dele */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[700px] h-[350px] md:h-[700px] bg-white/10 blur-[120px] rounded-full animate-pulse z-0 pointer-events-none"></div>

              {/* Imagem do Paulo Robson (Tamanho 100% real sem cortes) */}
              <img src="paulo-robson-hero.png" alt="Eng. Paulo Robson" className="relative w-full max-w-[550px] h-auto z-10 drop-shadow-2xl scale-105" />

              {/* Título Base fluindo naturalmente abaixo da foto */}
              <div className="relative z-20 pt-6 w-full text-center">
                <h3 className="text-3xl md:text-4xl font-black text-white mb-1 tracking-wide" style={{ fontFamily: 'Kanit' }}>Eng. Paulo Robson</h3>
                <p className="text-[#EAB308] font-bold tracking-widest uppercase text-sm md:text-base">A maior referência do país</p>
              </div>
            </div>
            <div className="space-y-6 md:space-y-8 animate-fade-in-up text-center lg:text-left flex flex-col items-center lg:items-start">
              <h2 className="headline text-3xl sm:text-4xl lg:text-[3rem]">
                A <span className="highlight-yellow">maior autoridade</span> em regularização técnica de INSS.
              </h2>
              <div className="space-y-6">
                {[
                  "Já gerou mais de R$ 10 milhões em economia para donos de obras em todo o Brasil.",
                  "Atua diretamente do lado do governo como coordenador de licenciamento de obras, justamente onde nasce a cobrança.",
                  "E conhecendo os dois lados da moeda, o eng. Paulo Robson sabe exatamente onde moram os maiores erros de engenheiros, arquitetos, contadores e das próprias prefeituras."
                ].map((text, i) => (
                  <div key={i} className="flex gap-4 md:gap-5 items-start text-left glass-card p-4 md:p-5 bg-white/[0.02] w-full">
                    <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 border border-yellow-500/30">
                      <CheckCircle className="w-4 h-4 text-yellow-500" />
                    </div>
                    <p className="text-base md:text-lg text-white/80 font-light leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  <Button className="btn-primary">Falar com Paulo Robson</Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 5: PROVA SOCIAL */}
      <section className="section-dark py-16 md:py-32 relative">
        <div className="container relative z-10">
          <div className="space-y-16">
            <div className="text-center space-y-6 animate-fade-in-up max-w-3xl mx-auto flex flex-col items-center">
              <div className="pill-badge">RESULTADOS REAIS</div>
              <h2 className="headline text-3xl sm:text-4xl lg:text-[3rem]">
                Veja na prática o que já está acontecendo.
              </h2>
              <p className="text-lg sm:text-xl text-white/60 font-light">
                Não é teoria. São casos reais de donos de obra que pagariam muito mais sem o nosso acompanhamento.
              </p>
            </div>

            {/* Carrossel 1: Depoimentos de Clientes Satisfeitos */}
            <div className="space-y-8 overflow-hidden">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10"></div>
                <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-widest text-center px-4">
                  DEPOIMENTOS DE CLIENTES SATISFEITOS
                </h3>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10"></div>
              </div>

              <div className="relative group/parent">
                <div
                  ref={carousel1Ref}
                  className="w-full overflow-x-auto no-scrollbar snap-x snap-mandatory lg:overflow-visible"
                >
                  <div className="flex gap-4 md:gap-6 animate-scroll-right-desktop pause-on-hover w-max lg:w-max lg:snap-none">
                    {/* Duplicando o array apenas para o desktop (loop infinito) */}
                    {[...TESTIMONIAL_VIDEOS, ...TESTIMONIAL_VIDEOS].map((video, idx) => (
                      <div
                        key={`${video.id}-${idx}`}
                        className="w-[260px] sm:w-[280px] md:w-[320px] snap-center lg:snap-align-none glass-card p-2 group/card hover:border-yellow-500/50 transition-colors duration-500 cursor-pointer"
                      >
                        <div className="aspect-[9/16] bg-slate-900 rounded-[1.5rem] flex items-center justify-center relative overflow-hidden shadow-2xl">
                          {playingVideoKey === `testimonial-${idx}` ? (
                            <div className="absolute inset-0 w-full h-full overflow-hidden">
                              <div className="absolute inset-0 w-full h-full scale-[1.1] origin-center">
                                <iframe 
                                  src={`https://www.youtube.com/embed/${video.id}?autoplay=1&modestbranding=1&rel=0&iv_load_policy=3&controls=0&disablekb=1&widgetid=1`} 
                                  className="w-full h-full pointer-events-none"
                                  allow="autoplay; encrypted-media"
                                />
                              </div>
                              <div className="absolute inset-0 z-20 cursor-pointer" onClick={(e) => { e.stopPropagation(); setPlayingVideoKey(null); }}></div>
                            </div>
                          ) : (
                            <div className="w-full h-full relative flex items-center justify-center" onClick={() => setPlayingVideoKey(`testimonial-${idx}`)}>
                              <img 
                                src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`} 
                                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                                alt="Depoimento Cliente"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                              <div className="w-20 h-20 rounded-full glass-card bg-black/40 flex items-center justify-center border-white/20 group-hover/card:bg-yellow-500 group-hover/card:border-yellow-400 group-hover/card:scale-110 transition-all duration-300 z-10 shadow-2xl">
                                <Play className="w-8 h-8 text-white fill-white ml-1" />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Setas de Controle - Apenas Mobile */}
                <div className="flex lg:hidden items-center justify-center gap-6 mt-6">
                  <button
                    onClick={() => scrollManual(carousel1Ref, 'left')}
                    className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white active:scale-95 transition-transform"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => scrollManual(carousel1Ref, 'right')}
                    className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white active:scale-95 transition-transform"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                <div className="hidden lg:block absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#020617] to-transparent z-20 pointer-events-none"></div>
                <div className="hidden lg:block absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#020617] to-transparent z-20 pointer-events-none"></div>
              </div>
            </div>

            {/* Carrossel 2: Antes e Depois */}
            <div className="space-y-8 pt-12 overflow-hidden">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10"></div>
                <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-widest text-center px-4">
                  COMPARATIVOS DE "ANTES E DEPOIS" DOS VALORES DE INSS
                </h3>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10"></div>
              </div>

              <div className="relative group/parent">
                <div
                  ref={carousel2Ref}
                  className="w-full overflow-x-auto no-scrollbar snap-x snap-mandatory lg:overflow-visible"
                >
                  <div className="flex gap-4 md:gap-6 animate-scroll-left-desktop pause-on-hover w-max lg:w-max lg:snap-none">
                    {[...CASE_VIDEOS, ...CASE_VIDEOS].map((video, idx) => (
                      <div
                        key={`${video.id}-${idx}`}
                        className="w-[260px] sm:w-[280px] md:w-[320px] snap-center lg:snap-align-none glass-card p-2 group/card hover:border-red-500/50 transition-colors duration-500 cursor-pointer relative"
                      >
                        <div className="aspect-[9/16] bg-slate-900 rounded-[1.5rem] flex items-center justify-center relative overflow-hidden shadow-2xl">
                          {playingVideoKey === `case-${idx}` ? (
                            <div className="absolute inset-0 w-full h-full overflow-hidden">
                              <div className="absolute inset-0 w-full h-full scale-[1.1] origin-center">
                                <iframe 
                                  src={`https://www.youtube.com/embed/${video.id}?autoplay=1&modestbranding=1&rel=0&iv_load_policy=3&controls=0&disablekb=1&widgetid=1`} 
                                  className="w-full h-full pointer-events-none"
                                  allow="autoplay; encrypted-media"
                                />
                              </div>
                              {/* Overlay de fechar/pausa simples: clicar no vídeo fecha ele */}
                              <div 
                                className="absolute inset-0 z-20 cursor-pointer" 
                                onClick={(e) => { e.stopPropagation(); setPlayingVideoKey(null); }}
                              ></div>
                            </div>
                          ) : (
                            <div className="w-full h-full relative flex items-center justify-center" onClick={() => setPlayingVideoKey(`case-${idx}`)}>
                              <img 
                                src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`} 
                                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                                alt="Depoimento INSS"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                              <div className="w-20 h-20 rounded-full glass-card bg-black/40 flex items-center justify-center border-white/20 group-hover/card:bg-red-500 group-hover/card:border-red-400 group-hover/card:scale-110 transition-all duration-300 z-10 shadow-2xl">
                                <Play className="w-8 h-8 text-white fill-white ml-1" />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Setas de Controle - Apenas Mobile */}
                <div className="flex lg:hidden items-center justify-center gap-6 mt-6">
                  <button
                    onClick={() => scrollManual(carousel2Ref, 'left')}
                    className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white active:scale-95 transition-transform"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => scrollManual(carousel2Ref, 'right')}
                    className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white active:scale-95 transition-transform"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                <div className="hidden lg:block absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#020617] to-transparent z-20 pointer-events-none"></div>
                <div className="hidden lg:block absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#020617] to-transparent z-20 pointer-events-none"></div>
              </div>
            </div>

            <div className="text-center pt-8 md:pt-12 relative z-30 px-4">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-block w-full max-w-sm md:max-w-none">
                <Button className="btn-primary md:text-xl w-full md:w-auto !whitespace-normal break-words !px-4 md:!px-10 shadow-[0_0_50px_rgba(234,179,8,0.3)] animate-pulse hover:animate-none">
                  Quero esse resultado na minha obra
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 6: ALERTA E-CAC COM CARROSSEL */}
      <section className="section-dark py-16 md:py-32 bg-[#020617] relative overflow-hidden">
        <div className="absolute inset-0 bg-red-600/5 blur-[120px] pointer-events-none"></div>
        <div className="container relative z-10">
          <div className="flex flex-col items-center text-center space-y-12">

            {/* Topo: Texto Centralizado */}
            <div className="max-w-3xl space-y-6 md:space-y-10 animate-fade-in-up flex flex-col items-center mb-8 md:mb-12">
              <div className="pill-badge border-red-500/30 text-red-400 bg-red-500/10">
                ALERTA VERMELHO
              </div>

              <h2 className="headline text-3xl sm:text-4xl lg:text-[3.5rem] text-white leading-tight">
                O que muita gente ainda não percebeu: hoje, a Receita Federal <span className="text-red-500 block">não envia mais cartas</span> pelos Correios.
              </h2>

              <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed">
                A notificação chega <strong className="text-red-400">silenciosa</strong> direto na sua caixa de mensagens do e-CAC.
              </p>

              <p className="text-lg text-yellow-500 font-medium italic border-l-2 border-yellow-500 pl-4 bg-yellow-500/5 py-4 max-w-2xl">
                "E fala a verdade… Quantas vezes você já entrou no e-CAC para conferir isso este mês?"
              </p>

              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t border-white/10">
                {[
                  "O dono não vê a notificação",
                  "Perde o prazo (30 dias)",
                  "Multa de 75% aplicada"
                ].map((text, i) => (
                  <div key={i} className="flex gap-3 items-center justify-center bg-white/5 p-4 rounded-xl border border-white/5">
                    <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 animate-pulse"></span>
                    <span className="text-white/90 font-bold text-sm uppercase tracking-wider">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Baixo: Carrossel de Prints (Estilo Seção 5) */}
            <div className="w-full max-w-[1400px] mx-auto relative group/parent overflow-hidden">
              <div
                ref={carousel3Ref}
                className="w-full overflow-x-auto no-scrollbar snap-x snap-mandatory lg:overflow-visible"
              >
                <div className="flex gap-4 md:gap-5 animate-scroll-right-desktop pause-on-hover w-max lg:w-max lg:snap-none py-10 px-4">
                  {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((item, idx) => (
                    <Dialog key={`${item}-${idx}`}>
                      <DialogTrigger asChild>
                        <div
                          className="w-[280px] sm:w-[300px] md:w-[310px] snap-center lg:snap-align-none cursor-pointer group/card"
                        >
                          <div className="glass-card p-2 hover:border-red-500/50 transition-all duration-500">
                            <div className="aspect-[9/16] bg-slate-900 rounded-[1.5rem] flex items-center justify-center relative overflow-hidden shadow-2xl">
                              <img
                                src={`/inss-de-obras/${item}.png`}
                                className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-500"
                                alt={`Alerta e-CAC ${item}`}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-[95vw] sm:max-w-4xl p-0 bg-black/90 border-white/10 overflow-hidden sm:rounded-2xl">
                        <div className="relative aspect-auto max-h-[90vh] flex items-center justify-center">
                          <img
                            src={`/inss-de-obras/${item}.png`}
                            className="max-w-full max-h-[90vh] object-contain"
                            alt="Alerta Ampliado"
                          />
                          <DialogTrigger asChild>
                            <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-md z-50">
                              <X className="w-6 h-6" />
                            </button>
                          </DialogTrigger>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              </div>

              {/* Setas de Controle - Apenas Mobile */}
              <div className="flex lg:hidden items-center justify-center gap-6 mt-2 relative z-30">
                <button
                  onClick={() => scrollManual(carousel3Ref, 'left')}
                  className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white active:scale-95 transition-transform"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => scrollManual(carousel3Ref, 'right')}
                  className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white active:scale-95 transition-transform"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Gradientes laterais Intensificados para Desktop - Loop infinito visual */}
              <div className="hidden lg:block absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-[#020617] via-[#020617]/80 to-transparent z-20 pointer-events-none"></div>
              <div className="hidden lg:block absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-[#020617] via-[#020617]/80 to-transparent z-20 pointer-events-none"></div>
            </div>
          </div>

          {/* BOTÃO ISOLADO E CENTRALIZADO NO BOTTOM */}
          <div className="w-full flex flex-col items-center justify-center pt-12 md:pt-20 px-4 relative z-20 text-center">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="w-full max-w-[340px] md:max-w-lg">
              <Button className="btn-primary w-full !whitespace-normal break-words transform hover:scale-105 shadow-[0_15px_40px_rgba(239,68,68,0.30)] bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white !px-8 py-5 md:py-6 h-auto">
                👉 Ver se minha obra está na mira
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* SEÇÃO 7: TUTORIAL E-CAC (PATTERN INTERRUPT LIGHT + SCROLL JACKING) */}
      <section className="bg-slate-50 relative text-slate-900 border-t border-slate-200">
        <div className="absolute inset-0 bg-white/50 backdrop-blur-3xl pointer-events-none z-0"></div>

        {/* Wrapper do Scroll Jacking com estilo inline responsivo (200vh no desktop, auto no mobile) */}
        <div ref={laptopRef} className="relative z-10" style={{ height: isDesktop ? "200vh" : "auto" }}>

          {/* O Elemento Fixado - Fica travado na tela graças ao position: sticky APENAS no desktop */}
          <div className="w-full flex justify-center py-12 md:py-0" style={isDesktop ? { position: "sticky", top: 0, height: "100vh", display: "flex", flexDirection: "column", alignItems: "center" } : {}}>

            <div className="container max-w-5xl mx-auto w-full px-4 md:px-6">
              {/* Títulos com espaçamento responsivo para caber em notebooks pequenos */}
              <div className="text-center space-y-4 md:space-y-6 mb-8 md:mb-10">
                <h2 className="headline text-[1.8rem] md:text-[2.2rem] lg:text-[2.5rem] xl:text-[3rem] text-slate-900 tracking-tight leading-tight px-4">
                  Quer saber se sua obra já está na mira da Receita? <span className="text-amber-500 block mt-1">Faça isso agora:</span>
                </h2>
                <div className="inline-flex items-center gap-2 md:gap-3 bg-amber-100 text-amber-700 px-5 md:px-6 py-2 md:py-3 rounded-full font-bold text-base md:text-lg lg:text-xl shadow-sm border border-amber-200 mt-2 md:mt-4">
                  <span className="bg-amber-500 text-white w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm">1</span>
                  Acesse o portal e-CAC e siga este passo a passo:
                </div>
              </div>

              {/* Container Mockups */}
              <div className="relative w-full flex justify-center items-center group" style={{ perspective: '1500px' }}>

                {/* ---------------------------------
                         MOCKUP DESKTOP (MacBook Style) Animado e Responsivo
                     ----------------------------------- */}
                <div
                  className="flex flex-col items-center w-full cursor-pointer transition-transform duration-700 hover:scale-[1.02]"
                  style={{ transformStyle: 'preserve-3d', maxWidth: 'min(800px, 95vw, 75vh)' }}
                  onClick={() => setIsTutorialPlaying(true)}
                >

                  {/* Tampa Superior (Tela) com Animação 3D de Abertura */}
                  <div
                    className="relative w-full aspect-[16/10] bg-slate-800 rounded-t-[1.5rem] border-[8px] md:border-[12px] border-slate-800 shadow-[0_-20px_50px_rgba(0,0,0,0.15)] overflow-hidden ring-1 ring-white/10 z-20"
                    style={{
                      transformOrigin: "bottom center",
                      // A tampa inicia levemente tombada para trás (-95deg) para dar o efeito que está fechada na base
                      transform: isDesktop ? `rotateX(${-95 + (laptopScrollProgress * 95)}deg)` : `rotateX(0deg)`,
                      transition: "transform 0.05s ease-out"
                    }}
                  >
                    {/* Notch / Camera */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-slate-900 rounded-b-xl flex items-center justify-center z-30 shadow-inner">
                      <div className="w-2 h-2 rounded-full bg-blue-900/50 flex flex-col items-center justify-center shadow-inner">
                        <div className="w-0.5 h-0.5 rounded-full bg-blue-400"></div>
                      </div>
                    </div>
                    
                    {/* Tela de Vídeo */}
                    <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center transition-colors z-10">
                      {isTutorialPlaying ? (
                         <div className="absolute inset-0 w-full h-full overflow-hidden">
                           <div className="absolute inset-0 scale-[1.001] origin-center">
                             <iframe 
                               src={`https://www.youtube.com/embed/dUrGldvhOdc?autoplay=1&modestbranding=1&rel=0&iv_load_policy=3&controls=0&disablekb=1&loop=1&playlist=dUrGldvhOdc`} 
                               className="w-full h-full pointer-events-none"
                               allow="autoplay; encrypted-media"
                             />
                           </div>
                           {/* Overlay to stop/close */}
                           <div 
                             className="absolute inset-0 z-20" 
                             onClick={(e) => { e.stopPropagation(); setIsTutorialPlaying(false); }}
                           ></div>
                         </div>
                      ) : (
                        <div className="w-full h-full relative flex flex-col items-center justify-center group/card">
                          <img 
                            src={`https://img.youtube.com/vi/dUrGldvhOdc/maxresdefault.jpg`} 
                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                            alt="Tutorial e-CAC"
                          />
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
                          <Play className="w-16 h-16 md:w-24 md:h-24 text-yellow-500 opacity-90 group-hover:opacity-100 group-hover:scale-[1.15] transition-all duration-300 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)] z-20" fill="currentColor" />
                          <p className="mt-4 md:mt-6 text-white/90 font-bold tracking-widest uppercase text-[10px] md:text-sm z-20 border-b border-white/20 pb-2">Assista ao Tutorial</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Base do Notebook com chanfro */}
                  <div className="w-[110%] h-4 md:h-6 bg-gradient-to-b from-slate-300 to-slate-400 rounded-b-2xl shadow-2xl flex justify-center z-10 relative">
                    <div className="w-1/4 h-1 md:h-2 bg-slate-500/30 rounded-b-md absolute top-0"></div>
                    <div className="absolute top-0 w-full h-[1px] bg-slate-200/50"></div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Textos Finais e CTA - Fluxo Normal Abaixo do Scroll Jacking */}
        <div className="container relative z-20 max-w-5xl mx-auto pb-24 md:pb-32">
          <div className="text-center space-y-6 md:space-y-8 mt-12 md:mt-24 px-4 animate-fade-in-up flex flex-col items-center">
            <h3 className="text-2xl sm:text-3xl md:text-[2.5rem] font-black text-slate-800 leading-tight">
              Se aparecer qualquer informação lá, <br className="hidden md:block" /><span className="text-red-600 bg-red-50 px-2 rounded-lg">não deixe para depois.</span>
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium">
              O tempo é o seu maior inimigo contra as multas.
            </p>
            <div className="pt-8 pb-4 flex justify-center w-full">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <Button className="btn-primary transform md:scale-110 shadow-[0_20px_50px_rgba(234,179,8,0.25)] flex items-center gap-3">
                  <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.711.927 3.142.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.761-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.666.598 1.236.771 1.409.858.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.031 22.086c-1.782 0-3.529-.46-5.06-1.332l-5.63 1.48 1.506-5.485c-.961-1.583-1.47-3.396-1.47-5.253 0-5.556 4.52-10.076 10.076-10.076 5.557 0 10.077 4.52 10.077 10.076s-4.52 10.076-10.076 10.076z" /></svg>
                  Me chama no WhatsApp agora
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 8: FECHAMENTO */}
      <section className="section-dark py-20 md:py-40 text-center relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888086425-d81bb19240f5?ixlib=rb-4.0.3')] bg-cover bg-center opacity-10 mix-blend-luminosity"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background"></div>
        <div className="container max-w-4xl relative z-10">
          <div className="space-y-8 animate-fade-in-up glass-card p-6 md:p-12 lg:p-20 bg-black/40 flex flex-col items-center">
            <h2 className="headline text-3xl sm:text-4xl lg:text-[3rem]">
              Não pague <span className="highlight-yellow">além do necessário</span> para o Governo.
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl font-light text-white/70 leading-relaxed max-w-3xl">
              Descobrir o erro tarde demais custa caro. Entenda a situação da sua obra hoje e evite multas abusivas.
            </p>
            <div className="pt-8">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <Button className="btn-primary text-sm sm:text-base py-5 px-8 md:px-12 shadow-[0_0_40px_rgba(234,179,8,0.3)] hover:shadow-[0_0_60px_rgba(234,179,8,0.5)] leading-tight">
                  Quero Falar com um <br className="sm:hidden" /> Especialista Agora
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-16 px-6">
        <div className="container max-w-5xl mx-auto flex flex-col items-center justify-center space-y-10">
          {/* Logo Central */}
          <div className="flex flex-col items-center">
            <img src="logo-pratice.png" alt="Prátice Group" className="h-[2.5rem] w-auto object-contain opacity-90 mb-6" />
            <p className="text-center text-[#94A3B8] text-sm md:text-base font-light max-w-2xl leading-relaxed">
              Grupo Prátice | Regularização de INSS de obras em todo o Brasil. Mais de R$ 10 milhões economizados para donos de obras.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-6">
            <a href="https://www.linkedin.com/in/paulo-robson-parente-linhares-8569a7b0/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://www.instagram.com/engpaulorobson/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="mailto:inssdeobra@engpaulorobson.com.br" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all">
              <Mail className="w-4 h-4" />
            </a>
            <a href="https://wa.me/5585987244624?text=Quero%20saber%20mais%20da%20regulariza%C3%A7%C3%A3o%20de%20INSS%20e%20receber%20meu%20diagn%C3%B3stico%20gratuito." target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all">
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>

          {/* Separator / Links / Security */}
          <div className="w-full border-t border-white/5 pt-10 flex flex-col items-center space-y-4">
            <div className="flex items-center gap-8 text-[#94A3B8] font-bold text-xs md:text-sm tracking-widest">
              <Link href="/politica-de-privacidade">
                <a className="hover:text-white transition-colors cursor-pointer">POLÍTICA DE PRIVACIDADE</a>
              </Link>
              <Link href="/termos-de-uso">
                <a className="hover:text-white transition-colors cursor-pointer">TERMOS DE USO</a>
              </Link>
            </div>

            <div className="flex items-center gap-2 text-yellow-500 pt-2">
              <ShieldCheck className="w-4 h-4" />
              <span className="font-bold text-xs tracking-widest">AMBIENTE SEGURO E VERIFICADO</span>
            </div>

            <p className="text-[#475569] text-xs font-mono tracking-wider pt-2">CNPJ: 22.610.998/0001-89</p>
          </div>

          {/* Copyright Row */}
          <div className="w-full flex flex-col md:flex-row items-center justify-between pt-16 gap-4">
            <p className="text-[#475569] text-[10px] md:text-xs font-bold tracking-widest uppercase text-center md:text-left">
              © 2026 PRÁTICE GROUP. TODOS OS DIREITOS RESERVADOS.
            </p>
            <a href="https://wa.me/5588996208778?text=Olá,%20vi%20o%20seu%20trabalho%20no%20site%20do%20Dr%20Paulo%20Robson,%20e%20gostaria%20de%20um%20orçamento%20pra%20mim!" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-white/10 bg-white/[0.02] rounded-full px-5 py-2.5 hover:bg-white/5 hover:border-yellow-500/30 transition-all cursor-pointer group">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 group-hover:animate-pulse"></span>
              <span className="text-[#64748B] group-hover:text-white text-[10px] md:text-xs font-bold tracking-widest transition-colors uppercase">DESENVOLVIDO POR DEV WILLIAM RIBEIRO</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Cookie Consent Banner */}
      {showCookieConsent && (
        <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-10 md:w-[400px] bg-slate-900/90 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[100] animate-fade-in-up">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-yellow-500/20 p-2 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-yellow-500" />
            </div>
            <button onClick={() => setShowCookieConsent(false)} className="text-white/40 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          <h4 className="text-white font-bold mb-2">Privacidade e Cookies</h4>
          <p className="text-white/60 text-sm leading-relaxed mb-6">
            Nós utilizamos cookies e outras tecnologias para melhorar sua experiência e oferecer conteúdos personalizados de acordo com a LGPD.
          </p>
          <div className="flex gap-4">
            <Button onClick={acceptCookies} className="btn-primary w-full text-xs font-black">ACEITAR TUDO</Button>
            <Link href="/politica-de-privacidade">
              <Button variant="ghost" className="text-white/40 hover:text-white text-xs font-bold">VER POLÍTICA</Button>
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
