import { Button, TextInput } from '@mantine/core';
import { closeAllModals } from '@mantine/modals';
import { useCreateFolderMutation } from '@notes/apollo';
import { useState } from 'react';

export const CreateFolder = () => {
  const [title, setTitle] = useState('');

  const [createFolder] = useCreateFolderMutation({
    refetchQueries: ['getFolders'],
  });
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
          createFolder({ variables: { createFolderInput: { title } } });
          closeAllModals();
        }}
      >
        Create
      </Button>
    </>
  );
};
