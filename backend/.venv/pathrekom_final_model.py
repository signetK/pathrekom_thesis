from pathlib import Path
from collections import defaultdict
import re

import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import MinMaxScaler
from sentence_transformers import SentenceTransformer


VALID_GRADES = {1.0, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5, 2.75, 3.0}


def read_csv_with_fallback(path: Path) -> pd.DataFrame:
    for enc in [None, "utf-8", "cp1252", "latin1"]:
        try:
            if enc is None:
                return pd.read_csv(path)
            return pd.read_csv(path, encoding=enc)
        except Exception:
            continue
    raise ValueError(f"Could not read file: {path}")


def normalize_job_title(text: str) -> str:
    text = str(text).strip().lower()
    text = text.replace("–", "-").replace("—", "-")
    text = re.sub(r"\s+", " ", text)
    return text


JOB_NORMALIZATION_MAP = {
    "software developer / lead": "Software Development",
    "junior integration developer": "Software Development",
    "automation engineer iii": "Software Development",
    "sap bw associate / data engineer": "Software Development",
    "sap business warehouse (sap bw) associate / data engineer": "Software Development",
    "programmer": "Software Development",
    "software developer": "Software Development",
    "software engineer": "Software Development",
    "software engineer i": "Software Development",
    "software engineer ii": "Software Development",
    "computer programmer": "Software Development",
    "blockchain developer / blockchain mentor": "Software Development",
    "assistant software engineer - application developer": "Software Development",
    "assistant software engineer – application developer": "Software Development",

    "graphic designer": "Web / UI/UX / Design",
    "designer": "Web / UI/UX / Design",
    "website developer and designer": "Web / UI/UX / Design",
    "graphic artist": "Web / UI/UX / Design",
    "graphics artist": "Web / UI/UX / Design",
    "user experience designer": "Web / UI/UX / Design",
    "multimedia designer": "Web / UI/UX / Design",

    "data analyst": "Data / Analytics",
    "statistic encoder / data analyst": "Data / Analytics",
    "map data processor": "Data / Analytics",
    "real time analyst": "Data / Analytics",

    "faculty": "Education / Academe",
    "instructor": "Education / Academe",
    "instructor i": "Education / Academe",
    "instructor 1": "Education / Academe",

    "it personnel": "IT / Systems / Support",
    "information technology (it) personnel": "IT / Systems / Support",
    "it specialist": "IT / Systems / Support",
    "information technology (it) specialist": "IT / Systems / Support",
    "technical support staff": "IT / Systems / Support",
    "senior ict assistant": "IT / Systems / Support",
    "senior information and communications technology (ict) assistant": "IT / Systems / Support",
    "it support": "IT / Systems / Support",
    "information technology (it) support": "IT / Systems / Support",
    "jr. it systems analyst": "IT / Systems / Support",
    "junior information technology (it) systems analyst": "IT / Systems / Support",
    "junior information technology systems analyst": "IT / Systems / Support",
    "l1 support": "IT / Systems / Support",
    "level 1 support (l1 support)": "IT / Systems / Support",
    "information systems analyst i": "IT / Systems / Support",
    "informations systems analyst i": "IT / Systems / Support",
    "information technology services": "IT / Systems / Support",
    "technician": "IT / Systems / Support",
    "senior electronic security specialist": "IT / Systems / Support",
    "it police non-commissioned officer (itpnco)": "IT / Systems / Support",

    "medical sales assistant": "Business / Sales / Marketing",
    "machine operator / sales": "Business / Sales / Marketing",
    "sales representative": "Business / Sales / Marketing",
    "e-commerce associate": "Business / Sales / Marketing",
    "financial advisor": "Business / Sales / Marketing",
    "tiktok affiliate marketer": "Business / Sales / Marketing",
    "chief marketing officer": "Business / Sales / Marketing",
    "chief marketing officer (cmo)": "Business / Sales / Marketing",
    "online marketing communications specialist": "Business / Sales / Marketing",
    "management trainee - sales and marketing": "Business / Sales / Marketing",

    "csr": "Customer Service / BPO",
    "customer service representative (csr)": "Customer Service / BPO",
    "customer service associate": "Customer Service / BPO",
    "customer service associate (csa)": "Customer Service / BPO",
    "csa": "Customer Service / BPO",
    "customer experience agent": "Customer Service / BPO",
    "medical billing and denial associate": "Customer Service / BPO",

    "administrative aide iii (clerk 1)": "Administrative / Office",
    "administrative aide iii (clerk i)": "Administrative / Office",
    "administrative aide iii": "Administrative / Office",
    "administrative aide": "Administrative / Office",
    "admin aide": "Administrative / Office",
    "admin aide (clerk)": "Administrative / Office",
    "administrative aide (clerk)": "Administrative / Office",
    "admin asst i (computer operator i)": "Administrative / Office",
    "administrative assistant i (computer operator i)": "Administrative / Office",
    "admin assistant": "Administrative / Office",
    "administrative assistant": "Administrative / Office",
    "admin staff / auditing": "Administrative / Office",
    "administrative staff / auditing": "Administrative / Office",
    "registrar / admin staff": "Administrative / Office",
    "registrar / administrative staff": "Administrative / Office",
    "executive assistant": "Administrative / Office",
    "secretary to the hospital director": "Administrative / Office",
    "administrative officer ii": "Administrative / Office",
    "administrative aide vi (data entry machine operator i)": "Administrative / Office",
    "job order": "Administrative / Office",
    "inventory staff": "Administrative / Office",
    "allocation staff": "Administrative / Office",
    "admin trainee": "Administrative / Office",
    "administrative trainee": "Administrative / Office",
    "back office staff": "Administrative / Office",

    "field auditor": "Finance / Audit",
    "finance associate": "Finance / Audit",
    "quality assurance internal auditor": "Finance / Audit",
    "collector": "Finance / Audit",

    "manager": "Management / Leadership / Program Roles",
    "associate consultant": "Management / Leadership / Program Roles",
    "associate, transformation and innovation": "Management / Leadership / Program Roles",
    "assistant, erc": "Management / Leadership / Program Roles",
    "oic - program associate": "Management / Leadership / Program Roles",
    "officer-in-charge (oic) - program associate": "Management / Leadership / Program Roles",
    "oic chief for digital": "Management / Leadership / Program Roles",
    "consultant": "Management / Leadership / Program Roles",

    "engineering assistant": "Technical / Engineering / Operations",
    "project technical specialist i": "Technical / Engineering / Operations",
    "machine operator": "Technical / Engineering / Operations",

    "sk federated president": "Government / Community",
    "enumerator": "Government / Community",
    "gip": "Government / Community",
    "government internship program (gip) participant": "Government / Community",
    "bhw": "Government / Community",
    "action pnco": "Government / Community",
    "health operation associate": "Government / Community",
}


