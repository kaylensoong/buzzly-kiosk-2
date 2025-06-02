import React from "react";

interface BuzzlySignupEmailProps {
  personalityType: string;
  description: string;
}

const BuzzlySignupEmail: React.FC<BuzzlySignupEmailProps> = ({
  personalityType,
  description,
}) => {
  return (
    

    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h1 style={styles.heading}>🌟 You’re {personalityType}!</h1>
        <p style={styles.highlight}>{description}</p>

        <p style={styles.paragraph}>
          Thanks for participating in the Buzzly challenge. As <strong>{personalityType}</strong>, you bring unique ideas and energy to help shape a better, youth-friendly Auckland.
        </p>
        
        <p style={styles.paragraph}>
          Make sure you're signed up to win prizes, get notified about future challenges, and connect with other changemakers!
        </p>

        <a href="https://buzzly.nz/sign-up" style={styles.button}>
          🚀 Sign Up Now at Buzzly.nz
        </a>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    backgroundColor: "#f0f4ff",
    padding: "40px 20px",
    display: "flex",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "#ffffff",
    maxWidth: "600px",
    width: "100%",
    borderRadius: "12px",
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.07)",
    padding: "30px",
    textAlign: "center",
    fontFamily: "'Segoe UI', sans-serif",
  },
  heading: {
    fontSize: "26px",
    marginBottom: "14px",
    color: "#1d4ed8",
  },
  highlight: {
    fontSize: "16px",
    color: "#4b5563",
    fontStyle: "italic",
    marginBottom: "20px",
  },
  paragraph: {
    fontSize: "15px",
    color: "#374151",
    margin: "0 0 18px",
  },
  button: {
    backgroundColor: "#6366f1",
    color: "#ffffff",
    padding: "14px 28px",
    textDecoration: "none",
    fontSize: "16px",
    borderRadius: "8px",
    display: "inline-block",
    marginTop: "12px",
  },
};

export default BuzzlySignupEmail;