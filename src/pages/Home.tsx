import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useAnimation, useInView } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { 
  PhoneCall,
  CheckCircle2, 
  Wrench, 
  Clock, 
  DollarSign, 
  ThumbsUp, 
  Droplets, 
  RefreshCw, 
  VolumeX, 
  PowerOff, 
  AlertCircle,
  Menu,
  X,
  Mail,
  MapPin,
  Star,
  ShieldCheck,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const WHATSAPP_NUMBER = "6581313085";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
const PHONE_URL = `tel:${WHATSAPP_NUMBER}`;

const contactFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(8, "Valid phone number is required"),
  email: z.string().email("Valid email is required"),
  message: z.string().min(10, "Please provide more details about the issue"),
});

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const glassCard = "backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl text-white";

function AnimatedCounter({ value, duration = 2 }: { value: number, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = value / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [value, duration, isInView]);

  return <span ref={ref}>{count}</span>;
}

export default function Home() {
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof contactFormSchema>) {
    toast({
      title: "Message Sent Successfully!",
      description: "Our team will get back to you shortly.",
    });
    form.reset();
  }

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-gradient-to-r from-black to-indigo-900/95 backdrop-blur-xl shadow-lg">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
  <div className="bg-primary/20 p-1 rounded-lg group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-shadow">
    <img
      src="/logosg.jpg"
      alt="WasherRepair SG Logo"
      className="h-10 w-10 object-contain"
    />
  </div>

  <span className="font-bold text-2xl tracking-tight text-white group-hover:text-blue-100 transition-colors drop-shadow-md">
    WasherRepair SG
  </span>
