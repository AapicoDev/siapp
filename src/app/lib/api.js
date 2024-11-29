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
  Users,
  registerUser,
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
const masterQrErrorReasonTableId = "673d535e001516c9f69d";
//#endregion --Master Data--

//#region -- Users --
const rolesTableId = "673d458100358d3be2d0";
const permissionTableId = "673d44e80010cbc4926c";
const usersTableId = "673ef846002532aad29e";
const userRolesTableId = "673efa97000f45afc0b4";
//#endregion -- Users --

const patrolRoundsTableId = "670e369a0033e51cd0f7";
const patrolCheckpointTableId = "670e378f0015ebe884b8";
const patrolChecklistTableId = "670e38d1000de521ae95";
const incidentTableId = "670e3e06001a08ee3263";
const incidentTypeTableId = "670e411c000f5aa45ec0";
const randomPatrolTableId = "6719a886003922e7bfeb";
const incidentQRErrorReportTableId = "673c2ef300201f83d5e9";
//Storage ID
const incidentTypeFilesStorageId = "6712275f002246d2f1c7";
const contractAttachFilesStorageId = "672dbfec00034b72f0b0";

//#region Master Data

//#region master_QrErrorReason
export async function getAllQrErrorReasonData() {
  try {
    const response = await fetchDataList(databaseId, masterQrErrorReasonTableId);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}
export async function fetchQrErrorReasonData(offset, limit) {
  try {
    const response = await fetchDataList(
      databaseId,
      masterQrErrorReasonTableId,
      [Query.limit(limit), Query.offset(offset)]
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
export async function filterQRErrorReason(filters, offset, limit) {
  let conditions = filters.filter((filter) => filter.value !== "").map((filter) => 
      Query.contains(filter.field, filter.value)
  );
  //conditions = [...conditions, Query.limit(limit), Query.offset(offset)];
  try {
    const response = await fetchDataList(
      databaseId,
      masterQrErrorReasonTableId,
      conditions,
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
    return null;
  }
}
export async function addNewQRErrorReason(qrErrorReasonData) {
  try {
    const document = await databases.createDocument(
      databaseId,
      masterQrErrorReasonTableId,
      "unique()",
      qrErrorReasonData
    );
    console.log("Document created:", document.$id);
    return {result: document};
  } catch (error) {
    console.error("Error creating document:", error);
    return {result: null, error: error};
  }
}
export async function updateQRErrorReason(dataToSubmit, id) {
  try {
    const response = await databases.updateDocument(
      databaseId,
      masterQrErrorReasonTableId,
      id,
      dataToSubmit
    );
    return {result: response};
  } catch (error) {
    console.error("Error update Customer data:", error);
    return {result: null, error: error};;
  }
}
export async function deleteQRErrorReason(idList) {
  try {
    console.log("id:", idList);
    const deletePromises = idList.map((data) => {
      return databases.deleteDocument(databaseId, masterQrErrorReasonTableId, data);
    });
    const results = await Promise.all(deletePromises);
    console.log("Documents delete successfully:", results);
    return {result: results};
  } catch (error) {
    console.error("Error deleting data:", error);
    return {result: null, error: error};
  }
}
//#endregion master_QrErrorReason

//#region master_Zone
export async function getAllMasterZoneData() {
  try {
    const response = await fetchDataList(databaseId, masterZoneTableId);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}
export async function fetchMasterZoneData(offset, limit) {
  try {
    const response = await fetchDataList(
      databaseId,
      masterZoneTableId,
      [Query.limit(limit), Query.offset(offset)]
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
export async function filterMasterZoneData(filters, offset, limit) {
  let conditions = filters.filter((filter) => filter.value !== "").map((filter) => 
      Query.contains(filter.field, filter.value)
  );
  //conditions = [...conditions, Query.limit(limit), Query.offset(offset)];
  try {
    const response = await fetchDataList(
      databaseId,
      masterZoneTableId,
      conditions,
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
    return null;
  }
}
export async function addNewZone(zoneData) {
  try {
    const document = await databases.createDocument(
      databaseId,
      masterZoneTableId,
      "unique()",
      zoneData
    );
    console.log("Document created:", document.$id);
    return {result: document};
  } catch (error) {
    console.error("Error creating document:", error);
    return {result: null, error: error};
  }
}
export async function updateZone(dataToSubmit, id) {
  try {
    const response = await databases.updateDocument(
      databaseId,
      masterZoneTableId,
      id,
      dataToSubmit
    );
    return {result: response};
  } catch (error) {
    console.error("Error update Zone data:", error);
    return {result: null, error: error};
  }
}
export async function deleteZone(idList) {
  try {
    console.log("id:", idList);
    const deletePromises = idList.map((data) => {
      return databases.deleteDocument(databaseId, masterZoneTableId, data);
    });
    const results = await Promise.all(deletePromises);
    console.log("Documents delete successfully:", results);
    return {result: results};
  } catch (error) {
    console.error("Error deleting data:", error);
    return {result: null, error: error};
  }
}
//#endregion master_Zone

//#region master_Group
export async function getAllMasterGroupData() {
  try {
    const response = await fetchDataList(databaseId, masterGroupTableId);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}
export async function fetchMasterGroupData(offset, limit) {
  try {
    const response = await fetchDataList(
      databaseId,
      masterGroupTableId,
      [Query.limit(limit), Query.offset(offset)]
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
export async function addNewGroup(groupData) {
  try {
    const document = await databases.createDocument(
      databaseId,
      masterGroupTableId,
      "unique()",
      groupData
    );
    console.log("Document created:", document.$id);
    return {result: document};
  } catch (error) {
    console.error("Error creating document:", error);
    return {result: null, error: error};
  }
}
export async function filterMasterGroupData(filters, offset, limit) {
  let conditions = filters.filter((filter) => filter.value !== "").map((filter) => 
      Query.contains(filter.field, filter.value)
  );
  //conditions = [...conditions, Query.limit(limit), Query.offset(offset)];
  try {
    const response = await fetchDataList(
      databaseId,
      masterGroupTableId,
      conditions,
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
    return null;
  }
}
export async function updateGroup(dataToSubmit, id) {
  try {
    const response = await databases.updateDocument(
      databaseId,
      masterGroupTableId,
      id,
      dataToSubmit
    );
    return {result: response};
  } catch (error) {
    console.error("Error update Customer data:", error);
    return {result: null, error: error};
  }
}
export async function deleteGroup(idList) {
  try {
    console.log("id:", idList);
    const deletePromises = idList.map((data) => {
      return databases.deleteDocument(databaseId, masterGroupTableId, data);
    });
    const results = await Promise.all(deletePromises);
    console.log("Documents delete successfully:", results);
    return {result: results};
  } catch (error) {
    console.error("Error deleting data:", error);
    return {result: null, error: error};
  }
}
//#endregion master_Group

//#region master_Segment
export async function getAllMasterSegmentData() {
  try {
    const response = await fetchDataList(databaseId, masterSegmentTableId);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}
export async function fetchMasterSegmentData(offset, limit) {
  try {
    const response = await fetchDataList(
      databaseId,
      masterSegmentTableId,
      [Query.limit(limit), Query.offset(offset)]
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
export async function addNewSegment(segmentData) {
  try {
    const document = await databases.createDocument(
      databaseId,
      masterSegmentTableId,
      "unique()",
      segmentData
    );
    console.log("Document created:", document.$id);
    return {result: document};
  } catch (error) {
    console.error("Error creating document:", error);
    return {result: null, error: error};
  }
}
export async function filterMasterSegmentData(filters, offset, limit) {
  let conditions = filters.filter((filter) => filter.value !== "").map((filter) => 
      Query.contains(filter.field, filter.value)
  );
  //conditions = [...conditions, Query.limit(limit), Query.offset(offset)];
  try {
    const response = await fetchDataList(
      databaseId,
      masterSegmentTableId,
      conditions,
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
    return null;
  }
}
export async function updateSegment(dataToSubmit, id) {
  try {
    const response = await databases.updateDocument(
      databaseId,
      masterSegmentTableId,
      id,
      dataToSubmit
    );
    return {result: response};
  } catch (error) {
    console.error("Error update Customer data:", error);
    return {result: null, error: error};
  }
}
export async function deleteSegment(idList) {
  try {
    console.log("id:", idList);
    const deletePromises = idList.map((data) => {
      return databases.deleteDocument(databaseId, masterSegmentTableId, data);
    });
    const results = await Promise.all(deletePromises);
    console.log("Documents delete successfully:", results);
    return {result: results};
  } catch (error) {
    console.error("Error deleting data:", error);
    return {result: null, error: error};
  }
}
//#endregion master_Segment

//#region master_Department
export async function getAllMasterDepartmentData() {
  try {
    const response = await fetchDataList(databaseId, masterDepartmentTableId);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}
export async function queryMasterDepartmentData(field, value) {
  try {
    const response = await fetchDataList(databaseId, masterDepartmentTableId, [
      Query.equal(field, value),
    ]);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}
export async function fetchMasterDepartmentData(offset, limit) {
  try {
    const response = await fetchDataList(
      databaseId,
      masterDepartmentTableId,
      [Query.limit(limit), Query.offset(offset)]
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
export async function filterMasterDepartmentData(filters, offset, limit) {
  let conditions = filters.filter((filter) => filter.value !== "").map((filter) => 
      Query.contains(filter.field, filter.value)
  );
  console.log("filters = ", filters);
  console.log("conditions = ", conditions);
  //conditions = [...conditions, Query.limit(limit), Query.offset(offset)];
  try {
    const response = await fetchDataList(
      databaseId,
      masterDepartmentTableId,
      conditions,
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
    return null;
  }
}
export async function addNewDepartment(departmentData) {
  try {
    const document = await databases.createDocument(
      databaseId,
      masterDepartmentTableId,
      "unique()",
      departmentData
    );
    console.log("Document created:", document.$id);
    return {result: document}
  } catch (error) {
    console.error("Error creating document:", error);
    return {result: null, error: error};
  }
}
export async function updateDepartment(dataToSubmit, id) {
  try {
    const response = await databases.updateDocument(
      databaseId,
      masterDepartmentTableId,
      id,
      dataToSubmit
    );
    return {result: response};
  } catch (error) {
    console.error("Error update Department data:", error);
    return {result: null, error: error};
  }
}
export async function deleteDepartment(idList) {
  try {
    console.log("id:", idList);
    const deletePromises = idList.map((data) => {
      return databases.deleteDocument(databaseId, masterDepartmentTableId, data);
    });
    const results = await Promise.all(deletePromises);
    console.log("Documents delete successfully:", results);
    return {result: results};
  } catch (error) {
    console.error("Error deleting data:", error);
    return {result: null, error: error};
  }
}
//#endregion master_Department

//#region master_Checklist
export async function getAllMasterCheckListData() {
  try {
    const response = await fetchDataList(databaseId, masterCheckListTableId);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}
export async function getMasterCheckListSelectedAttibute(attibutes) {
  console.log("attibutes =", attibutes);
  try {
    const response = await fetchDataList(
      databaseId, 
      masterCheckListTableId,
      [Query.select(attibutes)]
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}
export async function fetchMasterCheckListData(offset, limit) {
  try {
    const response = await fetchDataList(
      databaseId,
      masterCheckListTableId,
      [Query.limit(limit), Query.offset(offset)]
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
export async function filterMasterChecklistData(filters, offset, limit) {
  let conditions = filters.filter((filter) => filter.value !== "").map((filter) => 
    (filter.field === "isNeedAttachPhoto"|| filter.field === "attachPhotoAmount") ? 
      Query.equal(filter.field, filter.value) : 
      Query.contains(filter.field, filter.value)
  );
  //conditions = [...conditions, Query.limit(limit), Query.offset(offset)];
  try {
    const response = await fetchDataList(
      databaseId,
      masterCheckListTableId,
      conditions,
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
    return null;
  }
}
export async function addNewChecklist(checkListData) {
    try {
      const document = await databases.createDocument(
        databaseId,
        masterCheckListTableId,
        "unique()",
        checkListData
      );
      console.log("Document created:", document.$id);
      return {result: document};
    } catch (error) {
      console.error("Error creating document:", error);
      return {result: null, error: error};
    }
}
export async function updateCheckList(dataToSubmit, id) {
  try {
    const response = await databases.updateDocument(
      databaseId,
      masterCheckListTableId,
      id,
      dataToSubmit
    );
    return {result: response};
  } catch (error) {
    console.error("Error update Customer data:", error);
    return {result: null, error: error};
  }
}
export async function deleteChecklist(idList) {
  try {
    console.log("id:", idList);
    const deletePromises = idList.map((data) => {
      return databases.deleteDocument(databaseId, masterCheckListTableId, data);
    });
    const results = await Promise.all(deletePromises);
    console.log("Documents delete successfully:", results);
    return {result: results};
  } catch (error) {
    console.error("Error deleting data:", error);
    return {result: null, error: error};
  }
}
//#endregion master_Checklist

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
export async function fetchMasterCustomerData(offset, limit) {
  try {
    const response = await fetchDataList(
      databaseId,
      masterCustomerTableId,
      [Query.limit(limit), Query.offset(offset)]
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
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
    return {result: response};
  } catch (error) {
    console.error("Error update Customer data:", error);
    return {result: null, error: error};
  }
}
export async function addNewCustomer(dataToSubmit) {
  console.log("dataToSubmit", dataToSubmit);
  try {
    const response = await createDocumentOnServer(
      databaseId,
      masterCustomerTableId,
      dataToSubmit
    );
    return {result: response};
  } catch (error) {
    console.log("Error add new customer data:", error);
    return {result: null, error: error};
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
    return {result: results};
  } catch (error) {
    console.error("Error deleting data:", error);
    return {result: null, error: error};
  }
}
export async function queryMasterCustomerData(field, value) {
  try {
    const response = await fetchDataList(databaseId, masterCustomerTableId, [
      Query.equal(field, value),
    ]);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
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
export async function fetchMasterAreaData(offset, limit) {
  try {
    const response = await fetchDataList(
      databaseId,
      masterAreaTableId,
      [Query.limit(limit), Query.offset(offset)]
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
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
export async function fetchMasterContractData(offset, limit) {
  try {
    const response = await fetchDataList(
      databaseId,
      masterContrtactTableId,
      [Query.limit(limit), Query.offset(offset)]
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
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
    return {result: response};
  } catch (error) {
    console.log("Error add new Contract data:", error);
    return {result: null, error: error};
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
    return {result: results};
  } catch (error) {
    console.error("Error deleting data:", error);
    return {result: null, error: error};
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
export async function updateRoundDataWithHandle(updateRoundData) {
  try {
    const updatePromises = updateRoundData.map((data) =>
      databases.updateDocument(
        databaseId,
        masterRoundTableId,
        data.documentId,
        data.updateFields
      )
    );

    // Use Promise.allSettled to handle each promise individually
    const results = await Promise.allSettled(updatePromises);

    // Separate successful and failed updates
    const successfulUpdates = results.filter(result => result.status === "fulfilled").map(result => result.value) || [];
    const failedUpdates = results.filter(result => result.status === "rejected").map(result => result.reason) || [];

    if (failedUpdates.length > 0) {
      console.warn("Some documents failed to update:", failedUpdates);
    }

    console.log("Documents updated successfully:", successfulUpdates);
    return { successfulUpdates, failedUpdates };
  } catch (error) {
    console.error("Unexpected error updating documents:", error);
    return { successfulUpdates: null, failedUpdates: [error] };
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
export async function fetchMasterRandomPatrolReason(offset, limit) {
  try {
    const response = await fetchDataList(
      databaseId,
      masterRandomPatrolReasonTableId,
      [Query.limit(limit), Query.offset(offset)]
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
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
export async function filterMasterCheckpointData(filters) {
  const conditions = filters.map((filter) =>
    Query.equal(filter.field, filter.value)
  );
  try {
    const response = await fetchDataList(
      databaseId,
      masterCheckpointTableId,
      conditions
    );
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
    return {result: results};
  } catch (error) {
    console.error("Error deleting data:", error);
    return {result: null, error: error};
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
      return {result: null, error: error};
    }
  });

  // Wait for all promises to resolve
  await Promise.all(promises);
  return {result: documentIds};
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
    return {result: results};
  } catch (error) {
    console.error("Error updating documents:", error);
    return {result :null, error: error};
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

//#region -- SIAPP --
//#region Patrol
export async function getPatrolRoundData() {
  try {
    const response = await fetchDataList(databaseId, patrolRoundsTableId);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}
export async function getPatrolCheckpointData(offset, limit) {
  try {
    const response = await fetchDataList(
      databaseId,
      patrolCheckpointTableId,
      [Query.limit(limit), Query.offset(offset), Query.orderDesc("EndTime")]
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
export async function filterPatrolCheckpointData(filters) {
  const conditions = filters.map((filter) =>
    Query.equal(filter.field, filter.value)
  );
  try {
    const response = await fetchDataList(
      databaseId,
      patrolCheckpointTableId,
      conditions
    );
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
export async function getRandomPatrolCheckpointData(offset, limit) {
  try {
    const response = await fetchDataList(
      databaseId,
      randomPatrolTableId,
      [Query.limit(limit), Query.offset(offset), Query.orderDesc("endTime")]
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
export async function getAllRandomPatrolCheckpointData() {
  try {
    const response = await fetchDataList(
      databaseId,
      randomPatrolTableId
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
//#endregion Patrol

//#region Incidents
export async function fetchIncidentData(offset, limit) {
  try {
    const response = await fetchDataList(
      databaseId,
      incidentTableId,
      [Query.limit(limit), Query.offset(offset), Query.orderDesc("DateTime")]
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
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
//#endregion Incidents

//#region Incident_QrErrorReport
export async function fetchIncidentQrErrorReport(offset, limit) {
  try {
    const response = await fetchDataList(
      databaseId,
      incidentQRErrorReportTableId,
      [Query.limit(limit), Query.offset(offset), Query.orderDesc("dateTime")]
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
export async function updateIncidentQrErrorReportStatus(id, dataToSubmit) {
  try {
    const response = await databases.updateDocument(
      databaseId,
      incidentQRErrorReportTableId,
      id,
      dataToSubmit
    );
    return {result: response};
  } catch (error) {
    console.error("Error update incident qr error report data:", error);
    return {result: null, error: error}
  }
}
//#endregion Incident_QrErrorReport

//#endregion SIAPP

//#region -- Users --
//#region user_Roles & Permissions
export async function getAllRoles() {
  try {
    const response = await fetchDataList(databaseId, rolesTableId);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}
export async function fetchRolesData(offset, limit) {
  try {
    const response = await fetchDataList(
      databaseId,
      rolesTableId,
      [Query.limit(limit), Query.offset(offset)]
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
export async function fetchPermissionData() { //offset, limit
  try {
    const response = await fetchDataList(
      databaseId,
      permissionTableId,
      //[Query.limit(limit), Query.offset(offset)]
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
export async function filterRole(roleName, permissionId, offset, limit) {
  let conditions = [];
  if (roleName !== undefined && roleName !== "" && roleName !== null) {
    conditions.push(Query.contains("role_Name", roleName));
  }
  if (permissionId !== undefined && permissionId !== "" && permissionId !== null) {
    conditions.push(Query.contains("permission_Ids", permissionId)); // permissionId = 'xxxxxx' or ['xxxxxx','xxxxxx']
  }
  //conditions = [...conditions, Query.limit(limit), Query.offset(offset)];
  try {
    const response = await fetchDataList(
      databaseId,
      rolesTableId,
      conditions,
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
    return null;
  }
}
export async function filterRoleWithField(filters) {
  console.log("filters =", filters);
  let conditions = filters.filter((filter) => filter.value !== "").map((filter) => 
      filter.field === "$id" ? Query.equal(filter.field, filter.value)
      : Query.contains(filter.field, filter.value)
  );
  console.log("conditions =", conditions);
  try {
    const response = await fetchDataList(
      databaseId,
      rolesTableId,
      conditions,
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
    return null;
  }
}
export async function addNewRole(roleData) {
  try {
    const document = await databases.createDocument(
      databaseId,
      rolesTableId,
      "unique()",
      roleData
    );
    console.log("Document created:", document.$id);
    return {result: document};
  } catch (error) {
    console.error("Error creating document:", error);
    return {result: null, error: error};
  }
}
export async function updateRole(dataToSubmit, id) {
  try {
    const response = await databases.updateDocument(
      databaseId,
      rolesTableId,
      id,
      dataToSubmit
    );
    return {result: response};
  } catch (error) {
    console.error("Error update Role data:", error);
    return {result: null, error: error};
  }
}
export async function deleteRole(idList) {
  try {
    console.log("id:", idList);
    const deletePromises = idList.map((data) => {
      return databases.deleteDocument(databaseId, rolesTableId, data);
    });
    const results = await Promise.all(deletePromises);
    console.log("Documents delete successfully:", results);
    return {result: results};
  } catch (error) {
    console.error("Error deleting data:", error);
    return {result: null, error: error};
  }
}
//#endregion user_Roles & Permissions

//#region user_UsersRole
export async function filterUserRoleData(filters) {
  const conditions = filters.map((filter) =>
    Query.equal(filter.field, filter.value)
  );
  try {
    const response = await fetchDataList(
      databaseId,
      userRolesTableId,
      conditions
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}
export async function addNewUserRole(userRoleData) {
  const documentIds = [];
  let error = "";
  const promises = userRoleData.map(async (data) => {
    try {
      const document = await databases.createDocument(
        databaseId,
        userRolesTableId,
        "unique()",
        data
      );
      console.log("Document created:", document.$id);
      documentIds.push(document.$id); // Add the document ID to the list
    } catch (error) {
      console.error("Error creating document:", error);
      error = error
      return null;
    }
  });
  // Wait for all promises to resolve
  await Promise.all(promises);
  return promises === null ? {result: null, error: error} : {result: documentIds};
}
export async function updateUserRole(dataToSubmit) {
  console.log("dataToSubmit:", dataToSubmit);
  try {
    const updatePromises = dataToSubmit.map((data) => {
      return databases.updateDocument(
        databaseId,
        userRolesTableId,
        data.documentId,
        data.updateFields
      );
    });
    const results = await Promise.all(updatePromises);
    console.log("Documents updated successfully:", results);
    return {result: results};
  } catch (error) {
    console.error("Error updating documents:", error);
    return {result: null, error: error};
  }
}
export async function deleteUserRole(id) {
  try {
    console.log("id:", id);
    const deletePromises = id.map((data) => {
      return databases.deleteDocument(databaseId, userRolesTableId, data);
    });
    const results = await Promise.all(deletePromises);
    console.log("Documents delete successfully:", results);
    return {result: results};
  } catch (error) {
    console.error("Error deleting data:", error);
    return {result: null, error: error};
  }
}
//#endregion user_UsersRole

//#region Users
export async function registerNewUserAuth(formData) {
  try {
    const response = await registerUser(
      formData
    );
    console.log(response);
    return {result: response};
  } catch (error) {
    console.error("Error register user auth at Appwrite:", error);
    return {result: null, error: error};
  }
}
export async function fetchUsersData(offset, limit) {
  try {
    const response = await fetchDataList(
      databaseId,
      usersTableId,
      [Query.limit(limit), Query.offset(offset)]
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
export async function getAllUsersData() {
  try {
    const response = await fetchDataList(
      databaseId,
      usersTableId,
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
export async function addNewUser(userData) {
  try {
    const document = await databases.createDocument(
      databaseId,
      usersTableId,
      "unique()",
      userData
    );
    console.log("Document created:", document.$id);
    return {result: document};
  } catch (error) {
    console.error("Error creating document:", error);
    return {result: null, error: error};
  }
}
export async function updateUser(dataToSubmit) {
  console.log("dataToSubmit:", dataToSubmit);
  try {
    const response = await databases.updateDocument(
      databaseId,
      usersTableId,
      dataToSubmit.documentId,
      dataToSubmit.updateFields
    );
    return {result: response};
  } catch (error) {
    console.error("Error update Customer data:", error);
    return {result: null, error: error};
  }
}
export async function deleteUser(ids) {
  try {
    console.log("id:", ids);
    const deletePromises = ids.map((data) => {
      return databases.deleteDocument(databaseId, usersTableId, data);
    });
    const results = await Promise.all(deletePromises);
    console.log("Documents delete successfully:", results);
    return {result: results};
  } catch (error) {
    console.error("Error deleting data:", error);
    return {result: null, error: error};
  }
}
export async function filterUserData(filters, offset, limit) {
  let conditions = filters.filter((filter) => filter.value !== "").map((filter) => 
    (filter.field === "isActive") ? 
      Query.equal(filter.field, filter.value) : 
      Query.contains(filter.field, filter.value)
  );
  //conditions = [...conditions, Query.limit(limit), Query.offset(offset)];
  try {
    const response = await fetchDataList(
      databaseId,
      usersTableId,
      conditions,
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);
    return null;
  }
}
//#endregion Users

//#region Auth User
export async function updateAuthUser(dataToSubmit) {
  const response = await fetch(`/api/users`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: dataToSubmit.userId,
      email: dataToSubmit.email,
      name: dataToSubmit.userName,
    }),
  });
  if (!response.ok) {
    console.error('Error update user:', response.message);
    return {result: null, error: response.message};
  }
  const user = await response.json();
  console.log('User data:', user);
  return {result: user};
}
export async function updateAuthUserPW(dataToSubmit) {
  const response = await fetch(`/api/users/userPW`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: dataToSubmit.userId,
      pw: dataToSubmit.newPW
    }),
  });
  if (!response.ok) {
    console.error('Error update user:', response.message);
    return {result: null, error: response.message};
  }
  const user = await response.json();
  console.log('User data:', user);
  return {result: user};
}
export async function deleteAuthUser(dataToSubmit) {
  const response = await fetch(`/api/users`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: dataToSubmit.userIds,
    }),
  });
  if (!response.ok) {
    console.error('Error to delete user:', response.message);
    return {result: null, error: response.message};
  }
  const result = await response.json();
  console.log('Delete Result:', result.results);
  return {result: result};
}
//#endregion Auth User

//#endregion -- Users --
