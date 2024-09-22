import React, { useState } from "react";

function Home() {
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
      {!getdata && (
        <div className="flex justify-center w-full h-[525px] bg-black">
          <div className="flex justify-center items-center font-mono w-full">
            <div>
              <h1 className="flex pb-9 justify-center text-orange-600 font-bold text-2xl">
                LeetCode Wrap
              </h1>
              <div className="flex gap-3">
                <input
                  className="h-8 w-72 ps-3 rounded-lg"
                  type="text"
                  value={UserName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter Your LeetCode UserName"
                />
                <button
                  className="h-8 w-16 bg-black text-orange-600 rounded-lg"
                  onClick={handleAPI}
                  disabled={loading}
                >
                  {loading ? "Searching..." : "Search"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {getdata && (
        <div className="flex justify-center gap-6 font-mono bg-black text-white h-[525px] items-center">
          {error && <p className="text-black">{error}</p>}
          <div className="flex justify-center flex-col gap-3 text-lg">
            <h1 className="flex justify-center text-orange-600">USER DETAILS</h1>
            <h1 className="hover:text-orange-600">
              <strong>UserName :</strong> {UserName}
            </h1>
            <p className="hover:text-orange-600">
              Problem Solved: <strong>{getdata.totalSolved}</strong>
            </p>
            <p className="hover:text-orange-600">
              Easy Problems Solved: <strong>{getdata.easySolved}</strong>
            </p>
            <p className="hover:text-orange-600">
              Medium Problems Solved: <strong>{getdata.mediumSolved}</strong>
            </p>
            <p className="hover:text-orange-600">
              Hard Problems Solved: <strong>{getdata.hardSolved}</strong>
            </p>
            <p className="hover:text-orange-600">
              Acceptance Rate: <strong>{getdata.acceptanceRate}%</strong>
            </p>
            <p className="hover:text-orange-600">
              Ranking: <strong>{getdata.ranking}</strong>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
