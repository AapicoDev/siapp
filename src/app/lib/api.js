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
//#region --Master Data--
const masterRoundTableId = "670f3643003e13f37bd2";
const masterCheckListTableId = "670f555d003447303ed7"; 
const masterAreaTableId = "6707b0f400163a29999f";
const masterCustomerTableId = "6707af2b00146964c139";
const masterShiftTableId = "671099270021b17e6d5c"; 
const masterCheckpointTableId = "670f46d1001fe205beaf";
const masterManpowerRoleTableId = "6721d7c9000b4fb3431a";
const masterAssignedManpowerTableId = "6721d91c00335cc2011c";
const masterRandomPatrolReasonTableId = "6719accc000ca3be7e73";
//#endregion --Master Data--

const patrolRoundsTableId = "670e369a0033e51cd0f7";
const patrolCheckpointTableId = "670e378f0015ebe884b8";
const patrolChecklistTableId = "670e38d1000de521ae95";
const incidentTableId = "670e3e06001a08ee3263";
const incidentTypeTableId = "670e411c000f5aa45ec0";
const randomPatrolTableId = "6719a886003922e7bfeb";
//Storage ID
const incidentTypeFilesStorageId = "6712275f002246d2f1c7";

//#region Master Data
export async function getAllMasterCustomerData() {
  try {
    const response = await fetchDataList(databaseId, masterCustomerTableId);
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
export async function getAllMasterCheckListData() {
  try {
    const response = await fetchDataList(databaseId, masterCheckListTableId);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}
export async function getAllMasterAreaData() {
  try {
    const response = await fetchDataList(databaseId, masterAreaTableId);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}
export async function getMasterShiftData(customerId) {
  try {
    const response = await fetchDataList(databaseId, masterShiftTableId, [
      Query.equal("customerID", customerId),
    ]);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}
export async function getMasterCheckpointData(areaId) {
  try {
    const response = await fetchDataList(databaseId, masterCheckpointTableId, [
      Query.equal("areaId", areaId),
    ]);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}
export async function getMasterManpowerRoleData(shiftIds) {
  try {
    const response = await fetchDataList(databaseId, masterManpowerRoleTableId, [
      Query.contains("shift_Id", shiftIds),
    ]);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}
export async function getMasterAssignedManpowerData(shiftIds) {
  try {
    const response = await fetchDataList(databaseId, masterAssignedManpowerTableId, [
      Query.contains("shift_Id", shiftIds),
    ]);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}
export async function getAllAssignedManpowerData() {
  try {
    const response = await fetchDataList(databaseId, masterAssignedManpowerTableId);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
    return null;
  }
}
export async function getAllMasterRandomPatrolReason() {
  try {
    const response = await fetchDataList(databaseId, masterRandomPatrolReasonTableId);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}

export async function addNewRandomPatrol(patrolRandomDetail) {
  const dataToSubmit = {
    reason: patrolRandomDetail.randomPatrolReason,
    checkList_Id: patrolRandomDetail.checklist,
  }
  console.log("dataToSubmit", dataToSubmit);
  try {
    const response = createDocumentOnServer(databaseId, masterRandomPatrolReasonTableId, dataToSubmit);
    return response;
  } catch (error) {
    console.log("Error add new random patrol reason data:", error);
    return null;
  }
}
export async function updateRandomPatrol(id, randomPatrol) {
  const dataToSubmit = {
    reason: randomPatrol.randomPatrolReason,
    checkList_Id: randomPatrol.checklist,
  }
  console.log("dataToSubmit", dataToSubmit);
  console.log("id", id);
  try {
    const response = await databases.updateDocument(
      databaseId,
      masterRandomPatrolReasonTableId,
      id,
      dataToSubmit
    );
    return response;
  } catch (error) {
    console.error("Error update Random Patrol data:", error);
    return null;
  }
}
export async function deleteRandomPatrol(id) {
  try {
    console.log("id:", id);
    const deletePromises = id.map((data) => {
      return databases.deleteDocument(
        databaseId,
        masterRandomPatrolReasonTableId,
        data
      );
    });
    const results = await Promise.all(deletePromises);
    console.log("Documents delete successfully:", results);
    return results;
  } catch (error) {
    console.error("Error deleting data:", error);
    return null;
  }
}
export async function deleteCheckpoint(id) {
  try {
    console.log("id:", id);
    const response = await deleteDocumentOnServer(databaseId, masterCheckpointTableId, id);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error deleting data:", error);
    return null;
  }
}
export async function addNewCheckpoint(checkpointData) {
  const documentIds = [];
  const promises = checkpointData.map(async (data) => {
    try {
      const document = await databases.createDocument(databaseId, masterCheckpointTableId, 'unique()', data);
      console.log('Document created:', document.$id);
      documentIds.push(document.$id); // Add the document ID to the list
    } catch (error) {
      console.error('Error creating document:', error);
      return null;
    }
  });

  // Wait for all promises to resolve
  await Promise.all(promises);
  return documentIds;
}
export async function updateCheckpoint(updatecheckpointData) {
  try {
    const updatePromises = updatecheckpointData.map((data) => {
      return databases.updateDocument(
        databaseId,
        masterCheckpointTableId,
        data.documentId, // each object should include documentId to specify the document
        data.updateFields // fields you want to update in each document
      );
    });
    const results = await Promise.all(updatePromises);
    console.log("Documents updated successfully:", results);
    return results;
  } catch (error) {
    console.error("Error updating documents:", error);
    return null;
  }
}
export async function updateAreaData(id, dataToSubmit) {
  try {
    const response = await databases.updateDocument(
      databaseId,
      masterAreaTableId,
      id,
      dataToSubmit
    );
    return response;
  } catch (error) {
    console.error("Error update incident data:", error);
  }
}
export async function updatAssignedManpower(updateAssignedMnapowerData) {
  try {
    const updatePromises = updateAssignedMnapowerData.map((data) => {
      return databases.updateDocument(
        databaseId,
        masterAssignedManpowerTableId,
        data.documentId, // each object should include documentId to specify the document
        data.updateFields // fields you want to update in each document
      );
    });
    const results = await Promise.all(updatePromises);
    console.log("Documents updated successfully:", results);
    return results;
  } catch (error) {
    console.error("Error updating documents:", error);
    return null;
  }
}
export async function deleteAssignedManpower(id) {
  try {
    console.log("id:", id);
    const deletePromises = id.map((data) => {
      return databases.deleteDocument(
        databaseId,
        masterAssignedManpowerTableId,
        data
      );
    });
    const results = await Promise.all(deletePromises);
    console.log("Documents delete successfully:", results);
    return results;
  } catch (error) {
    console.error("Error deleting data:", error);
    return null;
  }
}
export async function addNewAssignedManpower(assignedManpowerdata) {
  const documentIds = [];
  const promises = assignedManpowerdata.map(async (data) => {
    try {
      const document = await databases.createDocument(databaseId, masterAssignedManpowerTableId, 'unique()', data);
      console.log('Document created:', document.$id);
      documentIds.push(document.$id); // Add the document ID to the list
    } catch (error) {
      console.error('Error creating document:', error);
      return null;
    }
  });

  // Wait for all promises to resolve
  await Promise.all(promises);
  return documentIds;
}
//#endregion Master Data

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