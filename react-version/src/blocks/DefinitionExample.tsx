import { CgTrash } from 'react-icons/cg';

import { BlockProps } from './Form';
import { DefinitionId } from './FormHeteronymDefinition';

type ExampleId = `${DefinitionId}.examples.${number}`;

interface Props extends BlockProps {
  exampleIndex: number;
  definitionId: DefinitionId;
}

function DefinitionExample(props: Props) {
  const { watch, setValue, register, exampleIndex, definitionId } = props;
  const exampleId: ExampleId = `${definitionId}.examples.${exampleIndex}`;

  const removeExample = (exampleIndex: number) => {
    const examples = watch(`${definitionId}.examples`) || [];
    examples.splice(exampleIndex, 1);
    setValue(`${definitionId}.examples`, examples);
  };

  return (
    <div className="DefinitionExample definitionItem">
      <hr />
      <div className="example grid">
        <div className="field">
          <label>example {exampleIndex + 1}</label>
          <input {...register(`${exampleId}.amis`)} />
        </div>
        <div className="field">
          <label>translation (English)</label>
          <input {...register(`${exampleId}.en`)} />
        </div>
        <div className="field">
          <label>translation (French / Mandarin)</label>
          <input {...register(`${exampleId}.mandarin_fr`)} />
        </div>
        <button type="button" onClick={() => removeExample(exampleIndex)}>
          <CgTrash />
        </button>
      </div>
    </div>
  );
}

export default DefinitionExample;
