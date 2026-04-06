// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { Loader } from "../components/Loader";
// import useClient from "../hooks/useClient";

// function AddEditClient({ type, client_id }) {
//   const { addClient, updateClient, refetchLoadingList, getClientById, isLoading } = useClient();

//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showPassword1, setShowPassword1] = useState(false);
//   const [errors, setErrors] = useState({});

//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     school_name: "",
//     department: "",
//     experience: "",
//     status: false,
//     district_username: "",
//     district_password: "",
//     teacher_username: "",
//     teacher_password: ""
//   });

//   // FIX 2: This clears all errors whenever the modal "type" changes (opening/closing)
//   useEffect(() => {
//     setErrors({});
//   }, [type, client_id]);

//   const handleChange = (e) => {
//     const { name, value, type: inputType, checked } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: inputType === "checkbox" ? checked : value,
//     }));

//     setErrors((prevErrors) => {
//       let newErrors = { ...prevErrors };
//       const textRegex = /^[A-Za-z\s]+$/;
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       const numberRegex = /^[0-9]+$/;

//       if (name === "first_name" || name === "last_name" || name === "school_name" || name === "department") {
//         if (!value.trim()) {
//           newErrors[name] = "This field is required";
//         } else if (!textRegex.test(value) && name !== "school_name") {
//           newErrors[name] = "Only letters are allowed";
//         } else {
//           delete newErrors[name];
//         }
//       }

//       if (name === "email" || name === "district_username" || name === "teacher_username") {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//         if (!value.trim()) {
//           newErrors[name] = "Email/Username is required";
//         } else if (!emailRegex.test(value)) {
//           newErrors[name] = "Invalid email format";
//         } else {
//           delete newErrors[name];
//         }
//       }

//       if (name === "experience") {
//         if (!value.trim()) newErrors.experience = "Experience is required";
//         else if (!numberRegex.test(value)) newErrors.experience = "Only numbers are allowed";
//         else delete newErrors.experience;
//       }

//       if (name === "district_password" || name === "teacher_password") {
//         if (type === "add") {

//           if (!value.trim()) {
//             newErrors[name] = "Password is required";
//           } else if (value.length < 6) {
//             newErrors[name] = "Minimum 6 characters required";
//           } else {
//             delete newErrors[name];
//           }
//         } else if (type === "edit") {

//           if (value.trim() !== "" && value.length < 6) {
//             newErrors[name] = "Minimum 6 characters required";
//           } else {

//             delete newErrors[name];
//           }
//         }
//       }

//       return newErrors;
//     });
//   };

//   useEffect(() => {
//     const fetchClient = async () => {
//       try {
//         if (client_id && type === "edit") {
//           const response = await getClientById({ client_id });
//           setFormData({
//             ...response.data,
//             status: response.data.status === 1
//           });
//         }
//       } catch (error) {
//         toast.error(error.response?.data?.message || "Failed to fetch client");
//       }
//     };

//     if (type === "add") {
//       setFormData({
//         first_name: "", last_name: "", email: "", school_name: "",
//         department: "", experience: "", status: false,
//         district_username: "", district_password: "",
//         teacher_username: "", teacher_password: "",
//       });
//     }
//     fetchClient();
//   }, [type, client_id]);

//   // const validateForm = () => {
//   //   let newErrors = {};
//   //   const textRegex = /^[A-Za-z\s]+$/;
//   //   const numberRegex = /^[0-9]+$/;
//   //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   //   if (!formData.first_name?.trim()) newErrors.first_name = "First name is required";
//   //   else if (!textRegex.test(formData.first_name)) newErrors.first_name = "Only letters allowed";

//   //   if (!formData.last_name?.trim()) newErrors.last_name = "Last name is required";
//   //   else if (!textRegex.test(formData.last_name)) newErrors.last_name = "Only letters allowed";

//   //   if (!formData.email?.trim()) newErrors.email = "Email is required";
//   //   else if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email format";

