import React, { useState } from "react";

function UploadForm() {
  const [file, setFile] = useState(null);
  const [license, setLicense] = useState("MIT");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("license", license);

    const res = await fetch("http://localhost:8000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResponse(data.message);
  };

  return (
    <div className="p-6 bg-white rounded shadow-md w-full max-w-lg mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Fájl feltöltés és licenc kiválasztás</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept=".json,.txt"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2"
        />
        <select
          value={license}
          onChange={(e) => setLicense(e.target.value)}
          className="border p-2"
        >
          <option value="MIT">MIT</option>
          <option value="GPL">GPL</option>
          <option value="CC-BY">Creative Commons BY</option>
          <option value="Proprietary">Zárt licenc</option>
        </select>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Feltöltés
        </button>
      </form>
      {response && <p className="mt-4 text-green-700">{response}</p>}
    </div>
  );
}

export default UploadForm;
