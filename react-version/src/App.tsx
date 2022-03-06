import { useQuery } from 'react-query';

import { convertToForm, getDictWord, getJSONUrl } from './utilities/helpers';
import Form from './blocks/Form';
import './App.css';

function App() {
  const { dict, word } = getDictWord(window.location.hash);
  const { data, isLoading, error } = useQuery('draft', async () => {
    const res = await fetch(getJSONUrl({ dict, word }));
    if (!res.ok) {
      throw new Error('Failed to fetch draft');
    }
    return res.json();
  });

  if (!dict) {
    return <p>dictionary not defined</p>;
  }
  if (!word) {
    return <p>word not defined</p>;
  }
  if (isLoading) {
    return <p>loading...</p>;
  }
  if (error) {
    return <p>{JSON.stringify(error)}</p>;
  }
  if (!data) {
    return <p>word not found</p>;
  }
  return <Form draft={convertToForm(data)} />;
}

export default App;
