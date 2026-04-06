import React, { useEffect, useState } from "react";
import useDashboard from "../hooks/useDashboard";
import { Loader } from "../components/Loader";


function Dashboard() {
  const { getDashboardCount, getlatestClientList, isLoading } = useDashboard()
  const [clientCount, setClientCount] = useState()
  const [clients, setClients] = useState([])



  useEffect(() => {
    const fetchData = async () => {
      const response = await getDashboardCount();
      const clientList = await getlatestClientList()
      setClientCount(response?.data);
      setClients(clientList?.data)
    };

    fetchData();
  }, [])


  return (
    <> 

    <Loader size="md" overlay visible={isLoading} />
      <main>
        <div className="top-head prog-sco-wrp">
          <div className="top-head-in">
            <h1>Dashboard</h1>
            <p>
              Welcome back, Sales Admin. Here's an overview of your clients.
            </p>
          </div>
          {/* <!-- <select name="subject">
					<option value="1">Subject Name</option>
					<option value="2">Subject 1</option>
					<option value="3">Subject 2</option>
					<option value="4">Subject 3</option>
				</select> --> */}
        </div>
        <div className="progress-grid">
          <div className="row g-0">
            <div className="col-lg-3">
              <div className="progress-grid-in ms-0">
                <h2>
                  <img src="images/dashboard/progress-grid/1.svg" alt="" />{" "}
                  Total Clients
                </h2>
                <h3>{clientCount?.total_clients || 0}</h3>
                {/* <!-- <a href="#">See details <i className="fa-regular fa-arrow-right"></i></a> --> */}
                <p className="text-white">All clients added to the platform</p>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="progress-grid-in">
                <h2>
                  <img src="images/dashboard/progress-grid/2.svg" alt="" />{" "}
                  Active Access
                </h2>
                <h3>{clientCount?.active_access || 0}</h3>
                {/* <!-- <a href="#">See details <i className="fa-regular fa-arrow-right"></i></a> --> */}
                <p className="text-black">Clients with active login access</p>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="progress-grid-in">
                <h2>
                  <img src="images/dashboard/progress-grid/3.svg" alt="" />{" "}
                  Disabled Access
                </h2>
                <h3>{clientCount?.disabled_access || 0}</h3>
                {/* <!-- <a href="#">See details <i className="fa-regular fa-arrow-right"></i></a> --> */}
                <p className="text-black">Clients without system access</p>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="progress-grid-in">
                <h2>
                  <img src="images/dashboard/progress-grid/4.svg" alt="" /> This
                  Month
                </h2>
                <h3>{clientCount?.this_month || 0}</h3>
                <p className="text-black">New clients added this month</p>
              </div>
            </div>
          </div>
        </div>
        <div className="my-subjects">
          <div className="top-head">
            <div className="top-head-in">
              <h1 className="mb-0">Recent Clients</h1>
              <p>Last 5 clients added</p>
            </div>
          </div>
          <div className="table-responsive">
            <table>
              {/* {clients?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      {item?.name || "Cameron Williamson"} <br />
                      <p>{item?.school || "Lakeview High School"}</p>
                    </td>
                    <td align="right">
                      <div
                        className={
                          item?.status === 1
                            ? "status-tag"
                            : "status-tag disabled"
                        }
                      >
                        {item?.status==1?"Active":"Disabled"}
                      </div>
                    </td>
                  </tr>
                );
              })} */}

              {
                clients?.length > 0 ? (
                  clients.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          {item?.name || "NA"} <br />
                          <p>{item?.school_name || "NA"}</p>
                        </td>
                        <td align="right">
                          <div
                            className={
                              item?.status === 1
                                ? "status-tag"
                                : "status-tag disabled"
                            }
                          >
                            {item?.status == 1 ? "Active" : "Disabled"}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="2">
                      No latest client found
                    </td>
                  </tr>
                )
              }
            </table>
          </div>
        </div>
      </main>
    </>
  );
}

export default Dashboard;
