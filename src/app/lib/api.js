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
  deleteDocumentOnServer,
} from "../appwrite";
import { Query, ID } from "appwrite";
const databaseId = "6707ae1c0030c33b9ab2";
//Table ID
//#region --Master Data--
const masterRoundTableId = "670f3643003e13f37bd2";
const masterCheckListTableId = "670f555d003447303ed7";
const masterAreaTableId = "6707b0f400163a29999f";
const masterCustomerTableId = "6707af2b00146964c139";
const masterDepartmentTableId = "672acb900004b4be2f80";
const masterSegmentTableId = "672acc460030f0867d58";
const masterGroupTableId = "672acc9a00067bb6ac35";
const masterZoneTableId = "672acd19002824db57ce";
const masterShiftTableId = "671099270021b17e6d5c";
const masterCheckpointTableId = "670f46d1001fe205beaf";
const masterManpowerPositionTableId = "6721d7c9000b4fb3431a";
const masterAssignedManpowerTableId = "6721d91c00335cc2011c";
const masterRandomPatrolReasonTableId = "6719accc000ca3be7e73";
const masterContrtactTableId = "672d8495000cf8fb50de";
const masterPatrolAlertToTableId = "67315d130009a64ab015";
//#endregion --Master Data--

const patrolRoundsTableId = "670e369a0033e51cd0f7";
const patrolCheckpointTableId = "670e378f0015ebe884b8";
const patrolChecklistTableId = "670e38d1000de521ae95";
const incidentTableId = "670e3e06001a08ee3263";
const incidentTypeTableId = "670e411c000f5aa45ec0";
const randomPatrolTableId = "6719a886003922e7bfeb";
//Storage ID
const incidentTypeFilesStorageId = "6712275f002246d2f1c7";
const contractAttachFilesStorageId = "672dbfec00034b72f0b0";

