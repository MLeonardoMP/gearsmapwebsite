"use client"

"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Brain, Map, BarChart, Globe2, Cog, Shield } from "lucide-react"
import Globe from "@/components/ui/globe"
import { FadeIn } from "@/components/ui/fade-in"
import { Counter } from "@/components/ui/counter"
import { useLanguage } from "@/lib/language-context"

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section */}
      <section id="inicio" className="relative px-6 lg:px-12 pt-32 pb-20 lg:pt-40 lg:pb-32">
        {/* Background Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <FadeIn delay={0.1}>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20 backdrop-blur-sm">
                  <Zap className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-accent">{t.hero.badge}</span>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="space-y-6">
                  <h1 className="text-4xl lg:text-6xl font-extrabold font-sans leading-tight tracking-tight">
                    {t.hero.subtitle} <span className="text-accent">{t.hero.title}</span>
                    <span className="text-foreground">?</span>
                  </h1>

                  <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
                    <p>{t.hero.description1}</p>
                    <p>
                      {t.hero.description2}
                    </p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium transition-transform hover:scale-105">
                    {t.hero.cta_primary}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button variant="outline" size="lg" className="border-border hover:bg-accent/5 bg-transparent transition-transform hover:scale-105">
                    {t.hero.cta_secondary}
                  </Button>
                </div>
              </FadeIn>

              {/* Stats */}
              <FadeIn delay={0.4} className="flex gap-8 pt-8 border-t border-border/50">
                <div>
                  <div className="text-2xl font-bold text-accent font-sans flex items-center">
                    <Counter value={500} />+
                  </div>
                  <div className="text-sm text-muted-foreground">{t.hero.stats.projects}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent font-sans flex items-center">
                    <Counter value={98} />%
                  </div>
                  <div className="text-sm text-muted-foreground">{t.hero.stats.satisfaction}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent font-sans">24/7</div>
                  <div className="text-sm text-muted-foreground">{t.hero.stats.support}</div>
                </div>
              </FadeIn>
            </div>

            <FadeIn direction="left" delay={0.2} className="relative">
              <div className="relative w-full h-96 lg:h-[500px] flex items-center justify-center">
                {/* Background glow effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full bg-linear-to-br from-accent/20 to-accent/5 blur-3xl animate-pulse"></div>
                </div>

                {/* Magic UI Globe */}
                <div className="relative z-10 w-full h-full max-w-[500px] max-h-[500px]">
                  <Globe
                    className="opacity-80"
                    config={{
                      width: 800,
                      height: 600,
                      onRender: () => {},
                      devicePixelRatio: 2,
                      phi: 0,
                      theta: 0.3,
                      dark: 1,
                      diffuse: 0.4,
                      mapSamples: 16000,
                      mapBrightness: 1.2,
                      baseColor: [0.18, 0.69, 0.76], // #2EB1C3 base color
                      markerColor: [0.3, 0.8, 0.9], // Brighter teal for markers
                      glowColor: [0.18, 0.69, 0.76], // #2EB1C3 glow
                      markers: [
                        { location: [40.7128, -74.006], size: 0.08 }, // New York
                        { location: [51.5074, -0.1278], size: 0.08 }, // London
                        { location: [35.6762, 139.6503], size: 0.08 }, // Tokyo
                        { location: [-33.8688, 151.2093], size: 0.06 }, // Sydney
                        { location: [19.4326, -99.1332], size: 0.07 }, // Mexico City
                        { location: [-23.5505, -46.6333], size: 0.07 }, // São Paulo
                        { location: [55.7558, 37.6176], size: 0.06 }, // Moscow
                        { location: [28.6139, 77.209], size: 0.07 }, // New Delhi
                      ],
                    }}
                  />
                </div>

                {/* Floating data cards */}
                <div className="absolute top-4 left-4 glass-card rounded-lg p-3 animate-float z-20">
                  <div className="text-xs text-muted-foreground">{t.hero.floating.revenue}</div>
                  <div className="text-lg font-bold text-accent font-sans">+127%</div>
                </div>

                <div className="absolute bottom-8 right-8 glass-card rounded-lg p-3 animate-float delay-1000 z-20">
                  <div className="text-xs text-muted-foreground">{t.hero.floating.data}</div>
                  <div className="text-lg font-bold text-accent font-sans">2.4M</div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section id="nosotros" className="px-6 lg:px-12 py-20 lg:py-32 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <FadeIn>
                <h2 className="text-3xl lg:text-5xl font-bold font-sans text-foreground">{t.about.title}</h2>
              </FadeIn>

              <div className="space-y-6">
                <FadeIn delay={0.1}>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {t.about.intro}
                  </p>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <div className="glass-card p-6 rounded-xl space-y-4">
                    <h3 className="text-xl font-bold font-sans text-foreground">{t.about.foundation.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {t.about.foundation.text}
                    </p>
                  </div>
                </FadeIn>

                <FadeIn delay={0.3}>
                  <div className="glass-card p-6 rounded-xl space-y-4">
                    <h3 className="text-xl font-bold font-sans text-foreground">{t.about.products.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {t.about.products.text}
                    </p>
                  </div>
                </FadeIn>
              </div>
            </div>

            {/* Right Image */}
            <FadeIn direction="left" delay={0.2} className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                <img
                  src="/images/agm2.jpg"
                  alt="GearsMap team working with data visualization"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent"></div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 lg:py-32 relative overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full overflow-hidden pointer-events-none z-0">
           <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] bg-accent/5 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Image */}
            <FadeIn direction="right" className="relative order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                <img 
                  src="/images/agm1.jpg" 
                  alt="GearsMap team collaboration" 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent"></div>
              </div>
            </FadeIn>

            {/* Right Content */}
            <div className="space-y-8 order-1 lg:order-2">
              <FadeIn>
                <h2 className="text-3xl lg:text-5xl font-bold font-sans text-foreground">{t.mission.title}</h2>
              </FadeIn>

              <div className="space-y-6">
                <FadeIn delay={0.1}>
                  <div className="glass-card p-6 rounded-xl space-y-4 border-l-4 border-l-accent">
                    <h3 className="text-xl font-bold font-sans text-foreground">{t.mission.mission.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t.mission.mission.text}
                    </p>
                  </div>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <div className="glass-card p-6 rounded-xl space-y-4 border-l-4 border-l-blue-500">
                    <h3 className="text-xl font-bold font-sans text-foreground">{t.mission.vision.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t.mission.vision.text}
                    </p>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="portafolio" className="px-6 lg:px-12 py-20 lg:py-32 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <FadeIn className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
              <span>{t.nav.home}</span>
              <ArrowRight className="w-4 h-4" />
              <span className="text-accent">{t.nav.portfolio}</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold font-sans text-foreground mb-4">{t.portfolio.header}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.portfolio.subheader}
            </p>
          </FadeIn>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: t.portfolio.services.ai.title,
                desc: t.portfolio.services.ai.desc
              },
              {
                icon: Map,
                title: t.portfolio.services.geoviewers.title,
                desc: t.portfolio.services.geoviewers.desc
              },
              {
                icon: Globe2,
                title: t.portfolio.services.visualization.title,
                desc: t.portfolio.services.visualization.desc
              },
              {
                icon: BarChart,
                title: t.portfolio.services.dashboards.title,
                desc: t.portfolio.services.dashboards.desc
              },
              {
                icon: Cog,
                title: t.portfolio.services.automation.title,
                desc: t.portfolio.services.automation.desc
              },
              {
                icon: Shield,
                title: t.portfolio.services.monitoring.title,
                desc: t.portfolio.services.monitoring.desc
              }
            ].map((service, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="glass-card rounded-xl p-6 h-full hover:-translate-y-2 transition-transform duration-300 group">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <service.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold font-sans text-foreground mb-3 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="px-6 lg:px-12 py-20 lg:py-32 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <FadeIn className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
              <span>{t.nav.home}</span>
              <ArrowRight className="w-4 h-4" />
              <span className="text-accent">{t.nav.contact}</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold font-sans text-foreground mb-4">{t.contact.header}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.contact.subheader}
            </p>
          </FadeIn>

          {/* Contact Form */}
          <FadeIn delay={0.2} className="max-w-2xl mx-auto">
            <div className="glass-card rounded-2xl p-8 md:p-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold font-sans text-foreground mb-2">{t.contact.form.title}</h3>
                <p className="text-muted-foreground">
                  {t.contact.form.subtitle}
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      {t.contact.form.name}
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder={t.contact.form.namePlaceholder}
                      className="w-full px-4 py-3 bg-background/50 border border-white/10 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      {t.contact.form.phone}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder={t.contact.form.phonePlaceholder}
                      className="w-full px-4 py-3 bg-background/50 border border-white/10 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    {t.contact.form.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder={t.contact.form.emailPlaceholder}
                    className="w-full px-4 py-3 bg-background/50 border border-white/10 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    {t.contact.form.message}
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder={t.contact.form.messagePlaceholder}
                    className="w-full px-4 py-3 bg-background/50 border border-white/10 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none transition-all"
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium h-12 text-lg shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all hover:-translate-y-1"
                >
                  {t.contact.form.submit}
                </Button>
              </form>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
