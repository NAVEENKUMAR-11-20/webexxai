import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Brain, Upload, Layers, FileText, Sparkles, Moon, Eye, ArrowRight, Linkedin, Github, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";
import heroBrain from "@/assets/hero-brain.png";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

const Index = () => {
  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      <ParticleBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              className="text-center lg:text-left"
            >
              <motion.div variants={fadeUp} custom={0} className="mb-4">
                <span className="inline-flex items-center gap-2 glass-card px-4 py-2 text-sm font-medium text-primary">
                  <Sparkles className="w-4 h-4" />
                  AI-Powered Learning
                </span>
              </motion.div>
              <motion.h1
                variants={fadeUp}
                custom={1}
                className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6"
              >
                Complex Concepts.{" "}
                <span className="gradient-text">Simple Explanations.</span>
              </motion.h1>
              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0"
              >
                Learn any topic at your level — from 10-year-old simplicity to research-level depth.
              </motion.p>
              <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link to="/explain">
                  <Button variant="hero" size="lg" className="text-base px-8">
                    Try Now <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
                <Link to="/explain">
                  <Button variant="hero-outline" size="lg" className="text-base px-8">
                    <Upload className="w-4 h-4 mr-1" /> Upload File
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative">
                <img
                  src={heroBrain}
                  alt="AI Brain Visualization"
                  className="w-full max-w-md rounded-3xl animate-float"
                />
                <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Three simple steps to understand anything
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Upload, title: "Upload or Type", desc: "Enter a topic or upload a PDF, DOCX, or TXT file", step: "01" },
              { icon: Layers, title: "Choose Level", desc: "Pick your understanding level — child, college, or research", step: "02" },
              { icon: Brain, title: "Get Explanation", desc: "Receive a tailored explanation instantly", step: "03" },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="glass-card-hover p-8 text-center group"
              >
                <div className="text-5xl font-heading font-bold text-primary/20 mb-4">{item.step}</div>
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
              Powerful <span className="gradient-text">Features</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Layers, title: "Multi-Level Explanation", desc: "Choose from child-friendly to research-grade depth" },
              { icon: FileText, title: "File Upload Support", desc: "Upload PDF, DOCX, or TXT files for analysis" },
              { icon: Brain, title: "AI Topic Detection", desc: "Automatically detect the main concept from your content" },
              { icon: Eye, title: "Visual Learning", desc: "Clean, structured explanations with clear formatting" },
              { icon: Moon, title: "Dark & Light Mode", desc: "Beautiful themes with smooth transitions" },
              { icon: Sparkles, title: "Smart Simplification", desc: "Complex ideas broken into understandable pieces" },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="glass-card p-6 group hover:border-primary/30 transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="relative z-10 py-24 px-4">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 sm:p-12 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl font-heading font-bold text-primary">NP</span>
            </div>
            <h3 className="text-2xl font-heading font-bold mb-1">Naveenkumar P</h3>
            <p className="text-primary font-medium mb-4">AI Researcher | ML Engineer | Technical Educator</p>
            <p className="text-sm text-muted-foreground mb-2">
              Channel: <span className="text-foreground font-medium">Knowledge Peak</span>
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Ethical AI · Deep Learning · Cryptography · Neuro-Symbolic Systems
            </p>
            <div className="flex justify-center gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5 text-primary" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors" aria-label="GitHub">
                <Github className="w-5 h-5 text-primary" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors" aria-label="YouTube">
                <Youtube className="w-5 h-5 text-primary" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-4 border-t border-border/50">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2026 Explain It Like I'm 10 — Built with ❤️ by Naveenkumar P</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
