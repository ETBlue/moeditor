import { CgChevronDown, CgChevronRight } from 'react-icons/cg';

import { Definition } from '../utilities/types';

import Example from './DefinitionExample';
import { BlockProps } from './Form';
import {
  DefinitionVisibility,
  HeteronymId,
  ToggleDefinitionsVisibility,
} from './FormHeteronym';
import Reference from './DefinitionReference';
import Synonym from './DefinitionSynonym';

export type DefinitionId = `${HeteronymId}.definitions.${number}`;
export type RemoveDefinitionItem = (
  index: number,
  type: 'synonym' | 'reference'
) => void;

interface Props extends BlockProps {
  heteronymId: HeteronymId;
  definitionIndex: number;
  definition: Definition;
  definitionsVisibility: DefinitionVisibility;
  toggleDefinitionsVisibility: ToggleDefinitionsVisibility;
}

function FormHeteronymDefinition(props: Props) {
  const {
    watch,
    setValue,
    register,
    heteronymId,
    definition,
    definitionIndex,
    definitionsVisibility,
    toggleDefinitionsVisibility,
  } = props;
  const definitionId: DefinitionId = `${heteronymId}.definitions.${definitionIndex}`;

  const removeDefinition = () => {
    const definitions = watch(`${heteronymId}.definitions`) || [];
    definitions.splice(definitionIndex, 1);
    setValue(`${heteronymId}.definitions`, definitions);
  };

  const addExample = () => {
    const newExampleIndex = watch(`${definitionId}.examples`)?.length || 0;
    setValue(`${definitionId}.examples.${newExampleIndex}`, {
      amis: '',
      en: '',
      mandarin_fr: '',
    });
  };

  const addDefinitionItem = (heteronymType: 'synonym' | 'reference') => {
    const newDefinitionItemIndex =
      watch(`${definitionId}.${heteronymType}s`)?.length || 0;
    setValue(`${definitionId}.${heteronymType}s.${newDefinitionItemIndex}`, '');
  };
  const removeDefinitionItem = (
    definitionItemIndex: number,
    heteronymType: 'synonym' | 'reference'
  ) => {
    const definitionItems = watch(`${definitionId}.${heteronymType}s`) || [];
    definitionItems.splice(definitionItemIndex, 1);
    setValue(`${definitionId}.${heteronymType}s`, definitionItems);
  };

  return (
    <div className="FormHeteronymDefinition">
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
            <label className="required">definition {definitionIndex + 1}</label>
            <span />
            <button
              type="button"
              className="deleteDefinition"
              onClick={() => {
                removeDefinition();
              }}
            >
              remove definition
            </button>
          </div>
          <input {...register(`${definitionId}.description`)} />
        </div>
        {
          // disabled for now
          // <hr />
          // <div className="field">
          //   <label>type (潘世光、博利亞阿法字典)</label>
          //   <input {...register(`${definitionId}.type`)} />
          // </div>
        }
      </div>
      {definitionsVisibility[definitionIndex] && (
        <>
          {definition.examples?.map((example, exampleIndex) => (
            <Example
              exampleIndex={exampleIndex}
              key={exampleIndex}
              definitionId={definitionId}
              {...props}
            />
          ))}
          <hr />
          <div className="addDefinitionItem">
            <button
              type="button"
              onClick={() => {
                addExample();
              }}
            >
              new example to definition {definitionIndex + 1}
            </button>
          </div>
          {definition.synonyms?.map((synonym, synonymIndex) => (
            <Synonym
              key={synonymIndex}
              synonymIndex={synonymIndex}
              definitionId={definitionId}
              removeDefinitionItem={removeDefinitionItem}
              {...props}
            />
          ))}
          <hr />
          <div className="addDefinitionItem">
            <button
              type="button"
              onClick={() => {
                addDefinitionItem('synonym');
              }}
            >
              new synonym to definition {definitionIndex + 1}
            </button>
          </div>
          {definition.references?.map((reference, referenceIndex) => (
            <Reference
              key={referenceIndex}
              referenceIndex={referenceIndex}
              definitionId={definitionId}
              removeDefinitionItem={removeDefinitionItem}
              {...props}
            />
          ))}
          <hr />
          <div className="addDefinitionItem">
            <button
              type="button"
              onClick={() => {
                addDefinitionItem('reference');
              }}
            >
              new reference to definition {definitionIndex + 1}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default FormHeteronymDefinition;
