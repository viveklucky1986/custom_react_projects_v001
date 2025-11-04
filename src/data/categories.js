// src/data/categories.js
export const categories = {
  scientist: {
    name: 'Scientists & Inventors',
    color: '#4CAF50',
    icon: '🔬'
  },
  actor: {
    name: 'Actors & Actresses',
    color: '#FF9800',
    icon: '🎭'
  },
  fictional: {
    name: 'Fictional Characters',
    color: '#9C27B0',
    icon: '📚'
  },
  tech: {
    name: 'Tech Leaders',
    color: '#2196F3',
    icon: '💻'
  }
};

export const getCategoryInfo = (category) => {
  return categories[category] || { name: 'Other', color: '#757575', icon: '👤' };
};