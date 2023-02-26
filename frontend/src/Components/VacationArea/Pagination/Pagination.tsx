import { NavLink } from "react-router-dom";
import "./Pagination.css";

interface PaginationProps {
  totalPosts: number;
  postsPerPage: number;
  paginate: any;
}

function Pagination(prop: PaginationProps): JSX.Element {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(prop.totalPosts / prop.postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <ul className="Pagination">
      {pageNumbers.map((number) => (
        <li key={number} className="page-item">
          <NavLink
            onClick={() => prop.paginate(number)}
            to="/vacations"
            className="page-link"
          >
            {number}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default Pagination;
