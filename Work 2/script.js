const debounce = (func, delay) => {
    let timeoutId;
    return(...args) =>{
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() =>{
            func.apply(null,args);
        }, delay);
    };
};
async function searchCountry(){
    const inputElement = document.getElementById('countryInput');
    const countryName = inputElement.value;

    if (!countryName) {
       alert('please enter a country name');
       return
    }
    try{
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const data = await response.json();
        if (data.status === 404){
            alert('country not found');
            return;
        }
        const resultElement = document.getElementById('result');
        resultElement.innerHTML = '';
        data.forEach(country =>{
            resultElement.innerHTML += `
            <div>
                <h3>${country.name.common}</h3>
                <p>Capital: ${country.capital}</p>
                <p>Population: ${country.population}</p>
                <p>Region: ${country.region}</p>
                <P>Subregion: ${country.subregion}</P>
                <img src="${country.flags.png}">alt="${country.name.common} flag"</img>
            </div>
            `;
        });
    } catch (error){
        console.error('Error fetching data:', error);
        alert('An error occured while fetching data');
    }
}
const debouncedSearchCountry = debounce(searchCountry, 500);
document.getElementById('countryInput').addEventListener('input', debouncedSearchCountry);