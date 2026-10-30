import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

/**
 * Renders MDX source inside a Server Component. Compiled at request/build
 * time — no client-side MDX runtime is shipped.
 */
export async function MdxRenderer({ source }: { source: string }) {
  const { default: Content } = await evaluate(source, {
    ...runtime,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  });
  return (
    <div className="prose-guide">
      <Content />
    </div>
  );
}
