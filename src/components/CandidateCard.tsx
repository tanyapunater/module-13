import React from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

interface CandidateCardProps {
  candidate: Candidate;
  onSave?: (candidate: Candidate) => void;
  onRemove?: (username: string) => void;
  isSaved?: boolean;
}

const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  onSave,
  onRemove,
  isSaved = false,
}) => {
  return (
    <div className="filmCard">
      <div className="details">
        <h2>{candidate.name || candidate.login}</h2>
        <p><strong>Location:</strong> {candidate.location || 'N/A'}</p>
        <p><strong>Company:</strong> {candidate.company || 'N/A'}</p>
        <p><strong>Email:</strong> {candidate.email || 'N/A'}</p>
        <p><strong>Bio:</strong> {candidate.bio || 'N/A'}</p>
      </div>
      <div className="icons">
        {isSaved ? (
          <button onClick={() => onRemove?.(candidate.login)}>Remove</button>
        ) : (
          <button onClick={() => onSave?.(candidate)}>Save</button>
        )}
      </div>
    </div>
  );
};

export default CandidateCard;