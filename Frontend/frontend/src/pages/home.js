import React from 'react';
import './home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Witaj w ItalianoApp 🇮🇹</h1>

      {/* Sekcja wstępna */}
      <div className="intro-section">
        <p>
          ItalianoApp to Twoja osobista przestrzeń do nauki języka włoskiego – od podstaw, aż po poziom zaawansowany.
          Dzięki nowoczesnym narzędziom, AI i bogatym materiałom, uczysz się skutecznie i przyjemnie!
        </p>
      </div>

      {/* 1. Sekcja kafelków: Fiszki / AI / Słówka */}
      <div className="tiles">
        <div className="tile">
          <h3>Fiszki</h3>
          <p>Twórz i powtarzaj fiszki z włoskich słówek i zwrotów.</p>
        </div>
        <div className="tile">
          <h3>Ucz się z AI 🤖</h3>
          <p>Otrzymuj indywidualne wskazówki i lekcje oparte na Twoim poziomie.</p>
        </div>
        <div className="tile">
          <h3>Słówka dnia</h3>
          <p>Codzienna porcja nowych słówek z przykładami użycia.</p>
        </div>
      </div>

      {/* 2. Sekcja z tekstem i zdjęciem */}
      <div className="info-section">
        <div className="info-text">
          <h2>Dlaczego warto uczyć się włoskiego?</h2>
          <p>
            Język włoski to nie tylko komunikacja – to także klucz do kultury, kuchni, muzyki i sztuki.
            Poznaj Włochy od środka, rozwijając swoje umiejętności językowe i kulturowe.
          </p>
        </div>
        <div className="info-image">
          <img
            src="https://flagcdn.com/w320/it.png"
            alt="Flaga Włoch"
          />
        </div>
      </div>

      {/* 3. Dodatkowa sekcja kafelków */}
      <div className="tiles">
        <div className="tile">
          <h3>Dialogi</h3>
          <p>Ćwicz rozmowy w codziennych sytuacjach (restauracja, lotnisko itd.).</p>
        </div>
        <div className="tile">
          <h3>Kultura</h3>
          <p>Poznaj włoską historię, kuchnię, kino i święta.</p>
        </div>
        <div className="tile">
          <h3>Quizy</h3>
          <p>Testuj swoją wiedzę i rywalizuj ze znajomymi.</p>
        </div>
      </div>

      {/* Przycisk CTA */}
      <button className="join-button" onClick={() => navigate('/register')}>
        Dołącz teraz
      </button>
    </div>
  );
}

export default Home;
