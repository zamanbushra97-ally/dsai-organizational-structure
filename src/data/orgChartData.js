/**
 * Organizational chart tree data (6-level hierarchy).
 * Each node: { id, label, children: [] }
 */
export function buildOrgChartData() {
  let id = 0;
  function norm(c) {
    return typeof c === 'string' ? n(c, []) : n(c.label, c.children || []);
  }
  function n(label, children) {
    const node = { id: String(++id), label, children: (children || []).map(norm) };
    return node;
  }

  return n('BOARD OF DIRECTORS', [
    'Chairman',
    {
      label: 'Board Members',
      children: [
        {
          label: 'CEO – Chief Executive Officer',
          children: [
            {
              label: 'CTO – Chief Technology Officer',
              children: [
                {
                  label: 'VP of Engineering',
                  children: [
                    {
                      label: 'Manager, Web Engineering',
                      children: [
                        { label: 'Engineering Manager - Frontend', children: ['Frontend Engineer'] },
                        { label: 'Engineering Manager - Backend', children: ['Backend Engineer'] },
                        { label: 'Engineering Manager - API', children: ['API Engineer'] }
                      ]
                    },
                    {
                      label: 'Manager, Mobile & Backend',
                      children: [
                        { label: 'QA Manager - Mobile', children: ['Mobile QA Engineer'] },
                        { label: 'QA Manager - Backend', children: ['Backend QA Engineer'] },
                        { label: 'Engineering Manager - Platform', children: ['Platform Engineer'] }
                      ]
                    },
                    {
                      label: 'Manager, QA',
                      children: [
                        'QA Manager - Functional & API Testing',
                        'QA Automation Engineer',
                        'QA Performance Engineer'
                      ]
                    },
                    { label: 'Manager, UX', children: ['UX Designer'] },
                    {
                      label: 'Manager, Infra & DevOps',
                      children: ['DevOps Engineer', 'SRE/Infrastructure Engineer', 'Data Engineer']
                    },
                    {
                      label: 'Manager, Performance & Load Testing',
                      children: ['Performance Engineer']
                    },
                    { label: 'Manager, Security', children: ['Security Engineer'] },
                    { label: 'Head of Application Support', children: ['Application Support Engineer'] }
                  ]
                },
                {
                  label: 'VP Analytics Data Engineering',
                  children: [
                    { label: 'Data Engineering Manager', children: ['Data Engineer'] }
                  ]
                },
                {
                  label: 'VP IT & Infra Systems & Security',
                  children: [
                    { label: 'IT Manager', children: ['IT Support Engineer'] }
                  ]
                }
              ]
            },
            {
              label: 'CPO – Chief Product Officer',
              children: [
                { label: 'Director, Product Management', children: ['Product Managers'] },
                {
                  label: 'Director, UX & Design',
                  children: ['UI/UX Designers', 'Gamification Designers', 'UX Writers']
                },
                { label: 'Head of User Research', children: ['User Researchers'] },
                {
                  label: 'Head of Product Content Strategy',
                  children: ['Assessment Content Leads', 'Curriculum Alignment Specialists', 'Content Strategists']
                }
              ]
            },
            {
              label: 'CBO/CRO – Chief Business Officer/Chief Revenue Officer',
              children: [
                {
                  label: 'VP Government Sales',
                  children: [
                    { label: 'Director, Government Sales', children: ['Government Account Executive'] },
                    { label: 'Government Sales Managers', children: ['Government Sales Representative'] }
                  ]
                },
                {
                  label: 'VP Enterprise Sales',
                  children: [
                    { label: 'Director, Enterprise Sales', children: ['Enterprise Account Executive'] },
                    { label: 'Enterprise Sales Manager', children: ['Enterprise Sales Representative'] }
                  ]
                },
                {
                  label: 'VP International Sales',
                  children: [
                    {
                      label: 'Regional Sales Director',
                      children: [
                        {
                          label: 'Regional Sales Manager',
                          children: ['Regional Sales Representative']
                        }
                      ]
                    }
                  ]
                },
                {
                  label: 'VP Customer Success',
                  children: [
                    { label: 'Director, Enterprise Customer Success', children: ['Enterprise Customer Success Managers (CSMs)'] },
                    {
                      label: 'Director, Implementation / Professional Services',
                      children: [
                        { label: 'Implementation Manager', children: ['Implementation Specialist'] }
                      ]
                    },
                    { label: 'Director, Renewals & Retention', children: ['Renewal Specialist'] }
                  ]
                },
                {
                  label: 'VP Partnerships & Alliances',
                  children: [
                    { label: 'Director, Strategic Partnerships', children: ['Partnership Manager'] },
                    { label: 'Channel Partnerships Manager', children: ['Channel Partnership Specialist'] }
                  ]
                },
                {
                  label: 'Director, Revenue Operations (RevOps)',
                  children: [
                    { label: 'Sales Operations Manager', children: ['Sales Operations Analyst'] },
                    { label: 'Revenue Analytics Manager', children: ['Revenue Analyst'] },
                    { label: 'CRM Systems Manager', children: ['CRM Administrator'] }
                  ]
                }
              ]
            },
            {
              label: 'CMO – Chief Marketing Officer',
              children: [
                {
                  label: 'Director, Brand Marketing',
                  children: [
                    { label: 'PR & Media Relations Manager', children: ['PR Specialist'] },
                    { label: 'Analyst Relations Manager', children: ['Analyst Relations Specialist'] },
                    { label: 'Events & Community Manager', children: ['Events & Community Coordinator'] }
                  ]
                },
                {
                  label: 'Director, Demand Generation',
                  children: [
                    { label: 'Growth Marketing Manager', children: ['Growth Marketing Specialist'] },
                    { label: 'Digital Marketing Manager', children: ['Digital Marketing Specialist'] },
                    { label: 'Marketing Automation Manager', children: ['Marketing Automation Specialist'] }
                  ]
                },
                {
                  label: 'Director, Corporate Communications',
                  children: [
                    { label: 'Corporate Communications Manager', children: ['Communications Specialists'] },
                    { label: 'Content & Editorial Manager', children: ['Content Strategists / Writers'] }
                  ]
                },
                {
                  label: 'Head of Investor Relations',
                  children: [
                    { label: 'Investor Relations Manager', children: ['Investor Relations Analyst'] }
                  ]
                },
                {
                  label: 'Director, Academic & Research Partnerships',
                  children: [
                    { label: 'University Partnerships Manager', children: ['Academic Partnership Coordinator'] },
                    { label: 'Research Collaboration Manager', children: ['Research Program Coordinator'] },
                    { label: 'Internship & University Programs Manager', children: ['Internship Program Coordinator'] }
                  ]
                }
              ]
            },
            {
              label: 'CFO – Chief Financial Officer',
              children: [
                {
                  label: 'Financial Controller',
                  children: [
                    {
                      label: 'Accounting Manager',
                      children: [
                        'Senior Accountant',
                        'Staff Accountant',
                        'Accounts Payable (AP) Specialist',
                        'Accounts Receivable (AR) Specialist'
                      ]
                    }
                  ]
                },
                {
                  label: 'VP, Financial Planning & Analysis (FP&A)',
                  children: [
                    {
                      label: 'FP&A Manager',
                      children: ['Financial Analyst', 'Financial Planning Analyst']
                    },
                    'Revenue Forecasting & Budgeting Lead'
                  ]
                },
                {
                  label: 'VP, Recruiting (Talent Acquisition)',
                  children: [
                    {
                      label: 'Recruiting Manager',
                      children: ['Talent Acquisition Specialist', 'Recruiting Coordinators']
                    },
                    'Campus & Employer Branding Lead'
                  ]
                },
                {
                  label: 'VP, People (HR)',
                  children: [
                    { label: 'HR Operations Manager', children: ['HR Business Partner'] },
                    { label: 'Learning & Development Manager', children: ['L&D Specialist'] },
                    { label: 'Compensation & Benefits Manager', children: ['HR Specialist'] }
                  ]
                },
                {
                  label: 'Director Business Operations',
                  children: [
                    { label: 'Administration Manager', children: ['Administrative Staff'] },
                    { label: 'Facilities Manager', children: ['Facilities Staff'] },
                    {
                      label: 'Procurement & Vendor Management Manager',
                      children: ['Procurement Specialist']
                    }
                  ]
                },
                {
                  label: 'General Counsel',
                  children: [
                    { label: 'Legal Manager', children: ['Legal Officer'] },
                    { label: 'Compliance Manager', children: ['Compliance Analyst'] }
                  ]
                }
              ]
            },
            {
              label: 'Chief AI & Innovation Officer (CAIO)',
              children: [
                {
                  label: 'Director, AI Research & Development',
                  children: [
                    { label: 'Principal Machine Learning Research Scientist', children: ['Senior Machine Learning Research Scientist'] },
                    'Computer Vision Research Scientist',
                    'Natural Language Processing (NLP) Research Scientist',
                    'Responsible AI / AI Ethics Specialist'
                  ]
                },
                {
                  label: 'Director, Applied AI & Machine Learning Engineering',
                  children: [
                    { label: 'MLOps Lead', children: ['MLOps Engineer'] },
                    { label: 'Machine Learning Engineering Manager', children: ['Machine Learning Engineer'] },
                    'UI/UX Designer',
                    'Cloud AI Infrastructure Engineer',
                    'Senior AI Software Engineer'
                  ]
                },
                {
                  label: 'Director, Data Science & Data Engineering',
                  children: [
                    { label: 'Data Science Manager', children: ['Data Scientist'] },
                    'Data Annotation / Labeling Specialist',
                    'Data Quality Assurance (QA) & Validation Engineer'
                  ]
                },
                {
                  label: 'Director, Innovation, Research Partnerships & IP',
                  children: [
                    { label: 'Innovation Program Manager', children: ['AI Prototyping Engineer'] },
                    { label: 'Academic Partnerships Manager', children: ['Research Collaboration Coordinator'] },
                    'Intellectual Property & Patent Specialist'
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]);
}
