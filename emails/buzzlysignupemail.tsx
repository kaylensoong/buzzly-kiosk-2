import React from "react";

const BuzzlySignupEmail: React.FC = () => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Join the Buzz at Buzzly.nz!</h1>
        <p style={styles.paragraph}>
          Sign up to be eligible to compete and win prizes in the Buzzly challenges! Have your voice be heard, today.
        </p>
        <a href="https://buzzly.nz/sign-up" style={styles.button}>
          Sign Up Now
        </a>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    backgroundColor: "#f9fafb",
    padding: "40px 20px",
    display: "flex",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "#ffffff",
    maxWidth: "600px",
    width: "100%",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    padding: "30px",
    textAlign: "center",
    fontFamily: "'Segoe UI', sans-serif",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "12px",
    color: "#111827",
  },
  paragraph: {
    fontSize: "16px",
    color: "#374151",
    margin: "0 0 24px",
  },
  button: {
    backgroundColor: "#6366f1",
    color: "#ffffff",
    padding: "14px 28px",
    textDecoration: "none",
    fontSize: "16px",
    borderRadius: "8px",
    display: "inline-block",
  },
};

export default BuzzlySignupEmail;