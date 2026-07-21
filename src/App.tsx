import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, Box, Check, ChevronRight, Code2, Database, Layers3, Mail, Menu, Moon, Sun, X, ServerCog } from 'lucide-react'
import { useLanguage } from './context/LanguageContext'

// Custom SVGs for brand icons
const Github = ({ size = 18 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const Linkedin = ({ size = 18 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

type Project = {
  id: string;
  category: string;
  image: string;
  stack: string[];
  hasImpact?: boolean;
  url?: string;
}

const projects: Project[] = [
  { 
    id: 'real_estate', 
    category: 'fullstack', 
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80', 
    stack: ['ASP.NET Core', 'C# Desktop', 'Flutter', 'Web API'] 
  },
  { 
    id: 'erp_pos', 
    category: 'production', 
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80', 
    stack: ['NestJS', 'Redis', 'Next.js', 'Prisma'], 
    hasImpact: true,
    url: 'https://restaurant.mouadh-dev.workers.dev/'
  },
  { 
    id: 'dzstock', 
    category: 'desktop', 
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', 
    stack: ['.NET 10', 'WPF', 'EF Core', 'PostgreSQL'], 
    hasImpact: true 
  },
  { 
    id: 'microservices', 
    category: 'microservices', 
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80', 
    stack: ['Django REST', 'Docker', 'API Gateway', 'JWT'] 
  },
  { 
    id: 'multi_agents', 
    category: 'research', 
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80', 
    stack: ['JADE', 'FIPA-ACL', 'Contract Net'] 
  },
  { 
    id: 'hospital', 
    category: 'desktop', 
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80', 
    stack: ['C#', '.NET', 'SQL Server'] 
  },
  { 
    id: 'car_agency', 
    category: 'desktop', 
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80', 
    stack: ['Java Swing', 'MySQL'] 
  },
  { 
    id: 'bel_djazair', 
    category: 'fullstack', 
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80', 
    stack: ['React', 'Tailwind', 'Node.js'] 
  },
]

const competencies = [
  { id: 'backend', icon: ServerCog, items: ['C# / .NET Core', 'ASP.NET Core', 'Python / Django REST', 'Java'] },
  { id: 'data', icon: Database, items: ['SQL Server', 'PostgreSQL', 'MySQL', 'Redis'] },
  { id: 'architecture', icon: Layers3, items: ['Microservices', 'Docker', 'API Gateway', 'JWT Auth', 'Strategy / MVC'] },
  { id: 'tools', icon: Code2, items: ['Git / GitHub', 'VS Code', 'IntelliJ', 'Postman'] },
]

const steps = ['step1', 'step2', 'step3', 'step4', 'step5']

// Typing / Fade Word Reveal Component
const TitleReveal = ({ text }: { text: string }) => {
  const words = text.split(' ')
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: i * 0.12,
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1] as any
          }}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </>
  )
}

// Count-Up Animation Component on Viewport Enter
const CountUp = ({ value, duration = 1500 }: { value: string; duration?: number }) => {
  const [count, setCount] = useState(0)
  const [ref, setRef] = useState<HTMLElement | null>(null)
  
  const hasDigits = /\d/.test(value)
  const numeric = parseInt(value.replace(/\D/g, ''), 10) || 0
  const suffix = value.replace(/\d/g, '')

  useEffect(() => {
    if (!hasDigits || !ref) return
    let started = false

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        started = true
        let startTimestamp: number | null = null
        const step = (timestamp: number) => {
          if (!startTimestamp) startTimestamp = timestamp
          const progress = Math.min((timestamp - startTimestamp) / duration, 1)
          
          // Easing easeOutQuad for counts
          const easedProgress = progress * (2 - progress)
          setCount(Math.floor(easedProgress * numeric))
          
          if (progress < 1) {
            window.requestAnimationFrame(step)
          }
        }
        window.requestAnimationFrame(step)
      }
    }, { threshold: 0.1 })

    observer.observe(ref)
    return () => observer.disconnect()
  }, [ref, numeric, duration, hasDigits])

  if (!hasDigits) {
    return <span>{value}</span>
  }

  return <span ref={setRef}>{count}{suffix}</span>
}

