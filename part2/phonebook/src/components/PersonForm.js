import React from "react";

const PersonForm = ({
  onSubmit,
  valueName,
  ValueNumber,
  onChangeName,
  onChangeNumber,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={valueName} onChange={onChangeName} />
      </div>
      <div>
        number: <input value={ValueNumber} onChange={onChangeNumber} />
      </div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
