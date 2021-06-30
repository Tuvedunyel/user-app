let userData = [];
const fetchUser = async () => {
    await fetch("https://randomuser.me/api/?results=24").then( (response) => response.json()).then((data) => {
        userData = data.results
    });

    console.log(userData[0])
}

const userDisplay = async () => {
    await fetchUser();

    const dateParser = (date) => {
        let newDate = new Date(date).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric"
        })
        return newDate
    };

    const dayCalc = (date) => {
        let today = new Date();
        let todayTimestamp = Date.parse(today)
        let timeStamp = Date.parse(date)

        return Math.ceil((todayTimestamp - timeStamp) / 8.64e7)
    }
    
    document.body.innerHTML = userData.map((user) => 
        `   
            <div class="card">
                <img src=${user.picture.large} alt="photo de ${user.name.title} ${user.name.last} ${user.name.first}" />
                <h3>${user.name.title} ${user.name.last} ${user.name.first}</h3>
                <p>${user.location.city}, ${user.location.state} - ${user.location.country}</p>
                <p>${dateParser(user.dob.date)}</p>
                <em>Membre depuis : ${dayCalc(user.registered.date)} jours </em>
            </div>
        `
    ).join("");

}

userDisplay();