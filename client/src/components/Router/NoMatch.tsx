import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <Link to="/">
      <span style={{ fontSize: "3rem" }}>404 Page d'accueil</span>
    </Link>
  );
};

export default NoMatch;
