import { useEffect, useState } from 'react';
import RichTextEditor from '../../../components/RichTextEditor';
import { useRouter } from 'next/router';
import { CreateNoteInput } from '@notes/entities/notes';

import { useCreateNoteMutation, useUpdateNoteMutation } from '@notes/apollo';
import { TextInput } from '@mantine/core';

interface INewNote extends Omit<CreateNoteInput, 'folder'> {
  id?: string;
  folder: { id: string };
}

export const NewNote = () => {
  const {
    query: { folderId },
  } = useRouter();
  const [value, onChange] = useState('<p>Hello World!</p>');
  const [fullNote, setFullNote] = useState<INewNote>({
    title: 'New Note',
    folder: { id: folderId as string },
    content: '',
  });
  const [createNote, { loading, error, data }] = useCreateNoteMutation({
    refetchQueries: ['getFolders'],
  });
  const [updateNote] = useUpdateNoteMutation();

  useEffect(() => {
    createNote({
      variables: { createNoteInput: fullNote },
    });
  }, []);

  useEffect(() => {
    setFullNote(state => ({
      ...state,
      content: value,
    }));

    const test = setTimeout(() => {
      if (data?.createNote?.id) {
        updateNote({
          variables: {
            updateNoteInput: { ...fullNote, id: data?.createNote?.id },
          },
        });
      }
    }, 1000);

    return () => {
      clearTimeout(test);
    };
  }, [value, fullNote.title]);

  return (
    <>
      <TextInput
        placeholder="Title"
        label="Title"
        radius="xl"
        size="lg"
        value={fullNote.title}
        my={20}
        onChange={e =>
          setFullNote(state => ({ ...state, title: e.target.value }))
        }
        required
      />
      <RichTextEditor radius={'xl'} value={value} onChange={onChange} />
    </>
  );
};

export default NewNote;
