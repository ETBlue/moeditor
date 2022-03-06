import { CgTrash } from 'react-icons/cg';

import { BlockProps } from './Form';
import { DefinitionId, RemoveDefinitionItem } from './FormHeteronymDefinition';

type SynonymId = `${DefinitionId}.synonyms.${number}`;

interface Props extends BlockProps {
  synonymIndex: number;
  definitionId: DefinitionId;
  removeDefinitionItem: RemoveDefinitionItem;
}

function DefinitionSynonym(props: Props) {
  const { removeDefinitionItem, register, synonymIndex, definitionId } = props;
  const synonymId: SynonymId = `${definitionId}.synonyms.${synonymIndex}`;

  return (
    <div className="DefinitionSynonym definitionItem">
      <hr />
      <div className="synonym grid">
        <div className="field">
          <label>synonym {synonymIndex + 1}</label>
          <input {...register(synonymId)} />
        </div>
        <button
          type="button"
          onClick={() => removeDefinitionItem(synonymIndex, 'synonym')}
        >
          <CgTrash />
        </button>
      </div>
    </div>
  );
}

export default DefinitionSynonym;
