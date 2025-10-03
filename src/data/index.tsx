import { ReactNode, lazy } from "react";
import "./index.css"
import {
  Icon,
  DeviceMobileSpeaker,
  Lightbulb,
  Rss,
  Drone,
  Brain,
  Camera,
  DeviceTabletSpeaker,
  Gear,
} from "@phosphor-icons/react";

import Heading from "../components/Heading/Heading";

import flipkart_png from "../assets/flipkart.png";

export interface Project {
  id: string;
  title: string;
  description: string;
  year: number | readonly [start: number, end?: number];
  url: string;
  color?: string;
  accent?: string;
  theme?: string;
  Icon?: Icon;
  content?: ReactNode;
}

const IconCount = lazy(
  () => fetch("https://script.google.com/macros/s/AKfycbyFtNDr2e26aHumtDOu780zD1O7ANfRqITkdBc-G3nG2tVG7Qat96Ac7hnsi4XYhDWXkQ/exec?proc=count", { redirect: "follow" })
    .then((res) => res.json())
    .then((data) => ({ default: () => <>{(data.count * 6).toLocaleString()}</> }))
    .catch(() => ({ default: () => <>{9000..toLocaleString()}</> }))
);

export const projects: ReadonlyArray<Project> = [
  {
    id: "airbound",
    title: "Airbound",
    description:
      "Built the world's most efficient drones to reduce the cost of delivery.",
    url: "https://airbound.co",
    year: 2021,
    color: "#FFFFFF",
    accent: "#1890FF",
    theme: "inverse",
    Icon: Drone,
    content: (
      <>
        <Heading id="what-is-it">What is it?</Heading>
        <p>
        Airbound is building the world's most advanced drones to reduce the cost of delivery by over 137x. By improving structural efficiency by 7x and aerodynamics by 6x, our drones create a world where no delivery costs more than a nickel.
        </p>
        <iframe width="100%" height="315" src="https://www.youtube.com/embed/9lAc1CxBbAI?si=Ka7_C2IifjMcK8tL" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        <Heading id="building-realtime-tools">Building the company from zero</Heading>
        <p>
        When I first conceptualized Airbound, my vision was straightforward—imagine Kirana Kart, but with drone deliveries. I was fascinated by the potential to revolutionize last-mile delivery in India's bustling urban centers, bringing everyday essentials to doorsteps through the air. However, reality quickly set in as I navigated India's complex airspace regulations. The dream of food and grocery delivery via drones wasn't immediately viable in the regulatory landscape.


        </p>
        <p>
        This roadblock became our pivot point. While researching alternative applications, I discovered a critical need in healthcare logistics: blood and medical supplies weren't reaching remote parts of India in time to save lives. The problem was clear—traditional transportation infrastructure was failing these communities, and we had the technology to bridge this gap.
        </p>
        
        <p>
        I refocused Airbound's mission on medical deliveries to rural and hard-to-reach areas. This wasn't just a market opportunity; it was a chance to create meaningful impact. I architected our VTOL platform from the ground up to be open-source, modular, and radically accessible. Every engineering decision—from flight controller software to component selection to our custom electronics stack—was made with resource-constrained environments in mind.
        </p>
        <p>
        The technical challenges were enormous. I led teams working on flight control systems, RF mesh networking, and autonomous air traffic management. Our infrastructure connected hospitals and blood banks to our drone network, allowing medical institutions to automate delivery requests and track fulfillment in real time, even in areas with limited connectivity.
        </p>
        <p>
        Our vision resonated with investors. When we closed our <a href="https://inc42.com/buzz/drone-startup-airbound-bags-funding-from-lightspeed/">first funding round of over $2M with backers including Lightspeed and Draper.</a> I made the difficult but confident decision to drop out of my education. The opportunity to build something that could save lives demanded my full commitment.
        </p>
        <p>
        The journey took us across India as we launched pilot programs in various regions, proving not just that our technology worked, but that it could operate sustainably in challenging environments. We expanded our partnerships to include government initiatives in both India and Africa, scaling our impact beyond what I had initially imagined.
        </p>
        
        <Heading id="whats-next">What's next?</Heading>
        <p>
        I left Airbound in 2024 after losing conviction in drone delivery as a scalable business. Conversations with officials in India and abroad confirmed my doubts—regulatory and infrastructure hurdles were too high for broad adoption. Meanwhile, pivot to defense tech showed clearer demand and made logical sense. The systems we built felt better suited for it.Although, right now, the company continues to focus on e-commerce and blood delivery, and I hope it makes a lasting impact there.
        </p>
      </>
    ),
  },
  {
    id: "cerebras-fellow",
    title: "Cerebras Fellow",
    description: "A fellowship for AI engineers and researchers by Cerebras",
    url: "https://www.cerebras.ai/fellows",
    year: [2025],
    color: "#FFFFFF",
    theme: "inverse",
    accent: "#f15a27",
    Icon: Brain,
    content: (
      <>
        <Heading id="the-problem-these-days">What is it?</Heading>
        <p>
        The Cerebras Fellows Program provides compelling engineers, researchers, and students, exclusive access to Cerebras inference.
        </p>
        <Heading id="requirements">What I'm doing there?</Heading>
        <p>
          As part of the fellowship, I'm building <a href="https://clayo.ai">Clayo AI</a> - Clay is your AI secretary that answers unknown calls, speaks naturally, and follows your rules. It greets callers, understands their intent, and decides who gets through.
It doesn’t touch your personal calls. It only engages with strangers—and sends you a short, clear summary of what was said.
        </p>
      </>
    ),
  },
  {
    id: "ondeck-fellow",
    title: "ODF' 23",
    description: "ODF is a fellowship for smart people looking to start companies.",
    url: "https://www.joinodf.com/",
    year: 2023,
    color: "#FFFFFF",
    accent: "#0c111f",
    theme: "inverse",
    Icon: DeviceMobileSpeaker,
    content: (
      <>
        <Heading id="digital-detox">What is it?</Heading>
        <p>
        The On Deck Founder Fellowship (ODF) is a ten-week remote program that brings together an incredible group of founders who are in the early stages of building their next startup. We combine the power of community, world-class speakers, and customized support to help you build the next unicorn.
        </p>
        <Heading id="heads-up">What I did?</Heading>
        <p>
        I was selected for the prestigious On Deck Fellowship with a six-month residency offer in San Francisco. Chose to defer the opportunity to stay grounded in India and focus on building locally, where the challenges felt more immediate and the impact more personal. Although, I regreted this decision later.
        </p>
      </>
    ),
  },
  {
    id: "ev-fellow",
    title: "Emergent Ventures Fellow",
    description: "A grant program run by Tyler Cowen and backed by Thiel and Schmidt foundation",
    url: "https://marginalrevolution.com/marginalrevolution/2021/09/emergent-ventures-india-new-winners-third-indian-cohort.html",
    year: [2021],
    accent: "#249c97",
    theme: "inverse",
    Icon: Lightbulb,
    content: (
      <>
        <Heading id="motivation">What is it?</Heading>
        <p>
        Launched in 2018, Emergent Ventures is a low-overhead fellowship and grant program that supports entrepreneurs and brilliant minds with highly scalable, "zero to one" ideas for meaningfully improving society. Mercatus Center faculty director Tyler Cowen administers the program. 
        </p>
        <iframe width="100%" height="315" src="https://www.youtube.com/embed/OuvrZFJLXSk?si=PzZkyhTHNdISDNOn&amp;start=611" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

        <Heading id="hello-huebert">What did you do there?</Heading>
        <p>
        We secured over $70,000 in grants from Emergent Ventures to build <a href="https://airbound.co/">Airbound</a>, with the goal of making drone delivery truly accessible. As part of the EV community, I had the chance to attend their global offsites, where fellows from around the world come together to share ideas and build lasting connections. During these gatherings, I had the opportunity to meet and learn from some of Silicon Valley’s leading founders, including Dylan Field (Figma), Vitalik Buterin (Ethereum), and Vinay Hiremath (Loom).
        </p>
      </>
    ),
  },
  {
    id: "impact-act",
    title: "Impact Act",
    description: "Hosted a Self-improvement podcast in my teenage years.",
    url: "https://podcasts.apple.com/in/podcast/impact-act/id1501541515",
    year: 2019,
    color: "#FFFFFF",
    theme: "inverse",
    accent: "#4D0507",
    Icon: Rss,
    content: (
      <>
        <Heading id="the-brief">What is it?</Heading>
        <p>
        Launched and hosted a long-form podcast during my freshman year of college, featuring high-profile guests—including international cricket star Chris Gayle. I built and led a production team of video editors and photographers, while personally managing audio editing and content marketing. The show grew to 1,000 weekly listeners before in-person studio operations were halted due to COVID-19.        </p>
        <iframe className="podcast" allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" frameBorder="0" height="450" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.podcasts.apple.com/in/podcast/impact-act/id1501541515"></iframe>
      </>
    ),
  },
  {
    id: "unscan-ai",
    title: "Unscan AI",
    description: "Built drones to automate inventory management in warehouses",
    url: "https://startupgraveyard.io/",
    year: 2024,
    Icon: Camera,
    theme: "inverse",
    accent: "#61DBA9",
    content: (
      <>
        <Heading id="an-obsession">What is it?</Heading>
        <p>
        We built a drone-based AI-powered inventory management solution for warehouses, using autonomous drones to scan and monitor inventory, improving accuracy and efficiency. The system uses computer vision and machine learning to analyze images, identify misplaced items, and reconcile inventory discrepancies, ultimately reducing costs and increasing productivity.
        </p>
        <iframe width="100%" height="315" src="https://www.youtube.com/embed/HY5ttMDubjI?si=dt8M8z-OGptmZqeg" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        
        <Heading id="providing-great-dx">What happened to it?</Heading>


        <p>
        I managed to land some pretty impressive partnerships for our startup - including one of India's biggest logistics players, several well-known global brands, and even a few public companies. I took charge of all the sales efforts and successfully got them to sign pilots, LOIs, and NDAs, which was a huge win for our business.
        </p>
        
          <p>
          The tricky part came when it was time to deliver. While I handled my end of the bargain by bringing these valuable clients to the table, the technical co-founders I'd brought on board struggled to build the production-ready product we needed. Despite having these amazing opportunities lined up, we couldn't fully capitalize on them due to execution challenges on the product side. Hence, we had to shut shop.

          </p>
        
          <img
              src={flipkart_png}
              alt="picture of me at flipkart warehouse"
            />
        
      </>
    ),
  },
  {
    id: "spill",
    title: "Spill",
    description: "A minimalist freewriting app to spill your thoughts out and reflect.",
    url: "https://tryspill.com",
    year: 2025,
    color: "#FFFFFF",
    accent: "#000206",
    theme: "inverse",
    Icon: DeviceTabletSpeaker,
    content: (
      <>
        <Heading id="digital-detox">What is it?</Heading>
        <p>
        One distraction-free space to spill your thoughts for a set time — brainstorm ideas, draft scripts, process life, whatever. Plus dictation when your fingers can't keep up, and voice chat with your notes when you need to think out loud.
        </p>
        <iframe width="100%" height="315" src="https://www.youtube.com/embed/lMEJB5fiwr8?si=O7xWwxPUZpvfb7VN" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        
        <Heading id="heads-up">What I did?</Heading>
        <p>
          I built Spill after meeting <a href="https://www.linkedin.com/in/vishruth-n/">Vishruth</a> at Network School— we decided to team up and see how things would go. I coded the entire UI of the app, keeping everything clean and minimalist to make writing feel effortless. I also added on-device dictation, so users can just speak and have their words appear instantly, all without sending anything to the cloud. On top of that, I handled the full brand design—from the logo to the overall look and feel. I even shot and edited the cinematic launch video to showcase what Spill is all about. Vishruth built the Reflect feature into the app, adding another layer to the writing experience.
        </p>
      </>
    ),
  },
  {
    id: "clayo",
    title: "Clayo AI",
    description: "An AI answers unknown callers, so you only get the calls that matter.",
    url: "https://clayo.ai",
    year: 2025,
    color: "#FFFFFF",
    accent: "#255FF1",
    theme: "inverse",
    Icon: DeviceMobileSpeaker,
    content: (
      <>
        <Heading id="digital-detox">What is it?</Heading>
        <p>
          AI that screens your calls and sends you summaries instead of interrupting you.
        </p>
        <iframe width="100%" height="315" src="https://www.youtube.com/embed/i-GWrbcAQ8E?si=gY9v6NPVa5lWiKni" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        <Heading id="heads-up">What I did?</Heading>
        <p>
        Clayo was a one of the portfolio projects of my venture studio called <a href="https://arclinelabs.com">Arcline Labs</a>. I helped build the landing page, making sure it clearly communicated what Clayo is all about and looked great visually. I also pitched in with marketing and branding, helping shape how Clayo is presented and making sure everything felt cohesive. Working with the Arcline team made the whole process collaborative and fun.
        </p>
      </>
    ),
  },
  {
    id: "cognite",
    title: "Cognite",
    description: "High-Performance ML Framework in Rust",
    url: "https://github.com/faraaz-baig/cognite",
    year: 2024,
    theme: "inverse",
    accent: "#FFD300",
    Icon: Gear,
    content: (
      <>
        <Heading id="the-brief">What is it?</Heading>
        <p>Cognite is a high-performance machine learning framework implemented in Rust, designed to leverage GPU acceleration for efficient computation. It aims to provide a fast and memory-efficient alternative to existing ML frameworks.</p>
      </>
    ),
  },
] as const;


