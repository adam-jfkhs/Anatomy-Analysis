/**
 * Body Diagnostic Tool - Main Application v2.0
 *
 * Improved with:
 * - Weighted symptom scoring
 * - Time course matching (acute vs chronic)
 * - Primary vs secondary region distinction
 * - Explainability panel showing why conditions matched
 */

class BodyDiagnosticApp {
    constructor() {
        this.selectedRegion = null;
        this.selectedLocations = new Set();
        this.selectedSymptoms = new Set();
        this.currentView = 'external';

        this.init();
    }

    init() {
        this.bindBodyMapEvents();
        this.bindTabEvents();
        this.bindSymptomCheckerEvents();
        this.bindViewToggleEvents();
        this.populateOrganList();
        this.populateDiseaseList();
    }

    // ==================== Body Map Interactions ====================

    bindBodyMapEvents() {
        const bodyParts = document.querySelectorAll('.body-part');

        bodyParts.forEach(part => {
            part.addEventListener('click', (e) => {
                const region = e.target.dataset.region;
                this.selectBodyRegion(region);
            });

            part.addEventListener('mouseenter', (e) => {
                e.target.style.cursor = 'pointer';
            });
        });
    }

    selectBodyRegion(regionId) {
        // Remove previous selection
        document.querySelectorAll('.body-part').forEach(part => {
            part.classList.remove('active');
        });

        // Add selection to clicked region
        const selectedPart = document.querySelector(`[data-region="${regionId}"]`);
        if (selectedPart) {
            selectedPart.classList.add('active');
        }

        this.selectedRegion = regionId;
        this.displayRegionInfo(regionId);

        // Switch to region info tab
        this.switchTab('region-info');
    }

    displayRegionInfo(regionId) {
        const region = BODY_REGIONS[regionId];
        if (!region) return;

        const tabPane = document.getElementById('region-info');

        // Get organs for this region
        const organsList = region.organs
            .map(organId => {
                const organ = ORGANS[organId];
                return organ ?
                    `<span class="organ-tag" data-organ="${organId}">${organ.name}</span>` :
                    `<span class="organ-tag">${organId}</span>`;
            })
            .join('');

        // Get related conditions
        const conditionsList = region.commonConditions
            .map(condId => {
                const condition = DISEASES[condId];
                return condition ?
                    `<span class="organ-tag" data-disease="${condId}" style="background: #6e84a3;">${condition.name}</span>` :
                    `<span class="organ-tag" style="background: #6e84a3;">${condId.replace(/-/g, ' ')}</span>`;
            })
            .join('');

        tabPane.innerHTML = `
            <div class="region-info-card">
                <h3>${region.name}</h3>
                <p>${region.description}</p>

                <div class="region-organs">
                    <h4>Organs in this region:</h4>
                    <div class="organ-tags">
                        ${organsList}
                    </div>
                </div>

                <div class="region-organs" style="margin-top: 15px;">
                    <h4>Common conditions affecting this area:</h4>
                    <div class="organ-tags">
                        ${conditionsList}
                    </div>
                </div>
            </div>
        `;

        // Bind click events to organ tags
        tabPane.querySelectorAll('.organ-tag[data-organ]').forEach(tag => {
            tag.addEventListener('click', () => {
                this.showOrganDetail(tag.dataset.organ);
            });
        });

        // Bind click events to disease tags
        tabPane.querySelectorAll('.organ-tag[data-disease]').forEach(tag => {
            tag.addEventListener('click', () => {
                this.showDiseaseDetail(tag.dataset.disease);
            });
        });
    }

    // ==================== Tab Navigation ====================

