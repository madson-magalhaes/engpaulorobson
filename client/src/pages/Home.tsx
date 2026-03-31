import { Button } from "@/components/ui/button";
import { ChevronRight, CheckCircle, AlertCircle, Play } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Landing Page INSS - Redução de INSS de Obras
 * Design: Lovable + Anti-Gravity do Google
 * Tipografia: Kanit
 * Paleta: Escuro (#1a1a2e) + Amarelo (#FFD700) + Verde Neon (#00FF41)
 */

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Header Fixo */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center border-2 border-dashed border-secondary">
              <span className="text-background font-bold text-lg">P</span>
            </div>
            <span className="font-bold text-xl hidden sm:inline">Eng. Paulo Robson</span>
          </div>
          <nav className="hidden md:flex gap-8 items-center">
            <a href="#mercado" className="hover:text-primary transition">O Mercado</a>
            <a href="#historia" className="hover:text-primary transition">História</a>
            <a href="#diferenciais" className="hover:text-primary transition">Diferenciais</a>
            <Button className="btn-primary">Quero Descobrir</Button>
          </nav>
        </div>
      </header>

      {/* SEÇÃO 1: HERO/GANCHO */}
      <section className="section-dark pt-40 pb-20 relative overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in-up">
              <div className="inline-block px-4 py-2 bg-secondary/20 border border-secondary rounded-full">
                <span className="text-secondary text-sm font-bold">🎯 OPORTUNIDADE DE ECONOMIA</span>
              </div>
              <h1 className="headline">
                Tem obra economizando mais de <span className="highlight-yellow">R$ 50 mil</span> — sem mudar nada no projeto.
              </h1>
              <p className="subheadline">
                Você já sabe quanto pode economizar no imposto da CND do INSS de obras?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button className="btn-primary">Quero Descobrir agora</Button>
                <Button variant="outline" className="px-8 py-4 border-2 border-secondary text-secondary hover:bg-secondary/10">
                  Mais informações
                </Button>
              </div>
            </div>
            <div className="relative h-96 lg:h-full min-h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl border-2 border-dashed border-secondary flex items-center justify-center animate-fade-in">
              <div className="text-center">
                <div className="text-6xl mb-4">🏗️</div>
                <p className="text-muted">Imagem: Engenheiro Paulo Robson</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 2: QUEBRA DE REALIDADE */}
      <section className="section-dark py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 bg-gradient-to-br from-destructive/20 to-muted/20 rounded-xl border-2 border-dashed border-destructive flex items-center justify-center animate-fade-in">
              <div className="text-center">
                <div className="text-6xl mb-4">❓</div>
                <p className="text-muted">Ilustração: Confusão/Problema</p>
              </div>
            </div>
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="headline">
                A maioria dos donos de obra <span className="highlight-yellow">não faz ideia</span> de como o INSS da obra é calculado.
              </h2>
              <div className="space-y-4">
                <p className="text-lg leading-relaxed">
                  E por isso, recebem uma guia de cobrança e acabam pagando valores muito acima do necessário — sem questionar, sem perceber.
                </p>
                <p className="text-lg leading-relaxed">
                  O valor do INSS da obra não é fixo. Ele depende diretamente de como a sua obra é apresentada à prefeitura, enquadrada no alvará e informada no CNO.
                </p>
              </div>
              <Button className="btn-primary">Descobrir quanto posso economizar</Button>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 3: ONDE ESTÁ A ECONOMIA - DESTAQUE BRANCO */}
      <section className="bg-white text-background py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="headline text-background">
                É exatamente aí que surgem as <span className="text-primary">melhores oportunidades</span> de economia.
              </h2>
              <div className="space-y-4">
                <p className="text-lg leading-relaxed text-background/80">
                  Obras muito idênticas podem ter valores de impostos completamente diferentes — dependendo apenas de como o processo de regularização é conduzido.
                </p>
                <div className="bg-primary/10 border-l-4 border-primary p-6 rounded">
                  <p className="text-2xl font-bold text-primary">R$ 13 Mil por 4x R$ 160,00</p>
                  <p className="text-sm text-background/60 mt-2">usando a minha estratégia</p>
                </div>
                <p className="text-lg leading-relaxed text-background/80">
                  E o mais importante: Isso não depende de trocar material, alterar o projeto ou mexer na estrutura. O resultado vem da inteligência aplicada na forma como a obra é analisada e informada à Receita Federal.
                </p>
              </div>
              <Button className="btn-primary">Quero meu diagnóstico gratuito</Button>
            </div>
            <div className="relative h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl border-2 border-dashed border-primary flex items-center justify-center animate-fade-in">
              <div className="text-center">
                <div className="text-6xl mb-4">📊</div>
                <p className="text-background/60">Gráfico: Comparativo Antes/Depois</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 4: AUTORIDADE */}
      <section className="section-dark py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="headline">
                O Engenheiro Paulo Robson é hoje a <span className="highlight-yellow">maior referência</span> do país em regularização técnica de INSS de obra.
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                  <p className="text-lg">Já gerou mais de R$ 10 milhões em economia para donos de obras em todo o Brasil.</p>
                </div>
                <div className="flex gap-4 items-start">
                  <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                  <p className="text-lg">Atua diretamente do lado do governo como coordenador licenciamento de obras, justamente onde nasce a cobrança.</p>
                </div>
                <div className="flex gap-4 items-start">
                  <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                  <p className="text-lg">Conhecendo os dois lados da moeda, sabe exatamente onde mora os maiores erros de engenheiros, arquitetos, contadores e das próprias prefeituras.</p>
                </div>
              </div>
              <Button className="btn-primary">Falar com o especialista</Button>
            </div>
            <div className="relative h-96 lg:h-full min-h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl border-2 border-dashed border-secondary flex items-center justify-center animate-fade-in">
              <div className="text-center">
                <div className="text-6xl mb-4">👨‍💼</div>
                <p className="text-muted">Foto: Eng. Paulo Robson</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 5: PROVA SOCIAL - DESTAQUE BRANCO */}
      <section className="bg-white text-background py-20">
        <div className="container">
          <div className="space-y-12">
            <div className="text-center space-y-4 animate-fade-in-up">
              <h2 className="headline text-background">
                Veja na prática o que já está acontecendo em outras obras:
              </h2>
              <p className="text-lg text-background/80">
                Depoimentos de clientes satisfeitos • Comparativos de "Antes e Depois" • Resultados reais documentados
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="bg-background/5 border-2 border-dashed border-primary p-6 rounded-xl hover:shadow-lg transition-all duration-300 animate-fade-in"
                >
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center mb-4 border border-primary/30">
                    <Play className="w-12 h-12 text-primary" />
                  </div>
                  <p className="font-bold text-background mb-2">Depoimento {item}</p>
                  <p className="text-sm text-background/60">Cliente satisfeito compartilhando seus resultados</p>
                </div>
              ))}
            </div>

            <div className="text-center space-y-4">
              <p className="text-lg text-background/80">
                Não é teoria. São casos reais de donos de obra que pagariam muito mais sem o nosso acompanhamento.
              </p>
              <Button className="btn-primary">Quero esse resultado</Button>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 6: ALERTA (e-CAC + MULTA) */}
      <section className="section-dark py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 bg-gradient-to-br from-destructive/20 to-muted/20 rounded-xl border-2 border-dashed border-destructive flex items-center justify-center animate-fade-in">
              <div className="text-center">
                <div className="text-6xl mb-4">⚠️</div>
                <p className="text-muted">Screenshots: Notificações e-CAC</p>
              </div>
            </div>
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="headline">
                O que muita gente ainda não percebeu: hoje, a Receita Federal não envia mais cartas pelos Correios. A notificação chega <span className="highlight-yellow">silenciosa</span> direto na sua caixa de mensagens do e-CAC.
              </h2>
              <p className="text-lg leading-relaxed">
                E fala a verdade… Quantas vezes você já entrou no e-CAC para conferir isso este mês?
              </p>
              <div className="space-y-3 bg-destructive/10 p-6 rounded-lg border-l-4 border-destructive">
                <div className="flex gap-3 items-start">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-1" />
                  <p className="text-lg">O dono da obra não vê a notificação;</p>
                </div>
                <div className="flex gap-3 items-start">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-1" />
                  <p className="text-lg">Perde o prazo de regularização (geralmente de apenas 30 dias);</p>
                </div>
                <div className="flex gap-3 items-start">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-1" />
                  <p className="text-lg">A multa de no mínimo 75% é aplicada automaticamente.</p>
                </div>
              </div>
              <p className="text-lg leading-relaxed">
                Em até 4 anos e meio, a Receita pode cobrar o valor cheio do INSS com multa e juros pesados.
              </p>
              <Button className="btn-primary">Ver se minha obra está na mira</Button>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 7: COMO VERIFICAR - DESTAQUE BRANCO */}
      <section className="bg-white text-background py-20">
        <div className="container">
          <div className="space-y-12">
            <div className="text-center space-y-4 animate-fade-in-up">
              <h2 className="headline text-background">
                Quer saber se sua obra já está na mira da Receita? <span className="text-primary">Faça isso agora:</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-background rounded-full flex items-center justify-center font-bold text-xl">
                    1
                  </div>
                  <div>
                    <p className="text-lg font-bold">Acesse o portal e-CAC</p>
                    <p className="text-background/60">Siga este passo a passo</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-background rounded-full flex items-center justify-center font-bold text-xl">
                    2
                  </div>
                  <div>
                    <p className="text-lg font-bold">Procure por notificações</p>
                    <p className="text-background/60">Verifique se há multas ou cobranças</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-background rounded-full flex items-center justify-center font-bold text-xl">
                    3
                  </div>
                  <div>
                    <p className="text-lg font-bold">Se aparecer informação, não deixe para depois</p>
                    <p className="text-background/60">O tempo é o seu maior inimigo contra as multas</p>
                  </div>
                </div>
              </div>

              <div className="relative h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl border-2 border-dashed border-primary flex items-center justify-center animate-fade-in">
                <div className="text-center">
                  <Play className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-background/60">Vídeo: Passo a Passo e-CAC</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button className="btn-primary">Me chama no WhatsApp agora</Button>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 8: FECHAMENTO */}
      <section className="section-dark py-20 text-center">
        <div className="container max-w-2xl">
          <div className="space-y-8 animate-fade-in-up">
            <h2 className="headline">
              O problema não é o INSS da obra. É pagar <span className="highlight-yellow">além do necessário</span> — ou descobrir o erro tarde demais.
            </h2>
            <p className="text-xl leading-relaxed text-muted">
              Quanto antes você entende a situação real da sua obra, maiores são as chances de gerar uma economia de mais de 70% e evitar multas desnecessárias.
            </p>
            <Button className="btn-primary mx-auto">Fale com o especialista</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background/50 border-t border-secondary/30 py-8">
        <div className="container text-center text-muted text-sm">
          <p>© Copyright 2026 • Eng Paulo Robson • Todos os direitos reservados!</p>
        </div>
      </footer>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-pulse-light {
          animation: pulse 2s ease-in-out infinite;
        }

        button.btn-primary {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        button.btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(255, 215, 0, 0.3);
        }

        button.btn-primary:active {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}
