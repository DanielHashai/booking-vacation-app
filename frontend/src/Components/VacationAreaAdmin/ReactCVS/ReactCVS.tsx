import { useState } from "react";
import { CSVLink } from "react-csv";
import CsvModel from "../../../Models/CsvModel";
import "./ReactCVS.css";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

interface CSVProps {
  data: CsvModel[];
}

function ReactCVS(prop: CSVProps): JSX.Element {
  const [Csv, setCsv] = useState<CsvModel[]>([]);

  const headers = [
    { label: "Destination", key: "destination" },
    { label: "Followers", key: "followers" },
  ];

  const data = [
    { firstName: "Daniel", lastName: " Hashai" },
    { firstName: "Debby", lastName: " Hashai" },
  ];

  const csvReport = {
    filename: "Report.csv",
    headers: headers,
    data: prop.data,
  };

  return (
    <div className="ReactCVS">
      {prop.data && (
        <CSVLink
          style={{ textDecoration: "none", color: "#4bb7c4" }}
          className="download-btn"
          data={prop.data}
          headers={headers}
          filename={"Vacation_Followers.csv"}
        >
          Download CSV File <FileDownloadIcon />
        </CSVLink>
      )}
    </div>
  );
}

export default ReactCVS;
