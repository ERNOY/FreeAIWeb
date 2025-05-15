import React, { useState } from "react";

function UploadForm() {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("https://freeaiweb-backend.onrender.com/upload", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    alert("Feltöltés eredménye: " + JSON.stringify(result));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Feltöltés</button>
    </form>
  );
}

export default UploadForm;
