import React from 'react';
import { useParams, Link } from 'react-router-dom';
import vocabulary from '../data/vocabulary.json';
import './VocabularyDetail.css';

function VocabularyDetail() {
  const { levelId } = useParams();

  const level = vocabulary.find((lvl) => lvl.id.toString() === levelId);

  if (!level) {
    return (
      <div className="vocabulary-detail-wrapper">
        <h2 className="vocabulary-detail-title">Nie znaleziono poziomu</h2>
        <Link to="/vocabulary" className="back-link">Powrót do listy</Link>
      </div>
    );
  }

  return (
    <div className="vocabulary-detail-wrapper">
      <h1 className="vocabulary-detail-title">{level.title}</h1>
      <table className="vocabulary-table">
        <thead>
          <tr>
            <th>Polski</th>
            <th>Włoski</th>
            <th>Przykład</th>
            <th>Tłumaczenie</th>
          </tr>
        </thead>
        <tbody>
          {level.words.map((word, index) => (
            <tr key={index}>
              <td data-label="Polski">{word.polish}</td>
              <td data-label="Włoski">{word.italian}</td>
              <td data-label="Przykład">{word.example}</td>
              <td data-label="Tłumaczenie">{word.example_translation}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/vocabulary" className="back-link">← Powrót do listy</Link>
    </div>
  );
}

export default VocabularyDetail;
