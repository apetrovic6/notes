import { useEffect, useRef, useState } from 'react';
import RichTextEditor from '../../../components/RichTextEditor';
import { useRouter } from 'next/router';

import {
  useCollabUpdateNoteMutation,
  useGetNoteQuery,
  useIsOnlineSubscription,
  useNoteUpdatedSubscription,
  useUpdateNoteMutation,
} from '@notes/apollo';
import {
  LoadingOverlay,
  TextInput,
  Box,
  ActionIcon,
  Avatar,
  Tooltip,
} from '@mantine/core';
import { Editor } from '@mantine/rte';
import { showNotification } from '@mantine/notifications';
import { GetServerSideProps } from 'next';
import { IconUserPlus } from '@tabler/icons';
import { openModal } from '@mantine/modals';
import { TestModal } from '../../../components/testModal';

export const NewNote = () => {
  const { query, replace } = useRouter();
  const editorRef = useRef<Editor>();

  const {
    data,
    loading,
    error: getError,
  } = useGetNoteQuery({
    variables: { id: query.noteId as string },
  });

  const [fullNote, setFullNote] = useState({
    ...data?.note,
  });
  const [caret, setCaret] = useState<number>();

  const [updateNote] = useUpdateNoteMutation({
    variables: {
      updateNoteInput: {
        id: fullNote.id,
        title: fullNote.title,
        content: fullNote.content,
      },
    },
  });

  const [online, setOnline] = useState([]);

  const { data: sub, variables, error } = useIsOnlineSubscription();
  console.log('SUB: ', sub);
  useEffect(() => {
    setOnline(s => [...s, sub?.isOnline?.id]);
  }, [sub]);

  const addCollab = () => {
    openModal({
      title: 'Add collaborator',
      children: <TestModal noteId={data?.note?.id} />,
    });
  };

  useNoteUpdatedSubscription({ skip: !query.shared });

  useEffect(() => {
    !query.noteId && replace('/dashboard');
  }, []);

  useEffect(() => {
    // Sets new note data
    setFullNote(() => ({ ...data?.note }));

    // Force new note content into the rich text editor (Because the editor is shite)
    editorRef.current?.editor?.clipboard.dangerouslyPasteHTML(
      data?.note?.content ?? ''
    );

    // Set the caret to the last position before the note updated
    if (caret) {
      editorRef?.current?.editor?.setSelection({
        index: caret,
        length: 0,
      });
    }
  }, [data, editorRef.current?.editor, data?.note?.content]);

  useEffect(() => {
    const test = setTimeout(() => {
      // Get and set the caret state before it updates
      setCaret(() => editorRef?.current?.editor.getSelection()?.index);
      if (fullNote?.id) {
        updateNote();
      }
    }, 800);

    return () => {
      clearTimeout(test);
    };
  }, [fullNote.title, fullNote.content]);

  if (!query.noteId) {
    return <LoadingOverlay visible={!!query.noteId} />;
  }

  if (loading) {
    return <LoadingOverlay visible={loading} />;
  }

  if (getError) {
    showNotification({
      title: getError.name,
      message: getError.message,
      color: 'red',
    });
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Tooltip.Group openDelay={300} closeDelay={100}>
          <Avatar.Group spacing="sm">
            {data?.note?.collaborators.map(user => (
              <Tooltip label={user.email} key={user.id} withArrow>
                <Avatar
                  src=""
                  radius="xl"
                  color={
                    online.find(online => online === user.id) ? 'green' : 'gray'
                  }
                />
              </Tooltip>
            ))}
          </Avatar.Group>
        </Tooltip.Group>
        <Tooltip label="Add a collaborator" openDelay={300} closeDelay={100}>
          <ActionIcon
            mx={50}
            radius={'lg'}
            variant={'subtle'}
            onClick={addCollab}
          >
            <IconUserPlus />
          </ActionIcon>
        </Tooltip>
      </Box>
      <Box>
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
        <RichTextEditor
          editorRef={editorRef}
          radius={'xl'}
          value={fullNote.content}
          onChange={e => setFullNote(state => ({ ...state, content: e }))}
        />
      </Box>
    </>
  );
};

export default NewNote;

export const getServerSideProps: GetServerSideProps = async ctx => {
  if (!ctx.req.cookies.Authorization) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
