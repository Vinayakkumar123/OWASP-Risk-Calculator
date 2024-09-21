let chart;

function calculateRisk() {
    // Threat Agent Factors
    let skillLevel = parseInt(document.getElementById('skill_level').value);
    let motive = parseInt(document.getElementById('motive').value);
    let opportunity = parseInt(document.getElementById('opportunity').value);
    let size = parseInt(document.getElementById('size').value);

    // Vulnerability Factors
    let easeOfDiscovery = parseInt(document.getElementById('ease_of_discovery').value);
    let easeOfExploit = parseInt(document.getElementById('ease_of_exploit').value);
    let awareness = parseInt(document.getElementById('awareness').value);
    let intrusionDetection = parseInt(document.getElementById('intrusion_detection').value);

    // Technical Impact Factors
    let lossOfConfidentiality = parseInt(document.getElementById('loss_of_confidentiality').value);
    let lossOfIntegrity = parseInt(document.getElementById('loss_of_integrity').value);
    let lossOfAvailability = parseInt(document.getElementById('loss_of_availability').value);
    let lossOfAccountability = parseInt(document.getElementById('loss_of_accountability').value);

    // Business Impact Factors
    let financialDamage = parseInt(document.getElementById('financial_damage').value);
    let reputationDamage = parseInt(document.getElementById('reputation_damage').value);
    let nonCompliance = parseInt(document.getElementById('non_compliance').value);
    let privacyViolation = parseInt(document.getElementById('privacy_violation').value);

    // Likelihood Score Calculation
    let likelihoodScore = (skillLevel + motive + opportunity + size + easeOfDiscovery + easeOfExploit + awareness + intrusionDetection) / 8;
    
    // Impact Score Calculation
    let impactScore = (lossOfConfidentiality + lossOfIntegrity + lossOfAvailability + lossOfAccountability + financialDamage + reputationDamage + nonCompliance + privacyViolation) / 8;

    // Update the scores on the page
    document.getElementById('likelihood_score').innerText = likelihoodScore.toFixed(1);
    document.getElementById('impact_score').innerText = impactScore.toFixed(1);

    // Calculate the total risk score
    let riskScore = (likelihoodScore + impactScore) / 2;
    let riskButton = document.getElementById('risk_score');
    riskButton.innerText = riskScore.toFixed(1);

    // Change button color based on risk score
    if (riskScore < 2) {
        riskButton.style.backgroundColor = 'lightgreen';
    } else if (riskScore < 4) {
        riskButton.style.backgroundColor = 'yellow';
    } else if (riskScore < 6) {
        riskButton.style.backgroundColor = 'orange';
    } else {
        riskButton.style.backgroundColor = 'red';
    }

    // Update the graph
    updateGraph(likelihoodScore, impactScore, riskScore);
}

function updateGraph(likelihood, impact, risk) {
    // If the chart already exists, destroy it before creating a new one
    if (chart) {
        chart.destroy();
    }

    // Get the context of the canvas element we want to select
    let ctx = document.getElementById('riskChart').getContext('2d');

    // Create a new chart
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Likelihood', 'Impact', 'Risk'], // Labels for the data points
            datasets: [{
                label: 'Risk Scores',
                data: [likelihood.toFixed(1), impact.toFixed(1), risk.toFixed(1)], // Data points
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5 // Set the max value to 5 (highest risk score)
                }
            }
        }
    });
}