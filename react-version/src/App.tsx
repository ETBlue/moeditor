import { useReducer } from 'react';
import { useForm } from 'react-hook-form';
import { CgChevronDown, CgChevronRight, CgTrash } from 'react-icons/cg';
import { MdSave } from 'react-icons/md';

import { EntryForm } from './types';
import { entryFormData } from './sample';
import { getDict } from './helpers';
import { useQuery } from 'react-query';
import { convertToForm, getDictWord, getJSONUrl } from './helpers';
import './App.css';

function App() {
  const { register, setValue, watch, handleSubmit } = useForm<EntryForm>({
    defaultValues: entryFormData,
  const { dict, word } = getDictWord(window.location.hash);
  const { data, isLoading, error } = useQuery('draft', async () => {
    const res = await fetch(getJSONUrl({ dict, word }));
    if (!res.ok) {
      throw new Error('Failed to fetch draft');
    }
    return res.json();
  });
  const addDefinition = () => {
    setValue(`definitions.${watch('definitions').length}`, {
      description: '',
    });
  };
  const removeDefinition = (definitionIndex: number) => {
    const definitions = watch(`definitions`) || [];
    definitions.splice(definitionIndex, 1);
    setValue(`definitions`, definitions);
  };
  const addExample = (definitionIndex: number) => {
    const newExampleIndex =
      watch(`definitions.${definitionIndex}.examples`)?.length || 0;
    setValue(`definitions.${definitionIndex}.examples.${newExampleIndex}`, {
      prefix: '',
      text: '',
      separator: '',
      subtext: '',
    });
  };
  const removeExample = (definitionIndex: number, exampleIndex: number) => {
    const examples = watch(`definitions.${definitionIndex}.examples`) || [];
    examples.splice(exampleIndex, 1);
    setValue(`definitions.${definitionIndex}.examples`, examples);
  };
  const addDefinitionItem = (
    definitionIndex: number,
    itemType: 'synonym' | 'reference'
  ) => {
    const newDefinitionItemIndex =
      watch(`definitions.${definitionIndex}.${itemType}s`)?.length || 0;
    setValue(
      `definitions.${definitionIndex}.${itemType}s.${newDefinitionItemIndex}`,
      ''
    );
  };
  const removeDefinitionItem = (
    definitionIndex: number,
    definitionItemIndex: number,
    itemType: 'synonym' | 'reference'
  ) => {
    const definitionItems =
      watch(`definitions.${definitionIndex}.${itemType}s`) || [];
    definitionItems.splice(definitionItemIndex, 1);
    setValue(`definitions.${definitionIndex}.${itemType}s`, definitionItems);
  };
  const onSubmit = (data: EntryForm) => {
    console.log(data);
  };
  const formData = watch();
  const [definitionsVisibility, toggleDefinitionsVisibility] = useReducer(
    (prev: boolean[], action: { index: number; visibility: boolean }) => {
      const { index, visibility } = action;
      prev[index] = visibility;
      return [...prev];
    },
    formData.definitions.map(() => true)
  );

  const { dict, word } = getDict(window.location.hash);
  if (!dict) {
    return <div>dictionary not defined</div>;
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
  return (
    <form className="App" onSubmit={handleSubmit(onSubmit)}>
      <div id="word" className="grid">
        <div className="field">
          <label>
            <span className="required">word</span>
          </label>
          <input {...register('word', { required: true })} />
        </div>
        <div className="field">
          <label>stem (蔡中涵大辭典)</label>
          <input {...register('stem')} />
        </div>
        <div className="field">
          <label>repetition (蔡中涵大辭典)</label>
          <input {...register('repetition')} />
        </div>
      </div>
      {formData.definitions.map((definition, definitionIndex) => (
        <div key={definitionIndex}>
          <hr />
          <div className="definition">
            <div className="field">
              <div className="grid">
                {definitionsVisibility[definitionIndex] ? (
                  <button
                    type="button"
                    className="text"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleDefinitionsVisibility({
                        index: definitionIndex,
                        visibility: false,
                      });
                    }}
                  >
                    <CgChevronDown />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="text"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleDefinitionsVisibility({
                        index: definitionIndex,
                        visibility: true,
                      });
                    }}
                  >
                    <CgChevronRight />
                  </button>
                )}
                <label className="required">
                  definition {definitionIndex + 1}
                </label>
                <span />
                <button
                  type="button"
                  className="deleteDefinition"
                  onClick={() => {
                    removeDefinition(definitionIndex);
                  }}
                >
                  remove definition
                </button>
              </div>
              <input
                {...register(`definitions.${definitionIndex}.description`)}
              />
            </div>
            <hr />
            <div className="field">
              <label>type (潘世光、博利亞阿法字典)</label>
              <input {...register(`definitions.${definitionIndex}.type`)} />
            </div>
          </div>
          {definitionsVisibility[definitionIndex] && (
            <>
              {definition.examples?.map((example, exampleIndex) => (
                <div className="definitionItem" key={exampleIndex}>
                  <hr />
                  <div className="example grid">
                    <div className="field">
                      <label>example {exampleIndex + 1} main text</label>
                      <input
                        {...register(
                          `definitions.${definitionIndex}.examples.${exampleIndex}.text`
                        )}
                      />
                    </div>
                    <div className="field">
                      <label>supplementary text</label>
                      <input
                        {...register(
                          `definitions.${definitionIndex}.examples.${exampleIndex}.subtext`
                        )}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        removeExample(definitionIndex, exampleIndex)
                      }
                    >
                      <CgTrash />
                    </button>
                  </div>
                </div>
              ))}
              <hr />
              <div className="addDefinitionItem">
                <button
                  type="button"
                  onClick={() => {
                    addExample(definitionIndex);
                  }}
                >
                  new example to definition {definitionIndex + 1}
                </button>
              </div>
              {definition.synonyms?.map((synonym, synonymIndex) => (
                <div className="definitionItem" key={synonymIndex}>
                  <hr />
                  <div className="synonym grid">
                    <div className="field">
                      <label>synonym {synonymIndex + 1}</label>
                      <input
                        {...register(
                          `definitions.${definitionIndex}.synonyms.${synonymIndex}`
                        )}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        removeDefinitionItem(
                          definitionIndex,
                          synonymIndex,
                          'synonym'
                        )
                      }
                    >
                      <CgTrash />
                    </button>
                  </div>
                </div>
              ))}
              <hr />
              <div className="addDefinitionItem">
                <button
                  type="button"
                  onClick={() => {
                    addDefinitionItem(definitionIndex, 'synonym');
                  }}
                >
                  new synonym to definition {definitionIndex + 1}
                </button>
              </div>
              {definition.references?.map((reference, referenceIndex) => (
                <div className="definitionItem" key={referenceIndex}>
                  <hr />
                  <div className="reference grid">
                    <div className="field">
                      <label>
                        reference {referenceIndex + 1} (蔡中涵大辭典)
                      </label>
                      <input
                        {...register(
                          `definitions.${definitionIndex}.references.${referenceIndex}`
                        )}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        removeDefinitionItem(
                          definitionIndex,
                          referenceIndex,
                          'reference'
                        )
                      }
                    >
                      <CgTrash />
                    </button>
                  </div>
                </div>
              ))}
              <hr />
              <div className="addDefinitionItem">
                <button
                  type="button"
                  onClick={() => {
                    addDefinitionItem(definitionIndex, 'reference');
                  }}
                >
                  new reference to definition {definitionIndex + 1}
                </button>
              </div>
            </>
          )}
        </div>
      ))}
      <hr />
      <footer className="grid">
        <button
          type="button"
          className="addDefinition"
          onClick={() => {
            toggleDefinitionsVisibility({
              index: formData.definitions.length,
              visibility: true,
            });
            addDefinition();
          }}
        >
          new definition
        </button>
        <span />
        <button type="submit" className="submit">
          <MdSave />
          <span>save entry</span>
        </button>
      </footer>
    </form>
  );
}

export default App;
