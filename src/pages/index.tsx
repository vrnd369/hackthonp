import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Tracks from "../components/Tracks";
import Prizes from "../components/Prizes";
import Judging from "../components/Judging";
import Registration from "../components/Registration";
import TestConnection from "../components/TestConnection";
import Footer from "../components/Footer";
import AuthComponent from "../components/Auth";
import { supabase } from "../lib/supabase";
import type { User } from "@supabase/supabase-js";

const IndexPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Get current user on mount
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <Layout title="DataAnalyzer Pro Hackathon 2025 - Think Like an Analyst. Present Like a Pro.">
      <Header />
      <Hero />
      <About />
      <Tracks />
      <Prizes />
      <Judging />
      <Registration />
      <TestConnection />
      {!user ? (
        <AuthComponent />
      ) : (
        <div style={{ textAlign: "center", margin: "2rem 0" }}>
          <h2>Welcome, {user.email}!</h2>
          <button onClick={() => supabase.auth.signOut()}>Logout</button>
          {/* TODO: Fetch and display user's registration data here */}
        </div>
      )}
      <Footer />
    </Layout>
  );
};

export default IndexPage;
