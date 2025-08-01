// Utility functions for the Ten-Factors application

// Format text utilities
export const formatText = {
  capitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1),
  truncate: (str, length) => str.length > length ? str.substring(0, length) + '...' : str,
  slugify: (str) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
};

// Validation utilities
export const validate = {
  email: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  url: (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },
};

// Animation and scroll utilities
export const scroll = {
  toElement: (elementId, offset = 0) => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  },
  toTop: () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  },
};

// Constants for the application
export const CONSTANTS = {
  BREAKPOINTS: {
    xs: 475,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },
  COLORS: {
    primary: '#020205',
    white: '#ffffff',
    tertiary: '#676769',
    yellow: '#ffba00',
  },
};
