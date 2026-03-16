import { LINEAGE_COLORS, SECTION_TO_BRANCH, SUB_LINEAGE } from '../constants/colors';

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
  return findNodeByLabel(orgChartData, 'CEO – Chief Executive Officer');
}

export function cloneForCSuiteOnly(node, parentLabel) {
  if (!node) return null;
  const isChildOfCEO = parentLabel === 'CEO – Chief Executive Officer';
  const children = isChildOfCEO ? [] : (node.children || []).map(c => cloneForCSuiteOnly(c, node.label));
  return { id: node.id, label: node.label, children };
}

export function findChildByLabel(node, label) {
  if (!node?.children) return null;
  return node.children.find(c => c.label === label) || null;
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
  return {
    csuite: cloneForCSuiteOnly(orgChartData, ''),
    cto: findChildByLabel(ceo, 'CTO – Chief Technology Officer'),
    cpo: findChildByLabel(ceo, 'CPO – Chief Product Officer'),
    cro: findChildByLabel(ceo, 'CBO/CRO – Chief Business Officer/Chief Revenue Officer'),
    cmo: findChildByLabel(ceo, 'CMO – Chief Marketing Officer'),
    cfo: findChildByLabel(ceo, 'CFO – Chief Financial Officer'),
    caio: findChildByLabel(ceo, 'Chief AI & Innovation Officer (CAIO)')
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
