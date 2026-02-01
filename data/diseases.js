/**
 * Disease and Condition Database v2.0
 *
 * Improved with:
 * - Weighted symptom scoring (1-3 scale: 1=common/nonspecific, 2=suggestive, 3=highly specific)
 * - Time course classification (acute/chronic/either)
 * - Primary vs secondary region mappings
 * - Better clinical accuracy
 */

const DISEASES = {
    // ==================== CARDIOVASCULAR CONDITIONS ====================
    "heart-attack": {
        name: "Heart Attack (Myocardial Infarction)",
        category: "Cardiovascular",
        severity: "severe",
        timeCourse: "acute",
        description: "Occurs when blood flow to part of the heart muscle is blocked, causing tissue damage. This is a medical emergency.",
        symptoms: {
            "chest pain": 3,
            "chest pressure": 3,
            "pain radiating to left arm": 3,
            "pain radiating to jaw": 2,
            "shortness of breath": 2,
            "sweating": 2,
            "cold sweat": 3,
            "nausea": 1,
            "dizziness": 1,
            "fatigue": 1,
            "anxiety": 1,
            "sense of impending doom": 2
        },
        primaryRegions: ["chest"],
        secondaryRegions: ["left-arm", "neck", "back", "jaw"],
        riskFactors: ["high blood pressure", "high cholesterol", "smoking", "diabetes", "obesity", "family history"],
        recommendation: "CALL EMERGENCY SERVICES IMMEDIATELY (911). This is a life-threatening emergency requiring immediate medical attention.",
        seekHelp: "immediately"
    },
    "heart-failure": {
        name: "Heart Failure",
        category: "Cardiovascular",
        severity: "severe",
        timeCourse: "chronic",
        description: "A chronic condition where the heart doesn't pump blood as efficiently as it should.",
        symptoms: {
            "shortness of breath": 3,
            "shortness of breath when lying down": 3,
            "fatigue": 2,
            "swelling in legs": 3,
            "swelling in ankles": 3,
            "rapid heartbeat": 2,
            "persistent cough": 2,
            "wheezing": 1,
            "weight gain": 2,
            "difficulty concentrating": 1,
            "reduced ability to exercise": 2
        },
        primaryRegions: ["chest"],
        secondaryRegions: ["legs"],
        riskFactors: ["coronary artery disease", "high blood pressure", "diabetes", "obesity"],
        recommendation: "Seek medical evaluation. Heart failure requires ongoing management with medication and lifestyle changes.",
        seekHelp: "soon"
    },
    "arrhythmia": {
        name: "Arrhythmia",
        category: "Cardiovascular",
        severity: "moderate",
        timeCourse: "either",
        description: "An irregular heartbeat that can be too fast, too slow, or erratic.",
        symptoms: {
            "palpitations": 3,
            "fluttering in chest": 3,
            "racing heartbeat": 3,
            "slow heartbeat": 2,
            "irregular heartbeat": 3,
            "chest pain": 1,
            "shortness of breath": 1,
            "dizziness": 2,
            "fainting": 2,
            "fatigue": 1
        },
        primaryRegions: ["chest"],
        secondaryRegions: [],
        riskFactors: ["heart disease", "high blood pressure", "diabetes", "caffeine", "stress"],
        recommendation: "Schedule an appointment with a cardiologist for evaluation. Seek immediate help if accompanied by chest pain or fainting.",
        seekHelp: "soon"
    },
    "hypertension": {
        name: "Hypertension (High Blood Pressure)",
        category: "Cardiovascular",
        severity: "moderate",
        timeCourse: "chronic",
        description: "A chronic condition where blood pressure against artery walls is consistently too high. Often called the 'silent killer' as it may have no symptoms.",
        symptoms: {
            "headache": 1,
            "shortness of breath": 1,
            "nosebleeds": 2,
            "dizziness": 1,
            "chest pain": 1,
            "vision changes": 2,
            "blood in urine": 2
        },
        primaryRegions: [],
        secondaryRegions: ["head", "chest"],
        riskFactors: ["age", "family history", "obesity", "sedentary lifestyle", "high sodium diet", "stress"],
        recommendation: "Regular monitoring and lifestyle modifications. May require medication. Consult a healthcare provider.",
        seekHelp: "scheduled"
    },

    // ==================== RESPIRATORY CONDITIONS ====================
    "pneumonia": {
        name: "Pneumonia",
        category: "Respiratory",
        severity: "moderate",
        timeCourse: "acute",
        description: "An infection that inflames the air sacs in one or both lungs, which may fill with fluid.",
        symptoms: {
            "cough with phlegm": 3,
            "fever": 2,
            "high fever": 3,
            "chills": 2,
            "shortness of breath": 2,
            "chest pain when breathing": 3,
            "chest pain when coughing": 3,
            "fatigue": 1,
            "nausea": 1,
            "vomiting": 1,
            "confusion": 2
        },
        primaryRegions: ["chest"],
        secondaryRegions: [],
        riskFactors: ["age (very young or elderly)", "weakened immune system", "chronic diseases", "smoking"],
        recommendation: "Seek medical attention for proper diagnosis and treatment. May require antibiotics or hospitalization.",
        seekHelp: "soon"
    },
    "asthma": {
        name: "Asthma",
        category: "Respiratory",
        severity: "moderate",
        timeCourse: "chronic",
        description: "A chronic condition in which airways narrow and swell, producing extra mucus and making breathing difficult.",
        symptoms: {
            "shortness of breath": 2,
            "wheezing": 3,
            "coughing": 2,
            "chest tightness": 2,
            "difficulty breathing at night": 3,
            "whistling sound when exhaling": 3,
            "symptoms triggered by exercise": 2,
            "symptoms triggered by allergens": 2
        },
        primaryRegions: ["chest"],
        secondaryRegions: [],
        riskFactors: ["allergies", "family history", "respiratory infections", "environmental factors"],
        recommendation: "Work with a doctor to develop an asthma action plan. Use prescribed inhalers and avoid triggers.",
        seekHelp: "scheduled"
    },
    "copd": {
        name: "COPD (Chronic Obstructive Pulmonary Disease)",
        category: "Respiratory",
        severity: "moderate",
        timeCourse: "chronic",
        description: "A group of lung diseases that block airflow and make breathing difficult.",
        symptoms: {
            "shortness of breath": 3,
            "chronic cough": 3,
            "wheezing": 2,
            "chest tightness": 2,
            "frequent respiratory infections": 2,
            "fatigue": 1,
            "unintentional weight loss": 2,
            "swelling in ankles": 1,
            "barrel chest": 3
        },
        primaryRegions: ["chest"],
        secondaryRegions: [],
        riskFactors: ["smoking", "long-term exposure to irritants", "alpha-1 antitrypsin deficiency"],
        recommendation: "See a pulmonologist for management. Quit smoking if applicable. May need bronchodilators and oxygen therapy.",
        seekHelp: "scheduled"
    },
    "bronchitis": {
        name: "Bronchitis",
        category: "Respiratory",
        severity: "mild",
        timeCourse: "acute",
        description: "Inflammation of the lining of bronchial tubes, which carry air to and from the lungs.",
        symptoms: {
            "cough": 3,
            "mucus production": 3,
            "fatigue": 1,
            "shortness of breath": 1,
            "chest discomfort": 2,
            "low fever": 2,
            "chills": 1
        },
        primaryRegions: ["chest"],
        secondaryRegions: [],
        riskFactors: ["smoking", "weakened immune system", "exposure to irritants"],
        recommendation: "Rest and hydration for acute cases. See a doctor if symptoms persist beyond 3 weeks or if you have recurring episodes.",
        seekHelp: "if persists"
    },
    "pulmonary-embolism": {
        name: "Pulmonary Embolism",
        category: "Respiratory",
        severity: "severe",
        timeCourse: "acute",
        description: "A blood clot that travels to the lungs, blocking blood flow. This is a medical emergency.",
        symptoms: {
            "sudden shortness of breath": 3,
            "chest pain worse with breathing": 3,
            "cough with blood": 3,
            "rapid heartbeat": 2,
            "dizziness": 2,
            "leg pain or swelling": 2,
            "excessive sweating": 2,
            "anxiety": 1
        },
        primaryRegions: ["chest"],
        secondaryRegions: ["legs"],
        riskFactors: ["recent surgery", "prolonged immobility", "blood clotting disorders", "cancer"],
        recommendation: "CALL EMERGENCY SERVICES IMMEDIATELY. This is a life-threatening emergency.",
        seekHelp: "immediately"
    },

    // ==================== DIGESTIVE CONDITIONS ====================
    "gastritis": {
        name: "Gastritis",
        category: "Digestive",
        severity: "mild",
        timeCourse: "either",
        description: "Inflammation of the stomach lining that can cause pain and digestive issues.",
        symptoms: {
            "upper abdominal pain": 3,
            "burning sensation in stomach": 3,
            "nausea": 2,
            "vomiting": 1,
            "bloating": 2,
            "loss of appetite": 2,
            "indigestion": 2,
            "feeling full quickly": 2
        },
        primaryRegions: ["abdomen"],
        secondaryRegions: [],
        riskFactors: ["H. pylori infection", "NSAIDs use", "alcohol", "stress", "autoimmune disorders"],
        recommendation: "Dietary modifications and avoiding irritants. See a doctor for persistent symptoms or if blood is present in vomit/stool.",
        seekHelp: "scheduled"
    },
    "gerd": {
        name: "GERD (Gastroesophageal Reflux Disease)",
        category: "Digestive",
        severity: "mild",
        timeCourse: "chronic",
        description: "A chronic digestive disease where stomach acid flows back into the esophagus.",
        symptoms: {
            "heartburn": 3,
            "acid reflux": 3,
            "regurgitation": 3,
            "chest pain after eating": 2,
            "difficulty swallowing": 2,
            "sensation of lump in throat": 2,
            "chronic cough": 1,
            "hoarse voice": 1,
            "symptoms worse when lying down": 3
        },
        primaryRegions: ["chest", "abdomen"],
        secondaryRegions: ["neck"],
        riskFactors: ["obesity", "hiatal hernia", "pregnancy", "smoking", "certain foods"],
        recommendation: "Lifestyle modifications including dietary changes, weight management, and not lying down after eating. May need medication.",
        seekHelp: "scheduled"
    },
    "appendicitis": {
        name: "Appendicitis",
        category: "Digestive",
        severity: "severe",
        timeCourse: "acute",
        description: "Inflammation of the appendix causing severe abdominal pain. Requires prompt treatment.",
        symptoms: {
            "pain starting around navel": 3,
            "pain moving to lower right abdomen": 3,
            "pain in lower right abdomen": 3,
            "pain worsening with movement": 2,
            "rebound tenderness": 3,
            "nausea": 2,
            "vomiting": 2,
            "loss of appetite": 2,
            "low-grade fever": 2,
            "abdominal bloating": 1
        },
        primaryRegions: ["abdomen"],
        secondaryRegions: [],
        riskFactors: ["age (teens to 30s)", "family history", "certain infections"],
        recommendation: "SEEK IMMEDIATE MEDICAL ATTENTION. Appendicitis typically requires surgical removal of the appendix.",
        seekHelp: "immediately"
    },
    "gallstones": {
        name: "Gallstones (Biliary Colic)",
        category: "Digestive",
        severity: "moderate",
        timeCourse: "acute",
        description: "Hardened deposits in the gallbladder that can cause pain and other complications.",
        symptoms: {
            "sudden intense pain in upper right abdomen": 3,
            "pain after eating fatty foods": 3,
            "pain between shoulder blades": 2,
            "pain in right shoulder": 2,
            "nausea": 2,
            "vomiting": 2,
            "pain lasting 30 minutes to hours": 3
        },
        primaryRegions: ["abdomen"],
        secondaryRegions: ["back"],
        riskFactors: ["female gender", "age over 40", "obesity", "rapid weight loss", "family history"],
        recommendation: "Seek medical evaluation. May require surgery if causing recurrent problems or complications.",
        seekHelp: "soon"
    },
    "ibs": {
        name: "Irritable Bowel Syndrome (IBS)",
        category: "Digestive",
        severity: "mild",
        timeCourse: "chronic",
        description: "A common disorder affecting the large intestine, causing cramping, pain, and changes in bowel habits.",
        symptoms: {
            "abdominal cramping": 3,
            "bloating": 2,
            "gas": 2,
            "diarrhea": 2,
            "constipation": 2,
            "alternating diarrhea and constipation": 3,
            "mucus in stool": 2,
            "symptoms relieved by bowel movement": 3,
            "symptoms triggered by stress": 2
        },
        primaryRegions: ["abdomen"],
        secondaryRegions: [],
        riskFactors: ["female gender", "under age 50", "family history", "anxiety", "depression"],
        recommendation: "Dietary modifications, stress management, and possibly medication. Work with a gastroenterologist for management.",
        seekHelp: "scheduled"
    },
    "ulcerative-colitis": {
        name: "Ulcerative Colitis",
        category: "Digestive",
        severity: "moderate",
        timeCourse: "chronic",
        description: "An inflammatory bowel disease causing inflammation and ulcers in the digestive tract lining.",
        symptoms: {
            "diarrhea with blood": 3,
            "bloody stool": 3,
            "abdominal pain": 2,
            "rectal pain": 2,
            "rectal bleeding": 3,
            "urgency to defecate": 2,
            "inability to defecate despite urgency": 3,
            "weight loss": 2,
            "fatigue": 1,
            "fever": 1
        },
        primaryRegions: ["abdomen", "pelvis"],
        secondaryRegions: [],
        riskFactors: ["age under 30", "family history", "certain ethnic backgrounds"],
        recommendation: "Requires medical management with a gastroenterologist. May need anti-inflammatory drugs or immunosuppressants.",
        seekHelp: "soon"
    },
    "hepatitis": {
        name: "Hepatitis",
        category: "Digestive",
        severity: "moderate",
        timeCourse: "either",
        description: "Inflammation of the liver, commonly caused by viral infection, alcohol, or toxins.",
        symptoms: {
            "fatigue": 2,
            "nausea": 2,
            "vomiting": 1,
            "abdominal pain": 2,
            "right upper quadrant pain": 3,
            "loss of appetite": 2,
            "dark urine": 3,
            "pale stool": 3,
            "jaundice": 3,
            "yellowing of eyes": 3,
            "joint pain": 1,
            "fever": 1
        },
        primaryRegions: ["abdomen"],
        secondaryRegions: [],
        riskFactors: ["viral exposure", "alcohol use", "certain medications", "autoimmune conditions"],
        recommendation: "Medical evaluation is essential. Treatment depends on the type and cause of hepatitis.",
        seekHelp: "soon"
    },
    "pancreatitis": {
        name: "Pancreatitis",
        category: "Digestive",
        severity: "severe",
        timeCourse: "acute",
        description: "Inflammation of the pancreas that can range from mild to life-threatening.",
        symptoms: {
            "upper abdominal pain": 3,
            "pain radiating to back": 3,
            "pain worse after eating": 3,
            "pain relieved by leaning forward": 3,
            "nausea": 2,
            "vomiting": 2,
            "fever": 1,
            "rapid pulse": 2,
            "abdominal tenderness": 2
        },
        primaryRegions: ["abdomen"],
        secondaryRegions: ["back"],
        riskFactors: ["gallstones", "alcohol use", "certain medications", "high triglycerides"],
        recommendation: "Seek immediate medical attention. Severe cases require hospitalization and may need intensive care.",
        seekHelp: "immediately"
    },

    // ==================== NEUROLOGICAL CONDITIONS ====================
    "migraine": {
        name: "Migraine",
        category: "Neurological",
        severity: "moderate",
        timeCourse: "acute",
        description: "A neurological condition causing intense, throbbing headaches often accompanied by other symptoms.",
        symptoms: {
            "severe headache": 3,
            "throbbing pain": 3,
            "pain on one side of head": 3,
            "nausea": 2,
            "vomiting": 2,
            "sensitivity to light": 3,
            "sensitivity to sound": 3,
            "visual disturbances": 2,
            "aura": 3,
            "dizziness": 1,
            "headache lasting hours to days": 2
        },
        primaryRegions: ["head"],
        secondaryRegions: [],
        riskFactors: ["family history", "female gender", "hormonal changes", "stress", "certain foods"],
        recommendation: "Track triggers and discuss preventive strategies with a neurologist. Various medications can help manage migraines.",
        seekHelp: "scheduled"
    },
    "stroke": {
        name: "Stroke",
        category: "Neurological",
        severity: "severe",
        timeCourse: "acute",
        description: "A medical emergency occurring when blood supply to part of the brain is interrupted or reduced.",
        symptoms: {
            "sudden numbness on one side": 3,
            "sudden weakness on one side": 3,
            "facial drooping": 3,
            "arm weakness": 3,
            "confusion": 2,
            "trouble speaking": 3,
            "slurred speech": 3,
            "trouble understanding speech": 2,
            "vision problems in one eye": 3,
            "difficulty walking": 2,
            "sudden severe headache": 2,
            "loss of balance": 2
        },
        primaryRegions: ["head"],
        secondaryRegions: ["arms", "legs"],
        riskFactors: ["high blood pressure", "smoking", "diabetes", "high cholesterol", "atrial fibrillation"],
        recommendation: "CALL EMERGENCY SERVICES IMMEDIATELY. Remember FAST: Face drooping, Arm weakness, Speech difficulty, Time to call 911.",
        seekHelp: "immediately"
    },
    "epilepsy": {
        name: "Epilepsy",
        category: "Neurological",
        severity: "moderate",
        timeCourse: "chronic",
        description: "A neurological disorder causing recurrent seizures due to abnormal brain activity.",
        symptoms: {
            "seizures": 3,
            "convulsions": 3,
            "temporary confusion": 2,
            "staring spell": 3,
            "uncontrollable jerking": 3,
            "loss of consciousness": 2,
            "fear": 1,
            "anxiety": 1,
            "deja vu": 2
        },
        primaryRegions: ["head"],
        secondaryRegions: [],
        riskFactors: ["brain injury", "family history", "stroke", "dementia", "brain infections"],
        recommendation: "Work with a neurologist for diagnosis and management. Anti-seizure medications can help control seizures.",
        seekHelp: "scheduled"
    },
    "meningitis": {
        name: "Meningitis",
        category: "Neurological/Infectious",
        severity: "severe",
        timeCourse: "acute",
        description: "Inflammation of the membranes surrounding the brain and spinal cord, usually from infection.",
        symptoms: {
            "severe headache": 3,
            "stiff neck": 3,
            "neck stiffness": 3,
            "high fever": 3,
            "sensitivity to light": 2,
            "nausea": 2,
            "vomiting": 2,
            "confusion": 2,
            "seizures": 2,
            "petechial rash": 3,
            "difficulty concentrating": 1,
            "inability to flex neck to chest": 3
        },
        primaryRegions: ["head", "neck"],
        secondaryRegions: [],
        riskFactors: ["not being vaccinated", "age (children and young adults)", "weakened immune system"],
        recommendation: "SEEK IMMEDIATE MEDICAL ATTENTION. Bacterial meningitis can be fatal without prompt treatment.",
        seekHelp: "immediately"
    },

    // ==================== ENDOCRINE CONDITIONS ====================
    "cushings-syndrome": {
        name: "Cushing's Syndrome",
        category: "Endocrine",
        severity: "moderate",
        timeCourse: "chronic",
        description: "A condition caused by prolonged exposure to high levels of cortisol, either from the body or medications.",
        symptoms: {
            "moon face": 3,
            "rounded face": 3,
            "weight gain in midsection": 3,
            "central obesity": 3,
            "buffalo hump": 3,
            "fat deposits between shoulders": 3,
            "purple stretch marks": 3,
            "thin skin": 2,
            "easy bruising": 2,
            "slow wound healing": 2,
            "fatigue": 1,
            "muscle weakness": 2,
            "high blood pressure": 1,
            "high blood sugar": 1,
            "acne": 1,
            "irregular periods": 2
        },
        primaryRegions: ["abdomen", "head"],
        secondaryRegions: ["back", "skin"],
        riskFactors: ["long-term corticosteroid use", "pituitary tumor", "adrenal tumor"],
        recommendation: "Requires endocrinologist evaluation. Treatment depends on the cause and may include medication changes, surgery, or radiation.",
        seekHelp: "soon"
    },
    "addisons-disease": {
        name: "Addison's Disease",
        category: "Endocrine",
        severity: "moderate",
        timeCourse: "chronic",
        description: "A condition where the adrenal glands don't produce enough hormones.",
        symptoms: {
            "extreme fatigue": 3,
            "weight loss": 2,
            "decreased appetite": 2,
            "hyperpigmentation": 3,
            "darkening of skin": 3,
            "low blood pressure": 3,
            "salt craving": 3,
            "low blood sugar": 2,
            "nausea": 1,
            "diarrhea": 1,
            "muscle weakness": 2,
            "irritability": 1,
            "depression": 1
        },
        primaryRegions: ["skin"],
        secondaryRegions: ["abdomen"],
        riskFactors: ["autoimmune disease", "tuberculosis", "certain infections"],
        recommendation: "Requires lifelong hormone replacement therapy. Carry emergency injection and medical ID.",
        seekHelp: "soon"
    },
    "diabetes": {
        name: "Diabetes Mellitus",
        category: "Endocrine",
        severity: "moderate",
        timeCourse: "chronic",
        description: "A group of diseases affecting how the body uses blood sugar (glucose).",
        symptoms: {
            "increased thirst": 3,
            "frequent urination": 3,
            "extreme hunger": 2,
            "unexplained weight loss": 2,
            "fatigue": 2,
            "blurred vision": 2,
            "slow-healing sores": 2,
            "frequent infections": 2,
            "numbness in hands or feet": 2,
            "tingling in hands or feet": 2
        },
        primaryRegions: [],
        secondaryRegions: ["abdomen"],
        riskFactors: ["family history", "obesity", "sedentary lifestyle", "age over 45"],
        recommendation: "Requires ongoing management with diet, exercise, monitoring, and possibly medication. Regular check-ups essential.",
        seekHelp: "soon"
    },
    "hypothyroidism": {
        name: "Hypothyroidism",
        category: "Endocrine",
        severity: "mild",
        timeCourse: "chronic",
        description: "A condition where the thyroid gland doesn't produce enough thyroid hormone.",
        symptoms: {
            "fatigue": 2,
            "weight gain": 2,
            "cold intolerance": 3,
            "cold sensitivity": 3,
            "constipation": 2,
            "dry skin": 2,
            "puffy face": 2,
            "hoarse voice": 2,
            "muscle weakness": 1,
            "elevated cholesterol": 2,
            "depression": 1,
            "memory problems": 1,
            "slowed heart rate": 2,
            "thinning hair": 1
        },
        primaryRegions: ["neck"],
        secondaryRegions: [],
        riskFactors: ["female gender", "age over 60", "autoimmune disease", "family history"],
        recommendation: "Blood tests can diagnose. Treatment typically involves daily thyroid hormone replacement medication.",
        seekHelp: "scheduled"
    },
    "hyperthyroidism": {
        name: "Hyperthyroidism",
        category: "Endocrine",
        severity: "moderate",
        timeCourse: "chronic",
        description: "A condition where the thyroid gland produces too much thyroid hormone.",
        symptoms: {
            "unintentional weight loss": 3,
            "rapid heartbeat": 3,
            "increased appetite": 2,
            "nervousness": 2,
            "anxiety": 2,
            "tremor": 3,
            "sweating": 2,
            "heat intolerance": 3,
            "changes in menstruation": 1,
            "difficulty sleeping": 2,
            "fatigue": 1,
            "bulging eyes": 3,
            "goiter": 3
        },
        primaryRegions: ["neck"],
        secondaryRegions: ["chest"],
        riskFactors: ["female gender", "family history", "Graves' disease"],
        recommendation: "Requires medical evaluation and treatment. Options include medication, radioactive iodine, or surgery.",
        seekHelp: "soon"
    },

    // ==================== MUSCULOSKELETAL CONDITIONS ====================
    "arthritis": {
        name: "Arthritis (Osteoarthritis)",
        category: "Musculoskeletal",
        severity: "moderate",
        timeCourse: "chronic",
        description: "Inflammation of one or more joints, causing pain and stiffness that can worsen with age.",
        symptoms: {
            "joint pain": 3,
            "joint stiffness": 3,
            "morning stiffness": 2,
            "stiffness after inactivity": 3,
            "swelling around joints": 2,
            "decreased range of motion": 2,
            "grating sensation": 3,
            "bone spurs": 2,
            "pain worse with activity": 2
        },
        primaryRegions: ["joints"],
        secondaryRegions: ["arms", "legs"],
        riskFactors: ["age", "family history", "previous joint injury", "obesity"],
        recommendation: "See a rheumatologist for proper diagnosis. Treatment includes medication, physical therapy, and lifestyle modifications.",
        seekHelp: "scheduled"
    },
    "rheumatoid-arthritis": {
        name: "Rheumatoid Arthritis",
        category: "Musculoskeletal",
        severity: "moderate",
        timeCourse: "chronic",
        description: "An autoimmune disease causing joint inflammation, typically affecting both sides of the body symmetrically.",
        symptoms: {
            "joint pain": 3,
            "symmetrical joint involvement": 3,
            "morning stiffness lasting over an hour": 3,
            "swelling in multiple joints": 3,
            "fatigue": 2,
            "fever": 1,
            "weight loss": 1,
            "joint deformity": 2,
            "rheumatoid nodules": 3
        },
        primaryRegions: ["joints"],
        secondaryRegions: ["arms", "legs"],
        riskFactors: ["female gender", "family history", "smoking", "obesity"],
        recommendation: "Early treatment is important. See a rheumatologist for disease-modifying medications.",
        seekHelp: "soon"
    },
    "osteoporosis": {
        name: "Osteoporosis",
        category: "Musculoskeletal",
        severity: "moderate",
        timeCourse: "chronic",
        description: "A condition where bones become weak and brittle, increasing fracture risk.",
        symptoms: {
            "back pain from vertebral fracture": 3,
            "loss of height": 3,
            "stooped posture": 3,
            "bones that break easily": 3,
            "fracture from minor trauma": 3
        },
        primaryRegions: ["back"],
        secondaryRegions: ["joints"],
        riskFactors: ["female gender", "age", "family history", "low calcium intake", "sedentary lifestyle"],
        recommendation: "Bone density testing and consultation with a doctor. May need calcium/vitamin D supplements and medication.",
        seekHelp: "scheduled"
    },
    "herniated-disc": {
        name: "Herniated Disc",
        category: "Musculoskeletal",
        severity: "moderate",
        timeCourse: "acute",
        description: "A condition where the soft center of a spinal disc pushes through a crack in the outer casing.",
        symptoms: {
            "arm or leg pain": 2,
            "pain radiating down leg": 3,
            "pain radiating down arm": 3,
            "numbness": 2,
            "tingling": 2,
            "weakness in affected limb": 2,
            "pain worsening with certain movements": 2,
            "pain worse when sitting": 2
        },
        primaryRegions: ["back", "neck"],
        secondaryRegions: ["arms", "legs"],
        riskFactors: ["age", "excess weight", "physically demanding job", "genetics"],
        recommendation: "See a spine specialist. Treatment ranges from physical therapy to medication to surgery in severe cases.",
        seekHelp: "soon"
    },
    "sciatica": {
        name: "Sciatica",
        category: "Musculoskeletal",
        severity: "moderate",
        timeCourse: "either",
        description: "Pain radiating along the sciatic nerve, from the lower back through the hips and down each leg.",
        symptoms: {
            "lower back pain": 2,
            "pain radiating down leg": 3,
            "pain down back of leg": 3,
            "numbness in leg": 2,
            "tingling in leg": 2,
            "weakness in leg": 2,
            "pain when sitting": 2,
            "shooting pain": 3,
            "pain on one side": 3
        },
        primaryRegions: ["back", "pelvis"],
        secondaryRegions: ["legs"],
        riskFactors: ["age", "obesity", "prolonged sitting", "diabetes"],
        recommendation: "Often improves with self-care. See a doctor if pain is severe, sudden, or accompanied by weakness or bladder issues.",
        seekHelp: "if severe"
    },
    "fibromyalgia": {
        name: "Fibromyalgia",
        category: "Musculoskeletal",
        severity: "moderate",
        timeCourse: "chronic",
        description: "A disorder characterized by widespread musculoskeletal pain accompanied by fatigue and other symptoms.",
        symptoms: {
            "widespread pain": 3,
            "pain in multiple body areas": 3,
            "tender points": 3,
            "fatigue": 3,
            "unrefreshing sleep": 3,
            "cognitive difficulties": 2,
            "fibro fog": 3,
            "headaches": 1,
            "depression": 1,
            "anxiety": 1,
            "tingling in hands and feet": 1
        },
        primaryRegions: ["joints", "back"],
        secondaryRegions: ["arms", "legs", "head"],
        riskFactors: ["female gender", "family history", "other conditions like arthritis or lupus"],
        recommendation: "Work with a rheumatologist for comprehensive management including medication, therapy, and lifestyle changes.",
        seekHelp: "scheduled"
    },
    "gout": {
        name: "Gout",
        category: "Musculoskeletal",
        severity: "moderate",
        timeCourse: "acute",
        description: "A form of inflammatory arthritis caused by uric acid crystal deposits in joints.",
        symptoms: {
            "sudden severe joint pain": 3,
            "pain in big toe": 3,
            "joint redness": 3,
            "joint swelling": 3,
            "warmth around joint": 2,
            "extreme tenderness": 3,
            "pain worse at night": 2,
            "limited range of motion": 2
        },
        primaryRegions: ["joints"],
        secondaryRegions: ["legs"],
        riskFactors: ["high purine diet", "alcohol", "obesity", "certain medications", "kidney disease"],
        recommendation: "See a doctor for diagnosis and treatment. Medication can reduce pain and prevent future attacks.",
        seekHelp: "soon"
    },

    // ==================== URINARY CONDITIONS ====================
    "uti": {
        name: "Urinary Tract Infection (UTI)",
        category: "Urinary",
        severity: "mild",
        timeCourse: "acute",
        description: "An infection in any part of the urinary system, most commonly affecting the bladder and urethra.",
        symptoms: {
            "burning during urination": 3,
            "painful urination": 3,
            "frequent urination": 3,
            "urgency to urinate": 3,
            "cloudy urine": 2,
            "blood in urine": 2,
            "strong-smelling urine": 2,
            "pelvic pain": 2,
            "small amounts of urine": 2
        },
        primaryRegions: ["pelvis"],
        secondaryRegions: ["abdomen"],
        riskFactors: ["female anatomy", "sexual activity", "certain birth control", "menopause"],
        recommendation: "See a doctor for antibiotics. Drink plenty of water and urinate frequently.",
        seekHelp: "soon"
    },
    "kidney-stones": {
        name: "Kidney Stones",
        category: "Urinary",
        severity: "moderate",
        timeCourse: "acute",
        description: "Hard deposits of minerals and salts that form inside the kidneys.",
        symptoms: {
            "severe pain in side": 3,
            "severe pain in back below ribs": 3,
            "pain radiating to groin": 3,
            "pain in waves": 3,
            "pain during urination": 2,
            "pink or red urine": 2,
            "blood in urine": 2,
            "cloudy urine": 1,
            "nausea": 2,
            "vomiting": 2,
            "frequent urination": 1,
            "inability to find comfortable position": 3
        },
        primaryRegions: ["back", "abdomen"],
        secondaryRegions: ["pelvis"],
        riskFactors: ["dehydration", "certain diets", "obesity", "family history", "certain medical conditions"],
        recommendation: "Seek medical care for severe pain. Small stones may pass naturally; larger ones may need intervention.",
        seekHelp: "soon"
    },
    "chronic-kidney-disease": {
        name: "Chronic Kidney Disease",
        category: "Urinary",
        severity: "severe",
        timeCourse: "chronic",
        description: "Gradual loss of kidney function over time, which can eventually require dialysis or transplant.",
        symptoms: {
            "fatigue": 2,
            "difficulty concentrating": 1,
            "decreased appetite": 1,
            "trouble sleeping": 1,
            "swelling in feet and ankles": 3,
            "puffiness around eyes": 2,
            "dry itchy skin": 2,
            "frequent urination especially at night": 2,
            "blood in urine": 2,
            "foamy urine": 3,
            "muscle cramps": 2
        },
        primaryRegions: ["back"],
        secondaryRegions: ["abdomen", "legs"],
        riskFactors: ["diabetes", "high blood pressure", "heart disease", "family history"],
        recommendation: "Requires ongoing management with a nephrologist. Focus on controlling underlying conditions.",
        seekHelp: "soon"
    },

    // ==================== INFECTIOUS DISEASES ====================
    "influenza": {
        name: "Influenza (Flu)",
        category: "Infectious",
        severity: "mild",
        timeCourse: "acute",
        description: "A contagious respiratory illness caused by influenza viruses.",
        symptoms: {
            "fever": 3,
            "chills": 2,
            "cough": 2,
            "sore throat": 2,
            "runny nose": 1,
            "muscle aches": 3,
            "body aches": 3,
            "headache": 2,
            "fatigue": 2,
            "sudden onset": 3
        },
        primaryRegions: ["head", "chest"],
        secondaryRegions: ["abdomen"],
        riskFactors: ["age (very young or elderly)", "weakened immune system", "chronic conditions"],
        recommendation: "Rest and hydration. Antiviral medications may help if started early. Seek care if symptoms are severe.",
        seekHelp: "if severe"
    },
    "covid-19": {
        name: "COVID-19",
        category: "Infectious",
        severity: "moderate",
        timeCourse: "acute",
        description: "A respiratory illness caused by the SARS-CoV-2 virus.",
        symptoms: {
            "fever": 2,
            "cough": 2,
            "fatigue": 2,
            "loss of taste": 3,
            "loss of smell": 3,
            "shortness of breath": 2,
            "body aches": 1,
            "sore throat": 1,
            "headache": 1,
            "congestion": 1,
            "nausea": 1,
            "diarrhea": 1
        },
        primaryRegions: ["chest"],
        secondaryRegions: ["head", "abdomen"],
        riskFactors: ["age", "underlying health conditions", "not vaccinated"],
        recommendation: "Isolate and monitor symptoms. Seek medical care if you have difficulty breathing or persistent symptoms.",
        seekHelp: "if severe"
    },

    // ==================== SKIN CONDITIONS ====================
    "eczema": {
        name: "Eczema (Atopic Dermatitis)",
        category: "Dermatological",
        severity: "mild",
        timeCourse: "chronic",
        description: "A condition that makes skin red, inflamed, and itchy. Common in children but can occur at any age.",
        symptoms: {
            "dry skin": 3,
            "itching": 3,
            "intense itching": 3,
            "red patches": 3,
            "small raised bumps": 2,
            "thickened skin": 2,
            "raw skin from scratching": 2,
            "patches in skin creases": 3
        },
        primaryRegions: ["skin"],
        secondaryRegions: ["arms", "legs"],
        riskFactors: ["family history of eczema, allergies, or asthma", "certain occupations"],
        recommendation: "Moisturize regularly and avoid triggers. See a dermatologist for persistent or severe cases.",
        seekHelp: "scheduled"
    },
    "psoriasis": {
        name: "Psoriasis",
        category: "Dermatological",
        severity: "mild",
        timeCourse: "chronic",
        description: "An immune-mediated disease causing raised, red, scaly patches on the skin.",
        symptoms: {
            "red patches with silvery scales": 3,
            "dry cracked skin": 2,
            "itching": 2,
            "burning": 2,
            "soreness": 1,
            "thickened pitted nails": 3,
            "plaques on scalp": 2,
            "plaques on elbows": 3,
            "plaques on knees": 3
        },
        primaryRegions: ["skin"],
        secondaryRegions: ["joints"],
        riskFactors: ["family history", "stress", "obesity", "smoking"],
        recommendation: "See a dermatologist for treatment options including topical treatments, light therapy, or systemic medications.",
        seekHelp: "scheduled"
    },

    // ==================== MENTAL HEALTH ====================
    "depression": {
        name: "Major Depressive Disorder",
        category: "Mental Health",
        severity: "moderate",
        timeCourse: "chronic",
        description: "A mood disorder causing persistent feelings of sadness and loss of interest.",
        symptoms: {
            "persistent sadness": 3,
            "loss of interest": 3,
            "anhedonia": 3,
            "fatigue": 2,
            "sleep changes": 2,
            "insomnia": 2,
            "sleeping too much": 2,
            "appetite changes": 2,
            "weight changes": 1,
            "difficulty concentrating": 2,
            "feelings of worthlessness": 3,
            "feelings of guilt": 2,
            "thoughts of death": 3,
            "suicidal thoughts": 3
        },
        primaryRegions: ["head"],
        secondaryRegions: [],
        riskFactors: ["family history", "trauma", "certain medications", "other mental health conditions"],
        recommendation: "Seek help from a mental health professional. Treatment includes therapy, medication, or both. If having thoughts of suicide, seek immediate help.",
        seekHelp: "soon"
    },
    "anxiety-disorder": {
        name: "Generalized Anxiety Disorder",
        category: "Mental Health",
        severity: "moderate",
        timeCourse: "chronic",
        description: "A condition characterized by persistent and excessive worry about various aspects of life.",
        symptoms: {
            "excessive worry": 3,
            "difficulty controlling worry": 3,
            "restlessness": 2,
            "feeling on edge": 2,
            "fatigue": 1,
            "difficulty concentrating": 2,
            "mind going blank": 2,
            "irritability": 2,
            "muscle tension": 2,
            "sleep problems": 2,
            "rapid heartbeat": 1
        },
        primaryRegions: ["head"],
        secondaryRegions: ["chest"],
        riskFactors: ["family history", "trauma", "chronic illness", "substance use"],
        recommendation: "Mental health professional can help with therapy and/or medication. Lifestyle changes like exercise and stress management also help.",
        seekHelp: "scheduled"
    },
    "panic-disorder": {
        name: "Panic Disorder",
        category: "Mental Health",
        severity: "moderate",
        timeCourse: "either",
        description: "A condition characterized by recurrent unexpected panic attacks.",
        symptoms: {
            "sudden intense fear": 3,
            "heart pounding": 3,
            "rapid heartbeat": 3,
            "sweating": 2,
            "trembling": 2,
            "shortness of breath": 2,
            "feeling of choking": 3,
            "chest pain": 2,
            "nausea": 1,
            "dizziness": 2,
            "fear of losing control": 3,
            "fear of dying": 3,
            "numbness or tingling": 2
        },
        primaryRegions: ["chest", "head"],
        secondaryRegions: [],
        riskFactors: ["family history", "major stress", "traumatic events", "other mental health conditions"],
        recommendation: "Treatment with therapy (especially CBT) and/or medication is very effective. Seek professional help.",
        seekHelp: "soon"
    }
};

