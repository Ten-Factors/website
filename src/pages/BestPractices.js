import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

function BestPractices() {
  const [expandedSections, setExpandedSections] = useState({});
  const [animatingSections, setAnimatingSections] = useState({});
  const [selectedFilters, setSelectedFilters] = useState([]);

  // Handle URL hash on initial load and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove the # symbol
      if (hash) {
        const sections = hash.split(',');
        const newExpandedSections = {};
        sections.forEach(section => {
          newExpandedSections[section] = true;
        });
        setExpandedSections(newExpandedSections);

        // Scroll to the first section after a short delay
        setTimeout(() => {
          const firstSection = document.querySelector(`#section-${sections[0]}`);
          if (firstSection) {
            const yOffset = -120;
            const yPosition = firstSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: yPosition, behavior: 'smooth' });
          }
        }, 100);
      }
    };

    // Handle initial load
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const filters = {
    maturityLevels: [
      { id: 'level-1', label: 'Level 1 (Essentials)', title: 'Fundamental practices to start with' },
      { id: 'level-2', label: 'Level 2 (Developing)', title: 'Core practices for early teams' },
      { id: 'level-3', label: 'Level 3 (Stable)', title: 'Essential practices for stable teams' },
      { id: 'level-4', label: 'Level 4 (Mature)', title: 'Established practices for growing teams' },
      { id: 'level-5', label: 'Level 5 (Excellence)', title: 'Advanced practices for optimized teams' },
    ],
    infrastructure: [
      { id: 'java', label: 'Java', title: 'Java specific practices and guidelines' },
      { id: 'dotnet', label: '.NET', title: '.NET specific practices and guidelines' },
      { id: 'python', label: 'Python', title: 'Python specific practices and guidelines' },
      { id: 'golang', label: 'Golang', title: 'Golang specific practices and guidelines' },
      { id: 'ruby', label: 'Ruby', title: 'Ruby specific practices and guidelines' },
      { id: 'nodejs', label: 'Node.js', title: 'Node.js specific practices and resources' },
      { id: 'javascript', label: 'JavaScript', title: 'JavaScript specific practices and guidelines' },
      { id: 'react', label: 'React', title: 'React specific practices and guidelines' },
      { id: 'angular', label: 'Angular', title: 'Angular specific practices and guidelines' },
      { id: 'vue', label: 'Vue.js', title: 'Vue specific practices and guidelines' },
      { id: 'aws', label: 'AWS', title: 'Amazon Web Services specific practices' },
      { id: 'mongodb', label: 'MongoDB', title: 'MongoDB specific practices and guidelines' },
      { id: 'docker', label: 'Docker', title: 'Docker specific practices and guidelines' },
      { id: 'kubernetes', label: 'Kubernetes', title: 'Kubernetes specific practices and guidelines' },
    ],
    contentTypes: [
      { id: 'article', label: 'Article' },
      { id: 'guide', label: 'Guide' },
      { id: 'platform', label: 'Platform' },
      { id: 'video', label: 'Video' },
      { id: 'podcast', label: 'Podcast' },
      { id: 'book', label: 'Book' },
    ],
  };

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

    // Update expanded sections state
    const newExpandedSections = {
      ...expandedSections,
      [sectionId]: !expandedSections[sectionId]
    };
    setExpandedSections(newExpandedSections);

    // Update URL hash with expanded sections
    const expandedSectionIds = Object.entries(newExpandedSections)
      .filter(([_, isExpanded]) => isExpanded)
      .map(([id]) => id);

    if (expandedSectionIds.length > 0) {
      window.history.replaceState(null, '', `#${expandedSectionIds.join(',')}`);
    } else {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  const shouldShowLink = (link) => {
    if (selectedFilters.length === 0) return true;

    // Group selected filters by type
    const selectedMaturityLevels = selectedFilters.filter(f => f.startsWith('level-'));
    const selectedInfrastructure = selectedFilters.filter(f => filters.infrastructure.some(i => i.id === f));
    const selectedContentTypes = selectedFilters.filter(f => filters.contentTypes.some(c => c.id === f));

    // Get link's filters
    const linkFilters = {
      maturityLevel: link.level ? `level-${link.level}` : null,
      contentType: link.type ? link.type.toLowerCase() : null,
      infrastructure: link.infrastructure || []
    };

    // If any filter group is selected, the link must match at least one filter from that group
    if (selectedMaturityLevels.length > 0 && !selectedMaturityLevels.includes(linkFilters.maturityLevel)) {
      return false;
    }

    if (selectedContentTypes.length > 0 && !selectedContentTypes.includes(linkFilters.contentType)) {
      return false;
    }

    if (selectedInfrastructure.length > 0 && 
        (!linkFilters.infrastructure.length || 
         !selectedInfrastructure.some(f => linkFilters.infrastructure.includes(f)))) {
      return false;
    }

    return true;
  };

  const Section = ({ id, title, subsections }) => {
    const isExpanded = expandedSections[id];
    const isAnimating = animatingSections[id];

    // Filter subsections and count visible links
    const filteredSubsections = subsections
      .map(subsection => ({
        ...subsection,
        links: subsection.links?.filter(shouldShowLink) || []
      }));
      // .filter(subsection => subsection.links.length > 0);
    
    const totalLinks = filteredSubsections.reduce((acc, subsection) => {
      return acc + (subsection.links?.length || 0);
    }, 0);

    return (
      <section className={`section section-best-practices ${totalLinks == 0 ? 'section-hidden' : ''}`}>
        <div className="section-content">
          <div 
            id={`section-${id}`}
            className="section-collapsible-header" 
            onClick={() => toggleSection(id)}
          >
            {isExpanded && totalLinks > 0 ? <FaChevronDown /> : <FaChevronRight />}
            <h2 className="section-title">
              {title}
              <span className="section-links-count">{totalLinks} resources</span>
            </h2>
          </div>

          {isExpanded && (
            <div className={`section-collapsible-body ${isAnimating ? 'animating' : ''}`}>
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
                              {link.type && <span className={`content-type-badge ${(link.type || '').toLowerCase()}`}>{link.type}</span>}
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
          title: '01.1 – Local Setup & Development Environment', 
          links: [
            {
              url: 'http://x.x',
              title: '(TBD) Dev Containers; Docker Compose; ',
            },
            {
              url: 'http://x.x',
              title: '(TBD) Makefile Starter Patterns; ',
            },
            {
              url: 'http://x.x',
              title: '(TBD) Automate bootstrap scripts',
            },
            {
              url: 'http://x.x',
              title: '(TBD) local env',
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Tilt Dev Environment",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Skaffold for Local K8s",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) mkcert HTTPS Certificates",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Pre-Commit Dockerized Hooks",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) VS Code Dev Containers Examples",
            },
          ]
        },
        {
          title: '01.2 – Software Design Principles',
          links: [
            {
              "url": "http://x.x",
              "title": "(TBD) YAGNI Rule Poster",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Clean Code by Robert C. Martin",
            },
            {
              url: 'http://x.x',
              title: '(TBD) SOLID Principles Cheat Sheet',
            },
            {
              url: 'http://x.x',
              title: '(TBD) Design Patterns: Elements of Reusable Object-Oriented Software',
            },
            {
              url: 'http://x.x',
              title: '(TBD) Clean Architecture by Robert C. Martin',
            },
            {
              url: 'http://x.x',
              title: '(TBD) Refactoring by Martin Fowler',
            },
            {
              url: 'http://x.x',
              title: '(TBD) GRASP Patterns Overview',
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Design Heuristics by Lakos",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Elegant Objects Principles",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Hexagonal Architecture Primer",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Layered Architecture Pattern",
            },
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
          title: '01.3 – System Design & Modularity',
          links: [
            {
              "url": "http://x.x",
              "title": "(TBD) Microservices Patterns by Chris Richardson",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) The Reactive Manifesto",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) C4 Model for Software Architecture",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Service Mesh Best Practices",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Strangler Fig Pattern",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Backend-for-Frontend Pattern",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Event-Sourcing Blueprint",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Monorepo vs Polyrepo Guide",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Ports and Adapters Playbook",
            },
            {
              "title": "(Oct 2018) Practical TLA+: Planning Driven Development by Hillel Wayne",
              "url": "https://www.amazon.com/Practical-TLA-Planning-Driven-Development/dp/1484238281",
              "type": "Book",
              "level": "4"
            },
            {
              "url": "https://www.freecodecamp.org/news/microservices-vs-monoliths-explained/",
              "title": "(Apr 2024) Beginner's guide by freeCodeCamp on pros/cons of monolithic vs microservices architectures.",
              "type": "Guide",
              "level": "1"
            }
          ]
        },
        {
          title: '01.4 – Scalability & Load balancing', 
          links: [
            {
              "url": "http://x.x",
              "title": "(TBD) Google SRE Workbook",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Kubernetes Autoscaling Guide",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) CDN Strategy Playbook",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Capacity Planning Handbook",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Traffic Shaping Patterns",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Load Balancing Patterns",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Sharding Strategies Catalog",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Rate Limiting Patterns",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Auto-Scaling Policies Matrix",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Service Mesh Traffic Split",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Edge Caching Primer",
            },
            {
              "url": "https://www.cloudzero.com/blog/horizontal-vs-vertical-scaling/",
              "title": "(May 2025) CloudZero guide to horizontal vs vertical scaling: pros, cons, and when to use each.",
              "type": "Guide",
              "level": "2",
              "infrastructure": ["aws", "nodejs"]
            },
            {
              "url": "https://www.mongodb.com/resources/basics/horizontal-vs-vertical-scaling",
              "title": "(May 2025) MongoDB's guide on horizontal vs vertical scaling for database needs.",
              "type": "Guide",
              "level": "2",
              "infrastructure": ["mongodb"]
            },
            {
              "url": "https://www.datadoghq.com/knowledge-center/auto-scaling/",
              "title": "(May 2025) Datadog's guide to auto-scaling: horizontal vs vertical scaling, setup examples, and use cases.",
              "type": "Guide",
              "level": "3"
            }
          ] 
        },
        {
          title: '01.5 – Cloud & Serverless Architecture', 
          links: [
            {
              "url": "https://www.datadoghq.com/knowledge-center/serverless-architecture/aws-serverless-landscape/",
              "title": "(May 2025) Datadog's guide to AWS serverless computing: key services, use cases, and monitoring best practices.",
              "type": "Guide",
              "level": "2",
              "infrastructure": ["aws"]
            },
            {
              "url": "https://www.datadoghq.com/knowledge-center/serverless-architecture/serverless-vs-containers/",
              "title": "(May 2025) Datadog compares serverless and container architectures, outlining benefits, challenges, and use cases.",
              "type": "Guide",
              "level": "3"
            },
            {
              "url": "http://x.x",
              "title": "(TBD) AWS Well-Architected Framework",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Azure Architecture Center",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Google Cloud Serverless Best Practices",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Serverless Framework Handbook",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) CNCF Cloud Native Landscape",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Serverless First Mindset",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Multi-Cloud Strategy Guide",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) EventBridge Integration Patterns",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Cloud Landing Zone Toolkit",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Policy as Code Cookbook",
            },
          ]
        },
        {
          title: '01.6 – Logging & Monitoring', 
          links: [
            {
              "url": "http://x.x",
              "title": "(TBD) ELK Stack Practical Guide",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Prometheus Monitoring Basics",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Grafana Loki Handbook",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) SLO Cookbook by Google",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Datadog Observability Handbook",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Structured Logging Fields Standard",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Log Enrichment Patterns",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) RED vs USE Quick Poster",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Root-Cause Drilldown Workflow",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Observability Maturity Model",
            },
          ]
        },
        {
          title: '01.7 – Regulatory Compliance', 
          links: [
            {
              "url": "http://x.x",
              "title": "(TBD) GDPR Compliance Checklist",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) OWASP SAMM",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) ISO 27001 Controls Reference",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) SOC 2 Readiness Guide",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) PCI DSS Quick Reference Guide",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) CCPA Compliance Checklist",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) HIPAA Compliance Checklist",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Data Residency Decision Tree",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Privacy by Design Checklist",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Secure SDLC Controls Map",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Compliance Evidence Vault",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Continuous Control Monitoring",
            },
          ]
        },
        {
          title: '01.8 – Resilience & Fault Tolerance', 
          links: [
            {
              "url": "http://x.x",
              "title": "(TBD) Chaos Engineering Principles",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Circuit Breaker Pattern Catalog",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Netflix Simian Army Overview",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Bulkhead and Retry Patterns Guide",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Resilience4j Documentation",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Chaos Monkey Lite Script",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Error Budget Policy",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Latency Injection Toolset",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Multi-Region Active-Active Playbook",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Stateful Service Failover Guide",
            },
          ]
        }
      ]
    },
    {
      id: 'infrastructure',
      title: '02. Infrastructure',
      subsections: [
        {
          title: '02.1 – Infrastructure Planning', 
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
            },
            {
              "url": "http://x.x",
              "title": "(TBD) The Phoenix Project – Modern Ops fable",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) AWS Well-Architected Reliability Pillar",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Infrastructure as Code – Patterns & Practices",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Team Topologies – Platform Model",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Capacity Planning Handbook",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Platform Engineering Roadmap",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Infrastructure Capability Matrix",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Infra Cost Forecast Model",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Service Catalogue Template",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Golden Path Reference",
            },
          ]
        },
        {
          title: '02.2 – Containerization & Orchestration', 
          links: [
            {
              "url": "http://x.x",
              "title": "(TBD) Kubernetes in Action",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Docker Deep Dive",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) CNCF Production Readiness Checklist",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Helm Charts Best Practices",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Kubernetes Hardening Guide",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) K8s Pod Disruption Budgets",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Cluster API Management",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Kustomize Overlay Patterns",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Operator Framework Basics",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Pod Security Standards",
            },
          ] 
        },
        {
          title: '02.3 – CI/CD Process Maturity', 
          links: [
            {
              "url": "http://x.x",
              "title": "(TBD) Accelerate – State of DevOps",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Continuous Delivery (Humble & Farley)",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) CI/CD Maturity Model",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) DORA Four Key Metrics Playbook",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) GitHub Actions Best Practices",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Trunk-Based Development Principles",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) GitOps Workflow Primer",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Progressive Delivery Metrics",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Canary Analysis Automation",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Pipeline Secrets Policy",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Deployment Frequency Tracker",
            },
          ] 
        },
        {
          title: '02.4 – Credentials & Secrets Management', 
          links: [
            {
              "url": "http://x.x",
              "title": "(TBD) Twelve-Factor App – Config Principle",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) HashiCorp Vault Best Practices",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Secret Management for DevOps",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Kubernetes Secrets Management Guide",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) OWASP Top Ten – Secrets Sprawl",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) AWS Secrets Manager Best Practices",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) HashiCorp Vault Handbook",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Secrets Rotation Runbook",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Just-In-Time Secrets Access",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Secrets Scanning Git Hooks",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Customer-Managed Keys Guide",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Secret Zero Problem Solution",
            },
          ] 
        },
        {
          title: '02.5 – Cost Management & Efficiency', 
          links: [
            {
              "url": "http://x.x",
              "title": "(TBD) FinOps – Cloud Financial Management",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) AWS Cost Optimization Framework",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Kubernetes Cost Allocation Guide",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Rightsizing Cloud Resources Playbook",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Cloud Carbon Footprint Principles",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Cloud Cost Management Handbook",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) AWS Cost Management Best Practices",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Google Cloud Cost Management Best Practices",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Azure Cost Management Best Practices",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Spot Instances Playbook",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Savings Plan Selector",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Idle Resource Detection Bot",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Kubernetes HPA vs VPA Matrix",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Usage Anomaly Alerting",
            },
          ]
        },
        {
          title: '02.6 – Backup & Disaster Recovery', 
          links: [
            {
              "url": "http://x.x",
              "title": "(TBD) RTO and RPO Basics",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Disaster Recovery Planning for AWS",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Database Backup Strategies Handbook",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Testing Your Backups – Chaos Engineering",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) ISO 22301 Business Continuity Guide",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Disaster Recovery Planning for Azure",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Disaster Recovery Planning for GCP",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Immutable Backup Snapshots",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Backup Encryption Keys Map",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Restore Time Drill Checklist",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Cloud-Native DR Patterns",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Backup Policy as Code",
            },
          ]
        },
        {
          title: '02.7 – Monitoring & Alerting', 
          links: [
            {
              "url": "http://x.x",
              "title": "(TBD) Prometheus Up & Running",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) SLO-Based Alerting – Google SRE",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) OpenTelemetry Collector Guide",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Grafana Dashboards Best Practices",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) RED and USE Monitoring Methods",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Alert Fatigue Reduction Guide",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Runbook Automation Links",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) High-Cardinality Metrics Tips",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Blackbox Probing Toolkit",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Alert Maturity Scorecard",
            },
          ] 
        },
        {
          title: '02.8 – Security & Compliance (Infra-Level)', 
          links: [
            {
              "url": "http://x.x",
              "title": "(TBD) CIS Benchmarks for Cloud",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) NIST SP 800-53 Cloud Overlay",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) DevSecOps Playbook",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Zero Trust Network Architecture",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Cloud Security Posture Management Best Practices",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Cloud Native Security Controls",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Runtime Container Security Rules",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Infrastructure Threat Modeling",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Compliance as Code Pipeline",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Shared Responsibility Matrix",
            },
          ] 
        }
      ]
    },
    {
      id: 'engineering',
      title: '03. Engineering',
      subsections: [
        {
          title: '03.1 – Coding Standards & Style Guides', 
          links: [
            {
              "url": "http://x.x",
              "title": "(TBD) Clean Code",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Airbnb JavaScript Style Guide",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Google Java Style Guide",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Python PEP 8",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) EditorConfig for Teams",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Automated Linting in CI",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Pre-commit Hook Checklist",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Language-Specific Formatter Configs",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Commitlint Rules Collection",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Code Smell Catalogue",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Branch Naming Convention",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Style Guide Linter Bots",
            },
          ]
        },
        {
          title: '03.2 – Git Standards & Workflows', 
          links: [
            {
              "url": "http://x.x",
              "title": "(TBD) Git Flow Model",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Trunk-Based Development",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Conventional Commits",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Pull Request Template Guide",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Commit Message Ruleset",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Feature Flag Branching",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Semantic Versioning",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Git Hooks Library",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Monorepo Merge Strategy",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Draft Pull Request Policy",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Git Revert vs Reset Guide",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Release Branch Checklist",
            },
          ]
        },
        {
          title: '03.3 – Refactoring & Technical Debt Management',
          links: [
            {
              "url": "http://x.x",
              "title": "(TBD) Refactoring by Martin Fowler",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Technical Debt Quadrant",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Tidy First? Practice",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Boy Scout Rule",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Continuous Migration Strategy",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Tech Capital Roadmap",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Definition of Done Includes Debt Review",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Debt Register Kanban",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Refactor Friday Ritual",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Tech Debt SLAs",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Code Health Radar",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Legacy Code Seam Patterns",
            },
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
            },
            {
              "url": "https://refactoring.fm/p/from-tech-debt-to-tech-capital",
              "title": "(May 2025) Luca Rossi and Aviv Ben-Yosef explain how to shift from just fixing technical debt to building tech capital – long-term engineering investments that boost speed, tools, and data leverage.",
              "type": "Article",
              "level": "3"
            }
          ]
        },
        {
          title: '03.4 – Code Reviews',
          links: [
            {
              url: 'https://github.com/google/eng-practices/blob/master/review/index.md',
              title: "Google's guide to doing code reviews with clear, helpful feedback and clean code practices.",
              type: 'Guide',
              level: '2'
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Google Engineering Review Guide",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Review Checklist for Readability",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Small Pull Request Rule",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Two-Approver Policy",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Async Review Etiquette",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Reviewer Rotation Program",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) LGTM Is Not Enough Reminder",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Review SLA Timing Matrix",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Pair-Review Blitz Session",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Code Review Gamification",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Review Debt Dashboard",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Comment Style Guide",
            },
          ]
        },
        {
          "title": "03.5 – AI in Engineering Teams",
          "links": [
            {
              "url": "https://news.northeastern.edu/2025/02/07/jevons-paradox-ai-future/",
              "title": "(Feb 2025) AI efficiency paradox: more use, not less – Jevons Paradox revisited.",
              "type": "Article",
              "level": "1"
            },
            {
              "url": "https://refactoring.fm/p/how-engineering-teams-use-ai",
              "title": "(Mar 2025) Luca Rossi shares how real engineering teams use AI – covering code quality, documentation, testing, and the shift from solo to team workflows.",
              "type": "Article",
              "level": "2"
            },
            {
              "url": "http://x.x",
              "title": "(TBD) GitHub Copilot Playbook",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Prompt Engineering Cheat Sheet",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Pair-Programming with AI Guide",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) AI Test Generation Workflow",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Secure AI Usage Policy",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Jevons Paradox Awareness Note",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Team AI Retrospective Ritual",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) AI Pair-Coder Etiquette",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Prompt Library Repository",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Model Usage Cost Tracker",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) AI Security Red Lines",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) AI Bias Testing Checklist",
            },
          ]
        },
        {
          "title": "03.6 – Documentation",
          "links": [
            {
              "url": "http://x.x",
              "title": "(TBD) Docs-as-Code Approach",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Diátaxis Documentation Framework",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) C4 Architecture Diagrams",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Living README Pattern",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) ADR (Architecture Decision Record) Template",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Onboarding “Day 1” Playbook",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Documentation Review Sprint Ritual",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) ADR Automation Bot",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Code Comment Coverage Metric",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Screenshot-in-Docs Rule",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Docs Linter CI Step",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Architecture Image Vault",
            },
          ]
        }
      ]
    },
    {
      id: 'deployment',
      title: '04. Deployment',
      subsections: [
        {
          title: '04.1 – CI/CD Practices',
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
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Accelerate: The Science of Lean Software & DevOps",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) DORA Four Key Metrics Cheat Sheet",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Trunk-Based Development Principles",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Pipeline as Code Pattern",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Blue/Green and Canary Rollouts",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Test Pyramid for CI Pipelines",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) “Fail Fast” Build Break Policy",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Environment Promotion Gates",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Dependency Caching Strategies",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Static Analysis in Pipeline",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Secrets in CI Vault Plugin",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Pipeline Observability Dashboards",
            },
          ]
        },
        {
          title: '04.2 – Release Strategy', 
          links: [
            {
              "url": "http://x.x/",
              "title": "(TBD) Semantic Versioning Ruleset",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Release Train Model",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Progressive Delivery Playbook",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Release Readiness Checklist",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Argo Rollouts Canary Guide",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Dark Launch Technique",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Structured Changelog Template",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Version Freeze Calendar",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Rollback Confidence Score",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Release Health Dashboard",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Feature Freeze Policy",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Release Owner Role Guide",
            },
          ] 
        },
        {
          title: '04.3 – Deployment Documentation', 
          links: [
            {
              "url": "http://x.x/",
              "title": "(TBD) Deployment Runbook Template",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Step-by-Step Rollback Guide",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Environment Matrix Diagram",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Automation Script Reference Sheet",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Pre-Deployment Checklist",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Post-Deployment Verification Plan",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) DRY-Run Deployment Practice",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) ChatOps Deploy Command Help",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Deployment Decision Record",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Smoke Test Checklist",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Config Drift Detector Guide",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Release Notes Automation",
            },
          ] 
        },
        {
          title: '04.4 – Feature Flags',
          links: [
            {
              url: 'https://theproductmanager.com/topics/feature-flag-best-practices/',
              title: '(May 2022) How The Guardian’s dating platform using feature-flags and their best practies for feature flags management.',
              type: 'Article',
              level: '4'
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) LaunchDarkly Playbook",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Feature Toggle Patterns Catalog",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Kill-Switch Safety Net",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Flag Lifecycle Cleanup Policy",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Config as Data Approach",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Targeted Rollout Rules Matrix",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Metrics-Driven Flag Removal",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Flag Taxonomy Standard",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Flag Dependency Graph",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Metrics per Flag Dashboard",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Safe-Default Flag Policy",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Flag Sunsetting Ceremony",
            },
          ]
        },
        {
          title: '04.5 – Incident Management',
          links: [
            {
              url: 'https://www.pagerduty.com/',
              title: 'PagerDuty helps teams spot and fix problems fast with alerts and automation.',
              type: 'Platform',
              level: '2'
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Incident Command System (ICS) for Tech",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Sev-Level Classification Guide",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Blameless Postmortem Framework",
            },
            
            {
              "url": "http://x.x/",
              "title": "(TBD) PagerDuty On-Call Handbook",
            },
            
            {
              "url": "http://x.x/",
              "title": "(TBD) Five-Whys Root Cause Method",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Real-Time Incident War Room Checklist",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) After-Action Review Ritual",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Incident Rotation Calendar",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Incident Slack Template",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Mean Time to Restore Tracker",
            },
            
            {
              "url": "http://x.x/",
              "title": "(TBD) Incident Communication Plan",
            },
            
            {
              "url": "http://x.x/",
              "title": "(TBD) Post-mortem Action Bot",
            }
          ]
        },
        {
          title: '04.6 – Audit Trails & Deployment Logs',
          links: [
            {
              "url": "http://x.x/",
              "title": "(TBD) Immutable Log Design Pattern",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Structured Logging with JSON",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Centralized Log Aggregation Stack",
            },
            
            {
              "url": "http://x.x/",
              "title": "(TBD) Correlation ID Best Practice",
            },
            
            {
              "url": "http://x.x/",
              "title": "(TBD) Sensitive Data Redaction Rules",
            },
            
            {
              "url": "http://x.x/",
              "title": "(TBD) Tamper-Evident Audit Trail Framework",
            },
            
            {
              "url": "http://x.x/",
              "title": "(TBD) Log Retention & Rotation Policy",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Signed Log Bundles",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Immutable Storage Bucket Policy",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Log Scrubbing Patterns",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Request ID Propagation Standard",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Audit Query Cookbook",
            }
          ]
        }
      ]
    },
    {
      id: 'qa',
      title: '05. Quality Assurance',
      subsections: [
        {
          title: '05.1 – Software Quality Strategy',
          links: [
            {
              "title": "(May 2025) How to create software quality",
              "url": "https://lethain.com/quality/",
              "type": "Article",
              "level": "4"
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) ISO 25010 Product Quality Model",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Shift-Left Quality Mindset",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Quality Gates in CI/CD",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Definition of Done Includes Quality Metrics",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Team Quality KPIs Dashboard",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Continuous Improvement Loop (Plan – Do – Check – Act)",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Quality Risk Matrix",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Product Quality OKRs",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Quality Charter Document",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Test Debt Register",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Shift-Right Testing Plan",
            }
          ]
        },
        {
          title: '05.2 – Non-Functional Testing', 
          links: [
            {
              "url": "http://x.x/",
              "title": "(TBD) Performance Testing Lifecycle",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) OWASP Top 10 Security Testing",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Accessibility WCAG Checklist",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Chaos Engineering Experiments",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Reliability Stress Tests",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Usability Heuristic Evaluation",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Load Test Script Library",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Security Test Automation Stack",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Accessibility Linting Tools",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Chaos Toolkit Scenarios",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Resilience Score Report",
            }
          ] 
        },
        {
          title: '05.3 – Automated Tests', 
          links: [
            {
              "url": "http://x.x/",
              "title": "(TBD) Test Pyramid Principle",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Page Object Model for UI Tests",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Data-Driven Testing Pattern",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Parallel Test Execution in CI",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Flaky Test Detection Playbook",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Code Coverage Thresholds in Pipeline",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Contract Test Collection",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Mutation Score Gates",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Test Data Factory Pattern",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Snapshot Testing Guidelines",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Test Failure Analytics",
            }
          ]
        },
        {
          title: '05.4 – Cross-Platform and Compatibility Testing', 
          links: [
            {
              "url": "http://x.x/",
              "title": "(TBD) Browser Matrix Planning Sheet",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Mobile Device Farm Strategy",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Responsive Design Verification Guide",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) API Contract Compatibility Checks",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Dependency Version Support Policy",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Legacy Browser Fallback Rules",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) BrowserStack Device Matrix",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) API Version Deprecation Plan",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Responsive Screenshot Diff",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Legacy Support Sunset List",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Cross-DB Compatibility Suite",
            }
          ] 
        },
        {
          title: '05.5 – Test Case Coverage', 
          links: [
            {
              "url": "http://x.x/",
              "title": "(TBD) Risk-Based Coverage Mapping",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Requirements Traceability Matrix",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Critical User Journey Coverage List",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Mutation Testing Review",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Coverage Heat Map Dashboard",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Gap Analysis Retrospective",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Risk Heatmap Overlay",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Coverage Trend Graph",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Exploratory Session Notes",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Hotspot Code Map",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Coverage Gap Alert",
            }
          ]
        },
        {
          title: '05.6 – Test Strategy & Methodologies',
          links: [
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
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Behavior-Driven Development Playbook",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Test-Driven Development Cycle",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Acceptance Test–Driven Development Guide",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Exploratory Testing Charter Sessions",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Context-Driven Testing Principles",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Mobile Testing Pyramid",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Zero Bug Policy Guide",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Exploratory Charters Board",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Session-Based Test Management",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Example Mapping Workshop",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) BDD Living Documentation",
            }
          ]
        },
        {
          title: '05.7 – Bug Management & Reporting',
          links: [
            {
              "url": "http://x.x/",
              "title": "(TBD) Severity and Priority Matrix",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Blameless Bug Triage Meeting",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Repro Steps Template",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Defect Escape Rate Metric",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Root Cause Analysis with 5 Whys",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Bug Bash Event Playbook",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Defect SLA Timetable",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Duplicate Bug Detector Bot",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Bug Age Histogram",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Escaped Defect Drilldown",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Bug Bash Scoreboard",
            }
          ]
        },
        {
          title: '05.8 – Test Environment Management',
          links: [
            {
              "url": "http://x.x/",
              "title": "(TBD) Infrastructure as Code for Test Labs",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Environment Parity Checklist",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Synthetic Test Data Generation Policy",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Service Virtualization Toolkit",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Environment Booking Calendar",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Automated Environment Health Checks",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Environment Drift Alerts",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Service Mock Registry",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Data Masking Policy",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Ephemeral Test Environments",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Environment Booking Bot",
            }
          ]
        },
        {
          title: '05.9 – Test Documentation & Knowledge Sharing',
          links: [
            {
              "url": "http://x.x/",
              "title": "(TBD) Living Test Plan Format",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) One-Page Test Summary Report",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Lessons Learned Wiki",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Test Case Review Workshop",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) QA Brown-Bag Sessions",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Documentation as Code Approach",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Test Case Tagging Standard",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) QA Knowledge Base Index",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Flaky Test Hall of Fame",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Weekly Test Digest",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Test Documentation Retention Policy",
            }
          ]
        }
      ]
    },
    {
      id: 'security',
      title: '06. Security',
      subsections: [
        {
          title: '06.1 – Secure Coding Guidelines', 
          links: [
            {
              "url": "http://x.x/",
              "title": "(TBD) OWASP Top Ten Checklist",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) SEI CERT Secure Coding Standard",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Secure Coding Handbook",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Input Validation Cheat Sheet",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Least-Privilege Design Rule",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Threat Modeling Playbook",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Secure Defaults Library",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Secrets Scan Pipeline",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Dependency Vulnerability Alerts",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Output Encoding Cookbook",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Security Code Review Checklist",
            }
          ]
        },
        {
          title: '06.2 – Access Control & Identity Management', 
          links: [
            {
              "url": "http://x.x/",
              "title": "(TBD) Zero Trust Architecture Guide",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) RBAC Matrix Template",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) OAuth 2.1 Best Practice",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) OpenID Connect Core Spec",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Multi-Factor Authentication Playbook",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Just-in-Time Access Policy",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Identity Proofing Guide",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Fine-Grained Access Tokens",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Privileged Access Workflow",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Service Account Inventory",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Access Review Automation",
            }
          ]
        },
        {
          title: '06.3 – Audit Logs & Monitoring', 
          links: [
            {
              "url": "http://x.x/",
              "title": "(TBD) Immutable Logging Pattern",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Centralized Log Aggregation Stack",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Correlation ID Standard",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Log Retention Policy",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) SIEM Use Case Library",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Real-Time Alerting Ruleset",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Anomaly Detection Rules",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Log Integrity Verification",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Audit Dashboard Widgets",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Audit Trail Encryption Keys",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) GDPR Audit Data Locator",
            }
          ]
        },
        {
          title: '06.4 – Disaster Recovery & Business Continuity Plan', 
          links: [
            {
              "url": "http://x.x/",
              "title": "(TBD) RTO/RPO Calculator",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) DR Runbook Template",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Business Impact Analysis Worksheet",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Chaos Drill Schedule",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Failover Automation Guide",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Tabletop Exercise Playbook",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Alternate Workspace Plan",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Communication Tree Chart",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Data Restore Certification",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) DR Budget Breakdown",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Crisis Simulation Deck",
            }
          ]
        },
        {
          title: '06.5 – Backup Policy & Data Protection', 
          links: [
            {
              "url": "http://x.x/",
              "title": "(TBD) 3-2-1 Backup Rule",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Encryption at Rest Guideline",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Cross-Region Backup Plan",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Automated Backup Verification Script",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Data Lifecycle Retention Matrix",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Key Rotation Calendar",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Immutable Backup Ledger",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Geo-Fence Backup Storage",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Backup Window Schedule",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Backup Compression Standards",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Backup Cost Estimator",
            }
          ]
        },
        {
          title: '06.6 – Compliance & Legal Requirements', 
          links: [
            {
              "url": "http://x.x/",
              "title": "(TBD) GDPR Mapping Checklist",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) HIPAA Technical Safeguards",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) SOC 2 Control Catalog",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) ISO 27001 Annex A Controls",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Privacy Impact Assessment Template",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Data Processing Agreement Boilerplate",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Data Classification Matrix",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Record Retention Schedule",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Vendor Risk Checklist",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Data Subject Request Playbook",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) Incident Notification Template",
            }
          ]
        },
        {
          title: '06.7 – Security Standards & Frameworks',
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
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) CIS Benchmarks Library",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) NIST Cybersecurity Framework",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) ISO 27001:2022 Standard",
            },
            {
              "url": "http://x.x/",
              "title": "(TBD) OWASP SAMM Model",
            },
            {
              "url": "http://x.x/",
              "title": "PCI DSS 4.0 Quick Reference",
            },
            {
              "url": "http://x.x/",
              "title": "MITRE ATT&CK Matrix",
            },
            {
              "url": "http://x.x/",
              "title": "Security Control Gap Matrix",
            },
            {
              "url": "http://x.x/",
              "title": "Framework Mapping Sheet",
            },
            {
              "url": "http://x.x/",
              "title": "Control Implementation Guides",
            },
            {
              "url": "http://x.x/",
              "title": "Continuous Compliance Dashboards",
            },
            {
              "url": "http://x.x/",
              "title": "Security Baseline Profiles",
            }
          ]
        },
        {
          title: '06.8 – DevSecOps Maturity',
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
            },
            {
              "url": "http://x.x",
              "title": "(TBD) OWASP DevSecOps Maturity Model",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Security as Code Pipeline Guide",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Shift-Left Security Playbook",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) SAST to DAST Progression Path",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Dependency Scanning Automation",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Threat Modeling as Code",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Policy as Code Catalog",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Secrets Rotation Pipeline",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Threat Model Automation",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Secure Image Registry",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) DevSecOps KPIs Board",
            }
          ]
        },
        {
          title: '06.9 – Vulnerability Management',
          links: [
            {
              "url": "http://x.x",
              "title": "(TBD) CVSS Scoring Guide",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Patch Tuesday Workflow",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Vulnerability Triage Matrix",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) SBOM Generation Toolkit",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Bug Bounty Program Guidelines",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Penetration Testing Schedule",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Vulnerability SLA Matrix",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Exploitability Scoring Sheet",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Patch Funnel Board",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Vulnerability Disclosure Policy",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Security Patch Window Calendar",
            }
          ]
        },
        {
          title: '06.10 – Security Awareness & Training',
          links: [
            {
              "url": "http://x.x",
              "title": "(TBD) Phishing Simulation Campaign",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Annual Security Training Deck",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Secure Coding Lunch-and-Learn Series",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Security Champions Program",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Just-in-Time Security Tips Bot",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Onboarding Security Checklist",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Secure Coding Quiz",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Monthly Phish Report Card",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Security Newsletter Digest",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Capture-the-Flag Event",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Security Awareness Badges",
            }
          ]
        }
      ]
    },
    {
      id: 'documentation',
      title: '07. Documentation',
      subsections: [
        {
          title: '07.1 – Requirements & Specifications', 
          links: [
            {
              "url": "http://x.x",
              "title": "(TBD) INVEST User Story Checklist",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) SMART Acceptance Criteria Template",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) System Requirements Specification (SRS) Outline",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) User Story Mapping Workshop",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) FURPS+ Quality Model",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Change-Control Log Best Practice",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Use Case Diagram Kit",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) NFR Catalogue",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Acceptance Criteria Library",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Traceability Tooling Guide",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Change Impact Matrix",
            }
          ] 
        },
        {
          title: '07.2 – Installation & Setup Guides', 
          links: [
            {
              "url": "http://x.x",
              "title": "(TBD) README-Driven Development Pattern",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) One-Command Setup Script (Makefile)",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Environment Variables Sample File",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Screenshot-Based Walkthrough",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Infrastructure as Code Quick Start",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Troubleshooting FAQ Section",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) GIF Walkthrough Library",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Quickstart Snippet Collection",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Install Troubleshooting Tree",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Config Reference Table",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Setup Lint Script",
            }
          ] 
        },
        {
          title: '07.3 – Code Documentation', 
          links: [
            {
              "url": "http://x.x",
              "title": "(TBD) Docstring Style Guide (e.g. Google / PEP 257)",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) JSDoc / Typedoc Reference Pattern",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Swagger / OpenAPI Spec First",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Architecture Decision Record (ADR) Format",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) C4 Model Diagrams",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Inline Comment “Why-Not-What” Rule",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) API Example Gallery",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) UML Autogeneration Tool",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Doc Drift Detector",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Inline Todo Debt Tags",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Cross-Link Bot",
            }
          ] 
        },
        {
          title: '07.4 – Onboarding Documentation',
          links: [
            {
              "title": "(Mar 2022) The Ultimate Guide to Onboarding Software Engineers",
              "url": "https://leadership.garden/onboarding-engineers/",
              "type": "Guide",
              "level": "2"
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Day-One Engineer Checklist",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) 30-60-90 Onboarding Plan",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Tech Stack Overview Map",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Company Glossary of Terms",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Pair-Programming Rotation Schedule",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) FAQ for New Starters",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Buddy Checklist Card",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) First Issue Starter Pack",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Product Tour Video Script",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Org Chart Snapshot",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Access Request Cheat Sheet",
            }
          ]
        },
        {
          title: '07.5 – Knowledge Sharing Rituals', 
          links: [
            {
              "url": "http://x.x",
              "title": "(TBD) Lunch-and-Learn Sessions",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Brown-Bag Demo Friday",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Documentation Day Sprint",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Lightning Talk Series",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Peer Teaching Circles",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Internal Blog Posts",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Internal Podcast Series",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Ask-Me-Anything Sessions",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Tech Digest Newsletter",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Wiki Gardening Day",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Community of Practice Group",
            }
          ] 
        },
        {
          title: '07.6 – Documentation Platforms',
          links: [
            {
              url: 'https://www.gitbook.com/',
              title: 'GitBook is a modern platform that helps teams create, manage, and publish beautiful, easy-to-use documentation for products, APIs, and internal knowledge.',
              type: 'Platform',
              level: '3'
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Docs-as-Code Pipeline",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) GitBook Content Model",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Docusaurus Static Site",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) MkDocs Material Theme",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Confluence Space Blueprint",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Notion Knowledge Base",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Docs Search Analytics",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Doc Version Badge",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Content Lint Ruleset",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Code Snippet Embed Guide",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Docs Dark Mode Style",
            }
          ]
        },
        {
          title: '07.7 – Product Thinking in Documentation',
          links: [
            {
              url: 'https://thisisimportant.net/posts/write-better-docs-with-a-product-thinking-mindset/',
              title: 'A guide that shows how applying product thinking to documentation can make it more helpful and focused on user needs.',
              type: 'Article',
              level: '2'
            },
            {
              "url": "http://x.x",
              "title": "(TBD) User Persona Snapshot",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Jobs-To-Be-Done Stories",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Progressive Disclosure Flow",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Documentation KPIs Dashboard",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Feedback Loop Survey",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Doc User Journey Map",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Outcome-Oriented Docs Format",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Success Criteria Table",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Task-Based Doc Structure",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) User Feedback Loop Board",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Documentation Net Promoter Score",
            }
          ]
        },
        {
          title: '07.8 – Incident Documentation',
          links: [
            {
              url: 'https://incident.io/guide',
              title: 'A practical guide from incident.io that helps teams handle incidents better—from on-call setup to learning from mistakes—using clear steps and real-world advice.',
              type: 'Guide',
              level: '3'
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Blameless Postmortem Template",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Incident Timeline Builder",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Severity Matrix Reference",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Five Whys Root Cause Sheet",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Action Items Tracker",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Incident Tag Taxonomy",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Incident Type Taxonomy",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Action Item Tracker Bot",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Learning Review Canvas",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Incident Severity Badges",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Incident Heatmap",
            }
          ]
        },
        {
          title: '07.9 – Contribution & Maintenance Guidelines',
          links: [
            {
              "url": "http://x.x",
              "title": "(TBD) Documentation Style Guide",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Pull Request Template for Docs",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Doc Ownership Matrix",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Review and Approval Workflow",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Stale Doc Cleanup Bot",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Versioning and Changelog Policy",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Docs Contribution Ladder",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Review SLA Matrix",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Doc Ownership Rotations",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Broken Link Scanner Bot",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Deprecation Notice Template",
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
          title: '08.1 – Ceremonies & Meetings',
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
            {
              "url": "http://x.x",
              "title": "(TBD) Daily Stand-up Checklist",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Sprint Planning Agenda Template",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Retrospective Starfish Format",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Demo Day Script",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) RACI for Meeting Roles",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Time-boxed Meeting Rule",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Parking-Lot Technique",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Silent Stand-up Format",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Agenda-Before-Meeting Rule",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Meeting Cost Calculator",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Retro ROTI Voting",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Decision Capture Board",
            }
          ]
        },
        {
          title: '08.2 – Estimations & Planning',
          links: [
            {
              url: 'https://www.youtube.com/watch?v=tqoJOEjeAEw',
              title: '(Dec 2021) What is Batch Testing: A Tutorial',
              type: 'Video',
              level: '3'
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Planning Poker Guide",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) T-Shirt Sizing Scale",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Cone of Uncertainty Poster",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Three-Point Estimate Formula",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Backlog Refinement Playbook",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Capacity-Driven Sprint Plan",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Definition of Ready Checklist",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) No-Estimate Flow",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Monte Carlo Forecasting",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Story Point Calibration Game",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Throughput Histogram",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Planning Accuracy Metric",
            }
          ]
        },
        {
          title: '08.3 – Metrics & Performance',
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
            },
            {
              "url": "http://x.x",
              "title": "(TBD) DORA Four Key Metrics",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) North-Star Metric Canvas",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Flow Efficiency Chart",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Lead Time for Changes Tracker",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Engineering Health Radar",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Developer Experience Survey",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Accelerate Benchmarks Sheet",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Cycle Time Scatterplot",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) WIP Age Tracker",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Deployment Frequency Heatmap",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Quality Trend Radar",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) DevEx Score Index",
            }
          ]
        },
        {
          title: '08.4 – Communication & Collaboration',
          links: [
            {
              "title": "(May 2025) How to provide feedback on documents",
              "url": "https://lethain.com/providing-feedback-on-writing/",
              "type": "Article",
              "level": "2"
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Async First Policy",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Feedback Ladder Framework",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Decision Log Template",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Remote Collaboration Charter",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Meeting Notes Standard",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Working Agreement Canvas",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Document Commenting Etiquette",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Writing-First Culture Guide",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) RFC Process Template",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Communication Contract",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Update Frequency Matrix",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Conflict Resolution Ladder",
            }
          ]
        },
        {
          title: '08.5 – Leadership, Team Growth & Scaling',
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
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Manager’s Path Ladder",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) 30-60-90 Leadership Plan",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Team Topologies Model",
            },
            
            {
              "url": "http://x.x",
              "title": "(TBD) Growth Framework Matrix",
            },
            
            {
              "url": "http://x.x",
              "title": "(TBD) Delegation Poker Cards",
            },
            
            {
              "url": "http://x.x",
              "title": "(TBD) Skip-Level One-on-One Guide",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Org Reorg Checklist",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Engineering Ladder Rubric",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Mentoring Circle Schedule",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Decision Delegation Matrix",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Staff Engineer Path",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Org Health Survey",
            }
          ]
        },
        {
          title: '08.6 – Agile & Delivery Framework',
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
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Scrum Guide Essentials",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Kanban Flow Board Rules",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) SAFe Big Picture Map",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Lean Value Stream Map",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Scrumban Hybrid Playbook",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Definition of Done Poster",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Continuous Delivery Principles",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Kanban WIP Limits Table",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Value Stream KPI Board",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Scrum Anti-Pattern Cards",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Agile Maturity Model",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Continuous Discovery Guide",
            }
          ]
        },
        {
          title: '08.7 – Prioritization & Decision Making',
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
            },
            {
              "url": "http://x.x",
              "title": "(TBD) RICE Scoring Sheet",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) MoSCoW Prioritization Grid",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Eisenhower Matrix Board",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Cost of Delay Calculator",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Decision Tree Worksheet",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Trade-off Sliders Tool",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) One-Way vs Two-Way Door Rule",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Weighted Shortest Job First",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Opportunity Solution Tree",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Impact vs Effort Grid",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Prioritization Poker",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Decision Record Template",
            }
          ]
        },
        {
          title: '08.8 – Team Management & Roles',
          links: [
            {
              url: 'https://teamtopologies.com/book',
              title: 'Practical guide "Team Topologies" that helps tech teams organize and work together better by using four team types and three ways to collaborate, making it easier to deliver software quickly and safely.',
              type: 'Book',
              level: '4'
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Team Charter Canvas",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Role Clarity Matrix",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Responsibility Assignment (RACI)",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Skills Inventory Spreadsheet",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Pairing and Mob Program Guide",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Psychological Safety Check",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Team Health Retrospective",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Skill Gap Analysis Chart",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Team Norms Agreement",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Role Expectation Sheet",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) 360 Feedback Cycle",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Conflict Mediation Steps",
            }
          ]
        },
        {
          title: '08.9 – Goals',
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
            },
            {
              "url": "http://x.x",
              "title": "(TBD) OKR Writing Guide",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) SMART Goal Template",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Quarterly Goal Review Rhythm",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) KPI vs OKR Cheat Sheet",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Cascading Goals Framework",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Scorecard Dashboard Layout",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Goal Retrospective Session",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Objective Cascading Map",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Key Result Progress Chart",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Goal Confidence Score",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Goal Reset Workshop",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Weekly Goal Check-in",
            }
          ]
        },
        {
          title: '08.10 – Time Management & Productivity',
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
            },
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
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Pomodoro Technique Timer",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Time Blocking Calendar",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Two-Minute Rule Reminder",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Daily Shutdown Ritual",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Focus Mode Checklist",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Task Batching Strategy",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Energy Level Planning Chart",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Focus Time Blocks Policy",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Meeting Free Wednesday",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Personal Kanban Board",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Triple-Constraint Planner",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Context Switch Counter",
            }
          ]
        },
        {
          title: '08.11 – Presentation & Reporting',
          links: [
            {
              "title": "(Jan 2021) How to present to executives",
              "url": "https://lethain.com/present-to-executives/",
              "type": "Article",
              "level": "3"
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Executive Summary Template",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Storytelling Slide Framework",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Data-Ink Ratio Guideline",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Traffic-Light Status Report",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Pyramid Principle Outline",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) One-Page Project Brief",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Slide Rehearsal Checklist",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) KPI Story Slide",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Executive Elevator Pitch",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Data Story Arc Template",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Visual Hierarchy Rules",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Report Automation Script",
            }
          ]
        }
      ]
    },
    {
      id: 'design',
      title: '09. Design (UX/UI)',
      subsections: [
        {
          title: '09.1 – Documented design flows',
          links: [
            {
              "url": "http://x.x",
              "title": "(TBD) User Flow Diagrams 101",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Lucidchart User Flow Template",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Task Flow vs User Flow Cheat Sheet",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) End-to-End Scenario Mapping Guide",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Crazy Eights Sketching Exercise",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Flow Spec Document Template",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Red Route Analysis Sheet",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Happy Path vs Edge Case Flows",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Flow Complexity Score",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Flow Naming Convention",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Flow Approval Checklist",
            }
          ]
        },
        {
          title: '09.2 – Design tools',
          links: [
            {
              "url": "https://lab.interface-design.co.uk/11-best-practices-for-planning-tool-ux-design-2b6f0e94d56c",
              "title": "(Sep 2020) 11 simple UX tips to design better planning tools – from layout and interactions to visual hierarchy and data clarity.",
              "type": "Article",
              "level": "1"
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Figma Component Library Handbook",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Sketch Symbol Organization Tips",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Using Tokens in Design Systems",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Version Control in Figma with Branches",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Hotkeys Cheat Sheet for Efficiency",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Design Tool Accessibility Plug-ins Catalog",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Figma Token Studio Guide",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Real-Time Co-Design Plugin",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Contrast Checker Shortcut",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Design File Naming Standard",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Tooling Benchmark Board",
            }
          ]
        },
        {
          title: '09.3 – Design principles',
          links: [
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
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Principles of Gestalt Quick Reference",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) 8-Point Grid System Guide",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) A11y Color Contrast Rules",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Visual Hierarchy Checklist",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Mobile First Responsive Design",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Consistency First Principle",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Progressive Disclosure Examples",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Design Ethics Handbook",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Mental Model Matching Rules",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Touch Target Sizing Guide",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Cognitive Load Checklist",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Inclusive Imagery Principles",
            }
          ]
        },
        {
          title: '09.4 – Wireframing and prototyping',
          links: [
            {
              "url": "http://x.x",
              "title": "(TBD) Low-Fidelity Wireframe Kit",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Storyboard Sketching Tutorial",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Interactive Prototype Heuristics",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Click-Through Prototype Testing Guide",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Wireframe Annotation Best Practices",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Auto Layout for Wireframes in Figma",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Paper Prototype Sprint",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Component Stub Library",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Rapid Click-Dummy Playbook",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Prototype Feedback Sheet",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Constraint-Driven Wireframes",
            }
          ]
        },
        {
          title: '09.5 – UX research, Client feedback, Workshops with clients',
          links: [
            {
              "url": "http://x.x",
              "title": "(TBD) Lean UX Research Plan Template",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Interview Script Starter Pack",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) 5-Second Test Playbook",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Client Discovery Workshop Agenda",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Affinity Mapping Exercise",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Feedback Survey Design Tips",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Co-Design Session Guide",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Diary Study Kit",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Research Ops Checklist",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Stakeholder Interview Guide",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Participatory Design Toolkit",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Insight Repository Board",
            }
          ]
        },
        {
          title: '09.6 – UX/UI testing (Regular UX testing)',
          links: [
            {
              "url": "http://x.x",
              "title": "(TBD) Usability Test Moderator Guide",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Remote Testing Toolkit",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Heuristic Evaluation Checklist",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) A/B Testing Experiment Sheet",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Heatmap Analysis 101",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Accessibility Test Script",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Continuous UX Testing Calendar",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) First-Click Test Script",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Eye-Tracking Study Setup",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Satisfaction SUS Survey",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Task Success Rate Metric",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Continuous Discovery Panel",
            }
          ]
        },
        {
          title: '09.7 – Personas and journey maps',
          links: [
            {
              "url": "http://x.x",
              "title": "(TBD) Empathy Map Canvas",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Proto-Persona Template",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Customer Journey Blueprint",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Jobs-To-Be-Done Card Set",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Experience Mapping Workshop",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Journey KPI Matrix",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Anti-Persona Sheet",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Journey Emotion Curve",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Scenario Narrative Cards",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Persona Validation Checklist",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Journey Gap Finder",
            }
          ]
        },
        {
          title: '09.8 – Accessibility',
          links: [
            {
              "url": "http://x.x",
              "title": "(TBD) WCAG 2.2 Quick Reference",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Inclusive Design Principles Poster",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Color Blind Simulator Checklist",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Keyboard Navigation Test Suite",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Accessible Component Library Guide",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Screen Reader Testing Script",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Accessible Color Palette Tokens",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Focus State Style Guide",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Alt Text Writing Rules",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Skip Link Implementation Tips",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Cognitive Accessibility Patterns",
            }
          ]
        },
        {
          title: '09.9 – DesignOps',
          links: [
            {
              "url": "http://x.x",
              "title": "(TBD) DesignOps Handbook",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Design System Governance Model",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Design Intake Form Template",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Designer-Developer Handoff Checklist",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Design Metrics Dashboard",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Resource Allocation Kanban",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Ops Retrospective Framework",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Intake SLA Dashboard",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Design Debt Register",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Design Token Pipeline",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Component Lifecycle Stages",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Design Quality Bar",
            }
          ]
        }
      ]
    },
    {
      id: 'team-satisfaction',
      title: '10. Team Satisfaction',
      subsections: [
        {
          title: '10.1 – Tooling Satisfaction',
          links: [
            {
              "url": "http://x.x",
              "title": "(TBD) Quarterly Tooling Happiness Survey",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Developer Tooling Scorecard",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Tool Adoption Feedback Loop",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) “Sharp Tools” Budget Policy",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) One-Click Dev Environment Standard",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Tool Sunset Criteria",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Productivity Booster Survey",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Tool ROI Review Matrix",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Shadow IT Detection Checklist",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Tooling Roadshow Demo Day",
            }
          ]
        },
        {
          title: '10.2 – Talent Growth & Career Development',
          links: [
            {
              "url": "http://x.x",
              "title": "(TBD) Individual Growth Plan Template",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Skills Matrix Heat Map",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) 70-20-10 Learning Model",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Internal Tech Talks Calendar",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Learning Budget Guidelines",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Career Ladders Framework",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Stretch Assignment Catalog",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Shadowing Program Plan",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Certification Subsidy Policy",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Career Growth Office Hours",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Growth Goal Tracker",
            }
          ]
        },
        {
          title: '10.3 – Ownership & Autonomy',
          links: [
            {
              "url": "http://x.x",
              "title": "(TBD) “You Build It, You Run It” Charter",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Service Ownership Checklist",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Decision Log for Engineers",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Empowerment Retrospective Exercise",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Guardrails vs Gates Policy",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Autonomy Heatmap",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Decision-Making Framework",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Personal OKR Alignment",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Service Level Objective Owner Sheet",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Autonomy-Mastery-Purpose Survey",
            }
          ]
        },
        {
          title: '10.4 – Team Culture',
          links: [
            {
              "title": "(Apr 2020) The Developer Culture Test – A modern framework to evaluate engineering environments",
              "url": "https://blog.pragmaticengineer.com/the-developer-culture-test/",
              "type": "Article",
              "level": "2"
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Team Values Canvas",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Psychological Safety Pulse Check",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Culture Code Handbook",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Diversity and Inclusion Goals",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Code of Conduct Refresher Workshop",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Culture Fit Interview Kit",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Kudos Wall Board",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Remote Team Rituals Guide",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Psychological Safety Icebreaker",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Culture Health Check Poll",
            }
          ]
        },
        {
          title: '10.5 – Team Collaboration & Cross-Functionality',
          links: [
            {
              "title": "(Jun 2018) Staying on the path to high performing teams",
              "url": "https://lethain.com/durably-excellent-teams/",
              "type": "Article",
              "level": "2"
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Cross-Team Pairing Rotation",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Shared Definition of Done",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Collaboration Charter Canvas",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Whole-Team Kickoff Ritual",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Dependency Mapping Session",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Cross-Team Demo Fair",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Collaboration Health Radar",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Dependency Risk Board",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Shared Objective Canvas",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Collaboration Retrospective",
            }
          ]
        },
        {
          title: '10.6 – Mentorship & Peer Support',
          links: [
            {
              url: 'https://www.fastcompany.com/3027135/inside-the-pixar-braintrust',
              title: 'An inside look at Pixar’s Braintrust – a feedback group that helps filmmakers improve their stories through honest, peer-driven collaboration.',
              type: 'Article',
              level: '4'
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Buddy Program Playbook",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Mentorship Agreement Template",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Peer Coaching Circles",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Feedback Sandwich Guide",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Braintrust Review Session",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Mentorship Match Bot",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Coaching Skills Workshop",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Reverse Mentoring Pairing",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Peer Review Coffee Chat",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Mentorship Outcome Tracker",
            }
          ]
        },
        {
          title: '10.7 – Workload & Burnout Management',
          links: [
            {
              "url": "http://x.x",
              "title": "(TBD) Sustainable Pace Policy",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Work-in-Progress Limits Board",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Burnout Early Warning Survey",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Mandatory Disconnect Days",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Energy Level Check-in Ritual",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Personal WIP Limit Policy",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Mood Check Emoji Poll",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Burnout Risk Dashboard",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) PTO Encouragement Campaign",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Focus Friday Blocks",
            }
          ]
        },
        {
          title: '10.8 – Feedback & Recognition',
          links: [
            {
              "url": "http://x.x",
              "title": "(TBD) Weekly Shout-out Channel",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Real-Time Kudos Tool",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) 1:1 Feedback Framework",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Appreciation Day Calendar",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Reward and Recognition Matrix",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Public Kudos Board",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Real-Time Feedback App",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Quarterly Recognition Awards",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Kudos Point System",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Feedback Culture Workshop",
            }
          ]
        },
        {
          title: '10.9 – Team Rituals & Morale',
          links: [
            {
              "url": "http://x.x",
              "title": "(TBD) Friday Demo and Donuts",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Virtual Coffee Roulette",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Monthly Team Retrospective",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Celebrating Small Wins Board",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Off-Site Team-Building Kit",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Virtual Game Night Kit",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Win Sharing Channel",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Anniversary Celebration Protocol",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Surprise Appreciation Box",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Team Photo Wall",
            }
          ]
        },
        {
          title: '10.10 – Clarity & Transparency',
          links: [
            {
              "url": "http://x.x",
              "title": "(TBD) Open Roadmap Dashboard",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Decision Records Repository",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Transparent Salary Band Guide",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Leadership AMA Sessions",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Project Status Traffic-Light Report",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Quarterly Town Hall Deck",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Strategy One-Pager",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Open Metrics Dashboard",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Decision-Making AMA",
            },
            {
              "url": "http://x.x",
              "title": "(TBD) Transparency Heatmap",
            }
          ]
        }
      ]    
    }
  ];

  return (
    <div className="page page-best-practices">
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
                {filters.maturityLevels.map(filter => (
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
              <h4 className="filters-group-title">Infrastructure Specific</h4>
              <div className="filters-container">
                {filters.infrastructure.map(filter => (
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
                {filters.contentTypes.map(filter => (
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
