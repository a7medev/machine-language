function Header() {
  return (
    <header className="p-5 text-center">
      <h1 className="text-3xl font-black text-blue-700 mb-3">
        Machine Language
      </h1>
      <p className="text-gray-600">
        Simulator for a simple machine language instruction set described in the
        book{' '}
        <b>
          "Computer Science: An Overview 13<sup>th</sup> edition"
        </b>
      </p>
    </header>
  );
}

export default Header;
