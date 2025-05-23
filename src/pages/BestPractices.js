import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

function BestPractices() {
  const [expandedSections, setExpandedSections] = useState({});
  const [animatingSections, setAnimatingSections] = useState({});
  const [selectedFilters, setSelectedFilters] = useState([]);

  const filters = [
    { id: 'level-1', label: 'Level 1 (Essentials)', title: 'Fundamental practices to start with' },
    { id: 'level-2', label: 'Level 2 (Developing)', title: 'Core practices for early teams' },
    { id: 'level-3', label: 'Level 3 (Stable)', title: 'Essential practices for stable teams' },
    { id: 'level-4', label: 'Level 4 (Mature)', title: 'Established practices for growing teams' },
    { id: 'level-5', label: 'Level 5 (Excellence)', title: 'Advanced practices for optimized teams' },
    { id: 'article', label: 'Article' },
    { id: 'guide', label: 'Guide' },
    { id: 'platform', label: 'Platform' },
    { id: 'video', label: 'Video' },
    { id: 'podcast', label: 'Podcast' },
    { id: 'book', label: 'Book' },
  ];

  const toggleFilter = (filterId) => {
    setSelectedFilters(prev => {
      if (prev.includes(filterId)) {
        return prev.filter(id => id !== filterId);
      }
      return [...prev, filterId];
    });
  };

  const toggleSection = (sectionId) => {
    const isExpanding = !expandedSections[sectionId];
    
    if (isExpanding) {
      setAnimatingSections(prev => ({ ...prev, [sectionId]: true }));
      setTimeout(() => {
        setAnimatingSections(prev => ({ ...prev, [sectionId]: false }));
      }, 300); // Match this with your animation duration

      // Scroll to section header after a short delay to ensure DOM is updated
      setTimeout(() => {
        const sectionHeader = document.querySelector(`#section-${sectionId}`);
        if (sectionHeader) {
          const yOffset = -120; // Add padding on top
          const yPosition = sectionHeader.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: yPosition, behavior: 'smooth' });
        }
      }, 50);
    }

    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const shouldShowLink = (link) => {
    if (selectedFilters.length === 0) return true;
    
    const linkFilters = [
      link.type.toLowerCase(),
      link.level ? `level-${link.level}` : null
    ].filter(Boolean);
    
    return selectedFilters.some(filter => linkFilters.includes(filter.toLowerCase()));
  };

  const Section = ({ id, title, subsections }) => {
    const isExpanded = expandedSections[id];
    const isAnimating = animatingSections[id];

    // Filter subsections and count visible links
    const filteredSubsections = subsections.map(subsection => ({
      ...subsection,
      links: subsection.links?.filter(shouldShowLink) || []
    })).filter(subsection => subsection.links.length > 0);
    
    const totalLinks = filteredSubsections.reduce((acc, subsection) => {
      return acc + (subsection.links?.length || 0);
    }, 0);

    return (
      <section className={`section section-best-practices ${totalLinks == 0 ? 'section-hidden' : ''}`}>
        <div className="section-content">
          <div 
            id={`section-${id}`}
            className="section-header" 
            onClick={() => toggleSection(id)}
          >
            {isExpanded && totalLinks > 0 ? <FaChevronDown /> : <FaChevronRight />}
            <h2 className="section-title">
              {title}
              <span className="section-links-count">{totalLinks} resources</span>
            </h2>
          </div>

          {isExpanded && (
            <div className={`section-body ${isAnimating ? 'animating' : ''}`}>
              {filteredSubsections?.map((subsection, index) => (
                <div key={index} className="subsection">
                  <h3 className="subsection-title">{subsection.title}</h3>
                  <div className="subsection-links">
                    {subsection.links?.map((link, linkIndex) => {
                      const url = new URL(link.url);
                      url.searchParams.set('ref', 'ten-factors.io');
                      return (
                        <div key={linkIndex} className="link-item">
                          <a
                            href={url.toString()}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <div className="link-content">
                              {link.title}
                              {link.level && (
                                <span 
                                  className={`maturity-badge level-${link.level}`}
                                  title={{
                                    '5': 'Level 5: Excellence - Advanced practices for optimized teams',
                                    '4': 'Level 4: Mature - Established practices for growing teams',
                                    '3': 'Level 3: Stable - Essential practices for stable teams',
                                    '2': 'Level 2: Developing - Core practices for early teams',
                                    '1': 'Level 1: Essentials - Fundamental practices to start with'
                                  }[link.level]}
                                >
                                  {`Level ${link.level}`}
                                </span>
                              )}
                              {link.type && <span className={`content-type-badge ${link.type.toLowerCase()}`}>{link.type}</span>}
                            </div>
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  };

  const sections = [
    {
      id: 'architecture',
      title: '01. Architecture',
      subsections: [
        {
          title: 'Software Design Principles',
          links: [
            {
              url: 'https://12factor.net/',
              title: '12-Factor App – A simple guide to building apps that are easy to scale, manage, and run in the cloud using 12 clear rules (e.g. Codebase, Dependencies, Config, Logs, etc.).',
              type: 'Book',
              level: '2'
            },
            {
              "title": "(May 2025) Native vs Hybrid App: Which One to Choose?",
              "url": "https://www.browserstack.com/guide/native-app-vs-hybrid-app",
              "type": "Guide",
              "level": "1"
            },
            {
              "title": "(Jul 2021) A Philosophy of Software Design (2nd Edition)",
              "url": "https://www.amazon.com/Philosophy-Software-Design-2nd-ebook/dp/B09B8LFKQL/",
              "type": "Book",
              "level": "4"
            },
            {
              "title": "(May 2016) Domain-Driven Design Distilled by Vaughn Vernon",
              "url": "https://www.amazon.com/Domain-Driven-Design-Distilled-Vaughn-Vernon/dp/0134434420",
              "type": "Book",
              "level": "4"
            },
            {
              "title": "(Dec 2024) Facilitating Software Architecture: Empowering Teams to Make Architectural Decisions by Andrew Harmel-Law",
              "url": "https://www.amazon.com/Facilitating-Software-Architecture-Empowering-Architectural-ebook/dp/B0DMHGWCPN/",
              "type": "Book",
              "level": "4"
            }
          ]
        },
        {
          title: 'System Design',
          links: [
            {
              "title": "(Oct 2018) Practical TLA+: Planning Driven Development by Hillel Wayne",
              "url": "https://www.amazon.com/Practical-TLA-Planning-Driven-Development/dp/1484238281",
              "type": "Book",
              "level": "4"
            }
          ]
        },
        { title: 'Scalability & Load balancing', links: [] },
        { title: 'Cloud and Serverless', links: [] },
        { title: 'Local setup & Environment', links: [] },
        { title: 'Regulatory compliance', links: [] },
        { title: 'Logging', links: [] }
      ]
    },
    {
      id: 'infrastructure',
      title: '02. Infrastructure',
      subsections: [
        {
          title: 'Infrastructure planning', 
          links: [
            {
              "title": "(May 2019) How to invest in technical infrastructure",
              "url": "https://lethain.com/how-to-invest-technical-infrastructure/",
              "type": "Article",
              "level": "2"
            },
            {
              "title": "(Dec 2018) Infrastructure planning: users, baselines and timeframes",
              "url": "https://lethain.com/infrastructure-planning/",
              "type": "Article",
              "level": "3"
            }
          ]
        },
        { title: 'CI/CD process maturity', links: [] },
        { title: 'Monitoring and alerting', links: [] },
        { title: 'Containerization', links: [] },
        { title: 'Credentials management', links: [] },
        { title: 'Cost-efficiency checks', links: [] }
      ]
    },
    {
      id: 'engineering',
      title: '03. Engineering',
      subsections: [
        {
          title: 'Code Reviews',
          links: [
            {
              url: 'https://github.com/google/eng-practices/blob/master/review/index.md',
              title: "Google's guide to doing code reviews with clear, helpful feedback and clean code practices.",
              type: 'Guide',
              level: '2'
            }
          ]
        },
        { title: 'Git standards & Workflows', links: [] },
        { title: 'Coding standards', links: [] },
        {
          title: 'Refactoring, Code Quality & Technical Debt',
          links: [
            {
              "url": "https://retool.com/blog/software-design-best-practices",
              "title": "(Dec 2024) Fundamental software design practices to build flexible, scalable, and maintainable systems – including YAGNI, SOLID, and DRY principles.",
              "type": "Article",
              "level": "1"
            },
            {
              url: 'https://blog.crisp.se/2013/10/11/henrikkniberg/good-and-bad-technical-debt',
              title: '(Oct 2013) Henrik Kniberg explains when technical debt can be helpful for creativity and speed, and when it becomes a problem that slows teams down.',
              type: 'Article',
              level: '4'
            },
            {
              "title": "(Nov 2023) Tidy First? A Personal Exercise in Empirical Software Design",
              "url": "https://www.amazon.com/Tidy-First-Personal-Exercise-Empirical/dp/1098151240",
              "type": "Book",
              "level": "4"
            },
            {
              "title": "(Apr 2018) Migrations: the sole scalable fix to tech debt",
              "url": "https://lethain.com/migrations/",
              "type": "Article",
              "level": "3"
            }
          ]
        }
      ]
    },
    {
      id: 'deployment',
      title: '04. Deployment',
      subsections: [
        {
          title: 'CI/CD Practices',
          links: [
            {
              url: 'https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment',
              title: '(Apr 2017) A clear guide from Atlassian explaining the differences between continuous integration, delivery, and deployment.',
              type: 'Guide',
              level: '2'
            },
            {
              "url": "https://github.blog/enterprise-software/ci-cd/6-strategic-ways-to-level-up-your-ci-cd-pipeline/",
              "title": "(July 2022) 6 strategic ways to level up your CI/CD pipeline",
              "type": "Article",
              "level": "4"
            }
          ]
        },
        { title: 'Releases', links: [] },
        { title: 'Deployment Mocumentation', links: [] },
        {
          title: 'Incident Management',
          links: [
            {
              url: 'https://www.pagerduty.com/',
              title: 'PagerDuty helps teams spot and fix problems fast with alerts and automation.',
              type: 'Platform',
              level: '2'
            }
          ]
        },
        {
          title: 'Feature Flags',
          links: [
            {
              url: 'https://theproductmanager.com/topics/feature-flag-best-practices/',
              title: '(May 2022) How The Guardian’s dating platform using feature-flags and their best practies for feature flags management.',
              type: 'Article',
              level: '4'
            }
          ]
        }
      ]
    },
    {
      id: 'qa',
      title: '05. Quality Assurance',
      subsections: [
        { title: 'Test case coverage', links: [] },
        { title: 'Automated tests', links: [] },
        {
          "title": "Software Quality Strategy",
          "links": [
            {
              "title": "(May 2025) How to create software quality",
              "url": "https://lethain.com/quality/",
              "type": "Article",
              "level": "4"
            }
          ]
        },
        {
          "title": "Test Strategy, and Methodologies",
          "links": [
            {
              "title": "(Feb 2018) The Practical Test Pyramid by Martin Fowler – definition, sample application, and overview of unit, integration, and end-to-end tests.",
              "url": "https://martinfowler.com/articles/practical-test-pyramid.html",
              "type": "Guide",
              "level": "3"
            },
            {
              "title": "(Dec 2024) The testing pyramid: Strategic software testing for Agile teams",
              "url": "https://circleci.com/blog/testing-pyramid/",
              "type": "Guide",
              "level": "2"
            },
            {
              "title": "(Sep 2024) TDD vs BDD vs ATDD: Key Differences",
              "url": "https://www.browserstack.com/guide/tdd-vs-bdd-vs-atdd",
              "type": "Guide",
              "level": "2"
            },
            {
              "title": "(May 2025) BDD Testing: A Detailed Guide",
              "url": "https://www.browserstack.com/guide/what-is-bdd-testing",
              "type": "Guide",
              "level": "3"
            },
            {
              "title": "(Mar 2025) Mobile Testing Pyramid: How it can help Agile Teams",
              "url": "https://www.browserstack.com/guide/mobile-testing-pyramid",
              "type": "Guide",
              "level": "3"
            },
            {
              "title": "(May 2025) What is Batch Testing: A Tutorial",
              "url": "https://www.browserstack.com/guide/what-is-batch-testing",
              "type": "Guide",
              "level": "2"
            },
            {
              "title": "(May 2025) Understanding UI Test Cases (with Examples on BrowserStack platform)",
              "url": "https://www.browserstack.com/guide/what-is-ui-test-cases",
              "type": "Guide",
              "level": "3"
            }
          ]
        }
      ]
    },
    {
      id: 'security',
      title: '06. Security',
      subsections: [
        { title: 'Secure coding guidelines', links: [] },
        { title: 'Disaster recovery plan', links: [] },
        { title: 'Backup policy', links: [] },
        { title: 'Access control', links: [] },
        { title: 'Audit logs', links: [] },
        { title: 'Compliance', links: [] },
        {
          title: 'Security Standards & Frameworks',
          links: [
            {
              title: 'A free set of security checklists from CIS that help you set up systems like servers, cloud platforms, and apps in a safer, more secure way.',
              url: 'https://www.cisecurity.org/cis-benchmarks',
              type: 'Guide',
              level: '4'
            },
            {
              title: 'A guide from NIST (National Institute of Standards and Technology) that helps organizations of any size manage cybersecurity risks using six key steps: Govern, Identify, Protect, Detect, Respond, and Recover.',
              url: 'https://www.nist.gov/cyberframework',
              type: 'Guide',
              level: '4'
            }
          ]
        },
        {
          title: 'DevSecOps Maturity',
          links: [
            {
              title: 'A practical framework from OWASP for adding security to DevOps.',
              url: 'https://owasp.org/www-project-devsecops-maturity-model/',
              type: 'Guide',
              level: '3'
            },
            {
              "title": "(Mar 2022) How early-stage startups can right-size security as they grow",
              "url": "https://review.firstround.com/how-early-stage-startups-can-enlist-the-right-amount-of-security-as-they-grow/",
              "type": "Article",
              "level": "2"
            }
          ]
        }
      ]
    },
    {
      id: 'documentation',
      title: '07. Documentation',
      subsections: [
        { title: 'Requirements', links: [] },
        { title: 'Installation/setup guides', links: [] },
        { title: 'Code documentation', links: [] },
        {
          title: 'Onboarding',
          links: [
            {
              "title": "(Mar 2022) The Ultimate Guide to Onboarding Software Engineers",
              "url": "https://leadership.garden/onboarding-engineers/",
              "type": "Guide",
              "level": "2"
            }
          ]
        },
        { title: 'Knowledge sharing rituals', links: [] },
        {
          title: 'Documentation Platforms',
          links: [
            {
              url: 'https://www.gitbook.com/',
              title: 'GitBook is a modern platform that helps teams create, manage, and publish beautiful, easy-to-use documentation for products, APIs, and internal knowledge.',
              type: 'Platform',
              level: '3'
            }
          ]
        },
        {
          title: 'Product Thinking',
          links: [
            {
              url: 'https://thisisimportant.net/posts/write-better-docs-with-a-product-thinking-mindset/',
              title: 'A guide that shows how applying product thinking to documentation can make it more helpful and focused on user needs.',
              type: 'Article',
              level: '2'
            }
          ]
        },
        {
          title: 'Incident Documentation',
          links: [
            {
              url: 'https://incident.io/guide',
              title: 'A practical guide from incident.io that helps teams handle incidents better—from on-call setup to learning from mistakes—using clear steps and real-world advice.',
              type: 'Guide',
              level: '3'
            }
          ]
        }
      ]
    },
    {
      id: 'methodology',
      title: '08. Methodology',
      subsections: [
        {
          title: 'Ceremonies, and meetings',
          links: [
            {
              url: 'https://www.todoist.com/productivity-methods/weekly-review',
              title: 'Weekly Review - A simple weekly habit for reflecting and planning.',
              type: 'Guide',
              level: '1'
            },
            {
              url: 'https://www.parabol.co/',
              title: 'Parabol - Free, open-source tool for better agile meetings with built-in templates and tool integrations.',
              type: 'Platform',
              level: '2'
            },
          ]
        },
        {
          title: 'Estimations',
          links: [
            {
              url: 'https://www.youtube.com/watch?v=tqoJOEjeAEw',
              title: '(Dec 2021) What is Batch Testing: A Tutorial',
              type: 'Video',
              level: '3'
            }
          ]
        },
        {
          title: 'Metrics & Performance',
          links: [
            {
              url: 'https://itrevolution.com/product/accelerate/',
              title: 'A research-backed book "Accelerate" that shows how top tech teams boost delivery speed, reliability, and business success using Lean practices.',
              type: 'Book',
              level: '5'
            },
            {
              "title": "(Jan 2023) Measuring an engineering organization",
              "url": "https://lethain.com/measuring-engineering-organizations/",
              "type": "Article",
              "level": "4"
            },
            {
              "title": "(Jan 2019) Metrics for the unmeasurable",
              "url": "https://lethain.com/metrics-for-the-unmeasurable/",
              "type": "Article",
              "level": "3"
            },
            {
              "title": "(Dec 2024) Measuring developer experience, benchmarks, and providing a theory of improvement",
              "url": "https://lethain.com/measuring-developer-experience-benchmarks-theory-of-improvement/",
              "type": "Article",
              "level": "4"
            }
          ]
        },
        {
          title: 'Communication',
          links: [
            {
              "title": "(May 2025) How to provide feedback on documents",
              "url": "https://lethain.com/providing-feedback-on-writing/",
              "type": "Article",
              "level": "2"
            }
          ]
        },
        {
          title: 'Leadership & Team Growth, and Scaling',
          links: [
            {
              "title": "(Jul 2018) Sizing engineering teams",
              "url": "https://lethain.com/sizing-engineering-teams/",
              "type": "Article",
              "level": "1"
            },
            {
              url: 'https://zapier.com/engineering/startup-cto/',
              title: '(June 2017) A personal story from Zapier’s CTO on how his role evolved as the company grew, sharing lessons for tech leaders at startups.',
              type: 'Video',
              level: '3'
            },
            {
              url: 'https://www.saastr.com/makes-bad-cto/',
              title: '(Mar 2021) A practical guide highlighting common mistakes startup CTOs make – like struggling to build strong teams, adapt quickly, or scale effectively – and how to avoid them.',
              type: 'Video',
              level: '3'
            },
            {
              url: 'https://www.oreilly.com/library/view/the-managers-path/9781491973882/',
              title: '(Mar 2017) Practical guide from Camille Fournier (tech lead turned CTO) takes through each stage in the journey from engineer to technical manager.',
              type: 'Book',
              level: '4'
            },
            {
              url: 'https://medium.com/better-programming/re-structuring-a-growing-team-3ac30d93b637',
              title: '(Jun 2017) How to restructure a growing team smoothly.',
              type: 'Article',
              level: '4'
            },
            {
              url: 'https://medium.com/bbc-product-technology/refactor-organisation-80e4e171d922',
              title: '(Mar 2022) BBC’s tech team reorg for better collaboration and a unified platform.',
              type: 'Article',
              level: '5'
            },
            {
              url: 'https://www.dashlane.com/blog/the-dashlane-triple-track-looking-for-the-right-organization',
              title: '(Feb 2024) Dashlane shares how they evolved their team structure to balance product delivery, technical health, and strategic goals.',
              type: 'Article',
              level: '5'
            },
            {
              "title": "(Mar 2022) What is product-led growth and why it matters",
              "url": "https://www.productled.org/foundations/what-is-product-led-growth",
              "type": "Guide",
              "level": "2"
            },
            {
              "title": "(Jul 2017) 3x in 3 years: Scaling an Engineering Organization",
              "url": "https://www.pagerduty.com/blog/scaling-engineering-org/",
              "type": "Article",
              "level": "5"
            },
            {
              "title": "(May 2024) Hardcore Software: Inside the Rise and Fall of the PC Revolution",
              "url": "https://www.amazon.com/Hardcore-Software-Inside-Rise-Revolution-ebook/dp/B0CYBS9PFY",
              "type": "Book",
              "level": "4"
            },
            {
              "title": "(Feb 2023) Writing an engineering strategy",
              "url": "https://lethain.com/eng-strategies/",
              "type": "Article",
              "level": "5"
            },
            {
              "title": "(Jan 2023) Setting engineering org values",
              "url": "https://lethain.com/setting-engineering-org-values/",
              "type": "Article",
              "level": "5"
            },
            {
              "title": "(Jan 2020) Your First 90 Days as CTO or VP Engineering",
              "url": "https://lethain.com/first-ninety-days-cto-vpe/",
              "type": "Article",
              "level": "4"
            }
          ]
        },
        {
          title: 'Agile',
          links: [
            {
              url: 'https://www.todoist.com/productivity-methods/getting-things-done',
              title: 'Getting Things Done (GTD) - A step-by-step method to organize tasks into a trusted system for focus and productivity.',
              type: 'Guide',
              level: '1'
            },
            {
              url: 'https://www.todoist.com/productivity-methods/kanban',
              title: 'Kanban - A visual method for managing tasks across stages.',
              type: 'Guide',
              level: '1'
            }
          ]
        },
        {
          title: 'Prioritization & Decision Making',
          links: [
            {
              url: 'https://www.todoist.com/productivity-methods/eisenhower-matrix',
              title: 'The Eisenhower Matrix – method to sort tasks by urgency and importance.',
              type: 'Guide',
              level: '2'
            },
            {
              url: 'https://www.todoist.com/productivity-methods/eat-the-frog',
              title: 'Eat the Frog - Do your hardest task first.',
              type: 'Guide',
              level: '1'
            },
            {
              url: 'https://www.todoist.com/productivity-methods/commitment-inventory',
              title: 'Commitment Inventory - Review commitments, cut non-essentials, focus time on priorities.',
              type: 'Guide',
              level: '2'
            },
            {
              url: 'https://fs.blog/smart-decisions/',
              title: 'A practical guide from Farnam Street on how to make better decisions using proven tools and mental models.',
              type: 'Article',
              level: '4'
            }
          ]
        },
        {
          title: 'Team Management',
          links: [
            {
              url: 'https://teamtopologies.com/book',
              title: 'Practical guide "Team Topologies" that helps tech teams organize and work together better by using four team types and three ways to collaborate, making it easier to deliver software quickly and safely.',
              type: 'Book',
              level: '4'
            }
          ]
        },
        {
          title: 'Goals',
          links: [
            {
              url: 'https://www.todoist.com/productivity-methods/okrs-objectives-key-results',
              title: 'OKRs - A goal-setting method for individuals and teams.',
              type: 'Guide',
              level: '3'
            },
            {
              url: 'https://www.todoist.com/productivity-methods/smart-goals',
              title: 'SMART Goals - Set clear, trackable goals with 5 criteria.',
              type: 'Guide',
              level: '2'
            }
          ]
        },
        {
          title: 'Time Management',
          links: [
            {
              url: 'https://www.todoist.com/productivity-methods/time-blocking',
              title: 'Time Blocking - Plan your day by assigning time slots to tasks for focus and productivity.',
              type: 'Guide',
              level: '1'
            },
            {
              url: 'https://www.todoist.com/productivity-methods/pomodoro-technique',
              title: 'Pomodoro Technique - Work in 25-minute focused sessions with short breaks.',
              type: 'Guide',
              level: '1'
            }
          ]
        },
        {
          title: 'Productivity',
          links: [
            {
              url: 'https://www.todoist.com/productivity-methods/systemist',
              title: "Systemist - A simple productivity system to help you stay organized and prioritize tasks.",
              type: 'Guide',
              level: '2'
            },
            {
              url: 'https://www.todoist.com/productivity-methods/medium-method',
              title: 'Medium Method - A simple method combining paper notes with digital tools for organization and productivity.',
              type: 'Guide',
              level: '2'
            }
          ]
        },
        {
          title: 'Communication, and Presentation',
          links: [
            {
              "title": "(Jan 2021) How to present to executives",
              "url": "https://lethain.com/present-to-executives/",
              "type": "Article",
              "level": "3"
            }
          ]
        }
      ]
    },
    {
      id: 'design',
      title: '09. Design (UX/UI)',
      subsections: [
        { title: 'Accessibility', links: [] },
        { title: 'Documented design flows', links: [] },
        {
          "title": "Design tools",
          "links": [
            {
              "url": "https://lab.interface-design.co.uk/11-best-practices-for-planning-tool-ux-design-2b6f0e94d56c",
              "title": "(Sep 2020) 11 simple UX tips to design better planning tools – from layout and interactions to visual hierarchy and data clarity.",
              "type": "Article",
              "level": "1"
            }
          ]
        },
        {
          "title": "Design Principles",
          "links": [
            {
              "url": "https://goodpractices.design/",
              "title": "(Mar 2025) GoodPractices.Design – Learn everything you need to become a better designer standards, conventions and more.",
              "type": "Guide",
              "level": "2"
            },
            {
              "url": "https://support.animaapp.com/en/articles/6300035-figma-best-practices",
              "title": "(Jul 2023) Anima’s guide to Figma best practices – naming layers, using frames, components, and making designs responsive for better handoff to developers.",
              "type": "Guide",
              "level": "1"
            },
            {
              "url": "https://www.figma.com/resource-library/web-design/",
              "title": "(Mar 2024) Figma’s guide to web design fundamentals – covering layout, navigation, visual style, and responsive design with practical tips and examples.",
              "type": "Guide",
              "level": "1"
            },
            {
              "url": "https://www.uxpin.com/studio/blog/guide-design-consistency-best-practices-ui-ux-designers/",
              "title": "(Aug 2024) UXPin’s guide to 9 best practices for consistent UI/UX design – covering visual, functional, internal, and external consistency with practical tips.",
              "type": "Guide",
              "level": "1"
            },
            {
              "url": "https://www.nngroup.com/articles/usability-101-introduction-to-usability/",
              "title": "(Jan 2012) Jakob Nielsen explains usability basics – learnability, efficiency, memorability, errors, and satisfaction – and why they matter in design.",
              "type": "Guide",
              "level": "1"
            },
            {
              "url": "https://www.hubble.team/blog/usability-testing-guide",
              "title": "(May 2025) Hubble’s beginner-friendly guide to usability testing – covering planning, methods, and tools for better user experience.",
              "type": "Guide",
              "level": "1"
            },
            {
              "url": "https://medium.com/design-bootcamp/the-ultimate-design-principles-guide-for-developers-d4aa58937283",
              "title": "(Sep 2023) A comprehensive guide for developers to understand essential design principles – from visual design and UX to accessibility and collaboration.",
              "type": "Guide",
              "level": "1"
            }
          ]
        }
      ]
    },
    {
      id: 'team-satisfaction',
      title: '10. Team Satisfaction',
      subsections: [
        { title: 'Tooling satisfaction', links: [] },
        { title: 'Ownership mindset', links: [] },
        { title: 'Talent growth', links: [] },
        {
          title: 'Culture',
          links: [
            {
              "title": "(Apr 2020) The Developer Culture Test – A modern framework to evaluate engineering environments",
              "url": "https://blog.pragmaticengineer.com/the-developer-culture-test/",
              "type": "Article",
              "level": "2"
            }
          ]
        },
        {
          "title": "Team collaboration",
          "links": [
            {
              "title": "(Jun 2018) Staying on the path to high performing teams",
              "url": "https://lethain.com/durably-excellent-teams/",
              "type": "Article",
              "level": "2"
            }
          ]
        },
        {
          title: 'Collaboration & Mentorship',
          links: [
            {
              url: 'https://www.fastcompany.com/3027135/inside-the-pixar-braintrust',
              title: 'An inside look at Pixar’s Braintrust – a feedback group that helps filmmakers improve their stories through honest, peer-driven collaboration.',
              type: 'Article',
              level: '4'
            }
          ]
        }
      ]    
    }
  ];

  return (
    <div className="page">
      <Navigation />

      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Guide to better software</h1>
            <div className="hero-description">
              <p>
                A guide to help engineering leaders navigate the changes to their teams, processes, and leadership skills to achieve the best possible quality for their software as their company grows.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-filters">
        <div className="section-content">
          <h3 className="filters-title">Filters</h3>
          <div className="filters-groups">
            <div className="filters-group">
              <h4 className="filters-group-title">Maturity Model Level</h4>
              <div className="filters-container">
                {filters.filter(f => f.id.startsWith('level-')).map(filter => (
                  <label key={filter.id} title={filter.title} className={`filter-tag ${selectedFilters.includes(filter.id) ? 'active' : ''}`}>
                    <input
                      type="checkbox"
                      checked={selectedFilters.includes(filter.id)}
                      onChange={() => toggleFilter(filter.id)}
                    />
                    {filter.label}
                  </label>
                ))}
              </div>
            </div>
            <div className="filters-group">
              <h4 className="filters-group-title">Content Type</h4>
              <div className="filters-container">
                {filters.filter(f => !f.id.startsWith('level-')).map(filter => (
                  <label key={filter.id} title={filter.title} className={`filter-tag ${selectedFilters.includes(filter.id) ? 'active' : ''}`}>
                    <input
                      type="checkbox"
                      checked={selectedFilters.includes(filter.id)}
                      onChange={() => toggleFilter(filter.id)}
                    />
                    {filter.label}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-resources">
        <div className="section-content">
          <h3 className="section-title-regular">Resources</h3>
        </div>
      </section>

      {sections.map((section, index) => (
        <Section key={section.id} {...section} />
      ))}

      <div className="section-last"></div>

    </div>
  );
}

export default BestPractices;
