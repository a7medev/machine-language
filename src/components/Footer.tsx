function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="text-gray-700 dark:text-gray-300 text-center p-4">
      <p className="text-sm mb-1">
        This app was developed in Faculty of Computers and Artificial
        Intelligence, Cairo University as part of CS111 under supervision of Dr.
        Mohammad El-Ramly.
      </p>
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
