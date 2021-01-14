import React, { ReactElement } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import gfm from "remark-gfm";

interface Props {
  body: string;
}
const renderers = {
  // eslint-disable-next-line react/prop-types
  code: ({ language, value }) => {
    return <SyntaxHighlighter language={language}>{value}</SyntaxHighlighter>;
  },
};

export default function MyMarkdown({ body }: Props): ReactElement {
  return (
    <ReactMarkdown renderers={renderers} plugins={[gfm]}>
      {body}
    </ReactMarkdown>
  );
}
