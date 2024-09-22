import React from "react";

function DashBoard() {
  const [UserName, setUserName] = useState("");
  const [getdata, setgetdata] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAPI = async () => {
    if (!UserName) {
      return;
    }

    const url = `https://leetcode-stats-api.herokuapp.com/${UserName}`;
    setLoading(true);
    setError("");

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("User not found");
      }

      const data = await response.json();
      console.log(data); // Log the entire response

      // Check if the data contains expected fields
      if (data && data.totalSolved !== undefined) {
        setgetdata(data); // Set the whole data object
      } else {
        setError("No data found for this username");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      {error && <p className="text-black">{error}</p>}
        {getdata && (
          <div>
            <h1>
              <strong>UserName :</strong> {UserName}
            </h1>
            <p>
              Problem Solved: <strong>{getdata.totalSolved}</strong>
            </p>
            <p>
              Total Questions: <strong>{getdata.totalQuestions}</strong>
            </p>
            <p>
              Easy Problems Solved: <strong>{getdata.easySolved}</strong>
            </p>
            <p>
              Medium Problems Solved: <strong>{getdata.mediumSolved}</strong>
            </p>
            <p>
              Hard Problems Solved: <strong>{getdata.hardSolved}</strong>
            </p>
            <p>
              Acceptance Rate: <strong>{getdata.acceptanceRate}%</strong>
            </p>
            <p>
              Ranking: <strong>{getdata.ranking}</strong>
            </p>
          </div>
        )}
    </>
  );
}

export default DashBoard;
