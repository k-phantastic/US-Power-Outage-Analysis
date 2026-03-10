---
title: Home
layout: home
nav_order: 1
nav_enabled: false
has_toc: false
---

<nav class="section-nav" aria-label="Section navigation">
  <a href="#about">About</a>
  <a href="#hypothesis">Hypothesis Testing</a>
  <a href="#analysis">Analysis</a>
  <a href="#modeling">Modeling</a>
  <a href="#conclusion">Conclusion</a>
</nav>

<div class="project-hero">
  <div class="project-kicker">Project Overview</div>
  <h1>US Power Outage Analysis</h1>
  <p class="fs-6 fw-300 hero-lead">
    This project analyzes a comprehensive dataset of power outages across the United States from 2000-2016, using data sourced from Purdue University.
  </p>
  <div class="hero-actions">
    <a class="btn btn-primary mr-2 mb-2" href="#analysis">View Analysis</a>
    <a class="btn btn-outline mb-2" href="#about">Explore Sections</a>
  </div>
</div>

---

## About the Project
{: #about }

<div class="card-grid">
  <div class="project-card">
    <h3>Dashboard and Analysis</h3>
    <p>
      Our dashboard and analysis aim to uncover underlying trends, seasonal patterns, and geographical distributions of power grid disturbances. We examine how different factors contribute to these outages and their overall impact.
    </p>
  </div>
</div>

---

## Hypothesis Testing
{: #hypothesis }

Our Exploratory Data Analysis (EDA) indicates that different causes may lead to varying outage durations. To determine if this difference is statistically significant, we designed the following test:

<div class="hypothesis-box">
  <p><strong>Null Hypothesis (H₀):</strong> The distribution of outage durations is the same for outages caused by <em>severe weather</em> and <em>equipment failure</em>. Any observed difference is simply due to random chance.</p>
  <p><strong>Alternative Hypothesis (H₁):</strong> Outages caused by <em>severe weather</em> have a longer average duration than those caused by <em>equipment failure</em>.</p>
  <p><strong>Test Statistic:</strong> Difference in group means (Mean Duration of Severe Weather − Mean Duration of Equipment Failure).</p>
</div>

---

## Analysis
{: #analysis }

This page features the detailed findings, data visualizations, and project insights based on the Purdue dataset.

*[Visualizations, maps, and interactive charts covering the Power Outage dataset trends will be displayed here.]*

### Data Source and Scope
{: #data-source }

Describe the Purdue outage dataset, time coverage, and any key limitations.

### Cleaning and Preprocessing
{: #cleaning }

Missing values, imputations, etc.

### Exploratory Findings
{: #eda }

Early EDA findings.

### Geographic Patterns
{: #geographic }

Regional trends.

### Seasonal and Cause-Based Trends
{: #seasonal }

Temporal trends.

---

## Modeling
{: #modeling }

Comparison of model performance, feature engineering, etc.

### Problem Framing
{: #problem-framing }

Regression for outage duration.

### Baseline
{: #baseline }

Basic linear regression.

### Feature Engineering
{: #feature-engineering }

Transformed columns, encoded categories, and any external features.

### Evaluation
{: #evaluation }

results_df

---

## Conclusion
{: #conclusion }

Major insights from the project, key limitations, and the next steps you would take. Fairness analysis.

### Next Steps
{: #next-steps }

- Improve forecasting features
- Compare modeling strategies for skewed duration targets
- Expand the site with embedded charts and interactive maps


{% include scroll.html %}