import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Menu, X, Heart, Brain, Users, GraduationCap, 
  MapPin, MessageCircle, Calendar, ArrowRight, 
  Instagram, Linkedin, Mail 
} from 'lucide-react';

// --- Shared Components ---

const Button = ({ children, variant = 'primary', className = '', onClick }: any) => {
  const baseStyle = "px-8 py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95";
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

const SectionHeading = ({ title, subtitle, align = 'center' }: { title: string, subtitle?: string, align?: 'left' | 'center' }) => (
  <div className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}>
    {subtitle && (
      <motion.span 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-ane-400 font-sans tracking-widest text-sm uppercase mb-3 block"
      >
        {subtitle}
      </motion.span>
    )}
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-4xl md:text-5xl font-serif text-gray-800 relative inline-block"
    >
      {title}
      <span className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-ane-200 to-transparent rounded-full opacity-60" />
    </motion.h2>
  </div>
);

// --- Sections ---

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
    { name: "Atendimento", href: "#atendimento" },
    { name: "Depoimentos", href: "#depoimentos" },
    { name: "Contato", href: "#contato" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="font-serif text-2xl text-ane-500 font-bold z-50 relative">
          Ane de Souza
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <a key={link.name} href={link.href} className="text-gray-600 hover:text-ane-400 transition-colors font-sans text-sm tracking-wide">
              {link.name}
            </a>
          ))}
          <Button variant="primary" className="!px-6 !py-2 !text-sm">Agendar</Button>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden z-50 text-gray-700">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

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
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-serif text-gray-800 hover:text-ane-400"
                >
                  {link.name}
                </a>
              ))}
              <Button onClick={() => setIsOpen(false)} variant="primary">Agendar Consulta</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
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

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-ane-50">
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-ane-200/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-ane-300/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="order-2 md:order-1"
        >
          <div className="h-8 mb-2">
            <span className="text-ane-400 font-medium tracking-widest uppercase">{text}</span>
            <span className="animate-pulse text-ane-400">|</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-gray-800 leading-tight mb-6">
            Ane de <br/>
            <span className="text-ane-400 italic">Souza</span>
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-xl text-gray-600 mb-8 max-w-md font-light italic"
          >
            "Cuidar da mente é um ato de coragem."
          </motion.p>
          <div className="flex flex-wrap gap-4">
            <Button>
              Agende sua Consulta <ArrowRight size={18} />
            </Button>
            <Button variant="outline">Saiba Mais</Button>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div 
          style={{ y }}
          className="order-1 md:order-2 flex justify-center relative"
        >
          <div className="relative w-80 h-[28rem] md:w-96 md:h-[32rem]">
            {/* Organic blob background behind image */}
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

            {/* Floating Badge */}
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
    <section id="sobre" className="py-24 bg-white relative overflow-hidden">
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
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1000&auto=format&fit=crop" 
                  alt="Ane de Souza trabalhando" 
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                />
             </div>
             {/* Decorative Dots */}
             <div className="absolute -bottom-10 -right-10 w-32 h-32 pattern-dots text-ane-200 opacity-50"></div>
          </motion.div>

          <div>
            <SectionHeading title="Sobre a Profissional" subtitle="Minha Jornada" align="left" />
            
            <div className="space-y-6 text-gray-600 font-light text-lg leading-relaxed">
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Olá, sou Ane de Souza. Psicóloga clínica apaixonada pelo potencial humano de transformação. Minha atuação é pautada na Abordagem Centrada na Pessoa, onde acredito que todo indivíduo possui os recursos necessários para o seu próprio crescimento.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Ofereço psicoterapia tanto online quanto presencial, criando um espaço de escuta ativa e empática, livre de julgamentos. Meu objetivo é caminhar ao seu lado na busca por autoconhecimento e bem-estar.
              </motion.p>
            </div>

            <div className="grid grid-cols-2 gap-8 mt-12">
               {[
                 { label: "Anos de Experiência", value: "8+" },
                 { label: "Vidas Transformadas", value: "500+" }
               ].map((stat, idx) => (
                 <motion.div 
                   key={idx}
                   initial={{ opacity: 0, scale: 0.8 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.4 + (idx * 0.1) }}
                   className="bg-ane-50 p-6 rounded-2xl text-center border border-ane-100"
                 >
                   <span className="block text-4xl font-serif font-bold text-ane-400 mb-2">{stat.value}</span>
                   <span className="text-sm text-gray-500 uppercase tracking-wide">{stat.label}</span>
                 </motion.div>
               ))}
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
    <section id="especialidades" className="py-24 bg-ane-50/50">
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
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-ane-100 group"
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

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center max-w-2xl mx-auto"
        >
          <p className="text-gray-500 text-sm bg-white inline-block px-6 py-3 rounded-full shadow-sm border border-ane-100">
            <span className="font-bold text-ane-400">Formação:</span> Psicologia Organizacional • Neuropsicologia • ACP • Psicologia do Trânsito (cursando)
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const Modalities = () => {
  return (
    <section id="atendimento" className="py-24 bg-white">
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
              src="https://res.cloudinary.com/dxhlvrach/image/upload/v1764693611/Imagem_do_WhatsApp_de_2025-12-02_%C3%A0_s_12.30.44_fab2f298_fthmf3.jpg" 
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
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80", // Office wide
    "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80", // Chair detail
    "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=800&q=80", // Plant/Decor
    "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80"  // Waiting room
  ];

  return (
    <section className="py-24 bg-ane-50">
      <div className="container mx-auto px-6">
        <SectionHeading title="Conheça o Espaço" subtitle="Ambiente Seguro e Acolhedor" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-auto md:h-96">
          {images.map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative rounded-2xl overflow-hidden shadow-md cursor-pointer group ${idx === 0 ? 'md:col-span-2 md:row-span-2 h-64 md:h-full' : 'h-64 md:h-full'}`}
            >
              <div className="absolute inset-0 bg-ane-900/0 group-hover:bg-ane-900/20 transition-colors z-10" />
              <img src={src} alt="Escritório" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-5xl bg-ane-900 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
        {/* Abstract shapes */}
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
            onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
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
    <footer id="contato" className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          
          <div>
            <h3 className="text-2xl font-serif font-bold text-ane-500 mb-6">Ane de Souza</h3>
            <p className="text-gray-500 leading-relaxed mb-6">
              Psicóloga Clínica - CRP 00/00000<br/>
              Ajudando você a encontrar sua melhor versão através do autoconhecimento.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-ane-50 flex items-center justify-center text-ane-400 hover:bg-ane-400 hover:text-white transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-ane-50 flex items-center justify-center text-ane-400 hover:bg-ane-400 hover:text-white transition-all">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 mb-6">Contato</h4>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-center gap-3 hover:text-ane-400 transition-colors cursor-pointer">
                <MessageCircle size={18} className="text-ane-300" />
                (11) 99999-9999
              </li>
              <li className="flex items-center gap-3 hover:text-ane-400 transition-colors cursor-pointer">
                <Mail size={18} className="text-ane-300" />
                contato@anedesouza.com.br
              </li>
              <li className="flex items-start gap-3 hover:text-ane-400 transition-colors cursor-pointer">
                <MapPin size={18} className="text-ane-300 mt-1" />
                <span>Rua das Flores, 123 - Sala 405<br/>Centro, São Paulo - SP</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 mb-6">Links Rápidos</h4>
            <ul className="space-y-3 text-gray-500">
              <li><a href="#sobre" className="hover:text-ane-400 transition-colors">Sobre Mim</a></li>
              <li><a href="#especialidades" className="hover:text-ane-400 transition-colors">Especialidades</a></li>
              <li><a href="#atendimento" className="hover:text-ane-400 transition-colors">Modalidades</a></li>
              <li><a href="#" className="hover:text-ane-400 transition-colors">Política de Privacidade</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Ane de Souza. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="font-sans text-gray-800">
      <Navbar />
      <Hero />
      <About />
      <Specialties />
      <Modalities />
      <Quotes />
      <Gallery />
      <CTA />
      <Footer />
    </div>
  );
}