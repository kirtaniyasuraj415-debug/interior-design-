"use client";

import { useEffect, useRef, useState, type FormEvent, type CSSProperties } from "react";
import { ArrowDown, ArrowUpRight, ChevronLeft, ChevronRight, CircleUserRound, HeartHandshake, LampDesk, Leaf, Menu, Sofa, UserRound, Check, LoaderCircle } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const projects = [
  { name: "Warm Minimal Residence", location: "Residential Interior", image: "arched-kitchen", description: "A calm, warm interior language built around natural timber, softened geometry, layered lighting, and practical everyday storage.", scope: "Living · Kitchen · Storage" },
  { name: "Sunlit Kitchen Concept", location: "Kitchen Design", image: "sunlit-kitchen", description: "A light-first kitchen concept balancing natural wood, clean work surfaces, concealed storage, and an uncluttered visual rhythm.", scope: "Kitchen · Joinery · Lighting" },
  { name: "Garden Living Suite", location: "Living Space", image: "window-corner", description: "An indoor-outdoor living concept designed around daylight, comfortable circulation, tactile materials, and a relaxed connection to greenery.", scope: "Living · Styling · Space Planning" },
  { name: "Soft Neutral Lounge", location: "Living Room", image: "sofa", description: "A refined lounge direction using warm neutrals, sculptural furniture, layered textiles, and quiet statement pieces.", scope: "Living · Furniture · Styling" },
  { name: "Olive Reading Corner", location: "Styling Concept", image: "craft", description: "A compact reading zone with a strong material palette, crafted furniture, soft upholstery, and useful display storage.", scope: "Furniture · Styling · Decor" },
  { name: "Focused Home Office", location: "Workspace", image: "writing-desk", description: "A focused workspace concept that keeps visual noise low while prioritising ergonomic layout, warm lighting, and practical storage.", scope: "Workspace · Lighting · Storage" },
];
type Project = (typeof projects)[number];

const about = "We create thoughtful interiors around the way people actually live — balancing space planning, material choices, lighting, storage, comfort, and a clear design story from first idea to final handover.";

const services = [
  { title: "Residential Interiors", icon: Sofa, text: "Complete home interiors with a cohesive design language across living, dining, bedrooms, storage, lighting, and styling." },
  { title: "Kitchen & Storage", icon: LampDesk, text: "Functional modular kitchens, wardrobes, and built-in storage planned around movement, access, durability, and finish." },
  { title: "Commercial Spaces", icon: HeartHandshake, text: "Customer-facing and work environments designed to support brand identity, efficient flow, and a strong first impression." },
  { title: "Renovation & Styling", icon: Leaf, text: "Focused transformations for existing spaces through layout refinement, finishes, furniture, lighting, and decor direction." },
];

const process = [
  ["01", "Discovery", "We understand your space, priorities, lifestyle, practical needs, preferred style, and budget direction."],
  ["02", "Site & Planning", "Measurements and constraints are translated into a clear layout and circulation plan before visual detailing begins."],
  ["03", "Concept Design", "Mood, palette, materials, furniture direction, lighting, and key design moments are developed into one language."],
  ["04", "3D & Detailing", "The concept is resolved through visualisation, elevations, joinery thinking, and practical specifications."],
  ["05", "Execution", "Materials, vendors, site coordination, and design decisions are aligned so the approved concept survives construction."],
  ["06", "Handover", "Final detailing, styling, quality checks, and practical walkthrough bring the finished space together."],
];

const features = [
  { title: "Designed Around You", icon: HeartHandshake, text: "The layout starts with how you live and move, not with a fixed catalogue.", detail: "Good interiors solve real routines first. We plan circulation, storage, comfort, and visual priorities around the people using the space." },
  { title: "Material Clarity", icon: Leaf, text: "Finishes are selected as a system so wood, stone, colour, metal, and fabric feel intentional together.", detail: "Material decisions are considered together rather than one at a time, reducing visual mismatch and making approvals easier." },
  { title: "Practical Space Planning", icon: Sofa, text: "Every major piece has a reason, a proportion, and enough breathing room to work in daily life.", detail: "Space planning protects movement, ergonomics, usable storage, and furniture scale before decorative choices take over." },
  { title: "One Design Language", icon: LampDesk, text: "Lighting, furniture, joinery, styling, and architectural details are developed as one connected composition.", detail: "A consistent design language prevents rooms from feeling disconnected and gives the full home or workspace a more resolved identity." },
];

