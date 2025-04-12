//your JS code here. If required.
const output = document.getElementById("output");

const loadingRow = document.createElement("tr");
loadingRow.innerHTML = `<td colspan="2" id="loading">Loading...</td>`;
output.appendChild(loadingRow);

function createRandomPromise(name) {
  const delay = Math.random() * 2 + 1;
  const start = performance.now();

  return new Promise(resolve => {
    setTimeout(() => {
      const end = performance.now();
      const duration = parseFloat((end - start) / 1000).toFixed(3);
      resolve({ name, duration });
    }, delay * 1000);
  });
}

const promises = [
  createRandomPromise("Promise 1"),
  createRandomPromise("Promise 2"),
  createRandomPromise("Promise 3")
];

Promise.all(promises).then(results => {

  output.innerHTML = "";

  results.forEach((result, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${result.name}</td>
      <td>${result.duration}</td>
    `;
    output.appendChild(row);
  });

  const totalTime = Math.max(...results.map(r => parseFloat(r.duration))).toFixed(3);

  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `
    <td><strong>Total</strong></td>
    <td><strong>${totalTime}</strong></td>
  `;
  output.appendChild(totalRow);
});