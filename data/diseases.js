/**
 * Disease and Condition Database
 * Contains information about various medical conditions, their symptoms,
 * affected body parts, and general recommendations
 */

const DISEASES = {
    // Cardiovascular Conditions
    "heart-attack": {
        name: "Heart Attack (Myocardial Infarction)",
        category: "Cardiovascular",
        severity: "severe",
        description: "Occurs when blood flow to part of the heart muscle is blocked, causing tissue damage. This is a medical emergency.",
        symptoms: [
            "chest pain", "chest pressure", "pain radiating to arm", "pain radiating to jaw",
            "shortness of breath", "sweating", "nausea", "dizziness", "fatigue",
            "anxiety", "cold sweat"
        ],
        affectedAreas: ["chest", "left-arm", "neck", "back"],
        riskFactors: ["high blood pressure", "high cholesterol", "smoking", "diabetes", "obesity", "family history"],
        recommendation: "CALL EMERGENCY SERVICES IMMEDIATELY (911). This is a life-threatening emergency requiring immediate medical attention.",
        seekHelp: "immediately"
    },
    "heart-failure": {
        name: "Heart Failure",
        category: "Cardiovascular",
        severity: "severe",
        description: "A chronic condition where the heart doesn't pump blood as efficiently as it should.",
        symptoms: [
            "shortness of breath", "fatigue", "swelling in legs", "swelling in ankles",
            "rapid heartbeat", "persistent cough", "wheezing", "weight gain",
            "difficulty concentrating", "reduced ability to exercise"
        ],
        affectedAreas: ["chest", "legs"],
        riskFactors: ["coronary artery disease", "high blood pressure", "diabetes", "obesity"],
        recommendation: "Seek medical evaluation. Heart failure requires ongoing management with medication and lifestyle changes.",
        seekHelp: "soon"
    },
    "arrhythmia": {
        name: "Arrhythmia",
        category: "Cardiovascular",
        severity: "moderate",
        description: "An irregular heartbeat that can be too fast, too slow, or erratic.",
        symptoms: [
            "palpitations", "fluttering in chest", "racing heartbeat", "slow heartbeat",
            "chest pain", "shortness of breath", "dizziness", "fainting", "fatigue"
        ],
        affectedAreas: ["chest"],
        riskFactors: ["heart disease", "high blood pressure", "diabetes", "caffeine", "stress"],
        recommendation: "Schedule an appointment with a cardiologist for evaluation. Seek immediate help if accompanied by chest pain or fainting.",
        seekHelp: "soon"
    },
    "hypertension": {
        name: "Hypertension (High Blood Pressure)",
        category: "Cardiovascular",
        severity: "moderate",
        description: "A chronic condition where blood pressure against artery walls is consistently too high.",
        symptoms: [
            "headache", "shortness of breath", "nosebleeds", "dizziness",
            "chest pain", "vision changes", "blood in urine"
        ],
        affectedAreas: ["head", "chest"],
        riskFactors: ["age", "family history", "obesity", "sedentary lifestyle", "high sodium diet", "stress"],
        recommendation: "Regular monitoring and lifestyle modifications. May require medication. Consult a healthcare provider.",
        seekHelp: "scheduled"
    },

    // Respiratory Conditions
    "pneumonia": {
        name: "Pneumonia",
        category: "Respiratory",
        severity: "moderate",
        description: "An infection that inflames the air sacs in one or both lungs, which may fill with fluid.",
        symptoms: [
            "cough", "fever", "chills", "shortness of breath", "chest pain",
            "fatigue", "nausea", "vomiting", "confusion", "phlegm production"
        ],
        affectedAreas: ["chest"],
        riskFactors: ["age (very young or elderly)", "weakened immune system", "chronic diseases", "smoking"],
        recommendation: "Seek medical attention for proper diagnosis and treatment. May require antibiotics or hospitalization.",
        seekHelp: "soon"
    },
    "asthma": {
        name: "Asthma",
        category: "Respiratory",
        severity: "moderate",
        description: "A chronic condition in which airways narrow and swell, producing extra mucus and making breathing difficult.",
        symptoms: [
            "shortness of breath", "wheezing", "coughing", "chest tightness",
            "difficulty sleeping due to breathing", "whistling sound when exhaling"
        ],
        affectedAreas: ["chest"],
        riskFactors: ["allergies", "family history", "respiratory infections", "environmental factors"],
        recommendation: "Work with a doctor to develop an asthma action plan. Use prescribed inhalers and avoid triggers.",
        seekHelp: "scheduled"
    },
    "copd": {
        name: "COPD (Chronic Obstructive Pulmonary Disease)",
        category: "Respiratory",
        severity: "moderate",
        description: "A group of lung diseases that block airflow and make breathing difficult.",
        symptoms: [
            "shortness of breath", "chronic cough", "wheezing", "chest tightness",
            "frequent respiratory infections", "fatigue", "weight loss", "swelling in ankles"
        ],
        affectedAreas: ["chest"],
        riskFactors: ["smoking", "long-term exposure to irritants", "alpha-1 antitrypsin deficiency"],
        recommendation: "See a pulmonologist for management. Quit smoking if applicable. May need bronchodilators and oxygen therapy.",
        seekHelp: "scheduled"
    },
    "bronchitis": {
        name: "Bronchitis",
        category: "Respiratory",
        severity: "mild",
        description: "Inflammation of the lining of bronchial tubes, which carry air to and from the lungs.",
        symptoms: [
            "cough", "mucus production", "fatigue", "shortness of breath",
            "chest discomfort", "low fever", "chills"
        ],
        affectedAreas: ["chest"],
        riskFactors: ["smoking", "weakened immune system", "exposure to irritants"],
        recommendation: "Rest and hydration for acute cases. See a doctor if symptoms persist beyond 3 weeks or if you have recurring episodes.",
        seekHelp: "if persists"
    },

    // Digestive Conditions
    "gastritis": {
        name: "Gastritis",
        category: "Digestive",
        severity: "mild",
        description: "Inflammation of the stomach lining that can cause pain and digestive issues.",
        symptoms: [
            "stomach pain", "nausea", "vomiting", "bloating", "loss of appetite",
            "indigestion", "burning sensation in stomach", "hiccups"
        ],
        affectedAreas: ["abdomen"],
        riskFactors: ["H. pylori infection", "NSAIDs use", "alcohol", "stress", "autoimmune disorders"],
        recommendation: "Dietary modifications and avoiding irritants. See a doctor for persistent symptoms or if blood is present in vomit/stool.",
        seekHelp: "scheduled"
    },
    "gerd": {
        name: "GERD (Gastroesophageal Reflux Disease)",
        category: "Digestive",
        severity: "mild",
        description: "A chronic digestive disease where stomach acid flows back into the esophagus.",
        symptoms: [
            "heartburn", "chest pain", "difficulty swallowing", "regurgitation",
            "sensation of lump in throat", "chronic cough", "laryngitis", "disrupted sleep"
        ],
        affectedAreas: ["chest", "neck", "abdomen"],
        riskFactors: ["obesity", "hiatal hernia", "pregnancy", "smoking", "certain foods"],
        recommendation: "Lifestyle modifications including dietary changes, weight management, and not lying down after eating. May need medication.",
        seekHelp: "scheduled"
    },
    "appendicitis": {
        name: "Appendicitis",
        category: "Digestive",
        severity: "severe",
        description: "Inflammation of the appendix causing severe abdominal pain. Requires prompt treatment.",
        symptoms: [
            "sudden pain starting around navel", "pain shifting to lower right abdomen",
            "pain worsening with movement", "nausea", "vomiting", "loss of appetite",
            "fever", "constipation", "diarrhea", "abdominal bloating"
        ],
        affectedAreas: ["abdomen"],
        riskFactors: ["age (teens to 30s)", "family history", "certain infections"],
        recommendation: "SEEK IMMEDIATE MEDICAL ATTENTION. Appendicitis typically requires surgical removal of the appendix.",
        seekHelp: "immediately"
    },
    "gallstones": {
        name: "Gallstones",
        category: "Digestive",
        severity: "moderate",
        description: "Hardened deposits in the gallbladder that can cause pain and other complications.",
        symptoms: [
            "sudden intense pain in upper right abdomen", "pain between shoulder blades",
            "pain in right shoulder", "nausea", "vomiting", "pain after eating fatty foods"
        ],
        affectedAreas: ["abdomen", "back"],
        riskFactors: ["female gender", "age over 40", "obesity", "rapid weight loss", "family history"],
        recommendation: "Seek medical evaluation. May require surgery if causing recurrent problems or complications.",
        seekHelp: "soon"
    },
    "ibs": {
        name: "Irritable Bowel Syndrome (IBS)",
        category: "Digestive",
        severity: "mild",
        description: "A common disorder affecting the large intestine, causing cramping, pain, and changes in bowel habits.",
        symptoms: [
            "abdominal cramping", "bloating", "gas", "diarrhea", "constipation",
            "alternating diarrhea and constipation", "mucus in stool"
        ],
        affectedAreas: ["abdomen"],
        riskFactors: ["female gender", "under age 50", "family history", "anxiety", "depression"],
        recommendation: "Dietary modifications, stress management, and possibly medication. Work with a gastroenterologist for management.",
        seekHelp: "scheduled"
    },
    "ulcerative-colitis": {
        name: "Ulcerative Colitis",
        category: "Digestive",
        severity: "moderate",
        description: "An inflammatory bowel disease causing inflammation and ulcers in the digestive tract lining.",
        symptoms: [
            "diarrhea with blood or pus", "abdominal pain", "rectal pain", "rectal bleeding",
            "urgency to defecate", "weight loss", "fatigue", "fever"
        ],
        affectedAreas: ["abdomen", "pelvis"],
        riskFactors: ["age under 30", "family history", "certain ethnic backgrounds"],
        recommendation: "Requires medical management with a gastroenterologist. May need anti-inflammatory drugs or immunosuppressants.",
        seekHelp: "soon"
    },
    "hepatitis": {
        name: "Hepatitis",
        category: "Digestive",
        severity: "moderate",
        description: "Inflammation of the liver, commonly caused by viral infection, alcohol, or toxins.",
        symptoms: [
            "fatigue", "nausea", "vomiting", "abdominal pain", "loss of appetite",
            "dark urine", "pale stool", "jaundice", "joint pain", "fever"
        ],
        affectedAreas: ["abdomen"],
        riskFactors: ["viral exposure", "alcohol use", "certain medications", "autoimmune conditions"],
        recommendation: "Medical evaluation is essential. Treatment depends on the type and cause of hepatitis.",
        seekHelp: "soon"
    },
    "pancreatitis": {
        name: "Pancreatitis",
        category: "Digestive",
        severity: "severe",
        description: "Inflammation of the pancreas that can range from mild to life-threatening.",
        symptoms: [
            "upper abdominal pain", "pain radiating to back", "pain worse after eating",
            "nausea", "vomiting", "fever", "rapid pulse", "tenderness in abdomen"
        ],
        affectedAreas: ["abdomen", "back"],
        riskFactors: ["gallstones", "alcohol use", "certain medications", "high triglycerides"],
        recommendation: "Seek immediate medical attention. Severe cases require hospitalization and may need intensive care.",
        seekHelp: "immediately"
    },

    // Neurological Conditions
    "migraine": {
        name: "Migraine",
        category: "Neurological",
        severity: "moderate",
        description: "A neurological condition causing intense, throbbing headaches often accompanied by other symptoms.",
        symptoms: [
            "severe headache", "throbbing pain", "pain on one side of head", "nausea",
            "vomiting", "sensitivity to light", "sensitivity to sound", "visual disturbances",
            "aura", "dizziness"
        ],
        affectedAreas: ["head"],
        riskFactors: ["family history", "female gender", "hormonal changes", "stress", "certain foods"],
        recommendation: "Track triggers and discuss preventive strategies with a neurologist. Various medications can help manage migraines.",
        seekHelp: "scheduled"
    },
    "stroke": {
        name: "Stroke",
        category: "Neurological",
        severity: "severe",
        description: "A medical emergency occurring when blood supply to part of the brain is interrupted or reduced.",
        symptoms: [
            "sudden numbness", "weakness in face arm or leg", "confusion",
            "trouble speaking", "trouble understanding speech", "vision problems",
            "difficulty walking", "dizziness", "severe headache", "loss of balance"
        ],
        affectedAreas: ["head", "arms", "legs"],
        riskFactors: ["high blood pressure", "smoking", "diabetes", "high cholesterol", "atrial fibrillation"],
        recommendation: "CALL EMERGENCY SERVICES IMMEDIATELY. Remember FAST: Face drooping, Arm weakness, Speech difficulty, Time to call 911.",
        seekHelp: "immediately"
    },
    "epilepsy": {
        name: "Epilepsy",
        category: "Neurological",
        severity: "moderate",
        description: "A neurological disorder causing recurrent seizures due to abnormal brain activity.",
        symptoms: [
            "seizures", "temporary confusion", "staring spell", "uncontrollable jerking",
            "loss of consciousness", "fear", "anxiety", "deja vu"
        ],
        affectedAreas: ["head"],
        riskFactors: ["brain injury", "family history", "stroke", "dementia", "brain infections"],
        recommendation: "Work with a neurologist for diagnosis and management. Anti-seizure medications can help control seizures.",
        seekHelp: "scheduled"
    },
    "meningitis": {
        name: "Meningitis",
        category: "Neurological/Infectious",
        severity: "severe",
        description: "Inflammation of the membranes surrounding the brain and spinal cord, usually from infection.",
        symptoms: [
            "severe headache", "stiff neck", "high fever", "sensitivity to light",
            "nausea", "vomiting", "confusion", "seizures", "rash", "difficulty concentrating"
        ],
        affectedAreas: ["head", "neck"],
        riskFactors: ["not being vaccinated", "age (children and young adults)", "weakened immune system"],
        recommendation: "SEEK IMMEDIATE MEDICAL ATTENTION. Bacterial meningitis can be fatal without prompt treatment.",
        seekHelp: "immediately"
    },

    // Musculoskeletal Conditions
    "arthritis": {
        name: "Arthritis",
        category: "Musculoskeletal",
        severity: "moderate",
        description: "Inflammation of one or more joints, causing pain and stiffness that can worsen with age.",
        symptoms: [
            "joint pain", "stiffness", "swelling", "redness around joints",
            "decreased range of motion", "warmth around joint"
        ],
        affectedAreas: ["joints", "arms", "legs"],
        riskFactors: ["age", "family history", "previous joint injury", "obesity"],
        recommendation: "See a rheumatologist for proper diagnosis. Treatment includes medication, physical therapy, and lifestyle modifications.",
        seekHelp: "scheduled"
    },
    "osteoporosis": {
        name: "Osteoporosis",
        category: "Musculoskeletal",
        severity: "moderate",
        description: "A condition where bones become weak and brittle, increasing fracture risk.",
        symptoms: [
            "back pain", "loss of height", "stooped posture", "bones that break easily"
        ],
        affectedAreas: ["back", "joints"],
        riskFactors: ["female gender", "age", "family history", "low calcium intake", "sedentary lifestyle"],
        recommendation: "Bone density testing and consultation with a doctor. May need calcium/vitamin D supplements and medication.",
        seekHelp: "scheduled"
    },
    "herniated-disc": {
        name: "Herniated Disc",
        category: "Musculoskeletal",
        severity: "moderate",
        description: "A condition where the soft center of a spinal disc pushes through a crack in the outer casing.",
        symptoms: [
            "arm or leg pain", "numbness", "tingling", "weakness",
            "pain that worsens at night", "pain with certain movements"
        ],
        affectedAreas: ["back", "neck", "arms", "legs"],
        riskFactors: ["age", "excess weight", "physically demanding job", "genetics"],
        recommendation: "See a spine specialist. Treatment ranges from physical therapy to medication to surgery in severe cases.",
        seekHelp: "soon"
    },
    "sciatica": {
        name: "Sciatica",
        category: "Musculoskeletal",
        severity: "moderate",
        description: "Pain radiating along the sciatic nerve, from the lower back through the hips and down each leg.",
        symptoms: [
            "lower back pain", "pain radiating down leg", "numbness in leg",
            "tingling", "weakness", "pain when sitting", "shooting pain"
        ],
        affectedAreas: ["back", "pelvis", "legs"],
        riskFactors: ["age", "obesity", "prolonged sitting", "diabetes"],
        recommendation: "Often improves with self-care. See a doctor if pain is severe, sudden, or accompanied by weakness or bladder issues.",
        seekHelp: "if severe"
    },
    "fibromyalgia": {
        name: "Fibromyalgia",
        category: "Musculoskeletal",
        severity: "moderate",
        description: "A disorder characterized by widespread musculoskeletal pain accompanied by fatigue and other symptoms.",
        symptoms: [
            "widespread pain", "fatigue", "cognitive difficulties", "sleep problems",
            "headaches", "depression", "anxiety", "tingling in hands and feet"
        ],
        affectedAreas: ["joints", "back", "arms", "legs"],
        riskFactors: ["female gender", "family history", "other conditions like arthritis or lupus"],
        recommendation: "Work with a rheumatologist for comprehensive management including medication, therapy, and lifestyle changes.",
        seekHelp: "scheduled"
    },

    // Endocrine Conditions
    "diabetes": {
        name: "Diabetes Mellitus",
        category: "Endocrine",
        severity: "moderate",
        description: "A group of diseases affecting how the body uses blood sugar (glucose).",
        symptoms: [
            "increased thirst", "frequent urination", "extreme hunger", "unexplained weight loss",
            "fatigue", "blurred vision", "slow-healing sores", "frequent infections"
        ],
        affectedAreas: ["abdomen"],
        riskFactors: ["family history", "obesity", "sedentary lifestyle", "age over 45"],
        recommendation: "Requires ongoing management with diet, exercise, monitoring, and possibly medication. Regular check-ups essential.",
        seekHelp: "soon"
    },
    "hypothyroidism": {
        name: "Hypothyroidism",
        category: "Endocrine",
        severity: "mild",
        description: "A condition where the thyroid gland doesn't produce enough thyroid hormone.",
        symptoms: [
            "fatigue", "weight gain", "cold sensitivity", "constipation",
            "dry skin", "puffy face", "hoarse voice", "muscle weakness",
            "depression", "memory problems"
        ],
        affectedAreas: ["neck"],
        riskFactors: ["female gender", "age over 60", "autoimmune disease", "family history"],
        recommendation: "Blood tests can diagnose. Treatment typically involves daily thyroid hormone replacement medication.",
        seekHelp: "scheduled"
    },
    "hyperthyroidism": {
        name: "Hyperthyroidism",
        category: "Endocrine",
        severity: "moderate",
        description: "A condition where the thyroid gland produces too much thyroid hormone.",
        symptoms: [
            "weight loss", "rapid heartbeat", "increased appetite", "nervousness",
            "tremor", "sweating", "changes in menstruation", "heat sensitivity",
            "difficulty sleeping", "fatigue"
        ],
        affectedAreas: ["neck"],
        riskFactors: ["female gender", "family history", "Graves' disease"],
        recommendation: "Requires medical evaluation and treatment. Options include medication, radioactive iodine, or surgery.",
        seekHelp: "soon"
    },

    // Urinary Conditions
    "uti": {
        name: "Urinary Tract Infection (UTI)",
        category: "Urinary",
        severity: "mild",
        description: "An infection in any part of the urinary system, most commonly affecting the bladder and urethra.",
        symptoms: [
            "burning during urination", "frequent urination", "urgency to urinate",
            "cloudy urine", "blood in urine", "strong-smelling urine", "pelvic pain"
        ],
        affectedAreas: ["pelvis", "abdomen"],
        riskFactors: ["female anatomy", "sexual activity", "certain birth control", "menopause"],
        recommendation: "See a doctor for antibiotics. Drink plenty of water and urinate frequently.",
        seekHelp: "soon"
    },
    "kidney-stones": {
        name: "Kidney Stones",
        category: "Urinary",
        severity: "moderate",
        description: "Hard deposits of minerals and salts that form inside the kidneys.",
        symptoms: [
            "severe pain in side and back", "pain below ribs", "pain radiating to groin",
            "pain during urination", "pink or red urine", "cloudy urine",
            "nausea", "vomiting", "frequent urination"
        ],
        affectedAreas: ["abdomen", "back", "pelvis"],
        riskFactors: ["dehydration", "certain diets", "obesity", "family history", "certain medical conditions"],
        recommendation: "Seek medical care for severe pain. Small stones may pass naturally; larger ones may need intervention.",
        seekHelp: "soon"
    },
    "chronic-kidney-disease": {
        name: "Chronic Kidney Disease",
        category: "Urinary",
        severity: "severe",
        description: "Gradual loss of kidney function over time, which can eventually require dialysis or transplant.",
        symptoms: [
            "fatigue", "difficulty concentrating", "decreased appetite", "trouble sleeping",
            "swelling in feet and ankles", "dry itchy skin", "frequent urination",
            "blood in urine", "foamy urine"
        ],
        affectedAreas: ["abdomen", "back"],
        riskFactors: ["diabetes", "high blood pressure", "heart disease", "family history"],
        recommendation: "Requires ongoing management with a nephrologist. Focus on controlling underlying conditions.",
        seekHelp: "soon"
    },

    // Infectious Diseases
    "influenza": {
        name: "Influenza (Flu)",
        category: "Infectious",
        severity: "mild",
        description: "A contagious respiratory illness caused by influenza viruses.",
        symptoms: [
            "fever", "chills", "cough", "sore throat", "runny nose",
            "muscle aches", "headache", "fatigue", "vomiting", "diarrhea"
        ],
        affectedAreas: ["head", "chest", "abdomen"],
        riskFactors: ["age (very young or elderly)", "weakened immune system", "chronic conditions"],
        recommendation: "Rest and hydration. Antiviral medications may help if started early. Seek care if symptoms are severe.",
        seekHelp: "if severe"
    },
    "covid-19": {
        name: "COVID-19",
        category: "Infectious",
        severity: "moderate",
        description: "A respiratory illness caused by the SARS-CoV-2 virus.",
        symptoms: [
            "fever", "cough", "fatigue", "loss of taste", "loss of smell",
            "shortness of breath", "body aches", "sore throat", "headache",
            "congestion", "nausea", "diarrhea"
        ],
        affectedAreas: ["head", "chest", "abdomen"],
        riskFactors: ["age", "underlying health conditions", "not vaccinated"],
        recommendation: "Isolate and monitor symptoms. Seek medical care if you have difficulty breathing or persistent symptoms.",
        seekHelp: "if severe"
    },

    // Skin Conditions
    "eczema": {
        name: "Eczema (Atopic Dermatitis)",
        category: "Dermatological",
        severity: "mild",
        description: "A condition that makes skin red, inflamed, and itchy. Common in children but can occur at any age.",
        symptoms: [
            "dry skin", "itching", "red patches", "small raised bumps",
            "thickened skin", "raw sensitive skin from scratching"
        ],
        affectedAreas: ["skin", "arms", "legs"],
        riskFactors: ["family history of eczema, allergies, or asthma", "certain occupations"],
        recommendation: "Moisturize regularly and avoid triggers. See a dermatologist for persistent or severe cases.",
        seekHelp: "scheduled"
    },
    "psoriasis": {
        name: "Psoriasis",
        category: "Dermatological",
        severity: "mild",
        description: "An immune-mediated disease causing raised, red, scaly patches on the skin.",
        symptoms: [
            "red patches with silvery scales", "dry cracked skin", "itching",
            "burning", "soreness", "thickened nails", "stiff joints"
        ],
        affectedAreas: ["skin", "joints"],
        riskFactors: ["family history", "stress", "obesity", "smoking"],
        recommendation: "See a dermatologist for treatment options including topical treatments, light therapy, or systemic medications.",
        seekHelp: "scheduled"
    },

    // Mental Health
    "depression": {
        name: "Major Depressive Disorder",
        category: "Mental Health",
        severity: "moderate",
        description: "A mood disorder causing persistent feelings of sadness and loss of interest.",
        symptoms: [
            "persistent sadness", "loss of interest", "fatigue", "sleep changes",
            "appetite changes", "difficulty concentrating", "feelings of worthlessness",
            "thoughts of death or suicide"
        ],
        affectedAreas: ["head"],
        riskFactors: ["family history", "trauma", "certain medications", "other mental health conditions"],
        recommendation: "Seek help from a mental health professional. Treatment includes therapy, medication, or both. If having thoughts of suicide, seek immediate help.",
        seekHelp: "soon"
    },
    "anxiety-disorder": {
        name: "Generalized Anxiety Disorder",
        category: "Mental Health",
        severity: "moderate",
        description: "A condition characterized by persistent and excessive worry about various aspects of life.",
        symptoms: [
            "excessive worry", "restlessness", "fatigue", "difficulty concentrating",
            "irritability", "muscle tension", "sleep problems", "rapid heartbeat"
        ],
        affectedAreas: ["head", "chest"],
        riskFactors: ["family history", "trauma", "chronic illness", "substance use"],
        recommendation: "Mental health professional can help with therapy and/or medication. Lifestyle changes like exercise and stress management also help.",
        seekHelp: "scheduled"
    }
};

