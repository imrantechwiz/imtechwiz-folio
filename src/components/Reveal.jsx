import { motion } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];
export const POP = [0.34, 1.56, 0.64, 1];

/* Fade + rise + un-blur on scroll */
export function Reveal({ delay = 0, y = 30, blur = true, className = "", as = "div", children, ...rest }) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, filter: blur ? "blur(8px)" : "none" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* Section heading: <Heading bold="Work" serif="experience" /> */
export function Heading({ bold, serif, purple = false, as = "h2", className = "" }) {
  const Tag = as;
  return (
    <Reveal>
      <Tag className={`h-mixed ${className}`}>
        {bold} <span className={`serif ${purple ? "p" : ""}`}>{serif}</span>
      </Tag>
    </Reveal>
  );
}

/* Staggered children with a springy pop */
export function Stagger({ className = "", stagger = 0.1, as = "div", children, ...rest }) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-8% 0px" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
export function Item({ className = "", as = "div", children, ...rest }) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      variants={{ hidden: { opacity: 0, y: 30, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: POP } } }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
