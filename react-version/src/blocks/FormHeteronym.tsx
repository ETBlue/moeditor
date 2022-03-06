import { useReducer } from 'react';
import { CgChevronDown, CgChevronRight } from 'react-icons/cg';

import { Heteronym } from '../utilities/types';

import Definition from './FormHeteronymDefinition';
import { BlockProps } from './Form';
import { MdWarning } from 'react-icons/md';

export type HeteronymId = `heteronyms.${number}`;
export type DefinitionVisibility = boolean[];
export type ToggleDefinitionsVisibility = (action: {
  index: number;
  visibility: boolean;
}) => void;

interface Props extends BlockProps {
  index: number;
  heteronym: Heteronym;
  deleteHeteronym: (heteronymIndex: number) => void;
}

function FormHeteronym(props: Props) {
  const { watch, setValue, register, heteronym, index, deleteHeteronym } =
    props;
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
    (
      prev: boolean[],
      action: { index: number | 'all'; visibility: boolean }
    ) => {
      const { index, visibility } = action;
      if (index === 'all') {
        return prev.map(() => visibility);
      } else {
        prev[index] = visibility;
        return [...prev];
      }
    },
    heteronym.definitions.map(() => true)
  );
  const isCollapsable = definitionsVisibility.includes(true);

  return (
    <div className="FormHeteronym">
      <hr />
      <h2 className="heteronym grid">
        {isCollapsable ? (
          <button
            type="button"
            className="icon text"
            onClick={(e) => {
              e.preventDefault();
              toggleDefinitionsVisibility({
                index: 'all',
                visibility: false,
              });
            }}
          >
            <CgChevronDown />
          </button>
        ) : (
          <button
            type="button"
            className="icon text"
            onClick={(e) => {
              e.preventDefault();
              toggleDefinitionsVisibility({
                index: 'all',
                visibility: true,
              });
            }}
          >
            <CgChevronRight />
          </button>
        )}
        Heteronym {index + 1}
        <span />
        <button
          type="button"
          className="deleteHeteronym"
          onClick={() => {
            deleteHeteronym(index);
          }}
        >
          <MdWarning />
          <span>delete heteronym</span>
        </button>
      </h2>
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
        add definition
      </button>
    </div>
  );
}

export default FormHeteronym;
