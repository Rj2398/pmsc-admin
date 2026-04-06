import React from "react";
import useClient from "../hooks/useClient";
import toast from "react-hot-toast";

function DeleteClientPopup({client_id,show,handleClose}){
	
	const {deleteClient,refetchLoadingList}=useClient();

	  const handleDeleteClient = async () => {

		try {
		  const response = await deleteClient({
			client_id
		  });
		  if (response) {
			toast.success("Client deleted!");
			     const modal = document.getElementById("delete-popup");
                const modalInstance = window.bootstrap.Modal.getInstance(modal);
               modalInstance.hide();
			await refetchLoadingList();
		  }
		   
		} catch (error) {
		  toast.error("Failed to  delete client");
		}
	  };

    return(
        <>
         <div className="modal my-popup fade" id="delete-popup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"  style={{alignContent:'center'}}>
		<div className="modal-dialog modal-dialog-edit" role="document">
			<div className="modal-content clearfix">
				<div className="modal-heading">
					<h2>Delete this Client?</h2>
					<button type="button" className="close close-btn-front" data-bs-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">
							<img src="images/cross-pop.svg" alt=""/>
						</span>
					</button>
				</div>
				<div className="modal-body">
					<div className="delete-pop-wrap">
						{/* <form> */}
							<div className="delete-pop-inner my-2 mb-3 align-items-start">
								<p><b>Are you sure you want to delete this Client?</b></p>
							</div>
							<div className="delete-pop-btn">
								<button  className="active"   onClick={()=>handleDeleteClient()}  data-bs-dismiss="modal" aria-label="Close">Delete</button>
								<button type="button" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
							</div>
						{/* </form> */}
					</div>
				</div>
			</div>
		</div>
	     </div>

    </>

    )
}


export default DeleteClientPopup;