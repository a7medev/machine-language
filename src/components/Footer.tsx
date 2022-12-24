function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="text-gray-700 text-center p-4">
      <p>Copyright &copy; Ahmed Mahmoud {year}</p>
    </footer>
  );
}

export default Footer;
