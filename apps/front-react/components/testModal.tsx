import { Button, TextInput } from '@mantine/core';
import { useState } from 'react';
import { GetNoteDocument, useAddCollaboratorMutation } from '@notes/apollo';
import { closeAllModals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';

export const TestModal = ({ noteId }) => {
  const [collab, setCollab] = useState('');

  const [addCollaborator, { loading }] = useAddCollaboratorMutation({
    variables: {
      collaboratorEmail: collab,
      noteId,
    },
    refetchQueries: [GetNoteDocument],
  });

  const onAdd = async () => {
    try {
      await addCollaborator();
    } catch (error) {
      showNotification({
        title: error.name,
        message: error.message,
        color: 'red',
      });
    }
    closeAllModals();
  };
  return (
    <>
      <TextInput
        label={'Email'}
        placeholder={'john@doe.com'}
        data-autofocus
        onChange={e => setCollab(e.target.value)}
        value={collab}
        mb={10}
      />
      <Button fullWidth onClick={onAdd} loading={loading}>
        Add
      </Button>
    </>
  );
};