//   //   if (!formData.school_name?.trim()) newErrors.school_name = "School name required";
//   //   if (!formData.department?.trim()) newErrors.department = "Department required";

//   //   if (!formData.experience?.toString().trim()) newErrors.experience = "Experience required";
//   //   else if (!numberRegex.test(formData.experience)) newErrors.experience = "Only numbers allowed";

//   //   if (!formData.district_username?.trim()) newErrors.district_username = "District username required";
//   //   else if (!emailRegex.test(formData.district_username)) newErrors.district_username = "Invalid email format";
//   //  // District Password
//   // if (type === "add") {
//   //   if (!formData.district_password?.trim()) {
//   //     newErrors.district_password = "Password required";
//   //   } else if (formData.district_password.length < 6) {
//   //     newErrors.district_password = "Minimum 6 characters required";
//   //   }
//   // } else if (type === "edit" && formData.district_password?.trim()) {
//   //   // On edit, only validate if the user actually typed something
//   //   if (formData.district_password.length < 6) {
//   //     newErrors.district_password = "Minimum 6 characters required";
//   //   }
//   // }
//   //   if (!formData.teacher_username?.trim()) newErrors.teacher_username = "Teacher username required";
//   //   else if (!emailRegex.test(formData.teacher_username)) newErrors.teacher_username = "Invalid email format";
//   //   // Teacher Password
//   // if (type === "add") {
//   //   if (!formData.teacher_password?.trim()) {
//   //     newErrors.teacher_password = "Password required";
//   //   } else if (formData.teacher_password.length < 6) {
//   //     newErrors.teacher_password = "Minimum 6 characters required";
//   //   }
//   // } else if (type === "edit" && formData.teacher_password?.trim()) {
//   //   // On edit, only validate if the user actually typed something
//   //   if (formData.teacher_password.length < 6) {
//   //     newErrors.teacher_password = "Minimum 6 characters required";
//   //   }
//   // }
//   //   setErrors(newErrors);
//   //   return Object.keys(newErrors).length === 0;
//   // };

