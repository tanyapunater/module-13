import { useEffect, useState } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';
import CandidateCard from '../components/CandidateCard';

const LOCAL_STORAGE_KEY = 'savedCandidates';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [saved, setSaved] = useState<Candidate[]>([]);

  useEffect(() => {
    const savedFromStorage = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedFromStorage) {
      setSaved(JSON.parse(savedFromStorage));
    }
  }, []);

  const handleSearch = async () => {
    const users = await searchGithub();
    const detailedUsers: Candidate[] = [];

    for (const user of users) {
      const userDetails = await searchGithubUser(user.login);
      const candidate: Candidate = {
        login: userDetails.login,
        name: userDetails.name,
        location: userDetails.location,
        company: userDetails.company,
        email: userDetails.email,
        bio: userDetails.bio,
      };
      detailedUsers.push(candidate);
    }

    setCandidates(detailedUsers);
  };

  const handleSave = (candidate: Candidate) => {
    const isAlreadySaved = saved.some((c) => c.login === candidate.login);
    if (!isAlreadySaved) {
      const updatedSaved = [...saved, candidate];
      setSaved(updatedSaved);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedSaved));
    }
  };

  return (
    <main>
      <h1>Candidate Search</h1>
      <button onClick={handleSearch}>Search GitHub Users</button>
      {candidates.map((candidate) => (
        <CandidateCard
          key={candidate.login}
          candidate={candidate}
          onSave={handleSave}
        />
      ))}
    </main>
  );
};

export default CandidateSearch;
