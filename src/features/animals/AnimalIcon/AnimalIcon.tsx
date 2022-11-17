import React from 'react';
import './AnimalIcon.css';
import { TAnimalSend } from '../../../services/types/animalsTypes';
import cap from '../../../image/cap.png';

interface Iprops {
  pet: TAnimalSend;
  selectedPet: TAnimalSend | null;
  setSelectedPet: (pet: TAnimalSend) => void;
}

export const AnimalIcon = ({ pet, selectedPet, setSelectedPet }: Iprops) => {
  const isSelected = pet.pet_id === selectedPet?.pet_id ? `animal-icon_active` : '';
  const image = pet.pet_picture && pet.pet_picture.length !== 0 ? pet.pet_picture : cap;
  return (
    <button
      type="button"
      className={`animal-icon ${isSelected}`}
      onClick={() => setSelectedPet(pet)}
    >
      <div className="animal-icon__full-nickname">
        <p className="animal-icon__full-nickname-text">{pet.nickname}</p>
      </div>
      <img
        className="animal-icon__picture"
        src={image || '#'}
        alt={`Питомец${pet.nickname}`}
      />
      <p className="animal-icon__nickname">{pet.nickname}</p>
    </button>
  );
};