//   const validateForm = () => {
//     let newErrors = {};
//     const textRegex = /^[A-Za-z\s]+$/;
//     const numberRegex = /^[0-9]+$/;
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     const validateField = (name, value, regex, requiredMsg, formatMsg) => {
//       const trimmedValue = value?.toString().trim();

//       if (type === "add") {

//         if (!trimmedValue) newErrors[name] = requiredMsg;
//         else if (regex && !regex.test(trimmedValue)) newErrors[name] = formatMsg;
//       } else {

//         if (trimmedValue && regex && !regex.test(trimmedValue)) {
//           newErrors[name] = formatMsg;
//         }
//       }
//     };

//     // 1. Name & Text Fields
//     validateField("first_name", formData.first_name, textRegex, "First name required", "Only letters allowed");
//     validateField("last_name", formData.last_name, textRegex, "Last name required", "Only letters allowed");
//     validateField("school_name", formData.school_name, null, "School name required", "");
//     validateField("department", formData.department, textRegex, "Department required", "Only letters allowed");

//     // 2. Email & Usernames (Email Format)
//     validateField("email", formData.email, emailRegex, "Email is required", "Invalid email format");
//     validateField("district_username", formData.district_username, emailRegex, "District username required", "Invalid email format");
//     validateField("teacher_username", formData.teacher_username, emailRegex, "Teacher username required", "Invalid email format");

//     // 3. Experience (Numbers Only)
//     validateField("experience", formData.experience, numberRegex, "Experience required", "Only numbers allowed");

//     // 4. District Password Logic
//     const distPass = formData.district_password?.trim();
//     if (type === "add") {
//       if (!distPass) newErrors.district_password = "Password required";
//       else if (distPass.length < 6) newErrors.district_password = "Minimum 6 characters required";
//     } else if (type === "edit" && distPass) {
//       if (distPass.length < 6) newErrors.district_password = "Minimum 6 characters required";
//     }

//     // 5. Teacher Password Logic
//     const teachPass = formData.teacher_password?.trim();
//     if (type === "add") {
//       if (!teachPass) newErrors.teacher_password = "Password required";
//       else if (teachPass.length < 6) newErrors.teacher_password = "Minimum 6 characters required";
//     } else if (type === "edit" && teachPass) {
//       if (teachPass.length < 6) newErrors.teacher_password = "Minimum 6 characters required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     try {
//       let response;
//       const finalData = { ...formData, status: formData.status ? 1 : 0 };

//       if (client_id && type === "edit") {
//         response = await updateClient({ client_id, ...finalData });
//         if (response) toast.success("Client updated successfully");
//       } else {
//         response = await addClient(finalData);
//         if (response) toast.success("Client added successfully");
//       }

//       if (response) {
//         const modal = document.getElementById("add-client-popup");
//         const modalInstance = window.bootstrap.Modal.getInstance(modal);
//         modalInstance.hide();
//         await refetchLoadingList();
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to submit");
//     }
//   };

//   return (
//     <>
//       <Loader overlay visible={isLoading} />
//       <div className="modal my-popup fade" id="add-client-popup" tabIndex="-1" role="dialog">
//         <div className="modal-dialog modal-dialog-edit" role="document">
//           <div className="modal-content clearfix">
//             <div className="modal-heading">
//               <h2>{type === "edit" ? "Edit Client" : "Add New Client"}</h2>
//               <button type="button" className="close close-btn-front" data-bs-dismiss="modal" onClick={() => setErrors({})}>
//                 <span aria-hidden="true"><img src="images/cross-pop.svg" alt="" /></span>
//               </button>
//             </div>
//             <div className="modal-body">
//               <div className="delete-pop-wrap">
//                 <form onSubmit={handleSubmit} noValidate>
//                   <div className="row">
//                     <p><b>Client Information</b></p>

//                     {/* First Name */}
//                     <div className="col-lg-6">
//                       <div className="delete-pop-inner my-2 align-items-start"><p>First Name</p></div>
//                       <div className="form-group mb-4">
//                         <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="Enter First Name" />
//                         {errors.first_name && <p style={{ color: "red" }}>{errors.first_name}</p>}
//                       </div>
//                     </div>

//                     {/* Last Name */}
//                     <div className="col-lg-6">
//                       <div className="delete-pop-inner my-2 align-items-start"><p>Last Name</p></div>
//                       <div className="form-group mb-4">
//                         <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Enter Last Name" />
//                         {errors.last_name && <p style={{ color: "red" }}>{errors.last_name}</p>}
//                       </div>
//                     </div>

//                     {/* Email */}
//                     <div className="col-lg-6">
//                       <div className="delete-pop-inner my-2 align-items-start"><p>Email Address</p></div>
//                       <div className="form-group mb-4">
//                         <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email Address" />
//                         {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
//                       </div>
//                     </div>

//                     {/* School Name */}
//                     <div className="col-lg-6">
//                       <div className="delete-pop-inner my-2 align-items-start"><p>School Name</p></div>
//                       <div className="form-group mb-4">
//                         <input type="text" name="school_name" value={formData.school_name} onChange={handleChange} placeholder="Enter School Name" />
//                         {errors.school_name && <p style={{ color: "red" }}>{errors.school_name}</p>}
//                       </div>
//                     </div>

//                     {/* Experience */}
//                     <div className="col-lg-6">
//                       <div className="delete-pop-inner my-2 align-items-start"><p>Experience</p></div>
//                       <div className="form-group mb-4">
//                         <input type="text" name="experience" value={formData.experience} onChange={handleChange} placeholder="Enter Experience" />
//                         {errors.experience && <p style={{ color: "red" }}>{errors.experience}</p>}
//                       </div>
//                     </div>

//                     {/* Departments */}
//                     <div className="col-lg-6">
//                       <div className="delete-pop-inner my-2 align-items-start"><p>Departments</p></div>
//                       <div className="form-group mb-4">
//                         <input type="text" name="department" value={formData.department} onChange={handleChange} placeholder="Enter Departments" />
//                         {errors.department && <p style={{ color: "red" }}>{errors.department}</p>}
//                       </div>
//                     </div>

//                     <div className="col-lg-12">
//                       <div className="form-group mb-4">
//                         <div className="access-wrp">
//                           <div className="form-check form-switch justify-content-between">
//                             <label className="form-check-label">
//                               {type === "edit" ? "Enable or disable client panel access. Auto-disables after 30 days." : "Enable or disable client panel access."}
//                             </label>
//                             <input className="form-check-input" type="checkbox" name="status" checked={formData.status} onChange={handleChange} />
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <p><b>Credential Setup</b></p>

//                     <div className="col-lg-12">
//                       <div className="credentials-in">
//                         <div className="form-group mb-4">
//                           <label className="mb-1">District Admin Username</label>
//                           <input type="email" name="district_username" value={formData.district_username} onChange={handleChange} placeholder="Username" />
//                           {errors.district_username && <p style={{ color: "red" }}>{errors.district_username}</p>}
//                         </div>
//                         <div className="form-group district-wrapper mb-4">
//                           <label className="mb-1">District Admin Password</label>
//                           <input type={showPassword ? "text" : "password"} name="district_password" value={formData.district_password} onChange={handleChange} placeholder="Password" />
//                           <div className="password-eye" onClick={() => setShowPassword(!showPassword)}>
//                             <div className={`eye ${showPassword ? "eye-open" : "eye-close"}`}></div>
//                           </div>
//                           {errors.district_password && type !== "edit" && <p style={{ color: "red" }}>{errors.district_password}</p>}
//                         </div>

//                       </div>
//                     </div>

//                     <div className="col-lg-12">
//                       <div className="credentials-in">
//                         <div className="form-group mb-4">
//                           <label className="mb-1">Teacher Panel Username</label>
//                           <input type="email" name="teacher_username" value={formData.teacher_username} onChange={handleChange} placeholder="Username" />
//                           {errors.teacher_username && <p style={{ color: "red" }}>{errors.teacher_username}</p>}
//                         </div>
//                         <div className="form-group teacher-wrapper mb-4">
//                           <label className="mb-1">Teacher Panel Password</label>
//                           <input type={showPassword1 ? "text" : "password"} name="teacher_password" value={formData.teacher_password} onChange={handleChange} placeholder="Password" />
//                           <div className="password-eye" onClick={() => setShowPassword1(!showPassword1)}>
//                             <div className={`eye ${showPassword1 ? "eye-open" : "eye-close"}`}></div>
//                           </div>
//                           {errors.teacher_password && type !== "edit" && <p style={{ color: "red" }}>{errors.teacher_password}</p>}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <p className="info">Credentials will be automatically shared with the client via their
//                     registered email.</p>
//                   <div className="delete-pop-btn">
//                     <button type="button" className="active" data-bs-dismiss="modal">Cancel</button>
//                     <button type="submit" disabled={loading}>
//                       {loading ? (type === "edit" ? "Updating..." : "Adding...") : (type === "edit" ? "Update Client" : "Add Client")}
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default AddEditClient;

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loader } from "../components/Loader";
import useClient from "../hooks/useClient";

