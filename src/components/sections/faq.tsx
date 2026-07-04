'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What courses does KodeToCareer offer?',
    answer:
      'We offer courses in AI & Machine Learning, MERN Stack, Java Full Stack, Python, Data Analytics, and Digital Marketing. Each course is designed with industry-relevant curriculum and hands-on projects.',
  },
  {
    question: 'Do I need prior coding experience?',
    answer:
      'Not at all! Our beginner programs start from scratch. We guide you from zero to job-ready with structured learning paths.',
  },
  {
    question: 'What is the placement guarantee?',
    answer:
      'We offer dedicated placement support with a 95% placement rate. Our placement cell works with 500+ hiring partners to connect you with opportunities.',
  },
  {
    question: 'How long are the programs?',
    answer:
      'Programs range from 3 to 6 months depending on the specialization. Each includes training, projects, internship, and placement preparation.',
  },
  {
    question: 'Are the certificates recognized by industry?',
    answer:
      'Yes, our certificates are recognized by leading tech companies and can be verified online. They add significant value to your resume.',
  },
  {
    question: 'What is the AI Career Assistant?',
    answer:
      'Our AI-powered tool analyzes your skills, education, and goals to create a personalized career roadmap with course recommendations and salary predictions.',
  },
  {
    question: 'What payment options are available?',
    answer:
      'We offer flexible payment plans, EMI options, and early-bird discounts. Scholarships are also available for eligible students.',
  },
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                  */
/* ------------------------------------------------------------------ */

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

const listVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE },
  },
};

/* ------------------------------------------------------------------ */
/*  AccordionItem                                                       */
/* ------------------------------------------------------------------ */

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      variants={itemVariants}
      className="mb-4 rounded-[20px] border border-slate-100 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.015)] transition-all duration-300 hover:border-primary/20 hover:shadow-[0_12px_36px_rgba(37,99,235,0.04)] overflow-hidden"
    >
      {/* Trigger */}
      <button
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between p-6 text-left"
        aria-expanded={isOpen}
      >
        <span className="pr-4 text-lg font-bold text-slate-900 transition-colors duration-300 group-hover:text-primary">
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="shrink-0 text-slate-400"
        >
          <ChevronDown className="h-5 w-5" aria-hidden="true" />
        </motion.span>
      </button>

      {/* Collapsible answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden bg-slate-50/50"
          >
            <p className="px-6 pb-6 pt-2 leading-relaxed text-slate-600 text-sm font-medium">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ Section                                                         */
/* ------------------------------------------------------------------ */

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      className="bg-gradient-to-b from-[#F8FAFC] to-[#EFF6FF] py-24 border-b border-slate-100"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-[800px] px-6">
        {/* Section header */}
        <motion.div
          className="text-center"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="mb-4 font-heading text-4xl font-extrabold text-slate-900 md:text-5xl tracking-tight"
          >
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-lg text-slate-600">
            Everything you need to know about our programs and services.
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          role="region"
          aria-label="Frequently asked questions"
        >
          {FAQ_ITEMS.map((item, index) => (
            <AccordionItem
              key={item.question}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export { Faq };
