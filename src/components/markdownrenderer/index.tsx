import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // For GitHub-flavored Markdown (tables, checkboxes, etc.)
import rehypeHighlight from 'rehype-highlight'; // For syntax highlighting

export default function MessageRenderer({ message }:{ message : any}) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      className="prose dark:prose-dark max-w-none"
    >
      {message}
    </ReactMarkdown>
  );
}