function AddEditClient({ type, client_id }) {
  const {
    addClient,
    updateClient,
    refetchLoadingList,
    getClientById,
    isLoading,
  } = useClient();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    school_name: "",
    department: "",
    experience: "",
    status: false,
    district_admin_name: "",
    district_username: "",
    district_password: "",
    teacher_name: "",
    teacher_username: "",
    teacher_password: "",
  });

  // Clear errors on modal toggle
  useEffect(() => {
    setErrors({});
  }, [type, client_id]);

  const handleChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: inputType === "checkbox" ? checked : value,
    }));

    // Dynamic error clearing/validation
    setErrors((prevErrors) => {
      let newErrors = { ...prevErrors };
      const textFields = [
        "first_name",
        "last_name",
        "department",
        "district_admin_name",
        "teacher_name",
      ];
      const emailFields = ["email", "district_username", "teacher_username"];

      if (textFields.includes(name)) {
        if (!value.trim()) newErrors[name] = "Field is required";
        else if (!/^[A-Za-z\s]+$/.test(value))
          newErrors[name] = "Only letters allowed";
        else delete newErrors[name];
      }

      if (emailFields.includes(name)) {
        if (!value.trim()) newErrors[name] = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          newErrors[name] = "Invalid email";
        else delete newErrors[name];
      }

      return newErrors;
    });
  };

  useEffect(() => {
    const fetchClient = async () => {
      try {
        if (client_id && type === "edit") {
          const response = await getClientById({ client_id });
          setFormData({
            ...response.data,
            status: response.data.status === 1,
          });
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch client");
      }
    };

    if (type === "add") {
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        school_name: "",
        department: "",
        experience: "",
        status: false,
        district_admin_name: "",
        teacher_name: "",
        district_username: "",
        district_password: "",
        teacher_username: "",
        teacher_password: "",
      });
    }
    fetchClient();
  }, [type, client_id]);

  const validateForm = () => {
    let newErrors = {};
    const textRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const numberRegex = /^[0-9]+$/;

    const validateField = (name, value, regex, requiredMsg, formatMsg) => {
      const trimmedValue = value?.toString().trim();
      if (type === "add") {
        if (!trimmedValue) newErrors[name] = requiredMsg;
        else if (regex && !regex.test(trimmedValue))
          newErrors[name] = formatMsg;
      } else if (
        type === "edit" &&
        trimmedValue &&
        regex &&
        !regex.test(trimmedValue)
      ) {
        newErrors[name] = formatMsg;
      }
    };

    validateField(
      "first_name",
      formData.first_name,
      textRegex,
      "First name required",
      "Letters only"
    );
    validateField(
      "last_name",
      formData.last_name,
      textRegex,
      "Last name required",
      "Letters only"
    );
    validateField(
      "school_name",
      formData.school_name,
      null,
      "School name required",
      ""
    );
    validateField(
      "department",
      formData.department,
      textRegex,
      "Department required",
      "Letters only"
    );
    validateField(
      "experience",
      formData.experience,
      numberRegex,
      "Experience required",
      "Numbers only"
    );

    validateField(
      "email",
      formData.email,
      emailRegex,
      "Email required",
      "Invalid email"
    );
    validateField(
      "district_admin_name",
      formData.district_admin_name,
      textRegex,
      "district Name required",
      "Letters only"
    );
    validateField(
      "district_username",
      formData.district_username,
      emailRegex,
      "Email required",
      "Invalid email"
    );
    validateField(
      "teacher_name",
      formData.teacher_name,
      textRegex,
      "Teacher Name required",
      "Letters only"
    );
    validateField(
      "teacher_username",
      formData.teacher_username,
      emailRegex,
      "Email required",
      "Invalid email"
    );

    const validatePass = (pass, key) => {
      if (type === "add") {
        if (!pass) newErrors[key] = "Password required";
        else if (pass.length < 6) newErrors[key] = "Min 6 characters";
      } else if (type === "edit" && pass && pass.length < 6) {
        newErrors[key] = "Min 6 characters";
      }
    };
    validatePass(formData.district_password, "district_password");
    validatePass(formData.teacher_password, "teacher_password");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const finalData = { ...formData, status: formData.status ? 1 : 0 };
      let response;

      if (client_id && type === "edit") {
        response = await updateClient({ client_id, ...finalData });
        if (response) toast.success("Client updated successfully");
      } else {
        response = await addClient(finalData);
        if (response) toast.success("Client added successfully");
      }

      if (response) {
        const modal = document.getElementById("add-client-popup");
        const modalInstance = window.bootstrap.Modal.getInstance(modal);
        modalInstance.hide();
        await refetchLoadingList();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Loader overlay visible={isLoading} />
      <div
        className="modal my-popup fade"
        id="add-client-popup"
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-edit" role="document">
          <div className="modal-content clearfix">
            <div className="modal-heading">
              <h2>{type === "edit" ? "Edit Client" : "Add New Client"}</h2>
              <button
                type="button"
                className="close close-btn-front"
                data-bs-dismiss="modal"
                onClick={() => setErrors({})}
              >
                <span aria-hidden="true">
                  <img src="images/cross-pop.svg" alt="" />
                </span>
              </button>
            </div>
            <div className="modal-body">
              <div className="delete-pop-wrap">
                <form onSubmit={handleSubmit} noValidate>
                  <div className="row">
                    <p>
                      <b>Client Information</b>
                    </p>

                    {/* First Name */}
                    <div className="col-lg-6">
                      <div className="delete-pop-inner my-2 align-items-start">
                        <p>First Name</p>
                      </div>
                      <div className="form-group mb-4">
                        <input
                          type="text"
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleChange}
                          placeholder="Enter First Name"
                        />
                        {errors.first_name && (
                          <p style={{ color: "red" }}>{errors.first_name}</p>
                        )}
                      </div>
                    </div>

                    {/* Last Name */}
                    <div className="col-lg-6">
                      <div className="delete-pop-inner my-2 align-items-start">
                        <p>Last Name</p>
                      </div>
                      <div className="form-group mb-4">
                        <input
                          type="text"
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleChange}
                          placeholder="Enter Last Name"
                        />
                        {errors.last_name && (
                          <p style={{ color: "red" }}>{errors.last_name}</p>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="col-lg-6">
                      <div className="delete-pop-inner my-2 align-items-start">
                        <p>Email Address</p>
                      </div>
                      <div className="form-group mb-4">
                        <input
                          type="text"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter Email Address"
                        />
                        {errors.email && (
                          <p style={{ color: "red" }}>{errors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* School Name */}
                    <div className="col-lg-6">
                      <div className="delete-pop-inner my-2 align-items-start">
                        <p>School Name</p>
                      </div>
                      <div className="form-group mb-4">
                        <input
                          type="text"
                          name="school_name"
                          value={formData.school_name}
                          onChange={handleChange}
                          placeholder="Enter School Name"
                        />
                        {errors.school_name && (
                          <p style={{ color: "red" }}>{errors.school_name}</p>
                        )}
                      </div>
                    </div>

                    {/* Experience */}
                    <div className="col-lg-6">
                      <div className="delete-pop-inner my-2 align-items-start">
                        <p>Experience</p>
                      </div>
                      <div className="form-group mb-4">
                        <input
                          type="text"
                          name="experience"
                          value={formData.experience}
                          onChange={handleChange}
                          placeholder="Enter Experience"
                        />
                        {errors.experience && (
                          <p style={{ color: "red" }}>{errors.experience}</p>
                        )}
                      </div>
                    </div>

                    {/* Departments */}
                    <div className="col-lg-6">
                      <div className="delete-pop-inner my-2 align-items-start">
                        <p>Departments</p>
                      </div>
                      <div className="form-group mb-4">
                        <input
                          type="text"
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                          placeholder="Enter Departments"
                        />
                        {errors.department && (
                          <p style={{ color: "red" }}>{errors.department}</p>
                        )}
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group mb-4">
                        <div className="access-wrp">
                          <div className="form-check form-switch justify-content-between">
                            <label className="form-check-label">
                              {type === "edit"
                                ? "Enable or disable client panel access. Auto-disables after 30 days."
                                : "Enable or disable client panel access."}
                            </label>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="status"
                              checked={formData.status}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <p>
                      <b>Credential Setup</b>
                    </p>

                    <div className="col-lg-12">
                      <div className="credentials-in">
                        <div className="form-group mb-4">
                          <div className="delete-pop-inner my-2 align-items-start">
                            <p>District Admin Name</p>
                          </div>
                          <input
                            type="text"
                            name="district_admin_name"
                            value={formData.district_admin_name}
                            onChange={handleChange}
                            placeholder="Enter Name"
                          />
                          {errors.district_admin_name && (
                            <p style={{ color: "red" }}>
                              {errors.district_admin_name}
                            </p>
                          )}
                        </div>
                        <div className="form-group mb-4">
                          <div className="delete-pop-inner my-2 align-items-start">
                            <p>District Admin Email</p>
                          </div>
                          {/* <label className="mb-1">District Admin Username</label> */}
                          <input
                            type="email"
                            name="district_username"
                            value={formData.district_username}
                            onChange={handleChange}
                            placeholder="Enter Email Address"
                          />
                          {errors.district_username && (
                            <p style={{ color: "red" }}>
                              {errors.district_username}
                            </p>
                          )}
                        </div>
                        <div className="form-group district-wrapper mb-4">
                          <div className="delete-pop-inner my-2 align-items-start">
                            <p>District Admin Password</p>
                          </div>
                          {/* <label className="mb-1">District Admin Password</label> */}
                          <div className="sales-pass-in">
                            <input
                              type={showPassword ? "text" : "password"}
                              name="district_password"
                              value={formData.district_password}
                              onChange={handleChange}
                              placeholder="Password"
                            />
                            <div
                              className="password-eye"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              <div
                                className={`eye ${
                                  showPassword ? "eye-open" : "eye-close"
                                }`}
                              ></div>
                            </div>
                          </div>

                          {errors.district_password && type !== "edit" && (
                            <p style={{ color: "red" }}>
                              {errors.district_password}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="credentials-in">
                        <div className="form-group mb-4">
                          <div className="delete-pop-inner my-2 align-items-start">
                            <p>Teacher Name</p>
                          </div>
                          <input
                            type="text"
                            name="teacher_name"
                            value={formData.teacher_name}
                            onChange={handleChange}
                            placeholder="Enter Name"
                          />
                          {errors.teacher_name && (
                            <p style={{ color: "red" }}>
                              {errors.teacher_name}
                            </p>
                          )}
                        </div>

                        <div className="form-group mb-4">
                          <div className="delete-pop-inner my-2 align-items-start">
                            <p>Teacher Panel Email</p>
                          </div>
                          {/* <label className="mb-1">Teacher Panel Username</label> */}
                          <input
                            type="email"
                            name="teacher_username"
                            value={formData.teacher_username}
                            onChange={handleChange}
                            placeholder="Enter Email Address"
                          />
                          {errors.teacher_username && (
                            <p style={{ color: "red" }}>
                              {errors.teacher_username}
                            </p>
                          )}
                        </div>
                        <div className="form-group teacher-wrapper mb-4">
                          <div className="delete-pop-inner my-2 align-items-start">
                            <p>Teacher Panel Password</p>
                          </div>
                          {/* <label className="mb-1">Teacher Panel Password</label> */}
                          <div className="sales-pass-in">
                            <input
                              type={showPassword1 ? "text" : "password"}
                              name="teacher_password"
                              value={formData.teacher_password}
                              onChange={handleChange}
                              placeholder="Password"
                            />
                            <div
                              className="password-eye"
                              onClick={() => setShowPassword1(!showPassword1)}
                            >
                              <div
                                className={`eye ${
                                  showPassword1 ? "eye-open" : "eye-close"
                                }`}
                              ></div>
                            </div>
                          </div>
                          {errors.teacher_password && type !== "edit" && (
                            <p style={{ color: "red" }}>
                              {errors.teacher_password}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="info">
                    Credentials will be automatically shared with the client via
                    their registered email.
                  </p>
                  <div className="delete-pop-btn">
                    <button
                      type="button"
                      className="active"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button type="submit" disabled={loading}>
                      {loading
                        ? type === "edit"
                          ? "Updating..."
                          : "Adding..."
                        : type === "edit"
                        ? "Update Client"
                        : "Add Client"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddEditClient;