def normalize_job_group(text: str) -> str:
    return JOB_NORMALIZATION_MAP.get(normalize_job_title(text), "Other / Unmapped")


def clean_skills(text):
    if pd.isna(text):
        return []
    cleaned = [s.strip().lower() for s in str(text).split(",") if s and s.strip()]
    return list(dict.fromkeys(cleaned))


def normalize_grade_table(df, id_cols=("student_id", "alumni_id", "sex", "job_title", "job_group")):
    df = df.copy()

    if "sex" in df.columns:
        df["sex"] = (
            df["sex"]
            .astype(str)
            .str.strip()
            .str.lower()
            .replace({"m": "male", "f": "female"})
        )

    grade_cols = [c for c in df.columns if c not in id_cols]

    for col in grade_cols:
        df[col] = df[col].replace(
            ["-", "", " ", "NA", "N/A", "na", "n/a", "None", "none", "null", None],
            np.nan,
        )
        df[col] = pd.to_numeric(df[col], errors="coerce")

    return df


def grade_to_weight(g):
    g = pd.to_numeric(pd.Series([g]), errors="coerce").iloc[0]

    if pd.isna(g):
        return np.nan

    g = float(g)

    if g not in VALID_GRADES:
        return np.nan

    return 1 - ((g - 1) / 2) * 0.8