</div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#services" className="text-blue-100 hover:text-white transition-colors">Services</a>
            <a href="#why-us" className="text-blue-100 hover:text-white transition-colors">Why Choose Us</a>
            <a href="#faq" className="text-blue-100 hover:text-white transition-colors">FAQ</a>
            <a href="#contact" className="text-blue-100 hover:text-white transition-colors">Contact</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Button variant="outline" asChild className="gap-2 font-semibold border-white/20 text-white bg-white/10 hover:bg-white/20 shimmer-sweep overflow-hidden">
                <a href={PHONE_URL}>
                  <PhoneCall className="h-4 w-4" />
                  6581313085
                </a>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Button asChild className="gap-2 font-semibold bg-[#25D366] hover:bg-[#20bd5a] text-white border-transparent animate-glow-pulse">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-blue-900 border-b border-white/10 shadow-lg flex flex-col py-4 px-4 gap-4">
            <a href="#services" onClick={closeMenu} className="p-2 font-medium text-white">Services</a>
            <a href="#why-us" onClick={closeMenu} className="p-2 font-medium text-white">Why Choose Us</a>
            <a href="#faq" onClick={closeMenu} className="p-2 font-medium text-white">FAQ</a>
            <a href="#contact" onClick={closeMenu} className="p-2 font-medium text-white">Contact</a>
            <div className="h-px bg-white/10 my-2" />
            <Button variant="outline" asChild className="gap-2 justify-start border-white/20 text-white bg-white/10">
              <a href={PHONE_URL}>
                <PhoneCall className="h-4 w-4" />
                Call: 6581313085
              </a>
            </Button>
            <Button asChild className="gap-2 justify-start bg-[#25D366] hover:bg-[#20bd5a] text-white animate-glow-pulse">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="h-4 w-4" />
                WhatsApp Us
              </a>
            </Button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-6 pb-6 lg:pt-32 lg:pb-40 overflow-hidden bg-background">
        {/* Floating Orbs Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              x: [0, 100, -50, 0], 
              y: [0, -50, 100, 0],
              scale: [1, 1.2, 0.8, 1]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-screen filter blur-3xl opacity-70"
          />
          <motion.div 
            animate={{ 
              x: [0, -100, 50, 0], 
              y: [0, 100, -50, 0],
              scale: [1, 0.8, 1.2, 1]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-400/30 rounded-full mix-blend-screen filter blur-3xl opacity-70"
          />
          <motion.div 
            animate={{ 
              x: [0, 50, -100, 0], 
              y: [0, -100, 50, 0],
              scale: [1, 1.5, 0.9, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-cyan-400/20 rounded-full mix-blend-screen filter blur-3xl opacity-50"
          />
        </div>

        <div className="container relative z-10 mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col gap-6"
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 border border-white/20 text-black text-sm font-semibold tracking-wider mb-6 backdrop-blur-md shadow-lg">
                #1 TRUSTED REPAIR IN SINGAPORE
              </span>
              <h1 className="text-4xl lg:text-7xl font-extrabold tracking-tight text-black leading-[1.1]">
                Your Washing Machine Repair Service <br />
                <span className="animate-gradient-shift" style={{ 
                  background: "linear-gradient(to right, #60a5fa, #c084fc, #22d3ee, #60a5fa)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>Fast & Flawlessly</span>
              </h1>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <p className=" text-blue-400 leading-relaxed max-w-xl font-medium">
                Don't let a broken washing machine ruin your day. We provide expert, same-day repair services across Singapore with transparent pricing and a solid 30-day warranty.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-5 mt-6">
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Button size="lg" asChild className="w-full sm:w-auto gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-lg h-16 px-10 shadow-[0_0_30px_rgba(37,211,102,0.4)] hover:shadow-[0_0_40px_rgba(37,211,102,0.6)] border-transparent transition-all">
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp className="h-6 w-6" />
                    Chat on WhatsApp
                  </a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Button size="lg" variant="outline" asChild className="w-full sm:w-auto gap-2 text-lg h-16 px-10 border-2 border-white/30 hover:bg-white/10 hover:border-white/50 text-white bg-amber-600 backdrop-blur-sm shimmer-sweep overflow-hidden">
                  <a href={PHONE_URL}>
                    <PhoneCall className="h-6 w-6" />
                    Call 6581313085
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats Bar */}
            <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-white/20">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-black"><AnimatedCounter value={2000} />+</span>
                <span className="text-sm text-slate-800 mt-1">Machines Fixed</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-black"><AnimatedCounter value={4.9} duration={1} />/5</span>
                <span className="text-sm text-slate-800 mt-1">Star Rating</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-black flex items-center gap-1"><Zap className="h-6 w-6 text-yellow-400" /> Fast</span>
                <span className="text-sm text-slate-800 mt-1">Same-Day Service</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Floating Badge */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -left-6 z-20 backdrop-blur-xl bg-white/10 border border-white/30 p-4 rounded-2xl shadow-2xl flex items-center gap-3"
            >
              <div className="bg-green-400/20 p-2 rounded-full">
                <ShieldCheck className="h-8 w-8 text-green-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-blue-500 font-bold text-lg leading-tight">30-Day</span>
                <span className="text-blue-800 text-sm">Warranty Included</span>
              </div>
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/30 to-purple-500/30 rounded-[2rem] transform translate-x-4 translate-y-4 -z-10 blur-xl" />
            <div className="relative rounded-[2rem] overflow-hidden border-4 border-white/20 shadow-2xl">
              <img 
                src="/hero-technician.png" 
                alt="Professional Washing Machine Technician" 
                className="object-cover w-full h-auto aspect-square lg:aspect-[4/3] scale-105 hover:scale-100 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Wave Divider 1 */}
      <div className="w-full overflow-hidden bg-[#0f172a] -mt-1">
        <svg viewBox="0 0 1440 120" className="w-full h-[60px] fill-[#0ea5e9] rotate-180" preserveAspectRatio="none">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>

      {/* Why Choose Us */}
      <section id="why-us" className="py-24 bg-white text-black">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-extrabold mb-4 drop-shadow-md">Why Singaporeans Trust Us</h2>
            <p className="text-slate-800 text-xl font-light">We combine technical expertise with outstanding customer service to get your laundry routine back on track.</p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { icon: ShieldCheck, title: "30-Day Warranty", desc: "We stand by our work. All repairs include a 30-day guarantee on parts and labor." },
              { icon: Wrench, title: "Expert Technicians", desc: "Highly trained professionals experienced with all major washing machine brands." },
              { icon: Clock, title: "Fast & Reliable", desc: "Same-day service available. We show up on time and work efficiently." },
              { icon: DollarSign, title: "Affordable Pricing", desc: "Transparent quotes before any work begins. No surprising hidden costs." },
              { icon: ThumbsUp, title: "Satisfaction Guaranteed", desc: "Your peace of mind is our priority. We don't leave until the job is done right." },
              { icon: Star, title: "Top Rated", desc: "Hundreds of 5-star reviews from satisfied customers across the island." }
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp} 
                whileHover={{ y: -8, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}
                className={`${glassCard} p-8 rounded-3xl transition-all duration-300`}
              >
                <div className="bg-white/50 w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner mb-6 text-white backdrop-blur-md">
                  <feature.icon className="h-8 w-8 text-slate-800" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-black">{feature.title}</h3>
                <p className="text-slate-700 leading-relaxed text-lg">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Wave Divider 2 */}
      <div className="w-full overflow-hidden bg-[#0c4a6e] -mt-1">
        <svg viewBox="0 0 1440 120" className="w-full h-[60px] fill-[#1e40af]" preserveAspectRatio="none">
          <path d="M0,64L80,74.7C160,85,320,107,480,106.7C640,107,800,85,960,69.3C1120,53,1280,43,1360,37.3L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
        </svg>
      </div>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white text-black">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 rounded-3xl overflow-hidden shadow-2xl relative"
          >
            <img src="/laundry-room.png" alt="Modern clean laundry area" className="w-full h-[300px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0c4a6e]/90 to-transparent flex items-center p-8 lg:p-16">
              <div className="max-w-2xl">
                <h2 className="text-4xl lg:text-5xl text-white font-extrabold mb-4">We Fix All Washing Machine Problems</h2>
                <p className="text-xl text-teal-100 font-light">From simple leaks to complex control board failures, our experts have seen and fixed it all.</p>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Common Issues */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <h3 className="text-3xl font-bold mb-8 flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
                  <AlertCircle className="text-black h-8 w-8" />
                </div>
                Common Symptoms
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Droplets, label: "Not draining or leaking" },
                  { icon: RefreshCw, label: "Not spinning" },
                  { icon: VolumeX, label: "Strange loud noises" },
                  { icon: PowerOff, label: "Won't start or turn on" },
                  { icon: AlertCircle, label: "Showing error codes" },
                  { icon: ShieldCheck, label: "Door won't open/lock" }
                ].map((symptom, i) => (
                  <motion.div 
                    key={i} 
                    variants={fadeInUp} 
                    whileHover={{ y: -5, scale: 1.02 }}
                    className={`${glassCard} flex items-center gap-4 p-5 rounded-2xl`}
                  >
                    <div className="bg-white/20 p-2.5 rounded-xl text-teal-200">
                      <symptom.icon className="h-6 w-6" />
                    </div>
                    <span className="font-semibold text-lg text-teal-300">{symptom.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Critical Repairs */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <h3 className="text-3xl font-bold mb-8 flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
                  <Wrench className="text-teal-300 h-8 w-8" />
                </div>
                Expert Repairs
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <motion.div variants={fadeInUp} className={`${glassCard} rounded-3xl p-6 self-start`}>
                  <ul className="space-y-5">
                    {[
                      "Motor and drive belt replacement",
                      "Suspension rod and spring fixes",
                      "Bearing and seal replacement",
                      "Control board diagnostics & repair",
                      "Water inlet valve replacement",
                      "Drain pump clearing & replacement"
                    ].map((repair, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <CheckCircle2 className="h-6 w-6 text-[#25D366] shrink-0 mt-0.5" />
                        <span className="
                        font-medium text-lg text-black leading-tight">{repair}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
                
                <motion.div 
                  variants={fadeInUp} 
                  className="rounded-3xl overflow-hidden shadow-xl border-4 border-white/20 relative group"
                >
                  <img src="/technician-door.png" alt="Friendly technician" className="w-full h-full object-cover aspect-square transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#065f46] via-transparent to-transparent opacity-80" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Wave Divider 3 */}
      <div className="w-full overflow-hidden bg-[#1e1b4b] -mt-1">
        <svg viewBox="0 0 1440 120" className="w-full h-[60px] fill-[#065f46]" preserveAspectRatio="none">
          <path d="M0,96L80,85.3C160,75,320,53,480,48C640,43,800,53,960,69.3C1120,85,1280,107,1360,117.3L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
        </svg>
      </div>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-white text-black">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold mb-4 drop-shadow-lg">Frequently Asked Questions</h2>
            <p className="text-indigo-800 text-xl">Everything you need to know about our repair services.</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`${glassCard} rounded-3xl p-6 md:p-10`}
          >
            <Accordion type="single" collapsible className="w-full">
              {[
                { q: "What are your operating hours?", a: "We operate 7 days a week, 9am–8pm including public holidays." },
                { q: "How quickly can you respond?", a: "We typically respond within 1–2 hours and can often schedule same-day service." },
                { q: "What brands do you service?", a: "We service all major brands including Samsung, LG, Bosch, Electrolux, Panasonic, Whirlpool, and more." },
                { q: "What is your warranty policy?", a: "All repairs come with a 30-day warranty on parts and labor." },
                { q: "How do I prepare my machine for repair?", a: "Simply ensure the machine is accessible and clear any items from around it. We handle the rest." },
                { q: "What payment methods do you accept?", a: "We accept cash, PayNow, PayLah!, and bank transfer." }
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b border-white/10 py-3">
                  <AccordionTrigger className="text-left font-bold text-xl hover:text-indigo-800 transition-colors py-4 text-black">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-black text-lg leading-relaxed pb-6">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Wave Divider 4 */}
      <div className="w-full overflow-hidden bg-[#7c3aed] -mt-1">
        <svg viewBox="0 0 1440 120" className="w-full h-[60px] fill-[#312e81]" preserveAspectRatio="none">
          <path d="M0,64L80,58.7C160,53,320,43,480,53.3C640,64,800,96,960,101.3C1120,107,1280,85,1360,74.7L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
        </svg>
      </div>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-br from-[#3ac6ed] via-[#000613] to-[#0891b2] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center"
            >
              <h2 className="text-5xl font-extrabold mb-6 text-white drop-shadow-lg">Get In Touch Today!</h2>
              <p className="text-blue-100 text-2xl mb-12 max-w-md font-light leading-relaxed">
                Don't wait for your laundry to pile up. Contact our expert team now for a fast, reliable repair quote.
              </p>

              <div className="space-y-8 mb-12">
                <a href={PHONE_URL} className="flex items-center gap-5 text-2xl font-bold hover:text-cyan-200 transition-colors group">
                  <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md group-hover:scale-110 transition-transform">
                    <PhoneCall className="h-8 w-8" />
                  </div>
                  +65 8131 3085
                </a>
                <a href="mailto:washerrepairsg@gmail.com" className="flex items-center gap-5 text-2xl font-bold hover:text-cyan-200 transition-colors group">
                  <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md group-hover:scale-110 transition-transform">
                    <Mail className="h-8 w-8" />
                  </div>
                  washerrepairsg@gmail.com
                </a>
                <div className="flex items-center gap-5 text-2xl font-bold text-blue-100">
                  <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                    <MapPin className="h-8 w-8" />
                  </div>
                  Serving all of Singapore
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-5">
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                  <Button size="lg" asChild className="w-full sm:w-auto gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white border-transparent text-lg h-16 px-8 shadow-xl animate-glow-pulse">
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                      <FaWhatsapp className="h-6 w-6" />
                      WhatsApp Us Now
                    </a>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                  <Button size="lg" variant="outline" asChild className="w-full sm:w-auto gap-2 text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50 bg-white/5 backdrop-blur-sm text-lg h-16 px-8 shadow-xl shimmer-sweep overflow-hidden">
                    <a href={PHONE_URL}>
                      <PhoneCall className="h-6 w-6" />
                      Call Direct
                    </a>
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`${glassCard} rounded-[2.5rem] p-10 lg:p-12`}
            >
              <h3 className="text-3xl font-bold mb-8 text-white">Request a Repair</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-blue-50 text-lg">Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-14 text-lg rounded-xl focus-visible:ring-cyan-400" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-300" />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-blue-50 text-lg">Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="8131 3085" className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-14 text-lg rounded-xl focus-visible:ring-cyan-400" {...field} />
                          </FormControl>
                          <FormMessage className="text-red-300" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-blue-50 text-lg">Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-14 text-lg rounded-xl focus-visible:ring-cyan-400" {...field} />
                          </FormControl>
                          <FormMessage className="text-red-300" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-blue-50 text-lg">Machine Brand & Issue</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="e.g. Samsung washer not spinning..." 
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/40 min-h-[140px] resize-none text-lg rounded-xl focus-visible:ring-cyan-400" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-red-300" />
                      </FormItem>
                    )}
                  />
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-4">
                    <Button type="submit" className="w-full text-xl h-16 bg-white text-blue-900 hover:bg-blue-50 rounded-xl font-bold shadow-xl border-none">
                      Send Message
                    </Button>
                  </motion.div>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 text-white group cursor-pointer">
              <div className="bg-white/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                <Wrench className="h-6 w-6 text-primary group-hover:text-blue-400 transition-colors" />
              </div>
              <span className="font-bold text-xl tracking-tight">WasherRepair SG</span>
            </div>
            
            <div className="flex gap-8 text-base">
              <a href="#services" className="hover:text-white transition-colors">Services</a>
              <a href="#why-us" className="hover:text-white transition-colors">Why Us</a>
              <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            </div>

            <div className="flex gap-4">
              <motion.a 
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" 
                className="p-3 rounded-xl bg-slate-900 hover:bg-[#25D366] hover:text-white transition-colors shadow-lg border border-slate-800 hover:border-transparent"
              >
                <FaWhatsapp className="h-6 w-6" />
                <span className="sr-only">WhatsApp</span>
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                href={PHONE_URL} 
                className="p-3 rounded-xl bg-slate-900 hover:bg-primary hover:text-white transition-colors shadow-lg border border-slate-800 hover:border-transparent"
              >
                <PhoneCall className="h-6 w-6" />
                <span className="sr-only">Call</span>
              </motion.a>
            </div>
          </div>
          
          <div className="mt-10 pt-8 border-t border-slate-800 text-center text-sm font-medium">
            <p>&copy; 2026 WasherRepair SG. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.a
  href={WHATSAPP_URL}
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.6)] hover:bg-[#20bd5a] group animate-glow-pulse"
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  aria-label="Chat on WhatsApp"
>
  <FaWhatsapp className="h-8 w-8" />

  <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-slate-900 px-4 py-2 rounded-xl text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
    Need Help? Chat Now!
  </span>
</motion.a>
    </div>
  );
}
