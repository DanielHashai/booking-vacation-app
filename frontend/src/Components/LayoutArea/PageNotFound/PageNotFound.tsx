import "./PageNotFound.css";
import notFoundImage from "../../../assets/Images/VacationImages/404-not-found.jpeg";
function PageNotFound(): JSX.Element {
  return (
    <div className="PageNotFound">
      
      <img src={notFoundImage} />
    </div>
  );
}

export default PageNotFound;
