import { X } from "lucide-react";
import {
  account,
  createDocumentOnServer,
  databases,
  fetchData,
  fetchDataList,
  fetchOneData,
  storage,
  updateDocumentOnServer,
  deleteDocumentOnServer
} from "../appwrite";
import { Query, ID } from "appwrite";
const databaseId = "6707ae1c0030c33b9ab2";
//Table ID
const patrolRoundsTableId = "670e369a0033e51cd0f7";
const patrolCheckpointTableId = "670e378f0015ebe884b8";
const patrolChecklistTableId = "670e38d1000de521ae95";
const masterRoundTableId = "670f3643003e13f37bd2";
const incidentTableId = "670e3e06001a08ee3263";
const incidentTypeTableId = "670e411c000f5aa45ec0";
const randomPatrolTableId = "6719a886003922e7bfeb";
//Storage ID
const incidentTypeFilesStorageId = "6712275f002246d2f1c7";

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
  try {
    const response = await databases.updateDocument(
      databaseId,
      incidentTableId,
      id,
      dataToSubmit
    );
    return response;
  } catch (error) {
    console.error("Error update incident data:", error);
  }
}

export async function addNewIncidentType(incidentDetail, contacts, files) {

  const mapContact = contacts.map(contact => 
    `${contact.nameSurname};;${contact.tel};;${contact.email}`
  );

  let fileUrls = [];
  if(files.length > 0){
    fileUrls = await Promise.all(files.map(async file => {
      const responseFile = await storage.createFile(
        incidentTypeFilesStorageId,
        "unique()", // Unique ID for the file
        file
      );
      const fileUrl = storage.getFileView(incidentTypeFilesStorageId, responseFile.$id);
      return `${responseFile.name};;${fileUrl.href}`; // Return file name and URL
    }));
  }

  const dataToSubmit = {
    IncidentType_EN: incidentDetail.incidentTypeEN,
    IncidentType_TH: incidentDetail.incidentTypeTH,
    CorrectiveAction: incidentDetail.correctiveAction,
    Contacts: mapContact,
    Attachments: fileUrls,
    IncidentTypeDesc: incidentDetail.incidentTypeTH + "(" + incidentDetail.incidentTypeEN + ")"
  }
  console.log("dataToSubmit", dataToSubmit);
  try {
    const response = createDocumentOnServer(databaseId, incidentTypeTableId, dataToSubmit);
    return response;
  } catch (error) {
    console.log("Error add new incident type data:", error);
    return null;
  }
}

export async function updateIncidentType(incidentDetail, contacts, newFiles) {
  console.log("incidentDetail", incidentDetail);
  const mapContact = contacts.map(contact => 
    `${contact.nameSurname};;${contact.tel};;${contact.email}`
  );
  console.log("newFile =", newFiles);
  let fileUrls = [];
  if(newFiles.length > 0){
    fileUrls = await Promise.all(newFiles.map(async file => {
    const responseFile = await storage.createFile(
      incidentTypeFilesStorageId,
      "unique()", // Unique ID for the file
      file
    );
    const fileUrl = storage.getFileView(incidentTypeFilesStorageId, responseFile.$id);
    return `${responseFile.name};;${fileUrl.href}`; // Return file name and URL
  }));
  }
  
  const dataToSubmit = {
    IncidentType_EN: incidentDetail.incidentTypeEN,
    IncidentType_TH: incidentDetail.incidentTypeTH,
    CorrectiveAction: incidentDetail.correctiveAction,
    Contacts: mapContact,
    Attachments: fileUrls.length > 0 ? [...incidentDetail.attchments, ...fileUrls ] : [...incidentDetail.attchments],
    IncidentTypeDesc: incidentDetail.incidentTypeTH + "(" + incidentDetail.incidentTypeEN + ")"
  }
  console.log("dataToSubmitUpdate", dataToSubmit);
  try {
    const response = updateDocumentOnServer(databaseId, incidentTypeTableId, incidentDetail.id, dataToSubmit);
    return response;
  } catch (error) {
    console.log("Error add new incident type data:", error);
    return null;
  }
}

export async function deleteIncidentType(id) {
  try {
    console.log("id:", id);
    const response = await deleteDocumentOnServer(databaseId, incidentTypeTableId, id);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error deleting data:", error);
  }
}

export async function getAllRandomPatrolCheckpointData() {
  try {
    const response = await fetchDataList(databaseId, randomPatrolTableId);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving RandomPatrolCheckpointData data:", error);
  }
}