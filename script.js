//your JS code here. If required.
const output = document.getElementById("output");

output.innerHTML = `<tr id="loading"><td colspan="2">Loading...</td></tr>`;

const startTime = performance.now();

function createRandomPromise(name) {
  const delay = Math.random() * 2000 + 1000;

  return new Promise(resolve => {
      setTimeout(()=>resolve(delay/1000), delay);
  });
}

Promise.all([
  createRandomPromise("Promise 1"),
  createRandomPromise("Promise 2"),
  createRandomPromise("Promise 3")
]).then(times => {
	const endTime = performance.now();
	const totalTime = ((endTime - startTime)/1000).toFixed(3);
	const loadingRow = document.getElementById("loading");
	if(loadingRow) loadingRow.remove();

	times.forEach((time, i)=>{
		const row = document.createElement("tr");
		row.innerHTML = `<td>Promise ${i+1}</td><td>${time.toFixed(3)}</td>`;
		output.appendChild(row);
	});

	const totalRow = document.createElement("tr");
	totalRow.innerHTML = `<td>Total</td><td>${totalTime}</td>`;
	output.appendChild(totalRow);
})
