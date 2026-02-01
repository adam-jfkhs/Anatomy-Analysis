/**
 * Organ and Body Region Database
 * Contains detailed information about body organs, their functions, and locations
 */

const BODY_REGIONS = {
    head: {
        name: "Head",
        description: "The uppermost part of the body containing the brain, eyes, ears, nose, and mouth. It houses the central control center of the nervous system and major sensory organs.",
        organs: ["brain", "eyes", "ears", "nose", "mouth", "pituitary-gland", "hypothalamus"],
        commonConditions: ["headache", "migraine", "concussion", "sinusitis", "meningitis"]
    },
    neck: {
        name: "Neck",
        description: "Connects the head to the torso, containing the cervical spine, throat, thyroid gland, and major blood vessels supplying the brain.",
        organs: ["thyroid", "parathyroid", "larynx", "pharynx", "esophagus-upper", "cervical-spine"],
        commonConditions: ["thyroid-disorders", "pharyngitis", "cervical-strain", "lymphadenopathy"]
    },
    chest: {
        name: "Chest (Thorax)",
        description: "The thoracic cavity protected by the rib cage, containing vital organs for circulation and respiration.",
        organs: ["heart", "lungs", "esophagus", "trachea", "bronchi", "thymus", "aorta"],
        commonConditions: ["heart-disease", "pneumonia", "bronchitis", "asthma", "angina", "pleurisy"]
    },
    abdomen: {
        name: "Abdomen",
        description: "The region between the chest and pelvis containing digestive organs, kidneys, and major blood vessels.",
        organs: ["stomach", "liver", "gallbladder", "pancreas", "spleen", "small-intestine", "large-intestine", "kidneys", "adrenal-glands"],
        commonConditions: ["gastritis", "appendicitis", "gallstones", "pancreatitis", "hepatitis", "ibs", "ulcer"]
    },
    pelvis: {
        name: "Pelvis",
        description: "The lower part of the trunk containing reproductive organs, bladder, and lower digestive tract.",
        organs: ["bladder", "rectum", "reproductive-organs", "prostate", "uterus", "ovaries"],
        commonConditions: ["uti", "kidney-stones", "hernia", "pelvic-inflammatory-disease"]
    },
    "left-shoulder": {
        name: "Left Shoulder",
        description: "Ball-and-socket joint connecting the left arm to the torso.",
        organs: ["shoulder-joint", "rotator-cuff", "deltoid"],
        commonConditions: ["rotator-cuff-injury", "frozen-shoulder", "bursitis", "referred-cardiac-pain"]
    },
    "right-shoulder": {
        name: "Right Shoulder",
        description: "Ball-and-socket joint connecting the right arm to the torso.",
        organs: ["shoulder-joint", "rotator-cuff", "deltoid"],
        commonConditions: ["rotator-cuff-injury", "frozen-shoulder", "bursitis"]
    },
    "left-arm": {
        name: "Left Upper Arm",
        description: "The upper portion of the left arm between shoulder and elbow.",
        organs: ["biceps", "triceps", "humerus", "brachial-artery"],
        commonConditions: ["muscle-strain", "fracture", "referred-cardiac-pain"]
    },
    "right-arm": {
        name: "Right Upper Arm",
        description: "The upper portion of the right arm between shoulder and elbow.",
        organs: ["biceps", "triceps", "humerus", "brachial-artery"],
        commonConditions: ["muscle-strain", "fracture"]
    },
    "left-forearm": {
        name: "Left Forearm",
        description: "The portion of the left arm between elbow and wrist.",
        organs: ["radius", "ulna", "forearm-muscles"],
        commonConditions: ["carpal-tunnel", "tennis-elbow", "fracture"]
    },
    "right-forearm": {
        name: "Right Forearm",
        description: "The portion of the right arm between elbow and wrist.",
        organs: ["radius", "ulna", "forearm-muscles"],
        commonConditions: ["carpal-tunnel", "tennis-elbow", "fracture"]
    },
    "left-hand": {
        name: "Left Hand",
        description: "The terminal part of the left arm including palm and fingers.",
        organs: ["metacarpals", "phalanges", "hand-muscles"],
        commonConditions: ["arthritis", "carpal-tunnel", "trigger-finger"]
    },
    "right-hand": {
        name: "Right Hand",
        description: "The terminal part of the right arm including palm and fingers.",
        organs: ["metacarpals", "phalanges", "hand-muscles"],
        commonConditions: ["arthritis", "carpal-tunnel", "trigger-finger"]
    },
    "left-thigh": {
        name: "Left Thigh",
        description: "The upper portion of the left leg between hip and knee.",
        organs: ["femur", "quadriceps", "hamstrings", "femoral-artery"],
        commonConditions: ["muscle-strain", "sciatica", "dvt"]
    },
    "right-thigh": {
        name: "Right Thigh",
        description: "The upper portion of the right leg between hip and knee.",
        organs: ["femur", "quadriceps", "hamstrings", "femoral-artery"],
        commonConditions: ["muscle-strain", "sciatica", "dvt"]
    },
    "left-leg": {
        name: "Left Lower Leg",
        description: "The portion of the left leg between knee and ankle.",
        organs: ["tibia", "fibula", "calf-muscles"],
        commonConditions: ["shin-splints", "dvt", "varicose-veins", "fracture"]
    },
    "right-leg": {
        name: "Right Lower Leg",
        description: "The portion of the right leg between knee and ankle.",
        organs: ["tibia", "fibula", "calf-muscles"],
        commonConditions: ["shin-splints", "dvt", "varicose-veins", "fracture"]
    },
    "left-foot": {
        name: "Left Foot",
        description: "The terminal part of the left leg.",
        organs: ["tarsal-bones", "metatarsals", "foot-muscles"],
        commonConditions: ["plantar-fasciitis", "bunion", "gout", "neuropathy"]
    },
    "right-foot": {
        name: "Right Foot",
        description: "The terminal part of the right leg.",
        organs: ["tarsal-bones", "metatarsals", "foot-muscles"],
        commonConditions: ["plantar-fasciitis", "bunion", "gout", "neuropathy"]
    },
    back: {
        name: "Back",
        description: "The posterior part of the torso containing the spine and back muscles.",
        organs: ["spine", "spinal-cord", "back-muscles", "kidneys"],
        commonConditions: ["lower-back-pain", "herniated-disc", "sciatica", "scoliosis", "kidney-infection"]
    },
    joints: {
        name: "Joints",
        description: "Points where bones connect, allowing movement and providing support.",
        organs: ["knee", "hip", "elbow", "wrist", "ankle"],
        commonConditions: ["arthritis", "bursitis", "tendinitis", "gout", "joint-effusion"]
    },
    skin: {
        name: "Skin",
        description: "The largest organ of the body, providing protection, temperature regulation, and sensation.",
        organs: ["epidermis", "dermis", "subcutaneous-tissue"],
        commonConditions: ["eczema", "psoriasis", "dermatitis", "skin-cancer", "infections"]
    }
};

