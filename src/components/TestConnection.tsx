import React, { useState } from "react";
import { supabase } from "../lib/supabase";

const TestConnection: React.FC = () => {
  const [testResult, setTestResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const testConnection = async () => {
    setIsLoading(true);
    setTestResult("Testing connection...");

    try {
      // Test 1: Basic connection
      const { data: testData, error: testError } = await supabase
        .from("hackathon_registrations")
        .select("count")
        .limit(1);

      if (testError) {
        setTestResult(`Connection test failed: ${testError.message}`);
        return;
      }

      setTestResult("Connection successful! Table is accessible.");

      // Test 2: Try to insert a test record
      const testRecord = {
        name: "Test User",
        email: `test-${Date.now()}@example.com`,
        phone: "+1234567890",
        experience_level: "beginner",
        motivation: "Testing registration system",
        tracks_interested: ["AI/ML"],
        registration_type: "free",
      };

      const { data: insertData, error: insertError } = await supabase
        .from("hackathon_registrations")
        .insert([testRecord])
        .select();

      if (insertError) {
        setTestResult(`Insert test failed: ${insertError.message}`);
        return;
      }

      setTestResult(
        `Insert test successful! Record created with ID: ${insertData?.[0]?.id}`
      );

      // Clean up test record
      if (insertData?.[0]?.id) {
        await supabase
          .from("hackathon_registrations")
          .delete()
          .eq("id", insertData[0].id);
      }
    } catch (error) {
      setTestResult(`Test failed: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", margin: "20px" }}>
      <h3>Supabase Connection Test</h3>
      <button
        onClick={testConnection}
        disabled={isLoading}
        style={{ padding: "10px 20px", marginBottom: "10px" }}
      >
        {isLoading ? "Testing..." : "Test Connection"}
      </button>
      <div
        style={{
          padding: "10px",
          backgroundColor: "#f5f5f5",
          borderRadius: "4px",
          whiteSpace: "pre-wrap",
          fontFamily: "monospace",
        }}
      >
        {testResult}
      </div>
    </div>
  );
};

export default TestConnection;
