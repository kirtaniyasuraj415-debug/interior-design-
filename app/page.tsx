"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowDown, ArrowUpRight, ChevronRight, CircleUserRound, HeartHandshake, LampDesk, Leaf, Menu, Phone, MapPin, Clock3, Sofa, Star, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const MAP_URL = "https://maps.app.goo.gl/LcthwBi3SAHDWJ45A?g_st=ac";
const OFFICIAL_URL = "https://www.homelane.com/cities/interior-designers-kolkata";
const PHONE = "18001024663";

const images = {
  hero: "https://super.homelane.com/site-wise/citypagesHI/kolkata/bannerData/interior-designers-kolkata.webp",
  showroom: "https://super.homelane.com/Showroom/Park-stret-1718977679845be8f89c351a4.jpg",
  living: "https://s3-blog.homelane.com/design-ideas/wp-content/uploads/2026/06/04130207/bullconcept_A_spacious_modern_and_beautiful_living_room_with_mi_a83b4da4-20ab-4a03-88a2-3c713048d8c5.png",
  kitchen: "https://s3-blog.homelane.com/design-ideas/wp-content/uploads/2026/05/13160519/juedingjian_15073_90-degree_ultra-wide_angle_5_open_kitchen_ren_8157e788-021f-451e-b46f-111718cf6006.png",
  bedroom: "https://s3-blog.homelane.com/design-ideas/wp-content/uploads/2026/05/18190423/biophilic-modern-bedroom-wallpaper-design-tropical-leaf.jpg",
  wardrobe: "https://s3-blog.homelane.com/design-ideas/wp-content/uploads/2026/09/21070641/sliding-door-wardrobe-inside-design-modern-bedroom.jpg",
  bathroom: "https://s3-blog.homelane.com/design-ideas/wp-content/uploads/2026/09/21070704/luxury-wooden-bathroom-design-double-vanity.jpg",
  foyer: "https://s3-blog.homelane.com/design-ideas/wp-content/uploads/2026/09/18031303/arched-entryway-mirror-rattan-console-table.jpg",
  before: "https://www.homelane.com/design-ideas/wp-content/uploads/2022/04/Kitchen-Makeover-1000-%C3%97-667-px-1.jpg",
  after: "https://www.homelane.com/design-ideas/wp-content/uploads/2022/04/Kitchen-Makeover-1000-%C3%97-667-px-4.jpg",
  decor: "https://s3-blog.homelane.com/design-ideas/wp-content/uploads/2026/09/18031216/maximalist-colourful-interior-design-pink-accents.jpg",
  balcony: "https://s3-blog.homelane.com/design-ideas/wp-content/uploads/2026/04/01131720/modern-minimalist-indian-balcony-colour-combination.jpg",
};

const stats = [
  ["4.8/5", "Google rating"],
  ["1,186", "Google reviews"],
  ["4,800+", "Kolkata projects"],
  ["60+", "Kolkata designers"],
];

const services = [
  { title: "Full Home Interiors", icon: Sofa, image: images.living, text: "End-to-end planning for complete homes, from layout and 3D design to modular work, finishes, installation and handover." },
  { title: "Modular Kitchens", icon: LampDesk, image: images.kitchen, text: "Space planning, 3D previews, storage systems, worktop planning and personalised finishes for everyday cooking." },
  { title: "Wardrobes & Storage", icon: CheckCircle2, image: images.wardrobe, text: "Sliding or hinged wardrobes, lofts and smart storage planned around room size, access and daily use." },
  { title: "Living & Bedroom Design", icon: HeartHandshake, image: images.bedroom, text: "Furniture layouts, TV units, lighting, colour, storage and decor shaped around comfort and lifestyle." },
  { title: "Bathrooms & Foyers", icon: Leaf, image: images.bathroom, text: "Practical layouts, vanity and storage planning, durable materials and a cleaner visual language for compact spaces." },
  { title: "Renovation & Space-Saving", icon: CircleUserRound, image: images.foyer, text: "Renovation support, multifunctional furniture, compact storage and design ideas for existing Kolkata homes." },
];

const projects = [
  { title: "Purple Haze Straight Modular Kitchen", type: "Modular Kitchen", image: images.kitchen },
  { title: "Pure Elegance Kitchen & Dining", type: "Kitchen + Dining", image: images.decor },
  { title: "Smart Kolkata Living Space", type: "Living Room", image: images.living },
  { title: "Biophilic Modern Bedroom", type: "Bedroom", image: images.bedroom },
  { title: "Floor-to-Ceiling Wardrobe", type: "Storage", image: images.wardrobe },
  { title: "Warm Entryway & Foyer", type: "Foyer", image: images.foyer },
];

