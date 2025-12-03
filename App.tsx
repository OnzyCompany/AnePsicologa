import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, animate } from 'framer-motion';
import { 
  Menu, X, Heart, Brain, Users, GraduationCap, 
  MapPin, MessageCircle, ArrowRight, ArrowDown,
  Instagram, Mail, ChevronDown, ChevronUp, CheckCircle2,
  Quote, Star
} from 'lucide-react';

// --- Constants ---
const WHATSAPP_NUMBER = "5511997867450";
const WHATSAPP_MESSAGE = "Olá, gostaria de saber mais sobre o atendimento.";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
const INSTAGRAM_LINK = "https://www.instagram.com/aaness5775/";
const ONZY_LINK = "https://www.instagram.com/onzy.company/";
const CRP_NUMBER = "CRP 06/149287";
const ADDRESS_TEXT = "R. Orense, 41 - Centro, Diadema - SP, 09920-650";
const EMAIL_TEXT = "robertinhabrandao_2011@hotmail.com";

// --- Shared Components ---

const Button = ({ children, variant = 'primary', className = '', onClick }: any) => {
  const baseStyle = "px-8 py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95 z-10 relative cursor-pointer";
  const variants = {
    primary: "bg-ane-300 text-white hover:bg-ane-400 shadow-lg hover:shadow-ane-200/50",
    outline: "border border-ane-300 text-ane-500 hover:bg-ane-50",
    white: "bg-white text-ane-500 hover:bg-gray-50 shadow-md"
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant as keyof typeof variants]} ${className}`}>
      {children}
    </button>
  );
};

const SectionHeading = ({ title, subtitle, align = 'center', light = false }: { title: string, subtitle?: string, align?: 'left' | 'center', light?: boolean }) => (
  <div className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}>
    {subtitle && (
      <motion.span 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`${light ? 'text-ane-200' : 'text-ane-400'} font-sans tracking-widest text-sm uppercase mb-3 block font-bold`}
      >
        {subtitle}
      </motion.span>
    )}
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className={`text-5xl md:text-6xl font-serif ${light ? 'text-white' : 'text-gray-800'} relative inline-block font-medium leading-tight`}
    >
      {title}
      <span className={`absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r ${light ? 'from-white/50' : 'from-ane-200'} to-transparent rounded-full opacity-60`} />
    </motion.h2>
  </div>
);

const AnimatedCounter = ({ from, to }: { from: number; to: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && nodeRef.current) {
      const controls = animate(from, to, {
        duration: 2,
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = value.toFixed(0);
          }
        },
        ease: "easeOut"
      });
      return () => controls.stop();
    }
  }, [from, to, isInView]);

  return <span ref={nodeRef} className="block text-4xl font-serif font-bold text-ane-400 mb-2">{from}</span>;
};

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('button, a, .cursor-pointer')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-ane-400 pointer-events-none z-[9999] hidden md:block mix-blend-multiply"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        scale: isHovering ? 1.5 : 1,
        backgroundColor: isHovering ? 'rgba(184, 161, 214, 0.2)' : 'transparent',
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    />
  );
};

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: "Sobre", href: "#sobre" },
    { name: "Especialidades", href: "#especialidades" },
    { name: "Processo", href: "#processo" },
    { name: "Atendimento", href: "#atendimento" },
    { name: "Localização", href: "#localizacao" },
    { name: "Depoimentos", href: "#depoimentos-pacientes" },
    { name: "Dúvidas", href: "#faq" },
  ];

  const handleAction = () => {
    window.open(WHATSAPP_LINK, '_blank');
    setIsOpen(false);
  };

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  return (
    <>
      <motion.nav
        initial={{ width: "100%", top: 0, borderRadius: 0, padding: "1.5rem 0" }}
        animate={{
          width: scrolled ? (isMobile ? "92%" : "85%") : "100%", 
          top: scrolled ? "1rem" : "0",
          borderRadius: scrolled ? "50px" : "0px",
          padding: scrolled ? "0.75rem 0" : "1.5rem 0",
          backgroundColor: scrolled ? "rgba(255, 255, 255, 0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "blur(0px)",
          boxShadow: scrolled ? "0 8px 32px rgba(31, 38, 135, 0.15)" : "none",
          border: scrolled ? "1px solid rgba(255, 255, 255, 0.5)" : "1px solid transparent",
        }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 20 }}
        className="fixed left-1/2 -translate-x-1/2 z-50 flex justify-center items-center"
      >
        <div className={`container px-8 flex justify-between items-center w-full transition-all duration-500 ${scrolled ? 'max-w-full' : 'mx-auto'}`}>
          <a href="#" className="font-serif text-2xl text-ane-500 font-bold z-50 relative shrink-0 cursor-pointer" onClick={(e) => handleScroll(e, '#home')}>
            Ane Souza
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-10">
            {links.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => handleScroll(e, link.href)}
                className="text-gray-600 hover:text-ane-400 transition-colors font-sans text-sm tracking-wide font-medium cursor-pointer whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
            <Button variant="primary" className="!px-6 !py-2 !text-sm whitespace-nowrap z-50" onClick={handleAction}>Agendar</Button>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden z-50 text-gray-700 cursor-pointer">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
            className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8"
          >
            {links.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => handleScroll(e, link.href)}
                className="text-2xl font-serif text-gray-800 hover:text-ane-400 cursor-pointer"
              >
                {link.name}
              </a>
            ))}
            <Button onClick={handleAction} variant="primary">Agendar Consulta</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const FloatingWhatsApp = () => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setVisible(latest > 600);
    });
  }, [scrollY]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-[#25D366] rounded-full shadow-lg cursor-pointer group"
        >
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75 animate-ping"></span>
          <MessageCircle className="text-white w-8 h-8 relative z-10" />
          
          <span className="absolute right-20 bg-white text-gray-700 px-4 py-2 rounded-xl shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium">
            Agende sua consulta
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const [text, setText] = useState("");
  const fullText = "Psicóloga Clínica";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleAction = () => {
    window.open(WHATSAPP_LINK, '_blank');
  };

  return (
    <section className="relative min-h-screen flex items-center pt-28 overflow-hidden bg-ane-50 scroll-mt-32" id="home">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-ane-200/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-ane-300/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="order-2 md:order-1"
        >
          <div className="mb-4">
            <span className="text-ane-400 font-bold tracking-widest uppercase text-sm md:text-base mr-1">{text}</span>
            <span className="animate-pulse text-ane-400">|</span>
            <p className="text-xs text-gray-400 font-medium mt-1">{CRP_NUMBER}</p>
          </div>
          <h1 className="text-6xl md:text-8xl font-serif text-gray-800 leading-tight mb-8">
            Ane <br/>
            <span className="text-ane-400 italic">Souza</span>
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-2xl text-gray-600 mb-10 max-w-md font-light italic"
          >
            "Cuidar da mente é um ato de coragem."
          </motion.p>
          <div className="flex flex-wrap gap-4">
            <Button onClick={handleAction}>
              Agende sua Consulta <ArrowRight size={18} />
            </Button>
            <Button variant="outline" onClick={() => document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' })}>
              Saiba Mais
            </Button>
          </div>
        </motion.div>

        <motion.div 
          style={{ y }}
          className="order-1 md:order-2 flex justify-center relative"
        >
          <div className="relative w-80 h-[28rem] md:w-96 md:h-[32rem]">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute -top-10 -right-10 w-full h-full text-ane-200/50 z-0 scale-125">
              <path fill="currentColor" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-46.3C87.4,-33.5,90.1,-17.9,89.1,-2.4C88.1,13.1,83.3,28.5,74.5,41.2C65.7,53.9,52.8,63.9,39.2,69.5C25.6,75.1,11.3,76.3,-2.2,80.1C-15.7,83.9,-28.5,90.3,-40.3,86.6C-52.1,82.9,-63,69.1,-71.3,54.5C-79.6,39.9,-85.3,24.5,-85.9,8.8C-86.5,-6.9,-82,-22.9,-73.2,-36.4C-64.4,-49.9,-51.3,-60.9,-37.6,-68.3C-23.9,-75.7,-9.6,-79.5,4,-86.4L17.6,-93.3L44.7,-76.4Z" transform="translate(100 100)" />
            </svg>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative z-10 w-full h-full rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white"
            >
              <img 
                src="https://res.cloudinary.com/dxhlvrach/image/upload/v1764693611/Imagem_do_WhatsApp_de_2025-12-02_%C3%A0_s_12.30.44_fab2f298_fthmf3.jpg" 
                alt="Ane de Souza" 
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl z-20 flex items-center gap-3"
            >
              <div className="bg-ane-100 p-2 rounded-full text-ane-500">
                <Brain size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Abordagem</p>
                <p className="font-serif text-lg font-bold text-gray-800">Humanista</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="sobre" className="py-24 bg-white relative overflow-hidden scroll-mt-32">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
             <div className="relative rounded-tr-[5rem] rounded-bl-[5rem] overflow-hidden shadow-xl aspect-[3/4] bg-neutral-200">
                <img 
                  src="https://res.cloudinary.com/dxhlvrach/image/upload/v1764693611/Imagem_do_WhatsApp_de_2025-12-02_%C3%A0_s_12.30.43_b08be458_xyx6mx.jpg" 
                  alt="Ane de Souza trabalhando" 
                  className="w-full h-full object-cover opacity-95 hover:opacity-100 transition-opacity duration-500"
                />
             </div>
             <div className="absolute -bottom-10 -right-10 w-32 h-32 pattern-dots text-ane-200 opacity-50"></div>
          </motion.div>

          <div>
            <SectionHeading title="Sobre mim" subtitle="Minha Jornada" align="left" />
            
            <div className="space-y-6 text-gray-600 font-light text-lg leading-relaxed text-justify">
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Sou psicóloga clínica e atuo a partir da Abordagem Centrada na Pessoa (ACP), uma linha da psicologia desenvolvida por Carl Rogers que valoriza a singularidade de cada indivíduo. Essa abordagem parte da confiança no potencial humano de crescer, se desenvolver e encontrar seus próprios caminhos quando acolhido em um espaço seguro, respeitoso e empático.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Meu objetivo é oferecer um ambiente de escuta sensível, livre de julgamentos, onde você possa se sentir à vontade para compartilhar suas experiências, sentimentos e desafios. Acredito que, quando a pessoa se sente compreendida e aceita, torna-se possível construir novas formas de lidar com as dificuldades, desenvolver autoconfiança e fortalecer sua saúde emocional.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                Mais do que trabalhar apenas com sintomas, busco caminhar junto com você em seu processo de autoconhecimento, promovendo bem-estar, autenticidade e qualidade de vida.
              </motion.p>
            </div>

            <div className="grid grid-cols-2 gap-8 mt-12">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 className="bg-ane-50 p-6 rounded-2xl text-center border border-ane-100"
               >
                 <div className="flex justify-center items-center gap-1">
                   <AnimatedCounter from={0} to={8} />
                   <span className="text-4xl font-serif font-bold text-ane-400 mb-2">+</span>
                 </div>
                 <span className="text-sm text-gray-500 uppercase tracking-wide">Anos de Experiência</span>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.1 }}
                 className="bg-ane-50 p-6 rounded-2xl text-center border border-ane-100"
               >
                 <div className="flex justify-center items-center gap-1">
                   <AnimatedCounter from={0} to={500} />
                   <span className="text-4xl font-serif font-bold text-ane-400 mb-2">+</span>
                 </div>
                 <span className="text-sm text-gray-500 uppercase tracking-wide">Vidas Transformadas</span>
               </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Specialties = () => {
  const items = [
    { icon: <Heart size={28} />, title: "Psicoterapia", desc: "Atendimento clínico online e presencial focado no seu bem-estar." },
    { icon: <Users size={28} />, title: "Público Alvo", desc: "Acolhimento especializado para Adultos, Adolescentes e Casais." },
    { icon: <MessageCircle size={28} />, title: "Roda de Conversa", desc: "Facilitadora de grupos terapêuticos e conversas entre mulheres." },
    { icon: <GraduationCap size={28} />, title: "Supervisão", desc: "Orientação clínica para estudantes e recém-formados em ACP." },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="especialidades" className="py-24 bg-ane-50/50 scroll-mt-32">
      <div className="container mx-auto px-6">
        <SectionHeading title="Especialidades e Formação" subtitle="Como posso ajudar" />

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {items.map((item, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariant}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-ane-100 hover:scale-105 group cursor-pointer"
            >
              <div className="w-14 h-14 bg-ane-100 rounded-2xl flex items-center justify-center text-ane-500 mb-6 group-hover:bg-ane-400 group-hover:text-white transition-colors duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-800 mb-3">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Formation Card with Glowing Effect */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center max-w-3xl mx-auto"
        >
          <div className="gradient-border-box p-1 rounded-full inline-block">
             <div className="bg-white px-8 py-4 rounded-full shadow-sm relative z-10">
               <p className="text-gray-600 text-base">
                 <span className="font-bold text-ane-500">Formação:</span> Psicologia Organizacional • Neuropsicologia • ACP • Psicologia do Trânsito (cursando)
               </p>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const PinnedSection = () => {
  return (
    <section 
      id="processo" 
      className="relative w-full h-[80vh] md:h-screen bg-fixed bg-center bg-cover bg-no-repeat flex flex-col items-center justify-center scroll-mt-0"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1974&auto=format&fit=crop')`
      }}
    >
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl px-6 text-center text-white"
      >
        <SectionHeading title="O Processo Terapêutico" subtitle="Um encontro genuíno" light={true} />
        <p className="text-xl md:text-3xl font-light leading-relaxed opacity-90 drop-shadow-md">
          A terapia não é apenas sobre resolver problemas, mas sobre expandir a consciência de quem você é. Em um ambiente seguro, convido você a explorar suas emoções, ressignificar experiências e descobrir novas formas de estar no mundo.
        </p>
      </motion.div>

      {/* Glass Arrow */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute bottom-10 z-20 hidden md:flex flex-col items-center gap-3"
      >
        <div className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg text-white">
           <ArrowDown size={32} className="animate-bounce" />
        </div>
        <p className="text-white/80 font-serif italic text-sm tracking-wider drop-shadow-md">Continue sua jornada...</p>
      </motion.div>
    </section>
  );
};

