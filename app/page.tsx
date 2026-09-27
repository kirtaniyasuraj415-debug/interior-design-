"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowDown, ArrowUpRight, ChevronLeft, ChevronRight, CircleUserRound, HeartHandshake, LampDesk, Leaf, Menu, Phone, MapPin, Clock3, Sofa, Star, CheckCircle2 } from "lucide-react";
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
  decor: "https://s3-blog.homelane.com/design-ideas/wp-content/uploads/2026/09/18031216/maximalist-colourful-interior-design-pink-accents.jpg",
  balcony: "https://s3-blog.homelane.com/design-ideas/wp-content/uploads/2026/04/01131720/modern-minimalist-indian-balcony-colour-combination.jpg",
};

const about = "HomeLane Park Street brings design, 3D visualisation, modular production, project management and installation together so Kolkata homeowners can move from an empty floor plan to a personalised home with fewer disconnected decisions.";

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
  { title: "Purple Haze Straight Modular Kitchen", type: "Modular Kitchen", image: images.kitchen, text: "A modern kitchen direction with efficient storage, clean work zones and a strong colour identity." },
  { title: "Pure Elegance Living & Dining", type: "Living + Dining", image: images.decor, text: "Layered colour, furniture and lighting combined to create a social space with warmth and visual depth." },
  { title: "Smart Kolkata Living Space", type: "Living Room", image: images.living, text: "A contemporary living room focused on circulation, comfortable seating and practical everyday use." },
  { title: "Biophilic Modern Bedroom", type: "Bedroom", image: images.bedroom, text: "A softer bedroom palette with botanical cues, storage and a calm sleeping environment." },
  { title: "Floor-to-Ceiling Wardrobe", type: "Storage", image: images.wardrobe, text: "Vertical storage that uses room height efficiently while keeping the visual language clean." },
  { title: "Warm Entryway & Foyer", type: "Foyer", image: images.foyer, text: "A compact entrance that balances utility, mirror placement, storage and welcoming material choices." },
];

const process = [
  ["01", "Meet Your Designer", "Share your ideas and floor plan to receive personalised 3D designs and an initial quote."],
  ["02", "Book Your Order", "Confirm the project direction and booking milestone for woodwork and interior services."],
  ["03", "Finalise Your Design", "Lock layouts, materials, finishes, colours and site-preparation details."],
  ["04", "Factory Production", "Approved modular woodwork moves into factory production after the required project milestone."],
  ["05", "Dispatch & Installation", "Completed production moves to dispatch and site installation with coordinated execution."],
  ["06", "Final Handover", "Final checks and finishing are completed before the home is handed over for move-in."],
];

const features = [
  { title: "Personalised 3D Design", icon: HeartHandshake, text: "See layouts, finishes and key design decisions before production begins." },
  { title: "Transparent Pricing", icon: CheckCircle2, text: "HomeLane highlights no hidden costs so the project can be planned with clearer expectations." },
  { title: "45-Day Delivery*", icon: Sofa, text: "The Kolkata offering promotes a 45-day delivery promise subject to applicable terms and project conditions." },
  { title: "10-Year Warranty", icon: Leaf, text: "A flat 10-year warranty is highlighted for eligible HomeLane interior work." },
];

const roomCategories = [
  { name: "Modular Kitchen", text: "Layouts, cabinets, work zones, finishes and storage tailored to daily cooking.", image: images.kitchen },
  { name: "Living Room", text: "Furniture planning, TV units, lighting, display and a comfortable social layout.", image: images.living },
  { name: "Bedroom", text: "Wardrobes, beds, lighting, colour and storage shaped around rest and routine.", image: images.bedroom },
  { name: "Wardrobe", text: "Sliding, hinged and full-height storage planned around the available footprint.", image: images.wardrobe },
  { name: "Bathroom", text: "Vanity, storage, finishes and a practical wet-dry layout for easier maintenance.", image: images.bathroom },
];

const reviews = [
  { title: "Team support", text: "A recent Google reviewer said HomeLane played a crucial role in their home-owning journey and appreciated the team involved." },
  { title: "Professional execution", text: "Another reviewer praised the project manager and installation team for professionalism, updates and material quality, while noting customisation can be expensive." },
  { title: "Balanced public feedback", text: "Google’s review summary includes strong praise for the showroom, staff and ambience, alongside criticism from some customers about remote-service experiences." },
];