//#region Master Data
export async function getAllMasterDepartmentData() {
  try {
    const response = await fetchDataList(databaseId, masterDepartmentTableId);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}
export async function getAllMasterSegmentData() {
  try {
    const response = await fetchDataList(databaseId, masterSegmentTableId);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}
export async function getAllMasterGroupData() {
  try {
    const response = await fetchDataList(databaseId, masterGroupTableId);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}
export async function getAllMasterZoneData() {
  try {
    const response = await fetchDataList(databaseId, masterZoneTableId);
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

//#region master_Customer
export async function getAllMasterCustomerData() {
  try {
    const response = await fetchDataList(databaseId, masterCustomerTableId);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}
export async function updateCustomer(dataToSubmit, id) {
  console.log("id:", id);
  try {
    const response = await databases.updateDocument(
      databaseId,
      masterCustomerTableId,
      id,
      dataToSubmit
    );
    return response;
  } catch (error) {
    console.error("Error update Customer data:", error);
    return null;
  }
}
export async function addNewCustomer(dataToSubmit) {
  console.log("dataToSubmit", dataToSubmit);
  try {
    const response = createDocumentOnServer(
      databaseId,
      masterCustomerTableId,
      dataToSubmit
    );
    return response;
  } catch (error) {
    console.log("Error add new customer data:", error);
    return null;
  }
}
export async function deleteCustomer(id) {
  try {
    console.log("id:", id);
    const deletePromises = id.map((data) => {
      return databases.deleteDocument(databaseId, masterCustomerTableId, data);
    });
    const results = await Promise.all(deletePromises);
    console.log("Documents delete successfully:", results);
    return results;
  } catch (error) {
    console.error("Error deleting data:", error);
    return null;
  }
}
//#endregion master_Customer

//#region master_Areas
export async function getAllMasterAreaData() {
  try {
    const response = await fetchDataList(databaseId, masterAreaTableId);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}
export async function getMasterAreaDataWithCustomerId(customerId) {
  try {
    const response = await fetchDataList(databaseId, masterAreaTableId, [
      Query.equal("CustomerId", customerId),
    ]);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}
export async function getMasterAreaData(field, value) {
  try {
    const response = await fetchDataList(databaseId, masterAreaTableId, [
      Query.equal(field, value),
    ]);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}
export async function addNewArea(areaData) {
  const documentIds = [];
  const promises = areaData.map(async (data) => {
    try {
      const document = await databases.createDocument(
        databaseId,
        masterAreaTableId,
        "unique()",
        data
      );
      console.log("Document created:", document.$id);
      documentIds.push(document.$id); // Add the document ID to the list
    } catch (error) {
      console.error("Error creating document:", error);
      return null;
    }
  });

  // Wait for all promises to resolve
  await Promise.all(promises);
  return documentIds;
}
export async function deleteArea(id) {
  try {
    console.log("id:", id);
    const deletePromises = id.map((data) => {
      return databases.deleteDocument(databaseId, masterAreaTableId, data);
    });
    const results = await Promise.all(deletePromises);
    console.log("Documents delete successfully:", results);
    return results;
  } catch (error) {
    console.error("Error deleting data:", error);
    return null;
  }
}
export async function updateArea(updateAreaData) {
  try {
    const updatePromises = updateAreaData.map((data) => {
      return databases.updateDocument(
        databaseId,
        masterAreaTableId,
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
//#endregion master_Areas

//#region master_Contrtacts
export async function getAllMasterContractData() {
  try {
    const response = await fetchDataList(databaseId, masterContrtactTableId);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}
export async function queryMasterContract(field, value) {
  try {
    const response = await fetchDataList(databaseId, masterContrtactTableId, [
      Query.equal(field, value),
    ]);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}
export async function updateContract(id, dataToSubmit) {
  if (dataToSubmit.attachments?.length > 0) {
  }
  try {
    const response = await databases.updateDocument(
      databaseId,
      masterContrtactTableId,
      id,
      dataToSubmit
    );
    return response;
  } catch (error) {
    console.error("Error update incident data:", error);
  }
}
export async function updateDataOfContract(contractDataToSubmit, newFiles) {
  //Upload attach files
    console.log("newFile =", newFiles);
    let fileUrls = [];
    if (newFiles.length > 0) {
      fileUrls = await Promise.all(
        newFiles.map(async (file) => {
          const responseFile = await storage.createFile(
            contractAttachFilesStorageId,
            "unique()",
            file
          );
          const fileUrl = storage.getFileView(
            contractAttachFilesStorageId,
            responseFile.$id
          );
          return `${responseFile.name};;${fileUrl.href}`;
        })
      );
    }

  const dataToSubmit = {
    startDate: contractDataToSubmit.startDate,
    endDate: contractDataToSubmit.endDate,
    isActive: contractDataToSubmit.isActive,
    attachments:
      fileUrls?.length > 0
        ? [...contractDataToSubmit.attachments, ...fileUrls]
        : [...contractDataToSubmit.attachments],
  };
  try {
    const response = await databases.updateDocument(
      databaseId,
      masterContrtactTableId,
      contractDataToSubmit.id,
      dataToSubmit
    );
    return response;
  } catch (error) {
    console.error("Error update contract data:", error);
    return null;
  }
}
export async function addNewContract(contractDetail, newFiles) {
    //Upload attach files
    console.log("newFile =", newFiles);
    let fileUrls = [];
    if (newFiles.length > 0) {
      fileUrls = await Promise.all(
        newFiles.map(async (file) => {
          const responseFile = await storage.createFile(
            contractAttachFilesStorageId,
            "unique()",
            file
          );
          const fileUrl = storage.getFileView(
            contractAttachFilesStorageId,
            responseFile.$id
          );
          return `${responseFile.name};;${fileUrl.href}`;
        })
      );
    }
    const dataToSubmit = {
      contractNo: contractDetail.contractNo,
      customer_Id: contractDetail.customer_Id,
      customerName: contractDetail.customerName,
      startDate: contractDetail.startDate,
      endDate: contractDetail.endDate,
      isActive: contractDetail.isActive,
      shift_Ids: contractDetail.shift_Ids,
      alertTo_Ids: contractDetail.alertTo_Ids,
      attachments:
        fileUrls?.length > 0
          ? [...contractDetail.attachments, ...fileUrls]
          : [...contractDetail.attachments],
    };

  try {
    const response = createDocumentOnServer(
      databaseId,
      masterContrtactTableId,
      dataToSubmit
    );
    return response;
  } catch (error) {
    console.log("Error add new Contract data:", error);
    return null;
  }
}
export async function deleteContract(id) {
  try {
    console.log("id:", id);
    const deletePromises = id.map((data) => {
      return databases.deleteDocument(databaseId, masterContrtactTableId, data);
    });
    const results = await Promise.all(deletePromises);
    console.log("Documents delete successfully:", results);
    return results;
  } catch (error) {
    console.error("Error deleting data:", error);
    return null;
  }
}
//#endregion master_Contrtacts

//#region master_Shifts
export async function getMasterShiftData(field, value) {
  try {
    const response = await fetchDataList(databaseId, masterShiftTableId, [
      Query.equal(field, value),
    ]);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}
export async function addNewShifts(dataToSubmit) {
  const documentIds = [];
  const promises = dataToSubmit.map(async (data) => {
    try {
      const document = await databases.createDocument(
        databaseId,
        masterShiftTableId,
        "unique()",
        data
      );
      console.log("Document created:", document.$id);
      documentIds.push(document.$id);
    } catch (error) {
      console.error("Error creating document:", error);
      return null;
    }
  });

  // Wait for all promises to resolve
  await Promise.all(promises);
  return documentIds;
}
export async function deleteShift(id) {
  try {
    console.log("id:", id);
    const deletePromises = id.map((data) => {
      return databases.deleteDocument(databaseId, masterShiftTableId, data);
    });
    const results = await Promise.all(deletePromises);
    console.log("Documents delete successfully:", results);
    return results;
  } catch (error) {
    console.error("Error deleting data:", error);
    return null;
  }
}
export async function updateShifts(updateShiftData) {
  try {
    const updatePromises = updateShiftData.map((data) => {
      return databases.updateDocument(
        databaseId,
        masterShiftTableId,
        data.documentId,
        data.updateFields
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
//#endregion master_Shifts

//#region master_ManpowerPosition
export async function getMasterManpowerPositionData(shiftIds) {
  try {
    const response = await fetchDataList(
      databaseId,
      masterManpowerPositionTableId,
      [Query.contains("shift_Id", shiftIds)]
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}
export async function addNewManpowerPosition(dataToSubmit) {
  const documentIds = [];
  const promises = dataToSubmit.map(async (data) => {
    try {
      const document = await databases.createDocument(
        databaseId,
        masterManpowerPositionTableId,
        "unique()",
        data
      );
      console.log("Document created:", document.$id);
      documentIds.push({ shiftId: data.shift_Id, id: document.$id });
    } catch (error) {
      console.error("Error creating document:", error);
      return null;
    }
  });

  // Wait for all promises to resolve
  await Promise.all(promises);
  return documentIds;
}
export async function deleteManpowerPosition(id) {
  try {
    console.log("id:", id);
    const deletePromises = id.map((data) => {
      return databases.deleteDocument(
        databaseId,
        masterManpowerPositionTableId,
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
export async function updateManpowerPosition(updateManpowerPositionData) {
  try {
    const updatePromises = updateManpowerPositionData.map((data) => {
      return databases.updateDocument(
        databaseId,
        masterManpowerPositionTableId,
        data.documentId,
        data.updateFields
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
//#endregion master_ManpowerPosition

//#region master_PatrolAlertTo
export async function getMasterPatrolAlertToData(contractId) {
  try {
    const response = await fetchDataList(
      databaseId,
      masterPatrolAlertToTableId,
      [Query.equal("contract_Id", contractId)]
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}
export async function addNewPatrolAlertTo(dataToSubmit) {
  const documentIds = [];
  const promises = dataToSubmit.map(async (data) => {
    try {
      const document = await databases.createDocument(
        databaseId,
        masterPatrolAlertToTableId,
        "unique()",
        data
      );
      console.log("Document created:", document.$id);
      documentIds.push(document.$id);
    } catch (error) {
      console.error("Error creating document:", error);
      return null;
    }
  });

  // Wait for all promises to resolve
  await Promise.all(promises);
  return documentIds;
}
export async function deletePatrolAlertTo(id) {
  try {
    console.log("id:", id);
    const deletePromises = id.map((data) => {
      return databases.deleteDocument(
        databaseId,
        masterPatrolAlertToTableId,
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
export async function updatePatrolAlertTo(updateAlertToData) {
  try {
    const updatePromises = updateAlertToData.map((data) => {
      return databases.updateDocument(
        databaseId,
        masterPatrolAlertToTableId,
        data.documentId,
        data.updateFields
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
//#endregion master_PatrolAlertTo

//#region master_Round
export async function getMasterRoundData(filters) {
  const conditions = filters.map((filter) =>
    Query.equal(filter.field, filter.value)
  );
  try {
    const response = await fetchDataList(
      databaseId,
      masterRoundTableId,
      conditions
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}
export async function addNewRoundData(dataToSubmit) {
  const documentIds = [];
  const promises = dataToSubmit.map(async (data) => {
    try {
      const document = await databases.createDocument(
        databaseId,
        masterRoundTableId,
        "unique()",
        data
      );
      console.log("Document created:", document.$id);
      documentIds.push({ areaId: data.areaId, id: document.$id });
    } catch (error) {
      console.error("Error creating document:", error);
      return null;
    }
  });

  // Wait for all promises to resolve
  await Promise.all(promises);
  return documentIds;
}
export async function deleteRoundData(id) {
  try {
    console.log("id:", id);
    const deletePromises = id.map((data) => {
      return databases.deleteDocument(databaseId, masterRoundTableId, data);
    });
    const results = await Promise.all(deletePromises);
    console.log("Documents delete successfully:", results);
    return results;
  } catch (error) {
    console.error("Error deleting data:", error);
    return null;
  }
}
export async function updateRoundData(updateRoundData) {
  try {
    const updatePromises = updateRoundData.map((data) => {
      return databases.updateDocument(
        databaseId,
        masterRoundTableId,
        data.documentId,
        data.updateFields
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
//#endregion master_Round

//#region master_RandomPatrolReason
export async function getAllMasterRandomPatrolReason() {
  try {
    const response = await fetchDataList(
      databaseId,
      masterRandomPatrolReasonTableId
    );
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
  };
  console.log("dataToSubmit", dataToSubmit);
  try {
    const response = createDocumentOnServer(
      databaseId,
      masterRandomPatrolReasonTableId,
      dataToSubmit
    );
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
  };
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
//#endregion master_RandomPatrolReason

//#region master_Checkpoints
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
export async function deleteCheckpoint(id) {
  try {
    console.log("id:", id);
    const deletePromises = id.map((data) => {
      return databases.deleteDocument(
        databaseId,
        masterCheckpointTableId,
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
export async function addNewCheckpoint(checkpointData) {
  const documentIds = [];
  const promises = checkpointData.map(async (data) => {
    try {
      const document = await databases.createDocument(
        databaseId,
        masterCheckpointTableId,
        "unique()",
        data
      );
      console.log("Document created:", document.$id);
      documentIds.push(document.$id); // Add the document ID to the list
    } catch (error) {
      console.error("Error creating document:", error);
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
//#endregion master_Checkpoints

//#region master_AssignedManpower
export async function getMasterAssignedManpowerData(shiftIds) {
  try {
    const response = await fetchDataList(
      databaseId,
      masterAssignedManpowerTableId,
      [Query.contains("shift_Id", shiftIds)]
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}
export async function getAllAssignedManpowerData() {
  try {
    const response = await fetchDataList(
      databaseId,
      masterAssignedManpowerTableId
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
    return null;
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
      const document = await databases.createDocument(
        databaseId,
        masterAssignedManpowerTableId,
        "unique()",
        data
      );
      console.log("Document created:", document.$id);
      documentIds.push(document.$id); // Add the document ID to the list
    } catch (error) {
      console.error("Error creating document:", error);
      return null;
    }
  });

  // Wait for all promises to resolve
  await Promise.all(promises);
  return documentIds;
}
//#endregion master_AssignedManpower

//#endregion Master Data

//#region SIAPP
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
  const mapContact = contacts.map(
    (contact) => `${contact.nameSurname};;${contact.tel};;${contact.email}`
  );

  let fileUrls = [];
  if (files.length > 0) {
    fileUrls = await Promise.all(
      files.map(async (file) => {
        const responseFile = await storage.createFile(
          incidentTypeFilesStorageId,
          "unique()", // Unique ID for the file
          file
        );
        const fileUrl = storage.getFileView(
          incidentTypeFilesStorageId,
          responseFile.$id
        );
        return `${responseFile.name};;${fileUrl.href}`; // Return file name and URL
      })
    );
  }

  const dataToSubmit = {
    IncidentType_EN: incidentDetail.incidentTypeEN,
    IncidentType_TH: incidentDetail.incidentTypeTH,
    CorrectiveAction: incidentDetail.correctiveAction,
    Contacts: mapContact,
    Attachments: fileUrls,
    IncidentTypeDesc:
      incidentDetail.incidentTypeTH + "(" + incidentDetail.incidentTypeEN + ")",
  };
  console.log("dataToSubmit", dataToSubmit);
  try {
    const response = createDocumentOnServer(
      databaseId,
      incidentTypeTableId,
      dataToSubmit
    );
    return response;
  } catch (error) {
    console.log("Error add new incident type data:", error);
    return null;
  }
}

export async function updateIncidentType(incidentDetail, contacts, newFiles) {
  console.log("incidentDetail", incidentDetail);
  const mapContact = contacts.map(
    (contact) => `${contact.nameSurname};;${contact.tel};;${contact.email}`
  );
  console.log("newFile =", newFiles);
  let fileUrls = [];
  if (newFiles.length > 0) {
    fileUrls = await Promise.all(
      newFiles.map(async (file) => {
        const responseFile = await storage.createFile(
          incidentTypeFilesStorageId,
          "unique()", // Unique ID for the file
          file
        );
        const fileUrl = storage.getFileView(
          incidentTypeFilesStorageId,
          responseFile.$id
        );
        return `${responseFile.name};;${fileUrl.href}`; // Return file name and URL
      })
    );
  }

  const dataToSubmit = {
    IncidentType_EN: incidentDetail.incidentTypeEN,
    IncidentType_TH: incidentDetail.incidentTypeTH,
    CorrectiveAction: incidentDetail.correctiveAction,
    Contacts: mapContact,
    Attachments:
      fileUrls.length > 0
        ? [...incidentDetail.attchments, ...fileUrls]
        : [...incidentDetail.attchments],
    IncidentTypeDesc:
      incidentDetail.incidentTypeTH + "(" + incidentDetail.incidentTypeEN + ")",
  };
  console.log("dataToSubmitUpdate", dataToSubmit);
  try {
    const response = updateDocumentOnServer(
      databaseId,
      incidentTypeTableId,
      incidentDetail.id,
      dataToSubmit
    );
    return response;
  } catch (error) {
    console.log("Error add new incident type data:", error);
    return null;
  }
}

export async function deleteIncidentType(id) {
  try {
    console.log("id:", id);
    const response = await deleteDocumentOnServer(
      databaseId,
      incidentTypeTableId,
      id
    );
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
//#endregion SIAPP
