// ============================================================
// src/content.ts
// All site copy and structured data for Aleeza Naeem's Portfolio.
// Fully traced to Aleeza_Naeem_cv_h.pdf and Resume.pdf.
// ============================================================

export const META = {
  title: "Aleeza Naeem, Clinical Nutritionist & Food Quality Specialist",
  description:
    "BS (Hons) Human Nutrition graduate with hospital clinical experience and multinational food safety qualifications. Experienced in pediatric nutrition, inpatient care, FSSC 22000, HACCP, and functional food formulation.",
  ogImage: "/assets/og-image.jpg",
  canonicalUrl: "https://aleezanaeem.com",
};

export const CONTACT = {
  phone: "+923336338579",
  email: "aleezanaeem79@gmail.com",
  linkedin: "https://www.linkedin.com/in/aleeza-naeem-989817273",
  instagram: "https://www.instagram.com/diet_byliza",
  instagramHandle: "@diet_byliza",
  location: "Lahore, Pakistan",
};

export const NAV_LINKS = [
  { label: "About", anchor: "#about" },
  { label: "Experience", anchor: "#experience" },
  { label: "Clinical & QA", anchor: "#clinical-expertise" },
  { label: "Kitchen Lab", anchor: "#from-the-kitchen" },
  { label: "Contact", anchor: "#contact" },
];

export const HERO = {
  headlineLine1: "Clinical nutrition,",
  headlineLine2: "food safety",
  headlineItalic: "and care.",
  subtitleLine: "Clinical Nutritionist & Dietitian · Food Quality & Safety Specialist",
  ctaScrollLabel: "View my",
  ctaScrollItalic: "portfolio",
  ctaScrollTarget: "#about",
};

export const ABOUT = {
  sectionLabel: "Chapter 02 · About me",
  headlineMain: "Human Nutrition graduate with hands on",
  headlineItalic1: "clinical",
  headlineMid: "and",
  headlineItalic2: "food industry",
  headlineEnd: "experience.",
  body: "Human Nutrition and Dietetics graduate with hands on clinical and hospital experience in nutritional assessment, medical nutrition therapy, therapeutic diet planning, patient counseling, and nutrition support. Experienced in pediatric nutrition, OPD and inpatient cases, anthropometric assessment, dietary analysis, ADIME documentation, and evidence based diet planning.",
  secondaryBio:
    "Grounded in university laboratory research and high stakes ward rounds, my dual practice bridges clinical precision in hospitals with rigorous industrial standards in multinational beverage and food production. I believe evidence based dietary intervention and uncompromising food safety are the twin pillars of preventative healthcare.",
  facts: [
    { value: "BS (Hons)", label: "Human Nutrition · UAF" },
    { value: "3.63", label: "CGPA (Merit Standing)" },
    { value: "6 Rotations", label: "Hospitals, Clinics & Industry" },
    { value: "3× Founder", label: "Annual Food & Nutrition Mela" },
  ],
  interestsLabel: "Personal Passions & R&D:",
  interests: ["Product Development", "Artisanal Baking", "Book Reading"],
};

// ============================================================
// Chapter 03: Professional Experience — All Six Placements
// ============================================================

export interface ExperiencePlacement {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  category: "Clinical" | "Industrial";
  summary: string;
  highlights: string[];
}

