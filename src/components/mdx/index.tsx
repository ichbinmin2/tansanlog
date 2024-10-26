import { MDXComponents } from "mdx/types";
import { ExternalLink } from "./link";
import { Image } from "./image";
import { Callout } from "./callout";

export const MdxComponents: MDXComponents = {
  a: ExternalLink as any,
  img: Image as any,
  blockquote: Callout,
  Callout,
};
