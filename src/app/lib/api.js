import {
  account,
  createDocumentOnServer,
  databases,
  fetchData,
  fetchDataList,
  fetchOneData,
} from "../appwrite";
import { Query } from "appwrite";
const databaseId = "6707ae1c0030c33b9ab2";
const patrolRoundsTableId = "670e369a0033e51cd0f7";
const patrolCheckpointTableId = "670e378f0015ebe884b8";
const patrolChecklistTableId = "670e38d1000de521ae95";
const masterRoundTableId = "670f3643003e13f37bd2";
const incidentTableId = "670e3e06001a08ee3263";
const incidentTypeTableId = "670e411c000f5aa45ec0";

export async function getPatrolRoundData() {
  try {
    const response = await fetchDataList(databaseId, patrolRoundsTableId);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}

export async function getAllPatrolCheckpointData() {
  try {
    const response = await fetchDataList(databaseId, patrolCheckpointTableId);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}

export async function getPatrolCheckList(checkpointId) {
  console.log("checkpointId =", checkpointId);
  try {
    const response = await fetchDataList(databaseId, patrolChecklistTableId, [
      Query.equal("CheckpointId", checkpointId),
    ]);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}

export async function getMasterRoundData(areaId) {
  try {
    const response = await fetchDataList(databaseId, masterRoundTableId, [
      Query.equal("areaId", areaId),
    ]);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}

export async function getIncidentData() {
  try {
    const response = await fetchDataList(databaseId, incidentTableId);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}

export async function getIncidentTypeData() {
  try {
    const response = await fetchDataList(databaseId, incidentTypeTableId);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}

export async function updateIncidentStatus(id, dataToSubmit) {
    try{
        const response = await databases.updateDocument(
            databaseId,
            incidentTableId,
            id,
            dataToSubmit
          );
        return response;
    }
    catch (error) {
        console.error("Error update incident data:", error);
    }
}
