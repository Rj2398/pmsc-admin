import React, { useEffect, useState } from "react";
import AddEditClient from "../components/AddEditClient";
import DeleteClientPopup from "../components/DeleteClientPopup";
import useClient from "../hooks/useClient";
import toast from "react-hot-toast";
import Pagination from "../components/pagination";
import { Loader } from "../components/Loader";

function ClientManagement() {
  const { getClientList, updateStatus, refetchLoadingList, isLoading } =
    useClient();
  const itemsPerPage = 5;

  const [isUpdating, setIsUpdating] = useState(false);
  const [clientData, setClientData] = useState(getClientList || []);
  // const [currentPage, setCurrentPage] = useState()
  const [currentPage, setCurrentPage] = useState(() => {
    // Get the last page from localStorage if exists, else 1
    const savedPage = localStorage.getItem("currentPage");
    return savedPage ? Number(savedPage) : 1;
  });
  const [filtereClient, setFilteredClient] = useState([]);
  const [type, setType] = useState(null);
  const [client_id, setClientId] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setClientData(getClientList);
    setFilteredClient(getClientList);

    setCurrentPage(currentPage);
  }, [getClientList]);

  // const handleSearchChange = (e) => {
  //   setSearchTerm(e.target.value);
  // };

  // const handleSearch = () => {
  // const filtered = clientData.filter((client) => {
  //   const term = searchTerm.toLowerCase();
  //   return (
  //     client?.name?.toLowerCase().includes(term) ||
  //     client?.email?.toLowerCase().includes(term)
  //   );
  // });

  // setFilteredClient(filtered);
  // setCurrentPage(1)
  // };
  //

  useEffect(() => {
    const filtered = clientData?.filter((client) => {
      const term = searchTerm?.toLowerCase();
      return (
        client?.name?.toLowerCase().includes(term) ||
        client?.email?.toLowerCase().includes(term) ||
        client?.school_name?.toLowerCase().includes(term)
      );
    });

    setFilteredClient(filtered);

    if (searchTerm) {
      setCurrentPage(1);
    }
  }, [searchTerm, clientData]);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  const handleStatusChange = async (id, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;

    try {
      const response = await updateStatus({
        client_id: id,
        status: newStatus,
      });

      if (response) {
        toast.success("Status updated!");
        await refetchLoadingList();
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const totalItems = filtereClient?.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filtereClient?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <>
      <Loader size="lg" overlay visible={isLoading} />
      <main>
        <div className="top-head prog-sco-wrp">
          <div className="top-head-in">
            <h1>Client Management</h1>
            <p>Organize, track, and manage your clients efficiently.</p>
          </div>

          {/* <div class="influ-dropdown"> */}
          {/* <button class="influ-btn influ-drop-btn" type="button">
							Client <i class="far fa-chevron-down"></i>
						</button> */}
          {/* <div class="influ-drop-list"> */}

          <div className="client-search">
            <div class="influ-drop-list-search">
              <button type="submit">
                <img src="images/search-icon.svg" alt="" />
              </button>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* <button className="search-cta" onClick={handleSearch}>
                Search
              </button> */}
            {/* </div> */}

            {/* </div> */}
          </div>
          <div className="influ-btns">
            {/* <!-- BUTTON --> */}
            <button
              className="add-cta"
              data-bs-target="#add-client-popup"
              data-bs-toggle="modal"
              onClick={() => {
                setType("add"), setClientId(null);
              }}
            >
              Add Client
            </button>
            {/* <!-- BUTTON --> */}
          </div>
        </div>
        <div className="my-subjects">
          <div className="table-responsive">
            <table>
              {/* <thead> */}
              <tr>
                <th>Client Name</th>
                <th>Email ID</th>
                <th>School Name</th>
                <th>Experience</th>
                <th>Departments</th>
                <th>Access</th>
                <th>Action</th>
              </tr>
              {/* </thead> */}
              <tbody>
                {/* {currentItems?.map((client, index) => {
                  return (
                    <tr key={index}>

                      <td>{client?.name || "N/A"}</td>
                      <td>{client?.email || "N/A"}</td>
                      <td>{client?.mapped_school || "N/A"}</td>
                      <td>{client?.experience}</td>
                      <td>{client?.department}</td>

                      <td>
                        <div className="access-wrp">
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              id={`switch-${client.id}-${index}`} 
                              checked={client?.status === 1} 
                              onChange={() =>
                                handleStatusChange(client.id, client.status)
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`switch-${client.id}-${index}`}
                            >
                              {client?.status === 1 ? "Active" : "Disabled"}
                            </label>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="manage-sub-cta">
                          <button
                            className="add-cta"
                            data-bs-target="#add-client-popup"
                            data-bs-toggle="modal"
                            onClick={()=>{setType("edit"),setClientId(client?.id)}}
                          >
                            <img src="images/blue-edit.svg" alt="Edit" />
                          </button>
                          <button
                            type="button"
                            data-bs-target="#delete-popup"
                            data-bs-toggle="modal"
                            onClick={()=>{setClientId(client?.id),setShowDeletePopup(true)}}
                          >
                            <img src="images/delete-icon.svg" alt="Delete" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })} */}

                {currentItems && currentItems.length > 0 ? (
                  currentItems.map((client, index) => {
                    return (
                      <tr key={index}>
                        <td>{client?.client_name || "N/A"}</td>
                        <td>{client?.email || "N/A"}</td>
                        <td>{client?.school_name || "N/A"}</td>
                        <td>{client?.experience}</td>
                        <td>{client?.department}</td>
                        <td>
                          <div className="access-wrp">
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id={`switch-${client.id}-${index}`}
                                checked={client?.status === 1}
                                onChange={() =>
                                  handleStatusChange(client.id, client.status)
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`switch-${client.id}-${index}`}
                              >
                                {client?.status === 1 ? "Active" : "Disabled"}
                              </label>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="manage-sub-cta">
                            <button
                              className="add-cta"
                              data-bs-target="#add-client-popup"
                              data-bs-toggle="modal"
                              onClick={() => {
                                setType("edit");
                                setClientId(client?.id);
                              }}
                            >
                              <img src="images/blue-edit.svg" alt="Edit" />
                            </button>
                            <button
                              type="button"
                              data-bs-target="#delete-popup"
                              data-bs-toggle="modal"
                              onClick={() => {
                                setClientId(client?.id);
                                setShowDeletePopup(true);
                              }}
                            >
                              <img src="images/delete-icon.svg" alt="Delete" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No clients found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            showResult={true}
          />
        </div>
      </main>
      <AddEditClient client_id={client_id} type={type} />
      <DeleteClientPopup
        client_id={client_id}
        show={showDeletePopup}
        handleClose={() => setShowDeletePopup(false)}
      />
    </>
  );
}

export default ClientManagement;
