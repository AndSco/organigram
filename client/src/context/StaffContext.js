import React from "react";

export default React.createContext({
  staffMembers: [],
  manageNewInput: () => {},
  addStaffMember: () => {},
  removeStaffMember: () => {},
  editStaffMember: () => {}
});
