import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Experience } from "../components/Experience";
import { Projects } from "../components/Projects";
import { Community } from "../components/Community";
import { Contact } from "../components/Contact";
import { RecruiterOverview } from "../components/RecruiterOverview";
import { GovernanceFeature } from "../components/GovernanceFeature";

export function Home() {
  return (
    <>
      <Hero />
      <GovernanceFeature />
      <Projects />
      <RecruiterOverview />
      <About />
      <Experience />
      <Community />
      <Contact />
    </>
  );
}
