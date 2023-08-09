import React, { useCallback, useState } from 'react';
import { ReactTags } from 'react-tag-autocomplete';
import 'react-tagsinput/react-tagsinput.css'; // Import the CSS for styling
import { tagSuggestions } from './tags-suggestion'; // Import your suggestions

interface ExampleProps {
  value?: string;
  onChange?: (newValue: string) => void;
  onBlur?: () => void;
}

const Example = ({
  value,
  onChange,
  onBlur
}: ExampleProps) => {
  const [selected, setSelected] = useState<any[]>([]); // Use 'any[]' or the appropriate type

  const onAdd = useCallback(
    (newTag: any) => {
      setSelected([...selected, newTag]);
    },
    [selected]
  );

  const onDelete = useCallback(
    (tagIndex: any) => {
      setSelected(selected.filter((_, i) => i !== tagIndex));
    },
    [selected]
  );

  return (
    <ReactTags
      labelText="Select countries"
      selected={selected}
      suggestions={tagSuggestions}
      onAdd={onAdd}
      onDelete={onDelete}
      noOptionsText="No matching countries"
    />
  );
};

export default Example;