export const EXPERIENCE_PLACEMENTS: ExperiencePlacement[] = [
  {
    id: "pediatrics-ward-hq",
    role: "Apprenticeship Trainee, Pediatrics Ward",
    organization: "HQ Hospital",
    location: "Chishtian, Punjab",
    period: "June to September (Pediatrics Rotation)",
    category: "Clinical",
    summary:
      "Direct pediatric ward care, clinical anthropometric profiling, caregiver nutritional education, and multidisciplinary healthcare team collaboration.",
    highlights: [
      "Assisted with pediatric nutritional assessment and direct inpatient care following hospital clinical protocols.",
      "Recorded precision anthropometric measurements and monitored daily dietary intake for pediatric patients.",
      "Educated parents and primary caregivers on infant/child nutrition and appropriate, hygienic feeding practices.",
      "Maintained meticulous patient records and treatment documentation.",
      "Gained hands on clinical experience in pediatric nutrition management and nutrition related pediatric conditions.",
      "Collaborated closely with pediatric healthcare staff to monitor patient recovery and nutritional progression.",
    ],
  },
  {
    id: "pediatrician-clinic",
    role: "Clinical Nutritionist / Dietitian",
    organization: "Private Pediatric Practice / Outpatient Clinic",
    location: "Chishtian, Punjab",
    period: "1 Year Tenure",
    category: "Clinical",
    summary:
      "Comprehensive outpatient pediatric nutrition, growth velocity tracking, individualized diet design, and parental counseling.",
    highlights: [
      "Conducted baseline and longitudinal nutritional assessments of pediatric patients.",
      "Formulated tailored dietary plans mapped strictly to age, individual caloric requirements, and coexisting medical conditions.",
      "Delivered focused dietary counseling to parents and caregivers regarding healthy growth milestones and balanced nourishment.",
      "Monitored patient growth trajectories, weight velocity, and micronutrient intake.",
      "Directly coordinated patient clinical management with the supervising pediatrician.",
    ],
  },
  {
    id: "hnd-clinic",
    role: "Nutrition Intern",
    organization: "Human Nutrition & Dietetics (HND) Clinic",
    location: "Faisalabad, Punjab",
    period: "Sep to Oct (Clinical Nutrition Rotation)",
    category: "Clinical",
    summary:
      "Advanced clinical dietetics, Nutrition Focused Physical Examination (NFPE), ADIME & PES documentation, and metabolic disorder management.",
    highlights: [
      "Managed outpatient (OPD) and inpatient cases, interpreted diagnostic laboratory results, and reviewed complex drug nutrient interactions.",
        "Performed Nutrition Focused Physical Examination (NFPE) and applied Food Exchange Lists, USDA Food Guide Pyramid, and MyPlate models.",
      "Assessed dietary intake and calculated precise anthropometric and caloric targets.",
      "Planned individualized therapeutic diets using complex case studies and authored patient educational literature.",
      "Practiced standard clinical ADIME documentation, PES diagnostic statements, goal setting, and nutrition interventions.",
      "Studied obesity management, reproductive physiology, endocrine hormones, and PCOS diagnostic criteria.",
      "Applied clinical nutrition therapy and supplementation guidelines in case evaluations, including PCOS and Type 2 Diabetes.",
    ],
  },
  {
    id: "sheikh-zayed-hospital",
    role: "Clinical Nutrition Intern",
    organization: "Sheikh Zayed Hospital (Government Sector)",
    location: "Rahim Yar Khan, Punjab",
    period: "July to August 2023 (Tertiary Hospital Rotation)",
    category: "Clinical",
    summary:
      "Tertiary care hospital rounds, ICU and surgical enteral/parenteral feeding plans, and therapeutic diets for severe acute and chronic pathologies.",
    highlights: [
      "Performed clinical nutritional assessments including comprehensive medical history taking and anthropometric measurements.",
      "Formulated specialized diets for hospitalized patients in ICU, surgical units, and cardiac wards.",
      "Assisted with clinical nutrition support management, including enteral tube feeding and parenteral nutrition calculation.",
      "Developed customized therapeutic diet plans for Renal failure, CVD, Diabetes, Diabetic Ketoacidosis (DK), Meningitis, PCOS, Hepatic disease, Oncology, Pediatrics, and postoperative recovery.",
      "Monitored and evaluated patient recovery progress, adjusting dietary prescriptions based on changing biochemical markers.",
      "Participated in daily ward rounds with interdisciplinary medical teams including physicians, surgeons, nurses, and clinical pharmacists.",
      "Gained comprehensive exposure to tertiary hospital operations, clinical quality control, and outpatient counseling clinics.",
    ],
  },
  {
    id: "punjab-beverages",
    role: "Quality Intern (Quality & Food Safety)",
    organization: "Punjab Beverages Company (Pvt.) Ltd., PepsiCo Franchise",
    location: "Faisalabad, Punjab",
    period: "Jul 2024 to Aug 2024 (Roshan Kal Program)",
    category: "Industrial",
    summary:
      "Multinational beverage QA/QC operations, FSSC 22000 & AIBI food safety compliance, plant HACCP audits, and food safety culture implementation.",
    highlights: [
      "Supported implementation and strict compliance verification for FSSC 22000 and AIBI (American Institute of Baking International) Food Safety Standards.",
      "Active participant in plant wide QC, QA, AIB, Halal, and food safety governance programs.",
      "Conducted internal audits and assisted with external certification audits under supervisory guidance.",
      "Assisted in developing, refining, and implementing plant Management System SOPs.",
      "Ensured Good Manufacturing Practices (GMP) and enforced HACCP control points across production, utilities, and raw material stores.",
      "Devised and implemented a plant wide 'Food Safety Culture Questionnaire' to measure and improve compliance on the factory floor.",
      "Awarded Star Intern of the prestigious Roshan Kal Summer Internship Program by PepsiCo International.",
    ],
  },
  {
    id: "united-industries",
    role: "Quality Intern",
    organization: "United Limited Industries (Pvt.) Ltd.",
    location: "Faisalabad, Punjab",
    period: "Jan 2024 to Mar 2024 (Industrial QA Rotation)",
    category: "Industrial",
    summary:
      "Analytical chemistry lab testing of edible oils, instrumental analysis (GC, spectrophotometry), solution preparation, and sensory panel evaluation.",
    highlights: [
      "Formulated standard volumetric chemical solutions and reagents for analytical laboratory workflows.",
      "Conducted comprehensive chemical and physical testing on edible oils: Cloud Point, Moisture Content, Peroxide Value (PV), Iodine Value (IV), and Odor profiles.",
      "Maintained accurate, traceable, and legible regulatory laboratory records and test logs.",
      "Applied advanced instrumental techniques including Titration, Gas Chromatography (GC), and Spectrophotometry under laboratory supervision.",
      "Assisted in conducting structured sensory evaluations and assessing finished product organoleptic attributes.",
      "Supported statistical quality control data collection to identify batch trends and target areas for continuous process improvement.",
    ],
  },
];

