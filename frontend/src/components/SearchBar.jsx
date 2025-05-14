import React, { useState } from "react";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);

  const handleSearch = async () => {
    const response = await fetch("http://localhost:8000/");
    const data = await response.json();
    setResult(data.message);
  };

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-4">FreeAIWeb Kereső</h1>
      <input
        type="text"
        className="border p-2 rounded w-1/2 mb-4"
        placeholder="Írd be a kérdésed..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Keresés
      </button>
      {result && <p className="mt-6 text-xl text-green-700">{result}</p>}
    </div>
  );
}

export default SearchBar;
