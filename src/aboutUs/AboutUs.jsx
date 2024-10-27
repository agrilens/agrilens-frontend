import React from "react";

export default function AboutUs() {
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px',
    },
    title: {
      fontSize: '2.5rem',
      color: '#2d5a27', // Forest green for agricultural theme
      marginBottom: '20px',
    },
    subtitle: {
      fontSize: '1.2rem',
      color: '#666',
      marginBottom: '40px',
      maxWidth: '800px',
      margin: '0 auto',
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '30px',
      marginBottom: '40px',
    },
    featureCard: {
      padding: '25px',
      backgroundColor: '#f8faf8',
      borderRadius: '8px',
      border: '1px solid #e0e7e0',
    },
    featureTitle: {
      fontSize: '1.25rem',
      color: '#2d5a27',
      marginBottom: '15px',
    },
    featureText: {
      color: '#444',
      lineHeight: '1.6',
    },
    section: {
      marginBottom: '40px',
    },
    teamGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      marginTop: '20px',
    },
    teamMember: {
      textAlign: 'center',
      padding: '15px',
    },
    teamName: {
      fontSize: '1.1rem',
      color: '#2d5a27',
      marginBottom: '5px',
    }
  };

  const team = [
    "Jihadu",
    "Jacqueline",
    "Jessica",
    "Luke",
    "Blair"
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>About AgriLens</h1>
        <p style={styles.subtitle}>
          Empowering resource-constrained farmers with innovative plant health identification and analysis solutions
        </p>
      </div>

      <div style={styles.featuresGrid}>
        <div style={styles.featureCard}>
          <h3 style={styles.featureTitle}>Our Mission</h3>
          <p style={styles.featureText}>
            To provide accessible technology that helps farmers identify plant health issues, optimize resource usage, 
            and make data-driven decisions without requiring extensive technical knowledge.
          </p>
        </div>

        <div style={styles.featureCard}>
          <h3 style={styles.featureTitle}>What We Offer</h3>
          <p style={styles.featureText}>
            Our service combines advanced plant health identification with practical analytics, helping farmers 
            identify diseases and pests while providing valuable insights for resource optimization.
          </p>
        </div>

        <div style={styles.featureCard}>
          <h3 style={styles.featureTitle}>Our Approach</h3>
          <p style={styles.featureText}>
            Using a scrum-based development process, we continuously improve our platform to better serve 
            farmers' needs through regular feedback and agile development.
          </p>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.featureTitle}>Core Features</h2>
        <p style={styles.featureText}>
          • Advanced plant health identification technology<br />
          • Resource optimization through data analytics<br />
          • User-friendly interface for farmers<br />
          • Comprehensive insights for informed decision-making<br />
          • Data aggregation for broader agricultural insights
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.featureTitle}>Our Team</h2>
        <div style={styles.teamGrid}>
          {team.map((member, index) => (
            <div key={index} style={styles.teamMember}>
              <h3 style={styles.teamName}>{member}</h3>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.featureTitle}>Project Status</h2>
        <p style={styles.featureText}>
          We are actively developing AgriLens, focusing on gathering detailed requirements, 
          prototyping key features, and writing production code. Our team is committed to 
          creating a solution that makes a real difference in agricultural management and 
          sustainability.
        </p>
      </div>
    </div>
  );
}