// ============================================================
// Chapter 04: Clinical Expertise — 5 Pillars
// ============================================================

export interface ClinicalPillar {
  pillar: string;
  tagline: string;
  skills: string[];
  clinicalFocus: string;
}

export const CLINICAL_EXPERTISE = {
  sectionLabel: "Chapter 04 · Clinical Expertise",
  headlineMain: "Evidence based clinical care &",
  headlineItalic: "medical nutrition therapy.",
  intro:
    "Grounded in the Nutrition Care Process (NCP), combining precise physical assessment, clinical laboratory evaluation, and individualized therapeutic interventions across acute and outpatient settings.",
  pillars: [
    {
      pillar: "01. Assess",
      tagline: "Comprehensive Nutritional & Physical Assessment",
      skills: [
        "Nutritional Assessment & Medical History Taking",
        "Anthropometric Measurements & Growth Velocity Tracking",
        "Nutrition Focused Physical Examination (NFPE)",
        "Caloric, Macronutrient & Micronutrient Requirement Calculations",
      ],
      clinicalFocus:
        "Evaluating acute pediatric malnutrition, stunting, metabolic syndrome, and clinical baseline reserves.",
    },
    {
      pillar: "02. Document",
      tagline: "Standardized Clinical Care Documentation",
      skills: [
        "ADIME Framework (Assessment, Diagnosis, Intervention, Monitoring, Evaluation)",
        "PES Diagnostic Statements (Problem, Etiology, Signs & Symptoms)",
        "Longitudinal Patient Progress Tracking & Goal Setting",
        "Hospital Regulatory Protocol Record Maintenance",
      ],
      clinicalFocus:
        "Ensuring clear, legally compliant, interdisciplinary healthcare records aligned with international hospital standards.",
    },
    {
      pillar: "03. Plan",
      tagline: "Therapeutic Diet Planning & Dietary Analysis",
      skills: [
        "Medical Nutrition Therapy (MNT) Prescription",
        "USDA MyPlate, Food Guide Pyramid & Food Exchange Lists",
        "Pathology Specific Therapeutic Diets (Renal, CVD, Diabetic Ketoacidosis)",
        "Individualized Case Based Meal Formulation",
      ],
      clinicalFocus:
        "Crafting evidence based diets for Cardiovascular Disease, Renal impairment, Oncology, Hepatic failure, and postoperative recovery.",
    },
    {
      pillar: "04. Support",
      tagline: "Clinical Nutrition Support & Inpatient Care",
      skills: [
        "Enteral Nutrition Formulation & Tube Feeding Protocols",
        "Parenteral Nutrition Osmolarity & Caloric Planning",
        "ICU, Surgical & Cardiac Critical Care Support",
        "Pediatric Weaning & Caregiver Counseling",
      ],
      clinicalFocus:
        "Maintaining nitrogen balance, gut integrity, and specialized feeding in critically ill hospitalized patients.",
    },
    {
      pillar: "05. Interpret",
      tagline: "Biomarker Analysis & Metabolic Diagnostics",
      skills: [
        "Diagnostic Laboratory Biomarker Interpretation",
        "Complex Drug Nutrient Interaction Analysis",
        "Reproductive Physiology, Endocrine Hormones & PCOS Diagnostic Criteria",
        "Clinical Supplementation Protocols (Diabetes & PCOS)",
      ],
      clinicalFocus:
        "Interpreting lipid profiles, HbA1c, renal function tests (RFTs), liver enzymes (LFTs), and hormone panels to adjust nutritional prescriptions.",
    },
  ] as ClinicalPillar[],
};

