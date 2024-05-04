let originalData = []; // Initialize with empty array

// Fetch data from CoinGecko API
async function fetchData() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    originalData = data; // Assign fetched data to originalData
    displayData(originalData); // Display fetched data in the table
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Sort by Market Cap
function sortByMarketCap(data) {
  return data.sort((a, b) => b.market_cap - a.market_cap);
}

// Sort by Percentage Change (24h)
function sortByPercentageChange(data) {
  return data.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
}

// Handle Button 1 Click (Sort by Market Cap)
function handleButton1Click() {
  const sortedData = sortByMarketCap(originalData);
  displayData(sortedData);
}

// Handle Button 2 Click (Sort by Percentage Change)
function handleButton2Click() {
  const sortedData = sortByPercentageChange(originalData);
  displayData(sortedData);
}

// Display data in the table
// Display data in the table
function displayData(data) {
  const tableBody = document.getElementById('cryptoTableBody');
  tableBody.innerHTML = '';

  if (data.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="7">No data available</td>`;
    tableBody.appendChild(row);
    return;
  }

  data.forEach(crypto => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td><img src="${crypto.image}" alt="${crypto.name}" style="width: 20px; height: 20px;"></td>
          <td>${crypto.name}</td>
          <td>${crypto.symbol.toUpperCase()}</td>
          <td>$${crypto.current_price}</td>
          <td>$${crypto.market_cap}</td>
          <td>${crypto.price_change_percentage_24h}%</td>
          
      `;
      tableBody.appendChild(row);
  });
}


document.getElementById('searchInput').addEventListener('input', function() {
  const searchValue = this.value.toLowerCase();
  const filteredData = originalData.filter(crypto => crypto.name.toLowerCase().includes(searchValue) || crypto.symbol.toLowerCase().includes(searchValue));
  displayData(filteredData);
});

document.getElementById('button1').addEventListener('click', handleButton1Click);
document.getElementById('button2').addEventListener('click', handleButton2Click);

// Call fetchData to fetch data when the page loads
fetchData();