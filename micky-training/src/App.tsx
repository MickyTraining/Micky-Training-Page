/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  Volume2,
  VolumeX,
  Dumbbell, 
  CheckCircle2, 
  Users, 
  Calendar, 
  ArrowRight, 
  Instagram, 
  Facebook,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  ChevronDown,
  Star,
  Zap,
  Target,
  Hand,
  Globe,
  Menu,
  X
} from "lucide-react";
import React, { useState, useRef } from "react";
import heroVideo from "./hero-video.mp4";
import { translations, Language } from "./translations";
import { LogoText } from "./components/LogoText";

export default function App() {
  const [lang, setLang] = useState<Language>('es');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[lang];
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const targetId = id.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (!element) return;

    setIsMenuOpen(false);
    
    // Use a delay to ensure the menu closing doesn't interfere with scroll calculation
    setTimeout(() => {
      const isMobile = window.innerWidth < 768;
      const headerHeight = isMobile ? 128 : 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Update URL hash without jumping
      window.history.pushState(null, '', `#${targetId}`);
    }, 150);
  };

  // Close menu on resize to desktop
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const nombre = formData.get('nombre');
    const email = formData.get('email');
    const telefono_cliente = formData.get('telefono_cliente');
    const objetivo = formData.get('objetivo');
    const mensaje = formData.get('mensaje');
    
    try {
      // 1. Enviar a Formspree (para registro por email)
      const response = await fetch("https://formspree.io/f/xaqllakk", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        // Detectar si es móvil
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
        if (isMobile) {
          // 2. Si es móvil, abrir WhatsApp en una nueva ventana/pestaña para evitar bloqueos de iframe
          const textoWhatsApp = `¡Hola Micky! 👋%0A%0AHe visto la web de Micky Training y me gustaría empezar:%0A%0A👤 *Nombre:* ${nombre}%0A📧 *Email:* ${email}%0A📞 *Teléfono:* ${telefono_cliente}%0A🎯 *Objetivo:* ${objetivo}${mensaje ? `%0A💬 *Mensaje:* ${mensaje}` : ''}`;
          const telefono_momentum = "34616423016";
          const finalUrl = `https://wa.me/${telefono_momentum}?text=${textoWhatsApp}`;
          
          // Usamos window.open para evitar el error "rechazó la conexión" en iframes
          window.open(finalUrl, '_blank');
        }
        
        // En ambos casos (PC y Móvil) mostramos el mensaje de éxito en la web
        setFormSubmitted(true);
      } else {
        alert(t.contact.form.errorFormspree);
      }
    } catch (error) {
      alert(t.contact.form.errorConnection);
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    {
      title: t.services.items[0].title,
      description: t.services.items[0].description,
      icon: <Users className="w-6 h-6" />,
      price: t.services.items[0].price
    },
    {
      title: t.services.items[1].title,
      description: t.services.items[1].description,
      icon: <Zap className="w-6 h-6" />,
      price: t.services.items[1].price
    },
    {
      title: t.services.items[2].title,
      description: t.services.items[2].description,
      icon: <Target className="w-6 h-6" />,
      price: t.services.items[2].price
    },
    {
      title: t.services.items[3].title,
      description: t.services.items[3].description,
      icon: <Hand className="w-6 h-6" />,
      price: t.services.items[3].price
    }
  ];

  const stats = [
    { label: t.stats.transformed, value: "+50" },
    { label: t.stats.lost, value: "200kg+" },
    { label: t.stats.exp, value: "10+" },
    { label: t.stats.certs, value: "3" }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-red-500/30 selection:text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-zinc-950/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-0 group cursor-pointer shrink-0" translate="no">
              <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
                <div className="absolute inset-0 border-4 border-red-600 rounded-xl rotate-45 group-hover:rotate-90 transition-transform duration-500"></div>
                <div className="absolute inset-0 border-2 border-white/20 rounded-xl rotate-12"></div>
                <span className="text-[14px] font-black text-white tracking-tighter z-10">MTC</span>
              </div>
              <div className="flex flex-col leading-none min-w-max">
                <LogoText className="h-16 w-auto" />
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-4">
              {/* Language Dropdown (Desktop) */}
              <div className="relative">
                <button 
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-2 text-sm font-bold text-white bg-zinc-900/50 border border-white/10 px-3 py-1.5 rounded-lg hover:bg-zinc-800 transition-all"
                >
                  <Globe className="w-3.5 h-3.5 text-red-500" />
                  <span>{lang.toUpperCase()}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
                </button>

                {isLangOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsLangOpen(false)}
                    />
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="absolute right-0 mt-2 w-32 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
                    >
                      {[
                        { id: 'es', label: 'Español' },
                        { id: 'ca', label: 'Català' },
                        { id: 'en', label: 'English' },
                        { id: 'de', label: 'Deutsch' },
                        { id: 'pl', label: 'Polski' },
                        { id: 'pt', label: 'Português' }
                      ].map((l) => (
                        <button
                          key={l.id}
                          onClick={() => {
                            setLang(l.id as any);
                            setIsLangOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-xs font-medium transition-colors hover:bg-red-600 hover:text-white ${
                            lang === l.id ? 'bg-red-600/10 text-red-500' : 'text-zinc-400'
                          }`}
                        >
                          {l.label}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </div>
              
              <div className="flex items-center gap-8 text-sm font-medium text-zinc-400 border-l border-white/10 pl-4">
                <a 
                  href="#servicios" 
                  onClick={(e) => scrollToSection(e, '#servicios')}
                  className="hover:text-red-500 transition-colors"
                >
                  {t.nav.services}
                </a>
                <a 
                  href="#sobre-mi" 
                  onClick={(e) => scrollToSection(e, '#sobre-mi')}
                  className="hover:text-red-500 transition-colors"
                >
                  {t.nav.about}
                </a>
                <a 
                  href="#testimonios" 
                  onClick={(e) => scrollToSection(e, '#testimonios')}
                  className="hover:text-red-500 transition-colors"
                >
                  {t.nav.testimonials}
                </a>
                <a 
                  href="#contacto" 
                  onClick={(e) => scrollToSection(e, '#contacto')}
                  className="bg-red-600 text-white px-6 py-2.5 rounded-full hover:bg-red-700 transition-all shadow-lg shadow-red-900/20"
                >
                  {t.nav.cta}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Controls Bar (Below Logo) */}
        <div className="md:hidden border-t border-white/5 bg-zinc-900/30">
          <div className="max-w-7xl mx-auto px-4 h-12 flex justify-between items-center">
            {/* Language Dropdown (Mobile) */}
            <div className="relative">
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 text-[10px] font-bold text-white bg-zinc-900/50 border border-white/10 px-2 py-1.5 rounded-lg hover:bg-zinc-800 transition-all"
              >
                <Globe className="w-3 h-3 text-red-500" />
                <span>{lang.toUpperCase()}</span>
                <ChevronDown className={`w-2.5 h-2.5 transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsLangOpen(false)}
                  />
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute left-0 mt-2 w-32 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
                  >
                    {[
                      { id: 'es', label: 'Español' },
                      { id: 'ca', label: 'Català' },
                      { id: 'en', label: 'English' },
                      { id: 'de', label: 'Deutsch' },
                      { id: 'pl', label: 'Polski' },
                      { id: 'pt', label: 'Português' }
                    ].map((l) => (
                      <button
                        key={l.id}
                        onClick={() => {
                          setLang(l.id as any);
                          setIsLangOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs font-medium transition-colors hover:bg-red-600 hover:text-white ${
                          lang === l.id ? 'bg-red-600/10 text-red-500' : 'text-zinc-400'
                        }`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="p-2 text-white hover:bg-white/5 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "circOut" }}
              className="md:hidden bg-zinc-950 border-t border-white/5 overflow-hidden"
            >
              <div className="px-4 py-8 space-y-6">
                {[
                  { href: "#servicios", label: t.nav.services },
                  { href: "#sobre-mi", label: t.nav.about },
                  { href: "#testimonios", label: t.nav.testimonials },
                ].map((link) => (
                  <a 
                    key={link.href}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="block w-full text-left text-sm font-medium text-zinc-400 hover:text-red-500 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <a 
                  href="#contacto"
                  onClick={(e) => scrollToSection(e, '#contacto')}
                  className="block w-full text-center bg-red-600 text-white py-2.5 rounded-full text-sm font-medium hover:bg-red-700 transition-all shadow-lg shadow-red-900/20"
                >
                  {t.nav.cta}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-zinc-950">
        {/* Video Container */}
        <div className="relative w-full h-[60vh] sm:h-[70vh] min-h-[400px] sm:min-h-[500px]">
          <motion.video 
            ref={videoRef}
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            autoPlay 
            muted={isMuted}
            loop 
            playsInline 
            className="w-full h-full object-cover brightness-[0.85] contrast-[1.05] saturate-[1.05]"
          >
            <source src={heroVideo} type="video/mp4" />
          </motion.video>

          {/* Volume Toggle Button */}
          <button 
            onClick={toggleMute}
            className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 p-3 sm:p-4 rounded-full bg-black/40 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all group"
            title={isMuted ? (lang === 'es' ? "Activar sonido" : "Unmute") : (lang === 'es' ? "Silenciar" : "Mute")}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 sm:w-6 sm:h-6 text-white/80 group-hover:text-white" />
            ) : (
              <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 animate-pulse" />
            )}
          </button>
          
          {/* Scanline Overlay */}
          <div className="absolute inset-0 z-[1] opacity-[0.01] pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
          
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/20 via-transparent to-zinc-950/60 z-[1]"></div>

          {/* Centered Text Overlay */}
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none px-4">
            <motion.div 
              animate={{ 
                opacity: [0, 1, 1, 0, 0],
                y: [20, 0, 0, -20, -20]
              }}
              transition={{ 
                duration: 19, 
                repeat: Infinity, 
                times: [0, 0.105, 0.632, 0.737, 1],
                ease: "easeInOut"
              }}
              className="text-center w-full max-w-[95vw] mx-auto"
            >
              <h2 className={`font-black italic uppercase transition-all duration-500 drop-shadow-2xl py-4 ${
                lang === 'pl'
                  ? 'sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[1.1]'
                  : lang === 'de'
                    ? 'text-[4vw] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight leading-[1.1]'
                    : 'text-[6.2vw] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tighter leading-[1.1]'
              }`}>
                <motion.span 
                  animate={{
                    opacity: [1, 0.8, 1, 0.9, 1],
                    textShadow: [
                      "0 0 0px rgba(255,255,255,0)",
                      "0 0 40px rgba(255,255,255,0.8), 0 0 80px rgba(255,255,255,0.4)",
                      "0 0 10px rgba(255,255,255,0.4)",
                      "0 0 50px rgba(255,255,255,1), 0 0 100px rgba(255,255,255,0.6)",
                      "0 0 20px rgba(255,255,255,0.6)"
                    ]
                  }}
                  transition={{
                    duration: 1.2,
                    delay: 2.1,
                    repeat: Infinity,
                    repeatDelay: 17.8,
                    times: [0, 0.1, 0.2, 0.3, 1]
                  }}
                  className={`text-white block ${lang === 'pl' ? 'text-[6.5vw]' : ''}`}
                >
                  {t.hero.transform}
                </motion.span>
                <motion.span 
                  animate={{
                    opacity: [1, 0.7, 1, 0.8, 1],
                    textShadow: [
                      "0 0 0px rgba(220,38,38,0)",
                      "0 0 40px rgba(220,38,38,0.8), 0 0 80px rgba(220,38,38,0.4)",
                      "0 0 10px rgba(220,38,38,0.4)",
                      "0 0 50px rgba(220,38,38,1), 0 0 100px rgba(220,38,38,0.6)",
                      "0 0 20px rgba(220,38,38,0.6)"
                    ]
                  }}
                  transition={{
                    duration: 1.2,
                    delay: 2.3,
                    repeat: Infinity,
                    repeatDelay: 17.8,
                    times: [0, 0.1, 0.2, 0.3, 1]
                  }}
                  className={`text-red-600 block ${lang === 'pl' ? 'text-[6vw]' : ''}`}
                >
                  {t.hero.limits}
                </motion.span>
              </h2>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/10 border border-red-600/20 text-red-600 text-xs font-black uppercase tracking-[0.3em] mb-8 shadow-[0_0_20px_rgba(220,38,38,0.1)]">
                <Zap className="w-4 h-4 fill-red-600" />
                {t.hero.guaranteed}
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8 sm:mb-10 uppercase italic">
                {t.hero.domina} <br />
                <span className="text-red-600 not-italic drop-shadow-[0_0_30px_rgba(220,38,38,0.3)]">{t.hero.potencial}</span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-zinc-400 mb-10 sm:mb-12 max-w-2xl font-light font-display leading-relaxed tracking-wide">
                {t.hero.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-stretch sm:items-start mb-10">
                <motion.a 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="#contacto" 
                  className="inline-flex items-center justify-center gap-3 bg-red-600 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg hover:bg-red-700 transition-all shadow-[0_18px_45px_rgba(220,38,38,0.35)] group"
                >
                  {t.hero.trial}
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" />
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="#servicios" 
                  className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg hover:bg-white/20 transition-all"
                >
                  {t.hero.programs}
                </motion.a>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <img 
                      key={i}
                      src={`https://i.pravatar.cc/100?u=${i+10}`} 
                      className="w-10 h-10 rounded-full border-2 border-zinc-950 object-cover"
                      alt="User"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-xs font-bold text-zinc-400 tracking-wider">
                    {t.hero.clients}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative group"
            >
              <div className="absolute -inset-4 border-2 border-red-600 rounded-3xl group-hover:rotate-3 transition-transform duration-500"></div>
              <img 
                src="https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=1000" 
                alt="Entrenamiento en pareja" 
                className="rounded-2xl shadow-2xl relative z-10 w-full aspect-[4/3] object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-zinc-900/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-red-600 mb-1 sm:mb-2">{stat.value}</p>
                <p className="text-[9px] xs:text-[10px] sm:text-xs font-bold text-zinc-500 uppercase tracking-wider sm:tracking-[0.2em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20 lg:py-40 bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 text-[10rem] sm:text-[20rem] font-black text-white/[0.02] select-none pointer-events-none italic" translate="no">
          MTC
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
            <h2 className="text-xs sm:text-sm font-bold text-red-600 uppercase tracking-[0.3em] mb-4 sm:mb-6">{t.services.subtitle}</h2>
            <p className="text-3xl sm:text-4xl lg:text-6xl font-black tracking-tight text-white mb-6 sm:mb-8 uppercase">
              {t.services.title}
            </p>
            <p className="text-lg sm:text-xl text-zinc-400">
              {t.services.description}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
            {services.map((service, idx) => (
              <motion.a 
                key={idx}
                href="#contacto"
                whileHover={{ y: -10 }}
                className="p-8 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] bg-zinc-900/50 border border-white/5 hover:border-red-600/30 transition-all group block cursor-pointer"
              >
                <div className="w-16 h-16 bg-red-600/10 rounded-2xl flex items-center justify-center text-red-600 mb-8 group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-5 text-white uppercase tracking-tight">{service.title}</h3>
                <p className="text-zinc-400 mb-10 leading-relaxed text-lg">
                  {service.description}
                </p>
                <div className="flex items-center justify-between pt-8 border-t border-white/5">
                  <span className="font-bold text-red-600 text-lg">{service.price}</span>
                  <div className="text-zinc-500 group-hover:text-white transition-colors">
                    <ChevronRight className="w-8 h-8" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre-mi" className="py-20 lg:py-32 bg-zinc-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-red-600/10 skew-x-0 lg:skew-x-12 translate-x-0 lg:translate-x-32"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-xs sm:text-sm font-bold text-red-600 uppercase tracking-[0.2em] mb-4">{t.about.subtitle}</h2>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 sm:mb-8">
                {t.about.title}
              </h3>
              <div className="space-y-4 sm:space-y-6 text-zinc-400 text-base sm:text-lg leading-relaxed">
                <p>
                  {t.about.p1}
                </p>
                <p>
                  {t.about.p2}
                </p>
                <ul className="space-y-3 sm:space-y-4 pt-4">
                  {t.about.certs.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-zinc-200">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                      <span className="text-sm sm:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative group">
                <div className="absolute -inset-4 border-2 border-red-600 rounded-3xl group-hover:rotate-3 transition-transform duration-500"></div>
                <div className="absolute inset-0 bg-red-600/20 rounded-2xl mix-blend-overlay"></div>
                <img 
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1000" 
                  alt="Micky Training" 
                  className="rounded-2xl shadow-2xl relative z-10 w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-8 -right-8 bg-zinc-950 p-6 rounded-2xl shadow-2xl border border-red-600/30 z-20 hidden md:block" translate="no">
                  <p className="text-3xl font-black text-red-600 italic">MTC</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">Elite Training</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonios" className="py-20 lg:py-40 bg-zinc-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-24">
            <h2 className="text-xs sm:text-sm font-bold text-red-600 uppercase tracking-[0.3em] mb-4 sm:mb-6">{t.testimonials.subtitle}</h2>
            <p className="text-3xl sm:text-4xl lg:text-6xl font-black tracking-tight text-white uppercase">
              {t.testimonials.title}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
            {t.testimonials.items.map((testi, idx) => (
              <div key={idx} className="p-8 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] bg-zinc-900/30 border border-white/5">
                <div className="flex text-yellow-400 mb-6 sm:mb-8">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />)}
                </div>
                <p className="text-zinc-300 italic mb-8 sm:mb-10 leading-relaxed text-base sm:text-lg">
                  "{testi.content}"
                </p>
                <div className="flex items-center gap-4 sm:gap-5">
                  <img 
                    src={`https://picsum.photos/seed/test${idx + 1}/200/200`} 
                    alt={testi.name} 
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-red-600/20"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <p className="font-bold text-white text-base sm:text-lg">{testi.name}</p>
                    <p className="text-xs sm:text-sm text-zinc-500 font-medium uppercase tracking-wider">{testi.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 lg:py-32 bg-red-600 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-48 h-48 sm:w-96 sm:h-96 border-4 border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 sm:w-64 sm:h-64 border-4 border-white rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-red-200 uppercase tracking-[0.2em] mb-4">{t.contact.subtitle}</h2>
              <h3 className="text-3xl sm:text-4xl lg:text-6xl font-black tracking-tighter mb-6 sm:mb-8 uppercase italic leading-[1.1]">
                {t.contact.ready} <span className="text-zinc-950 not-italic">{t.contact.change}</span>
              </h3>
              <p className="text-lg sm:text-xl text-red-50 mb-8 sm:mb-12 leading-relaxed">
                {t.contact.description}
              </p>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="text-base sm:text-lg font-medium break-all">{t.contact.email || "contacto@mickytraining.com"}</span>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="text-base sm:text-lg font-medium">+34 616 423 016</span>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="text-base sm:text-lg font-medium">Palma de Mallorca, España</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl text-zinc-900">
              {formSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-bold mb-2">{t.contact.form.successTitle}</h4>
                  <p className="text-zinc-600">{t.contact.form.successText}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot field to prevent spam */}
                  <input type="text" name="_gotcha" style={{ display: 'none' }} />
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-zinc-700">{t.contact.form.name}</label>
                      <input 
                        required
                        name="nombre"
                        type="text" 
                        placeholder={t.contact.form.namePlaceholder}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-zinc-700">{t.contact.form.email}</label>
                      <input 
                        required
                        name="email"
                        type="email" 
                        placeholder={t.contact.form.emailPlaceholder}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-zinc-700">{t.contact.form.phone}</label>
                      <input 
                        required
                        name="telefono_cliente"
                        type="tel" 
                        placeholder={t.contact.form.phonePlaceholder}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-zinc-700">{t.contact.form.objective}</label>
                      <select 
                        name="objetivo"
                        defaultValue={t.contact.form.objectives[2]}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                      >
                        {t.contact.form.objectives.map((obj, i) => (
                          <option key={i}>{obj}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-zinc-700">{t.contact.form.message}</label>
                    <textarea 
                      name="mensaje"
                      rows={4}
                      placeholder={t.contact.form.messagePlaceholder}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all resize-none"
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-lg shadow-red-100 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        {t.contact.form.submitting}
                      </>
                    ) : (
                      t.contact.form.submit
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-zinc-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12" translate="no">
            <div className="flex items-center gap-0 group cursor-pointer shrink-0">
              <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
                <div className="absolute inset-0 border-4 border-red-600 rounded-xl rotate-45 group-hover:rotate-90 transition-transform duration-500"></div>
                <div className="absolute inset-0 border-2 border-white/20 rounded-xl rotate-12"></div>
                <span className="text-[14px] font-black text-white tracking-tighter z-10">MTC</span>
              </div>
              <div className="flex flex-col leading-none min-w-max">
                <LogoText className="h-16 w-auto" />
              </div>
            </div>
            
            <div className="flex gap-8">
              <a href="https://www.instagram.com/micky_training/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-red-600 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://wa.me/34616423016?text=¡Hola Micky! 👋%0A%0AHe visto la web de Micky Training y me gustaría empezar." target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-red-600 transition-colors">
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-6 h-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
              <a href="#" className="text-zinc-500 hover:text-red-600 transition-colors"><Facebook className="w-6 h-6" /></a>
            </div>
            
            <p className="text-[8px] text-zinc-600 font-medium uppercase tracking-widest">
              © 2026 MICKY TRAINING. Elite Personal Trainer. Sport & Health.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/34616423016?text=¡Hola Micky! 👋%0A%0AHe visto la web de Micky Training y me gustaría empezar."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[60] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 group flex items-center gap-2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ y: -5 }}
      >
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 font-bold text-sm">
          WhatsApp
        </span>
        <svg 
          viewBox="0 0 24 24" 
          className="w-6 h-6 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </motion.a>
    </div>
  );
}