// ============================================================
// Chapter 05: Food Quality and Safety
// ============================================================

export const FOOD_SAFETY = {
  sectionLabel: "Chapter 05 · Food Quality & Safety",
  headlineMain: "Industrial governance, compliance &",
  headlineItalic: "laboratory testing.",
  intro:
    "Rigorous operational experience within multinational FMCG and industrial manufacturing plants, enforcing international food safety codes and quality assurance protocols.",
  standards: [
    {
      code: "FSSC 22000",
      title: "Food Safety System Certification",
      description: "Implementation, documentation, and compliance verification across commercial beverage processing lines.",
    },
    {
      code: "HACCP",
      title: "Hazard Analysis Critical Control Points",
      description: "Identification of chemical, physical, and microbiological hazards, establishing critical control limits and monitoring procedures.",
    },
    {
      code: "AIBI Standards",
      title: "American Institute of Baking International",
      description: "Inspection protocols, plant sanitation integrity, pest management, and audit readiness compliance.",
    },
    {
      code: "GMP",
      title: "Good Manufacturing Practices",
      description: "Enforcing operational cleanliness, personnel hygiene, equipment sanitary design, and prevention of cross contamination.",
    },
    {
      code: "Halal Food Safety",
      title: "Halal Hazards & Certification Compliance",
      description: "Auditing raw material traceability, ingredient purity, and supply chain adherence to Halal safety criteria.",
    },
  ],
  labTesting: [
    {
      title: "Wet Chemistry & Oil Analysis",
      items: [
        "Cloud Point determination",
        "Peroxide Value (PV) titration",
        "Iodine Value (IV) determination",
        "Moisture Content analysis",
        "Odor profiling and organoleptic checks",
      ],
    },
    {
      title: "Analytical Instrumentation",
      items: [
        "Gas Chromatography (GC) operation under supervision",
        "Spectrophotometric absorption testing",
        "Standard volumetric reagent solution preparation",
        "Precision pH and refractive index measurement",
      ],
    },
    {
      title: "Audits & Quality Systems",
      items: [
        "Internal plant management system audits",
        "Assisting with external certification audits",
        "Standard Operating Procedure (SOP) drafting and review",
        "Food Safety Culture Questionnaire design & deployment",
        "Corrective & Preventive Action (CAPA) tracking",
        "Customer complaints, product recall & withdrawal systems",
      ],
    },
  ],
};

// ============================================================
// Chapter 06: From the Kitchen — R&D, Formulations & Melas
// ============================================================

export interface PortfolioProject {
  id: string;
  category: "formulation" | "pediatrics" | "brand";
  categoryLabel: string;
  title: string;
  subtitle: string;
  note?: string;
  summary: string;
  tags: string[];
  image: string;
  imageAlt: string;
  brief: {
    objective: string;
    targetGroup: string;
    nutritionalProfile: string;
    methodology: string;
    outcomes: string;
  };
}