const ORGANS = {
    // Head Organs
    brain: {
        name: "Brain",
        region: "head",
        system: "Nervous System",
        description: "The central organ of the human nervous system, controlling thought, memory, emotion, motor skills, vision, breathing, and every process that regulates the body.",
        functions: [
            "Controls all body functions and processes",
            "Processes sensory information",
            "Controls movement and coordination",
            "Manages memory, learning, and cognition",
            "Regulates emotions and behavior",
            "Controls autonomic functions (breathing, heart rate)"
        ],
        relatedConditions: ["stroke", "alzheimers", "parkinsons", "epilepsy", "brain-tumor", "concussion", "meningitis"]
    },
    eyes: {
        name: "Eyes",
        region: "head",
        system: "Sensory System",
        description: "Paired sensory organs that detect light and convert it to electrochemical impulses in neurons, enabling vision.",
        functions: [
            "Detect light and color",
            "Enable visual perception",
            "Control pupil size for light adjustment",
            "Produce tears for lubrication and protection"
        ],
        relatedConditions: ["glaucoma", "cataracts", "macular-degeneration", "conjunctivitis", "diabetic-retinopathy"]
    },
    ears: {
        name: "Ears",
        region: "head",
        system: "Sensory System",
        description: "Organs of hearing and balance, converting sound waves into nerve signals and maintaining equilibrium.",
        functions: [
            "Detect and process sound waves",
            "Maintain balance and spatial orientation",
            "Transmit auditory signals to the brain"
        ],
        relatedConditions: ["hearing-loss", "tinnitus", "vertigo", "ear-infection", "menieres-disease"]
    },
    "pituitary-gland": {
        name: "Pituitary Gland",
        region: "head",
        system: "Endocrine System",
        description: "A pea-sized gland at the base of the brain that produces hormones controlling growth, metabolism, and reproduction.",
        functions: [
            "Produces growth hormone",
            "Controls thyroid function",
            "Regulates adrenal gland activity",
            "Controls reproductive hormones",
            "Manages water balance in body"
        ],
        relatedConditions: ["pituitary-tumor", "hypopituitarism", "acromegaly", "cushings-disease"]
    },

    // Neck Organs
    thyroid: {
        name: "Thyroid Gland",
        region: "neck",
        system: "Endocrine System",
        description: "A butterfly-shaped gland in the neck that produces hormones regulating metabolism, energy, and growth.",
        functions: [
            "Produces thyroid hormones (T3, T4)",
            "Regulates metabolism and energy",
            "Controls body temperature",
            "Influences heart rate",
            "Affects mood and mental function"
        ],
        relatedConditions: ["hypothyroidism", "hyperthyroidism", "goiter", "thyroid-nodules", "thyroid-cancer"]
    },
    larynx: {
        name: "Larynx (Voice Box)",
        region: "neck",
        system: "Respiratory System",
        description: "The organ of voice production, also protecting the airway during swallowing.",
        functions: [
            "Produces voice through vocal cord vibration",
            "Protects airway during swallowing",
            "Allows air passage to lungs"
        ],
        relatedConditions: ["laryngitis", "vocal-cord-nodules", "laryngeal-cancer"]
    },

    // Chest Organs
    heart: {
        name: "Heart",
        region: "chest",
        system: "Cardiovascular System",
        description: "A muscular organ that pumps blood throughout the body via the circulatory system, supplying oxygen and nutrients to tissues.",
        functions: [
            "Pumps blood throughout the body",
            "Supplies oxygen and nutrients to tissues",
            "Removes carbon dioxide and waste",
            "Maintains blood pressure",
            "Regulates blood flow"
        ],
        relatedConditions: ["heart-attack", "heart-failure", "arrhythmia", "coronary-artery-disease", "cardiomyopathy", "angina", "valve-disease"]
    },
    lungs: {
        name: "Lungs",
        region: "chest",
        system: "Respiratory System",
        description: "Paired organs that facilitate gas exchange, bringing oxygen into the body and expelling carbon dioxide.",
        functions: [
            "Exchange oxygen and carbon dioxide",
            "Filter air entering the body",
            "Regulate blood pH",
            "Assist in sound production for speech"
        ],
        relatedConditions: ["pneumonia", "asthma", "copd", "lung-cancer", "pulmonary-embolism", "bronchitis", "tuberculosis"]
    },
    esophagus: {
        name: "Esophagus",
        region: "chest",
        system: "Digestive System",
        description: "A muscular tube connecting the throat to the stomach, transporting food through peristaltic contractions.",
        functions: [
            "Transports food from mouth to stomach",
            "Prevents backflow with sphincters",
            "Produces mucus for lubrication"
        ],
        relatedConditions: ["gerd", "esophagitis", "barretts-esophagus", "esophageal-cancer", "achalasia"]
    },

    // Abdomen Organs
    stomach: {
        name: "Stomach",
        region: "abdomen",
        system: "Digestive System",
        description: "A muscular organ that breaks down food using acids and enzymes as part of the digestive process.",
        functions: [
            "Stores and mixes food",
            "Produces gastric acid and enzymes",
            "Begins protein digestion",
            "Kills harmful bacteria in food",
            "Releases food gradually to small intestine"
        ],
        relatedConditions: ["gastritis", "peptic-ulcer", "stomach-cancer", "gastroparesis", "h-pylori"]
    },
    liver: {
        name: "Liver",
        region: "abdomen",
        system: "Digestive System",
        description: "The largest internal organ, performing over 500 vital functions including detoxification, protein synthesis, and bile production.",
        functions: [
            "Detoxifies blood",
            "Produces bile for fat digestion",
            "Stores glycogen, vitamins, and minerals",
            "Synthesizes proteins and cholesterol",
            "Regulates blood sugar levels",
            "Metabolizes medications"
        ],
        relatedConditions: ["hepatitis", "cirrhosis", "fatty-liver", "liver-cancer", "liver-failure"]
    },
    gallbladder: {
        name: "Gallbladder",
        region: "abdomen",
        system: "Digestive System",
        description: "A small organ that stores and concentrates bile produced by the liver, releasing it to aid fat digestion.",
        functions: [
            "Stores bile from liver",
            "Concentrates bile",
            "Releases bile during digestion",
            "Aids in fat absorption"
        ],
        relatedConditions: ["gallstones", "cholecystitis", "gallbladder-cancer", "biliary-dyskinesia"]
    },
    pancreas: {
        name: "Pancreas",
        region: "abdomen",
        system: "Digestive & Endocrine Systems",
        description: "An organ with both digestive and endocrine functions, producing digestive enzymes and hormones like insulin.",
        functions: [
            "Produces digestive enzymes",
            "Produces insulin and glucagon",
            "Regulates blood sugar",
            "Neutralizes stomach acid in small intestine"
        ],
        relatedConditions: ["diabetes", "pancreatitis", "pancreatic-cancer", "cystic-fibrosis"]
    },
    spleen: {
        name: "Spleen",
        region: "abdomen",
        system: "Lymphatic/Immune System",
        description: "An organ that filters blood, recycles old red blood cells, and plays a role in immune response.",
        functions: [
            "Filters and cleans blood",
            "Removes old red blood cells",
            "Stores blood platelets",
            "Produces lymphocytes for immune defense"
        ],
        relatedConditions: ["splenomegaly", "splenic-rupture", "hypersplenism"]
    },
    "small-intestine": {
        name: "Small Intestine",
        region: "abdomen",
        system: "Digestive System",
        description: "A long, coiled tube where most nutrient absorption occurs, consisting of the duodenum, jejunum, and ileum.",
        functions: [
            "Digests food with enzymes",
            "Absorbs nutrients into bloodstream",
            "Moves food via peristalsis",
            "Produces hormones for digestion"
        ],
        relatedConditions: ["celiac-disease", "crohns-disease", "small-bowel-obstruction", "malabsorption"]
    },
    "large-intestine": {
        name: "Large Intestine (Colon)",
        region: "abdomen",
        system: "Digestive System",
        description: "The final section of the digestive tract, absorbing water and forming solid waste for elimination.",
        functions: [
            "Absorbs water and electrolytes",
            "Forms and stores feces",
            "Houses beneficial gut bacteria",
            "Produces vitamins K and B"
        ],
        relatedConditions: ["ibs", "ulcerative-colitis", "colon-cancer", "diverticulitis", "constipation"]
    },
    kidneys: {
        name: "Kidneys",
        region: "abdomen",
        system: "Urinary System",
        description: "Paired bean-shaped organs that filter blood, remove waste, and regulate fluid and electrolyte balance.",
        functions: [
            "Filter blood and remove waste",
            "Regulate fluid balance",
            "Control electrolyte levels",
            "Produce hormones (erythropoietin, renin)",
            "Regulate blood pressure",
            "Activate vitamin D"
        ],
        relatedConditions: ["kidney-stones", "chronic-kidney-disease", "kidney-infection", "kidney-failure", "polycystic-kidney"]
    },
    "adrenal-glands": {
        name: "Adrenal Glands",
        region: "abdomen",
        system: "Endocrine System",
        description: "Small glands atop each kidney that produce hormones including cortisol, adrenaline, and aldosterone.",
        functions: [
            "Produce cortisol for stress response",
            "Produce adrenaline (epinephrine)",
            "Regulate blood pressure",
            "Control metabolism",
            "Manage immune response"
        ],
        relatedConditions: ["addisons-disease", "cushings-syndrome", "adrenal-fatigue", "pheochromocytoma"]
    },
    appendix: {
        name: "Appendix",
        region: "abdomen",
        system: "Digestive/Immune System",
        description: "A small pouch attached to the large intestine, thought to play a role in immune function and gut bacteria balance.",
        functions: [
            "May store beneficial gut bacteria",
            "May play role in immune function",
            "Function still being studied"
        ],
        relatedConditions: ["appendicitis"]
    },

    // Pelvis Organs
    bladder: {
        name: "Bladder",
        region: "pelvis",
        system: "Urinary System",
        description: "A muscular sac that stores urine produced by the kidneys until urination.",
        functions: [
            "Stores urine",
            "Controls urination timing",
            "Expels urine through urethra"
        ],
        relatedConditions: ["uti", "bladder-cancer", "interstitial-cystitis", "overactive-bladder", "incontinence"]
    },
    prostate: {
        name: "Prostate (Male)",
        region: "pelvis",
        system: "Reproductive System",
        description: "A gland in males that produces fluid that nourishes and transports sperm.",
        functions: [
            "Produces prostatic fluid",
            "Helps transport sperm",
            "Controls urine flow"
        ],
        relatedConditions: ["prostate-cancer", "bph", "prostatitis"]
    },
    uterus: {
        name: "Uterus (Female)",
        region: "pelvis",
        system: "Reproductive System",
        description: "The organ in which a fetus develops during pregnancy.",
        functions: [
            "Houses developing fetus",
            "Provides nourishment during pregnancy",
            "Sheds lining during menstruation",
            "Contracts during childbirth"
        ],
        relatedConditions: ["endometriosis", "fibroids", "uterine-cancer", "pcos"]
    },
    ovaries: {
        name: "Ovaries (Female)",
        region: "pelvis",
        system: "Reproductive/Endocrine System",
        description: "Paired organs that produce eggs and female sex hormones estrogen and progesterone.",
        functions: [
            "Produce and release eggs",
            "Produce estrogen and progesterone",
            "Regulate menstrual cycle"
        ],
        relatedConditions: ["ovarian-cysts", "ovarian-cancer", "pcos", "premature-ovarian-failure"]
    },

    // Spine and Back
    spine: {
        name: "Spine (Vertebral Column)",
        region: "back",
        system: "Skeletal System",
        description: "A column of 33 vertebrae protecting the spinal cord and providing structural support for the body.",
        functions: [
            "Protects spinal cord",
            "Supports body weight",
            "Enables movement and flexibility",
            "Provides attachment for muscles"
        ],
        relatedConditions: ["herniated-disc", "spinal-stenosis", "scoliosis", "osteoporosis", "degenerative-disc-disease"]
    },
    "spinal-cord": {
        name: "Spinal Cord",
        region: "back",
        system: "Nervous System",
        description: "A bundle of nerves running through the spine, transmitting signals between the brain and body.",
        functions: [
            "Transmits signals between brain and body",
            "Controls reflex actions",
            "Enables movement and sensation"
        ],
        relatedConditions: ["spinal-cord-injury", "multiple-sclerosis", "transverse-myelitis"]
    }
};

