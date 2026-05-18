type Props = {
  html: string;
};

export default function ArticleContent({ html }: Props) {
  return (
    <div
      className="article-body max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