export const PORTFOLIO_PROJECTS = {
  sectionLabel: "Chapter 06 · From the Kitchen",
  headlineMain: "Nutritional formulations &",
  headlineItalic: "food entrepreneurship.",
  body: "Translating nutritional science into practical culinary products. Developed and commercialized through three editions of the Annual Food & Nutrition Mela as founder of an independent artisanal food brand.",
  categories: [
    { key: "all", label: "All Formulations" },
    { key: "formulation", label: "Functional Foods" },
    { key: "pediatrics", label: "Pediatric & Weaning" },
    { key: "brand", label: "Brand & Exhibition" },
  ],
  projects: [
    {
      id: "garbanzo-formulation",
      category: "formulation",
      categoryLabel: "Functional Legume Formulation",
      title: "Garbanzo High Fiber Salad",
      subtitle: "Bioactive plant protein functional salad formulated for glycemic stability",
      summary:
        "Formulated as an accessible plant protein functional meal combining soluble fiber, resistant starch, and essential micronutrients to support glycemic control and cardiovascular wellness.",
      tags: ["Plant Protein", "Soluble Fiber", "Low GI", "Heart Health"],
      image: "kitchen-1.webp",
      imageAlt: "Garbanzo chickpea high fiber functional salad formulation",
      brief: {
        objective: "Formulate a ready to eat legume meal rich in plant proteins and complex carbohydrates for glycemic stability and satiety.",
        targetGroup: "Adults seeking metabolic health, patients with prediabetes, and individuals managing cholesterol levels.",
        nutritionalProfile: "High in prebiotic dietary fiber, plant proteins, folate, and nonheme iron; minimal saturated fat.",
        methodology: "Selected optimal chickpea soaking and boiling parameters to reduce phytates, paired with citrus ascorbic acid to boost nonheme iron bioavailability.",
        outcomes: "Showcased across multiple Food and Nutrition Melas with exceptional consumer reception and verified sensory profile.",
      },
    },
    {
      id: "baby-cereal-formulation",
      category: "pediatrics",
      categoryLabel: "Pediatric Weaning Formulation",
      title: "Multigrain Infant Cereal (Multigrano)",
      subtitle: "Nutrient dense complementary first food blend for weaning infants",
      summary:
        "A wholesome, easily digestible cereal formulated for infants undergoing complementary feeding, blending regionally accessible grains for balanced early pediatric development.",
      tags: ["Complementary Feeding", "Pediatric Growth", "Zero Added Sugar", "Micronutrient Dense"],
      image: "kitchen-2.webp",
      imageAlt: "Multigrain complementary infant cereal formulation",
      brief: {
        objective: "Develop a cereal without chemicals or preservatives that meets infant energy and micronutrient requirements.",
        targetGroup: "Infants aged 6 to 24 months transitioning to semisolid nourishment.",
        nutritionalProfile: "Balanced ratio of complex carbohydrates, easily digestible proteins, bioavailable iron, and zinc.",
        methodology: "Carefully proportioned roasted and milled grains to achieve optimal slurry viscosity, enzymatic digestibility, and smooth texture.",
        outcomes: "Demonstrated as an accessible, affordable weaning model for parents and community healthcare workers.",
      },
    },
    {
      id: "chamomile-infusion",
      category: "formulation",
      categoryLabel: "Botanical Wellness Formulation",
      title: "Chamomile Herbal Infusion Tea",
      subtitle: "Calming botanical infusion developed for relaxation and functional GI comfort",
      summary:
        "A therapeutic herbal infusion without caffeine, formulated with whole dried Matricaria chamomilla blossoms to promote sleep hygiene and gastrointestinal comfort.",
      tags: ["Botanical Science", "Caffeine Free", "Apigenin Source", "Digestive Comfort"],
      image: "kitchen-3.webp",
      imageAlt: "Chamomile herbal tea in a glass cup with clinical nutrition textbook",
      brief: {
        objective: "Create a pure, unadulterated herbal tea utilizing botanical compounds (apigenin and flavonoids) to alleviate lifestyle stress and mild GI spasm.",
        targetGroup: "Individuals with sleep disturbances, lifestyle stress, or mild functional GI symptoms.",
        nutritionalProfile: "Zero calorie, zero caffeine, rich in bioflavonoids and essential volatile terpenes.",
        methodology: "Standardized gentle drying and floral retention techniques to maintain high concentration of volatile aromatic oils.",
        outcomes: "Featured prominently across three Mela editions with demonstrated shelf stability and sensory appeal.",
      },
    },
    {
      id: "artisanal-baking",
      category: "pediatrics",
      categoryLabel: "Therapeutic Bakery R&D",
      title: "Nutrient Dense Whole Grain Baking",
      subtitle: "Low GI, high fiber artisanal breads and functional bakery alternatives",
      summary:
        "Reformulating traditional baked goods into high fiber, nutrient dense staples using whole grains, fermentation, and fewer refined sugars.",
      tags: ["Whole Grains", "Dietary Fiber", "Natural Fermentation", "Low Refined Sugar"],
      image: "kitchen-4.webp",
      imageAlt: "Artisanal whole grain bread loaf on linen cloth",
      brief: {
        objective: "Demonstrate that therapeutic nutritional principles can be seamlessly integrated into artisanal baking without compromising crumb texture or palate appeal.",
        targetGroup: "Families seeking wholesome bakery choices with reduced glycemic impact.",
        nutritionalProfile: "Elevated dietary fiber, intact B complex vitamins, and fewer simple sugars compared to commercial white loaves.",
        methodology: "Extended fermentation times to partially break down gluten and phytates, improving mineral bioavailability and gut tolerance.",
        outcomes: "Successfully tested as part of her personal culinary innovation and community nutrition showcases.",
      },
    },
    {
      id: "healthy-bites-brand",
      category: "brand",
      categoryLabel: "Food Entrepreneurship",
      title: "Independent Food Brand & Mela Founder",
      subtitle: "Three time founder & exhibitor at the Annual Food & Nutrition Mela",
      summary:
        "Founded and operated an independent healthy food brand over three editions of the Annual Food and Nutrition Mela, leading formulation, branding, packaging, and sensory testing.",
      tags: ["Food Brand Owner", "3× Mela Exhibitor", "Sensory Testing", "Eco Packaging"],
      image: "kitchen-5.webp",
      imageAlt: "Exhibition stall at the Annual Food and Nutrition Mela",
      brief: {
        objective: "Build a complete healthy food brand that demonstrates commercial viability of evidence based nutritional products.",
        targetGroup: "Mela attendees, university faculty, students, and health conscious consumers.",
        nutritionalProfile: "Entire product line formulated around 100% natural, preservative free, wholesome nutrition.",
        methodology: "Managed product batch production, nutritional labeling, sanitary packaging, and consumer sensory questionnaires at the venue.",
        outcomes: "Established strong consumer demand across three consecutive years and received commendation from university faculty.",
      },
    },
    {
      id: "packaging-qa-line",
      category: "brand",
      categoryLabel: "Quality & Presentation",
      title: "Packaging Integrity & Food Safety Compliance",
      subtitle: "Sustainable packaging, labeling accuracy, and Halal hazard assessment",
      summary:
        "Comprehensive product presentation adhering to food safety standards, moisture barrier packaging, ingredient transparency, and Halal hazard guidelines.",
      tags: ["Packaging Safety", "Shelf Life Stability", "Label Transparency", "SOPs"],
      image: "kitchen-6.webp",
      imageAlt: "Packaged product line and herbal jars with nutrition labels",
      brief: {
        objective: "Ensure artisanal food formulations achieve industrial grade food safety, hygiene controls, and shelf life stability.",
        targetGroup: "Retail consumers and regulatory audit compliance.",
        nutritionalProfile: "Accurate ingredient declarations and food exchange portion guidelines.",
        methodology: "Applied GMP and moisture control standards learned during PepsiCo and United Industries QA internships to small scale brand production.",
        outcomes: "Zero microbial spoilage across extended storage trials; full compliance with local food safety exhibition rules.",
      },
    },
  ] as PortfolioProject[],
};

