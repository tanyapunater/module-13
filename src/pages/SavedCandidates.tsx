import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';
import CandidateCard from '../components/CandidateCard';

const LOCAL_STORAGE_KEY = 'savedCandidates';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setSavedCandidates(JSON.parse(saved));
    }
  }, []);

  const handleRemove = (username: string) => {
    const updatedCandidates = savedCandidates.filter(
      (candidate) => candidate.login !== username
    );
    setSavedCandidates(updatedCandidates);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedCandidates));
  };

  return (
    <main>
      <h1>Saved Candidates</h1>
      {savedCandidates.length > 0 ? (
        savedCandidates.map((candidate) => (
          <CandidateCard
            key={candidate.login}
            candidate={candidate}
            isSaved
            onRemove={handleRemove}
          />
        ))
      ) : (
        <p>No saved candidates yet.</p>
      )}
    </main>
  );
};

export default SavedCandidates;