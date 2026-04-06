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
        district_username: "",
        district_password: "",
        teacher_name: "",
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
      "Name required",
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
      "Name required",
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
                                ? "Enable/disable access (30-day auto-disable)."
                                : "Enable/disable access."}
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

                    {/* District Admin Section */}
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
                          <input
                            type="email"
                            name="district_username"
                            value={formData.district_username}
                            onChange={handleChange}
                            placeholder="Enter Email"
                          />
                          {errors.district_username && (
                            <p style={{ color: "red" }}>
                              {errors.district_username}
                            </p>
                          )}
                        </div>
                        <div className="form-group mb-4">
                          <div className="delete-pop-inner my-2 align-items-start">
                            <p>District Admin Password</p>
                          </div>
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
                          {errors.district_password && (
                            <p style={{ color: "red" }}>
                              {errors.district_password}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Teacher Admin Section */}
                    <div className="col-lg-12">
                      <div className="credentials-in">
                        <div className="form-group mb-4">
                          <div className="delete-pop-inner my-2 align-items-start">
                            <p>Teacher Panel Name</p>
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
                          <input
                            type="email"
                            name="teacher_username"
                            value={formData.teacher_username}
                            onChange={handleChange}
                            placeholder="Enter Email"
                          />
                          {errors.teacher_username && (
                            <p style={{ color: "red" }}>
                              {errors.teacher_username}
                            </p>
                          )}
                        </div>
                        <div className="form-group mb-4">
                          <div className="delete-pop-inner my-2 align-items-start">
                            <p>Teacher Panel Password</p>
                          </div>
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
                          {errors.teacher_password && (
                            <p style={{ color: "red" }}>
                              {errors.teacher_password}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="info">
                    Credentials will be shared via email automatically.
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
                        ? "Saving..."
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
