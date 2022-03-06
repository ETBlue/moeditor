import { CgTrash } from 'react-icons/cg';

import { BlockProps } from './Form';
import { DefinitionId, RemoveDefinitionItem } from './FormHeteronymDefinition';

type ReferenceId = `${DefinitionId}.references.${number}`;

interface Props extends BlockProps {
  referenceIndex: number;
  definitionId: DefinitionId;
  removeDefinitionItem: RemoveDefinitionItem;
}

function DefinitionReference(props: Props) {
  const { removeDefinitionItem, register, referenceIndex, definitionId } =
    props;
  const referenceId: ReferenceId = `${definitionId}.references.${referenceIndex}`;

  return (
    <div className="DefinitionReference definitionItem">
      <hr />
      <div className="reference grid">
        <div className="field">
          <label>reference {referenceIndex + 1} (蔡中涵大辭典)</label>
          <input {...register(referenceId)} />
        </div>
        <button
          type="button"
          onClick={() => removeDefinitionItem(referenceIndex, 'reference')}
        >
          <CgTrash />
        </button>
      </div>
    </div>
  );
}

export default DefinitionReference;