// Magnetic Button Wrapper Component
const MagneticButton = ({ children }: { children: React.ReactNode }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) return

    const { clientX, clientY, currentTarget } = e
    const { left, top, width, height } = currentTarget.getBoundingClientRect()
    const x = clientX - (left + width / 2)
    const y = clientY - (top + height / 2)
    setPosition({ x: x * 0.35, y: y * 0.35 })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      style={{ display: 'inline-block' }}
    >
      {children}
    </motion.div>
  )
}

// 3D Tilt Card Wrapper Component
const TiltCard = ({ children, className, onClick, ...props }: any) => {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) return

    const card = e.currentTarget
    const box = card.getBoundingClientRect()
    const x = e.clientX - box.left - box.width / 2
    const y = e.clientY - box.top - box.height / 2
    
    // Tilt degree limit: 8deg
    const factor = 8
    const rX = -(y / (box.height / 2)) * factor
    const rY = (x / (box.width / 2)) * factor

    setRotateX(rX)
    setRotateY(rY)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: 'tween', ease: 'easeOut', duration: 0.15 }}
      style={{ transformStyle: 'preserve-3d' }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

function App() {
  const { language, setLanguage, t, dir } = useLanguage()
  const [light, setLight] = useState(false)
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState('tous')
  const [scrolled, setScrolled] = useState(false)
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)

  // Scroll details for parallax on Hero background
  const { scrollY } = useScroll()
  const yBg = useTransform(scrollY, [0, 800], [0, 110])

  useEffect(() => {
    document.documentElement.dataset.theme = light ? 'light' : 'dark'
  }, [light])

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedProjectId) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedProjectId])

  // Esc key closure support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProjectId(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Scroll state to hide indicators
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const filtered = filter === 'tous' ? projects : projects.filter(p => p.category === filter)

  // Hero section entry animation variants
  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15
      }
    }
  }

  const heroItemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any }
    }
  }

  // Project cards stagger animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.06,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as any
      }
    })
  }

  return (
    <main>
      {/* Sticky Glassmorphism Navigation */}
      <nav className="nav">
        <motion.a 
          className="brand" 
          href="#top"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {t('nav.brand')}<span>/</span>
        </motion.a>

        <div className={`nav-links ${open ? 'shown' : ''}`}>
          <a href="#about" onClick={() => setOpen(false)}>{t('nav.about')}</a>
          <a href="#projects" onClick={() => setOpen(false)}>{t('nav.projects')}</a>
          <a href="#contact" onClick={() => setOpen(false)}>{t('nav.contact')}</a>
        </div>

        <div className="nav-actions">
          <motion.button 
            className="lang-switch"
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🌐 {language === 'en' ? 'عربي' : 'EN'}
          </motion.button>

          <motion.button 
            className="icon-button" 
            aria-label="Changer de thème" 
            onClick={() => setLight(!light)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {light ? <Moon size={17}/> : <Sun size={18}/>}
          </motion.button>

          <motion.a 
            className="small-cta" 
            href="#contact"
            whileHover={{ x: dir === 'rtl' ? -3 : 3 }}
          >
            {t('nav.cta')} <ArrowUpRight size={15} className="card-arrow" />
          </motion.a>

          <button className="mobile-menu icon-button" onClick={() => setOpen(!open)}>
            {open ? <X/> : <Menu/>}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="top">
        {/* Parallax moving background grid */}
        <motion.div className="grid-bg" style={{ y: yBg }} />
        <div className="orb orb-one"/>
        <div className="orb orb-two"/>

        <motion.div 
          className="hero-content" 
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="eyebrow" variants={heroItemVariants}>
            <i/> {t('hero.eyebrow')}
          </motion.div>

          <motion.h1 variants={heroItemVariants} style={{ display: 'block' }}>
            <TitleReveal text={t('hero.title') + " " + t('hero.title_span')} />
          </motion.h1>

          <motion.p variants={heroItemVariants}>
            {t('hero.subtitle')}
          </motion.p>

          <motion.div className="hero-actions" variants={heroItemVariants}>
            <MagneticButton>
              <a className="primary-button" href="#projects">
                {t('hero.cta_projects')} <ArrowDownRight size={18}/>
              </a>
            </MagneticButton>
            
            <MagneticButton>
              <a className="secondary-button" href="#contact">
                {t('hero.cta_contact')} <ChevronRight size={18}/>
              </a>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Bouncing scroll indicator */}
        <AnimatePresence>
          {!scrolled && (
            <motion.div 
              className="scroll-indicator"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.85, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <span>{t('hero.scroll')}</span>
              <ArrowDownRight size={16} style={{ transform: 'rotate(45deg)' }} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="hero-meta">
          <span>{t('hero.scroll')}</span>
          <span className="line"/>
          <span>01 — 05</span>
        </div>
      </section>

      {/* About Section */}
      <motion.section 
        id="about" 
        className="section about"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <p className="section-kicker">{t('about.kicker')}</p>
        <div>
          <h2>
            {t('about.title_1')}<br/>
            <span>{t('about.title_span')}</span>
          </h2>
          <p className="intro">
            {t('about.intro')}
          </p>
          <div className="stats">
            <div>
              <b><CountUp value="08+" /></b>
              <span>{t('about.stats.projects')}</span>
            </div>
            <div>
              <b><CountUp value="04" /></b>
              <span>{t('about.stats.ecosystems')}</span>
            </div>
            <div>
              <b><CountUp value="∞" /></b>
              <span>{t('about.stats.passion')}</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Expertise Section */}
      <motion.section 
        className="section skills"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <p className="section-kicker">{t('skills.kicker')}</p>
        <h2>
          {t('skills.title_1')}<br/>
          <span>{t('skills.title_span')}</span>
        </h2>
        <div className="skill-grid">
          {competencies.map(({ id, icon: Icon, items }, i) => (
            <motion.article 
              className="skill-card" 
              key={id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <Icon size={25}/>
              <h3>{t('skills.categories.' + id)}</h3>
              <ul>
                {items.map(x => (
                  <li key={x}><Check size={14}/>{x}</li>
                ))}
              </ul>
              <span className="card-index">0{i + 1}</span>
            </motion.article>
          ))}
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section 
        className="section project-section" 
        id="projects"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <div className="project-heading">
          <div>
            <p className="section-kicker">{t('projects.kicker')}</p>
            <h2>
              {t('projects.title_1')}<br/>
              <span>{t('projects.title_span')}</span>
            </h2>
          </div>
          <p>{t('projects.subtitle')}</p>
        </div>

        {/* Filters */}
        <div className="filters">
          {['tous', 'production', 'fullstack', 'microservices', 'desktop', 'research'].map((id) => (
            <motion.button 
              className={filter === id ? 'active' : ''} 
              key={id} 
              onClick={() => setFilter(id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('projects.categories.' + id)}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div className="project-grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <TiltCard 
                layout
                className={`project-card project-${i % 5}`} 
                key={p.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9 }}
                custom={i}
                onClick={() => setSelectedProjectId(p.id)}
              >
                {/* Image Container with Zoom effect on hover */}
                <div className="project-image-container">
                  <img src={p.image} alt={t(`projects.items.${p.id}.title`)} className="project-image" loading="lazy" />
                  <div className="project-image-overlay">
                    <span className="project-view-btn">
                      {t('projects.view_project')} <ArrowUpRight size={14} className="card-arrow" />
                    </span>
                  </div>
                </div>

                <div className="project-card-content">
                  <div className="project-top">
                    <span className="badge">{t(`projects.items.${p.id}.badge`)}</span>
                    <ArrowUpRight className="card-arrow" size={20}/>
                  </div>
                  <div className="project-copy">
                    <h3>{t(`projects.items.${p.id}.title`)}</h3>
                    <p>{t(`projects.items.${p.id}.description`)}</p>
                  </div>
                  {p.hasImpact && (
                    <div className="impact">
                      <Box size={14}/>{t(`projects.items.${p.id}.impact`)}
                    </div>
                  )}
                  <div className="tags">
                    {p.stack.map(tag => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
              </TiltCard>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.section>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProjectId && (() => {
          const project = projects.find(p => p.id === selectedProjectId)
          if (!project) return null
          return (
            <motion.div 
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProjectId(null)}
            >
              <motion.div 
                className="modal-card"
                initial={{ scale: 0.9, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 30, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as any }}
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  className="modal-close-btn"
                  onClick={() => setSelectedProjectId(null)}
                  aria-label={t('projects.close_modal')}
                >
                  <X size={20} />
                </button>

                <img src={project.image} alt={t(`projects.items.${project.id}.title`)} className="modal-hero-image" />

                <div className="modal-body">
                  <div className="modal-header">
                    <h2>{t(`projects.items.${project.id}.title`)}</h2>
                    <span className="badge">{t(`projects.items.${project.id}.badge`)}</span>
                  </div>

                  <p className="modal-details">
                    {t(`projects.items.${project.id}.details`)}
                  </p>

                  <div className="modal-section-title">{t('projects.key_features')}</div>
                  <ul className="features-list">
                    {(t(`projects.items.${project.id}.features`) || []).map((feature: string, idx: number) => (
                      <li key={idx}>
                        <Check size={16} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {project.hasImpact && (
                    <>
                      <div className="modal-section-title">{t('projects.results_impact')}</div>
                      <div className="impact" style={{ marginTop: '0', marginBottom: '30px', fontSize: '14px' }}>
                        <Box size={16} />
                        <span>{t(`projects.items.${project.id}.impact`)}</span>
                      </div>
                    </>
                  )}

                  <div className="modal-section-title">{t('projects.tech_stack')}</div>
                  <div className="tags" style={{ marginTop: '0', marginBottom: '40px' }}>
                    {project.stack.map(tag => (
                      <span key={tag} style={{ fontSize: '12px', padding: '6px 10px' }}>{tag}</span>
                    ))}
                  </div>

                  <div className="modal-footer-actions">
                    {project.url && (
                      <motion.a 
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="primary-button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ background: 'var(--accent)', color: '#ffffff' }}
                      >
                        <ArrowUpRight size={16} /> {t('projects.view_live')}
                      </motion.a>
                    )}
                    <motion.a 
                      href="https://github.com/MouadH-Dev7"
                      target="_blank"
                      rel="noreferrer"
                      className="primary-button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={16} /> {t('projects.view_code')}
                    </motion.a>
                    <motion.button 
                      className="secondary-button" 
                      onClick={() => setSelectedProjectId(null)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {t('projects.close_modal')}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )
        })()}
      </AnimatePresence>

      {/* Process Section */}
      <motion.section 
        className="section process"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <div className="process-title">
          <h2>
            {t('process.title_1')}<br/>
            <span>{t('process.title_span')}</span>
          </h2>
          <p>{t('process.subtitle')}</p>
        </div>

        <div className="steps">
          {steps.map((stepId, i) => (
            <motion.div 
              className="step" 
              key={stepId}
              initial={{ opacity: 0, x: dir === 'rtl' ? 25 : -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <span>0{i + 1}</span>
              <div>
                <h3>{t(`process.steps.${stepId}.title`)}</h3>
                <p>{t(`process.steps.${stepId}.text`)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Redesigned Contact Section (Simple and Centered) */}
      <motion.section 
        className="contact-centered" 
        id="contact"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <div className="contact-glow"/>
        
        <p className="section-kicker">{t('contact.kicker')}</p>
        
        <h2>
          {t('contact.title_1')} <br/>
          <span>{t('contact.title_span')}</span>
        </h2>
        
        <p>
          {t('contact.subtitle')}
        </p>

        <div className="contact-actions">
          <MagneticButton>
            <a href="mailto:mouadh.dev@gmail.com" className="primary-button" style={{ padding: '16px 32px', fontSize: '15px' }}>
              <Mail size={18} /> {t('contact.send_email')}
            </a>
          </MagneticButton>

          <div className="contact-socials-grid">
            <motion.a 
              href="https://github.com/MouadH-Dev7" 
              target="_blank" 
              rel="noreferrer" 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={18}/> {t('contact.github_btn')}
            </motion.a>
            
            <motion.a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer" 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin size={18}/> {t('contact.linkedin_btn')}
            </motion.a>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer>
        <a className="brand" href="#top">{t('nav.brand')}<span>/</span></a>
        <span>{t('footer.note')} — {new Date().getFullYear()}</span>
        <a href="#top">{t('footer.top')}</a>
      </footer>
    </main>
  )
}

export default App