// Symptom keywords mapping for better matching
const SYMPTOM_KEYWORDS = {
    pain: ["pain", "ache", "hurt", "sore", "tender", "discomfort", "cramping", "throbbing", "sharp", "dull", "burning"],
    swelling: ["swelling", "swollen", "puffy", "bloated", "inflamed", "enlarged", "edema"],
    fatigue: ["fatigue", "tired", "exhausted", "weak", "lethargy", "drowsy", "weary", "low energy", "no energy"],
    fever: ["fever", "temperature", "hot", "chills", "sweating", "feverish"],
    nausea: ["nausea", "nauseated", "queasy", "sick to stomach", "upset stomach"],
    vomiting: ["vomiting", "throwing up", "vomit", "emesis", "puking"],
    dizziness: ["dizziness", "dizzy", "lightheaded", "vertigo", "unsteady", "faint", "woozy"],
    numbness: ["numbness", "numb", "tingling", "pins and needles", "prickling", "paresthesia"],
    weakness: ["weakness", "weak", "feeble", "loss of strength", "can't move"],
    breathing: ["shortness of breath", "difficulty breathing", "breathless", "can't breathe", "gasping", "wheezing", "dyspnea"],
    headache: ["headache", "head pain", "migraine", "head hurts", "pressure in head"],
    cough: ["cough", "coughing", "hacking", "dry cough", "productive cough"],
    chest: ["chest pain", "chest pressure", "chest tightness", "heart pounding", "palpitations"],
    stomach: ["stomach pain", "abdominal pain", "belly pain", "stomach ache", "stomach cramps", "epigastric"],
    back: ["back pain", "lower back pain", "upper back pain", "spine pain", "lumbar pain"],
    skin: ["rash", "itching", "itchy", "red skin", "hives", "skin irritation", "spots"],
    urinary: ["burning urination", "frequent urination", "blood in urine", "urgency", "dysuria"],
    vision: ["blurred vision", "vision problems", "seeing spots", "double vision", "vision loss"],
    appetite: ["loss of appetite", "no appetite", "not hungry", "increased appetite", "anorexia"],
    sleep: ["insomnia", "can't sleep", "trouble sleeping", "sleeping too much", "unrefreshing sleep"],
    mood: ["sad", "depressed", "anxious", "worried", "nervous", "irritable", "mood changes"],
    weight: ["weight gain", "weight loss", "gaining weight", "losing weight", "unintentional weight"],
    cognitive: ["confusion", "memory problems", "difficulty concentrating", "brain fog", "can't think clearly"]
};

