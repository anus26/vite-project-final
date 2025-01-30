import React, { useState } from 'react';
import QRCode from "react-qr-code";
import QRCodeScanner from "../Qrscanner.jsx";

const BeneficiaryForm = () => {
  const [formData, setFormData] = useState({
    cnic: '',
    name: '',
    phone: '',
    address: '',
    purpose: '',
    department: '',
    status: 'Active', 
  });
  const [token, setToken] = useState(""); 
  const [errors, setErrors] = useState({});
  const [Qrcode,setQRCode]=useState('')
  const [qrValue, setQrValue] = useState("");
  const [qrImage, setQrImage] = useState(null);
  
  const purposes = ["Education", "Healthcare", "Charity", "Government Assistance"];
  const departments = ["Finance", "HR", "Admin", "IT", "Operations"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validate
  const validate = () => {
    const newErrors = {};
    const cnicPattern = /^\d{5}-\d{7}-\d{1}$/; // CNIC format #####-#######-#
    const phonePattern = /^03\d{9}$/; // Pakistani phone format 03XXXXXXXXX

    if (!cnicPattern.test(formData.cnic)) {
      newErrors.cnic = "CNIC must be in the format #####-#######-#";
    }
    if (!phonePattern.test(formData.phone)) {
      newErrors.phone = "Phone number must start with 03 and have 11 digits.";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // / Generate QR Code Image
    if (!validate()) {
      return; 
    }
   
    
    try {
      const response = await fetch('https://basic-lilian-anusraza123bm-892bbe7d.koyeb.app/api/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const result = await response.json();
        setToken(result.token); 
        setQRCode(result.Qrcode)
        
        console.log('Beneficiary registered:', result, token,Qrcode);
        setFormData({
          cnic: '',
          name: '',
          phone: '',
          address: '',
          purpose: '',
          department: '',
          status: 'Active',
        });
        setErrors({});
      } else {
        console.error('Error registering beneficiary:', response.status);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  
  return (
    <div className="container mt-5">
      <h1>Reception</h1>
      <h2>Beneficiary Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="cnic" className="form-label">CNIC</label>
          <input
            type="text"
            className="form-control"
            id="cnic"
            name="cnic"
            value={formData.cnic}
            onChange={handleChange}
            required
            />
          {errors.cnic && <div className="text-danger">{errors.cnic}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            />
          {errors.phone && <div className="text-danger">{errors.phone}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="purpose" className="form-label">Purpose</label>
          <select
            className="form-select"
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            required
            >
            <option value="">Select Purpose</option>
            {purposes.map((purpose, index) => (
              <option key={index} value={purpose}>
                {purpose}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="department" className="form-label">Department</label>
          <select
            className="form-select"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            {departments.map((department, index) => (
              <option key={index} value={department}>
                {department}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="status" className="form-label">Status</label>
          <select
            className="form-select"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      {departments.map((department, index) => (
  <div key={index} style={{ marginBottom: "20px" }}>
    <h2>QR Code for {department}</h2>
    <QRCode value={department} size={128} />
  </div>
))}


      {/* Display Token */}
      {token && (
        <div className="mt-3">
          <h4>Generated Token</h4>
          <p>{token}</p>
        </div>
      )}

      {/* Display QR Code */}
      {Qrcode && (
        <div style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={Qrcode} 
            viewBox={`0 0 256 256`}
          />
        </div>
      )}
      
      <QRCodeScanner />
    </div>
  );
}


export default BeneficiaryForm;
