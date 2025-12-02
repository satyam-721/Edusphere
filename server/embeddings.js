import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

/* ---------- math utils ---------- */
function dot(a, b) { let s = 0; for (let i = 0; i < a.length; i++) s += a[i] * b[i]; return s; }
function norm(v) { return Math.sqrt(dot(v, v)) || 1; }
function normalize(v) { const n = norm(v); return v.map(x => x / n); }
function cosine(a, b) { return dot(a, b) / (norm(a) * norm(b)); }

/* ---------- embed ALL texts (contents array) ---------- */
async function embedAll(texts, opts = {}) {
  const apiKey = process.env.GOOGLE_GENAI_KEY;
  if (!apiKey) throw new Error("Set GOOGLE_GENAI_KEY env var");

  const model = opts.model || "gemini-embedding-001";
  // preserved hard-coded key line per your request:
  const ai = new GoogleGenAI({ apiKey: "AIzaSyAPqAhdLt4_vrQ02qQFecHvmi0MJAUK34g" });    //CHECK THIS KEY

  const payload = { model, contents: texts, taskType: "SEMANTIC_SIMILARITY" };
  const res = await ai.models.embedContent(payload);

  const embeddings = [];
  if (Array.isArray(res?.embeddings)) {
    for (const e of res.embeddings) {
      const vals = e?.values ?? e?.embedding ?? null;
      if (!Array.isArray(vals)) throw new Error("Unexpected embedding entry shape");
      embeddings.push(normalize(vals));
    }
  } else if (Array.isArray(res?.responses)) {
    for (const r of res.responses) {
      const vals = r?.embedding?.values ?? r?.embedding ?? null;
      if (!Array.isArray(vals)) throw new Error("Unexpected response.embedding shape");
      embeddings.push(normalize(vals));
    }
  } else {
    throw new Error("Unexpected embedContent response shape: " + JSON.stringify(res));
  }

  if (embeddings.length !== texts.length) {
    throw new Error(`Got ${embeddings.length} embeddings for ${texts.length} texts`);
  }
  return embeddings;
}

/* ---------- similarity matrix ---------- */
function similarityMatrix(embeddings) {
  const n = embeddings.length;
  const mat = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    mat[i][i] = 1;
    for (let j = i + 1; j < n; j++) {
      const s = cosine(embeddings[i], embeddings[j]);
      mat[i][j] = mat[j][i] = s;
    }
  }
  return mat;
}

/* ---------- union-find ---------- */
function makeUnionFind(n) {
  const parent = new Array(n).fill(0).map((_, i) => i);
  function find(a) { return parent[a] === a ? a : (parent[a] = find(parent[a])); }
  function union(a, b) {
    const ra = find(a), rb = find(b);
    if (ra !== rb) parent[rb] = ra;
  }
  return { parent, find, union };
}

/* ---------- cluster by threshold transitive (unchanged) ---------- */
function clusterByThresholdTransitive(texts, simMat, threshold = 0.7) {
  const n = texts.length;
  const uf = makeUnionFind(n);

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (simMat[i][j] >= threshold) uf.union(i, j);
    }
  }

  const groupsMap = new Map();
  for (let i = 0; i < n; i++) {
    const root = uf.find(i);
    if (!groupsMap.has(root)) groupsMap.set(root, []);
    groupsMap.get(root).push(i);
  }

  const groups = [];
  for (const idxs of groupsMap.values()) {
    groups.push(idxs.map(i => texts[i])); // return just texts
  }
  groups.sort((a, b) => b.length - a.length);
  return groups;
}

/* ---------- exported function ---------- */
/**
 * clusterStrings(texts, { threshold })
 * returns: array of groups (each group is array of strings)
 */
export async function clusterStrings(texts, opts = {}) {
  if (!Array.isArray(texts)) throw new Error("texts must be an array");
  if (texts.length === 0) return [];
  const threshold = typeof opts.threshold === "number" ? opts.threshold : 0.65;

  const embeddings = await embedAll(texts, opts);
  const mat = similarityMatrix(embeddings);
  const groups = clusterByThresholdTransitive(texts, mat, threshold);
  return groups;
}
