import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { MdAdd, MdSave } from 'react-icons/md';

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
  const addHeteronym = () => {
    setValue(`heteronyms.${watch('heteronyms').length}`, {
      name: '',
      definitions: [],
    });
  };
  const deleteHeteronym = (index: number) => {
    const heteronyms = watch(`heteronyms`) || [];
    heteronyms.splice(index, 1);
    setValue(`heteronyms`, heteronyms);
  };
  const onSubmit = (data: EntryForm) => {
    console.log(convertToJson(data));
  };
  const formData = watch();
  return (
    <form className="App" onSubmit={handleSubmit(onSubmit)}>
      <header>
        <h1>edit lexicon</h1>
      </header>
      <section className="fields">
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
            deleteHeteronym={deleteHeteronym}
          />
        ))}
        <hr />
      </section>
      <footer className="grid">
        <button
          type="button"
          className="addHeteronym"
          onClick={() => {
            addHeteronym();
          }}
        >
          <MdAdd />
          <span>add heteronym</span>
        </button>
        <span />
        <button type="submit" className="submit">
          <MdSave />
          <span>save lexicon</span>
        </button>
      </footer>
    </form>
  );
}

export default Form;