const testimonials = [
  { quote: "The strongest part of the process was clarity — every room had a purpose and the material palette felt consistent from one space to the next.", label: "Sample client feedback", project: "Full-home interior" },
  { quote: "The design balanced storage and openness instead of sacrificing one for the other. The final direction felt calm, practical, and considered.", label: "Sample client feedback", project: "Apartment renovation" },
  { quote: "We could understand the design decisions before execution started, which made approvals faster and reduced unnecessary changes on site.", label: "Sample client feedback", project: "Living + kitchen" },
];

const faqs = [
  ["When should I contact an interior designer?", "Ideally before major civil, electrical, plumbing, ceiling, or fixed-joinery decisions are locked. Early involvement gives the design more control over layout and avoids expensive rework."],
  ["Do you handle only complete homes?", "No. The process can be structured for a complete home, selected rooms, kitchens and storage, commercial spaces, or focused renovation and styling work."],
  ["How long does an interior project take?", "Timelines depend on scope, site condition, approvals, material lead times, and execution complexity. A reliable timeline should be agreed after the site and scope are understood."],
  ["Can the design work around an existing budget?", "Yes. Budget should guide design decisions from the beginning. Materials, custom work, furniture, and execution priorities can be phased or adjusted to protect the most important design outcomes."],
  ["Do you provide 3D design before execution?", "A professional workflow can include concept visuals and 3D views before execution so layout, materials, and major design moments can be reviewed before site work advances."],
  ["Can I use my own contractor or vendors?", "That can be possible depending on the project. The important part is defining responsibilities clearly so design decisions, measurements, timelines, and quality checks do not fall between teams."],
];

const navItems = [["Home", "home"], ["Services", "services"], ["Projects", "projects"], ["Process", "process"], ["About", "about"], ["Contact", "contact"]];