const Modalities = () => {
  return (
    <section id="atendimento" className="py-24 bg-white scroll-mt-32">
      <div className="container mx-auto px-6">
        <SectionHeading title="Modalidades de Atendimento" subtitle="Flexibilidade para você" />
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Presencial */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-ane-900/80 to-transparent z-10" />
            <img 
              src="https://res.cloudinary.com/dxhlvrach/image/upload/v1764693759/Imagem_do_WhatsApp_de_2025-12-02_%C3%A0_s_13.41.49_2c54ed13_vdties.jpg" 
              alt="Atendimento Presencial" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 p-8 z-20 text-white">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="text-ane-300" />
                <h3 className="text-2xl font-serif font-bold">Presencial</h3>
              </div>
              <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                Um ambiente acolhedor, preparado para garantir sua privacidade e conforto durante as sessões.
              </p>
            </div>
          </motion.div>

          {/* Online */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer shadow-lg bg-ane-100"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-ane-900/80 to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=1000&auto=format&fit=crop" 
              alt="Atendimento Online" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 p-8 z-20 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="text-ane-300" />
                <h3 className="text-2xl font-serif font-bold">Online</h3>
              </div>
              <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                Realize sua terapia onde estiver, com a mesma qualidade e ética do atendimento presencial.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const LocationSection = () => {
  return (
    <section id="localizacao" className="py-24 bg-ane-50/50 scroll-mt-32">
      <div className="container mx-auto px-6">
        <SectionHeading title="Localização" subtitle="Onde me encontrar" />
        
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full h-96 rounded-[2rem] overflow-hidden shadow-lg border border-ane-100"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3653.666993883162!2d-46.62473492388654!3d-23.68784846624458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce44e6b18a221f%3A0xd685b8c9d2f605a!2sR.%20Orense%2C%2041%20-%20Centro%2C%20Diadema%20-%20SP%2C%2009920-650!5e0!3m2!1sen!2sbr!4v1709400000000!5m2!1sen!2sbr" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
          
          <div className="mt-8 grid md:grid-cols-2 gap-6">
             <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm">
                <div className="w-12 h-12 bg-ane-100 rounded-full flex items-center justify-center text-ane-500">
                   <MapPin size={24} />
                </div>
                <div>
                   <h4 className="font-bold text-gray-800">Endereço</h4>
                   <p className="text-gray-600 text-sm mt-1">{ADDRESS_TEXT}</p>
                </div>
             </div>
             
             <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm">
                <div className="w-12 h-12 bg-ane-100 rounded-full flex items-center justify-center text-ane-500">
                   <MessageCircle size={24} />
                </div>
                <div>
                   <h4 className="font-bold text-gray-800">Agende sua visita</h4>
                   <p className="text-gray-600 text-sm mt-1">Atendimento com hora marcada</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PatientTestimonials = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const testimonials = [
    {
      text: "Fazer terapia com a Ane foi um divisor de águas na minha vida. Senti um acolhimento genuíno e consegui entender questões que carregava há anos.",
      author: "Maria S.",
      stars: 5,
      isLong: false
    },
    {
      text: "Gostei muito do seu atendimento. Você me ajudou muito! Você não só me ajudou a ver os meus problemas com outros olhos, me ajudou a ser uma pessoa melhor, diferente, me ajudou a tratar os meus problemas e não só a aprender a lidar com eles.",
      author: "Paciente Anônimo",
      stars: 5,
      isLong: false
    },
    {
      text: "A abordagem humanista fez toda a diferença para mim. Me sinto ouvida e respeitada em cada sessão. Recomendo de olhos fechados.",
      author: "Ana Clara",
      stars: 5,
      isLong: false
    },
    {
      text: `Profissionalmente, acho a senhora muito dedicada e atenta a cada detalhe.

Vejo na senhora um verdadeiro amor pela profissão. No tempo em que fiquei afastada da terapia, percebi o quanto é importante falar com alguém e saber que essa pessoa realmente vai escutar. Abrir o coração para quem entende faz toda a diferença.

Conversando com algumas pessoas, percebemos a falta de afeto.

"Isso é frescura."
"Para de ser dramática."
"Você é tão fraca."

São algumas das frases que escutamos quando estamos no "fundo do poço".

A senhora foi como uma luz nesse poço escuro.

A voz que me diz:
"Você consegue!"
"Vamos tentar novamente!"
"Está tudo bem!"

E a frase que eu mais gosto de ouvir:
"Eu estou com você!"

Muitas vezes nos sentimos sozinhas, sem enxergar ninguém ao nosso lado, e só de escutar essa frase já é o suficiente.

Sei que preciso mudar muito, mas só de saber que tenho alguém que me entende em qualquer momento e me direciona para o meu bem, já consigo ver uma nova possibilidade.`,
      author: "Paciente em Recuperação",
      stars: 5,
      isLong: true
    }
  ];

  const handleToggle = (idx: number) => {
    setExpandedId(expandedId === idx ? null : idx);
  };

  return (
    <section id="depoimentos-pacientes" className="py-24 bg-white scroll-mt-32">
      <div className="container mx-auto px-6">
        <SectionHeading title="Depoimentos" subtitle="O que dizem os pacientes" />
        
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {testimonials.map((item, idx) => {
              const isExpanded = expandedId === idx;
              const isHidden = expandedId !== null && expandedId !== idx;
              const showButton = item.isLong;

              if (isHidden) return null;

              return (
                <motion.div
                  layout
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className={`bg-ane-50/50 p-8 rounded-3xl border border-transparent hover:border-ane-100 hover:shadow-lg transition-all duration-300 relative ${isExpanded ? 'col-span-full' : ''}`}
                >
                  <Quote className="text-ane-200 mb-4 w-8 h-8" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(item.stars)].map((_, i) => (
                      <Star key={i} size={16} className="fill-ane-300 text-ane-300" />
                    ))}
                  </div>
                  
                  <motion.div layout>
                    <p className={`text-gray-600 font-light italic mb-6 leading-relaxed ${isExpanded ? 'whitespace-pre-line' : ''}`}>
                      {isExpanded || !showButton ? `"${item.text}"` : `"${item.text.substring(0, 150)}..."`}
                    </p>
                  </motion.div>

                  <div className="flex justify-between items-center mt-4">
                     <p className="font-serif font-bold text-gray-800">- {item.author}</p>
                     
                     {showButton && (
                       <button 
                         onClick={() => handleToggle(idx)}
                         className="text-ane-400 hover:text-ane-500 text-sm font-semibold underline underline-offset-4 cursor-pointer"
                       >
                         {isExpanded ? "Ver menos" : "Ver mais"}
                       </button>
                     )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    { question: "Como agendar uma consulta?", answer: "O agendamento é feito diretamente pelo WhatsApp. Basta clicar no botão de agendar e você será redirecionado para combinarmos o melhor horário." },
    { question: "Qual a duração das sessões?", answer: "As sessões têm duração aproximada de 50 minutos, tempo ideal para desenvolvermos o trabalho terapêutico com qualidade." },
    { question: "O atendimento online é eficaz?", answer: "Sim, diversos estudos comprovam que a eficácia é a mesma do presencial. O vínculo e o sigilo são mantidos com o mesmo rigor ético." },
    { question: "Existe sigilo profissional?", answer: "Absolutamente. Todo o conteúdo das sessões é protegido pelo Código de Ética Profissional do Psicólogo, garantindo total confidencialidade." },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-ane-50/30 scroll-mt-32">
      <div className="container mx-auto px-6 max-w-3xl">
        <SectionHeading title="Dúvidas Frequentes" subtitle="Esclarecimentos" />
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <button 
                onClick={() => toggleFAQ(idx)}
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
              >
                <span className="font-serif text-lg font-medium text-gray-800">{faq.question}</span>
                {activeIndex === idx ? <ChevronUp className="text-ane-400" /> : <ChevronDown className="text-gray-400" />}
              </button>
              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-gray-600 font-light leading-relaxed border-t border-gray-100 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Quotes = () => {
  const quotes = [
    "A terapia é um espaço de acolhimento, de encontro consigo mesmo e de transformação.",
    "Não é sinal de fraqueza buscar ajuda, mas de força e de amor-próprio.",
    "Quando você escolhe olhar para dentro, escolhe também viver com mais leveza e consciência."
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-32 bg-gradient-to-br from-ane-300 to-ane-500 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="text-6xl text-ane-200 opacity-50 font-serif mb-8">“</div>
        <div className="h-48 flex items-center justify-center">
          <AnimatePresence mode='wait'>
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-4xl font-serif leading-relaxed max-w-4xl mx-auto"
            >
              {quotes[index]}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="flex justify-center gap-3 mt-8">
          {quotes.map((_, i) => (
            <button 
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-all ${i === index ? 'bg-white scale-125' : 'bg-white/30'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const images = [
    "https://res.cloudinary.com/dxhlvrach/image/upload/v1764693759/Imagem_do_WhatsApp_de_2025-12-02_%C3%A0_s_13.41.49_2c54ed13_vdties.jpg",
    "https://res.cloudinary.com/dxhlvrach/image/upload/v1764693759/Imagem_do_WhatsApp_de_2025-12-02_%C3%A0_s_13.41.49_7cc605bf_meblt4.jpg"
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <SectionHeading title="Conheça o Espaço" subtitle="Ambiente Seguro e Acolhedor" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto h-auto md:h-96">
          {images.map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative rounded-2xl overflow-hidden shadow-md cursor-pointer group h-64 md:h-full"
            >
              <div className="absolute inset-0 bg-ane-900/0 group-hover:bg-ane-900/20 transition-colors z-10" />
              <img src={src} alt={`Escritório ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  const handleAction = () => {
    window.open(WHATSAPP_LINK, '_blank');
  };

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-5xl bg-ane-900 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-ane-500 rounded-full blur-[80px] opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-ane-300 rounded-full blur-[80px] opacity-30"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-8 leading-tight">
            Caso queira conhecer um pouco mais sobre meu trabalho, <br className="hidden md:block"/>
            vamos agendar uma conversa?
          </h2>
          <Button 
            variant="white" 
            className="mx-auto text-lg px-10 py-4 !text-ane-900 animate-pulse hover:animate-none"
            onClick={handleAction}
          >
            <MessageCircle className="mr-2" /> Agendar pelo WhatsApp
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contato" className="bg-white border-t border-gray-100 pt-20 pb-24 scroll-mt-32">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-16 text-center md:text-left">
          
          <div className="flex flex-col items-center md:items-start">
            <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="inline-block group cursor-pointer">
              <h3 className="text-2xl font-serif font-bold text-ane-500 group-hover:text-ane-400 transition-colors mb-2">Ane Souza</h3>
            </a>
            <p className="text-gray-500 font-medium mb-4">{CRP_NUMBER}</p>
            <p className="text-gray-500 leading-relaxed mb-6">
              Psicóloga Clínica<br/>
              Ajudando você a encontrar sua melhor versão através do autoconhecimento.
            </p>
            <div className="flex gap-4">
              <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-ane-50 flex items-center justify-center text-ane-400 hover:bg-ane-400 hover:text-white transition-all cursor-pointer">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-gray-800 mb-6">Contato</h4>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-center gap-3 hover:text-ane-400 transition-colors cursor-pointer justify-center md:justify-start" onClick={() => window.open(WHATSAPP_LINK, '_blank')}>
                <MessageCircle size={18} className="text-ane-300" />
                (11) 99786-7450
              </li>
              <li className="flex items-center gap-3 hover:text-ane-400 transition-colors cursor-pointer justify-center md:justify-start">
                <Mail size={18} className="text-ane-300" />
                {EMAIL_TEXT}
              </li>
              <li className="flex items-start gap-3 hover:text-ane-400 transition-colors cursor-pointer justify-center md:justify-start text-left">
                <MapPin size={18} className="text-ane-300 mt-1 shrink-0" />
                <span>{ADDRESS_TEXT}</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-gray-800 mb-6">Links Rápidos</h4>
            <ul className="space-y-3 text-gray-500">
              <li><a href="#sobre" className="hover:text-ane-400 transition-colors cursor-pointer">Sobre Mim</a></li>
              <li><a href="#especialidades" className="hover:text-ane-400 transition-colors cursor-pointer">Especialidades</a></li>
              <li><a href="#atendimento" className="hover:text-ane-400 transition-colors cursor-pointer">Modalidades</a></li>
              <li><a href="#localizacao" className="hover:text-ane-400 transition-colors cursor-pointer">Localização</a></li>
              <li><a href="#faq" className="hover:text-ane-400 transition-colors cursor-pointer">Dúvidas Frequentes</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-center text-gray-400 text-sm gap-2 text-center">
          <p>&copy; {new Date().getFullYear()} Ane de Souza. Todos os direitos reservados.</p>
          <span className="hidden md:inline">|</span>
          <a href={ONZY_LINK} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-1 hover:text-ane-400 transition-colors cursor-pointer">
            Desenvolvido por <span className="font-semibold text-gray-500 group-hover:text-ane-400 transition-colors">Onzy Company</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="font-sans text-gray-800 overflow-x-hidden relative">
      <CustomCursor />
      <Navbar />
      <Hero />
      <About />
      <Specialties />
      <PinnedSection />
      <Modalities />
      <LocationSection />
      <PatientTestimonials />
      <FAQ />
      <Quotes />
      <Gallery />
      <CTA />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}