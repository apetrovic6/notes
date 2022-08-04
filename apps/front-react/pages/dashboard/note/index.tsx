import { GetNoteQueryResult, useGetNoteQuery } from '@notes/apollo';
import { useRouter } from 'next/router';
import { LoadingOverlay } from '@mantine/core';

const Note = () => {
  const {
    query: { noteId },
  } = useRouter();
  const { data, loading, error } = useGetNoteQuery<GetNoteQueryResult>({
    variables: { id: noteId },
  });

  if (loading) {
    return <LoadingOverlay visible={loading} />;
  }

  return (
    <div>
      <h1>{data?.note?.title}</h1>

      <div dangerouslySetInnerHTML={{ __html: data?.note?.content }} />
    </div>
  );
};

export default Note;
