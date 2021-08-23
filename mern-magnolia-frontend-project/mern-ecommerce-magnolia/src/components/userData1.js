import { useState, useEffect } from "react";

const UserData = (props) => {
  return (
    <div>
      <br />

      
        <tr class="bg-primary text-light ">
          <td>{props.name}</td>
          <td>{props.email}</td>
          <td>{props.password}</td>

          <td>{props.isAdmin}</td>
        </tr>
     
    </div>
  );
};
export default UserData;
