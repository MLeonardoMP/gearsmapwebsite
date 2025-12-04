"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Brain, Map, BarChart, Globe2, Cog, Shield, User } from "lucide-react"
import Globe from "@/components/ui/globe"
import { FadeIn } from "@/components/ui/fade-in"
import { Counter } from "@/components/ui/counter"
import { useLanguage } from "@/lib/language-context"
import { TechIcons } from "@/components/tech-icons"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function HomePage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to send message")

      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      })
      
      setFormData({ name: "", email: "", phone: "", message: "" })
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

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

      {/* Tech Stack Section */}
      <section className="py-8 border-y border-white/5 bg-white/5 backdrop-blur-sm overflow-hidden">
        <div className="w-full">
          <FadeIn>
            <div className="text-center mb-8">
              <h2 className="text-xl lg:text-2xl font-bold font-sans text-foreground mb-2">{t.techStack.title}</h2>
              <p className="text-muted-foreground text-sm">{t.techStack.subtitle}</p>
            </div>
            
            <div className="flex flex-col gap-6">
              {/* Row 1: Web & Cloud */}
              <div className="relative flex overflow-hidden group" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
                <div className="flex shrink-0 gap-12 animate-marquee group-hover:[animation-play-state:paused] items-center">
                  {[
                    { icon: TechIcons.Python, label: "Python" },
                    { icon: TechIcons.React, label: "React" },
                    { icon: TechIcons.NextJS, label: "Next.js" },
                    { icon: TechIcons.TypeScript, label: "TypeScript" },
                    { icon: TechIcons.Tailwind, label: "Tailwind" },
                    { icon: TechIcons.AWS, label: "AWS" },
                    { icon: TechIcons.PostgreSQL, label: "PostgreSQL" },
                    { icon: TechIcons.Docker, label: "Docker" },
                    // Duplicate for infinite loop
                    { icon: TechIcons.Python, label: "Python" },
                    { icon: TechIcons.React, label: "React" },
                    { icon: TechIcons.NextJS, label: "Next.js" },
                    { icon: TechIcons.TypeScript, label: "TypeScript" },
                    { icon: TechIcons.Tailwind, label: "Tailwind" },
                    { icon: TechIcons.AWS, label: "AWS" },
                    { icon: TechIcons.PostgreSQL, label: "PostgreSQL" },
                    { icon: TechIcons.Docker, label: "Docker" },
                  ].map((tech, i) => (
                    <div key={i} className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors duration-300">
                      <tech.icon className="w-5 h-5" />
                      <span className="font-semibold text-sm">{tech.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 2: AI & GIS */}
              <div className="relative flex overflow-hidden group" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
                <div className="flex shrink-0 gap-12 animate-marquee-reverse group-hover:[animation-play-state:paused] items-center">
                  {[
                    { icon: TechIcons.Mapbox, label: "Mapbox" },
                    { icon: TechIcons.QGIS, label: "QGIS" },
                    { icon: TechIcons.LangChain, label: "LangChain" },
                    { icon: TechIcons.LangGraph, label: "LangGraph" },
                    { icon: TechIcons.LlamaIndex, label: "LlamaIndex" },
                    { icon: TechIcons.OpenAI, label: "OpenAI" },
                    { icon: TechIcons.HuggingFace, label: "Hugging Face" },
                    { icon: TechIcons.PyTorch, label: "PyTorch" },
                    { icon: TechIcons.TensorFlow, label: "TensorFlow" },
                    // Duplicate for infinite loop
                    { icon: TechIcons.Mapbox, label: "Mapbox" },
                    { icon: TechIcons.QGIS, label: "QGIS" },
                    { icon: TechIcons.LangChain, label: "LangChain" },
                    { icon: TechIcons.LangGraph, label: "LangGraph" },
                    { icon: TechIcons.LlamaIndex, label: "LlamaIndex" },
                    { icon: TechIcons.OpenAI, label: "OpenAI" },
                    { icon: TechIcons.HuggingFace, label: "Hugging Face" },
                    { icon: TechIcons.PyTorch, label: "PyTorch" },
                    { icon: TechIcons.TensorFlow, label: "TensorFlow" },
                  ].map((tech, i) => (
                    <div key={i} className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors duration-300">
                      <tech.icon className="w-5 h-5" />
                      <span className="font-semibold text-sm">{tech.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
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
                desc: t.portfolio.services.ai.desc,
                details: t.portfolio.services.ai.details
              },
              {
                icon: Map,
                title: t.portfolio.services.geoviewers.title,
                desc: t.portfolio.services.geoviewers.desc,
                details: t.portfolio.services.geoviewers.details
              },
              {
                icon: Globe2,
                title: t.portfolio.services.visualization.title,
                desc: t.portfolio.services.visualization.desc,
                details: t.portfolio.services.visualization.details
              },
              {
                icon: BarChart,
                title: t.portfolio.services.dashboards.title,
                desc: t.portfolio.services.dashboards.desc,
                details: t.portfolio.services.dashboards.details
              },
              {
                icon: Cog,
                title: t.portfolio.services.automation.title,
                desc: t.portfolio.services.automation.desc,
                details: t.portfolio.services.automation.details
              },
              {
                icon: Shield,
                title: t.portfolio.services.monitoring.title,
                desc: t.portfolio.services.monitoring.desc,
                details: t.portfolio.services.monitoring.details
              }
            ].map((service, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="glass-card rounded-xl p-8 h-full hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden cursor-pointer">
                      {/* Background Gradient */}
                      <div className="absolute inset-0 bg-linear-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Large Watermark Icon */}
                      <service.icon className="absolute -bottom-4 -right-4 w-32 h-32 text-accent/5 group-hover:text-accent/10 transition-colors duration-500 -rotate-12" />

                      <div className="relative z-10">
                          <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                            <service.icon className="w-7 h-7 text-accent" />
                          </div>
                          
                          <h3 className="text-2xl font-bold font-sans text-foreground mb-3 group-hover:text-accent transition-colors">
                            {service.title}
                          </h3>
                          
                          <p className="text-muted-foreground text-base leading-relaxed mb-6">
                            {service.desc}
                          </p>

                          <div className="flex items-center text-accent font-medium text-sm opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                            <span>{t.common.learnMore}</span>
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </div>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px] border-accent/20 bg-background/95 backdrop-blur-xl">
                    <DialogHeader>
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                        <service.icon className="w-6 h-6 text-accent" />
                      </div>
                      <DialogTitle className="text-2xl font-bold text-foreground">{service.title}</DialogTitle>
                      <DialogDescription className="text-lg pt-2 text-muted-foreground">
                        {service.desc}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-foreground/80 leading-relaxed">
                        {service.details}
                      </p>
                    </div>
                    <div className="flex justify-end pt-4">
                      <Button asChild className="bg-accent hover:bg-accent/90 text-white">
                        <a href="#contact">{t.nav.contact}</a>
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </FadeIn>
            ))}
          </div>

          {/* Featured Projects */}
          <div className="mt-32">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold font-sans text-foreground mb-4">{t.gallery.title}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t.gallery.subtitle}</p>
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: t.gallery.project1.title, desc: t.gallery.project1.desc, color: "bg-blue-500/20", tags: ["React", "Mapbox", "Node.js"], link: "https://acggp.gearsmap.com/", image: "/images/acggp_visor.png" },
                { title: t.gallery.project2.title, desc: t.gallery.project2.desc, color: "bg-green-500/20", tags: ["Python", "Satellite", "AI"] },
                { title: t.gallery.project3.title, desc: t.gallery.project3.desc, color: "bg-purple-500/20", tags: ["IoT", "Real-time", "Dashboard"] },
              ].map((project, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <a 
                    href={project.link || "#"} 
                    target={project.link ? "_blank" : "_self"}
                    rel={project.link ? "noopener noreferrer" : ""}
                    className="block h-full"
                  >
                    <div className="group relative overflow-hidden rounded-2xl glass-card hover:border-accent/50 transition-all cursor-pointer h-full flex flex-col">
                      {/* Mockup Area */}
                      <div className={`relative h-48 ${project.color} overflow-hidden`}>
                          <div className="absolute inset-0 bg-linear-to-t from-background to-transparent opacity-20" />
                          
                          {project.image ? (
                            <img 
                              src={project.image} 
                              alt={project.title}
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          ) : (
                            /* Abstract UI shapes */
                            <div className="absolute top-8 left-8 right-8 bottom-0 bg-background/40 backdrop-blur-sm rounded-t-lg border border-white/20 shadow-2xl transform translate-y-4 group-hover:translate-y-2 transition-transform duration-500">
                                <div className="flex gap-2 p-3 border-b border-white/10">
                                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                                </div>
                                <div className="p-4 space-y-2">
                                    <div className="h-2 w-3/4 bg-white/10 rounded" />
                                    <div className="h-2 w-1/2 bg-white/10 rounded" />
                                    <div className="grid grid-cols-2 gap-2 mt-4">
                                        <div className="h-16 bg-white/5 rounded" />
                                        <div className="h-16 bg-white/5 rounded" />
                                    </div>
                                </div>
                            </div>
                          )}
                      </div>

                      {/* Content Area */}
                      <div className="p-6 flex-1 flex flex-col">
                          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
                          <p className="text-sm text-muted-foreground mb-4 flex-1">{project.desc}</p>
                          
                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mt-auto">
                              {project.tags.map(tag => (
                                  <span key={tag} className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
                                      {tag}
                                  </span>
                              ))}
                          </div>
                      </div>
                    </div>
                  </a>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="nosotros" className="px-6 lg:px-12 py-20 lg:py-32 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <FadeIn>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <span>{t.nav.home}</span>
                  <ArrowRight className="w-4 h-4" />
                  <span className="text-accent">{t.nav.about}</span>
                </div>
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

          {/* Team Section */}
          <div className="mt-20">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold font-sans text-foreground mb-4">{t.team.title}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t.team.subtitle}</p>
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { role: t.team.role1, name: "Alex Morgan" },
                { role: t.team.role2, name: "Sarah Chen" },
                { role: t.team.role3, name: "David Kim" },
              ].map((member, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="glass-card p-6 rounded-xl text-center hover:-translate-y-2 transition-transform duration-300">
                    <div className="w-24 h-24 mx-auto bg-accent/10 rounded-full flex items-center justify-center mb-4">
                      <User className="w-10 h-10 text-accent" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
                    <p className="text-sm text-accent font-medium mb-4">{member.role}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
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

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      {t.contact.form.name}
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
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
                      value={formData.phone}
                      onChange={handleChange}
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
                    value={formData.email}
                    onChange={handleChange}
                    required
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
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder={t.contact.form.messagePlaceholder}
                    className="w-full px-4 py-3 bg-background/50 border border-white/10 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none transition-all"
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium h-12 text-lg shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : t.contact.form.submit}
                </Button>
              </form>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
