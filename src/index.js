document.addEventListener("DOMContentLoaded", () => {
    const baseURL = "http://localhost:3000/pups/"

    const fetchPups = () => {
        fetch(baseURL)
            .then(response => response.json())
            .then(pups => renderPups(pups))
    }

    const renderPups = pups => {
        for(const pupObj of pups){
            renderPup(pupObj)
        }
    }

    function renderPup(pupObj){
        const pupsDiv = document.querySelector("#dog-bar")

        const pupSpan = document.createElement("span")
        pupSpan.textContent = `${pupObj.name}`
        pupSpan.dataset.id = pupObj.id
        pupSpan.classList.add("pup-span")
        pupsDiv.append(pupSpan)

    }

    const renderPupInfoDiv = (clickedPup) => {
        const dogInfoDiv = document.querySelector("#dog-info")
        dogInfoDiv.dataset.id = clickedPup.id
        if (clickedPup.isGoodDog == true) {
            dogInfoDiv.innerHTML = `
            <img src=${clickedPup.image}>
            <h2>${clickedPup.name}</h2>
            <button class="good-dog-bad-dog-button">Good Dog!</button>
            `
        } else if (clickedPup.isGoodDog == false) {
            dogInfoDiv.innerHTML = `
            <img src=${clickedPup.image}>
            <h2>${clickedPup.name}</h2>
            <button class="good-dog-bad-dog-button">Bad Dog!</button>
            `
        }
    }

    function clickHandler(){
        document.addEventListener("click", e => {
            if (e.target.matches(".pup-span")) {
                let clickedPup = e.target
                let pupID = clickedPup.dataset.id
                
                fetch(baseURL + pupID)
                    .then(response => response.json())
                    .then(clickedPup => renderPupInfoDiv(clickedPup))
            } else if (e.target.matches(".good-dog-bad-dog-button")){
                let button = e.target
                let dogInfoDiv = button.parentElement
                let pupID = dogInfoDiv.dataset.id

                fetch(baseURL + pupID)
                    .then(response => response.json())
                    .then(clickedPup => changeDogQuality(clickedPup))
                
                
                const options = {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json"
                    },
                    // body: JSON.stringify({isGoodDog: clickedPup.isGoodDog})
                }
            }
        })

        
        const changeDogQuality = () => {
             const button = document.querySelector(".good-dog-bad-dog-button")
             button.addEventListener("click", e => {
                 const clickTarget = e.target
                 if (clickTarget.textContent == "Bad Dog!") {
                     clickTarget.textContent = "Good Dog!"
                 } else if (clickTarget.textcontent == "Good Dog!") {
                     clickTarget.textContent = "Bad Dog!"
                 }
             })
        }
        
        
            
       
    }

   
    clickHandler()
    fetchPups()
})