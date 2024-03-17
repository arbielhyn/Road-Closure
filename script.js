/******w**************
    
    Assignment 4 Javascript
    Name: Arbie Lacanlale
    Date: February 1, 2024
    Description:

*********************/
document.querySelector('.search').addEventListener('submit', function (event) {
    event.preventDefault();
    search();
    var thead = document.querySelector('thead');

    thead.classList.remove('hidden');
});

// Get the input value
function search(){
    let searchInfo = document.getElementById('searchInfo').value;

    const apiUrl = 'https://data.winnipeg.ca/resource/h367-iifg.json?' +
    `$where=lower(primary_street) LIKE lower('%${searchInfo}%')` +
    '&$order=date_closed_from DESC' +
    '&$limit=100';
    const encodedURL = encodeURI(apiUrl);

    fetch(encodedURL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayResults(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error.message);
        });
}


function displayResults(results) {
    const resultList = document.querySelector('.results');
    resultList.innerHTML = '';
 
    if (results.length === 0) {
        resultList.innerHTML = '<tr><td>No results found</td></tr>';
    } else {
        results.forEach(result => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${result.status}</td>
                <td>${result.primary_street}</td>
                <td>${result.cross_street}</td>
                <td>${result.boundaries}</td>
                <td>${result.direction}</td>
                <td>${result.date_closed_from}</td>
                <td>${result.date_closed_to}</td>
            `;
            
            resultList.appendChild(row);
        });
    }
    
}