// Symptom keywords mapping for better matching
const SYMPTOM_KEYWORDS = {
    pain: ["pain", "ache", "hurt", "sore", "tender", "discomfort", "cramping", "throbbing", "sharp", "dull"],
    swelling: ["swelling", "swollen", "puffy", "bloated", "inflamed", "enlarged"],
    fatigue: ["fatigue", "tired", "exhausted", "weak", "lethargy", "drowsy", "weary", "low energy"],
    fever: ["fever", "temperature", "hot", "chills", "sweating", "feverish"],
    nausea: ["nausea", "nauseated", "queasy", "sick to stomach", "upset stomach"],
    vomiting: ["vomiting", "throwing up", "vomit", "emesis"],
    dizziness: ["dizziness", "dizzy", "lightheaded", "vertigo", "unsteady", "faint"],
    numbness: ["numbness", "numb", "tingling", "pins and needles", "prickling"],
    weakness: ["weakness", "weak", "feeble", "loss of strength"],
    breathing: ["shortness of breath", "difficulty breathing", "breathless", "can't breathe", "gasping", "wheezing"],
    headache: ["headache", "head pain", "migraine", "head hurts", "pressure in head"],
    cough: ["cough", "coughing", "hacking"],
    chest: ["chest pain", "chest pressure", "chest tightness", "heart pounding"],
    stomach: ["stomach pain", "abdominal pain", "belly pain", "stomach ache", "stomach cramps"],
    back: ["back pain", "lower back pain", "upper back pain", "spine pain"],
    skin: ["rash", "itching", "itchy", "red skin", "hives", "skin irritation"],
    urinary: ["burning urination", "frequent urination", "blood in urine", "urgency"],
    vision: ["blurred vision", "vision problems", "seeing spots", "double vision"],
    appetite: ["loss of appetite", "no appetite", "not hungry", "increased appetite"],
    sleep: ["insomnia", "can't sleep", "trouble sleeping", "sleeping too much"],
    mood: ["sad", "depressed", "anxious", "worried", "nervous", "irritable"]
};

// Location aliases for better matching
const LOCATION_ALIASES = {
    head: ["head", "skull", "brain", "forehead", "temple", "scalp"],
    neck: ["neck", "throat", "cervical"],
    chest: ["chest", "thorax", "breast", "ribcage", "sternum", "heart area"],
    abdomen: ["abdomen", "stomach", "belly", "gut", "abdominal", "tummy", "upper abdomen", "lower abdomen"],
    pelvis: ["pelvis", "groin", "hip", "lower belly", "pelvic"],
    back: ["back", "spine", "lower back", "upper back", "lumbar", "thoracic"],
    arms: ["arm", "arms", "shoulder", "elbow", "wrist", "forearm", "upper arm"],
    legs: ["leg", "legs", "thigh", "knee", "calf", "ankle", "shin", "hip"],
    joints: ["joint", "joints", "knee", "elbow", "wrist", "ankle", "hip", "shoulder"],
    skin: ["skin", "surface", "dermis"]
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DISEASES, SYMPTOM_KEYWORDS, LOCATION_ALIASES };
}
