"use client";

import { useEffect, useRef, useState, type FormEvent, type CSSProperties } from "react";
import { ArrowDown, ArrowUpRight, ChevronLeft, ChevronRight, CircleUserRound, HeartHandshake, LampDesk, Leaf, Menu, Sofa, UserRound, Check, LoaderCircle } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const products = [
  { name: "Wooden Coffee Table", price: "$129.00", image: "coffee-table", category: "Coffee Table", description: "A quietly sculptural centrepiece with a warm wood grain, softened edges, and room for everyday rituals.", material: "Solid wood · natural finish" },
  { name: "Nima Solid Wood Sofa", price: "$499.00", image: "wood-sofa", category: "Seater Sofa", description: "A generous seat, a wooden frame, and beautifully soft upholstery. Made for slow mornings and evenings together.", material: "Wood · woven upholstery" },
  { name: "Wooden Dining Chair", price: "$129.00", image: "dining-chair", category: "Lounge Chair", description: "Clean lines and a beautifully balanced silhouette bring a little warmth to your favourite corner.", material: "Solid wood · natural finish" },
  { name: "Everyday Lounge Chair", price: "$129.00", image: "lounge-chair", category: "Lounge Chair", description: "A modern blend of form and function, perfect for reading corners or stylish lounging.", material: "Wood frame · woven upholstery" },
  { name: "Olive Accent Chair", price: "$249.00", image: "craft", category: "Lounge Chair", description: "An inviting olive-green seat and a warm timber frame. A considered companion for your living space.", material: "Solid wood · olive upholstery" },
  { name: "Everyday Book Shelf", price: "$189.00", image: "bedside", category: "Book Shelf", description: "Open, thoughtful storage for the books and objects that make your home yours.", material: "Solid wood · natural finish" },
];
type Product = (typeof products)[number];
const about = "When it comes to comfort, our furniture offers the advantage of plush cushioning and ergonomic design. Now you can relax and unwind in ultimate comfort.";
const features = [
  { title: "Premium Solid Wood", icon: Sofa, text: "Beautiful natural grain, lasting strength, and the warmth that only real wood can bring to a room.", detail: "We choose wood for its character as much as its strength. Natural variations in the grain make every piece individual. Keep wood out of direct heat and wipe spills with a soft, dry cloth." },
  { title: "Styles for Every Space", icon: LampDesk, text: "From a cosy apartment to a spacious home, considered proportions fit the way you live.", detail: "Start with the room you use most. Measure your space, leave room to move, and choose a piece that works with your everyday routine. We can help you find the right proportions." },
  { title: "Designed for Daily Life", icon: HeartHandshake, text: "Comfort and practicality, beautifully balanced. Furniture for your everyday moments.", detail: "A favourite seat should feel as good as it looks. Our collection combines relaxed silhouettes, useful surfaces, and easy-to-live-with finishes. Ask us about the right fabric for your home." },
  { title: "Thoughtful Craftsmanship", icon: Leaf, text: "From smooth finishes to considered details, every part of a piece has a purpose.", detail: "The small details make the difference: a softened edge, a comfortable angle, a beautiful joint. Explore the collection up close to find the details that speak to you." },
];
const categories = [
  { name: "Coffee Table", text: "With a beautiful curved-edge design and thoughtful storage. A favourite for everyday living.", image: "coffee-table", product: 0 },
  { name: "Seater Sofa", text: "Comfortable, considered, and made for slowing down. Designed to elevate your space.", image: "lounge-chair", product: 1 },
  { name: "Lounge Chair", text: "A modern blend of form and function, perfect for reading corners or stylish lounging.", image: "wood-sofa", product: 3 },
  { name: "Book Shelf", text: "A place for favourite reads and collected objects. Bring a little order to your everyday.", image: "bedside", product: 5 },
];
const policies: Record<string, string> = {
  "Shipping & Delivery": "Delivery options, costs, and lead times depend on your location and the piece you choose. Send an enquiry with the product name and your city to request the current details.",
  "Return Policy": "Please confirm the return terms for your chosen piece before placing an order. Custom dimensions and finishes may have different conditions. Contact the studio with any questions.",
  "Track Your Order": "For an order update, send the studio an enquiry with your order reference and the email used when ordering. Never include payment-card information.",
  "Furniture Care Guide": "Dust wood with a soft, dry cloth. Use coasters and avoid standing water, direct heat, and prolonged sunlight. Vacuum upholstery gently and blot spills promptly. Always follow the care label for your chosen fabric.",
  "Warranty Information": "Warranty coverage depends on the product and its materials. Request the applicable details before ordering, and retain your order confirmation for future enquiries.",
};
const navItems = [["Home", "home"], ["Product", "products"], ["Collection", "collection"], ["About", "about"], ["Contact", "contact"]];
function Photo({ name, alt, className = "", eager = false }: { name: string; alt: string; className?: string; eager?: boolean }) {
  return <img className={className} src={`/images/${name}.webp`} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" />;
}

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [product, setProduct] = useState<Product | null>(null);
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

  function openEnquiry(value = "") { setProduct(null); setInfo(null); setTopic(value); setFormStatus("idle"); setFormError(""); setEnquiry(true); }
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
        <Photo name="hero" alt="Olive-green wooden lounge furniture in a sunlit living room" className="hero-image" eager /><div className="hero-shade" />
        <header className="site-header"><a href="#home" className="brand" aria-label="Furnt home">Furnt.</a><nav className="desktop-nav" aria-label="Main navigation">{navItems.map(([name, id], i) => <a className={i === 0 ? "active" : ""} key={id} href={`#${id}`}>{name}</a>)}</nav><button className="header-contact" aria-label="Contact the studio" onClick={() => openEnquiry()}><CircleUserRound size={25} strokeWidth={1.5} /></button><button className="mobile-menu-button" aria-label="Open menu" onClick={() => setMenuOpen(true)}><Menu size={25} /></button></header>
        <div className="hero-copy"><h1 id="hero-title">Designed to Fit Your Life, <br />Not Just Your Space</h1><p>Discover timeless wooden furniture that elevates your space with<br className="desktop-break" /> natural elegance, functionality, and handcrafted charm.</p><a href="#about" className="pill hero-cta">Explore More</a></div>
        <a className="scroll-cue" href="#about"><span>Scroll Down</span><span className="mouse"><span /></span></a>
      </section>
      <section className="about-section section-wrap" id="about" aria-labelledby="about-title"><span className="eyebrow">About us</span><h2 id="about-title" className="about-text" aria-label={about}>{about.split(" ").map((word, i) => <span aria-hidden="true" className="about-word" key={i}>{word}{" "}</span>)}</h2></section>
      <section className="craft-section" aria-label="Our approach to furniture">
        <article className="craft-row" data-reveal><div className="craft-copy"><h2>Crafting Timeless Furniture<br />for Inspired Living</h2><p>Design furniture that perfectly fits your style and space. From natural materials and considered finishes to the smallest detail, find pieces that feel like you. Thoughtfully crafted, beautifully functional, and made to become part of your everyday.</p><a href="#products" className="pill olive">Explore Our Product</a></div><div className="craft-image round-right"><Photo name="craft" alt="Olive upholstered wood armchair beside a shelf of handmade ceramics" /></div></article>
        <article className="craft-row reverse" data-reveal><div className="craft-image round-left"><Photo name="writing-desk" alt="An open notebook on a wooden writing desk with a simple table lamp" /></div><div className="craft-copy"><h2>Create &amp; Customize Your<br />Furniture</h2><p>A home should tell your story. Explore warm woods, thoughtful proportions, and finishes that belong in your space. From your first idea to the final detail, make room for furniture that is distinctly yours.</p><button className="pill olive" onClick={() => openEnquiry("custom furniture")}>Explore Our Product</button></div></article>
        <article className="craft-row" data-reveal><div className="craft-copy"><h2>Create &amp; Customize Your<br />Furniture</h2><p>We are passionate about creating furniture that brings comfort and elegance to your home. With careful craftsmanship and timeless design, every piece becomes a backdrop for the moments that matter.</p><a href="#collection" className="pill olive">Explore Our Product</a></div><div className="craft-image round-right"><Photo name="sofa" alt="An ivory sofa with a green throw and sculpted walnut side table" /></div></article>
      </section>
      <section className="products-section section-wrap" id="products" aria-labelledby="products-title">
        <div className="section-heading" data-reveal><span className="eyebrow">Our product</span><h2 id="products-title">Most Selling Product</h2><p>Our best-sellers are loved for a reason. From timeless designs to everyday comfort,<br className="desktop-break" /> explore the pieces that make a house feel like home.</p></div>
        <div ref={railRef} className="product-rail" onScroll={() => setRailIndex(Math.round(railRef.current?.scrollLeft || 0))} aria-label="Furniture collection">{products.map((p, i) => <button data-reveal className="product-card" style={{ "--delay": `${Math.min(i, 3) * 100}ms` } as CSSProperties} key={p.name} onClick={() => setProduct(p)}><div className="product-photo"><Photo name={p.image} alt={p.name} /><span className="product-open"><ArrowUpRight size={23} /></span></div><div className="product-caption"><h3>{p.name}</h3><span>{p.price}</span></div><p>{p.category === "Seater Sofa" ? "Made for the comfort of everyday living." : "A timeless addition to your favourite space."}</p></button>)}</div>
        <div className="carousel-controls"><button aria-label="Previous products" disabled={railIndex < 2} onClick={() => moveRail(-1)}><ChevronLeft size={21} /></button><button aria-label="Next products" onClick={() => moveRail(1)} disabled={!!railRef.current && railIndex >= railRef.current.scrollWidth - railRef.current.clientWidth - 3}><ChevronRight size={21} /></button></div>
      </section>
      <section className="story-section" id="collection" aria-labelledby="story-title"><div className="story-sticky"><h2 id="story-title">A modern furniture collection<br className="desktop-break" /> made with passion and precision<br className="desktop-break" /> built to enhance your home,<br className="desktop-break" /> comfort, and style.</h2>{[["olive-chairs","A pair of olive chairs in afternoon light"],["window-corner","A peaceful corner opening onto a green garden"],["arched-kitchen","An interior with arched windows and timber cabinetry"],["bedside","Sculpted wooden storage with a soft lamp"],["craft","An olive chair and wooden shelf"],["sunlit-kitchen","Sunlight falling across natural wood cabinetry"]].map(([name,alt],i) => <div className={`story-photo story-photo-${i}`} key={name}><Photo name={name} alt={alt} /></div>)}</div></section>
      <section className="features-section section-wrap" aria-labelledby="features-title"><div className="section-heading" data-reveal><span className="eyebrow">Features</span><h2 id="features-title">Why choose us</h2><p>Choosing the right furniture is more than finding a piece that looks good.<br className="desktop-break" /> It is about comfort, character, and the way you live.</p></div><div className="features-grid">{features.map((feature,i) => <article className="feature-card" data-reveal style={{"--delay":`${i*80}ms`} as CSSProperties} key={feature.title}><feature.icon size={58} strokeWidth={1.15} /><h3>{feature.title}</h3><p>{feature.text}</p><button className="pill outline" onClick={() => setInfo({title:feature.title,text:feature.detail})}>Know More</button></article>)}</div></section>
      <section className="categories-section section-wrap" aria-label="Furniture categories"><span className="eyebrow">Categories</span><div className="category-list">{categories.map(category => <button className="category-row" key={category.name} onClick={() => setProduct(products[category.product])}><h2>{category.name}</h2><p>{category.text}</p><Photo className="category-photo" name={category.image} alt="" /><span className="pill">Know More</span></button>)}</div></section>
      <footer className="site-footer" id="contact"><div className="footer-top"><div className="footer-visit"><h2>Visit us</h2><p>Thoughtful furniture.<br />A space that feels like you.</p><button className="footer-enquiry" onClick={() => openEnquiry()}>Talk to our studio <ArrowUpRight size={15}/></button></div><div><h2>Program</h2>{Object.keys(policies).map(title => <button className="footer-link" key={title} onClick={() => setInfo({title,text:policies[title]})}>{title}</button>)}</div><div><h2>Quick links</h2>{[["Home","home"],["About","about"],["Contact","contact"],["Pricing","products"],["Shop Collection","collection"]].map(([name,id]) => <a className="footer-link" href={`#${id}`} key={name}>{name}</a>)}</div><div className="newsletter"><label htmlFor="newsletter-email">A little inspiration for your home.</label><form onSubmit={subscribe}><div className="email-field"><UserRound size={17}/><input id="newsletter-email" name="email" type="email" placeholder="Enter your email" autoComplete="email" maxLength={254} value={email} required onChange={e=>{setEmail(e.target.value);if(newsletterStatus!=="sending")setNewsletterStatus("idle");}}/></div><button className="pill" disabled={newsletterStatus==="sending"||newsletterStatus==="success"} aria-label="Join newsletter">{newsletterStatus==="sending"?<LoaderCircle className="spin" size={18}/>:newsletterStatus==="success"?<Check size={18}/>:"Join"}</button></form><p className="form-message" role="status">{newsletterStatus==="success"?"You’re on the list. Thank you for joining.":newsletterStatus==="error"?newsletterError:""}</p></div></div><a className="footer-wordmark" href="#home" aria-label="Furnt, back to top">Furnt.</a><div className="footer-bottom"><span>© {new Date().getFullYear()} Furnt. All rights reserved.</span><a href="#home">Back to top <ArrowDown size={14} className="up-arrow"/></a></div></footer>
    </main>
    <Dialog open={menuOpen} onOpenChange={setMenuOpen}><DialogContent className="mobile-nav-dialog"><DialogTitle>Furnt.</DialogTitle><DialogDescription className="sr-only">Explore our furniture collection</DialogDescription><nav aria-label="Mobile navigation">{navItems.map(([name,id]) => <a key={id} href={`#${id}`} onClick={()=>setMenuOpen(false)}>{name}<ArrowUpRight size={24}/></a>)}</nav></DialogContent></Dialog>
    <Dialog open={!!product} onOpenChange={open=>!open&&setProduct(null)}><DialogContent className="product-dialog">{product&&<><Photo name={product.image} alt={product.name} className="detail-photo"/><div className="detail-copy"><span className="eyebrow">{product.category}</span><DialogTitle>{product.name}</DialogTitle><DialogDescription>{product.description}</DialogDescription><div className="detail-price">{product.price}</div><p>{product.material}</p><p className="detail-note">Illustrative collection. Ask the studio to confirm specifications, price, and availability.</p><button className="pill olive" onClick={()=>openEnquiry(product.name)}>Enquire about this piece <ArrowUpRight size={16}/></button></div></>}</DialogContent></Dialog>
    <Dialog open={!!info} onOpenChange={open=>!open&&setInfo(null)}><DialogContent className="info-dialog">{info&&<><span className="eyebrow">Furnt studio</span><DialogTitle>{info.title}</DialogTitle><DialogDescription>{info.text}</DialogDescription><button className="pill olive" onClick={()=>openEnquiry(info.title)}>Talk to the studio <ArrowUpRight size={16}/></button></>}</DialogContent></Dialog>
    <Dialog open={enquiry} onOpenChange={setEnquiry}><DialogContent className="enquiry-dialog"><span className="eyebrow">Let’s make room</span><DialogTitle>{formStatus==="success"?"Thank you for your enquiry.":"A space that feels like you."}</DialogTitle><DialogDescription>{formStatus==="success"?"Your details have been saved for the studio to review.":"Tell us what you have in mind. We’d love to hear about your space."}</DialogDescription>{formStatus==="success"?<button className="pill olive" onClick={()=>setEnquiry(false)}>Back to exploring <ArrowUpRight size={16}/></button>:<form className="enquiry-form" onSubmit={sendEnquiry}><label>Your name<input name="name" required autoComplete="name" maxLength={100}/></label><label>Email address<input name="email" type="email" required autoComplete="email" maxLength={254}/></label><label>What are you looking for?<textarea name="message" required maxLength={3000} rows={4} defaultValue={topic?`I’m interested in ${topic}. `:""}/></label><input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"/><button className="pill olive" disabled={formStatus==="sending"}>{formStatus==="sending"?<><LoaderCircle size={16} className="spin"/> Sending…</>:<>Send enquiry <ArrowUpRight size={16}/></>}</button><p role="status" className="form-error">{formStatus==="error"?formError:""}</p></form>}</DialogContent></Dialog>
  </div>;
}
