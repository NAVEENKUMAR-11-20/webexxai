import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, Brain, GraduationCap, Microscope, Copy, RotateCcw, Check, X, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";
import { toast } from "sonner";

type Level = 10 | 18 | 21;

const MOCK_EXPLANATIONS: Record<Level, (topic: string) => string> = {
  10: (topic) => `🧒 Imagine you have a magical toy box...\n\n**${topic}** is actually pretty simple when you think about it!\n\nIt's like when you play with building blocks. You start with small pieces and put them together to make something big and cool.\n\nHere's an easy way to think about it:\n• Think of it like a recipe — you follow steps, and at the end, you get something awesome!\n• It's similar to how you learn to ride a bike — at first it seems hard, but once you get it, it's easy!\n• The important thing to remember is that ${topic} helps people solve problems, just like how a calculator helps you with math.\n\n**Fun Fact:** Many everyday things you use — like your phone, video games, and even your school tablet — use ideas from ${topic}!\n\nSo next time someone mentions ${topic}, you can say: "Oh, I know what that is! It's like building blocks for solving problems!" 🎉`,

  18: (topic) => `🎓 **${topic} — A College-Level Overview**\n\n## Introduction\n${topic} is a foundational concept in modern computing and technology. At its core, it addresses the challenge of processing and transforming information in structured, efficient ways.\n\n## Key Principles\n1. **Abstraction**: ${topic} relies on layers of abstraction to manage complexity. Each layer provides a simplified interface for the layer above it.\n2. **Modularity**: Systems are divided into independent modules that can be developed, tested, and maintained separately.\n3. **Scalability**: As data and usage grow, ${topic} provides mechanisms to handle increased demand.\n\n## Technical Foundation\nThe theoretical underpinnings of ${topic} draw from several areas:\n- **Mathematics**: Set theory, logic, and discrete mathematics\n- **Information Theory**: Shannon's work on data compression and transmission\n- **Systems Engineering**: Design patterns and architectural principles\n\n## Real-World Applications\n${topic} is applied across many domains including software engineering, data science, cybersecurity, and artificial intelligence.\n\n## Further Reading\nFor deeper understanding, consider exploring related topics such as algorithms, data structures, and computational complexity theory.`,

  21: (topic) => `🔬 **${topic} — Research-Level Analysis**\n\n## Abstract\nThis exposition provides a rigorous treatment of ${topic}, examining its theoretical foundations, current research frontiers, and open problems in the field.\n\n## 1. Formal Framework\nLet Σ denote a finite alphabet and L ⊆ Σ* represent the language recognized by our computational model. The complexity class associated with ${topic} can be formally defined as:\n\nC = {L : ∃M, ∀x ∈ Σ*, M(x) terminates in T(|x|) steps}\n\nwhere T: ℕ → ℕ is a polynomially bounded function.\n\n## 2. Theoretical Foundations\n${topic} emerges from the intersection of several mathematical disciplines:\n- **Category Theory**: The categorical semantics provide a unified framework for understanding compositional properties.\n- **Type Theory**: Martin-Löf type theory offers a constructive foundation for verification.\n- **Domain Theory**: Scott domains and continuous lattices model computational approximation.\n\n## 3. Current Research Directions\nRecent advances in ${topic} include:\n1. **Quantum Extensions**: Generalizing classical results to the quantum computational model (Aaronson, 2023).\n2. **Homotopy-Theoretic Approaches**: Univalent foundations provide new perspectives on equivalence.\n3. **Probabilistic Variants**: Randomized algorithms achieving sub-linear complexity bounds.\n\n## 4. Open Problems\n- The relationship between P and NP within the context of ${topic}\n- Optimal lower bounds for distributed implementations\n- Decidability of equivalence checking in higher-order settings\n\n## 5. Conclusion\nThe study of ${topic} remains an active and vibrant area of research with significant implications for both theoretical computer science and practical applications.\n\n**References**: Sipser (2012), Arora & Barak (2009), Goldreich (2008)`,
};

