import React from 'react';
import { Link } from 'react-router-dom';
import vocabulary from '../data/vocabulary.json';
import './VocabularyList.css';

function VocabularyList() {
  return (
    <div className="vocabulary-list-wrapper">
      <h1 className="vocabulary-list-title">Tematy i poziomy</h1>
      <div className="vocabulary-list-grid">
        {vocabulary.map((level) => (
          <Link
            key={level.id}
            to={`/vocabulary/${level.id}`}
            className="vocabulary-card"
          >
            <div className="vocabulary-card-title">{level.title}</div>
            <div className="vocabulary-card-description">
              {level.description || 'Kliknij, aby rozpocząć naukę'}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default VocabularyList;
