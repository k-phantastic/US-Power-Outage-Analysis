# U.S. Power Outage Analysis

Can we predict how long a major power outage will last? Using 16 years of U.S. outage data, we tested what drives outage length and compared eight regression models to predict restoration time.

**[Read the full write-up and interactive charts](https://khanhphan.com/US-Power-Outage-Analysis/)**

## Key results
- Severe weather outages last about **34 hours longer** than those caused by equipment failures (permutation test, p < 0.001).
- A tuned **Random Forest Regressor** reached R² = 0.566 on log duration, **9.1% better** than the linear baseline.
- Model error showed no significant difference between urban and rural states (p = 0.51).
- Outages longer than 21 days (7 events, 0.5%) were excluded, so predictions apply to shorter outages.

**Team:** Khanh Phan, Layth Marabeh, Danny Xia<br>
**Course:** DSC 259R, Practice and Applications, UC San Diego<br>
**Data:** [Purdue University LASCI major outage dataset](https://engineering.purdue.edu/LASCI/research-data/outages/outage.xlsx), 2000 to 2016  
**Data Dictionary:** [ScienceDirect paper](https://www.sciencedirect.com/science/article/pii/S2352340918307182?via%3Dihub#t0005)


## Repository
| Path | Contents |
|:--|:--|
| `full_study.ipynb` | Full analysis: cleaning, EDA, hypothesis tests, models |
| `full_study.pdf` | PDF export of the notebook |
| `utils.py` | Helper functions |
| `data/` | Source data |
| `docs/` | Project website (Jekyll) |

`Python` `pandas` `scikit-learn` `XGBoost` `Optuna` `Plotly` `HTML` `CSS` `Javascript`

