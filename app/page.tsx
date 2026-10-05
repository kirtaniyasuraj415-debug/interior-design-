"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowDown, ArrowUpRight, CheckCircle2, ChevronLeft, ChevronRight, Clock3, HeartHandshake, LampDesk, Leaf, MapPin, Menu, Phone, Sofa, Star } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

const MAP_URL = "https://maps.app.goo.gl/aygM16ZHC6QJfFrZ6?g_st=ac";
const PHONE_DISPLAY = "+91 90522 23812";
const PHONE_LINK = "+919052223812";
const ADDRESS = "Shop No. G2, Grace Residency, Puppalaguda – Manikonda, Shirdi Sai Nagar, Hyderabad, Telangana 500089";

const images = {
  hero: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWkEaXqy5h3lknjwUdas6Fjk8qUf7mRvZvSOzakOL8Iy0UBlR34KECkXJct097NqZsUzKX_OBU4UtSKE3oYaI4YMsDdvLr3V9ncgQBP-uP7yRBWrsZlVfU2cPwNvUK2ElN2n-yeyOqWLs7Mg=w1600",
  living: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWl9hQdptS_FyYIlJUm_DVLCJ9XVdqrnm6EFzd4C5J3CW8lafLpdNuOKIrtLnKH4f5pSriHb6NQ8hjDfH5oQY0-dwD7PcRIgMiJ_eMk-JASGWgFCgTohILK9ffC8KPh-Uc6sMyJBbgfC1zOD=s2048-v1",
  kitchen: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWn_8Dj042AYlNI3sVdnLZE3wi8xVVGkZLtmWNe3RTpiWI5aUwDqX6o3c3KME_v3ohoXsl7e2JGRTEvJgcQYRQKEo_7QV1uvYuu5lDnTiYwBfIffl9FQh1YEKTDnS-5d_CUfTsCnLRVgnzUm=s2048-v1",
  wardrobe: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWl7WD348JJI-eTHFJuu-D8BtRf4MmM6c5OZMfJ8iK7rJsg5ujS8ts5Ui9EnIRISroCdWMvT0sdKHmyn3mR2HnjanbBr5ZD8-cHE4YSwbXRRCosVG1WnzGntRsJ6tJnqIpFqQBDsK39c0Hi_=s2048-v1",
  studio: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWklezTFnuGQDR0gW_Y0bkqZYohdrxebkyBaUoqqb5CGnpnUJC6g7mB_1NQ8UBkc3K2o-ipOq4yqYVokfj7Mkp2LgQlkOcB_-qdxQt4JJNd9pA9tFPY4dZnqLb5nSuMHX2xwfz14iUdHOA-R=w1600",
};

const stats = [["4.8/5", "Google rating"], ["72", "Google reviews"], ["24 hours", "Listed hours"], ["Hyderabad", "Manikonda studio"]];

const services = [
  { title: "Modular Kitchens", icon: LampDesk, image: images.kitchen, text: "Kitchen planning and modular cabinetry, listed at the Creative Interiorz studio." },
  { title: "Wardrobes", icon: CheckCircle2, image: images.wardrobe, text: "Wardrobe and storage solutions shown among the studio’s listed interior services." },
  { title: "False Ceilings", icon: Leaf, image: images.living, text: "False-ceiling and lighting-focused interior work for a more finished room." },
  { title: "TV Units", icon: Sofa, image: images.hero, text: "Custom TV-unit and entertainment-wall detailing for living spaces." },
  { title: "Custom Furniture", icon: HeartHandshake, image: images.living, text: "Customised furniture support for home interiors and everyday use." },
  { title: "Wall Panels & Finishes", icon: CheckCircle2, image: images.hero, text: "PVC panelling, wallpapers, glass and SS-railing work listed at the studio." },
];