const process = [
  ["01", "Meet Your Designer", "Share your ideas and floor plan to receive personalised 3D designs and an instant quote."],
  ["02", "Book Your Order", "Pay the booking amount for woodwork and home-decor services to lock the project."],
  ["03", "Finalise Your Design", "Choose materials, finishes and colours, then lock the final design and site-preparation details."],
  ["04", "Send Designs to Factory", "Approved woodwork moves into factory production after the required project milestone payment."],
  ["05", "Kick Off Dispatch", "Completed production moves to dispatch and installation once the relevant payment milestone is cleared."],
  ["06", "Installation & Handover", "The team installs, completes final checks and hands over the home for move-in."],
];

const reviews = [
  { title: "Team support", text: "A recent Google reviewer said HomeLane played a crucial role in their home-owning journey and specifically appreciated the team involved." },
  { title: "Professional execution", text: "Another reviewer praised the project manager and installation team for professionalism, updates and material quality, while noting customisation can be expensive." },
  { title: "Balanced public feedback", text: "Google’s review summary includes strong praise for the showroom, staff and ambience, alongside criticism from some customers about remote-service experiences." },
];

const faqs = [
  ["How do I start a HomeLane interior project in Kolkata?", "Book a free design session, share your floor plan, requirements and approximate budget, review layout options and 3D concepts, then finalise the design and quote before production begins."],
  ["Does HomeLane Park Street handle full-home interiors?", "HomeLane’s Kolkata offering includes full-home interiors along with modular kitchens, wardrobes, living spaces, bedrooms, storage, bathrooms and other home-interior requirements."],
  ["Can designs be customised?", "Yes. HomeLane states that layouts, finishes, storage, lighting and modular solutions can be customised around the home, lifestyle and preferences."],
  ["Do I get a 3D preview?", "HomeLane’s process includes personalised 3D designs so homeowners can review the design direction before production and installation."],
  ["What should I bring to the Park Street consultation?", "The official Kolkata page recommends bringing your floor plan and site images to the experience centre."],
  ["What are the Park Street studio timings?", "The Park Street experience centre is listed as open Monday to Sunday, 11 AM to 8 PM."],
];

const navItems = [["Home","home"],["Services","services"],["Projects","projects"],["Process","process"],["Studio","studio"],["Contact","contact"]];

function Photo({ src, alt, className="" }: { src:string; alt:string; className?:string }) {
  return <img src={src} alt={alt} className={className} loading="lazy" decoding="async" referrerPolicy="no-referrer" />;
}

