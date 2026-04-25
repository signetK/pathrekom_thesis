# PathRekom Model

## Overview
PathRekom is a hybrid job recommendation model designed for BSCS students.  
It analyzes student grades and maps them to relevant career paths using alumni data, curriculum-based skills, and job descriptions.

The system combines similarity-based and semantic techniques to generate accurate and filtered recommendations.

---

## Model Components

- **K-Nearest Neighbors (KNN)**
  - Finds similar alumni profiles based on skill vectors

- **Sentence-BERT (SBERT)**
  - Measures semantic similarity between student profiles and job descriptions

- **Hybrid Scoring**
  - Combines both approaches into a single final score

---

## Scoring Formula

Final Score = (SBERT × 0.6) + (KNN × 0.4)

Scores are in the range:
0.0 – 1.0

---

## Threshold Filtering

The model computes a hybrid threshold using alumni data:

Threshold = mean(final_scores) − std(final_scores)

Only results that satisfy:

final_score ≥ threshold

are included in the final recommendations.

---

## Input

- Student grades (CMPSC subjects)

Grades are:
- Validated
- Converted to weights
- Mapped to skills

---

## Skill Processing

Each subject contributes to:
- Technical Skills
- Power Skills

Skills are:
- Aggregated into a profile
- Normalized using MinMaxScaler

---

## Workflow

1. Input student grades
2. Convert grades to skill weights
3. Build student skill profile
4. Apply KNN to find similar alumni
5. Apply SBERT for semantic similarity
6. Compute hybrid score
7. Apply threshold filtering
8. Rank results
9. Return Top 5 recommendations

---

## Output

### Top Categories
Ranked job categories with match scores (percentage format)

Example:
1. Software Development - 82.34%
2. IT / Systems / Support - 76.20%

### Top Jobs
Expanded job titles from selected categories

Example:
1. Software Engineer - 82.34%
2. Programmer - 80.12%

---

## Datasets Used

- Alumni data (career outcomes)
- Student academic records
- Curriculum (skills mapping)
- Job descriptions

---

## Technologies

- Python
- Pandas / NumPy
- Scikit-learn (KNN, MinMaxScaler)
- Sentence-Transformers (SBERT)

---

## Characteristics

- Skill-based recommendation
- Data-driven (alumni-guided)
- Hybrid similarity approach
- Threshold-filtered results
- Fast prediction performance

---

## Purpose

The model serves as a decision-support tool to help students:
- Identify suitable career paths
- Understand skill alignment
- Explore job opportunities

---

## Authors

- Gabriel C. Adriano Jr.
- Kirsten Jacob R. Galam
- Quian Vencel A. Galut
- Kurt Basti A. Juarez

---

## License

For academic and research purposes only.
