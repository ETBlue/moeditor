import { useReducer } from 'react';

import { Heteronym } from '../utilities/types';

import Definition from './FormHeteronymDefinition';
import { BlockProps } from './Form';

export type HeteronymId = `heteronyms.${number}`;
export type DefinitionVisibility = boolean[];
export type ToggleDefinitionsVisibility = (action: {
  index: number;
  visibility: boolean;
}) => void;

interface Props extends BlockProps {
  index: number;
  heteronym: Heteronym;
}

function FormHeteronym(props: Props) {
  const { watch, setValue, register, heteronym, index } = props;
  const heteronymId: HeteronymId = `heteronyms.${index}`;

  const addDefinition = () => {
    setValue(
      `${heteronymId}.definitions.${
        watch(`${heteronymId}.definitions`).length
      }`,
      {
        description: '',
      }
    );
  };

  const [definitionsVisibility, toggleDefinitionsVisibility] = useReducer(
    (prev: boolean[], action: { index: number; visibility: boolean }) => {
      const { index, visibility } = action;
      prev[index] = visibility;
      return [...prev];
    },
    heteronym.definitions.map(() => true)
  );

  return (
    <div className="FormHeteronym">
      <hr />
      <h1>Heteronym {index + 1}</h1>
      <div className="field">
        <label>
          <span>name</span>
        </label>
        <input {...register(`heteronyms.${index}.name`)} />
      </div>

      {heteronym.definitions.map((definition, definitionIndex) => (
        <Definition
          key={definitionIndex}
          definitionIndex={definitionIndex}
          definition={definition}
          heteronymId={heteronymId}
          definitionsVisibility={definitionsVisibility}
          toggleDefinitionsVisibility={toggleDefinitionsVisibility}
          {...props}
        />
      ))}
      <hr />
      <button
        type="button"
        className="addDefinition"
        onClick={() => {
          toggleDefinitionsVisibility({
            index: heteronym.definitions.length,
            visibility: true,
          });
          addDefinition();
        }}
      >
        new definition
      </button>
    </div>
  );
}

export default FormHeteronym;
