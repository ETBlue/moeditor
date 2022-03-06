import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { MdSave } from 'react-icons/md';

import Heteronym from './FormHeteronym';
import { convertToJson } from '../utilities/helpers';
import { EntryForm } from '../utilities/types';

interface Props {
  draft: EntryForm;
}

export interface BlockProps {
  watch: UseFormWatch<EntryForm>;
  setValue: UseFormSetValue<EntryForm>;
  register: UseFormRegister<EntryForm>;
}

function Form(props: Props) {
  const { draft } = props;

  const { register, setValue, watch, handleSubmit } = useForm<EntryForm>({
    defaultValues: draft,
  });
  const onSubmit = (data: EntryForm) => {
    console.log(convertToJson(data));
  };
  const formData = watch();
  return (
    <form className="App" onSubmit={handleSubmit(onSubmit)}>
      <div id="word" className="grid">
        <div className="field">
          <label>
            <span className="required">title</span>
          </label>
          <input {...register('title', { required: true, disabled: true })} />
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
      {formData.heteronyms.map((heteronym, index) => (
        <Heteronym
          key={index}
          index={index}
          heteronym={heteronym}
          register={register}
          setValue={setValue}
          watch={watch}
        />
      ))}
      <hr />
      <footer className="grid">
        <span />
        <button type="submit" className="submit">
          <MdSave />
          <span>save entry</span>
        </button>
      </footer>
    </form>
  );
}

export default Form;