const faqs = [
  ["How do I start a HomeLane interior project in Kolkata?", "Book a design session, share your floor plan, requirements and approximate budget, review layout options and 3D concepts, then finalise the design and quote before production begins."],
  ["Does HomeLane Park Street handle full-home interiors?", "HomeLane’s Kolkata offering includes full-home interiors along with modular kitchens, wardrobes, living spaces, bedrooms, storage, bathrooms and other home-interior requirements."],
  ["Can designs be customised?", "Yes. HomeLane states that layouts, finishes, storage, lighting and modular solutions can be customised around the home, lifestyle and preferences."],
  ["Do I get a 3D preview?", "HomeLane’s process includes personalised 3D designs so homeowners can review the design direction before production and installation."],
  ["What should I bring to the Park Street consultation?", "The official Kolkata page recommends bringing your floor plan and site images to the experience centre."],
  ["What are the Park Street studio timings?", "The Park Street experience centre is listed as open Monday to Sunday, 11 AM to 8 PM."],
];

const navItems = [["Home","home"],["Services","services"],["Projects","projects"],["Process","process"],["Studio","studio"],["Contact","contact"]];

function Photo({ src, alt, className="", eager=false }: { src:string; alt:string; className?:string; eager?:boolean }) {
  return <img src={src} alt={alt} className={className} loading={eager?"eager":"lazy"} decoding="async" referrerPolicy="no-referrer" />;
}

