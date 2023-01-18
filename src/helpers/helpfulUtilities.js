import { authentication } from "./firebase";
import { functions, db } from "./firebase";
import { httpsCallable } from "firebase/functions";
import { collection, getDocs } from "firebase/firestore";

// convert a string date to a date.
export const convertStringToDate = (stringDate) => {
  return new Date(stringDate);
};

// convert a number to n hours and n minutes
export const timeConvert = (num) => {
  const totalhours = num / 60;
  const hours = Math.floor(totalhours);
  const minutes = Math.round((totalhours - hours) * 60);
  return hours + " hour(s) and " + minutes + " minute(s).";
};

// getting users.
export const getUsers = async (userType, role = "") => {
  const listUsers = httpsCallable(functions, "listUsers");
  return await listUsers()
    .then((results) => {
      const users = results.data.filter((user) => user.role[userType]);
      const myUsers = role
        ? users
        : users
            .filter(
              (client) =>
                client.meta.added_by_uid === authentication.currentUser.uid
            )
            .slice(0, 5);
      return myUsers.length === 0 ? null : myUsers;
    })
    .catch((err) => {
      return "failed";
    });
};

// multiple select users
export const handleAllCheck = (users, setDeleteArray) => {
  if (document.getElementById("onlyagent").checked === true) {
    Object.values(document.getElementsByClassName("agentCheckbox")).map(
      (checkbox) => (checkbox.checked = true)
    );
    setDeleteArray(
      users.map((supervisor) => [supervisor.uid, supervisor.name])
    );
  } else {
    Object.values(document.getElementsByClassName("agentCheckbox")).map(
      (checkbox) => (checkbox.checked = false)
    );
    setDeleteArray([]);
  }
};

// multiple select stickers
export const handleAllCheckStickers = (stickers, setDeleteArray) => {
  if (document.getElementById("onlyagent").checked === true) {
    Object.values(document.getElementsByClassName("agentCheckbox")).map(
      (checkbox) => (checkbox.checked = true)
    );
    setDeleteArray(
      stickers.map((sticker) => [sticker.id, sticker.clientDetails.name])
    );
  } else {
    Object.values(document.getElementsByClassName("agentCheckbox")).map(
      (checkbox) => (checkbox.checked = false)
    );
    setDeleteArray([]);
  }
};

export const getStickers = async (category, usersUnder) => {
  const policyCollectionRef = collection(db, "policies");
  const data = await getDocs(policyCollectionRef);
  const policiesArray = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  const mtpPolicies = policiesArray
    .filter((policy) => policy.category === category)
    .filter((policy) => usersUnder.includes(policy.added_by_uid))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return mtpPolicies;
};

export const getAllStickers = async (usersUnder) => {
  const policyCollectionRef = collection(db, "policies");
  const data = await getDocs(policyCollectionRef);
  const policiesArray = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  const mtpPolicies = policiesArray
    .filter((policy) => usersUnder.includes(policy.added_by_uid))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return mtpPolicies;
};

export const getAllClaims = async (usersUnder) => {
  const claimsCollectionRef = collection(db, "claims");
  const data = await getDocs(claimsCollectionRef);
  const claimsArray = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  const userClaims = claimsArray
    .filter((claim) => usersUnder.includes(claim.uid))
    .sort((a, b) => new Date(b.dateReported) - new Date(a.dateReported));
  return userClaims;
};

export const getSuperAdminStickers = async (category) => {
  const policyCollectionRef = collection(db, "policies");
  const data = await getDocs(policyCollectionRef);
  const policiesArray = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  const mtpPolicies = policiesArray
    .filter((policy) => policy.category === category)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return mtpPolicies;
};

// fetching superadmin claims
export const getAllSuperAdminStickers = async () => {
  const policyCollectionRef = collection(db, "policies");
  const data = await getDocs(policyCollectionRef);
  const policiesArray = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  const mtpPolicies = policiesArray.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  return mtpPolicies;
};

export const getAllSuperAdminClaims = async () => {
  const claimsCollectionRef = collection(db, "claims");
  const data = await getDocs(claimsCollectionRef);
  const claimsArray = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  const userClaims = claimsArray.sort(
    (a, b) => new Date(b.dateReported) - new Date(a.dateReported)
  );
  return userClaims;
};


  