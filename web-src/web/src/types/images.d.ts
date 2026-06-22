declare module '*.png' {
  const value: string;
  export default value;
}
declare module '*.jpg' {
  const value: string;
  export default value;
}
declare module '*.jpeg' {
  const value: string;
  export default value;
}

// Type definition for SVG file
declare module "*.svg" {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGAElement> & { title?: string }>;

  const src: string;
  export default src;
}

// If using query params like ?url or ?react
declare module '*.svg?url' {
  const src: string;
  export default src;
}

declare module '*.svg?react' {
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGAElement> & { title?: string }>;
  export default ReactComponent;
}