export default function Home(){
  const root=useRef<HTMLDivElement>(null);
  const [menuOpen,setMenuOpen]=useState(false);
  const [selected,setSelected]=useState<(typeof projects)[number] | null>(null);

  useEffect(()=>{
    const node=root.current;
    if(!node) return;
    const media=window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target);}
    }),{threshold:.12});
    node.querySelectorAll("[data-reveal]").forEach(el=>observer.observe(el));
    const hero=node.querySelector<HTMLElement>(".hero-image");
    let frame=0;
    const update=()=>{ if(hero && !media.matches && window.scrollY < window.innerHeight*1.4) hero.style.transform=`translate3d(0,${Math.min(window.scrollY*.14,140)}px,0) scale(1.03)`; };
    const onScroll=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(update);};
    node.classList.add("motion-ready");
    update();
    window.addEventListener("scroll",onScroll,{passive:true});
    return()=>{observer.disconnect();cancelAnimationFrame(frame);window.removeEventListener("scroll",onScroll);};
  },[]);

  return <div ref={root}>
    <a className="skip-link" href="#about">Skip to content</a>
    <main>
      <section className="hero" id="home" aria-labelledby="hero-title">
        <Photo src={images.hero} alt="HomeLane interior design showcase in Kolkata" className="hero-image"/>
        <div className="hero-shade"/>
        <header className="site-header">
          <a href="#home" className="brand brand-homelane" aria-label="HomeLane Park Street home">HomeLane</a>
          <nav className="desktop-nav" aria-label="Main navigation">{navItems.map(([name,id],i)=><a className={i===0?"active":""} href={`#${id}`} key={id}>{name}</a>)}</nav>
          <a className="header-contact" href={`tel:${PHONE}`} aria-label="Call HomeLane Park Street"><Phone size={22}/></a>
          <button className="mobile-menu-button" aria-label="Open menu" onClick={()=>setMenuOpen(true)}><Menu size={25}/></button>
        </header>
        <div className="hero-copy homelane-hero">
          <span className="hero-kicker">HomeLane Park Street · Kolkata</span>
          <h1 id="hero-title">Home Interiors Designed<br/>Around the Way You Live</h1>
          <p>End-to-end home interiors in Kolkata — from modular kitchens and wardrobes<br className="desktop-break"/> to full-home design, 3D planning, factory production and installation.</p>
          <div className="hero-actions">
            <a className="pill hero-cta" href={OFFICIAL_URL} target="_blank" rel="noreferrer">Book Free Design Session <ArrowUpRight size={16}/></a>
            <a className="pill hero-cta ghost-pill" href={MAP_URL} target="_blank" rel="noreferrer">Get Directions <MapPin size={16}/></a>
          </div>
          <div className="rating-chip"><Star size={16} fill="currentColor"/><strong>4.8</strong><span>Google · 1,186 reviews</span></div>
        </div>
        <a className="scroll-cue" href="#about"><span>Explore HomeLane</span><span className="mouse"><span/></span></a>
      </section>

      <section className="about-section section-wrap" id="about">
        <span className="eyebrow">HomeLane Kolkata</span>
        <h2 className="about-text">HomeLane offers end-to-end home interiors in Kolkata, combining personalised design, 3D previews, modular production, project management and installation for homes that need to look good and work hard every day.</h2>
        <div className="stats-grid">{stats.map(([value,label],i)=><article data-reveal style={{"--delay":`${i*70}ms`} as CSSProperties} key={label}><strong>{value}</strong><span>{label}</span></article>)}</div>
      </section>

      <section className="services-section section-wrap" id="services" aria-labelledby="services-title">
        <div className="section-heading" data-reveal><span className="eyebrow">End-to-end offerings</span><h2 id="services-title">Interior solutions for every major room</h2><p>HomeLane’s Kolkata service covers complete homes as well as room-specific modular and storage requirements.</p></div>
        <div className="services-grid services-grid-six">{services.map((service,i)=><article className="service-card service-card-photo" data-reveal style={{"--delay":`${i*70}ms`} as CSSProperties} key={service.title}><div className="service-photo"><Photo src={service.image} alt={service.title}/></div><span className="service-number">0{i+1}</span><service.icon size={42} strokeWidth={1.15}/><h3>{service.title}</h3><p>{service.text}</p><a className="service-link" href={OFFICIAL_URL} target="_blank" rel="noreferrer">Explore with HomeLane <ArrowUpRight size={16}/></a></article>)}</div>
      </section>

      <section className="craft-section studio-approach" aria-label="Why choose HomeLane">
        <article className="craft-row" data-reveal><div className="craft-copy"><span className="eyebrow">Why HomeLane</span><h2>45-day delivery*, transparent pricing and a 10-year warranty</h2><p>HomeLane’s Kolkata page highlights four core promises: delivery in 45 days*, no hidden costs, a flat 10-year warranty and easy EMI options. The exact terms depend on the project and HomeLane’s conditions.</p><a href={OFFICIAL_URL} target="_blank" rel="noreferrer" className="pill olive">View Official Kolkata Page</a></div><div className="craft-image round-right"><Photo src={images.living} alt="HomeLane living room interior"/></div></article>
        <article className="craft-row reverse" data-reveal><div className="craft-image round-left"><Photo src={images.kitchen} alt="HomeLane modular kitchen design"/></div><div className="craft-copy"><span className="eyebrow">Personalised design</span><h2>See your home in 3D before production starts</h2><p>HomeLane’s design process begins with your floor plan, ideas and budget, then moves through personalised 3D concepts, materials and finishes before approved designs go to factory production.</p><a href={OFFICIAL_URL} target="_blank" rel="noreferrer" className="pill olive">Book a Free Design Session</a></div></article>
      </section>

      <section className="products-section section-wrap" id="projects" aria-labelledby="projects-title">
        <div className="section-heading" data-reveal><span className="eyebrow">Design inspiration</span><h2 id="projects-title">Popular HomeLane design directions</h2><p>Room ideas and visual references from HomeLane’s official interior-design content, adapted here into the current premium site layout.</p></div>
        <div className="projects-grid">{projects.map((p,i)=><button className="project-tile" data-reveal style={{"--delay":`${i*70}ms`} as CSSProperties} key={p.title} onClick={()=>setSelected(p)}><div className="project-tile-image"><Photo src={p.image} alt={p.title}/><span><ArrowUpRight size={20}/></span></div><div><small>{p.type}</small><h3>{p.title}</h3></div></button>)}</div>
      </section>

      <section className="transformation-section section-wrap" aria-labelledby="transformation-title">
        <div className="transformation-copy" data-reveal><span className="eyebrow">Kolkata design story</span><h2 id="transformation-title">Every inch counts in a compact Kolkata home</h2><p>HomeLane’s Kolkata design story describes a 1,250 sq ft Chinar Park apartment where the brief focused on comfort, functionality, smart storage and a white-and-walnut visual language. Designer Akanksha Jalan used ceiling-height storage, open planning and layered lighting to make the home feel larger and more organised.</p><a className="pill olive" href="https://www.homelane.com/design-ideas/interiors-by-homelane/homelane-design-stories-a-kolkata-home-where-comfort-meets-functionality/" target="_blank" rel="noreferrer">Read the Design Story <ArrowUpRight size={16}/></a></div>
        <div className="before-after" data-reveal><figure><Photo src={images.before} alt="HomeLane Kolkata home design reference"/><figcaption><span>Design story</span><small>Compact Kolkata home</small></figcaption></figure><figure><Photo src={images.after} alt="HomeLane Kolkata home interior reference"/><figcaption><span>Design detail</span><small>Storage + function</small></figcaption></figure></div>
      </section>

      <section className="process-section" id="process" aria-labelledby="process-title">
        <div className="section-wrap"><div className="process-head" data-reveal><div><span className="eyebrow">From design to move-in</span><h2 id="process-title">HomeLane’s 6-step interior process</h2></div><p>The official workflow moves from designer consultation and 3D concepts to order booking, design finalisation, factory production, dispatch, installation and final handover.</p></div>
        <div className="process-grid">{process.map(([n,title,text],i)=><article className="process-step" data-reveal style={{"--delay":`${i*60}ms`} as CSSProperties} key={title}><span>{n}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div>
      </section>

      <section className="features-section section-wrap">
        <div className="section-heading" data-reveal><span className="eyebrow">Why homeowners choose HomeLane</span><h2>Built around clarity, customisation and execution</h2><p>The Kolkata offering focuses on personalised layouts, materials and finishes, smart storage, 3D visibility before production and a managed installation workflow.</p></div>
        <div className="trust-grid">
          {[
            ["45 Days*","Delivery promise"],["10 Years","Flat warranty"],["No Hidden Costs","Pricing promise"],["Easy EMIs","Payment flexibility"],["55,000+","Homes delivered across India"],["600+","Expert designers"]
          ].map(([value,label],i)=><article data-reveal style={{"--delay":`${i*55}ms`} as CSSProperties} key={label}><strong>{value}</strong><span>{label}</span></article>)}
        </div>
      </section>

      <section className="testimonials-section section-wrap" aria-labelledby="reviews-title">
        <div className="testimonial-head" data-reveal><div><span className="eyebrow">Google Maps feedback</span><h2 id="reviews-title">4.8 from 1,186 public reviews</h2></div><div className="maps-rating"><Star size={26} fill="currentColor"/><strong>4.8</strong><span>HomeLane Park Street</span></div></div>
        <div className="testimonial-grid">{reviews.map((r,i)=><article className="testimonial-card" data-reveal style={{"--delay":`${i*80}ms`} as CSSProperties} key={r.title}><span className="quote-mark">“</span><h3>{r.title}</h3><p>{r.text}</p><footer><strong>Google Maps review theme</strong><span>Public listing summary</span></footer></article>)}</div>
      </section>

      <section className="studio-section section-wrap" id="studio" aria-labelledby="studio-title">
        <div className="studio-photo" data-reveal><Photo src={images.showroom} alt="HomeLane Park Street Interior Design Studio"/></div>
        <div className="studio-copy" data-reveal><span className="eyebrow">Park Street Experience Centre</span><h2 id="studio-title">Visit HomeLane Park Street, Kolkata</h2><div className="location-facts"><div><MapPin size={19}/><p>1st Floor, Chowringhee Mansion, CENTRAL LIBRARY, Dr Md Ishaque Rd, next to Pepperfry Studio, Colootola, New Market Area, Dharmatala, Taltala, Kolkata, West Bengal 700016</p></div><div><Clock3 size={19}/><p>Monday to Sunday · 11 AM to 8 PM</p></div><div><Phone size={19}/><p>18001024663</p></div></div><div className="facility-row"><span>Free Car Parking</span><span>Restrooms</span><span>Bring Floor Plan</span><span>Bring Site Images</span></div><div className="studio-buttons"><a className="pill olive" href={MAP_URL} target="_blank" rel="noreferrer">Get Directions <MapPin size={16}/></a><a className="pill outline" href={`tel:${PHONE}`}>Call Studio <Phone size={16}/></a></div></div>
      </section>

      <section className="faq-section section-wrap" aria-labelledby="faq-title">
        <div className="faq-intro" data-reveal><span className="eyebrow">FAQ</span><h2 id="faq-title">Before you book your design session</h2><p>Key details pulled from HomeLane’s official Kolkata information and Park Street listing.</p></div>
        <div className="faq-list">{faqs.map(([q,a],i)=><details data-reveal style={{"--delay":`${i*50}ms`} as CSSProperties} key={q}><summary><span>{String(i+1).padStart(2,"0")}</span>{q}<b>+</b></summary><p>{a}</p></details>)}</div>
      </section>

      <section className="consultation-section">
        <Photo src={images.hero} alt="" className="consultation-bg"/><div className="consultation-shade"/>
        <div className="consultation-inner" data-reveal><span className="eyebrow">Free design session</span><h2>Bring your floor plan. Leave with a clearer direction.</h2><p>Meet a HomeLane designer, explore materials and layouts, review personalised 3D ideas and understand the next steps for your Kolkata home.</p><div className="hero-actions"><a className="pill" href={OFFICIAL_URL} target="_blank" rel="noreferrer">Book Design Session <ArrowUpRight size={16}/></a><a className="pill ghost-pill" href={`tel:${PHONE}`}>Call 1800 102 4663 <Phone size={16}/></a></div></div>
      </section>

      <footer className="site-footer" id="contact">
        <div className="footer-top">
          <div className="footer-visit"><h2>HomeLane Park Street</h2><p>End-to-end home interiors<br/>in the heart of Kolkata.</p><a className="footer-enquiry" href={MAP_URL} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={15}/></a></div>
          <div><h2>Services</h2>{services.slice(0,4).map(s=><a className="footer-link" href="#services" key={s.title}>{s.title}</a>)}</div>
          <div><h2>Quick links</h2>{[["Home","home"],["Services","services"],["Projects","projects"],["Process","process"],["Studio","studio"]].map(([name,id])=><a className="footer-link" href={`#${id}`} key={name}>{name}</a>)}</div>
          <div className="footer-contact-block"><h2>Visit / Call</h2><a href={`tel:${PHONE}`} className="footer-phone">1800 102 4663</a><p>Daily · 11 AM–8 PM</p><a href={OFFICIAL_URL} target="_blank" rel="noreferrer" className="pill">Official Kolkata Page</a></div>
        </div>
        <a className="footer-wordmark homelane-wordmark" href="#home" aria-label="HomeLane, back to top">HomeLane</a>
        <div className="footer-bottom"><span>HomeLane Park Street · Kolkata</span><a href="#home">Back to top <ArrowDown size={14} className="up-arrow"/></a></div>
      </footer>
    </main>

    <Dialog open={menuOpen} onOpenChange={setMenuOpen}><DialogContent className="mobile-nav-dialog"><DialogTitle>HomeLane</DialogTitle><DialogDescription className="sr-only">Navigate HomeLane Park Street website</DialogDescription><nav>{navItems.map(([name,id])=><a href={`#${id}`} key={id} onClick={()=>setMenuOpen(false)}>{name}<ChevronRight size={21}/></a>)}</nav></DialogContent></Dialog>

    <Dialog open={!!selected} onOpenChange={open=>!open&&setSelected(null)}><DialogContent className="product-dialog">{selected&&<><Photo src={selected.image} alt={selected.title} className="detail-photo"/><div className="detail-copy"><span className="eyebrow">{selected.type}</span><DialogTitle>{selected.title}</DialogTitle><DialogDescription>Design inspiration sourced from HomeLane’s official interior-design content. Speak with the Park Street team to explore a personalised version for your own floor plan and budget.</DialogDescription><div className="dialog-actions"><a className="pill olive" href={OFFICIAL_URL} target="_blank" rel="noreferrer">Book Free Design Session <ArrowUpRight size={16}/></a><a className="pill outline" href={MAP_URL} target="_blank" rel="noreferrer">Visit Park Street</a></div></div></>}</DialogContent></Dialog>
  </div>;
}
