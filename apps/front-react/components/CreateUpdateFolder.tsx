import { Button, TextInput } from '@mantine/core';
import { closeAllModals } from '@mantine/modals';
import { FC, useState } from 'react';

interface ICreateUpdateFolder {
  possibleTitle?: string;
  mutation: () => (payload) => any;
  payload: {
    variables: {
      updateFolderInput?: { title: string; id?: string };
      createFolderInput?: { title: string };
    };
  };
}

export const CreateUpdateFolder: FC<ICreateUpdateFolder> = ({
  possibleTitle,
  mutation,
  payload,
}) => {
  const [title, setTitle] = useState(possibleTitle ?? '');

  if (possibleTitle) {
    payload.variables.updateFolderInput.title = title;
  } else {
    payload.variables.createFolderInput.title = title;
  }

  return (
    <>
      <TextInput
        label={'Folder Name'}
        placeholder={'New Folder'}
        data-autofocus
        value={title}
        onChange={e => setTitle(e.target.value)}
        mb={10}
      />
      <Button
        fullWidth
        onClick={() => {
          mutation()(payload);
          closeAllModals();
        }}
      >
        {possibleTitle ? 'Update' : 'Create'}
      </Button>
    </>
  );
};
