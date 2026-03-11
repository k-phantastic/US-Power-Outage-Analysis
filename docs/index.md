---
title: Home
layout: home
nav_order: 1
nav_enabled: false
has_toc: false
---

<nav class="section-nav" aria-label="Section navigation">
  <a href="#about">About</a>
  <a href="#analysis">Analysis</a>
  <a href="#datacleaning">Data Cleaning</a>
  <a href="#hypothesis">Hypothesis Testing</a>
  <a href="#featureengineering">Feature Engineering</a>
  <a href="#modeling">Modeling</a>
  <a href="#fairness">Fairness Analysis</a>
  <a href="#conclusion">Conclusion</a>
  <a href="#references">References</a>
</nav>

<div class="project-hero">
  <div class="project-kicker">Project Overview</div>
  <figure class="media-embed">
    <video 
      src="https://satlib.cira.colostate.edu/wp-content/uploads/sites/23/2024/09/202409280734-202408290722_snpp-n21_viirs_dnbncc_helenepower_labels.mp4"
      controls
      autoplay
      loop
      muted
      playsinline
      style="width: 100%; border-radius: 8px;"
    ></video>
    <figcaption style="font-size: 0.6rem; font-weight: 300; opacity: 0.6; text-align: right;">
      Video Source: CIRA Satellite Library / NOAA
    </figcaption>
  </figure>
  <h1>U.S. Power Outage Analysis</h1>
  <p class="fs-6 fw-300 hero-lead">
    This project analyzes a comprehensive dataset of power outages across the United States from 2000-2016, using data sourced from Purdue University. Factors driving outage duration are analyzed with the creation of a predictive regression model. 
  </p>
  <div class="hero-actions">
    <a class="btn btn-primary mr-2 mb-2" href="#analysis">View Analysis</a>
    <a class="btn btn-outline mb-2" href="#modeling">View Modeling</a>
  </div>
</div>

---

## About the Project...
{: #about }

<div class="card-grid">
  <div class="project-card">
    <h3>Problem Identification</h3>
    <p>
      <i>Can we predict the duration of a power outage?</i>
    </p>
    <p>Prediction of power restoration can significantly help those in utility companies and public infrastructure allocate the proper amount of resources. Residents can plan accordingly for any safety measures. 
    </p>
  </div>
  <div class="project-card">
    <h3><a href="https://engineering.purdue.edu/LASCI/research-data/outages">Outage Dataset</a></h3>
    <p>
      The dataset contains <strong>1,534 rows</strong> for each major outage event and <a href="https://www.sciencedirect.com/science/article/pii/S2352340918307182?via%3Dihub&__cf_chl_tk=MdnOVI97kP2duINlE8U9fYA6BeU0TnrbD6G2yftSNjQ-1773170159-1.0.1.1-mvbTaxvkSMWWLNdmU_9YLsDMDAqRbcfpG7UZwZrk.1o#t0005">55 columns</a>
      spanning outage event details, regional statistics, climate information, electrical consumption information, and economic indicators for the affected U.S. state.
      Full data covers from January 2000 through July 2016.
    </p>
  </div>
</div>

## ..and the authors
<div class="author-grid">
  <div class="project-card">
    <h3>Layth Marabeh</h3>
    <p>GitHub: <a href="https://github.com/lmarabeh">@lmarabeh</a></p>
  </div>
  <div class="project-card">
    <h3>Khanh Phan</h3>
    <p>GitHub: <a href="https://github.com/k-phantastic">@k-phantastic</a></p>
  </div>
  <div class="project-card">
    <h3>Danny Xia</h3>
    <p>GitHub: <a href="https://github.com/dannyxia7">@dannyxia7</a></p>
  </div>
</div>


---

## Analysis
{: #analysis }

Early exploratory data analysis is shown below through visualizations of the dataset.   



### Temporal Analysis: Number of Outages Per Year
====================PLACEHOLDER FOR PLOTLY HTML====================

We find a net increase from the beginning to the end (2000-2016) in power outages, with a significant spike around 2010-2012. 

### Temporal Analysis: Number of Outages by Month (all years combined)
====================PLACEHOLDER FOR PLOTLY HTML====================

The number of power outages seem to be heightened around the summer months with an additional, smaller peak around winter months; perhaps correlating with hurricane season in the summer and heavy snowstorms in the winter. 

### Geographic Analysis: Number of Outages by Climate Region
====================PLACEHOLDER FOR PLOTLY HTML====================



### Geographic Analysis: Top 15 States by Number of Outages
====================PLACEHOLDER FOR PLOTLY HTML====================


### Geographic Patterns
{: #geographic }

Regional trends.

### Seasonal and Cause-Based Trends
{: #seasonal }

Temporal trends.

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