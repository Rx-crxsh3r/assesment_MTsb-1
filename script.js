fetch('Table_Input.csv')
  .then(response => response.text())
  .then(csv => {
    const lines = csv.trim().split('\n');
    const data = lines.slice(1).map(line => {
      const [index, value] = line.split(',');
      return { index: index.trim(), value: parseInt(value.trim()) };
    });

    // Fill Table 1
    const tableBody = document.querySelector('#table1 tbody');
    const lookup = {};
    data.forEach(row => {
      const tr = document.createElement('tr');
      const tdIndex = document.createElement('td');
      const tdValue = document.createElement('td');

      tdIndex.textContent = row.index;
      tdValue.textContent = row.value;
      tr.appendChild(tdIndex);
      tr.appendChild(tdValue);
      tableBody.appendChild(tr);

      lookup[row.index] = row.value;
    });

    // Compute and display Table 2 values
    document.getElementById('alpha').textContent = lookup["A5"] + lookup["A20"];
    document.getElementById('beta').textContent = Math.floor(lookup["A15"] / lookup["A7"]);
    document.getElementById('charlie').textContent = lookup["A13"] * lookup["A12"];
  })
  .catch(err => {
    console.error("Error loading CSV:", err);
  });
