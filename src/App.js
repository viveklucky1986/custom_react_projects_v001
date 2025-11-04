// src/App.js
// import React, { useState, useMemo } from 'react';
import React, { useState, useMemo, useEffect } from 'react';
import './App.css';
import { celebrityData, getNameDatabase, findCelebrityByName } from './data/celebrityData.js';
import { categories, getCategoryInfo } from './data/categories.js';

// Default empty user template
const emptyUser = {
  name: 'New Person',
  imageUrl: 'https://api.dicebear.com/6.x/adventurer/svg?seed=default',
  imageSize: 90,
  occupation: '',
  birthDate: '',
  knownFor: '',
  bio: '',
  nationality: '',
  category: 'other'
};

function Profile() {
  const [user, setUser] = useState(celebrityData[0]);
  const [nameInput, setNameInput] = useState(celebrityData[0].name);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [savedImageSize, setSavedImageSize] = useState(90);

  // Initialize with first celebrity after component mounts
  useEffect(() => {
    if (celebrityData.length > 0) {
      const firstCelebrity = { ...celebrityData[0], imageSize: savedImageSize }; // FIX: Use saved size
      setUser(firstCelebrity);
      setNameInput(firstCelebrity.name);
    }
    // setIsLoading(false);
  }, [savedImageSize]); // FIX: Added dependency

  // Get name database for suggestions
  const nameDatabase = getNameDatabase();

  // Filter celebrities by category
  // const filteredCelebrities = useMemo(() => {
  //   if (activeCategory === 'all') return celebrityData;
  //   return celebrityData.filter(celebrity => celebrity.category === activeCategory);
  // }, [activeCategory]);
  
  const filteredCelebrities = useMemo(() => {
    const celebrities = activeCategory === 'all' ? celebrityData : 
                      celebrityData.filter(celebrity => celebrity.category === activeCategory);
    
    // FIX: Apply saved image size to all filtered celebrities
    return celebrities.map(celebrity => ({
      ...celebrity,
      imageSize: savedImageSize
    }));
  }, [activeCategory, savedImageSize]); // FIX: Added savedImageSize dependency

  // Smart name suggestions based on input
  const nameSuggestions = useMemo(() => {
    if (!nameInput || nameInput.length < 2) return [];
    
    const inputLower = nameInput.toLowerCase();
    return nameDatabase
      .filter(name => 
        name.toLowerCase().includes(inputLower) ||
        name.toLowerCase().split(' ').some(part => part.startsWith(inputLower))
      )
      .slice(0, 5);
  }, [nameInput, nameDatabase]);

  const updateUserField = (field, value) => {
    setUser(prevUser => ({
      ...prevUser,
      [field]: value
    }));
  };

  const updateName = (newName) => {
    setNameInput(newName);
    updateUserField('name', newName);
  };

  const updateImageUrl = (newUrl) => {
    updateUserField('imageUrl', newUrl);
  };

  // const updateImageSize = (newSize) => {
  //   updateUserField('imageSize', parseInt(newSize) || 90);
  // };
  const updateImageSize = (newSize) => {
    const size = parseInt(newSize) || 90;
    updateUserField('imageSize', size);
  };

  // const saveImageSize = () => {
  //   setSavedImageSize(user.imageSize);
  // };

  // const loadPresetUser = (presetUser) => {
  //   setUser({ ...presetUser });
  //   setNameInput(presetUser.name);
  //   setShowSuggestions(false);
  //   setEditingField(null);
  // };

  // const selectSuggestion = (suggestion) => {
  //   const preset = findCelebrityByName(suggestion);
  //   if (preset) {
  //     setUser({ ...preset });
  //     setNameInput(preset.name);
  //   } else {
  //     updateName(suggestion);
  //   }
  //   setShowSuggestions(false);
  // };

  // const selectSuggestion = (suggestion) => {
  //   const preset = findCelebrityByName(suggestion);
  //   if (preset) {
  //     const presetWithSavedSize = { ...preset, imageSize: savedImageSize };
  //     setUser(presetWithSavedSize);
  //     setNameInput(preset.name);
  //   } else {
  //     updateName(suggestion);
  //   }
  //   setShowSuggestions(false);
  // };

  // FIX: Save the current size to apply to all profiles
  const saveImageSize = () => {
    setSavedImageSize(user.imageSize);
  };

  // FIX: Load preset with saved image size
  const loadPresetUser = (presetUser) => {
    const userWithSavedSize = { ...presetUser, imageSize: savedImageSize };
    setUser(userWithSavedSize);
    setNameInput(presetUser.name);
    setShowSuggestions(false);
    setEditingField(null);
  };

  // FIX: Select suggestion with saved image size
  const selectSuggestion = (suggestion) => {
    const preset = findCelebrityByName(suggestion);
    if (preset) {
      const presetWithSavedSize = { ...preset, imageSize: savedImageSize };
      setUser(presetWithSavedSize);
      setNameInput(preset.name);
    } else {
      updateName(suggestion);
    }
    setShowSuggestions(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setNameInput(value);
    updateName(value);
    setShowSuggestions(value.length > 0);
  };

  const handleInputFocus = () => {
    setShowSuggestions(nameInput.length > 0);
  };

  const handleInputBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const toggleEditField = (field) => {
    setEditingField(editingField === field ? null : field);
  };

  // const createNewProfile = () => {
  //   setUser({ ...emptyUser, imageUrl: `https://api.dicebear.com/6.x/adventurer/svg?seed=${Date.now()}` });
  //   setNameInput(emptyUser.name);
  // };
  const createNewProfile = () => {
    const newUser = {
      ...emptyUser, 
      imageUrl: `https://api.dicebear.com/6.x/adventurer/svg?seed=${Date.now()}`,
      imageSize: savedImageSize
    };
    setUser(newUser);
    setNameInput(emptyUser.name);
  };

  const renderEditableField = (label, field, value, isTextArea = false) => {
    const isEditing = editingField === field;
    
    return React.createElement('div', { className: 'bio-field' },
      React.createElement('div', { className: 'field-header' },
        React.createElement('label', null, label),
        React.createElement('button', {
          className: 'edit-btn',
          onClick: () => toggleEditField(field)
        }, isEditing ? 'Save' : 'Edit')
      ),
      isEditing ? 
        (isTextArea ? 
          React.createElement('textarea', {
            value: value || '',
            onChange: (e) => updateUserField(field, e.target.value),
            onBlur: () => setEditingField(null),
            autoFocus: true,
            rows: 3,
            placeholder: `Enter ${label.toLowerCase()}...`
          }) :
          React.createElement('input', {
            type: 'text',
            value: value || '',
            onChange: (e) => updateUserField(field, e.target.value),
            onBlur: () => setEditingField(null),
            autoFocus: true,
            placeholder: `Enter ${label.toLowerCase()}...`
          })
        ) :
        React.createElement('div', { className: 'field-value' }, 
          value || React.createElement('span', { className: 'empty-field' }, 'Not specified')
        )
    );
  };

  const categoryInfo = getCategoryInfo(user.category);

  return React.createElement('div', { className: 'profile-container' },
    React.createElement('div', { className: 'profile-header' },
      React.createElement('img', {
        className: 'avatar',
        src: user.imageUrl,
        alt: 'Photo of ' + user.name,
        style: {
          width: user.imageSize,
          height: user.imageSize
        }
      }),
      React.createElement('div', { className: 'profile-info' },
        React.createElement('h1', null, user.name),
        React.createElement('div', { 
          className: 'category-tag',
          style: { backgroundColor: categoryInfo.color }
        }, 
          categoryInfo.icon + ' ' + categoryInfo.name
        ),
        React.createElement('p', { className: 'occupation' }, user.occupation || 'Unknown Occupation'),
        React.createElement('p', { className: 'nationality' }, user.nationality || 'Unknown Nationality')
      )
    ),
    
    // Bio Information Section
    React.createElement('div', { className: 'bio-section' },
      React.createElement('h3', null, 'Biography Information'),
      React.createElement('div', { className: 'bio-grid' },
        renderEditableField('Occupation', 'occupation', user.occupation),
        renderEditableField('Birth Date', 'birthDate', user.birthDate),
        renderEditableField('Known For', 'knownFor', user.knownFor),
        renderEditableField('Nationality', 'nationality', user.nationality)
      ),
      renderEditableField('Biography', 'bio', user.bio, true)
    ),
    
    // Category Filter
    React.createElement('div', { className: 'category-filter' },
      React.createElement('h3', null, 'Filter by Category:'),
      React.createElement('div', { className: 'category-buttons' },
        React.createElement('button', {
          className: activeCategory === 'all' ? 'active' : '',
          onClick: () => setActiveCategory('all')
        }, 'All'),
        ...Object.entries(categories).map(([key, category]) =>
          React.createElement('button', {
            key: key,
            className: activeCategory === key ? 'active' : '',
            onClick: () => setActiveCategory(key),
            style: activeCategory === key ? { backgroundColor: category.color } : {}
          }, category.icon + ' ' + category.name)
        )
      )
    ),
    
    // Preset user selection
    React.createElement('div', { className: 'preset-selection' },
      React.createElement('h3', null, 'Quick Select Profiles:'),
      React.createElement('div', { className: 'preset-buttons' },
        filteredCelebrities.map((preset, index) => 
          React.createElement('button', {
            key: preset.id,
            onClick: () => loadPresetUser(preset),
            className: user.name === preset.name ? 'active' : '',
            style: user.name === preset.name ? { 
              backgroundColor: getCategoryInfo(preset.category).color 
            } : {}
          }, preset.name.split(' ')[0])
        )
      )
    ),
    
    // Manual controls
    React.createElement('div', { className: 'controls' },
      React.createElement('div', { className: 'control-group' },
        React.createElement('label', null, 'Name:'),
        React.createElement('div', { className: 'suggestions-container' },
          React.createElement('input', {
            type: 'text',
            value: nameInput,
            onChange: handleInputChange,
            onFocus: handleInputFocus,
            onBlur: handleInputBlur,
            placeholder: 'Start typing a name...'
          }),
          showSuggestions && nameSuggestions.length > 0 && 
          React.createElement('div', { className: 'suggestions-list' },
            ...nameSuggestions.map((suggestion, index) =>
              React.createElement('div', {
                key: index,
                className: 'suggestion-item',
                onClick: () => selectSuggestion(suggestion)
              }, suggestion)
            )
          )
        )
      ),
      
      React.createElement('div', { className: 'control-group' },
        React.createElement('label', null, 'Image URL:'),
        React.createElement('input', {
          type: 'text',
          value: user.imageUrl,
          onChange: (e) => updateImageUrl(e.target.value),
          placeholder: 'Enter image URL'
        })
      ),
      
      // React.createElement('div', { className: 'control-group' },
      //   React.createElement('label', null, 'Image Size: ' + user.imageSize + 'px'),
      //   React.createElement('input', {
      //     type: 'range',
      //     min: '50',
      //     max: '200',
      //     value: user.imageSize,
      //     onChange: (e) => updateImageSize(e.target.value)
      //   })
      // ),

      React.createElement('div', { className: 'control-group' },
        React.createElement('label', null, 'Image Size: ' + user.imageSize + 'px'),
        React.createElement('div', { className: 'size-control-row' },
          React.createElement('input', {
            type: 'range',
            min: '50',
            max: '200',
            value: user.imageSize,
            onChange: (e) => updateImageSize(e.target.value),
            className: 'size-slider'
          }),
          React.createElement('button', {
            className: 'save-size-btn',
            onClick: saveImageSize
          }, 'Save Size'),
          React.createElement('button', {
            className: 'reset-size-btn',
            onClick: () => {
              updateImageSize(90);
              setSavedImageSize(90);
            }
          }, 'Reset Size')
        )
      ),
      
      // Quick action buttons
      React.createElement('div', { className: 'presets' },
        React.createElement('button', {
          className: 'new-profile-btn',
          onClick: createNewProfile
        }, 'Create New Profile'),
        React.createElement('button', {
          onClick: () => updateImageSize(90)
        }, 'Reset Size')
      )
    )
  );
}

export default Profile;