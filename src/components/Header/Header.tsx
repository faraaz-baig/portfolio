import { motion } from "framer-motion";

import "./Header.css";
import {
  EnvelopeSimple,
  GitBranch,
  IconContext,
  LinkedinLogo,
  TwitterLogo,
  IconProps,
} from "@phosphor-icons/react";

const variants = {
  start: { opacity: 0 },
  end: { opacity: 1, transition: { duration: 0.5, delay: 0.2 } },
};

const iconStyle: IconProps = {
  size: 24,
  weight: "fill",
  color: "currentColor",
  mirrored: false,
  style: { marginRight: 8 },
};

const Header = () => {
  return (
    <motion.header variants={variants} initial="start" animate="end">
      <h1 className="intro">
        I'm 
        <span className="highlight">Faraaz Baig</span> a 23 year old serial entrepreneur and an <span className="highlight">
          <a href="https://faraazventures.com" rel="noopener">
          Angel Investor.
          </a>
        </span>I'm currenty building{" "}
        <span className="highlight">
          <a href="https://arclinelabs.com" rel="noopener">
          Arcline Labs
          </a>
        </span> . 
        I spend my downtime riding horses, travelling and racing motorbikes.
      </h1>
      <IconContext.Provider value={iconStyle}>
        <div className="links">
          <a href="https://github.com/faraazbaig">
            <GitBranch /> GitHub
          </a>
          <a href="https://twitter.com/faraazofficial">
            <TwitterLogo /> Twitter
          </a>
          <a href="https://linkedin.com/in/faraazbaig">
            <LinkedinLogo /> LinkedIn
          </a>
          <a href="mailto:faraazbaig1@gmail.com">
            <EnvelopeSimple /> Email
          </a>
        </div>
      </IconContext.Provider>
    </motion.header>
  );
};

export default Header;