export default function Home(){
  const root=useRef<HTMLDivElement>(null);
  const railRef=useRef<HTMLDivElement>(null);
  const [menuOpen,setMenuOpen]=useState(false);
  const [selected,setSelected]=useState<(typeof projects)[number] | null>(null);
  const [bookingOpen,setBookingOpen]=useState(false);
  const [bookingTopic,setBookingTopic]=useState("Free 3D Design Session");
  const [bookingReady,setBookingReady]=useState(false);
  const [railIndex,setRailIndex]=useState(0);

  function openBooking(topic="Free 3D Design Session"){
    setSelected(null);
    setBookingTopic(topic);
    setBookingReady(false);
    setBookingOpen(true);
  }

  function moveRail(direction:number){
    const rail=railRef.current;
    if(!rail) return;
    const card=rail.querySelector<HTMLElement>(".product-card");
    rail.scrollBy({left:((card?.offsetWidth||300)+24)*direction,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});
  }

  useEffect(()=>{
    const node=root.current;
    if(!node) return;
    const media=window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target);}
    }),{threshold:.13});
    node.querySelectorAll("[data-reveal]").forEach(el=>observer.observe(el));

    const words=[...node.querySelectorAll<HTMLElement>(".about-word")];
    const aboutSection=node.querySelector<HTMLElement>(".about-section");
    const story=node.querySelector<HTMLElement>(".story-section");
    const floats=[...node.querySelectorAll<HTMLElement>(".story-photo")];
    const hero=node.querySelector<HTMLElement>(".hero-image");
    let frame=0;
    let ticking=false;

    const update=()=>{
      ticking=false;
      const height=window.innerHeight;
      const reduced=media.matches;
      if(aboutSection){
        const a=aboutSection.getBoundingClientRect();
        const progress=Math.max(0,Math.min(1,(height*.82-a.top)/(a.height*.75)));
        words.forEach((el,i)=>el.classList.toggle("is-read",reduced||progress>=i/Math.max(1,words.length)));
      }
      if(story){
        const rect=story.getBoundingClientRect();
        const storyProgress=Math.max(0,Math.min(1,-rect.top/Math.max(1,rect.height-height)));
        floats.forEach((el,i)=>{
          const p=(storyProgress-i*.13)/.32;
          el.style.transform=reduced?"none":`translate3d(0,${height*(.95-p*1.45)}px,0)`;
          el.style.opacity=reduced?"1":String(Math.max(0,Math.min(1,p*4,(1.3-p)*4)));
        });
      }
      if(hero&&!reduced&&window.scrollY<height*1.4) hero.style.transform=`translate3d(0,${Math.min(window.scrollY*.16,height*.2)}px,0) scale(1.025)`;
    };

    const schedule=()=>{if(!ticking){ticking=true;frame=requestAnimationFrame(update);}};
    node.classList.add("motion-ready");
    update();
    window.addEventListener("scroll",schedule,{passive:true});
    window.addEventListener("resize",schedule);
    media.addEventListener("change",schedule);
    return()=>{observer.disconnect();cancelAnimationFrame(frame);window.removeEventListener("scroll",schedule);window.removeEventListener("resize",schedule);media.removeEventListener("change",schedule);};
  },[]);

  return <div ref={root}>
    <a className="skip-link" href="#about">Skip to content</a>
    <main>
      <section className="hero" id="home" aria-labelledby="hero-title">
        <Photo src={images.hero} alt="HomeLane interior design showcase in Kolkata" className="hero-image" eager/>
        <div className="hero-shade"/>
        <header className="site-header">
          <a href="#home" className="brand brand-homelane" aria-label="HomeLane Park Street home">HomeLane</a>
          <nav className="desktop-nav" aria-label="Main navigation">{navItems.map(([name,id],i)=><a className={i===0?"active":""} href={`#${id}`} key={id}>{name}</a>)}</nav>
          <button className="header-contact" onClick={()=>openBooking()} aria-label="Book a free 3D design session"><CircleUserRound size={24}/></button>
          <button className="mobile-menu-button" aria-label="Open menu" onClick={()=>setMenuOpen(true)}><Menu size={25}/></button>
        </header>
        <div className="hero-copy homelane-hero">
          <span className="hero-kicker">HomeLane Park Street · Kolkata</span>
          <h1 id="hero-title">Home Interiors Designed<br/>Around the Way You Live</h1>
          <p>End-to-end home interiors in Kolkata — from modular kitchens and wardrobes<br className="desktop-break"/> to full-home design, 3D planning, factory production and installation.</p>
          <div className="hero-actions">
            <button className="pill hero-cta" onClick={()=>openBooking("Free 3D Design Session")}>Book Free 3D Design Session <ArrowUpRight size={16}/></button>
            <a className="pill hero-cta ghost-pill" href={MAP_URL} target="_blank" rel="noreferrer">Get Directions <MapPin size={16}/></a>
          </div>
          <div className="rating-chip"><Star size={16} fill="currentColor"/><strong>4.8</strong><span>Google · 1,186 reviews</span></div>
        </div>
        <a className="scroll-cue" href="#about"><span>Explore HomeLane</span><span className="mouse"><span/></span></a>
      </section>

      <section className="about-section section-wrap" id="about">
        <span className="eyebrow">HomeLane Kolkata</span>
        <h2 className="about-text" aria-label={about}>{about.split(" ").map((word,i)=><span aria-hidden="true" className="about-word" key={i}>{word}{" "}</span>)}</h2>
        <div className="stats-grid">{stats.map(([value,label],i)=><article data-reveal style={{"--delay":`${i*70}ms`} as CSSProperties} key={label}><strong>{value}</strong><span>{label}</span></article>)}</div>
      </section>

      <section className="services-section section-wrap" id="services" aria-labelledby="services-title">
        <div className="section-heading" data-reveal><span className="eyebrow">End-to-end offerings</span><h2 id="services-title">Interior solutions for every major room</h2><p>HomeLane’s Kolkata service covers complete homes as well as room-specific modular and storage requirements.</p></div>
        <div className="services-grid services-grid-six">{services.map((service,i)=><article className="service-card service-card-photo" data-reveal style={{"--delay":`${i*70}ms`} as CSSProperties} key={service.title}><div className="service-photo"><Photo src={service.image} alt={service.title}/></div><span className="service-number">0{i+1}</span><service.icon size={42} strokeWidth={1.15}/><h3>{service.title}</h3><p>{service.text}</p><button className="service-link" onClick={()=>openBooking(service.title)}>Discuss this service <ArrowUpRight size={16}/></button></article>)}</div>
      </section>

      <section className="craft-section studio-approach" aria-label="Why choose HomeLane">
        <article className="craft-row" data-reveal><div className="craft-copy"><span className="eyebrow">Why HomeLane</span><h2>45-day delivery*, transparent pricing and a 10-year warranty</h2><p>HomeLane’s Kolkata page highlights four core promises: delivery in 45 days*, no hidden costs, a flat 10-year warranty and easy EMI options. The exact terms depend on the project and HomeLane’s conditions.</p><button className="pill olive" onClick={()=>openBooking("Full Home Interior Consultation")}>Plan My Home</button></div><div className="craft-image round-right"><Photo src={images.living} alt="HomeLane living room interior"/></div></article>
        <article className="craft-row reverse" data-reveal><div className="craft-image round-left"><Photo src={images.kitchen} alt="HomeLane modular kitchen design"/></div><div className="craft-copy"><span className="eyebrow">Personalised design</span><h2>See your home in 3D before production starts</h2><p>HomeLane’s design process begins with your floor plan, ideas and budget, then moves through personalised 3D concepts, materials and finishes before approved designs go to factory production.</p><button className="pill olive" onClick={()=>openBooking("Free 3D Design Session")}>Book Free 3D Design Session</button></div></article>
      </section>

      <section className="products-section section-wrap" id="projects" aria-labelledby="projects-title">
        <div className="section-heading" data-reveal><span className="eyebrow">Design inspiration</span><h2 id="projects-title">Popular HomeLane design directions</h2><p>Swipe through room ideas using the same premium horizontal-card rhythm from the earlier design.</p></div>
        <div ref={railRef} className="product-rail" onScroll={()=>setRailIndex(Math.round(railRef.current?.scrollLeft||0))} aria-label="HomeLane design projects">
          {projects.map((p,i)=><button data-reveal className="product-card project-card" style={{"--delay":`${Math.min(i,3)*100}ms`} as CSSProperties} key={p.title} onClick={()=>setSelected(p)}><div className="product-photo project-photo"><Photo src={p.image} alt={p.title}/><span className="product-open"><ArrowUpRight size={23}/></span></div><div className="product-caption"><h3>{p.title}</h3><span>{String(i+1).padStart(2,"0")}</span></div><p>{p.type}</p></button>)}
        </div>
        <div className="carousel-controls"><button aria-label="Previous projects" disabled={railIndex<2} onClick={()=>moveRail(-1)}><ChevronLeft size={21}/></button><button aria-label="Next projects" onClick={()=>moveRail(1)} disabled={!!railRef.current&&railIndex>=railRef.current.scrollWidth-railRef.current.clientWidth-3}><ChevronRight size={21}/></button></div>
      </section>

      <section className="story-section" aria-labelledby="story-title">
        <div className="story-sticky">
          <h2 id="story-title">A home feels effortless<br className="desktop-break"/> when layout, storage, materials<br className="desktop-break"/> and lighting are solved as one.</h2>
          {[images.living,images.kitchen,images.bedroom,images.wardrobe,images.foyer,images.balcony].map((src,i)=><div className={`story-photo story-photo-${i}`} key={src}><Photo src={src} alt="HomeLane interior design inspiration"/></div>)}
        </div>
      </section>

      <section className="process-section" id="process" aria-labelledby="process-title">
        <div className="section-wrap"><div className="process-head" data-reveal><div><span className="eyebrow">From design to move-in</span><h2 id="process-title">HomeLane’s 6-step interior process</h2></div><p>A structured journey from designer consultation and 3D concepts to finalisation, factory production, installation and handover.</p></div>
        <div className="process-grid">{process.map(([n,title,text],i)=><article className="process-step" data-reveal style={{"--delay":`${i*60}ms`} as CSSProperties} key={title}><span>{n}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div>
      </section>

      <section className="features-section section-wrap">
        <div className="section-heading" data-reveal><span className="eyebrow">Why work with HomeLane</span><h2>A design journey built around clarity and execution</h2><p>The visual design is only one part of the job. Planning, pricing, production and installation need to stay connected too.</p></div>
        <div className="features-grid">{features.map((feature,i)=><article className="feature-card" data-reveal style={{"--delay":`${i*80}ms`} as CSSProperties} key={feature.title}><feature.icon size={58} strokeWidth={1.15}/><h3>{feature.title}</h3><p>{feature.text}</p><button className="pill outline" onClick={()=>openBooking(feature.title)}>Know More</button></article>)}</div>
        <div className="trust-grid">{[["55,000+","Homes delivered across India"],["600+","Expert designers"],["No Hidden Costs","Pricing promise"],["Easy EMIs","Payment flexibility"],["45 Days*","Delivery promise"],["10 Years","Flat warranty"]].map(([value,label],i)=><article data-reveal style={{"--delay":`${i*55}ms`} as CSSProperties} key={label}><strong>{value}</strong><span>{label}</span></article>)}</div>
      </section>

      <section className="testimonials-section section-wrap" aria-labelledby="reviews-title">
        <div className="testimonial-head" data-reveal><div><span className="eyebrow">Google Maps feedback</span><h2 id="reviews-title">4.8 from 1,186 public reviews</h2></div><div className="maps-rating"><Star size={26} fill="currentColor"/><strong>4.8</strong><span>HomeLane Park Street</span></div></div>
        <div className="testimonial-grid">{reviews.map((r,i)=><article className="testimonial-card" data-reveal style={{"--delay":`${i*80}ms`} as CSSProperties} key={r.title}><span className="quote-mark">“</span><h3>{r.title}</h3><p>{r.text}</p><footer><strong>Google Maps review theme</strong><span>Public listing summary</span></footer></article>)}</div>
      </section>

      <section className="categories-section section-wrap" aria-label="Explore interiors by room">
        <span className="eyebrow">Explore by room</span>
        <div className="category-list">{roomCategories.map((category,i)=><button className="category-row" key={category.name} onClick={()=>openBooking(category.name)}><h2>{category.name}</h2><p>{category.text}</p><Photo className="category-photo" src={category.image} alt=""/><span className="pill">Book 3D Design</span></button>)}</div>
      </section>

      <section className="studio-section section-wrap" id="studio" aria-labelledby="studio-title">
        <div className="studio-photo" data-reveal><Photo src={images.showroom} alt="HomeLane Park Street Interior Design Studio"/></div>
        <div className="studio-copy" data-reveal><span className="eyebrow">Park Street Experience Centre</span><h2 id="studio-title">Visit HomeLane Park Street, Kolkata</h2><div className="location-facts"><div><MapPin size={19}/><p>1st Floor, Chowringhee Mansion, CENTRAL LIBRARY, Dr Md Ishaque Rd, next to Pepperfry Studio, Colootola, New Market Area, Dharmatala, Taltala, Kolkata, West Bengal 700016</p></div><div><Clock3 size={19}/><p>Monday to Sunday · 11 AM to 8 PM</p></div><div><Phone size={19}/><p>18001024663</p></div></div><div className="facility-row"><span>Free Car Parking</span><span>Restrooms</span><span>Bring Floor Plan</span><span>Bring Site Images</span></div><div className="studio-buttons"><button className="pill olive" onClick={()=>openBooking("Park Street 3D Design Session")}>Book In-Studio Session <ArrowUpRight size={16}/></button><a className="pill outline" href={MAP_URL} target="_blank" rel="noreferrer">Get Directions <MapPin size={16}/></a></div></div>
      </section>

      <section className="faq-section section-wrap" aria-labelledby="faq-title">
        <div className="faq-intro" data-reveal><span className="eyebrow">FAQ</span><h2 id="faq-title">Before you book your design session</h2><p>Key details from HomeLane’s official Kolkata information and Park Street listing.</p></div>
        <div className="faq-list">{faqs.map(([q,a],i)=><details data-reveal style={{"--delay":`${i*50}ms`} as CSSProperties} key={q}><summary><span>{String(i+1).padStart(2,"0")}</span>{q}<b>+</b></summary><p>{a}</p></details>)}</div>
      </section>

      <section className="consultation-section">
        <Photo src={images.hero} alt="" className="consultation-bg"/><div className="consultation-shade"/>
        <div className="consultation-inner" data-reveal><span className="eyebrow">Free 3D design session</span><h2>Bring your floor plan. Leave with a clearer direction.</h2><p>Tell us about the home, rooms, location, approximate budget and what you want to improve. The booking form now opens right here on this website.</p><div className="hero-actions"><button className="pill" onClick={()=>openBooking("Free 3D Design Session")}>Book Design Session <ArrowUpRight size={16}/></button><a className="pill ghost-pill" href={`tel:${PHONE}`}>Call 1800 102 4663 <Phone size={16}/></a></div></div>
      </section>

      <footer className="site-footer" id="contact">
        <div className="footer-top">
          <div className="footer-visit"><h2>HomeLane Park Street</h2><p>End-to-end home interiors<br/>in the heart of Kolkata.</p><button className="footer-enquiry" onClick={()=>openBooking()}>Book a design session <ArrowUpRight size={15}/></button></div>
          <div><h2>Services</h2>{services.slice(0,4).map(s=><a className="footer-link" href="#services" key={s.title}>{s.title}</a>)}</div>
          <div><h2>Quick links</h2>{[["Home","home"],["Services","services"],["Projects","projects"],["Process","process"],["Studio","studio"]].map(([name,id])=><a className="footer-link" href={`#${id}`} key={name}>{name}</a>)}</div>
          <div className="footer-contact-block"><h2>Visit / Call</h2><a href={`tel:${PHONE}`} className="footer-phone">1800 102 4663</a><p>Daily · 11 AM–8 PM</p><button className="pill" onClick={()=>openBooking()}>Book 3D Session</button></div>
        </div>
        <a className="footer-wordmark homelane-wordmark" href="#home" aria-label="HomeLane, back to top">HomeLane</a>
        <div className="footer-bottom"><span>HomeLane Park Street · Kolkata</span><a href="#home">Back to top <ArrowDown size={14} className="up-arrow"/></a></div>
      </footer>
    </main>

    <Dialog open={menuOpen} onOpenChange={setMenuOpen}><DialogContent className="mobile-nav-dialog"><DialogTitle>HomeLane</DialogTitle><DialogDescription className="sr-only">Navigate HomeLane Park Street website</DialogDescription><nav>{navItems.map(([name,id])=><a href={`#${id}`} key={id} onClick={()=>setMenuOpen(false)}>{name}<ChevronRight size={21}/></a>)}</nav></DialogContent></Dialog>

    <Dialog open={!!selected} onOpenChange={open=>!open&&setSelected(null)}><DialogContent className="product-dialog">{selected&&<><Photo src={selected.image} alt={selected.title} className="detail-photo"/><div className="detail-copy"><span className="eyebrow">{selected.type}</span><DialogTitle>{selected.title}</DialogTitle><DialogDescription>{selected.text}</DialogDescription><div className="dialog-actions"><button className="pill olive" onClick={()=>openBooking(selected.title)}>Book a Similar 3D Design <ArrowUpRight size={16}/></button><a className="pill outline" href={MAP_URL} target="_blank" rel="noreferrer">Visit Park Street</a></div></div></>}</DialogContent></Dialog>

    <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
      <DialogContent className="enquiry-dialog booking-dialog">
        <span className="eyebrow">HomeLane Park Street</span>
        <DialogTitle>{bookingReady?"Your design-session details are ready.":"Book a Free 3D Design Session"}</DialogTitle>
        <DialogDescription>{bookingReady?"To confirm an actual appointment with HomeLane Park Street, call the studio using the button below.":"Fill this form without leaving the website. Bring your floor plan and site images when you visit the studio."}</DialogDescription>
        {bookingReady?
          <div className="booking-ready"><CheckCircle2 size={42}/><p>Your details stay on this page; no external booking website has opened. Use the official Park Street number to confirm the appointment.</p><a className="pill olive" href={`tel:${PHONE}`}>Call 1800 102 4663 <Phone size={16}/></a><button className="pill outline" onClick={()=>setBookingReady(false)}>Edit details</button></div>
        :
          <form className="enquiry-form" onSubmit={e=>{e.preventDefault();setBookingReady(true);}}>
            <label>Your name<input name="name" required autoComplete="name" maxLength={100}/></label>
            <label>Phone number<input name="phone" type="tel" required autoComplete="tel" maxLength={20}/></label>
            <label>Email address<input name="email" type="email" autoComplete="email" maxLength={254}/></label>
            <label>Project location<input name="location" required placeholder="e.g. Kolkata, New Town" maxLength={160}/></label>
            <label>What do you want designed?<input name="project" required defaultValue={bookingTopic} maxLength={160}/></label>
            <label>Tell us about your home<textarea name="message" rows={4} maxLength={2000} placeholder="2BHK / 3BHK, rooms, budget range, possession status, design preferences…"/></label>
            <button className="pill olive" type="submit">Continue Booking <ArrowUpRight size={16}/></button>
          </form>
        }
      </DialogContent>
    </Dialog>
  </div>;
}
