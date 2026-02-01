/**
 * Body Diagnostic Tool - Main Application
 * Handles body map interaction, symptom analysis, and condition matching
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
            </div>
            <div class="disease-items"></div>
        `;

        const diseaseItems = diseaseList.querySelector('.disease-items');

        Object.entries(DISEASES).forEach(([id, disease]) => {
            const card = document.createElement('div');
            card.className = 'disease-card';
            card.dataset.diseaseId = id;
            card.dataset.category = disease.category;
            card.innerHTML = `
                <h4>${disease.name}</h4>
                <p>${disease.description.substring(0, 80)}...</p>
                <span class="severity ${disease.severity}">${disease.severity}</span>
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
            const matchesSearch = disease.name.toLowerCase().includes(searchQuery) ||
                                 disease.description.toLowerCase().includes(searchQuery) ||
                                 disease.symptoms.some(s => s.includes(searchQuery));
            const matchesCategory = categoryFilter === 'all' || disease.category === categoryFilter;

            card.style.display = (matchesSearch && matchesCategory) ? 'block' : 'none';
        });
    }

    showDiseaseDetail(diseaseId) {
        const disease = DISEASES[diseaseId];
        if (!disease) return;

        const symptoms = disease.symptoms.join('</li><li>');
        const riskFactors = disease.riskFactors.join('</li><li>');
        const affectedAreas = disease.affectedAreas.join(', ');

        this.showModal(`
            <div class="modal-header">
                <h2>${disease.name}</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-content">
                <section>
                    <h3>Category</h3>
                    <p>${disease.category} - <span class="severity ${disease.severity}">${disease.severity}</span></p>
                </section>
                <section>
                    <h3>Description</h3>
                    <p>${disease.description}</p>
                </section>
                <section>
                    <h3>Common Symptoms</h3>
                    <ul><li>${symptoms}</li></ul>
                </section>
                <section>
                    <h3>Affected Body Areas</h3>
                    <p>${affectedAreas}</p>
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

    // ==================== Symptom Analysis ====================

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

    matchConditions(symptomText, locations) {
        const results = [];

        Object.entries(DISEASES).forEach(([id, disease]) => {
            let score = 0;
            const matchedSymptoms = [];
            const matchedLocations = [];

            // Check symptom matches
            disease.symptoms.forEach(symptom => {
                // Direct match
                if (symptomText.includes(symptom.toLowerCase())) {
                    score += 10;
                    matchedSymptoms.push(symptom);
                } else {
                    // Check keyword variations
                    for (const [key, variations] of Object.entries(SYMPTOM_KEYWORDS)) {
                        if (symptom.toLowerCase().includes(key)) {
                            for (const variation of variations) {
                                if (symptomText.includes(variation)) {
                                    score += 7;
                                    if (!matchedSymptoms.includes(symptom)) {
                                        matchedSymptoms.push(symptom);
                                    }
                                    break;
                                }
                            }
                        }
                    }
                }
            });

            // Check location matches
            if (locations.length > 0) {
                disease.affectedAreas.forEach(area => {
                    const areaLower = area.toLowerCase();

                    locations.forEach(location => {
                        const aliases = LOCATION_ALIASES[location] || [location];
                        if (aliases.some(alias => areaLower.includes(alias) || alias.includes(areaLower))) {
                            score += 15;
                            if (!matchedLocations.includes(area)) {
                                matchedLocations.push(area);
                            }
                        }
                    });
                });
            }

            // Additional text analysis for specific keywords
            const textAnalysis = this.analyzeText(symptomText);

            // Check for severity indicators
            if (textAnalysis.severity === 'severe' && disease.severity === 'severe') {
                score += 5;
            }

            // Check for duration indicators
            if (textAnalysis.duration === 'chronic' &&
                (disease.name.includes('Chronic') || disease.category === 'Musculoskeletal')) {
                score += 5;
            }

            if (score > 0) {
                results.push({
                    id,
                    disease,
                    score,
                    matchedSymptoms,
                    matchedLocations,
                    matchPercentage: Math.min(100, Math.round((score / (disease.symptoms.length * 10)) * 100))
                });
            }
        });

        // Sort by score descending
        results.sort((a, b) => b.score - a.score);

        // Return top 5 results
        return results.slice(0, 5);
    }

    analyzeText(text) {
        const analysis = {
            severity: 'unknown',
            duration: 'unknown'
        };

        // Severity indicators
        const severeWords = ['severe', 'intense', 'extreme', 'unbearable', 'worst', 'excruciating', 'sharp', 'stabbing'];
        const mildWords = ['mild', 'slight', 'minor', 'little', 'occasional'];

        if (severeWords.some(word => text.includes(word))) {
            analysis.severity = 'severe';
        } else if (mildWords.some(word => text.includes(word))) {
            analysis.severity = 'mild';
        }

        // Duration indicators
        const chronicWords = ['chronic', 'long-term', 'months', 'years', 'ongoing', 'persistent', 'always'];
        const acuteWords = ['sudden', 'just started', 'new', 'recent', 'today', 'yesterday'];

        if (chronicWords.some(word => text.includes(word))) {
            analysis.duration = 'chronic';
        } else if (acuteWords.some(word => text.includes(word))) {
            analysis.duration = 'acute';
        }

        return analysis;
    }

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
            list.innerHTML = results.map(result => `
                <div class="result-card" data-disease="${result.id}">
                    <h4>
                        ${result.disease.name}
                        <span class="match-score">${result.matchPercentage}% match</span>
                    </h4>
                    <p class="description">${result.disease.description}</p>

                    ${result.matchedSymptoms.length > 0 ? `
                        <div class="matched-symptoms">
                            <strong>Matched symptoms:</strong>
                            ${result.matchedSymptoms.map(s => `<span class="matched-symptom">${s}</span>`).join('')}
                        </div>
                    ` : ''}

                    <div class="recommendation">
                        <strong>When to seek help:</strong> ${result.disease.seekHelp}<br>
                        ${result.disease.recommendation}
                    </div>
                </div>
            `).join('');

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
