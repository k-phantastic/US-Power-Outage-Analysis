---
title: Home
layout: home
nav_order: 1
nav_enabled: false
has_toc: false
---

<nav class="section-nav" aria-label="Section navigation">
  <a href="#introduction">Introduction</a>
  <a href="#cleaneda">Data Cleaning and Exploratory Data Analysis</a>
  <a href="#missingness">Assessment of Missingness</a>
  <a href="#hypothesis">Hypothesis Testing</a>
  <a href="#prediction">Framing a Prediction Problem</a>
  <a href="#baseline">Baseline Model</a>
  <a href="#finalmodel">Final Model</a>
  <a href="#fairness">Fairness Analysis</a>
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
    <a class="btn btn-primary mr-2 mb-2" href="https://github.com/k-phantastic/US-Power-Outage-Analysis" target="_blank">GitHub Repository</a>
  </div>
</div>

---

## Introduction to the Project...
{: #introduction }

<div class="card-grid">
  <div class="project-card">
    <h3><a href="#prediction">Problem Identification</a></h3>
    <p>
      <i>Can we predict the duration of a power outage?</i>
    </p>
    <p>Prediction of power restoration can significantly help those in utility companies and public infrastructure allocate the proper amount of resources. Residents can plan accordingly for any safety measures. 
    </p>
  </div>
  <div class="project-card">
    <h3><a href="https://engineering.purdue.edu/LASCI/research-data/outages" target="_blank">Outage Dataset</a></h3>
    <p>
      The dataset contains <strong>1,534 rows</strong> for each major outage event and <a href="https://www.sciencedirect.com/science/article/pii/S2352340918307182?via%3Dihub&__cf_chl_tk=MdnOVI97kP2duINlE8U9fYA6BeU0TnrbD6G2yftSNjQ-1773170159-1.0.1.1-mvbTaxvkSMWWLNdmU_9YLsDMDAqRbcfpG7UZwZrk.1o#t0005" target="_blank">55 columns</a>
      spanning outage event details, regional statistics, climate information, consumption information, and economic indicators.
      Full data covers from January 2000 through July 2016. Selected column features seen <a href="#featureengineering">here</a>. 
    </p>
  </div>
</div>

## ..and the authors
<div class="author-grid">
  <div class="project-card">
    <h3>Layth Marabeh</h3>
    <p>GitHub: <a href="https://github.com/lmarabeh" target="_blank">@lmarabeh</a></p>
  </div>
  <div class="project-card">
    <h3>Khanh Phan</h3>
    <p>GitHub: <a href="https://github.com/k-phantastic" target="_blank">@k-phantastic</a></p>
  </div>
  <div class="project-card">
    <h3>Danny Xia</h3>
    <p>GitHub: <a href="https://github.com/dannyxia7" target="_blank">@dannyxia7</a></p>
  </div>
</div>

---

## Data Cleaning and Exploratory Data Analysis
{: #cleaneda }

### <center>Data Cleaning</center>
{: #datacleaning }

The raw outage data required substantial cleaning before analysis. As the raw Excel file had various metadata and cosmetic rows, we loaded only the table to start our processing in pandas. We then utilized pandas `.pipe` in the first round of data cleaning:

**Round 1: Initial Cleaning**

1. **Removing Duplicate Rows** 8 fully duplicate rows removed
2. **Fixing Data Types** Reestablished datetime columns, integers, and floats from default object typing
3. **Date and Time Combination** Combined `OUTAGE.START.DATE` + `OUTAGE.START.TIME` into `OUTAGE.START`, and `OUTAGE.RESTORATION.DATE` + `OUTAGE.RESTORATION.TIME` into `OUTAGE.RESTORATION`
4. **Adding Month Names** Converted numerical 1–12 encoding into month abbreviations for EDA readability
As preparation for the model required further imputation and feature engineering, a subsequent round of cleaning was applied:

**Round 2: Model Preparation (Performed after <a href="#missingness">Assessment of Missingness</a>)**

5. **Imputation**
  - Missing `CLIMATE.REGION` was due to Hawaii and Alaska, imputed as the state name
  - Missing `CAUSE.CATEGORY.DETAIL` was filled based on `CAUSE.CATEGORY` (e.g. `"Other Weather"` for `"severe weather"`)
  - Missing `CUSTOMERS.AFFECTED` was filled with the group median by `CAUSE.CATEGORY`

6. **Row Removal** Dropped rows with missing values in:
  - `MONTH` (affected rows contained nonsense/unimputable data)
  - `OUTAGE.DURATION` (our prediction target - never imputed)
  - `RES.PRICE` (few rows, minimal impact)
7. **Weekend Flag** Created binary `START_ON_WEEKEND` to capture whether service recovery may be affected by reduced weekend staffing
8. **Season Encoding** Mapped each month to its season (`Winter`, `Spring`, `Summer`, `Fall`)
9. **Cyclical Month Encoding** Applied `np.sin()` and `np.cos()` transforms to `MONTH` to preserve the cyclical nature of weather patterns across year boundaries
10. **Remove Outliers** Removed rows with `OUTAGE.DURATION` over 30,000 minutes (roughly 21 days)


Remainder rows found with missing data deemed irrelevant to further analysis or modeling. 

---

### <center>Exploratory Data Analysis</center>
{: #eda }
Early exploratory data analysis is shown below through visualizations of the dataset.   

### Temporal Analysis: Number of Outages Per Year
<div class="plot-figure">
  <iframe
    src="assets/plots/outages_per_year_all.html"
    width="600"
    height="400"
    frameborder="0"
  ></iframe>
</div>

We find a net increase from the beginning to the end (2000-2016) in power outages, with a significant spike around 2010-2012. Further analysis with regional breakdown can be seen below: 

<div class="plot-figure">
  <iframe
    src="assets/plots/outages_per_year_by_region.html"
    width="600"
    height="400"
    frameborder="0"
  ></iframe>
</div>

Click on region to filter analysis. Through this, we see that the Northeast region has the most volatile number of outages, with West North Central being significantly more flat through the years.

---

### Temporal Analysis: Number of Outages by Month (all years combined)

<div class="plot-figure">
  <iframe
    src="assets/plots/outages_by_month.html"
    width="600"
    height="400"
    frameborder="0"
  ></iframe>
</div>
The number of power outages seem to be heightened around the summer months with an additional, smaller peak around winter months; perhaps correlating with hurricane season in the summer and heavy snowstorms in the winter. We take this in consideration for building our model by incorporating month as a feature (with consideration for cyclical patterns).

---

### Geographic Analysis: Number of Outages by Climate Region
<div class="plot-figure">
  <iframe
    src="assets/plots/outages_by_climate_region.html"
    width="600"
    height="400"
    frameborder="0"
  ></iframe>
</div>
Aligning with previous theory on snowstorms having a significant effect on major outage count, we find the Northeast region of the U.S. the most impacted compared to the other specified regions.

---

### Geographic Analysis: Top 15 States by Number of Outages
<div class="plot-figure">
  <iframe
    src="assets/plots/top_15_states_by_outages.html"
    width="600"
    height="400"
    frameborder="0"
  ></iframe>
</div>
Aggregating the top 15 states by count of outages, California is in the lead by far at 209 recorded major outages in this dataset, nearly double the next state. 

---

### Bivariate Analysis: Average Outage Duration vs Cause Category
<div class="plot-figure">
  <iframe
    src="assets/plots/outages_by_cause_category.html"
    width="800"
    height="400"
    frameborder="0"
  ></iframe>
</div>
Power outages in the dataset are dominated in count by severe weather, but when we look at the longest average power outages, we find that the main contributing cause category is fuel supply emergencies, at almost 5 times more than that of severe weather outages. 

---

### Pivot Table: Average Outage Duration by Cause Category and Climate Region     

<div style="transform: scale(0.75); transform-origin: top left; width: 133%;">
  {% include_relative assets/plots/pivot_table.html %}
</div>

The table gives us a multi-layer understanding on how climate region and outage cause can be key indicators for outages. It does help us understand the potential for outliers and the presence of a skewed wide range of values. We explore the distribution of outage durations in the chart [here](#framing-a-prediction-problem).

---

## Assessment of Missingness
{: #missingness }

### NMAR Analysis   

We believe `CAUSE.CATEGORY.DETAIL` is a plausible **NMAR** (Not Missing At Random) column. This variable provides a more specific description of the outage cause -for example, `"Thunderstorm"` or `"Tornado"` within the broader `"severe weather"` category (`CAUSE.CATEGORY`). 

Given its many missing values, it's possible that a detail is omitted depending on the detail itself. For instance, utilities companies may be less likely to report a specific cause when it is operationally embarrassing (suggestive of internal negligence), legally sensitive, or potentially that there are far too many causes for one specific key-detail to be identified. In that case, the missingness would depend on the unobserved value that should have appeared in the column. 

A more educated evaluation would require more domain knowledge regarding the nature of power outages and infrastructure reporting. 

---

### Missingness Dependency

We selected `OUTAGE.DURATION` as the column of focus for further missingness analysis, as it is our target for modeling. We created a binary indicator `duration_missing` and ran permutation tests against two candidate columns: 

####  **Column that missingness of `OUTAGE.DURATION` depends on: `ANOMALY.LEVEL`**

<div class="plot-figure">
  <iframe
    src="assets/plots/anomaly_level_by_duration_missingness.html"
    width="600"
    height="400"
    frameborder="0"
  ></iframe>
</div>

<div class="plot-figure">
  <iframe
    src="assets/plots/duration_missingness_vs_anomaly_level.html"
    width="800"
    height="400"
    frameborder="0"
  ></iframe>
</div>

####  **Column that missingness of `OUTAGE.DURATION` does not depend on: `MONTH`**

<div class="plot-figure">
  <iframe
    src="assets/plots/month_by_duration_missingness.html"
    width="600"
    height="400"
    frameborder="0"
  ></iframe>
</div>

<div class="plot-figure">
  <iframe
    src="assets/plots/month_missingness_permutation_test.html"
    width="800"
    height="400"
    frameborder="0"
  ></iframe>
</div>

---

## Hypothesis Testing
{: #hypothesis }

Our EDA indicates that different causes may lead to varying outage durations. To determine if this difference is statistically significant, we designed the following test:

>**Null Hypothesis (H<sub>0</sub>):** The distribution of outage durations is the same for outages caused by *severe weather* and *equipment failure*. Any observed difference is simply due to random chance.    
>**Alternative Hypothesis (H<sub>A</sub>):** Outages caused by *severe weather* have a longer average duration than those caused by *equipment failure*.    
>**Test Statistic:** Difference in group means (Mean Duration of Severe Weather - Mean Duration of Equipment Failure).

====================PLACEHOLDER FOR HYPOTHESIS TEST RESULTS====================

---

## Framing a Prediction Problem
{: #prediction }
> "Clearly state your prediction problem and type (classification or regression). If you are building a classifier, make sure to state whether you are performing binary classification or multiclass classification. Report the response variable (i.e. the variable you are predicting) and why you chose it, the metric you are using to evaluate your model and why you chose it over other suitable metrics (e.g. accuracy vs. F1-score). Note: Make sure to justify what information you would know at the “time of prediction” and to only train your model using those features. For instance, if we wanted to predict your final exam grade, we couldn’t use your Final Project grade, because the project is only due after the final exam! Feel free to ask questions if you’re not sure."
<div class="plot-figure">
  <iframe
    src="assets/plots/outage_duration_distribution.html"
    width="800"
    height="400"
    frameborder="0"
  ></iframe>
</div>
Commentary on skew

---

## Baseline Model
{: #baseline }

====================PLACEHOLDER====================     
"state the features in your model, including how many are quantitative, ordinal, and nominal, and how you performed any necessary encodings"
Create table for features used, commentary on leakage columns we excluded. 
Maybe code snippets on the preprocessing pipelines? OHE etc


<div class="plot-model">
  <iframe 
    src="assets/plots/linear_regression_residuals.html" 
    scrolling="no">
  </iframe>
</div>

Discussion section for baseline model
Comparison of model performance, feature engineering, etc.

---


## Final Model
{: #finalmodel }

<!-- Band-aid fix for plot selector -->
<div class="plot-selector" style="text-align: center;">
  <div style="margin-bottom: 0.5rem;">
    <button onclick="setPlot(this, 'linear_regression_residuals')">Linear Regression</button>
    <button onclick="setPlot(this, 'ridge_regression_residuals')">Ridge</button>
    <button onclick="setPlot(this, 'random_forest_residuals')">Random Forest</button>
    <button onclick="setPlot(this, 'xgboost_optuna_residuals')">XGBoost</button>
    <button onclick="setPlot(this, 'hist_gradient_boosting_residuals')">HGB</button>
    <button class="active" onclick="setPlot(this, 'advanced_hurdle_model_residuals_tuned')">Advanced Hurdle</button>
  </div>
  <div class="plot-model">
    <iframe
      id="residuals-frame"
      src="assets/plots/advanced_hurdle_model_residuals_tuned.html"
      scrolling="no"
      frameborder="0"
    ></iframe>
  </div>
</div>
<script>
  function setPlot(btn, name) {
    document.getElementById('residuals-frame').src = 'assets/plots/' + name + '.html';
    document.querySelectorAll('.plot-selector button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
</script>

Compare models

### Results DF

| Model                              |   MAE (log) |   RMSE (log) |   MAE (minutes) |   RMSE (minutes) |      R^2 |
|:-----------------------------------|------------:|-------------:|----------------:|-----------------:|---------:|
| Linear Regression (Baseline)       |     1.46448 |      1.92543 |         1812.06 |          4378    | 0.518461 |
| Ridge Regression (tuned)           |     1.47886 |      1.91423 |         1802.69 |          3925.18 | 0.524049 |
| Random Forest Regressor (tuned)    |     1.33684 |      1.82861 |         1739.02 |          3719.7  | 0.565669 |
| XGBoost Regressor (tuned)          |     1.37451 |      1.89939 |         1755.67 |          3729.29 | 0.531397 |
| HGB Regressor (tuned)              |     1.34207 |      1.86236 |         1691.86 |          3557.68 | 0.549491 |
| XGBoost (Optuna tuned)             |     1.36692 |      1.90019 |         1731.78 |          3663.05 | 0.531003 |
| Advanced Hurdle (RF + XGB Stacked) |     1.38978 |      1.87048 |         1786.11 |          3850    | 0.545554 |
| Advanced Hurdle (Optuna tuned)     |     1.37911 |      1.88275 |         1794.94 |          3793.87 | 0.539571 |

<div class="plot-figure">
  <iframe
    src="assets/plots/model_performance_comparison.html"
    width="850"
    height="550"
    frameborder="0"
  ></iframe>
</div>

results_df, show what was used, etc. 

---

## Fairness Analysis
{: #fairness }

<div class="plot-figure">
  <iframe
    src="assets/plots/fairness_permutation_test.html"
    width="800"
    height="400"
    frameborder="0"
  ></iframe>
</div>
Urban vs Rural

### Conclusion
{: #conclusion }
====================PLACEHOLDER====================   

Major insights from the project, key limitations, and the next steps you would take

---

## References
{: #references }
====================PLACEHOLDER====================   
Add in the links used for data source, properly cite etc

{% include scroll.html %}