function Photo({ name, alt, className = "", eager = false }: { name: string; alt: string; className?: string; eager?: boolean }) {
  return <img className={className} src={`/images/${name}.webp`} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" />;
}

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [info, setInfo] = useState<{ title: string; text: string } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [enquiry, setEnquiry] = useState(false);
  const [topic, setTopic] = useState("");
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("idle");
  const [newsletterError, setNewsletterError] = useState("");
  const [formStatus, setFormStatus] = useState("idle");
  const [formError, setFormError] = useState("");
  const [railIndex, setRailIndex] = useState(0);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.13 });
    node.querySelectorAll("[data-reveal]").forEach(el => observer.observe(el));
    const words = [...node.querySelectorAll<HTMLElement>(".about-word")];
    const aboutSection = node.querySelector<HTMLElement>(".about-section")!;
    const story = node.querySelector<HTMLElement>(".story-section")!;
    const floats = [...node.querySelectorAll<HTMLElement>(".story-photo")];
    const hero = node.querySelector<HTMLElement>(".hero-image")!;
    let frame = 0;
    let ticking = false;
    const update = () => {
      ticking = false;
      const height = window.innerHeight;
      const reduced = media.matches;
      const a = aboutSection.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (height * 0.82 - a.top) / (a.height * 0.75)));
      words.forEach((el, i) => el.classList.toggle("is-read", reduced || progress >= i / words.length));
      const rect = story.getBoundingClientRect();
      const storyProgress = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height - height)));
      floats.forEach((el, i) => {
        const p = (storyProgress - i * 0.13) / 0.32;
        el.style.transform = reduced ? "none" : `translate3d(0,${height * (0.95 - p * 1.45)}px,0)`;
        el.style.opacity = reduced ? "1" : String(Math.max(0, Math.min(1, p * 4, (1.3 - p) * 4)));
      });
      if (!reduced && window.scrollY < height * 1.4) hero.style.transform = `translate3d(0,${Math.min(window.scrollY * 0.16, height * 0.2)}px,0) scale(1.025)`;
    };
    const schedule = () => { if (!ticking) { ticking = true; frame = requestAnimationFrame(update); } };
    node.classList.add("motion-ready"); update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule); media.addEventListener("change", schedule);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); media.removeEventListener("change", schedule); };
  }, []);

  function openEnquiry(value = "") { setProject(null); setInfo(null); setTopic(value); setFormStatus("idle"); setFormError(""); setEnquiry(true); }
  function moveRail(direction: number) {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>(".product-card");
    rail.scrollBy({ left: ((card?.offsetWidth || 300) + 24) * direction, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  async function subscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); if (newsletterStatus === "sending") return; setNewsletterStatus("sending");
    try {
      const response = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      const data = await response.json() as { error?: string }; if (!response.ok) throw new Error(data.error || "We couldn’t save your email. Please try again.");
      setNewsletterStatus("success"); setEmail("");
    } catch (error) { setNewsletterError(error instanceof Error ? error.message : "Please try again."); setNewsletterStatus("error"); }
  }
  async function sendEnquiry(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); const values = Object.fromEntries(new FormData(e.currentTarget)); setFormStatus("sending");
    try {
      const response = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const data = await response.json() as { error?: string }; if (!response.ok) throw new Error(data.error || "Your enquiry couldn’t be saved. Please try again.");
      setFormStatus("success");
    } catch (error) { setFormError(error instanceof Error ? error.message : "Please try again."); setFormStatus("error"); }
  }

  return <div ref={root}>
    <a className="skip-link" href="#about">Skip to content</a>
    <main>
      <section className="hero" id="home" aria-labelledby="hero-title">
        <Photo name="hero" alt="Warm contemporary interior with crafted furniture" className="hero-image" eager /><div className="hero-shade" />
        <header className="site-header"><a href="#home" className="brand" aria-label="Furnt Studio home">Furnt.</a><nav className="desktop-nav" aria-label="Main navigation">{navItems.map(([name, id], i) => <a className={i === 0 ? "active" : ""} key={id} href={`#${id}`}>{name}</a>)}</nav><button className="header-contact" aria-label="Book a consultation" onClick={() => openEnquiry("interior design consultation")}><CircleUserRound size={25} strokeWidth={1.5} /></button><button className="mobile-menu-button" aria-label="Open menu" onClick={() => setMenuOpen(true)}><Menu size={25} /></button></header>
        <div className="hero-copy"><span className="hero-kicker">Interior Design Studio</span><h1 id="hero-title">Spaces Designed Around<br />the Way You Live</h1><p>From first layout to final styling, we shape warm, functional interiors<br className="desktop-break" /> with a clear design language and practical detail.</p><button className="pill hero-cta" onClick={() => openEnquiry("interior design consultation")}>Book a Consultation <ArrowUpRight size={16}/></button></div>
        <a className="scroll-cue" href="#about"><span>Explore Studio</span><span className="mouse"><span /></span></a>
      </section>

      <section className="about-section section-wrap" id="about" aria-labelledby="about-title"><span className="eyebrow">About the studio</span><h2 id="about-title" className="about-text" aria-label={about}>{about.split(" ").map((word, i) => <span aria-hidden="true" className="about-word" key={i}>{word}{" "}</span>)}</h2></section>

      <section className="services-section section-wrap" id="services" aria-labelledby="services-title">
        <div className="section-heading" data-reveal><span className="eyebrow">What we design</span><h2 id="services-title">Interior services built around the whole space</h2><p>Each service connects planning, visual direction, materials, storage, lighting, furniture, and execution thinking instead of treating them as separate decisions.</p></div>
        <div className="services-grid">{services.map((service,i)=><article className="service-card" data-reveal style={{"--delay":`${i*80}ms`} as CSSProperties} key={service.title}><span className="service-number">0{i+1}</span><service.icon size={48} strokeWidth={1.15}/><h3>{service.title}</h3><p>{service.text}</p><button className="service-link" onClick={()=>openEnquiry(service.title)}>Discuss this service <ArrowUpRight size={16}/></button></article>)}</div>
      </section>

      <section className="craft-section studio-approach" aria-label="Our interior design approach">
        <article className="craft-row" data-reveal><div className="craft-copy"><span className="eyebrow">Space planning</span><h2>Start with how the room needs to work</h2><p>Before finishes and decor, we resolve movement, furniture scale, storage, daylight, and the practical relationships between spaces. Strong planning makes the visual design feel effortless.</p><a href="#process" className="pill olive">See Our Process</a></div><div className="craft-image round-right"><Photo name="writing-desk" alt="Warm interior workspace with natural materials" /></div></article>
        <article className="craft-row reverse" data-reveal><div className="craft-image round-left"><Photo name="craft" alt="Crafted furniture and styled interior corner" /></div><div className="craft-copy"><span className="eyebrow">Material direction</span><h2>Build one clear visual language</h2><p>Wood, stone, metal, colour, fabric, lighting, and joinery are considered together. The goal is not to add more things — it is to make every visible decision belong to the same story.</p><button className="pill olive" onClick={() => openEnquiry("material and interior design consultation")}>Start a Conversation</button></div></article>
      </section>

      <section className="products-section section-wrap" id="projects" aria-labelledby="projects-title">
        <div className="section-heading" data-reveal><span className="eyebrow">Selected projects</span><h2 id="projects-title">Spaces with a distinct point of view</h2><p>Concept projects showing how different rooms can be shaped through proportion, material, lighting, furniture, and atmosphere.</p></div>
        <div ref={railRef} className="product-rail" onScroll={() => setRailIndex(Math.round(railRef.current?.scrollLeft || 0))} aria-label="Interior design projects">{projects.map((p, i) => <button data-reveal className="product-card project-card" style={{ "--delay": `${Math.min(i, 3) * 100}ms` } as CSSProperties} key={p.name} onClick={() => setProject(p)}><div className="product-photo project-photo"><Photo name={p.image} alt={p.name} /><span className="product-open"><ArrowUpRight size={23} /></span></div><div className="product-caption"><h3>{p.name}</h3><span>{String(i+1).padStart(2,"0")}</span></div><p>{p.location} · {p.scope}</p></button>)}</div>
        <div className="carousel-controls"><button aria-label="Previous projects" disabled={railIndex < 2} onClick={() => moveRail(-1)}><ChevronLeft size={21} /></button><button aria-label="Next projects" onClick={() => moveRail(1)} disabled={!!railRef.current && railIndex >= railRef.current.scrollWidth - railRef.current.clientWidth - 3}><ChevronRight size={21} /></button></div>
      </section>

      <section className="transformation-section section-wrap" aria-labelledby="transformation-title">
        <div className="transformation-copy" data-reveal><span className="eyebrow">Before & after thinking</span><h2 id="transformation-title">A transformation starts before the finishes</h2><p>This concept comparison shows the kind of shift thoughtful planning can create: from an under-defined room to a space with clearer zoning, warmer materials, better light, and a stronger focal point.</p><button className="pill olive" onClick={()=>openEnquiry("space transformation")}>Plan My Space <ArrowUpRight size={16}/></button></div>
        <div className="before-after" data-reveal><figure><Photo name="window-corner" alt="Reference interior before design refinement"/><figcaption><span>Before</span><small>Reference condition</small></figcaption></figure><figure><Photo name="sunlit-kitchen" alt="Interior after design direction"/><figcaption><span>After</span><small>Design direction</small></figcaption></figure></div>
      </section>

      <section className="process-section" id="process" aria-labelledby="process-title">
        <div className="section-wrap"><div className="process-head" data-reveal><div><span className="eyebrow">How we work</span><h2 id="process-title">From first conversation to final handover</h2></div><p>A defined process keeps the creative work exciting without making the project chaotic. Each stage solves a different set of decisions before the next one begins.</p></div>
        <div className="process-grid">{process.map(([number,title,textValue],i)=><article className="process-step" data-reveal style={{"--delay":`${i*70}ms`} as CSSProperties} key={title}><span>{number}</span><h3>{title}</h3><p>{textValue}</p></article>)}</div></div>
      </section>

      <section className="story-section" id="collection" aria-labelledby="story-title"><div className="story-sticky"><h2 id="story-title">Good interiors feel calm<br className="desktop-break" /> because the difficult decisions<br className="desktop-break" /> have already been resolved.</h2>{[["olive-chairs","Olive chairs in afternoon light"],["window-corner","Interior connected to a green garden"],["arched-kitchen","Arched interior with timber cabinetry"],["bedside","Sculpted storage with a soft lamp"],["craft","Styled chair and wooden shelf"],["sunlit-kitchen","Sunlight across natural wood cabinetry"]].map(([name,alt],i) => <div className={`story-photo story-photo-${i}`} key={name}><Photo name={name} alt={alt} /></div>)}</div></section>

      <section className="features-section section-wrap" aria-labelledby="features-title"><div className="section-heading" data-reveal><span className="eyebrow">Why work with us</span><h2 id="features-title">A design process with fewer disconnected decisions</h2><p>The objective is simple: make the space look resolved while keeping it practical to live with, execute, and maintain.</p></div><div className="features-grid">{features.map((feature,i) => <article className="feature-card" data-reveal style={{"--delay":`${i*80}ms`} as CSSProperties} key={feature.title}><feature.icon size={58} strokeWidth={1.15} /><h3>{feature.title}</h3><p>{feature.text}</p><button className="pill outline" onClick={() => setInfo({title:feature.title,text:feature.detail})}>Know More</button></article>)}</div></section>

      <section className="testimonials-section section-wrap" aria-labelledby="testimonials-title">
        <div className="testimonial-head" data-reveal><div><span className="eyebrow">Testimonials</span><h2 id="testimonials-title">The experience should feel as considered as the space</h2></div><p className="sample-note">Sample testimonial layout — replace these with verified client reviews before using them as real endorsements.</p></div>
        <div className="testimonial-grid">{testimonials.map((item,i)=><blockquote className="testimonial-card" data-reveal style={{"--delay":`${i*90}ms`} as CSSProperties} key={i}><span className="quote-mark">“</span><p>{item.quote}</p><footer><strong>{item.label}</strong><span>{item.project}</span></footer></blockquote>)}</div>
      </section>

      <section className="studio-section section-wrap" aria-labelledby="studio-title">
        <div className="studio-photo" data-reveal><Photo name="craft" alt="Interior studio material and furniture direction"/></div>
        <div className="studio-copy" data-reveal><span className="eyebrow">Meet the studio</span><h2 id="studio-title">Design direction and execution should speak the same language</h2><p>Our studio section is intentionally role-based until real team profiles are added. Use it to introduce the founder, lead designer, site team, collaborators, and the philosophy behind the work without inventing identities.</p><div className="studio-roles"><div><strong>Design Lead</strong><span>Concept · Planning · Material Direction</span></div><div><strong>Execution Team</strong><span>Coordination · Detailing · Site Quality</span></div></div><button className="pill olive" onClick={()=>openEnquiry("studio consultation")}>Meet the Studio <ArrowUpRight size={16}/></button></div>
      </section>

      <section className="faq-section section-wrap" aria-labelledby="faq-title">
        <div className="faq-intro" data-reveal><span className="eyebrow">FAQ</span><h2 id="faq-title">Questions worth answering before a project starts</h2><p>Clear expectations around scope, process, budget, and responsibilities prevent avoidable problems later.</p></div>
        <div className="faq-list">{faqs.map(([q,a],i)=><details data-reveal style={{"--delay":`${i*55}ms`} as CSSProperties} key={q}><summary><span>{String(i+1).padStart(2,"0")}</span>{q}<b>+</b></summary><p>{a}</p></details>)}</div>
      </section>

      <section className="consultation-section" aria-labelledby="consultation-title">
        <Photo name="hero" alt="" className="consultation-bg"/><div className="consultation-shade"/>
        <div className="consultation-inner" data-reveal><span className="eyebrow">Start your project</span><h2 id="consultation-title">Have a space that needs a clearer direction?</h2><p>Tell us what you are planning, what is not working today, and what you want the finished space to feel like.</p><button className="pill" onClick={()=>openEnquiry("interior design consultation")}>Book a Consultation <ArrowUpRight size={16}/></button></div>
      </section>

      <footer className="site-footer" id="contact"><div className="footer-top"><div className="footer-visit"><h2>Interior studio</h2><p>Thoughtful spaces.<br />Designed around real life.</p><button className="footer-enquiry" onClick={() => openEnquiry("interior design consultation")}>Talk to our studio <ArrowUpRight size={15}/></button></div><div><h2>Services</h2>{services.map(item=><a className="footer-link" href="#services" key={item.title}>{item.title}</a>)}</div><div><h2>Quick links</h2>{[["Home","home"],["About","about"],["Projects","projects"],["Process","process"],["Contact","contact"]].map(([name,id]) => <a className="footer-link" href={`#${id}`} key={name}>{name}</a>)}</div><div className="newsletter"><label htmlFor="newsletter-email">Interior notes, ideas, and project inspiration.</label><form onSubmit={subscribe}><div className="email-field"><UserRound size={17}/><input id="newsletter-email" name="email" type="email" placeholder="Enter your email" autoComplete="email" maxLength={254} value={email} required onChange={e=>{setEmail(e.target.value);if(newsletterStatus!=="sending")setNewsletterStatus("idle");}}/></div><button className="pill" disabled={newsletterStatus==="sending"||newsletterStatus==="success"} aria-label="Join newsletter">{newsletterStatus==="sending"?<LoaderCircle className="spin" size={18}/>:newsletterStatus==="success"?<Check size={18}/>:"Join"}</button></form><p className="form-message" role="status">{newsletterStatus==="success"?"You’re on the list. Thank you for joining.":newsletterStatus==="error"?newsletterError:""}</p></div></div><a className="footer-wordmark" href="#home" aria-label="Furnt Studio, back to top">Furnt.</a><div className="footer-bottom"><span>© {new Date().getFullYear()} Furnt Studio. All rights reserved.</span><a href="#home">Back to top <ArrowDown size={14} className="up-arrow"/></a></div></footer>
    </main>

    <Dialog open={menuOpen} onOpenChange={setMenuOpen}><DialogContent className="mobile-nav-dialog"><DialogTitle>Furnt.</DialogTitle><DialogDescription className="sr-only">Explore the interior design studio</DialogDescription><nav aria-label="Mobile navigation">{navItems.map(([name,id]) => <a key={id} href={`#${id}`} onClick={()=>setMenuOpen(false)}>{name}<ArrowUpRight size={24}/></a>)}</nav></DialogContent></Dialog>
    <Dialog open={!!project} onOpenChange={open=>!open&&setProject(null)}><DialogContent className="product-dialog">{project&&<><Photo name={project.image} alt={project.name} className="detail-photo"/><div className="detail-copy"><span className="eyebrow">{project.location}</span><DialogTitle>{project.name}</DialogTitle><DialogDescription>{project.description}</DialogDescription><div className="detail-price">{project.scope}</div><p className="detail-note">Concept portfolio content. Replace project names/details with verified client work before presenting them as completed commissions.</p><button className="pill olive" onClick={()=>openEnquiry(project.name)}>Discuss a similar space <ArrowUpRight size={16}/></button></div></>}</DialogContent></Dialog>
    <Dialog open={!!info} onOpenChange={open=>!open&&setInfo(null)}><DialogContent className="info-dialog">{info&&<><span className="eyebrow">Furnt studio</span><DialogTitle>{info.title}</DialogTitle><DialogDescription>{info.text}</DialogDescription><button className="pill olive" onClick={()=>openEnquiry(info.title)}>Talk to the studio <ArrowUpRight size={16}/></button></>}</DialogContent></Dialog>
    <Dialog open={enquiry} onOpenChange={setEnquiry}><DialogContent className="enquiry-dialog"><span className="eyebrow">Start a project</span><DialogTitle>{formStatus==="success"?"Thank you for your enquiry.":"Tell us about your space."}</DialogTitle><DialogDescription>{formStatus==="success"?"Your details have been saved for the studio to review.":"Share the project type, location, approximate scope, and what you want to improve."}</DialogDescription>{formStatus==="success"?<button className="pill olive" onClick={()=>setEnquiry(false)}>Back to exploring <ArrowUpRight size={16}/></button>:<form className="enquiry-form" onSubmit={sendEnquiry}><label>Your name<input name="name" required autoComplete="name" maxLength={100}/></label><label>Email address<input name="email" type="email" required autoComplete="email" maxLength={254}/></label><label>Tell us about the project<textarea name="message" required maxLength={3000} rows={4} defaultValue={topic?`I’m interested in ${topic}. `:""}/></label><input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"/><button className="pill olive" disabled={formStatus==="sending"}>{formStatus==="sending"?<><LoaderCircle size={16} className="spin"/> Sending…</>:<>Send enquiry <ArrowUpRight size={16}/></>}</button><p role="status" className="form-error">{formStatus==="error"?formError:""}</p></form>}</DialogContent></Dialog>
  </div>;
}