def profile_to_text(profile):
    tokens = []
    for skill, weight in profile.items():
        repeat_count = max(1, int(round(weight * 4)))
        tokens.extend([skill] * repeat_count)
    return " ".join(tokens)


class PathRekomModel:
    def __init__(self, csv_folder="csv"):
        self.base_dir = Path(__file__).resolve().parent
        self.csv_dir = self.base_dir / csv_folder

        self.alumni = None
        self.students = None
        self.curriculum = None
        self.jobs_df = None
        self.subject_skill_map = None
        self.all_skills = None
        self.alumni_skill_df = None
        self.student_skill_df = None
        self.alumni_sex = None
        self.student_sex = None
        self.scaler = None
        self.knn = None
        self.model = None
        self.job_emb = None
        self.student_emb = None

        self._load_and_prepare()

    def _normalize_course_code(self, subject: str) -> str:
        code_map = {
            "CMPSC 112_N": "CMPSC 112",
            "CMPSC 117_K12": "CMPSC 117",
            "CMPSC 122_K12": "CMPSC 122",
            "CMPSC 135_K12": "CMPSC 135",
            "CMPSC 148_K12": "CMPSC 148",
            "CMPSC 151_K12": "CMPSC 151",
        }
        return code_map.get(str(subject).strip(), str(subject).strip())

    def _build_profile(self, row):
        profile = defaultdict(list)

        for subj in self.subject_skill_map:
            lookup_subj = self._normalize_course_code(subj)

            if lookup_subj not in row:
                continue

            grade = pd.to_numeric(pd.Series([row[lookup_subj]]), errors="coerce").iloc[0]
            if pd.isna(grade):
                continue

            w = grade_to_weight(grade)
            if pd.isna(w):
                continue

            for skill in self.subject_skill_map[subj]:
                profile[skill].append(w)

        return {k: float(np.mean(v)) for k, v in profile.items()}

    def _encode_sex_df(self, df):
        return pd.get_dummies(df["sex"]).reindex(columns=["female", "male"], fill_value=0)

    def _normalize_frontend_grades(self, sex: str, grades: dict):
        row = {"student_id": "frontend_user", "sex": str(sex).strip().lower()}

        normalized_input = {}
        for key, value in grades.items():
            normalized_key = self._normalize_course_code(key)
            normalized_input[normalized_key] = value

        for subject in self.subject_skill_map:
            csv_subject = self._normalize_course_code(subject)
            raw = normalized_input.get(csv_subject, np.nan)

            if isinstance(raw, str):
                raw = raw.strip()

            if raw in ["", "-", " ", "NA", "N/A", "na", "n/a", "None", "none", "null", None]:
                row[csv_subject] = np.nan
            else:
                value = pd.to_numeric(pd.Series([raw]), errors="coerce").iloc[0]
                if pd.isna(value) or float(value) not in VALID_GRADES:
                    row[csv_subject] = np.nan
                else:
                    row[csv_subject] = float(value)

        user_df = pd.DataFrame([row])
        user_df = normalize_grade_table(user_df, id_cols=("student_id", "sex"))
        return user_df.iloc[0].to_dict()

    def _load_and_prepare(self):
        alumni_path = self.csv_dir / "alumni_data.csv"
        students_path = self.csv_dir / "students_data.csv"
        curriculum_path = self.csv_dir / "university_data_bscs.csv"
        jobs_path = self.csv_dir / "job_descriptions.csv"

        alumni = pd.read_csv(alumni_path)
        students = pd.read_csv(students_path)
        curriculum = pd.read_csv(curriculum_path)
        jobs_raw = read_csv_with_fallback(jobs_path)

        alumni = alumni.rename(columns={
            "Alumni ID": "alumni_id",
            "Unnamed: 0": "alumni_id",
            "Sex at Birth": "sex",
            "Job Title": "job_title"
        }).copy()

        students = students.rename(columns={"Sex at Birth": "sex"}).copy()

        students = normalize_grade_table(students.rename(columns={"sex": "sex"}))
        alumni = normalize_grade_table(alumni)

        alumni["job_title"] = alumni["job_title"].astype(str).str.strip()
        alumni["job_title_norm"] = alumni["job_title"].apply(normalize_job_title)
        alumni["job_group"] = alumni["job_title"].apply(normalize_job_group)

        subject_skill_map = {}
        for _, row in curriculum.iterrows():
            subject = str(row["Course Code"]).strip()
            skills = clean_skills(row["Technical Skills"])
            if subject and skills:
                subject_skill_map[subject] = skills

        self.subject_skill_map = subject_skill_map

        alumni_profiles = [self._build_profile(r) for _, r in alumni.iterrows()]
        student_profiles = [self._build_profile(r) for _, r in students.iterrows()]

        all_skills = sorted(set().union(*[p.keys() for p in alumni_profiles + student_profiles]))

        def dicts_to_df(dicts):
            return pd.DataFrame(
                [[d.get(skill, 0.0) for skill in all_skills] for d in dicts],
                columns=all_skills
            )

        alumni_skill_df = dicts_to_df(alumni_profiles)
        student_skill_df = dicts_to_df(student_profiles)

        alumni_sex = self._encode_sex_df(alumni)
        student_sex = self._encode_sex_df(students)

        scaler = MinMaxScaler()
        X_alumni = scaler.fit_transform(alumni_skill_df)
        X_students = scaler.transform(student_skill_df)

        X_alumni = np.hstack([X_alumni, alumni_sex.values])
        X_students = np.hstack([X_students, student_sex.values])

        knn = NearestNeighbors(n_neighbors=20, metric="cosine")
        knn.fit(X_alumni)

        jobs_raw = jobs_raw.rename(columns={
            "Jobs": "Job Title",
            "Job Titles": "Job Title"
        }).copy()

        if "Job Descriptions" not in jobs_raw.columns:
            desc_cols = [c for c in jobs_raw.columns if c != "Job Title"]
            jobs_raw["Job Descriptions"] = jobs_raw[desc_cols].fillna("").astype(str).agg(" ".join, axis=1)

        jobs_raw["Job Title"] = jobs_raw["Job Title"].astype(str).str.strip()
        jobs_raw["job_title_norm"] = jobs_raw["Job Title"].apply(normalize_job_title)
        jobs_raw["job_group"] = jobs_raw["Job Title"].apply(normalize_job_group)
        jobs_raw["Job Descriptions"] = (
            jobs_raw["Job Descriptions"]
            .fillna("")
            .astype(str)
            .str.lower()
            .str.replace(r"\s+", " ", regex=True)
            .str.strip()
        )

        jobs_df = (
            jobs_raw.groupby("job_group", as_index=False)
            .agg({
                "Job Descriptions": lambda x: " ".join([t for t in x if str(t).strip()]),
                "Job Title": lambda x: ", ".join(sorted(pd.unique(x)))
            })
            .rename(columns={"job_group": "Job Group", "Job Title": "Specific Job Titles"})
        )

        model = SentenceTransformer("all-MiniLM-L6-v2")

        student_texts = [profile_to_text(p) for p in student_profiles]
        job_texts = jobs_df["Job Descriptions"].tolist()

        student_emb = model.encode(student_texts, convert_to_numpy=True)
        job_emb = model.encode(job_texts, convert_to_numpy=True)

        self.alumni = alumni
        self.students = students
        self.curriculum = curriculum
        self.jobs_df = jobs_df
        self.all_skills = all_skills
        self.alumni_skill_df = alumni_skill_df
        self.student_skill_df = student_skill_df
        self.alumni_sex = alumni_sex
        self.student_sex = student_sex
        self.scaler = scaler
        self.knn = knn
        self.model = model
        self.job_emb = job_emb
        self.student_emb = student_emb

    def _predict_from_features(self, student_features, student_emb, top_n=5, w_knn=0.4, w_sbert=0.6):
        distances, indices = self.knn.kneighbors(student_features.reshape(1, -1))
        neighbor_rows = self.alumni.iloc[indices[0]].copy()
        neighbor_rows["similarity"] = 1 - distances[0]

        knn_df = (
            neighbor_rows["job_group"].value_counts(normalize=True)
            .rename_axis("job_group")
            .reset_index(name="knn_score")
        )
        knn_df["neighbor_share_pct"] = knn_df["knn_score"] * 100

        sim = cosine_similarity(student_emb.reshape(1, -1), self.job_emb)[0]

        sbert_df = pd.DataFrame({
            "job_group": self.jobs_df["Job Group"],
            "specific_job_titles": self.jobs_df["Specific Job Titles"],
            "sbert_score": sim
        })

        knn_score_map = dict(zip(knn_df["job_group"], knn_df["knn_score"]))
        knn_share_map = dict(zip(knn_df["job_group"], knn_df["neighbor_share_pct"]))

        sbert_df["knn_score"] = sbert_df["job_group"].map(knn_score_map).fillna(0.0)
        sbert_df["neighbor_share_pct"] = sbert_df["job_group"].map(knn_share_map).fillna(0.0)
        sbert_df["final_score"] = (
            sbert_df["sbert_score"] * w_sbert +
            sbert_df["knn_score"] * w_knn
        )

        result = (
            sbert_df.sort_values("final_score", ascending=False)
            .head(top_n)
            .reset_index(drop=True)
        )

        max_final = result["final_score"].max()
        result["match_pct"] = np.where(
            max_final > 0,
            (result["final_score"] / max_final) * 100,
            0.0
        ).round(2)

        categories = []
        jobs = []

        for idx, row in result.iterrows():
            categories.append({
                "rank": idx + 1,
                "category": row["job_group"],
                "match": f"{row['match_pct']:.2f}%"
            })

        expanded_jobs = []
        for _, row in result.iterrows():
            titles = [t.strip() for t in str(row["specific_job_titles"]).split(",") if t.strip()]
            for title in titles:
                expanded_jobs.append({
                    "job": f"{row['job_group']} - {title}",
                    "score": row["match_pct"]
                })

        expanded_jobs = sorted(expanded_jobs, key=lambda x: (-x["score"], x["job"]))[:top_n]

        for idx, row in enumerate(expanded_jobs):
            jobs.append({
                "rank": idx + 1,
                "job": row["job"],
                "match": f"{row['score']:.2f}%"
            })

        return {
            "categories": categories,
            "jobs": jobs
        }

    def predict_from_student_id(self, student_id: str, top_n: int = 5):
        if "student_id" not in self.students.columns:
            raise ValueError("students_data.csv does not contain a student_id column.")

        matched = self.students[self.students["student_id"].astype(str).str.strip() == str(student_id).strip()]
        if matched.empty:
            raise ValueError(f"Student ID '{student_id}' not found.")

        idx = matched.index[0]

        student_features = np.hstack([
            self.scaler.transform(self.student_skill_df.iloc[[idx]]),
            self.student_sex.iloc[[idx]].values
        ])[0]

        student_emb = self.student_emb[idx]

        return self._predict_from_features(student_features, student_emb, top_n=top_n)

    def predict(self, sex: str, grades: dict, top_n: int = 5):
        user_row = self._normalize_frontend_grades(sex=sex, grades=grades)

        profile = self._build_profile(user_row)

        user_skill_df = pd.DataFrame(
            [[profile.get(skill, 0.0) for skill in self.all_skills]],
            columns=self.all_skills
        )
        user_skill_scaled = self.scaler.transform(user_skill_df)

        user_df = pd.DataFrame([user_row])
        user_df = normalize_grade_table(user_df, id_cols=("student_id", "sex"))
        user_sex_df = self._encode_sex_df(user_df)

        student_features = np.hstack([user_skill_scaled, user_sex_df.values])[0]

        user_text = profile_to_text(profile)
        user_emb = self.model.encode([user_text], convert_to_numpy=True)[0]

        return self._predict_from_features(student_features, user_emb, top_n=top_n)