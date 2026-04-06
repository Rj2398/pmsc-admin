import React from "react";
import { useDispatch } from "react-redux";
import { clearUser } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

export default function LogoutPopup() {

  const dispatch=useDispatch()
  const navigate=useNavigate()

  const logOut=()=>{
    dispatch(clearUser())
    navigate("/")

    const modal = document.getElementById("logout-popup");
    const modalInstance = window.bootstrap.Modal.getInstance(modal);
    modalInstance.hide();

  }

  return (
    <>
      <div
        className="modal my-popup fade"
        id="logout-popup"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        style={{alignContent:'center'}}
      >
        <div className="modal-dialog modal-dialog-edit" role="document">
          <div className="modal-content clearfix">
            <div className="modal-heading">
              <h2>Logout?</h2>
              <button
                type="button"
                className="close close-btn-front"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">
                  <img src="images/cross-pop.svg" alt="" />
                </span>
              </button>
            </div>
            <div className="modal-body">
              <div className="delete-pop-wrap">
                {/* <form> */}
                  <div className="delete-pop-inner my-2 mb-3 align-items-start">
                    <p>
                      <b>Are you sure you want to logout?</b>
                    </p>
                  </div>
                  <div className="delete-pop-btn">
                    <button  className="active" onClick={logOut}>
                      Logout
                    </button>
                    <button
                      type="button"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      Cancel
                    </button>
                  </div>
                {/* </form> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
