import React from "react";
console.log("App component is rendering");
import Layout from "./layouts/Layout";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Tracks from "./components/Tracks";
import Prizes from "./components/Prizes";
import Judging from "./components/Judging";
import RegistrationComponent from "./components/RegistrationComponent";
import Footer from "./components/Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Layout title="DataAnalyzer Pro Hackathon 2025 - Think Like an Analyst. Present Like a Pro.">
        <Header />
        <Hero />
        <About />
        <Tracks />
        <Prizes />
        <Judging />
        <RegistrationComponent />
        <Footer />
      </Layout>
    </HelmetProvider>
  );
};

export default App;
