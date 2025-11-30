import React, { useState } from 'react';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

function App() {
  const [formData, setFormData] = useState({
    // Numerical fields
    "MS SubClass": 20,
    "Lot Frontage": 80.0,
    "Lot Area": 9600,
    "Overall Qual": 7,
    "Overall Cond": 5,
    "Year Built": 2003,
    "Year Remod/Add": 2003,
    "Mas Vnr Area": 196,
    "BsmtFin SF 1": 706,
    "BsmtFin SF 2": 0,
    "Bsmt Unf SF": 150,
    "Total Bsmt SF": 856,
    "1st Flr SF": 856,
    "2nd Flr SF": 854,
    "Low Qual Fin SF": 0,
    "Gr Liv Area": 1710,
    "Bsmt Full Bath": 1,
    "Bsmt Half Bath": 0,
    "Full Bath": 2,
    "Half Bath": 1,
    "Bedroom AbvGr": 3,
    "Kitchen AbvGr": 1,
    "TotRms AbvGrd": 8,
    "Fireplaces": 1,
    "Garage Yr Blt": 2003,
    "Garage Cars": 2,
    "Garage Area": 548,
    "Wood Deck SF": 0,
    "Open Porch SF": 61,
    "Enclosed Porch": 0,
    "3Ssn Porch": 0,
    "Screen Porch": 0,
    "Pool Area": 0,
    "Misc Val": 0,
    "Mo Sold": 9,
    "Yr Sold": 2007,
    // Categorical fields
    "MS Zoning": "RL",
    "Street": "Pave",
    "Lot Shape": "Reg",
    "Land Contour": "Lvl",
    "Utilities": "AllPub",
    "Lot Config": "Inside",
    "Land Slope": "Gtl",
    "Neighborhood": "CollgCr",
    "Condition 1": "Norm",
    "Condition 2": "Norm",
    "Bldg Type": "1Fam",
    "House Style": "2Story",
    "Roof Style": "Gable",
    "Roof Matl": "CompShg",
    "Exterior 1st": "VinylSd",
    "Exterior 2nd": "VinylSd",
    "Mas Vnr Type": "BrkFace",
    "Exter Qual": "Gd",
    "Exter Cond": "TA",
    "Foundation": "PConc",
    "Bsmt Qual": "Gd",
    "Bsmt Cond": "TA",
    "Bsmt Exposure": "No",
    "BsmtFin Type 1": "GLQ",
    "BsmtFin Type 2": "Unf",
    "Heating": "GasA",
    "Heating QC": "Ex",
    "Central Air": "Y",
    "Electrical": "SBrkr",
    "Kitchen Qual": "Gd",
    "Functional": "Typ",
    "Fireplace Qu": "TA",
    "Garage Type": "Attchd",
    "Garage Finish": "RFn",
    "Garage Qual": "TA",
    "Garage Cond": "TA",
    "Paved Drive": "Y",
    "Sale Type": "WD",
    "Sale Condition": "Normal"
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: isNaN(value) ? value : parseFloat(value) || value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: formData }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setPrediction(result.prediction);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <header>
          <h1>🏠 House Price Prediction</h1>
          <p>Enter property details to get an estimated price prediction</p>
        </header>

        <form onSubmit={handleSubmit} className="prediction-form">
          <div className="form-sections">
            {/* Basic Information */}
            <section className="form-section">
              <h2>Basic Information</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>MS SubClass</label>
                  <input type="number" name="MS SubClass" value={formData["MS SubClass"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>MS Zoning</label>
                  <input type="text" name="MS Zoning" value={formData["MS Zoning"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Lot Frontage</label>
                  <input type="number" step="0.1" name="Lot Frontage" value={formData["Lot Frontage"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Lot Area</label>
                  <input type="number" name="Lot Area" value={formData["Lot Area"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Street</label>
                  <input type="text" name="Street" value={formData["Street"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Lot Shape</label>
                  <input type="text" name="Lot Shape" value={formData["Lot Shape"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Land Contour</label>
                  <input type="text" name="Land Contour" value={formData["Land Contour"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Utilities</label>
                  <input type="text" name="Utilities" value={formData["Utilities"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Lot Config</label>
                  <input type="text" name="Lot Config" value={formData["Lot Config"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Land Slope</label>
                  <input type="text" name="Land Slope" value={formData["Land Slope"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Neighborhood</label>
                  <input type="text" name="Neighborhood" value={formData["Neighborhood"]} onChange={handleChange} />
                </div>
              </div>
            </section>

            {/* Property Details */}
            <section className="form-section">
              <h2>Property Details</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>Condition 1</label>
                  <input type="text" name="Condition 1" value={formData["Condition 1"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Condition 2</label>
                  <input type="text" name="Condition 2" value={formData["Condition 2"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Bldg Type</label>
                  <input type="text" name="Bldg Type" value={formData["Bldg Type"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>House Style</label>
                  <input type="text" name="House Style" value={formData["House Style"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Overall Qual</label>
                  <input type="number" name="Overall Qual" value={formData["Overall Qual"]} onChange={handleChange} min="1" max="10" />
                </div>
                <div className="form-group">
                  <label>Overall Cond</label>
                  <input type="number" name="Overall Cond" value={formData["Overall Cond"]} onChange={handleChange} min="1" max="10" />
                </div>
                <div className="form-group">
                  <label>Year Built</label>
                  <input type="number" name="Year Built" value={formData["Year Built"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Year Remod/Add</label>
                  <input type="number" name="Year Remod/Add" value={formData["Year Remod/Add"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Roof Style</label>
                  <input type="text" name="Roof Style" value={formData["Roof Style"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Roof Matl</label>
                  <input type="text" name="Roof Matl" value={formData["Roof Matl"]} onChange={handleChange} />
                </div>
              </div>
            </section>

            {/* Exterior */}
            <section className="form-section">
              <h2>Exterior</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>Exterior 1st</label>
                  <input type="text" name="Exterior 1st" value={formData["Exterior 1st"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Exterior 2nd</label>
                  <input type="text" name="Exterior 2nd" value={formData["Exterior 2nd"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Mas Vnr Type</label>
                  <input type="text" name="Mas Vnr Type" value={formData["Mas Vnr Type"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Mas Vnr Area</label>
                  <input type="number" name="Mas Vnr Area" value={formData["Mas Vnr Area"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Exter Qual</label>
                  <input type="text" name="Exter Qual" value={formData["Exter Qual"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Exter Cond</label>
                  <input type="text" name="Exter Cond" value={formData["Exter Cond"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Foundation</label>
                  <input type="text" name="Foundation" value={formData["Foundation"]} onChange={handleChange} />
                </div>
              </div>
            </section>

            {/* Basement */}
            <section className="form-section">
              <h2>Basement</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>Bsmt Qual</label>
                  <input type="text" name="Bsmt Qual" value={formData["Bsmt Qual"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Bsmt Cond</label>
                  <input type="text" name="Bsmt Cond" value={formData["Bsmt Cond"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Bsmt Exposure</label>
                  <input type="text" name="Bsmt Exposure" value={formData["Bsmt Exposure"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>BsmtFin Type 1</label>
                  <input type="text" name="BsmtFin Type 1" value={formData["BsmtFin Type 1"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>BsmtFin SF 1</label>
                  <input type="number" name="BsmtFin SF 1" value={formData["BsmtFin SF 1"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>BsmtFin Type 2</label>
                  <input type="text" name="BsmtFin Type 2" value={formData["BsmtFin Type 2"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>BsmtFin SF 2</label>
                  <input type="number" name="BsmtFin SF 2" value={formData["BsmtFin SF 2"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Bsmt Unf SF</label>
                  <input type="number" name="Bsmt Unf SF" value={formData["Bsmt Unf SF"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Total Bsmt SF</label>
                  <input type="number" name="Total Bsmt SF" value={formData["Total Bsmt SF"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Bsmt Full Bath</label>
                  <input type="number" name="Bsmt Full Bath" value={formData["Bsmt Full Bath"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Bsmt Half Bath</label>
                  <input type="number" name="Bsmt Half Bath" value={formData["Bsmt Half Bath"]} onChange={handleChange} />
                </div>
              </div>
            </section>

            {/* Interior */}
            <section className="form-section">
              <h2>Interior</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>Heating</label>
                  <input type="text" name="Heating" value={formData["Heating"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Heating QC</label>
                  <input type="text" name="Heating QC" value={formData["Heating QC"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Central Air</label>
                  <input type="text" name="Central Air" value={formData["Central Air"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Electrical</label>
                  <input type="text" name="Electrical" value={formData["Electrical"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>1st Flr SF</label>
                  <input type="number" name="1st Flr SF" value={formData["1st Flr SF"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>2nd Flr SF</label>
                  <input type="number" name="2nd Flr SF" value={formData["2nd Flr SF"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Low Qual Fin SF</label>
                  <input type="number" name="Low Qual Fin SF" value={formData["Low Qual Fin SF"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Gr Liv Area</label>
                  <input type="number" name="Gr Liv Area" value={formData["Gr Liv Area"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Full Bath</label>
                  <input type="number" name="Full Bath" value={formData["Full Bath"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Half Bath</label>
                  <input type="number" name="Half Bath" value={formData["Half Bath"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Bedroom AbvGr</label>
                  <input type="number" name="Bedroom AbvGr" value={formData["Bedroom AbvGr"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Kitchen AbvGr</label>
                  <input type="number" name="Kitchen AbvGr" value={formData["Kitchen AbvGr"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Kitchen Qual</label>
                  <input type="text" name="Kitchen Qual" value={formData["Kitchen Qual"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>TotRms AbvGrd</label>
                  <input type="number" name="TotRms AbvGrd" value={formData["TotRms AbvGrd"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Functional</label>
                  <input type="text" name="Functional" value={formData["Functional"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Fireplaces</label>
                  <input type="number" name="Fireplaces" value={formData["Fireplaces"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Fireplace Qu</label>
                  <input type="text" name="Fireplace Qu" value={formData["Fireplace Qu"]} onChange={handleChange} />
                </div>
              </div>
            </section>

            {/* Garage */}
            <section className="form-section">
              <h2>Garage</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>Garage Type</label>
                  <input type="text" name="Garage Type" value={formData["Garage Type"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Garage Yr Blt</label>
                  <input type="number" name="Garage Yr Blt" value={formData["Garage Yr Blt"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Garage Finish</label>
                  <input type="text" name="Garage Finish" value={formData["Garage Finish"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Garage Cars</label>
                  <input type="number" name="Garage Cars" value={formData["Garage Cars"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Garage Area</label>
                  <input type="number" name="Garage Area" value={formData["Garage Area"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Garage Qual</label>
                  <input type="text" name="Garage Qual" value={formData["Garage Qual"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Garage Cond</label>
                  <input type="text" name="Garage Cond" value={formData["Garage Cond"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Paved Drive</label>
                  <input type="text" name="Paved Drive" value={formData["Paved Drive"]} onChange={handleChange} />
                </div>
              </div>
            </section>

            {/* Outdoor & Sale */}
            <section className="form-section">
              <h2>Outdoor & Sale</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>Wood Deck SF</label>
                  <input type="number" name="Wood Deck SF" value={formData["Wood Deck SF"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Open Porch SF</label>
                  <input type="number" name="Open Porch SF" value={formData["Open Porch SF"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Enclosed Porch</label>
                  <input type="number" name="Enclosed Porch" value={formData["Enclosed Porch"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>3Ssn Porch</label>
                  <input type="number" name="3Ssn Porch" value={formData["3Ssn Porch"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Screen Porch</label>
                  <input type="number" name="Screen Porch" value={formData["Screen Porch"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Pool Area</label>
                  <input type="number" name="Pool Area" value={formData["Pool Area"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Misc Val</label>
                  <input type="number" name="Misc Val" value={formData["Misc Val"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Mo Sold</label>
                  <input type="number" name="Mo Sold" value={formData["Mo Sold"]} onChange={handleChange} min="1" max="12" />
                </div>
                <div className="form-group">
                  <label>Yr Sold</label>
                  <input type="number" name="Yr Sold" value={formData["Yr Sold"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Sale Type</label>
                  <input type="text" name="Sale Type" value={formData["Sale Type"]} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Sale Condition</label>
                  <input type="text" name="Sale Condition" value={formData["Sale Condition"]} onChange={handleChange} />
                </div>
              </div>
            </section>
          </div>

          <div className="form-actions">
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? 'Predicting...' : 'Predict Price'}
            </button>
          </div>
        </form>

        {error && (
          <div className="result error">
            <h3>Error</h3>
            <p>{error}</p>
          </div>
        )}

        {prediction && (
          <div className="result success">
            <h3>Predicted Sale Price</h3>
            <p className="price">${prediction.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