// Location aliases for better matching
const LOCATION_ALIASES = {
    head: ["head", "skull", "brain", "forehead", "temple", "scalp", "face"],
    neck: ["neck", "throat", "cervical", "thyroid"],
    chest: ["chest", "thorax", "breast", "ribcage", "sternum", "heart area", "lungs"],
    abdomen: ["abdomen", "stomach", "belly", "gut", "abdominal", "tummy", "upper abdomen", "lower abdomen", "epigastric"],
    pelvis: ["pelvis", "groin", "hip", "lower belly", "pelvic", "bladder area"],
    back: ["back", "spine", "lower back", "upper back", "lumbar", "thoracic", "cervical spine"],
    arms: ["arm", "arms", "shoulder", "elbow", "wrist", "forearm", "upper arm", "hand", "fingers"],
    legs: ["leg", "legs", "thigh", "knee", "calf", "ankle", "shin", "hip", "foot", "feet", "toes"],
    joints: ["joint", "joints", "knee", "elbow", "wrist", "ankle", "hip", "shoulder", "knuckles"],
    skin: ["skin", "surface", "dermis", "all over", "everywhere"]
};

// Time course keywords for detection
const TIME_COURSE_KEYWORDS = {
    acute: ["sudden", "suddenly", "just started", "started today", "started yesterday", "new", "recent", "acute", "came on fast", "woke up with", "out of nowhere"],
    chronic: ["chronic", "long-term", "for months", "for years", "for weeks", "ongoing", "persistent", "always", "constant", "recurring", "comes and goes", "been having"]
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DISEASES, SYMPTOM_KEYWORDS, LOCATION_ALIASES, TIME_COURSE_KEYWORDS };
}
