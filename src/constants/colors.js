export const MAX_LEVEL = 10;

export const LINEAGE_COLORS = [
  '#4f46e5', /* CTO */
  '#7c3aed', /* CPO */
  '#059669', /* CRO */
  '#d97706', /* CMO */
  '#0d9488', /* CFO */
  '#be185d'  /* CAIO */
];

export const SECTION_TO_BRANCH = { csuite: -1, cto: 0, cpo: 1, cro: 2, cmo: 3, cfo: 4, caio: 5 };

export const SUB_LINEAGE = {
  cto: {
    rootBg: '#dbeafe',
    colors: [
      '#bbf7d0', /* VP Engineering */
      '#93c5fd', /* VP Infrastructure, DevOps & Reliability */
      '#c4b5fd', /* VP Analytics / Data Engineering */
      '#fde047', /* VP IT */
      '#fbcfe8', /* Head of Application Support */
      '#fed7aa' /* Director, Information Security */
    ]
  },
  cpo: {
    rootBg: '#e0e7ff',
    colors: [
      '#bbf7d0', /* Director, Product Management */
      '#fde047', /* Director, UX & Design */
      '#fbcfe8', /* Head of User Research & Insights */
      '#fed7aa', /* Head of Product Content Strategy */
      '#93c5fd', /* Head of Product Operations */
      '#c4b5fd' /* Head of Product Marketing (PMM) */
    ]
  },
  cro: {
    rootBg: '#d1fae5',
    colors: [
      '#bbf7d0',
      '#93c5fd',
      '#fde047',
      '#fbcfe8',
      '#c4b5fd',
      '#fed7aa'
    ]
  },
  cmo: {
    rootBg: '#ffedd5',
    colors: [
      '#bbf7d0',
      '#93c5fd',
      '#fbcfe8',
      '#fde047',
      '#c4b5fd'
    ]
  },
  cfo: {
    rootBg: '#ccfbf1',
    colors: [
      '#bbf7d0',
      '#93c5fd',
      '#fde047',
      '#fbcfe8',
      '#fed7aa',
      '#c4b5fd'
    ]
  },
  caio: {
    rootBg: '#fce7f3',
    colors: [
      '#bbf7d0',
      '#93c5fd',
      '#fde047',
      '#c4b5fd'
    ]
  }
};

export const SECTIONS = [
  { id: 'csuite', title: 'C-Suite Executives', pdfFilename: 'org-chart-csuite.pdf' },
  { id: 'cto', title: 'CTO – Chief Technology Officer', pdfFilename: 'org-chart-cto.pdf' },
  { id: 'cpo', title: 'CPO – Chief Product Officer', pdfFilename: 'org-chart-cpo.pdf' },
  { id: 'cro', title: 'CBO/CRO – Chief Business Officer/Chief Revenue Officer', pdfFilename: 'org-chart-cro.pdf' },
  { id: 'cmo', title: 'CMO – Chief Marketing Officer', pdfFilename: 'org-chart-cmo.pdf' },
  { id: 'cfo', title: 'CFO – Chief Financial Officer', pdfFilename: 'org-chart-cfo.pdf' },
  { id: 'caio', title: 'Chief AI & Innovation Officer (CAIO)', pdfFilename: 'org-chart-chief-ai-innovation.pdf' }
];
