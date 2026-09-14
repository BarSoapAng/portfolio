import type { MDXComponents } from "mdx/types";
import {
  Body,
  Emphasis,
  Heading1,
  Heading2,
  Heading3,
  InlineCode,
  ListItem,
  OrderedList,
  Quote,
  Strong,
  UnorderedList,
} from "@components/ui/Typography";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: Heading1,
    h2: Heading2,
    h3: Heading3,
    p: Body,
    ul: UnorderedList,
    ol: OrderedList,
    li: ListItem,
    blockquote: Quote,
    strong: Strong,
    em: Emphasis,
    code: InlineCode,
    ...components,
  };
}
