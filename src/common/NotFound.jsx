import React from 'react';

const NotFound = () => {
  const styles = {
    container: {
      height: '100vh',
      backgroundColor: '#f4f4f8',
      color: '#1B0866',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      padding: '0 20px',
    },
    heading: {
      fontSize: '100px',
      margin: '0',
    },
    subheading: {
      fontSize: '24px',
      margin: '10px 0 30px',
    },
    button: {
      backgroundColor: '#1B0866',
      color: '#fff',
      border: 'none',
      padding: '12px 24px',
      fontSize: '16px',
      borderRadius: '5px',
      cursor: 'pointer',
      textDecoration: 'none',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404</h1>
      <p style={styles.subheading}>Oops! The page you're looking for doesn't exist.</p>
      <a href="/dashboard" style={styles.button}>Go Home</a>
    </div>
  );
};

export default NotFound;
