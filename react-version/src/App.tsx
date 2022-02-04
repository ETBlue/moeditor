import { useReducer } from "react";
import { useForm } from "react-hook-form";
import { CgChevronDown, CgChevronRight, CgTrash } from "react-icons/cg";
import { MdSave } from "react-icons/md";

import { EntryForm } from "./types";
import { entryFormData } from "./sample";
import "./App.css";

function App() {
  const { register, setValue, watch, handleSubmit } = useForm<EntryForm>({
    defaultValues: entryFormData,
  });
  const addDefinition = () => {
    setValue(`definitions.${watch("definitions").length}`, {
      description: "",
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
      prefix: "",
      text: "",
      separator: "",
      subtext: "",
    });
  };
  const removeExample = (definitionIndex: number, exampleIndex: number) => {
    const examples = watch(`definitions.${definitionIndex}.examples`) || [];
    examples.splice(exampleIndex, 1);
    setValue(`definitions.${definitionIndex}.examples`, examples);
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
    formData.definitions.map(() => false)
  );
  return (
    <form className="App" onSubmit={handleSubmit(onSubmit)}>
      <div id="word" className="grid">
        <div className="field">
          <label>
            <span className="required">word</span>
          </label>
          <input {...register("word", { required: true })} />
        </div>
        <div className="field">
          <label>stem (蔡中涵大辭典)</label>
          <input {...register("stem")} />
        </div>
        <div className="field">
          <label>repetition (蔡中涵大辭典)</label>
          <input {...register("repetition")} />
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
          </div>
          {definitionsVisibility[definitionIndex] && (
            <>
              {definition.examples?.map((example, exampleIndex) => (
                <div key={exampleIndex}>
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
              <div className="addExample">
                <button
                  type="button"
                  onClick={() => {
                    addExample(definitionIndex);
                  }}
                >
                  new example to definition {definitionIndex + 1}
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
