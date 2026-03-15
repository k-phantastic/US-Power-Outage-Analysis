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
      The dataset contains <strong>1,534 rows</strong> for each major outage event and <a href="https://www.sciencedirect.com/science/article/pii/S2352340918307182?via%3Dihub#s0015" target="_blank">55 columns</a>
      spanning outage event details, regional statistics, climate information, consumption information, and economic indicators.
      Full data covers from January 2000 through July 2016. Selected column features seen <a href="#features">here</a>. 
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

The raw outage data required substantial cleaning before analysis. As the raw Excel file had various metadata and cosmetic rows, we loaded only the table to start our processing in pandas. We then utilized pandas `.pipe()` in the first round of data cleaning:

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

<div style="transform: scale(0.75); transform-origin: top left; width: 133%; margin-bottom: -10%;">
  {% include_relative assets/plots/pivot_table.html %}
</div>

The table gives us a multi-layer understanding on how climate region and outage cause can be key indicators for outages. It does help us understand the potential for outliers and the presence of a skewed wide range of values. We explore the distribution of outage durations in the chart [here](#prediction).

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

---

#### **Column that missingness of `OUTAGE.DURATION` depends on: `ANOMALY.LEVEL`**

<div class="plot-figure">
  <iframe
    src="assets/plots/anomaly_level_by_duration_missingness.html"
    width="600"
    height="400"
    frameborder="0"
  ></iframe>
</div>

At a glance, we find that anomaly levels are heightened when outage durations are omitted in the dataset.

<div class="plot-figure">
  <iframe
    src="assets/plots/duration_missingness_vs_anomaly_level.html"
    width="800"
    height="400"
    frameborder="0"
  ></iframe>
</div>

We perform a permutation as follows in evaluating missingness dependency: 
>**Null Hypothesis (H<sub>0</sub>):** The missingness of `OUTAGE.DURATION` is independent of `ANOMALY.LEVEL`.   
>**Alternative Hypothesis (H<sub>A</sub>):** The distribution of `ANOMALY.LEVEL` differs in mean in rows where `OUTAGE.DURATION` is missing      
>**Test Statistic:** Absolute difference in group means of `ANOMALY.LEVEL`    

**Result:** Observed Difference = **0.7100**, p-value < **0.001**

At a significance value of 0.05, we reject the null hypothesis; the missingness of `OUTAGE.DURATION` is associated with `ANOMALY.LEVEL`, potentially suggesting more extreme climate conditions resulting in fewer reported durations.


---

#### **Column that missingness of `OUTAGE.DURATION` does not depend on: `MONTH`**

<div class="plot-figure">
  <iframe
    src="assets/plots/month_by_duration_missingness.html"
    width="600"
    height="400"
    frameborder="0"
  ></iframe>
</div>
With similar setup as previous, we find that distributions are much more similar to each other.

<div class="plot-figure">
  <iframe
    src="assets/plots/month_missingness_permutation_test.html"
    width="800"
    height="400"
    frameborder="0"
  ></iframe>
</div>

We perform a permutation as follows in evaluating missingness dependency: 
>**Null Hypothesis (H<sub>0</sub>):** The missingness of `OUTAGE.DURATION` is independent of `MONTH`.    
>**Alternative Hypothesis (H<sub>A</sub>):** The distribution of `MONTH` differs between rows where `OUTAGE.DURATION` is missing and rows where it is not.    
>**Test Statistic:** Total Variation Distance (TVD) between the two `MONTH` distributions.   

**Result:** Observed TVD = **0.2219**, p-value = **0.2470**

At a significance value of 0.05, we fail to reject the null hypothesis; There is no significant evidence of relationship between `MONTH` and missing `OUTAGE.DURATION`. 

---

## Hypothesis Testing
{: #hypothesis }

### Comparing Outage Durations by Cause (Permutation Test, Difference in group means)
Our EDA indicates that different causes may lead to varying outage durations. To determine if this difference is statistically significant, we look to have our test statistic as difference in group means (as we are comparing tendencies), with a one-sided test as we are looking to compare if one is longer rather than different. 

>**Null Hypothesis (H<sub>0</sub>):** The distribution of outage durations is the same for outages caused by *"severe weather"* and *"equipment failure"*. Any observed difference is simply due to random chance.    
>**Alternative Hypothesis (H<sub>A</sub>):** Outages caused by *"severe weather"* have a longer average duration than those caused by *"equipment failure"*.    
>**Test Statistic:** Difference in group means (Mean Duration of Severe Weather - Mean Duration of Equipment Failure).

Upon a completed permutation test (n = 1000) and significance value of 0.05, our results are as follows:     
**Result:** Observed Difference = **2015.98** minutes, P-value < **0.001**  

We consider the conditions of *"severe weather"* and *"equipment failure"* contributing to be statistically significant in the former causing longer average durations than the latter. 

---

### Climate Categories and Outage Causes (Permutation Test, TVD)
We have a CLIMATE.CATEGORY column (warm, cold, normal) and a `CAUSE.CATEGORY` column. We can investigate if the types of outages that occur depend on the climate conditions. TVD is appropriate here as `CAUSE.CATEGORY` is a categorical distribution. 

>**Null Hypothesis (H<sub>0</sub>):** The distribution of outage causes is independent of the climate category (warm vs. cold).
>**Alternative Hypothesis (H<sub>A</sub>):** The distribution of outage causes depends on the climate category (e.g., certain causes are more likely in cold climates vs. warm climates).   
>**Test Statistic:** Total Variation Distance (TVD) comparing distribution of `CAUSE.CATEGORY` between warm and cold climate outages

Upon a completed permutation test (n = 1000) and significance value of 0.05, our results are as follows:     
**Result:** Observed TVD = **0.0646**, P-value = **0.3260**

While our permutation test suggested that outage causes are independent of climate categories, this may be due to the broad nature of the ``CLIMATE.CATEGORY`` variable. Real-world events, like the Texas Power Crisis, suggest that localized extreme weather has a profound impact that might be masked when aggregating data at a national, multi-year level.

---

## Framing a Prediction Problem
{: #prediction }

Our study so far has lead us in framing our prediction problem as a **regression** task to predict the duration of a a power outage (`OUTAGE.DURATION`), given its early statistics and information when the incident occurs (discussed further detail [below](#features)). The duration of an outage provides an actionable metric for utility companies, emergency responders, and especially resident customers. 

At the time of prediction, we will ensure to only use features that would be known when the outage is reported, such as location, date/time, climate conditions, and economic context (aggregated and known prior, specific to region). A key column to avoid is `DEMAND.LOSS.MW`, as it is calculated after restoration and would contribute to data leakage.


> **Note from Khanh**: I experienced a significant power outage in San Francisco in December 2025, we had early restoration estimates from PG&E of 6-8 hours, but it ended up being closer to 3 days. In hindsight, had I had better intuition and/or if I had a better estimate, I would've been able to prepare accordingly to have been able to save my refrigerator groceries. 

<div class="plot-figure">
  <iframe
    src="assets/plots/outage_duration_distribution.html"
    width="800"
    height="400"
    frameborder="0"
  ></iframe>
</div>
Given the heavy right skew of power outage durations- with most lasting far less than 48 hours, we apply a `np.log1p` transformation to the target before training. 

**Evaluation Metrics:** We will look to train various regression models and look at key statistics in RMSE (Root Mean Squared Error), MAE (Mean Absolute Error), and R^2 with consideration of both log scale and regular minutes scale for actionable insight.
- **RMSE** penalizes large prediction errors more heavily, which matters here since dramatically underestimating a long outage is much worse than a small error on a short one.
- **MAE** provides a more interpretable average prediction error: "on average, how far off are my predictions from the truth". 
- **R^2** captures how much variance the model explains overall.

---

## Baseline Model
{: #baseline }
{: #features }

### Model Features
Following our data cleaning and feature engineering, our modeling approach uses 17 features as follows, with description referencing the [original article](https://www.sciencedirect.com/science/article/pii/S2352340918307182?via%3Dihub#s0015): 

| Feature | Type | Description | Intuition |
|---|---|---|---|
| `SEASON` | Nominal | Season at time of outage start | Seasonal weather patterns can affect both outage causes and repair response time |
| `U.S._STATE` | Nominal | State where outage occurred | Regional differences in infrastructure, regulation, etc. |
| `NERC.REGION` | Nominal | North American Electric Reliability Corporation (NERC) regions | Grid topology and regional reliability standards can affect response |
| `CLIMATE.REGION` | Nominal | NCEI climate region (nine climatically consistent regions in continental U.S.A.) | Regions prone to extreme weather face can face longer restoration times |
| `CLIMATE.CATEGORY` | Nominal | Climate episodes corresponding to the years (warm/cold/normal) | El Niño/La Niña years shift weather severity |
| `CAUSE.CATEGORY` | Nominal | Broad cause of outage | Root cause contributor |
| `CAUSE.CATEGORY.DETAIL` | Nominal | Granular cause detail | Finer cause detail e.g. a "Thunderstorm" within "severe weather" |
| `MONTH_SIN`, `MONTH_COS` | Quantitative | Cyclical encoding of month | Preserves the continuity between December and January |
| `START_ON_WEEKEND` | Quantitative | Binary flag for if outage starts on weekend | Reduced utility staffing on weekends may slow initial response and restoration |
| `ANOMALY.LEVEL` | Quantitative | Ocean El Niño/La Niña anomaly index (ONI) | Quantifies climate anomaly severity |
| `CUSTOMERS.AFFECTED` | Quantitative | Number of customers impacted | Larger affected areas typically indicate scale of outage |
| `RES.PRICE` / `COM.PRICE` / `IND.PRICE` | Quantitative | Residential, commercial, industrial monthly electricity prices | Energy market stress and grid demand pressure at time of outage |
| `UTIL.CONTRI` | Quantitative | Utility industry contribution to state GDP | States where utilities are a larger economic factor may invest more in rapid restoration |
| `PI.UTIL.OFUSA` | Quantitative | State utility sector's income of U.S. utility sector's income | Additional reflection of utility scale and resource capacity |

* **7 nominal/categorical** features were encoded in the preprocessing pipeline with `OneHotEncoder(handle_unknown='ignore')`   
* **10 quantitative** features were standardized with `StandardScaler()`    
* **Train and Test split** of 80:20 (1159 training rows, 290 test rows)   

### Baseline Model: Linear Regression

Upon training and testing a simple `LinearRegression()` model, with results as follows: 

| Model                              |   MAE (log) |   RMSE (log) |   MAE (minutes) |   RMSE (minutes) |      R^2 |
|:-----------------------------------|------------:|-------------:|----------------:|-----------------:|---------:|
| Linear Regression (Baseline)       |     1.46448 |      1.92543 |         1812.06 |          4378    | 0.518461 |

<div class="plot-model">
  <iframe 
    src="assets/plots/linear_regression_residuals.html" 
    scrolling="no">
  </iframe>
</div>

With an R^2 of 0.52, our baseline captures roughly half of the variance in outage duration. High RMSE reflects difficulties in the prediction of longer duration events. An average difference of 1,812 minutes translates to over a 1.25 days! The residual plots show clear outliers strongly affecting the data  and distinct patterns suggesting poorer performance. While the performance is not great, we see upon trying more robust models that it's an ultimately difficult prediction task with the scarce amount of data available. 

---


## Final Model
{: #finalmodel }

Our further testing in selecting a final model included testing Ridge Regression, Random Forest Regression, XGBoost, and HistGradientBoostingRegressor from `sklearn`. With each of these, we used `RandomSearchCV` (n=1000, 3-fold CV) for hyperparameter tuning. 

We found that tree models were better in that they were able to capture non-linear patterns, to which we engineered an additional model upon that intuition: a two-stage hurdle model (Referenced as `Advanced Hurdle` in below discussion) that uses Random Forest Classifier to predict the probability of an outage being significant enough to have a duration, then feeds that probability as a new feature into an XGBoost Regressor.

In determining the hyperparameter space for the initial XGBoost portion of the Advanced Hurdle model as well as the final operating hyperparameters, we used Optuna to fit 1000 trials. Further information in regarding the hyperparameters can be referenced in the jupyter notebook. 

---

### Final Results

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

The raw table of results can be seen above, with the visualization for it below: 

<div class="plot-figure">
  <iframe
    src="assets/plots/model_performance_comparison.html"
    width="850"
    height="550"
    frameborder="0"
  ></iframe>
</div>

Additional exploration of residuals for each model can be selected as follows: 
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


---

### Recommendation and Comparison to baseline
Our final recommended model is the tuned **Random Forest Regressor**, in which it was the top performer in log MAE, log RMSE, and R^2; however, we hypothesis that further engineering and tuning of the Advance Hurdle model has potential to overtake it in performance. As seen below, we were able to improve upon each of our metrics with the final model

| Metric         |   Linear Regression (Baseline) |   Random Forest Regressor (tuned) |   Absolute Improvement | % Improvement   |
|:---------------|-------------------------------:|----------------------------------:|-----------------------:|:----------------|
| MAE (log)      |                       1.46448  |                          1.33684  |              0.127637  | +8.7%           |
| RMSE (log)     |                       1.92543  |                          1.82861  |              0.0968146 | +5.0%           |
| MAE (minutes)  |                    1812.06     |                       1739.02     |             73.0343    | +4.0%           |
| RMSE (minutes) |                    4378        |                       3719.7      |            658.295     | +15.0%          |
| R^2            |                       0.518461 |                          0.565669 |              0.0472081 | +9.1%           |


---

## Fairness Analysis
{: #fairness }

Our approach for the model's fairness analysis will be comparing its performance in urban vs. rural states. These regional classifications can be an indirect indicator of access to resources. We will quantify "urban states" as those where the `POPPCT_URBAN` (Percentage of the total population of the U.S. state represented by the urban population (in %)) is above the test set median, with "rural states" being below the median. 

> **Group X (Urban):** States where `POPPCT_URBAN` > 84.05%: 162 test observations  
> **Group Y (Rural):** States where `POPPCT_URBAN` < 84.05%: 128 test observations  
>**Null Hypothesis (H<sub>0</sub>):** Our model is fair with respect to urban states and rural states, and any observed difference (in RMSE) is due to random chance.   
>**Alternative Hypothesis (H<sub>A</sub>):**  Our model is unfair with respect to urban states and rural states. The RMSE differs significantly between urban and rural states.     
>**Test Statistic:** Absolute difference in the group means of `RMSE`, with significance value of 0.05   

We will be using the Advanced Hurdle as our model of analysis as it is our most archetecturally novel, but the fairness analysis code is scalable for each model used. 

**Observed Differences:**   
(MAE is included for interpretability's sake)

| Group | RMSE | MAE | Num. Observations |
|---|---|---|---|
| Urban | 4024 min | 1811 min | 162 |
| Rural  | 3481 min | 1774 min | 128 |
| Observed Difference | **543 min** | 37 min |  |

Upon a completed permutation test (n = 1000) and significance value of 0.05, our results are as follows:     
**Result:** P-value = **0.5080**

<div class="plot-figure">
  <iframe
    src="assets/plots/fairness_permutation_test.html"
    width="800"
    height="400"
    frameborder="0"
  ></iframe>
</div>

The above visualization shows the results of our permutation test and where the observed differences. Given our significance level of 0.05 and the p-value of 0.5080, we do not have sufficient evidence to conclude that the model is less fair for rural states.

Because the model was trained on log-transformed outage duration but evaluated here on the original minutes scale, this fairness result reflects real-world prediction error in outage duration.

---

## Conclusion
{: #conclusion }

With the completion of the study, we were able to find ways to substantially outperform the baseline (albeit a very naive one) with each further tested model. The Random Forest model was our recommended final model in achieving overall best results across each metric. The advanced hurdle model, while key in intuition at approaching the problem, did not outperform in it's current iteration- we will need to do more analysis on the gating of lower duration outages. 

Power outages are inherently difficult to predict; they are rare, high-variance events shaped by factors that precede, coincide with, and follow the incident itself. We were able to indeed predict the duration of a power outage, but with clear limitations affecting performance at hand: 
- **Dataset Size:** Started with only 1534 rows (1449 after cleaning and engineering) 
- **Limited Feature Metrics:** We do not have access to details such as how many of the workforce are available for repairs, specific equipment damage (perhaps certain equipment being damaged takes longer for repair than others)
- **Temporal Drift:** Dataset is limited to a 16 year span in the past, and we do not have the context for quantifying improvements in infrastructure or funding over time. (e.g. the exact same outage in 2000 might last longer/shorter than one of the same details occuring in 2016)

In brainstorming additional steps in the future could be different sampling methods or usage of synthetic data (although this might be harder to capture change over time in both climate and infrastructure). Different data mining techniques could be employed in gathering more datapoints or more details per observation. Quicker wins otherwise would be to continue to iteratively improve upon the models we have at hand: whether it is changing the archetecture of the advanced hurdle model or a more comprehensive hyperparameter search. 

---

## References
{: #references }
**Source:** [https://engineering.purdue.edu/LASCI/research-data/outages/](https://engineering.purdue.edu/LASCI/research-data/outages/)          
**Data Dictionary:** [https://www.sciencedirect.com/science/article/pii/S2352340918307182?via%3Dihub#t0005](https://www.sciencedirect.com/science/article/pii/S2352340918307182?via%3Dihub#t0005)
**Software:** scikit-learn, XGBoost, Optuna, Plotly, matplotlib, pandas, NumPy

{% include scroll.html %}