    bindTabEvents() {
        const tabButtons = document.querySelectorAll('.tab-btn');

        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.dataset.tab;
                this.switchTab(tabId);
            });
        });
    }

    switchTab(tabId) {
        // Update button states
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabId);
        });

        // Update pane visibility
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.toggle('active', pane.id === tabId);
        });
    }

    // ==================== Organ List ====================

    populateOrganList() {
        const organList = document.getElementById('organList');

        // Add search box
        organList.innerHTML = `
            <div class="search-box">
                <input type="text" id="organSearch" placeholder="Search organs...">
            </div>
            <div class="organ-items"></div>
        `;

        const organItems = organList.querySelector('.organ-items');

        Object.entries(ORGANS).forEach(([id, organ]) => {
            const card = document.createElement('div');
            card.className = 'organ-card';
            card.dataset.organId = id;
            card.innerHTML = `
                <h4>${organ.name}</h4>
                <p><strong>System:</strong> ${organ.system}</p>
                <p>${organ.description.substring(0, 100)}...</p>
            `;

            card.addEventListener('click', () => this.showOrganDetail(id));
            organItems.appendChild(card);
        });

        // Search functionality
        document.getElementById('organSearch').addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            organItems.querySelectorAll('.organ-card').forEach(card => {
                const organ = ORGANS[card.dataset.organId];
                const matches = organ.name.toLowerCase().includes(query) ||
                               organ.system.toLowerCase().includes(query) ||
                               organ.description.toLowerCase().includes(query);
                card.style.display = matches ? 'block' : 'none';
            });
        });
    }

    showOrganDetail(organId) {
        const organ = ORGANS[organId];
        if (!organ) return;

        const relatedConditions = organ.relatedConditions
            .map(condId => {
                const cond = DISEASES[condId];
                return cond ? cond.name : condId.replace(/-/g, ' ');
            })
            .join('</li><li>');

        const functions = organ.functions.join('</li><li>');

        this.showModal(`
            <div class="modal-header">
                <h2>${organ.name}</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-content">
                <section>
                    <h3>System</h3>
                    <p>${organ.system}</p>
                </section>
                <section>
                    <h3>Description</h3>
                    <p>${organ.description}</p>
                </section>
                <section>
                    <h3>Functions</h3>
                    <ul><li>${functions}</li></ul>
                </section>
                <section>
                    <h3>Related Conditions</h3>
                    <ul><li>${relatedConditions}</li></ul>
                </section>
            </div>
        `);
    }

    // ==================== Disease List ====================

    populateDiseaseList() {
        const diseaseList = document.getElementById('diseaseList');

        // Add search and filter
        diseaseList.innerHTML = `
            <div class="search-box">
                <input type="text" id="diseaseSearch" placeholder="Search conditions...">
            </div>
            <div class="filter-chips" style="margin-bottom: 15px;">
                <button class="chip selected" data-filter="all">All</button>
                <button class="chip" data-filter="Cardiovascular">Heart</button>
                <button class="chip" data-filter="Respiratory">Lungs</button>
                <button class="chip" data-filter="Digestive">Digestive</button>
                <button class="chip" data-filter="Neurological">Brain</button>
                <button class="chip" data-filter="Musculoskeletal">Muscles/Bones</button>
                <button class="chip" data-filter="Endocrine">Endocrine</button>
            </div>
            <div class="disease-items"></div>
        `;

        const diseaseItems = diseaseList.querySelector('.disease-items');

        Object.entries(DISEASES).forEach(([id, disease]) => {
            const card = document.createElement('div');
            card.className = 'disease-card';
            card.dataset.diseaseId = id;
            card.dataset.category = disease.category;

            // Get symptom list from object keys
            const symptomCount = Object.keys(disease.symptoms).length;

            card.innerHTML = `
                <h4>${disease.name}</h4>
                <p>${disease.description.substring(0, 80)}...</p>
                <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px;">
                    <span class="severity ${disease.severity}">${disease.severity}</span>
                    <span class="time-course-badge ${disease.timeCourse}">${disease.timeCourse}</span>
                </div>
            `;

            card.addEventListener('click', () => this.showDiseaseDetail(id));
            diseaseItems.appendChild(card);
        });

        // Search functionality
        document.getElementById('diseaseSearch').addEventListener('input', (e) => {
            this.filterDiseases();
        });

        // Category filter
        diseaseList.querySelectorAll('.filter-chips .chip').forEach(chip => {
            chip.addEventListener('click', (e) => {
                diseaseList.querySelectorAll('.filter-chips .chip').forEach(c => c.classList.remove('selected'));
                chip.classList.add('selected');
                this.filterDiseases();
            });
        });
    }

    filterDiseases() {
        const searchQuery = document.getElementById('diseaseSearch').value.toLowerCase();
        const categoryFilter = document.querySelector('.filter-chips .chip.selected').dataset.filter;
        const diseaseItems = document.querySelector('.disease-items');

        diseaseItems.querySelectorAll('.disease-card').forEach(card => {
            const disease = DISEASES[card.dataset.diseaseId];
            const symptoms = Object.keys(disease.symptoms);
            const matchesSearch = disease.name.toLowerCase().includes(searchQuery) ||
                                 disease.description.toLowerCase().includes(searchQuery) ||
                                 symptoms.some(s => s.includes(searchQuery));
            const matchesCategory = categoryFilter === 'all' ||
                                   disease.category === categoryFilter ||
                                   disease.category.includes(categoryFilter);

            card.style.display = (matchesSearch && matchesCategory) ? 'block' : 'none';
        });
    }

    showDiseaseDetail(diseaseId) {
        const disease = DISEASES[diseaseId];
        if (!disease) return;

        // Get symptoms with weights
        const symptomsWithWeights = Object.entries(disease.symptoms)
            .sort((a, b) => b[1] - a[1]) // Sort by weight descending
            .map(([symptom, weight]) => {
                const weightLabel = weight === 3 ? 'highly specific' : weight === 2 ? 'suggestive' : 'common';
                const weightClass = weight === 3 ? 'weight-high' : weight === 2 ? 'weight-medium' : 'weight-low';
                return `<li><span class="symptom-weight ${weightClass}">${weight}</span> ${symptom}</li>`;
            })
            .join('');

        const riskFactors = disease.riskFactors.join('</li><li>');
        const primaryRegions = disease.primaryRegions.length > 0 ? disease.primaryRegions.join(', ') : 'None specific';
        const secondaryRegions = disease.secondaryRegions.length > 0 ? disease.secondaryRegions.join(', ') : 'None';

        this.showModal(`
            <div class="modal-header">
                <h2>${disease.name}</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-content">
                <section>
                    <h3>Classification</h3>
                    <p>
                        <strong>Category:</strong> ${disease.category}<br>
                        <strong>Severity:</strong> <span class="severity ${disease.severity}">${disease.severity}</span><br>
                        <strong>Time Course:</strong> <span class="time-course-badge ${disease.timeCourse}">${disease.timeCourse}</span>
                    </p>
                </section>
                <section>
                    <h3>Description</h3>
                    <p>${disease.description}</p>
                </section>
                <section>
                    <h3>Symptoms <small style="color: #6e84a3;">(weighted by specificity: 3=highly specific, 2=suggestive, 1=common)</small></h3>
                    <ul class="weighted-symptoms">${symptomsWithWeights}</ul>
                </section>
                <section>
                    <h3>Affected Body Areas</h3>
                    <p><strong>Primary:</strong> ${primaryRegions}</p>
                    <p><strong>Secondary:</strong> ${secondaryRegions}</p>
                </section>
                <section>
                    <h3>Risk Factors</h3>
                    <ul><li>${riskFactors}</li></ul>
                </section>
                <section style="background: #fff3cd;">
                    <h3>Recommendation</h3>
                    <p><strong>When to seek help:</strong> ${disease.seekHelp}</p>
                    <p>${disease.recommendation}</p>
                </section>
            </div>
        `);
    }

    // ==================== Modal ====================

    showModal(content) {
        // Remove existing modal if any
        const existingModal = document.querySelector('.modal-overlay');
        if (existingModal) {
            existingModal.remove();
        }

        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.innerHTML = `<div class="modal">${content}</div>`;

        document.body.appendChild(overlay);

        // Show with animation
        requestAnimationFrame(() => {
            overlay.classList.add('visible');
        });

        // Bind close events
        overlay.querySelector('.modal-close').addEventListener('click', () => {
            this.closeModal();
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.closeModal();
            }
        });
    }

    closeModal() {
        const overlay = document.querySelector('.modal-overlay');
        if (overlay) {
            overlay.classList.remove('visible');
            setTimeout(() => overlay.remove(), 300);
        }
    }

    // ==================== Symptom Checker ====================

    bindSymptomCheckerEvents() {
        // Location chip selection
        document.querySelectorAll('#locationChips .chip').forEach(chip => {
            chip.addEventListener('click', () => {
                chip.classList.toggle('selected');
                const location = chip.dataset.location;

                if (chip.classList.contains('selected')) {
                    this.selectedLocations.add(location);
                    this.highlightBodyRegion(location);
                } else {
                    this.selectedLocations.delete(location);
                    this.unhighlightBodyRegion(location);
                }
            });
        });

        // Common symptom chip selection
        document.querySelectorAll('#commonSymptoms .symptom-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                chip.classList.toggle('selected');
                const symptom = chip.dataset.symptom;

                if (chip.classList.contains('selected')) {
                    this.selectedSymptoms.add(symptom);
                    // Add to textarea
                    const textarea = document.getElementById('symptomInput');
                    if (!textarea.value.toLowerCase().includes(symptom)) {
                        textarea.value += (textarea.value ? ', ' : '') + symptom;
                    }
                } else {
                    this.selectedSymptoms.delete(symptom);
                }
            });
        });

        // Analyze button
        document.getElementById('analyzeBtn').addEventListener('click', () => {
            this.analyzeSymptoms();
        });

        // Allow Enter key to submit
        document.getElementById('symptomInput').addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.analyzeSymptoms();
            }
        });
    }

    highlightBodyRegion(location) {
        // Map location names to body map regions
        const regionMap = {
            'head': ['head'],
            'neck': ['neck'],
            'chest': ['chest'],
            'abdomen': ['abdomen'],
            'pelvis': ['pelvis'],
            'back': ['chest', 'abdomen'], // Back shown on front view
            'arms': ['left-arm', 'right-arm', 'left-forearm', 'right-forearm', 'left-hand', 'right-hand', 'left-shoulder', 'right-shoulder'],
            'legs': ['left-thigh', 'right-thigh', 'left-leg', 'right-leg', 'left-foot', 'right-foot'],
            'joints': ['left-shoulder', 'right-shoulder'],
            'skin': [] // Can't highlight skin specifically
        };

        const regions = regionMap[location] || [];
        regions.forEach(region => {
            const part = document.querySelector(`[data-region="${region}"]`);
            if (part) {
                part.classList.add('highlighted');
            }
        });
    }

    unhighlightBodyRegion(location) {
        const regionMap = {
            'head': ['head'],
            'neck': ['neck'],
            'chest': ['chest'],
            'abdomen': ['abdomen'],
            'pelvis': ['pelvis'],
            'back': ['chest', 'abdomen'],
            'arms': ['left-arm', 'right-arm', 'left-forearm', 'right-forearm', 'left-hand', 'right-hand', 'left-shoulder', 'right-shoulder'],
            'legs': ['left-thigh', 'right-thigh', 'left-leg', 'right-leg', 'left-foot', 'right-foot'],
            'joints': ['left-shoulder', 'right-shoulder'],
            'skin': []
        };

        const regions = regionMap[location] || [];
        regions.forEach(region => {
            const part = document.querySelector(`[data-region="${region}"]`);
            if (part) {
                part.classList.remove('highlighted');
            }
        });
    }

    bindViewToggleEvents() {
        document.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentView = btn.dataset.view;
                // Future: Toggle between external and internal organ view
            });
        });
    }

    // ==================== IMPROVED Symptom Analysis ====================

    analyzeSymptoms() {
        const symptomText = document.getElementById('symptomInput').value.toLowerCase();
        const selectedLocations = Array.from(this.selectedLocations);

        if (!symptomText.trim() && selectedLocations.length === 0) {
            alert('Please describe your symptoms or select affected body areas.');
            return;
        }

        const results = this.matchConditions(symptomText, selectedLocations);
        this.displayResults(results);
    }

    /**
     * IMPROVED matching algorithm with:
     * - Weighted symptom scoring
     * - Time course matching
     * - Primary/secondary region distinction
     * - Detailed match explanations
     */
    matchConditions(symptomText, locations) {
        const results = [];
        const textAnalysis = this.analyzeText(symptomText);

        Object.entries(DISEASES).forEach(([id, disease]) => {
            let totalScore = 0;
            let maxPossibleScore = 0;
            const matchDetails = {
                symptoms: [],
                regions: [],
                timeCourseMatch: false,
                timeCourseBonus: 0,
                timePenalty: 0
            };

            // ========== WEIGHTED SYMPTOM MATCHING ==========
            Object.entries(disease.symptoms).forEach(([symptom, weight]) => {
                const symptomLower = symptom.toLowerCase();
                maxPossibleScore += weight * 10; // Max possible per symptom

                // Direct match
                if (symptomText.includes(symptomLower)) {
                    const score = weight * 10;
                    totalScore += score;
                    matchDetails.symptoms.push({
                        symptom,
                        weight,
                        score,
                        matchType: 'direct'
                    });
                } else {
                    // Check keyword variations
                    let matched = false;
                    for (const [key, variations] of Object.entries(SYMPTOM_KEYWORDS)) {
                        if (symptomLower.includes(key) || key.includes(symptomLower.split(' ')[0])) {
                            for (const variation of variations) {
                                if (symptomText.includes(variation)) {
                                    const score = weight * 7; // Partial match gets 70%
                                    totalScore += score;
                                    matchDetails.symptoms.push({
                                        symptom,
                                        weight,
                                        score,
                                        matchType: 'keyword',
                                        matchedKeyword: variation
                                    });
                                    matched = true;
                                    break;
                                }
                            }
                        }
                        if (matched) break;
                    }
                }
            });

            // ========== TIME COURSE MATCHING ==========
            if (textAnalysis.timeCourse !== 'unknown' && disease.timeCourse !== 'either') {
                if (textAnalysis.timeCourse === disease.timeCourse) {
                    // Bonus for matching time course
                    const timeBonus = 15;
                    totalScore += timeBonus;
                    matchDetails.timeCourseMatch = true;
                    matchDetails.timeCourseBonus = timeBonus;
                } else {
                    // Penalty for mismatched time course (e.g., acute disease for chronic symptoms)
                    const timePenalty = 20;
                    totalScore -= timePenalty;
                    matchDetails.timePenalty = timePenalty;
                }
            }

            // ========== REGION MATCHING WITH PRIMARY/SECONDARY ==========
            if (locations.length > 0) {
                // Check primary regions (higher weight)
                disease.primaryRegions.forEach(region => {
                    const regionLower = region.toLowerCase();
                    locations.forEach(location => {
                        const aliases = LOCATION_ALIASES[location] || [location];
                        if (aliases.some(alias => regionLower.includes(alias) || alias.includes(regionLower))) {
                            const score = 20; // Primary region match
                            totalScore += score;
                            if (!matchDetails.regions.find(r => r.region === region)) {
                                matchDetails.regions.push({
                                    region,
                                    type: 'primary',
                                    score
                                });
                            }
                        }
                    });
                });

                // Check secondary regions (lower weight)
                disease.secondaryRegions.forEach(region => {
                    const regionLower = region.toLowerCase();
                    locations.forEach(location => {
                        const aliases = LOCATION_ALIASES[location] || [location];
                        if (aliases.some(alias => regionLower.includes(alias) || alias.includes(regionLower))) {
                            const score = 8; // Secondary region match
                            totalScore += score;
                            if (!matchDetails.regions.find(r => r.region === region)) {
                                matchDetails.regions.push({
                                    region,
                                    type: 'secondary',
                                    score
                                });
                            }
                        }
                    });
                });
            }

            // Only include if there's a meaningful match
            if (totalScore > 0 && matchDetails.symptoms.length > 0) {
                // Calculate confidence level
                const symptomScore = matchDetails.symptoms.reduce((sum, s) => sum + s.score, 0);
                const confidence = this.calculateConfidence(totalScore, maxPossibleScore, matchDetails);

                results.push({
                    id,
                    disease,
                    totalScore,
                    maxPossibleScore,
                    matchDetails,
                    confidence,
                    explanation: this.generateExplanation(matchDetails, disease, textAnalysis)
                });
            }
        });

        // Sort by total score descending
        results.sort((a, b) => b.totalScore - a.totalScore);

        // Return top 5 results
        return results.slice(0, 5);
    }

    /**
     * Analyze input text for time course and other factors
     */
    analyzeText(text) {
        const analysis = {
            severity: 'unknown',
            timeCourse: 'unknown'
        };

        // Severity indicators
        const severeWords = ['severe', 'intense', 'extreme', 'unbearable', 'worst', 'excruciating', 'sharp', 'stabbing', 'terrible'];
        const mildWords = ['mild', 'slight', 'minor', 'little', 'occasional', 'sometimes'];

        if (severeWords.some(word => text.includes(word))) {
            analysis.severity = 'severe';
        } else if (mildWords.some(word => text.includes(word))) {
            analysis.severity = 'mild';
        }

        // Time course detection using keywords from diseases.js
        const acuteKeywords = TIME_COURSE_KEYWORDS?.acute || ['sudden', 'suddenly', 'just started', 'started today', 'started yesterday', 'new', 'recent', 'acute', 'came on fast', 'woke up with'];
        const chronicKeywords = TIME_COURSE_KEYWORDS?.chronic || ['chronic', 'long-term', 'for months', 'for years', 'for weeks', 'ongoing', 'persistent', 'always', 'constant', 'recurring', 'comes and goes', 'been having'];

        if (chronicKeywords.some(word => text.includes(word))) {
            analysis.timeCourse = 'chronic';
        } else if (acuteKeywords.some(word => text.includes(word))) {
            analysis.timeCourse = 'acute';
        }

        return analysis;
    }

    /**
     * Calculate confidence level based on match quality
     */
    calculateConfidence(totalScore, maxPossible, matchDetails) {
        // Weight factors
        const symptomMatchRatio = totalScore / Math.max(maxPossible, 1);
        const hasHighWeightSymptoms = matchDetails.symptoms.some(s => s.weight === 3);
        const hasPrimaryRegion = matchDetails.regions.some(r => r.type === 'primary');
        const hasTimeCourseMatch = matchDetails.timeCourseMatch;

        let confidenceScore = symptomMatchRatio * 50; // Base: up to 50 points from symptom ratio

        if (hasHighWeightSymptoms) confidenceScore += 20;
        if (hasPrimaryRegion) confidenceScore += 15;
        if (hasTimeCourseMatch) confidenceScore += 15;

        // Apply penalty if applicable
        if (matchDetails.timePenalty > 0) {
            confidenceScore -= 15;
        }

        // Determine confidence level
        if (confidenceScore >= 60) return 'high';
        if (confidenceScore >= 35) return 'moderate';
        return 'low';
    }

    /**
     * Generate human-readable explanation for why a condition matched
     */
    generateExplanation(matchDetails, disease, textAnalysis) {
        const parts = [];

        // Symptom explanations with weights
        if (matchDetails.symptoms.length > 0) {
            const symptomsByWeight = {
                3: matchDetails.symptoms.filter(s => s.weight === 3),
                2: matchDetails.symptoms.filter(s => s.weight === 2),
                1: matchDetails.symptoms.filter(s => s.weight === 1)
            };

            if (symptomsByWeight[3].length > 0) {
                parts.push(`<strong>Highly specific symptoms (weight 3):</strong> ${symptomsByWeight[3].map(s => s.symptom).join(', ')}`);
            }
            if (symptomsByWeight[2].length > 0) {
                parts.push(`<strong>Suggestive symptoms (weight 2):</strong> ${symptomsByWeight[2].map(s => s.symptom).join(', ')}`);
            }
            if (symptomsByWeight[1].length > 0) {
                parts.push(`<strong>Common symptoms (weight 1):</strong> ${symptomsByWeight[1].map(s => s.symptom).join(', ')}`);
            }
        }

        // Region explanations
        if (matchDetails.regions.length > 0) {
            const primaryRegions = matchDetails.regions.filter(r => r.type === 'primary');
            const secondaryRegions = matchDetails.regions.filter(r => r.type === 'secondary');

            if (primaryRegions.length > 0) {
                parts.push(`<strong>Primary affected area match:</strong> ${primaryRegions.map(r => r.region).join(', ')}`);
            }
            if (secondaryRegions.length > 0) {
                parts.push(`<strong>Secondary area match:</strong> ${secondaryRegions.map(r => r.region).join(', ')}`);
            }
        }

        // Time course explanation
        if (matchDetails.timeCourseMatch) {
            parts.push(`<strong>Time course match:</strong> Your symptoms suggest ${textAnalysis.timeCourse} onset, which matches this ${disease.timeCourse} condition (+15 points)`);
        } else if (matchDetails.timePenalty > 0) {
            parts.push(`<strong>Time course mismatch:</strong> Your symptoms suggest ${textAnalysis.timeCourse} onset, but this is typically a ${disease.timeCourse} condition (-20 points)`);
        }

        return parts.join('<br>');
    }

    /**
     * Display results with improved explainability
     */
    displayResults(results) {
        const container = document.getElementById('resultsContainer');
        const list = document.getElementById('resultsList');

        if (results.length === 0) {
            list.innerHTML = `
                <div class="placeholder-message">
                    <p>No matching conditions found based on your symptoms.
                    Try describing your symptoms in more detail or selecting additional affected areas.</p>
                </div>
            `;
        } else {
            list.innerHTML = results.map(result => {
                const confidenceClass = result.confidence === 'high' ? 'confidence-high' :
                                       result.confidence === 'moderate' ? 'confidence-moderate' : 'confidence-low';
                const confidenceLabel = result.confidence === 'high' ? 'High Relevance' :
                                       result.confidence === 'moderate' ? 'Moderate Relevance' : 'Low Relevance';

                // Calculate display percentage based on symptom matches
                const matchedSymptomScore = result.matchDetails.symptoms.reduce((sum, s) => sum + s.score, 0);
                const maxSymptomScore = result.matchDetails.symptoms.reduce((sum, s) => sum + (s.weight * 10), 0);

                return `
                <div class="result-card" data-disease="${result.id}">
                    <h4>
                        ${result.disease.name}
                        <span class="confidence-badge ${confidenceClass}">${confidenceLabel}</span>
                    </h4>

                    <div class="time-course-indicator">
                        <span class="time-course-badge ${result.disease.timeCourse}">${result.disease.timeCourse}</span>
                        <span class="severity ${result.disease.severity}">${result.disease.severity}</span>
                    </div>

                    <p class="description">${result.disease.description}</p>

                    <!-- EXPLAINABILITY PANEL -->
                    <div class="explainability-panel">
                        <h5>Why this matched:</h5>
                        <div class="explanation-content">
                            ${result.explanation}
                        </div>
                    </div>

                    <!-- Matched symptoms with weights -->
                    ${result.matchDetails.symptoms.length > 0 ? `
                        <div class="matched-symptoms-detailed">
                            <strong>Matched symptoms:</strong>
                            <div class="symptom-chips">
                                ${result.matchDetails.symptoms.map(s => `
                                    <span class="matched-symptom weight-${s.weight}">
                                        <span class="weight-indicator">${s.weight}</span>
                                        ${s.symptom}
                                    </span>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}

                    <div class="recommendation">
                        <strong>When to seek help:</strong> ${result.disease.seekHelp}<br>
                        ${result.disease.recommendation}
                    </div>
                </div>
            `}).join('');

            // Bind click events to result cards
            list.querySelectorAll('.result-card').forEach(card => {
                card.addEventListener('click', () => {
                    this.showDiseaseDetail(card.dataset.disease);
                });
            });
        }

        container.classList.add('visible');

        // Scroll to results
        container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new BodyDiagnosticApp();
});
