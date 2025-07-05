declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '@supabase/auth-ui-react';
declare module '@supabase/auth-ui-shared';