// ============================================================
// Chapter 07: Education — Academic Credentials
// ============================================================

export const EDUCATION = {
  sectionLabel: "Chapter 07 · Education",
  headlineMain: "Academic rigor &",
  headlineItalic: "foundations.",
  degrees: [
    {
      degree: "BS (Hons.) Human Nutrition",
      institution: "University of Agriculture, Faisalabad (UAF)",
      period: "2020 to 2024",
      grade: "CGPA: 3.63 / 4.00",
      description:
        "Comprehensive four year honors curriculum covering Medical Nutrition Therapy, Pediatric Nutrition, Advanced Biochemistry, Clinical Dietetics, Food Microbiology, and Quality Assurance.",
      badge: "Honors Graduate · 3.63 CGPA",
    },
    {
      degree: "FSc Pre Medical",
      institution: "Chishtian Science College, Chishtian",
      period: "2020",
      grade: "85% Marks",
      description: "Rigorous coursework in Biology, Chemistry, and Physics forming the biological sciences foundation for clinical practice.",
      badge: "85% First Division",
    },
    {
      degree: "Matriculation (Science)",
      institution: "Government Girls High School, Chishtian",
      period: "2018",
      grade: "93% Marks",
      description: "Distinction in secondary education with fundamental sciences and mathematics.",
      badge: "93% High Distinction",
    },
  ],
};

