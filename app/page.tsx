import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { Blog } from "@/components/blog";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center w-full overflow-x-hidden">
      <Hero />
      <div className="w-full max-w-5xl mx-auto px-6 flex flex-col gap-32 pb-24">
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Blog />
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
