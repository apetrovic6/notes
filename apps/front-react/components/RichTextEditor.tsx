import dynamic from 'next/dynamic';
import { Editor, RichTextEditorProps } from '@mantine/rte';
import { Ref } from 'react';

/* eslint-disable */
const TextEdit = dynamic(
  async () => {
    const { default: RQ } = await import('@mantine/rte');

    return ({
      editorRef,
      ...props
    }: RichTextEditorProps & { editorRef: Ref<Editor> }) => (
      <RQ ref={editorRef} {...props} />
    );
  },
  {
    ssr: false,
    loading: () => null,
  }
);

export default TextEdit;
