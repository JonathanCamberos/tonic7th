declare module "*.mdx" {
  import * as React from "react";

  const MDXComponent: (props: React.ComponentProps<"div">) => JSX.Element;
  export default MDXComponent;
}

declare module "*.xml" {
  const value: string;
  export default value;
}
