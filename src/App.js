import React, { useState, useMemo, useEffect } from 'react';
import './App.css';
import { celebrityData, getNameDatabase, findCelebrityByName } from './data/celebrityData.js';
import { categories, getCategoryInfo } from './data/categories.js';

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

// NEW: Function to get data from localStorage or fallback to original data
const getStoredCelebrityData = () => {
  try {
    const stored = localStorage.getItem('celebrityData');
    if (stored) {
      const parsedData = JSON.parse(stored);
      console.log('Loaded from localStorage:', parsedData.length, 'celebrities');
      return parsedData;
    }
  } catch (error) {
    console.error('Error loading from localStorage:', error);
  }
  console.log('Using original celebrity data');
  return celebrityData;
};

// NEW: Function to save data to localStorage
const saveCelebrityData = (data) => {
  try {
    localStorage.setItem('celebrityData', JSON.stringify(data));
    console.log('Saved to localStorage:', data.length, 'celebrities');
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

// NEW: Function to update celebrity in data
const updateCelebrityInData = (currentData, updatedCelebrity) => {
  const updatedData = currentData.map(celeb => 
    celeb.id === updatedCelebrity.id ? updatedCelebrity : celeb
  );
  return updatedData;
};

// NEW: Function to add new celebrity to data
const addNewCelebrityToData = (currentData, newCelebrity) => {
  const celebrityWithId = {
    ...newCelebrity,
    id: newCelebrity.id || Date.now().toString()
  };
  return [...currentData, celebrityWithId];
};

// NEW: Remove duplicates by ID and name
const removeDuplicates = (data) => {
  const seen = new Set();
  return data.filter(celeb => {
    const identifier = celeb.id + '|' + celeb.name;
    if (seen.has(identifier)) {
      return false;
    }
    seen.add(identifier);
    return true;
  });
};

function Profile() {
  // NEW: Load initial data from localStorage or original data
  const [currentCelebrityData, setCurrentCelebrityData] = useState(getStoredCelebrityData());
  const [user, setUser] = useState(currentCelebrityData[0] || emptyUser);
  const [nameInput, setNameInput] = useState(currentCelebrityData[0]?.name || 'New Person');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [savedImageSize, setSavedImageSize] = useState(90);
  const [saveStatus, setSaveStatus] = useState('');

  // NEW: Update when localStorage data changes
  useEffect(() => {
    const storedData = getStoredCelebrityData();
    setCurrentCelebrityData(storedData);
    if (storedData.length > 0 && !user.id) {
      setUser(storedData[0]);
      setNameInput(storedData[0].name);
    }
  }, []);

  useEffect(() => {
    if (currentCelebrityData.length > 0) {
      const firstCelebrity = { ...currentCelebrityData[0], imageSize: savedImageSize }; 
      setUser(firstCelebrity);
      setNameInput(firstCelebrity.name);
    }
  }, [savedImageSize, currentCelebrityData]);

  // NEW: Updated name database from current data
  const nameDatabase = useMemo(() => {
    return currentCelebrityData.map(celebrity => celebrity.name);
  }, [currentCelebrityData]);

  const filteredCelebrities = useMemo(() => {
    const celebrities = activeCategory === 'all' ? currentCelebrityData : 
      currentCelebrityData.filter(celebrity => celebrity.category === activeCategory);
      
    return celebrities.map(celebrity => ({
      ...celebrity,
      imageSize: savedImageSize
    }));
  }, [activeCategory, savedImageSize, currentCelebrityData]);

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

  // UPDATED: Save user data to localStorage
  const saveUserData = () => {
    try {
      // Remove temporary fields before saving
      const userToSave = { ...user };
      delete userToSave.imageSize; // Remove temporary UI field
      
      // Ensure user has an ID
      if (!userToSave.id) {
        userToSave.id = Date.now().toString();
      }

      const existingCelebrityIndex = currentCelebrityData.findIndex(celeb => celeb.id === userToSave.id);
      let updatedData;

      if (existingCelebrityIndex !== -1) {
        // UPDATE EXISTING: Replace the existing celebrity completely
        updatedData = currentCelebrityData.map(celeb => 
          celeb.id === userToSave.id ? userToSave : celeb
        );
        setSaveStatus('Profile updated successfully!');
      } else {
        // Check if this might be a renamed existing celebrity (by matching other properties)
        const possibleOriginal = currentCelebrityData.find(celeb => 
          celeb.occupation === userToSave.occupation && 
          celeb.birthDate === userToSave.birthDate &&
          celeb.category === userToSave.category
        );
        
        if (possibleOriginal && window.confirm('Update existing profile instead of creating new one?')) {
          // Update the existing one with new name
          updatedData = currentCelebrityData.map(celeb => 
            celeb.id === possibleOriginal.id ? userToSave : celeb
          );
          setSaveStatus('Profile updated successfully!');
        } else {
          // ADD AS NEW: Create new entry
          updatedData = [...currentCelebrityData, userToSave];
          setSaveStatus('New profile saved successfully!');
        }
      }

      updatedData = removeDuplicates(updatedData);

      // Save to localStorage and update state
      const saveSuccess = saveCelebrityData(updatedData);
      if (saveSuccess) {
        setCurrentCelebrityData(updatedData);
        
        // Update the current user to reflect the saved state
        setUser(userToSave);
        setNameInput(userToSave.name);
      } else {
        setSaveStatus('Error saving to storage');
      }
      
      // Clear status after 3 seconds
      setTimeout(() => setSaveStatus(''), 3000);
      
    } catch (error) {
      setSaveStatus('Error saving profile: ' + error.message);
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  // UPDATED: Find celebrity from current data
  const findCelebrityInCurrentData = (name) => {
    return currentCelebrityData.find(celeb => 
      celeb.name.toLowerCase() === name.toLowerCase()
    );
  };

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

  const updateImageSize = (newSize) => {
    const size = parseInt(newSize) || 90;
    updateUserField('imageSize', size);
  };

  const saveImageSize = () => {
    setSavedImageSize(user.imageSize);
  };

  const loadPresetUser = (presetUser) => {
    // Make sure we're loading the most recent version from current data
    const currentPreset = currentCelebrityData.find(celeb => celeb.id === presetUser.id) || presetUser;
    const userWithSavedSize = { ...currentPreset, imageSize: savedImageSize };
    setUser(userWithSavedSize);
    setNameInput(currentPreset.name);
    setShowSuggestions(false);
    setEditingField(null);
  };

  const selectSuggestion = (suggestion) => {
    const preset = findCelebrityInCurrentData(suggestion);
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

  // MODIFIED: Save data when clicking outside edit field
  const toggleEditField = (field) => {
    if (editingField === field) {
      // Save when clicking the Save button
      setEditingField(null);
      saveUserData(); // Auto-save when saving edits
    } else {
      setEditingField(field);
    }
  };

  // MODIFIED: Save when creating new profile
  const createNewProfile = () => {
    const newUser = {
      ...emptyUser, 
      id: Date.now().toString(),
      imageUrl: `https://api.dicebear.com/6.x/adventurer/svg?seed=${Date.now()}`,
      imageSize: savedImageSize
    };
    setUser(newUser);
    setNameInput(emptyUser.name);
    setSaveStatus('New profile created - fill in details and save!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  // MODIFIED: Add save functionality to editable fields
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
            onBlur: () => {
              setEditingField(null);
              saveUserData(); // Auto-save when clicking outside
            },
            autoFocus: true,
            rows: 3,
            placeholder: `Enter ${label.toLowerCase()}...`
          }) :
          React.createElement('input', {
            type: 'text',
            value: value || '',
            onChange: (e) => updateUserField(field, e.target.value),
            onBlur: () => {
              setEditingField(null);
              saveUserData(); // Auto-save when clicking outside
            },
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
  console.log('Filtered celebrities:', filteredCelebrities.map(p => ({ id: p.id, name: p.name })));

  return React.createElement('div', { className: 'profile-container' },
    // Save status indicator
    saveStatus && React.createElement('div', { 
      className: `save-status ${saveStatus.includes('Error') ? 'error' : 'success'}` 
    }, saveStatus),
    
    // NEW: Data source indicator
    React.createElement('div', { className: 'data-source-indicator' },
      `Loaded ${currentCelebrityData.length} profiles from ${localStorage.getItem('celebrityData') ? 'localStorage' : 'original data'}`
    ),
    
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

    React.createElement('div', { className: 'preset-selection' },
      React.createElement('h3', null, 'Quick Select Profiles:'),
      React.createElement('div', { className: 'preset-buttons' },
        filteredCelebrities.map((preset, index) => 
          React.createElement('button', {
            key: preset.id,
            onClick: () => loadPresetUser(preset),
            className: user.id === preset.id ? 'active' : '', // FIX: Compare by ID instead of name
            style: user.id === preset.id ? { 
              backgroundColor: getCategoryInfo(preset.category).color 
            } : {}
          }, preset.name.split(' ')[0]) // This shows first name only
        )
      )
    ),

    React.createElement('div', { className: 'controls' },
      // Manual Save Button
      React.createElement('div', { className: 'control-group' },
        React.createElement('button', {
          className: 'save-profile-btn',
          onClick: saveUserData
        }, '💾 Save Profile')
      ),

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
            nameSuggestions.map((suggestion, index) =>
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
          onBlur: saveUserData, // Auto-save when clicking outside
          placeholder: 'Enter image URL'
        })
      ),

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

      React.createElement('div', { className: 'presets' },
        React.createElement('button', {
          className: 'new-profile-btn',
          onClick: createNewProfile
        }, 'Create New Profile'),
        // NEW: Clear storage button for testing
        React.createElement('button', {
          className: 'clear-storage-btn',
          onClick: () => {
            localStorage.removeItem('celebrityData');
            window.location.reload();
          }
        }, 'Clear Storage')
      )
    )
  );
}

export default Profile;