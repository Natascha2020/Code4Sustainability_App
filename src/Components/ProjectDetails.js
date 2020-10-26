import React, { useEffect, useState } from "react";
import axiosInstance from "axios";
import * as settings from "./Settings";
import ErrorHandler from "./ErrorHandler";
import { Box, Button, CardBody, CardHeader, Carousel } from "grommet";
import "../Styles/ProjectDetails.css";

const ProjectDetails = (props) => {
  const { projectData, handleDisplay, pending } = props;
  const [updateList, setUpdateList] = useState(false);
  const [projectPending, setProjectPending] = useState([]);
  const [error, setError] = useState("");

  const handleConnect = async (e) => {
    e.preventDefault();
    console.log(settings.urlDeveloper + "/addProject?user_id_p=" + projectData._id);
    try {
      const { data } = await axiosInstance.put(settings.urlDeveloper + "/addProject?user_id_p=" + projectData._id);
      setProjectPending(data);
      setUpdateList(true);
      console.log(data);
    } catch (error) {
      let errorMsg = `Error: ${error}`;
      setError(errorMsg);
      console.error(error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.put(settings.urlDeveloper + "/deletePendingProject?user_id_p=" + projectData._id);
      setProjectPending(data);
      setUpdateList(true);
      console.log(data);
    } catch (error) {
      let errorMsg = `Error: ${error}`;
      setError(errorMsg);
      console.error(error);
    }
  };

  const handleAcceptance = async (e) => {
    e.preventDefault();
    console.log(settings.urlUsers + "/" + projectData._id);
    try {
      const { data } = await axiosInstance.put(settings.urlProject + "/acceptDeveloper?user_id_d=" + projectData._id);
      setProjectPending(data);
      setUpdateList(true);
      console.log(data);
    } catch (error) {
      let errorMsg = `Error: ${error}`;
      setError(errorMsg);
      console.error(error);
    }
  };

  return (
    <div>
      <CardHeader className="cardHeader" pad="small" onClick={handleDisplay}>
        {projectData.name}{" "}
      </CardHeader>
      <CardBody pad="medium">
        <Box height="small">
          <Carousel fill alignSelf="center">
            <div className="carouselInput">
              <div>Webpage: {projectData.webpage}</div>
            </div>

            <div className="carouselInput">
              <div>{projectData.question1}</div>
              <div>{projectData.answer1}</div>
            </div>
            <div className="carouselInput">
              <div>{projectData.question2}</div>
              <div>{projectData.answer2}</div>
            </div>
            <div className="carouselInput">
              <div>{projectData.question3}</div>
              <div>{projectData.answer3}</div>
            </div>
            <div className="carouselInput">Image: {projectData.image}</div>
          </Carousel>
        </Box>
      </CardBody>

      {pending ? (
        <Button
          className="btnCard"
          type="submit"
          primary
          label="Delete interest"
          margin="10"
          onClick={(e) => {
            handleDelete(e);
          }}
        />
      ) : null}
      {pending && projectData.typeOfUser === "Developer" ? (
        <Button
          type="submit"
          primary
          label="Accept interest"
          onClick={(e) => {
            handleAcceptance(e);
          }}
        />
      ) : (
        <Button
          type="submit"
          primary
          label="Send interest"
          onClick={(e) => {
            handleConnect(e);
          }}
        />
      )}

      {error ? <ErrorHandler errorMessage={error} /> : null}
    </div>
  );
};

export default ProjectDetails;
