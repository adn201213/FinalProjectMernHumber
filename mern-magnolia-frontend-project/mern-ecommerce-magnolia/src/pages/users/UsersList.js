//import and declaration
import React, { useContext, useState, useEffect, useMemo, useRef } from "react";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";
import { useTable } from "react-table";
//start UsersList
const UsersList = (props) => {
  //state and context
  const [userList1, setUserList1] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const userListRef = useRef();
  const auth = useContext(AuthContext);
  userListRef.current = userList1;
  useEffect(() => {
    retrieveUserList();
  }, []);
  // get all users
  const retrieveUserList = () => {
    // let token =
    //  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMDQ4MjM3ZjFlNzNlM2I5Y2I5NTZhNyIsImlhdCI6MTYyODAxNzU4NiwiZXhwIjoxNjMwNjA5NTg2fQ.vpPSyYWR_nMTeRhgRF_DYi05yS5DzgKpLcKF3nemzko";
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token1,
      },
    };

    axios
      .get("https://mern-ecommerce-apis.herokuapp.com/api/users", config)

      .then((response) => {
        setUserList1(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveUserList();
  };
  //This for update
  const openUpdateUser = (rowIndex) => {
    const id = userListRef.current[rowIndex]._id;
    
    props.history.push("/updateUser/" + id);
  };
  //This for delete
  const openDeleteUser = (rowIndex) => {
    const id = userListRef.current[rowIndex]._id;
   
    props.history.push("/deleteUser/" + id);
  };
  //This for Add
  const openAddUser = () => {
    props.history.push("/addUser/");
  };

  //For Table
  const columns = useMemo(
    () => [
      {
        Header: "User Id",
        accessor: "_id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "MemberShip",
        accessor: "isAdmin",
        Cell: (props) => {
          return props.value ? "Admin" : "User";
        },
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span
                style={{ marginRight: "100px" }}
                onClick={() => openUpdateUser(rowIdx)}
              >
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => openDeleteUser(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: userList1,
    });

  return (
    <div className="list row">
      <div className="col-md-8"></div>

      <br />

      <div className="col-md-12 list">
        <a onClick={() => openAddUser()} class="btn btn-primary">
          Add User
        </a>
        <br />
        <br />

        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersList;