// ============================================================
// Chapter 08: Achievements and Training
// ============================================================

export const ACHIEVEMENTS_TRAINING = {
  sectionLabel: "Chapter 08 · Achievements & Training",
  headlineMain: "Awards, scholarships &",
  headlineItalic: "specialized certifications.",
  majorHonors: [
    {
      id: "star-intern",
      title: "Star Intern Award",
      organization: "PepsiCo International / Punjab Beverages Company",
      program: "Roshan Kal Summer Internship Program",
      description:
        "Recognized as the top performing intern for exceptional initiative in plant wide food safety compliance and developing the Food Safety Culture Questionnaire.",
      badge: "Top Merit Honor",
    },
    {
      id: "pm-youth",
      title: "Prime Minister Youth Program Awardee",
      organization: "Government of Pakistan",
      program: "National Youth Empowerment Scheme",
      description: "Selected awardee under the competitive national youth empowerment program recognizing academic and leadership excellence.",
      badge: "National Merit",
    },
    {
      id: "peef-scholarship",
      title: "PEEF Scholarship Awardee",
      organization: "Punjab Educational Endowment Fund",
      program: "Merit Based Academic Scholarship (2018)",
      description: "Awarded prestigious provincial scholarship based on top tier academic performance in science examinations.",
      badge: "Provincial Honor",
    },
    {
      id: "nestle-nxl",
      title: "NxL Youth Empowerment Program",
      organization: "Nestlé",
      program: "Professional Readiness & Leadership Development",
      description: "Completed Nestlé's intensive corporate youth empowerment program focusing on FMCG leadership, professional communication, and operational dynamics.",
      badge: "Corporate Leadership",
    },
  ],
  trainings: [
    { title: "Management System Audit (Internal Audit)", scope: "ISO auditing principles, evidence collection, nonconformance reporting" },
    { title: "Good Manufacturing Practices (GMP) & Food Entrepreneurship", scope: "Sanitary processing conditions, personal hygiene, business growth" },
    { title: "Identification & Assessment of Food Safety & HALAL Hazards", scope: "Critical hazard analysis, Halal compliance assurance, cross contamination control" },
    { title: "Documentation & Records Management", scope: "Auditable documentation workflows, batch records, traceability protocols" },
    { title: "Corrective & Preventive Action (CAPA)", scope: "Root cause analysis, corrective mitigation, preventive system design" },
    { title: "Customer Complaints, Product Recall & Withdrawal", scope: "Traceability procedures, mock recall protocols, customer grievance handling" },
    { title: "Food Safety Culture Implementation on Plant", scope: "Designing assessment questionnaires, workforce behavioral compliance" },
    { title: "Professional Communication Skills", scope: "Interdisciplinary teamwork, clinical patient counseling, executive reporting" },
    { title: "Pakistan 5th Annual Nutritionist Meeting", scope: "National scientific symposium on emerging trends in clinical nutrition & public health" },
    { title: "World Food Day Seminar, UAF", scope: "Global food security, agricultural sustainability, and community nutrition" },
  ],
};

// ============================================================
// Chapter 09: Contact & Dossier Terminal
// ============================================================

export const CONTACT_SECTION = {
  sectionLabel: "Chapter 09 · Contact",
  headlinePart1: "Let's",
  headlineItalic: "connect.",
  subline:
    "Open to clinical nutrition, hospital dietetics, food quality assurance, and research opportunities.",
  note: "This portfolio is curated for hospitals, clinical institutions, FMCG recruiters, and academic partners.",
  showTestimonials: false,
};
