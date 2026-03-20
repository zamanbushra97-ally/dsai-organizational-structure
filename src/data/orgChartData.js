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
            /* CTO: VP Eng (+ Web/Mobile divisions, API, Game, QA), VP Infra/DevOps, VP Analytics/Data, VP IT, App Support, InfoSec */
            {
              label: 'CTO – Chief Technology Officer (1)',
              children: [
                {
                  label: 'VP Engineering (1)',
                  children: [
                    {
                      label: 'Director, Web Engineering (1)',
                      children: [
                        {
                          label: 'Associate Director / Engineering Manager – Data Science & Engineering (2)',
                          children: [
                            {
                              label: '🌐 WEB APPLICATION DIVISION',
                              children: [
                                {
                                  label: 'Lead – Full Stack Developer (Web Platform) (1)',
                                  children: ['Full Stack Developers (3)']
                                },
                                {
                                  label: 'Senior Backend Developer (Node/Express) (1)',
                                  children: ['Backend Developers (2)']
                                },
                                {
                                  label: 'Senior Frontend Developer (1)',
                                  children: ['Frontend Developers (2)']
                                },
                                'UI/UX Designers (2)',
                                'QA Engineers (3)',
                                'Data / AI / GeoAI Support (2)',
                                'Site Reliability Engineer (SRE) (1)'
                              ]
                            },
                            {
                              label: '📱 MOBILE APPLICATION DIVISION',
                              children: [
                                {
                                  label: 'Lead – Mobile Application Developer (1)',
                                  children: ['Mobile App Developers (3)']
                                },
                                'Backend Support (Shared) (1)',
                                'UI/UX Designers (1)',
                                'QA Engineers (2)',
                                'Data / Analytics Support (1)',
                                'Site Reliability Engineer (SRE) (1)'
                              ]
                            }
                          ]
                        },
                        {
                          label: 'Lead – API & Integration (1)',
                          children: [
                            'Lead Software Developer (1)',
                            'Full Stack Developers (1)',
                            'Integration Engineers (TBD)'
                          ]
                        }
                      ]
                    },
                    {
                      label: 'Director – Game Development (1)',
                      children: [
                        {
                          label: 'Associate Director / Engineering Manager – Game Development (1)',
                          children: [
                            {
                              label: 'Game / Unity Development (Gamification Layer)',
                              children: [
                                'Lead – Game Development / Unity Lead (1 TBD)',
                                'Game Design (TBD)',
                                'Unity Developers (3)',
                                'Game Artists (1)',
                                'Learning & Analytics Integration (TBD)'
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      label: 'Director – QA & Release Engineering (1 TBD)',
                      children: ['QA Managers / Leads (TBD)']
                    }
                  ]
                },
                {
                  label: 'VP Infrastructure, DevOps & Reliability (1)',
                  children: [
                    {
                      label: 'Director, Infrastructure & DevOps (1)',
                      children: [
                        'Engineering Manager – Infrastructure & DevOps (1 TBD)',
                        {
                          label: 'Lead – Cloud & DevOps Engineer (1)',
                          children: ['DevOps Engineers (2)']
                        },
                        'Site Reliability Engineer (SRE) (TBD)'
                      ]
                    }
                  ]
                },
                {
                  label: 'VP Analytics / Data Engineering (1)',
                  children: [
                    {
                      label: 'Director, Analytics & Data Engineering (1 TBD)',
                      children: [
                        {
                          label: 'Associate Director / Engineering Manager – Data Strategy & Content (1)',
                          children: [
                            {
                              label: 'Lead – Database Administration (1)',
                              children: [
                                'MongoDB DBAs (TBD)',
                                'SQL DBAs (TBD)',
                                'Database Reliability Engineers (TBD)'
                              ]
                            },
                            'Full Stack Developer Trainees (3)',
                            'UI/UX Designers (1)',
                            'QA Engineers (1)',
                            'Mobile App Developers (1)'
                          ]
                        },
                        {
                          label: 'Director, Analytics & BI (1 TBD)',
                          children: ['BI / Analytics Engineers (TBD)']
                        }
                      ]
                    }
                  ]
                },
                {
                  label: 'VP IT (Internal Systems & Tools) (1)',
                  children: [
                    {
                      label: 'Director, IT Operations & Enterprise Tools (1 TBD)',
                      children: [
                        {
                          label: 'IT Managers (3)',
                          children: ['IT Support Engineers (4)']
                        }
                      ]
                    }
                  ]
                },
                {
                  label: 'Head of Application Support (1)',
                  children: [
                    {
                      label: 'Director, Application Support (1 TBD)',
                      children: ['Application Support Engineers (3)']
                    }
                  ]
                },
                {
                  label: 'Director, Information Security (1 TBD)',
                  children: ['InfoSec Manager (1 TBD)']
                }
              ]
            },
            {
              label: 'CPO – Chief Product Officer',
              children: [
                {
                  label: 'Director, Product Management',
                  children: [
                    'Product Manager (Core/Platform)',
                    'Growth Product Manager (Retention & Monetization)',
                    'Technical Product Manager (API & Infrastructure)'
                  ]
                },
                {
                  label: 'Director, UX & Design',
                  children: [
                    'UI/UX Designer',
                    'Gamification Designer (Crucial for student engagement)',
                    'UX Writer'
                  ]
                },
                {
                  label: 'Head of User Research & Insights',
                  children: [
                    'User Researcher (Qualitative/Interviews)',
                    'Product Data Analyst (Quantitative/Usage Metrics)'
                  ]
                },
                {
                  label: 'Head of Product Content Strategy',
                  children: [
                    'Assessment Content Lead',
                    'Curriculum Alignment Specialist',
                    'Content Strategist',
                    'Localization Specialist (If scaling to different regions/languages)'
                  ]
                },
                {
                  label: 'Head of Product Operations (The "Engine Room")',
                  children: ['Product Ops Manager (Tooling, Process, & Roadmapping)']
                },
                {
                  label: 'Head of Product Marketing (PMM)',
                  children: ['Product Marketing Manager (Go-to-Market & Communication)']
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
                    { label: 'Government Sales Manager', children: ['Government Sales Representative'] }
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
                    { label: 'Director, Enterprise Customer Success', children: ['Enterprise Customer Success Manager (CSM)'] },
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
                    { label: 'Corporate Communications Manager', children: ['Communications Specialist'] },
                    { label: 'Content & Editorial Manager', children: ['Content Strategist / Writer'] }
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
                      children: ['Talent Acquisition Specialist', 'Recruiting Coordinator']
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
                  label: 'Director, AI Research, Innovation & Intellectual Property',
                  children: [
                    {
                      label: 'Associate Director – AI Research & Advanced Modeling',
                      children: [
                        {
                          label: 'Principal Machine Learning Research Scientist',
                          children: ['Senior Machine Learning Research Scientist']
                        },
                        'Computer Vision Research Scientist',
                        'Natural Language Processing (NLP) Research Scientist',
                        'Responsible AI / AI Ethics Specialist'
                      ]
                    },
                    {
                      label: 'Associate Director – Applied Innovation & Prototyping',
                      children: [
                        { label: 'Innovation Program Manager', children: ['AI Prototyping Engineer'] },
                        'Research Translation Lead'
                      ]
                    },
                    {
                      label: 'Associate Director – Research Partnerships & Collaboration',
                      children: [
                        { label: 'Academic Partnerships Manager', children: ['Research Collaboration Coordinator'] },
                        'Strategic Alliances & Grants Lead'
                      ]
                    },
                    {
                      label:
                        'Associate Director – Intellectual Property, Publications & Technical Content (1)',
                      children: [
                        {
                          label: 'Intellectual Property & Patent Lead',
                          children: ['Patent Specialist']
                        },
                        {
                          label: 'AI Innovation & Applied Research Lead',
                          children: ['Research Associate (2)']
                        },
                        'Scientific Writing & Publications Lead',
                        {
                          label: 'Content Creation & Knowledge Dissemination Lead',
                          children: ['Content creator (1)', 'Technical Writer']
                        }
                      ]
                    }
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
                }
              ]
            }
          ]
        }
      ]
    }
  ]);
}
