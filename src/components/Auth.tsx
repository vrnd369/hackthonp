import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../lib/supabase";

const AuthComponent = () => (
  <div style={{ maxWidth: 400, margin: "0 auto" }}>
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      providers={["google"]} // You can add more providers if enabled in Supabase
    />
  </div>
);

export default AuthComponent;
