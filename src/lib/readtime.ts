export function calculateReadTime(content: any[]): string {
  if (!content || !Array.isArray(content)) {
    return '1 min read';
  }

  let wordCount = 0;

  content.forEach((block) => {
    if (block._type === 'block' && block.children) {
      block.children.forEach((child: any) => {
        if (child.text) {
          const words = child.text.trim().split(/\s+/).filter((word: string) => word.length > 0);
          wordCount += words.length;
        }
      });
    }
  });

  const minutes = Math.max(1, Math.ceil(wordCount / 200));

  return `${minutes} min read`;
}
