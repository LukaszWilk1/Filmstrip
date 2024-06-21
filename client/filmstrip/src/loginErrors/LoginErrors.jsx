const LoginErrors = ({ errorType }) => {
  switch (errorType) {
    case "emptyInputs":
      return (
        <p className="text-red-600 text-center">
          You must enter data into all fields!
        </p>
      );
    case "wrongPassword":
      return <p className="text-red-600 text-center">Wrong password!</p>;
    case "wrongLogin":
      return (
        <p className="text-red-600 text-center">
          There is no user with this login!
        </p>
      );
    default:
        return <></>
  }
};

export default LoginErrors;
