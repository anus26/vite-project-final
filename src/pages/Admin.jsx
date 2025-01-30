import React, { useEffect, useState } from "react";

const Admin = () => {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingCnic, setEditingCnic] = useState(null); // Track which beneficiary is being edited
  const [updateData, setUpdateData] = useState({ status: "", remarks: "" }); // Data for updates

  // Fetch beneficiaries data
  useEffect(() => {
    const fetchBeneficiaries = async () => {
      try {
        const response = await fetch("https://basic-lilian-anusraza123bm-892bbe7d.koyeb.app/api/v1/getall");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBeneficiaries(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBeneficiaries();
  }, []);

  // Handle input change for updating status/remarks
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle update request
  const handleUpdate = async (cnic) => {
    try {
      const response = await fetch(`https://basic-lilian-anusraza123bm-892bbe7d.koyeb.app/api/v1/update/${cnic}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedBeneficiary = await response.json();

      // Update the UI with the updated data
      setBeneficiaries((prev) =>
        prev.map((beneficiary) =>
          beneficiary.cnic === cnic ? { ...beneficiary, ...updatedBeneficiary.beneficiary } : beneficiary
        )
      );

      // Reset editing state and form data
      setEditingCnic(null);
      setUpdateData({ status: "", remarks: "" });
      alert("Beneficiary updated successfully!");
    } catch (err) {
      console.error("Error updating beneficiary:", err.message);
      alert("Failed to update beneficiary.");
    }
  };

  // Handle delete request
  const handleDelete = async (cnic) => {
    if (!window.confirm("Are you sure you want to delete this beneficiary?")) return;

    try {
      const response = await fetch(`https://basic-lilian-anusraza123bm-892bbe7d.koyeb.app/api/v1/delete/${cnic}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Remove deleted beneficiary from the state
      setBeneficiaries((prev) => prev.filter((beneficiary) => beneficiary.cnic !== cnic));
      alert("Beneficiary deleted successfully!");
    } catch (err) {
      console.error("Error deleting beneficiary:", err.message);
      alert("Failed to delete beneficiary.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      <h3 className="mt-3">Beneficiaries List</h3>

      {/* Add responsiveness to the table */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>CNIC</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Purpose</th>
              <th>Department</th>
              <th>Status</th>
              <th>Remarks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {beneficiaries.map((beneficiary) => (
              <tr key={beneficiary._id}>
                <td>{beneficiary.cnic}</td>
                <td>{beneficiary.name}</td>
                <td>{beneficiary.phone}</td>
                <td>{beneficiary.address}</td>
                <td>{beneficiary.purpose}</td>
                <td>{beneficiary.department}</td>
                <td>
                  {editingCnic === beneficiary.cnic ? (
                    <input
                      type="text"
                      name="status"
                      value={updateData.status}
                      placeholder="New Status"
                      className="form-control"
                      onChange={handleInputChange}
                    />
                  ) : (
                    beneficiary.status
                  )}
                </td>
                <td>
                  {editingCnic === beneficiary.cnic ? (
                    <input
                      type="text"
                      name="remarks"
                      value={updateData.remarks}
                      placeholder="Remarks"
                      className="form-control"
                      onChange={handleInputChange}
                    />
                  ) : (
                    beneficiary.remarks || "-"
                  )}
                </td>
                <td>
                  {editingCnic === beneficiary.cnic ? (
                    <>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => handleUpdate(beneficiary.cnic)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setEditingCnic(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => setEditingCnic(beneficiary.cnic)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(beneficiary.cnic)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;


    

    