// Body systems overview
const BODY_SYSTEMS = {
    cardiovascular: {
        name: "Cardiovascular System",
        description: "The system responsible for circulating blood throughout the body.",
        organs: ["heart", "blood-vessels", "blood"],
        functions: ["Blood circulation", "Oxygen delivery", "Nutrient transport", "Waste removal"]
    },
    respiratory: {
        name: "Respiratory System",
        description: "The system responsible for breathing and gas exchange.",
        organs: ["lungs", "trachea", "bronchi", "diaphragm"],
        functions: ["Oxygen intake", "Carbon dioxide removal", "pH regulation"]
    },
    digestive: {
        name: "Digestive System",
        description: "The system that breaks down food and absorbs nutrients.",
        organs: ["stomach", "liver", "pancreas", "small-intestine", "large-intestine", "gallbladder"],
        functions: ["Food breakdown", "Nutrient absorption", "Waste elimination"]
    },
    nervous: {
        name: "Nervous System",
        description: "The system that controls and coordinates body functions.",
        organs: ["brain", "spinal-cord", "nerves"],
        functions: ["Signal transmission", "Coordination", "Thought and memory", "Sensory processing"]
    },
    endocrine: {
        name: "Endocrine System",
        description: "The system of glands that produce hormones.",
        organs: ["pituitary-gland", "thyroid", "adrenal-glands", "pancreas", "ovaries", "testes"],
        functions: ["Hormone production", "Metabolism regulation", "Growth control", "Mood regulation"]
    },
    urinary: {
        name: "Urinary System",
        description: "The system that filters blood and eliminates waste through urine.",
        organs: ["kidneys", "bladder", "ureters", "urethra"],
        functions: ["Blood filtration", "Waste removal", "Fluid balance", "Electrolyte regulation"]
    },
    immune: {
        name: "Immune System",
        description: "The system that defends the body against disease.",
        organs: ["spleen", "thymus", "lymph-nodes", "bone-marrow"],
        functions: ["Pathogen defense", "Antibody production", "Inflammation response"]
    },
    musculoskeletal: {
        name: "Musculoskeletal System",
        description: "The system of bones, muscles, and joints that provides structure and movement.",
        organs: ["bones", "muscles", "joints", "tendons", "ligaments"],
        functions: ["Support", "Movement", "Protection", "Blood cell production"]
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BODY_REGIONS, ORGANS, BODY_SYSTEMS };
}
