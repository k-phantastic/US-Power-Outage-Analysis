---
title: Home
layout: home
nav_order: 1
---

<div class="project-hero">
  <div class="project-kicker">Project Overview</div>
  <h1>Welcome to the US Power Outage Analysis Project</h1>
  <p class="fs-6 fw-300 hero-lead">
    This project analyzes a comprehensive dataset of power outages across the United States, using data sourced from Purdue University.
  </p>
  <div class="hero-actions">
    <a class="btn btn-primary mr-2 mb-2" href="{{ '/analysis/' | relative_url }}">View Analysis</a>
    <a class="btn btn-outline mb-2" href="#project-structure">Explore Sections</a>
  </div>
</div>

<div class="stats-grid mb-8">
  <div class="stat-card">
    <div class="stat-label">Focus</div>
    <div class="stat-value">EDA + Testing</div>
  </div>
  <div class="stat-card">
    <div class="stat-label">Theme</div>
    <div class="stat-value">Just the Docs</div>
  </div>
  <div class="stat-card">
    <div class="stat-label">Style</div>
    <div class="stat-value">Report / Docs</div>
  </div>
</div>

## About the Project
{: #project-structure }

<div class="card-grid">
  <div class="project-card">
    <h3>Dashboard and Analysis</h3>
    <p>
      Our dashboard and analysis aim to uncover underlying trends, seasonal patterns, and geographical distributions of power grid disturbances. We examine how different factors contribute to these outages and their overall impact.
    </p>
    <a class="btn btn-primary" href="{{ '/analysis/' | relative_url }}">Open Analysis</a>
  </div>
</div>

## Hypothesis Testing

<p>
  Our Exploratory Data Analysis (EDA) indicates that different causes may lead to varying outage durations. To determine if this difference is statistically significant, we designed the following test:
</p>

<div class="hypothesis-box">
  <p><strong>Null Hypothesis (H₀):</strong> The distribution of outage durations is the same for outages caused by <em>severe weather</em> and <em>equipment failure</em>. Any observed difference is simply due to random chance.</p>
  <p><strong>Alternative Hypothesis (H₁):</strong> Outages caused by <em>severe weather</em> have a longer average duration than those caused by <em>equipment failure</em>.</p>
  <p><strong>Test Statistic:</strong> Difference in group means (Mean Duration of Severe Weather − Mean Duration of Equipment Failure).</p>
</div>

## Site Map

- [Analysis]({{ '/analysis/' | relative_url }})
- [Modeling]({{ '/modeling/' | relative_url }})
- [Conclusion]({{ '/conclusion/' | relative_url }})
