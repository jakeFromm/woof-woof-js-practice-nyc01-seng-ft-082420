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

    const onlyGoodDog = ()=>{
        fetch(baseURL)
            .then(response => response.json())
            .then(pups => {
                for(const pup of pups){
                    if(pup.isGoodDog == true){
                        renderPup(pup)
                    }
                }
            })
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
            <button class="good-dog-bad-dog-button" data-id=${clickedPup.id}>Good Dog!</button>
            `
        } else if (clickedPup.isGoodDog == false) {
            dogInfoDiv.innerHTML = `
            <img src=${clickedPup.image}>
            <h2>${clickedPup.name}</h2>
            <button class="good-dog-bad-dog-button" data-id=${clickedPup.id}>Bad Dog!</button>
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
                const pupId = e.target.dataset.id
                const button =e.target
                const goodDog = e.target.textContent
                let status = ""

                if(goodDog == "Good Dog!"){
                    button.textContent = "Bad Dog!"
                    status = false
                }else if(goodDog == "Bad Dog!"){
                    button.textContent = "Good Dog!"
                    status = true
                }

                const options = {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json"
                    },
                    body: JSON.stringify({isGoodDog: status})
                }

                fetch(baseURL + pupId, options)
                .then(res =>res.json()) 
            } else if (e.target.matches("#good-dog-filter")){
                const button = e.target
                if (button.textContent == "Filter good dogs: OFF"){
                    button.textContent = "Filter good dogs: ON"
                    document.querySelector('#dog-bar').innerHTML = ""
                    onlyGoodDog()
                } else if (button.textContent == "Filter good dogs: ON") {
                    button.textContent = "Filter good dogs: OFF"
                    document.querySelector('#dog-bar').innerHTML = ""
                    fetchPups()
                }
            }
        })
    }
    clickHandler()
    fetchPups()
})