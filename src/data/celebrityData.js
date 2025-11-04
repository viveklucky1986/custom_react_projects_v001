// src/data/celebrityData.js
export const celebrityData = [
  {
    id: 1,
    name: 'Albert Einstein',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg/180px-Einstein_1921_by_F_Schmutzer_-_restoration.jpg',
    imageSize: 90,
    occupation: 'Theoretical Physicist',
    birthDate: 'March 14, 1879',
    knownFor: 'Theory of Relativity, E=mc²',
    bio: 'Nobel Prize-winning physicist who developed the theory of relativity, one of the two pillars of modern physics.',
    nationality: 'German-Swiss-American',
    category: 'scientist'
  },
  {
    id: 2,
    name: 'Emma Watson',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Emma_Watson_2013.jpg/180px-Emma_Watson_2013.jpg',
    imageSize: 90,
    occupation: 'Actress, Activist',
    birthDate: 'April 15, 1990',
    knownFor: 'Hermione Granger in Harry Potter',
    bio: 'English actress and activist known for her role in the Harry Potter film series and her work in gender equality.',
    nationality: 'British',
    category: 'actor'
  },
  {
    id: 3,
    name: 'Hermione Granger',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Hermione_Granger_poster.jpg/180px-Hermione_Granger_poster.jpg',
    imageSize: 90,
    occupation: 'Student, Minister for Magic',
    birthDate: 'September 19, 1979',
    knownFor: 'Hogwarts Witch, Brilliant Spell-caster',
    bio: 'Muggle-born witch known for her intelligence and loyalty. One of Harry Potter\'s closest friends and later Minister for Magic.',
    nationality: 'British',
    category: 'fictional'
  },
  {
    id: 4,
    name: 'Daniel Radcliffe',
    imageUrl: 'https://i.ibb.co/fdJV2wYB/Daniel-Radcliffe1.jpg',
    imageSize: 90,
    occupation: 'Actor',
    birthDate: 'July 23, 1989',
    knownFor: 'Harry Potter film series',
    bio: 'English actor who rose to fame playing Harry Potter in the film series, and has since appeared in various stage and screen roles.',
    nationality: 'British',
    category: 'actor'
  },
  {
    id: 5,
    name: 'Steve Jobs',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Steve_Jobs_Headshot_2010-CROP2.jpg/180px-Steve_Jobs_Headshot_2010-CROP2.jpg',
    imageSize: 90,
    occupation: 'Entrepreneur, Inventor',
    birthDate: 'February 24, 1955',
    knownFor: 'Co-founder of Apple Inc.',
    bio: 'American business magnate and inventor who co-founded Apple Inc. and played a key role in the personal computer revolution.',
    nationality: 'American',
    category: 'tech'
  },
  {
    id: 6,
    name: 'Marie Curie',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Marie_Curie_c._1920s.jpg/180px-Marie_Curie_c._1920s.jpg',
    imageSize: 90,
    occupation: 'Physicist, Chemist',
    birthDate: 'November 7, 1867',
    knownFor: 'Radioactivity, Polonium, Radium',
    bio: 'First woman to win a Nobel Prize, first person to win twice, and only person to win in two different sciences.',
    nationality: 'Polish-French',
    category: 'scientist'
  },
  {
    id: 7,
    name: 'Nikola Tesla',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/N.Tesla.JPG/180px-N.Tesla.JPG',
    imageSize: 90,
    occupation: 'Inventor, Electrical Engineer',
    birthDate: 'July 10, 1856',
    knownFor: 'AC Electricity, Tesla Coil',
    bio: 'Serbian-American inventor and engineer who made groundbreaking contributions to electricity and magnetism.',
    nationality: 'Serbian-American',
    category: 'scientist'
  },
  {
    id: 8,
    name: 'Stephen Hawking',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Stephen_Hawking.StarChild.jpg/180px-Stephen_Hawking.StarChild.jpg',
    imageSize: 90,
    occupation: 'Theoretical Physicist',
    birthDate: 'January 8, 1942',
    knownFor: 'Black Holes, Hawking Radiation',
    bio: 'English theoretical physicist and cosmologist known for his work on black holes and author of "A Brief History of Time".',
    nationality: 'British',
    category: 'scientist'
  }
];

// Helper function to get all names for suggestions
export const getNameDatabase = () => {
  return celebrityData.map(celebrity => celebrity.name);
};

// Helper function to get celebrities by category
export const getCelebritiesByCategory = (category) => {
  return celebrityData.filter(celebrity => celebrity.category === category);
};

// Helper function to find celebrity by name
export const findCelebrityByName = (name) => {
  return celebrityData.find(celebrity => celebrity.name === name);
};