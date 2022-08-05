import Link from 'next/link';
import { NavLink, Box } from '@mantine/core';
import { IconTrash } from '@tabler/icons';
import { GetFoldersDocument, useRemoveNoteMutation } from '@notes/apollo';
import { Note } from '@notes/entities/notes';
import { useRouter } from 'next/router';
import { FC } from 'react';

export interface INote {
  notes: Pick<Note, 'id' | 'title'>[];
}

export const NoteList: FC<INote> = ({ notes }) => {
  const { replace, query } = useRouter();
  const [removeNote] = useRemoveNoteMutation({
    refetchQueries: [{ query: GetFoldersDocument }],
    awaitRefetchQueries: true,
  });
  return (
    <>
      {notes?.map(note => (
        <Box sx={{ display: 'flex', alignItems: 'center' }} key={note.id}>
          <Link
            key={note.id}
            href={{
              pathname: '/dashboard/note',
              query: { noteId: note.id },
            }}
            as={'/dashboard/note'}
            passHref
          >
            <NavLink key={note.id} label={note.title} component={'a'} />
          </Link>
          <IconTrash
            onClick={() => {
              removeNote({ variables: { id: note.id } });
              if (note.id === query.noteId) {
                replace('/dashboard');
              }
            }}
          />
        </Box>
      ))}
    </>
  );
};
