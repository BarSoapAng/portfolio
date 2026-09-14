import createMDX from "@next/mdx";

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-frontmatter"],
  },
});

/** @type {import("next").NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
};

export default withMDX(nextConfig);
