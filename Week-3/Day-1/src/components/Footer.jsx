function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer>
      <p>&copy; {currentYear} React Fundamentals Learning App</p>
    </footer>
  );
}

export default Footer;