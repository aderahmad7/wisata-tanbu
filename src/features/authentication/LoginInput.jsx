function InputLogin({ title, children }) {
  return (
    <>
      <div className="mb-4">
        <p className="text-lg mb-4">{title}</p>
        {children}
      </div>
    </>
  );
}

export default InputLogin;