const Explain = () => {
  const [mode, setMode] = useState<"text" | "file">("text");
  const [topic, setTopic] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [explanation, setExplanation] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const currentTopic = mode === "file" && fileContent ? fileContent.slice(0, 50).replace(/\n/g, " ") : topic;

  // Typing effect
  useEffect(() => {
    if (!explanation) { setDisplayedText(""); return; }
    let i = 0;
    setDisplayedText("");
    const interval = setInterval(() => {
      setDisplayedText(explanation.slice(0, i + 1));
      i++;
      if (i >= explanation.length) clearInterval(interval);
    }, 8);
    return () => clearInterval(interval);
  }, [explanation]);

  const handleFileUpload = useCallback((file: File) => {
    const validTypes = [".pdf", ".docx", ".txt", "text/plain", "application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    const ext = file.name.toLowerCase().slice(file.name.lastIndexOf("."));
    if (![".pdf", ".docx", ".txt"].includes(ext)) {
      toast.error("Please upload a PDF, DOCX, or TXT file");
      return;
    }
    setFileName(file.name);
    if (ext === ".txt") {
      const reader = new FileReader();
      reader.onload = (e) => setFileContent(e.target?.result as string || "");
      reader.readAsText(file);
    } else {
      setFileContent(`[Content extracted from ${file.name}] — This is a demo. Enable AI backend for real file parsing.`);
    }
    setMode("file");
    setExplanation("");
    setSelectedLevel(null);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  }, [handleFileUpload]);

  const generate = useCallback(() => {
    if (!currentTopic.trim() || !selectedLevel) return;
    setIsGenerating(true);
    setExplanation("");
    setTimeout(() => {
      setExplanation(MOCK_EXPLANATIONS[selectedLevel](currentTopic.trim()));
      setIsGenerating(false);
    }, 1500);
  }, [currentTopic, selectedLevel]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(explanation);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setTopic("");
    setFileName("");
    setFileContent("");
    setSelectedLevel(null);
    setExplanation("");
    setDisplayedText("");
  };

  const levels: { level: Level; icon: typeof Brain; label: string; emoji: string; desc: string }[] = [
    { level: 10, icon: Brain, label: "Like I'm 10", emoji: "🧒", desc: "Simple, fun, real-life examples" },
    { level: 18, icon: GraduationCap, label: "Like I'm 18", emoji: "🎓", desc: "Academic, technical terms" },
    { level: 21, icon: Microscope, label: "Like I'm 21+", emoji: "🔬", desc: "Research-grade, formal" },
  ];

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      <ParticleBackground />
      <Navbar />

      <main className="relative z-10 pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-3">
              <span className="gradient-text">Explain</span> Any Concept
            </h1>
            <p className="text-muted-foreground">Type a topic or upload a file to get started</p>
          </motion.div>

          {/* Mode Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex justify-center gap-2 mb-8"
          >
            <Button
              variant={mode === "text" ? "hero" : "glass"}
              onClick={() => { setMode("text"); setExplanation(""); setSelectedLevel(null); }}
            >
              <Sparkles className="w-4 h-4 mr-1" /> Type Topic
            </Button>
            <Button
              variant={mode === "file" ? "hero" : "glass"}
              onClick={() => { setMode("file"); setExplanation(""); setSelectedLevel(null); }}
            >
              <Upload className="w-4 h-4 mr-1" /> Upload File
            </Button>
          </motion.div>

          {/* Input Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            {mode === "text" ? (
              <div className="glass-card p-6">
                <label className="block text-sm font-medium mb-2 text-foreground">Enter a technical topic</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => { setTopic(e.target.value); setExplanation(""); setSelectedLevel(null); }}
                  placeholder="e.g., Quantum Computing, Neural Networks, Blockchain..."
                  className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            ) : (
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`glass-card p-10 text-center cursor-pointer transition-all duration-300 ${
                  dragOver ? "border-primary shadow-[0_0_30px_hsl(var(--glow-primary))]" : "hover:border-primary/40"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.txt"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                />
                {fileName ? (
                  <div className="flex items-center justify-center gap-3">
                    <FileText className="w-8 h-8 text-primary" />
                    <div className="text-left">
                      <p className="font-medium text-foreground">{fileName}</p>
                      <p className="text-sm text-muted-foreground">File uploaded successfully</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); setFileName(""); setFileContent(""); }}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-primary/60 mx-auto mb-4" />
                    <p className="text-foreground font-medium mb-1">Drag & drop your file here</p>
                    <p className="text-sm text-muted-foreground">Supports PDF, DOCX, TXT</p>
                  </>
                )}
              </div>
            )}
          </motion.div>

          {/* Level Selection */}
          {currentTopic.trim() && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <p className="text-center text-sm text-muted-foreground mb-4">Choose your understanding level</p>
              <div className="grid sm:grid-cols-3 gap-4">
                {levels.map((l, i) => (
                  <motion.button
                    key={l.level}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => { setSelectedLevel(l.level); setExplanation(""); }}
                    className={`level-card ${selectedLevel === l.level ? "active" : ""}`}
                  >
                    <div className="text-3xl mb-2">{l.emoji}</div>
                    <h3 className="font-heading font-semibold mb-1">{l.label}</h3>
                    <p className="text-xs text-muted-foreground">{l.desc}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Generate Button */}
          {selectedLevel && currentTopic.trim() && !explanation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mb-8"
            >
              <Button variant="glow" size="lg" onClick={generate} disabled={isGenerating} className="px-10">
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" /> Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" /> Generate Explanation
                  </>
                )}
              </Button>
            </motion.div>
          )}

          {/* Loading */}
          <AnimatePresence>
            {isGenerating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass-card p-8 text-center mb-8"
              >
                <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Analyzing and generating explanation...</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Result */}
          <AnimatePresence>
            {displayedText && !isGenerating && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="glass-card p-6 sm:p-8"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-primary" />
                    <span className="font-heading font-semibold text-foreground">Explanation</span>
                    <span className="text-xs glass-card px-2 py-1">Level {selectedLevel}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => { setExplanation(""); generate(); }}>
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  {displayedText.split("\n").map((line, i) => {
                    if (line.startsWith("## ")) return <h2 key={i} className="text-lg font-heading font-semibold text-foreground mt-4 mb-2">{line.slice(3)}</h2>;
                    if (line.startsWith("**") && line.endsWith("**")) return <p key={i} className="font-semibold text-foreground">{line.slice(2, -2)}</p>;
                    if (line.startsWith("- ") || line.startsWith("• ")) return <p key={i} className="text-muted-foreground ml-4">• {line.slice(2)}</p>;
                    if (line.startsWith("1. ") || line.startsWith("2. ") || line.startsWith("3. ")) return <p key={i} className="text-muted-foreground ml-4">{line}</p>;
                    if (line.trim() === "") return <br key={i} />;
                    return <p key={i} className="text-muted-foreground leading-relaxed">{line.replace(/\*\*(.*?)\*\*/g, "$1")}</p>;
                  })}
                  {displayedText.length < explanation.length && (
                    <span className="inline-block w-0.5 h-5 bg-primary animate-pulse ml-0.5" aria-hidden="true" />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reset */}
          {explanation && !isGenerating && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mt-6">
              <Button variant="glass" onClick={reset}>
                <RotateCcw className="w-4 h-4 mr-2" /> Start Over
              </Button>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Explain;
