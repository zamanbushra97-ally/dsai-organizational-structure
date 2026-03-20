import { LINEAGE_COLORS, SECTION_TO_BRANCH, SUB_LINEAGE } from '../constants/colors';

function normalizeLabel(s) {
  if (typeof s !== 'string') return '';
  // Normalize dash variants and whitespace; lower-case for resilient matching.
  return s
    .replace(/[–—-]/g, '-') // en/em dash -> hyphen
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function containsLabel(label, needle) {
  if (typeof label !== 'string' || typeof needle !== 'string') return false;
  const nLabel = normalizeLabel(label);
  const nNeedle = normalizeLabel(needle);
  return nNeedle.length > 0 && nLabel.includes(nNeedle);
}

const CEO_LABEL_PREFIX = 'CEO – Chief Executive Officer';
const CTO_LABEL_PREFIX = 'CTO – Chief Technology Officer';
const CPO_LABEL_PREFIX = 'CPO – Chief Product Officer';
const CRO_LABEL_PREFIX = 'CBO/CRO – Chief Business Officer/Chief Revenue Officer';
const CMO_LABEL_PREFIX = 'CMO – Chief Marketing Officer';
const CFO_LABEL_PREFIX = 'CFO – Chief Financial Officer';
const CAIO_LABEL_PREFIX = 'Chief AI & Innovation Officer (CAIO)';

export function getNextId(orgChartData) {
  let max = 0;
  function walk(node) {
    const n = parseInt(node.id, 10);
    if (!isNaN(n) && n > max) max = n;
    (node.children || []).forEach(walk);
  }
  walk(orgChartData);
  return String(max + 1);
}

export function findNodeById(node, id) {
  if (!node) return null;
  if (node.id === id) return node;
  for (const child of node.children || []) {
    const found = findNodeById(child, id);
    if (found) return found;
  }
  return null;
}

export function getPathToNode(node, targetId, path = []) {
  if (!node) return null;
  const next = path.concat([node]);
  if (node.id === targetId) return next;
  for (const child of node.children || []) {
    const result = getPathToNode(child, targetId, next);
    if (result) return result;
  }
  return null;
}

export function pathFromRoot(orgChartData, targetId) {
  return getPathToNode(orgChartData, targetId, []) || [];
}

export function findNodeByLabel(node, label) {
  if (!node) return null;
  if (node.label === label) return node;
  for (const child of node.children || []) {
    const found = findNodeByLabel(child, label);
    if (found) return found;
  }
  return null;
}

export function getCEONode(orgChartData) {
  // Allow edits like: "CEO – Chief Executive Officer - John"
  if (!orgChartData) return null;
  let result = null;
  (function walk(node) {
    if (!node || result) return;
    if (containsLabel(node.label, CEO_LABEL_PREFIX)) {
      result = node;
      return;
    }
    for (const child of node.children || []) walk(child);
  })(orgChartData);
  return result;
}

export function cloneForCSuiteOnly(node, parentLabel) {
  if (!node) return null;
  // Deprecated in favor of id-based pruning in getSectionRoots; keep for compatibility.
  const isChildOfCEO = containsLabel(parentLabel, CEO_LABEL_PREFIX);
  const children = isChildOfCEO ? [] : (node.children || []).map(c => cloneForCSuiteOnly(c, node.label));
  return { id: node.id, label: node.label, children };
}

export function findChildByLabel(node, label) {
  if (!node?.children) return null;
  return node.children.find(c => c.label === label) || null;
}

function findChildByLabelPrefix(node, labelPrefix) {
  if (!node?.children) return null;
  return node.children.find(c => containsLabel(c.label, labelPrefix)) || null;
}

export function getBranchIndexForNode(orgChartData, nodeId) {
  const path = pathFromRoot(orgChartData, nodeId);
  const ceo = getCEONode(orgChartData);
  if (!ceo?.children) return 0;
  for (let i = 0; i < path.length; i++) {
    if (path[i].id === ceo.id && i + 1 < path.length) {
      const next = path[i + 1];
      const j = ceo.children.findIndex(c => c.id === next.id);
      if (j >= 0) return j;
      return 0;
    }
  }
  return 0;
}

export function getSectionRoots(orgChartData) {
  const ceo = getCEONode(orgChartData);
  if (!ceo) {
    return { csuite: orgChartData, cto: null, cpo: null, cro: null, cmo: null, cfo: null, caio: null };
  }

  // ID-based pruning so edits to the CEO label cannot break section boundaries.
  const ceoId = ceo.id;
  function cloneForCSuiteOnlyById(n, parentId) {
    if (!n) return null;
    const isDirectChildOfCEO = parentId === ceoId;
    const children = isDirectChildOfCEO ? [] : (n.children || []).map(c => cloneForCSuiteOnlyById(c, n.id));
    return { id: n.id, label: n.label, children };
  }

  return {
    csuite: cloneForCSuiteOnlyById(orgChartData, null),
    // Allow edits like: "CTO – Chief Technology Officer - Jane"
    cto: findChildByLabelPrefix(ceo, CTO_LABEL_PREFIX),
    cpo: findChildByLabelPrefix(ceo, CPO_LABEL_PREFIX),
    cro: findChildByLabelPrefix(ceo, CRO_LABEL_PREFIX),
    cmo: findChildByLabelPrefix(ceo, CMO_LABEL_PREFIX),
    cfo: findChildByLabelPrefix(ceo, CFO_LABEL_PREFIX),
    caio: findChildByLabelPrefix(ceo, CAIO_LABEL_PREFIX)
  };
}

export function getSubLineageIndex(orgChartData, nodeId, sectionId) {
  const roots = getSectionRoots(orgChartData);
  const sectionRoot = roots[sectionId];
  if (!sectionRoot?.children) return -1;
  const path = pathFromRoot(orgChartData, nodeId);
  for (let i = 0; i < path.length; i++) {
    if (path[i].id === sectionRoot.id) {
      if (i + 1 >= path.length) return -1;
      const child = path[i + 1];
      const j = sectionRoot.children.findIndex(c => c.id === child.id);
      if (j >= 0) return j;
      return -1;
    }
  }
  return -1;
}

export function getLineageStyle(orgChartData, node, sectionId) {
  let branchIndex = SECTION_TO_BRANCH[sectionId] >= 0 ? SECTION_TO_BRANCH[sectionId] : getBranchIndexForNode(orgChartData, node.id);
  if (branchIndex < 0) branchIndex = 0;
  let lineageColor = LINEAGE_COLORS[branchIndex] || LINEAGE_COLORS[0];
  let cardBg = null;
  const subLineageConfig = SUB_LINEAGE[sectionId];
  if (subLineageConfig) {
    const subIdx = getSubLineageIndex(orgChartData, node.id, sectionId);
    if (subIdx >= 0) {
      lineageColor = subLineageConfig.colors[subIdx] || subLineageConfig.colors[0];
      cardBg = lineageColor;
    } else {
      lineageColor = subLineageConfig.rootBg;
      cardBg = subLineageConfig.rootBg;
    }
  }
  const badgeTextColor = (subLineageConfig && cardBg) ? '#1e293b' : '#fff';
  return { lineageColor, cardBg, branchIndex, badgeTextColor };
}