const projects = [
  { title: "Marble-Feature TV Unit", type: "Living room", image: images.hero, text: "A high-contrast TV wall with black-and-gold marble-look panelling, fluted wood and a low storage unit." },
  { title: "Contemporary Modular Kitchen", type: "Kitchen", image: images.kitchen, text: "Glossy cabinetry, integrated storage, a chimney zone and a stone-look backsplash." },
  { title: "Light-Tone Entertainment Wall", type: "TV unit", image: images.living, text: "A clean white-and-grey TV wall with low cabinetry, lighting accents and an open, bright room feel." },
  { title: "Sliding Wardrobe Storage", type: "Storage", image: images.wardrobe, text: "Full-height sliding wardrobe storage with overhead cabinets for additional capacity." },
];

const process = [
  ["01", "Call or get directions", "Use the listed phone number or Google Maps directions to reach Creative Interiorz."],
  ["02", "Share your requirement", "Discuss the room, service and style you need for your home or workspace."],
  ["03", "Visit the studio", "Meet the team at the Manikonda studio to review options and next steps."],
  ["04", "Plan the scope", "Confirm materials, service scope and execution details directly with the studio."],
  ["05", "Interior execution", "Move forward on the agreed interior work with the Creative Interiorz team."],
  ["06", "Final walkthrough", "Review the completed work and finishing details at your space."],
];

const highlights = [
  { title: "Interior designer", icon: HeartHandshake, text: "Creative Interiorz is listed on Google Maps as an interior designer in Manikonda, Hyderabad." },
  { title: "Open 24 hours", icon: Clock3, text: "The Google Maps listing shows the studio as open 24 hours, Monday through Sunday." },
  { title: "Google Maps location", icon: MapPin, text: "Shop No. G2, Grace Residency, Puppalaguda – Manikonda, Hyderabad 500089." },
  { title: "Call the studio", icon: Phone, text: "Use the listing’s phone number to discuss interior requirements directly with the team." },
];

const roomCategories = [
  { name: "Modular Kitchen", text: "Cabinetry, work zones and storage suited to daily cooking.", image: images.kitchen },
  { name: "TV Unit & Living Wall", text: "Feature walls, media units and lighting details for living spaces.", image: images.hero },
  { name: "Wardrobe & Storage", text: "Sliding or full-height storage that makes better use of available space.", image: images.wardrobe },
  { name: "Wall Panelling & Ceiling", text: "PVC panelling, wallpapers and false-ceiling finishes for a complete look.", image: images.living },
];

const reviews = [
  { title: "Beautiful transformation", text: "Their hard work and creativity truly transformed the space beautifully." },
  { title: "Attention to detail", text: "Their creativity, attention to detail, and professionalism made my space look stunning." },
  { title: "Recommended by customers", text: "Their creative approach and attention to detail really transformed my space." },
];

const faqs = [
  ["Where is Creative Interiorz located?", ADDRESS],
  ["What are the studio’s listed hours?", "Google Maps lists Creative Interiorz as open 24 hours from Monday through Sunday."],
  ["How can I contact the studio?", "Call " + PHONE_DISPLAY + " or use the Google Maps directions link on this page."],
  ["What interior services are shown at the studio?", "The studio signage lists modular kitchens, wardrobes, false ceilings, TV units, customised furniture, glass and SS railing, wallpapers and PVC panelling."],
  ["What do clients say?", "The Google Maps listing shows a 4.8 rating from 72 reviews, with reviewers praising creativity, attention to detail and professional work."],
];

const navItems = [["Home", "home"], ["Services", "services"], ["Projects", "projects"], ["Process", "process"], ["Studio", "studio"], ["Contact", "contact"]];

