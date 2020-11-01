import React, { useEffect, useState } from "react";
import axiosInstance from "../../Helpers/axios";
import ProjectOverviewCard from "../ProjectList/ProjectOverviewCard";
import ErrorHandler from "../../Helpers/ErrorHandler";
import * as settings from "../../Helpers/Settings";
import Chat from "../Chat/MainChat";

import "./MatchesAccepted.css";

const MatchesAccepted = (props) => {
  const { userId, typeOfUser } = props;
  const [matchedData, setMatchedData] = useState([]);
  const [cards, setCardData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const { data: matchedData } = await axiosInstance.get(settings.urlUsers + "/getDashboard");
        if (matchedData.developers_matched /* && matchedData.developers_matched.length */) {
          const arrayOfComponents = matchedData.developers_matched.map(async (projectId, index) => {
            const { data } = await axiosInstance.get(`${settings.urlUsers}/${projectId}`);
            return data;
            // return <ProjectOverviewCard key={projectId} projectData={data} />;
          });
          const cardData = await Promise.all(arrayOfComponents);
          setCardData(cardData);
        } /* if (matchedData.projects_matched && matchedData.projects_matched.length) */ else {
          const arrayOfComponents = matchedData.projects_matched.map(async (projectId, index) => {
            const { data } = await axiosInstance.get(`${settings.urlUsers}/${projectId}`);
            console.log(data);
            return data;
            // return <ProjectOverviewCard key={projectId} projectData={data} />;
          });
          const cardData = await Promise.all(arrayOfComponents);
          setCardData(cardData);
        }
      } catch (error) {
        let errorMsg = `Error: ${error}`;
        setError(errorMsg);
        console.error(error);
      }
    };

    handleFetch();
  }, [matchedData]);

  //delete project from dashboard-array(matched) and (on project detailed card)/will not be displayed on MatchesAccepted
  const onDeleteMatched = async (card, cardIndex) => {
    console.log("delete me");
    console.log(card);
    console.log(settings.urlDeveloper + "/deleteMatchedProject?user_id_p=" + card._id);
    try {
      //check if current user is a developer or project to delete on specific route
      typeOfUser === "Project"
        ? await axiosInstance.put(settings.urlProject + "/deleteMatchedDeveloper?user_id_d=" + card._id)
        : await axiosInstance.put(settings.urlDeveloper + "/deleteMatchedProject?user_id_p=" + card._id);

      const newState = cards.filter((element, secondIndex) => secondIndex !== cardIndex);

      setCardData([...newState]);
    } catch (error) {
      let errorMsg = `Error: ${error}`;
      setError(errorMsg);
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="titleMatchesAccepted ">Matches accepted</h2>
      {cards && cards.length
        ? cards.map((card, index) => (
            <div className="chatWrapper">
              <ProjectOverviewCard onDeleteMatched={(e) => onDeleteMatched(card, index)} ey={card._id} key={card._id} projectData={card} />
              <Chat userId={userId} projectData={card} typeOfUser={typeOfUser} />
            </div>
          ))
        : null}

      {/*HERE TO START: if developer, display developer profile card*/}
      {/* {cards && cards.length ? cards.map((card) => <ProfileCard key={card._id} personalData={card} pending={true} />) : null} */}
      {error ? <ErrorHandler errorMessage={error} /> : null}
    </div>
  );
};

export default MatchesAccepted;
