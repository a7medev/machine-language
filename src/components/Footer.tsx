function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="text-gray-700 dark:text-gray-300 text-center p-4">
      <p>
        Copyright &copy;{' '}
        <a
          href="https://fb.me/a7med.elrefaey"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ahmed Elrefaey
        </a>{' '}
        {year}
      </p>
    </footer>
  );
}

export default Footer;