function Photo({ src, alt, className = "", eager = false }: { src: string; alt: string; className?: string; eager?: boolean }) {
  return <img src={src} alt={alt} className={className} loading={eager ? "eager" : "lazy"} decoding="async" referrerPolicy="no-referrer" />;
}

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState<(typeof projects)[number] | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactTopic, setContactTopic] = useState("your interior project");
  const [railIndex, setRailIndex] = useState(0);

  function openContact(topic = "your interior project") {
    setSelected(null);
    setContactTopic(topic);
    setContactOpen(true);
  }

  function moveRail(direction: number) {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>(".product-card");
    rail.scrollBy({ left: ((card?.offsetWidth || 300) + 24) * direction, behavior: "smooth" });
  }

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.13 });
    node.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    node.classList.add("motion-ready");
    return () => observer.disconnect();
  }, []);

  return <div ref={root}>
    <a className="skip-link" href="#about">Skip to content</a>
    <main>
      <section className="hero" id="home" aria-labelledby="hero-title">
        <Photo src={images.hero} alt="Creative Interiorz TV unit and feature wall project" className="hero-image" eager />
        <div className="hero-shade" />
        <header className="site-header">
          <a href="#home" className="brand brand-homelane" aria-label="Creative Interiorz home">Creative Interiorz</a>
          <nav className="desktop-nav" aria-label="Main navigation">{navItems.map(([name, id], index) => <a className={index === 0 ? "active" : ""} href={"#" + id} key={id}>{name}</a>)}</nav>
          <a className="header-contact" href={"tel:" + PHONE_LINK} aria-label={"Call Creative Interiorz at " + PHONE_DISPLAY}><Phone size={22} /></a>
          <button className="mobile-menu-button" aria-label="Open menu" onClick={() => setMenuOpen(true)}><Menu size={25} /></button>
        </header>
        <div className="hero-copy homelane-hero">
          <span className="hero-kicker">Interior designer · Manikonda, Hyderabad</span>
          <h1 id="hero-title">Interiors That Feel<br />Made for Your Home</h1>
          <p>Creative Interiorz brings together modular kitchens, wardrobes, false ceilings,<br className="desktop-break" /> TV units, custom furniture and finish work for your space.</p>
          <div className="hero-actions"><button className="pill hero-cta" onClick={() => openContact("a home interior consultation")}>Contact the Studio <ArrowUpRight size={16} /></button><a className="pill hero-cta ghost-pill" href={MAP_URL} target="_blank" rel="noreferrer">Get Directions <MapPin size={16} /></a></div>
          <div className="rating-chip"><Star size={16} fill="currentColor" /><strong>4.8</strong><span>Google · 72 reviews</span></div>
        </div>
        <a className="scroll-cue" href="#about"><span>Explore Creative Interiorz</span><span className="mouse"><span /></span></a>
      </section>

      <section className="about-section section-wrap" id="about">
        <span className="eyebrow">Creative Interiorz · Hyderabad</span>
        <h2 className="about-text">From kitchens and wardrobes to TV units, false ceilings and custom furniture, Creative Interiorz helps shape practical, expressive interiors for every room.</h2>
        <div className="stats-grid">{stats.map(([value, label], index) => <article data-reveal style={{ "--delay": String(index * 70) + "ms" } as CSSProperties} key={label}><strong>{value}</strong><span>{label}</span></article>)}</div>
      </section>

      <section className="services-section section-wrap" id="services" aria-labelledby="services-title">
        <div className="section-heading" data-reveal><span className="eyebrow">Services shown at the studio</span><h2 id="services-title">Interior solutions for the rooms you use every day</h2><p>Explore the interior services displayed at the Creative Interiorz Manikonda studio.</p></div>
        <div className="services-grid services-grid-six">{services.map((service, index) => <article className="service-card service-card-photo" data-reveal style={{ "--delay": String(index * 70) + "ms" } as CSSProperties} key={service.title}><div className="service-photo"><Photo src={service.image} alt={service.title} /></div><span className="service-number">0{index + 1}</span><service.icon size={42} strokeWidth={1.15} /><h3>{service.title}</h3><p>{service.text}</p><button className="service-link" onClick={() => openContact(service.title)}>Discuss this service <ArrowUpRight size={16} /></button></article>)}</div>
      </section>

      <section className="craft-section studio-approach" aria-label="Creative Interiorz work">
        <article className="craft-row" data-reveal><div className="craft-copy"><span className="eyebrow">Project detail</span><h2>Feature walls and TV units that anchor the room</h2><p>The studio’s Google Maps portfolio includes media-wall work with layered panelling, marble-look finishes, lighting accents and tailored low storage.</p><button className="pill olive" onClick={() => openContact("a TV unit or living-room project")}>Discuss a Living Space</button></div><div className="craft-image round-right"><Photo src={images.hero} alt="Black and gold marble-look TV unit by Creative Interiorz" /></div></article>
        <article className="craft-row reverse" data-reveal><div className="craft-image round-left"><Photo src={images.kitchen} alt="Modular kitchen by Creative Interiorz" /></div><div className="craft-copy"><span className="eyebrow">Modular kitchen</span><h2>Storage, finishes and work zones in one considered layout</h2><p>Use the studio’s listed kitchen service to start a conversation about the layout, cabinetry, finish palette and storage your room needs.</p><button className="pill olive" onClick={() => openContact("a modular kitchen project")}>Talk About a Kitchen</button></div></article>
      </section>

      <section className="products-section section-wrap" id="projects" aria-labelledby="projects-title">
        <div className="section-heading" data-reveal><span className="eyebrow">Creative Interiorz portfolio</span><h2 id="projects-title">Interior details from the Google Maps listing</h2><p>Every image below comes from Creative Interiorz’s public Google Maps portfolio and is matched to the project type it represents.</p></div>
        <div ref={railRef} className="product-rail" onScroll={() => setRailIndex(Math.round(railRef.current?.scrollLeft || 0))} aria-label="Creative Interiorz project portfolio">{projects.map((project, index) => <button data-reveal className="product-card project-card" style={{ "--delay": String(Math.min(index, 3) * 100) + "ms" } as CSSProperties} key={project.title} onClick={() => setSelected(project)}><div className="product-photo project-photo"><Photo src={project.image} alt={project.title} /><span className="product-open"><ArrowUpRight size={23} /></span></div><div className="product-caption"><h3>{project.title}</h3><span>{String(index + 1).padStart(2, "0")}</span></div><p>{project.type}</p></button>)}</div>
        <div className="carousel-controls"><button aria-label="Previous projects" disabled={railIndex < 2} onClick={() => moveRail(-1)}><ChevronLeft size={21} /></button><button aria-label="Next projects" onClick={() => moveRail(1)}><ChevronRight size={21} /></button></div>
      </section>

      <section className="story-section" aria-labelledby="story-title"><div className="story-sticky"><h2 id="story-title">The details come together<br className="desktop-break" /> when storage, finishes, lighting<br className="desktop-break" /> and room flow are planned as one.</h2>{[images.hero, images.kitchen, images.living, images.wardrobe, images.kitchen, images.hero].map((src, index) => <div className={"story-photo story-photo-" + index} key={src + String(index)}><Photo src={src} alt="Creative Interiorz project detail" /></div>)}</div></section>

      <section className="process-section" id="process" aria-labelledby="process-title"><div className="section-wrap"><div className="process-head" data-reveal><div><span className="eyebrow">Getting started</span><h2 id="process-title">A simple route from enquiry to your interiors</h2></div><p>These are practical steps for starting a conversation with the Creative Interiorz studio. Confirm project details, scope and timelines directly with the team.</p></div><div className="process-grid">{process.map(([number, title, text], index) => <article className="process-step" data-reveal style={{ "--delay": String(index * 60) + "ms" } as CSSProperties} key={title}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

      <section className="features-section section-wrap">
        <div className="section-heading" data-reveal><span className="eyebrow">Verified listing details</span><h2>Everything you need to reach the Manikonda studio</h2><p>These key facts are drawn from the Creative Interiorz Google Maps profile provided for this website.</p></div>
        <div className="features-grid">{highlights.map((feature, index) => <article className="feature-card" data-reveal style={{ "--delay": String(index * 80) + "ms" } as CSSProperties} key={feature.title}><feature.icon size={58} strokeWidth={1.15} /><h3>{feature.title}</h3><p>{feature.text}</p>{feature.title === "Call the studio" ? <a className="pill outline" href={"tel:" + PHONE_LINK}>Call Now</a> : <a className="pill outline" href={MAP_URL} target="_blank" rel="noreferrer">View on Maps</a>}</article>)}</div>
        <div className="trust-grid">{[["4.8 / 5", "Google rating"], ["72", "Public Google reviews"], ["24 hours", "Listed opening hours"], ["G2", "Grace Residency"], ["500089", "Hyderabad postcode"], ["Manikonda", "Studio locality"]].map(([value, label], index) => <article data-reveal style={{ "--delay": String(index * 55) + "ms" } as CSSProperties} key={label}><strong>{value}</strong><span>{label}</span></article>)}</div>
      </section>

      <section className="testimonials-section section-wrap" aria-labelledby="reviews-title"><div className="testimonial-head" data-reveal><div><span className="eyebrow">Google Maps feedback</span><h2 id="reviews-title">4.8 from 72 public reviews</h2></div><div className="maps-rating"><Star size={26} fill="currentColor" /><strong>4.8</strong><span>Creative Interiorz</span></div></div><div className="testimonial-grid">{reviews.map((review, index) => <article className="testimonial-card" data-reveal style={{ "--delay": String(index * 80) + "ms" } as CSSProperties} key={review.title}><span className="quote-mark">“</span><h3>{review.title}</h3><p>{review.text}</p><footer><strong>Google Maps review</strong><span>Public listing feedback</span></footer></article>)}</div></section>

      <section className="categories-section section-wrap" aria-label="Explore interiors by room"><span className="eyebrow">Explore by room</span><div className="category-list">{roomCategories.map((category) => <button className="category-row" key={category.name} onClick={() => openContact(category.name)}><h2>{category.name}</h2><p>{category.text}</p><Photo className="category-photo" src={category.image} alt="" /><span className="pill">Discuss this service</span></button>)}</div></section>

      <section className="studio-section section-wrap" id="studio" aria-labelledby="studio-title"><div className="studio-photo" data-reveal><Photo src={images.studio} alt="Creative Interiorz Manikonda studio exterior" /></div><div className="studio-copy" data-reveal><span className="eyebrow">Manikonda studio</span><h2 id="studio-title">Visit Creative Interiorz in Hyderabad</h2><div className="location-facts"><div><MapPin size={19} /><p>{ADDRESS}</p></div><div><Clock3 size={19} /><p>Open 24 hours · Monday to Sunday</p></div><div><Phone size={19} /><p>{PHONE_DISPLAY}</p></div></div><div className="facility-row"><span>Interior designer</span><span>Modular kitchens</span><span>Wardrobes</span><span>TV units</span><span>Custom furniture</span></div><div className="studio-buttons"><a className="pill olive" href={"tel:" + PHONE_LINK}>Call Creative Interiorz <Phone size={16} /></a><a className="pill outline" href={MAP_URL} target="_blank" rel="noreferrer">Get Directions <MapPin size={16} /></a></div></div></section>

      <section className="faq-section section-wrap" aria-labelledby="faq-title"><div className="faq-intro" data-reveal><span className="eyebrow">FAQ</span><h2 id="faq-title">Before you contact the studio</h2><p>Useful details from Creative Interiorz’s current public Google Maps listing.</p></div><div className="faq-list">{faqs.map(([question, answer], index) => <details data-reveal style={{ "--delay": String(index * 50) + "ms" } as CSSProperties} key={question}><summary><span>{String(index + 1).padStart(2, "0")}</span>{question}<b>+</b></summary><p>{answer}</p></details>)}</div></section>

      <section className="consultation-section"><Photo src={images.kitchen} alt="Creative Interiorz modular kitchen project" className="consultation-bg" /><div className="consultation-shade" /><div className="consultation-inner" data-reveal><span className="eyebrow">Creative Interiorz · Hyderabad</span><h2>Ready to talk about your interiors?</h2><p>Call the Manikonda studio to discuss your room, interior service and the next steps for your project.</p><div className="hero-actions"><a className="pill" href={"tel:" + PHONE_LINK}>Call {PHONE_DISPLAY} <Phone size={16} /></a><a className="pill ghost-pill" href={MAP_URL} target="_blank" rel="noreferrer">Get Directions <MapPin size={16} /></a></div></div></section>

      <footer className="site-footer" id="contact"><div className="footer-top"><div className="footer-visit"><h2>Creative Interiorz</h2><p>Interior design studio<br />in Manikonda, Hyderabad.</p><button className="footer-enquiry" onClick={() => openContact()}>Contact the studio <ArrowUpRight size={15} /></button></div><div><h2>Services</h2>{services.slice(0, 4).map((service) => <a className="footer-link" href="#services" key={service.title}>{service.title}</a>)}</div><div><h2>Quick links</h2>{navItems.slice(0, 5).map(([name, id]) => <a className="footer-link" href={"#" + id} key={id}>{name}</a>)}</div><div className="footer-contact-block"><h2>Visit / Call</h2><a href={"tel:" + PHONE_LINK} className="footer-phone">{PHONE_DISPLAY}</a><p>Open 24 hours · Every day</p><a className="pill" href={MAP_URL} target="_blank" rel="noreferrer">Get Directions</a></div></div><a className="footer-wordmark homelane-wordmark" href="#home" aria-label="Creative Interiorz, back to top">Creative Interiorz</a><div className="footer-bottom"><span>Creative Interiorz · Manikonda, Hyderabad</span><a href="#home">Back to top <ArrowDown size={14} className="up-arrow" /></a></div></footer>
    </main>

    <Dialog open={menuOpen} onOpenChange={setMenuOpen}><DialogContent className="mobile-nav-dialog"><DialogTitle>Creative Interiorz</DialogTitle><DialogDescription className="sr-only">Navigate Creative Interiorz website</DialogDescription><nav>{navItems.map(([name, id]) => <a href={"#" + id} key={id} onClick={() => setMenuOpen(false)}>{name}<ChevronRight size={21} /></a>)}</nav></DialogContent></Dialog>
    <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}><DialogContent className="product-dialog">{selected && <><Photo src={selected.image} alt={selected.title} className="detail-photo" /><div className="detail-copy"><span className="eyebrow">{selected.type}</span><DialogTitle>{selected.title}</DialogTitle><DialogDescription>{selected.text}</DialogDescription><div className="dialog-actions"><button className="pill olive" onClick={() => openContact(selected.title)}>Discuss a Similar Project <ArrowUpRight size={16} /></button><a className="pill outline" href={MAP_URL} target="_blank" rel="noreferrer">Visit on Maps</a></div></div></>}</DialogContent></Dialog>
    <Dialog open={contactOpen} onOpenChange={setContactOpen}><DialogContent className="enquiry-dialog booking-dialog"><span className="eyebrow">Creative Interiorz · Manikonda</span><DialogTitle>Let’s discuss {contactTopic}</DialogTitle><DialogDescription>Call the studio or use Google Maps for directions. The public listing does not include a separate online booking link.</DialogDescription><div className="booking-ready"><Phone size={42} /><p>For project scope, availability and an appointment, please contact Creative Interiorz directly at the listed studio number.</p><a className="pill olive" href={"tel:" + PHONE_LINK}>Call {PHONE_DISPLAY} <Phone size={16} /></a><a className="pill outline" href={MAP_URL} target="_blank" rel="noreferrer">Open Google Maps <MapPin size={16} /></a></div></DialogContent></Dialog>
  </div>;
}
