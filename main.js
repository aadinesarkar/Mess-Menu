const print = console.log
const gid = (id) => document.getElementById(id)
const log = (text, color)=>print(`%c${text}`, `color: black; background-color: ${color}`)

var selected_day = 0

function setup() {
    let items = Object.entries(menu)[selected_day][1]
    // print(items)
    for (let [category, list] of Object.entries(items)) {
        document.getElementById(category).lastElementChild.innerHTML = list.map(ele => `<div class="item">${ele}</div>`).join("")
    }
    const current_hours = new Date().getHours()
    let cumulative = 0
    if(current_hours < 10) {
        // Already at #B
    }
    else if(current_hours < 14) {
        // Jump to #L
        cumulative += document.querySelector("#B").offsetHeight
    }
    else if(current_hours < 18) {
        // Jump to #S
        cumulative += document.querySelector("#B").offsetHeight
        cumulative += document.querySelector("#L").offsetHeight
    }
    else if(current_hours < 22) {
        // Jump to #D
        cumulative += document.querySelector("#B").offsetHeight
        cumulative += document.querySelector("#L").offsetHeight
        cumulative += document.querySelector("#S").offsetHeight
    }
    document.querySelector("#actual-menu").scrollTo(0, cumulative)
}

window.onload = () => {
    if("serviceWorker" in navigator) {
        navigator.serviceWorker.register("sw.js")
    }
    // new Date().getDay() returns 1 for Monday, 0/7 for Sunday
    selected_day = (new Date().getDay() + 6) % 7
    // Set the current day and select it
    document.querySelector(".day-picker").children[selected_day].classList.add("day-choice--today", "day-choice--selected")
    setup()
    document.querySelectorAll(".day-choice").forEach((day_choice, index) => {
        day_choice.onclick = event => {
            if("vibrate" in navigator) navigator.vibrate(50)

            document.querySelector(".day-choice--selected").classList.remove("day-choice--selected")
            day_choice.classList.add("day-choice--selected")
            selected_day = index
            setup()
        }
    })
}

var menu = {
    "Monday": {
        "B": "Onion Poha + Sweet Curd",
        "L": "Veg Handi Gravy, Cabbage Mattar Dry, Dal Makhani, Rice, Pickle, Chapati, Sweet Lassi, Papad",
        "S": "Vada Pav",
        "D": "Black Chana Gravy, Aloo Bhendi Dry, Dal Tomato, Jeera Rice, Chapati, Rassam, Salad"
    },
    "Tuesday": {
        "B": "Idli Sambar Chutney",
        "L": "Punjabi Chole, Aloo Jeera, Lasuni Dal, Rice, Pickle, Puri, Lime Juice, Kheer, Sirka Pyaaz",
        "S": "Bhelpuri",
        "D": "Chawali Masala Gravy, Veg Manchurian Dry, Dal Kholapuri, Rice, Chapati, Rassam, Papad"
    },
    "Wednesday": {
        "B": "Aloo Paratha",
        "L": "Veg Kofta Gravy, Soya Chilly Dry, Dal Masala, Rice, Chapati, Pickle, Curd, Mix Salad",
        "S": "Masala Sandwich",
        "D": "Chicken Biryani, Paneer Biryani, Kaddu Masala, Dal Lasuni, Rice, Chapati, Pickle, Papad"
    },
    "Thursday": {
        "B": "Veg Upma",
        "L": "Kadi Pakoda, Aloo Capsicum Dry, Mix Dal, Jeera Rice, Pickle, Chapati, Tang, Fruit Custard, Papad",
        "S": "Finger Chips",
        "D": "Pindi Channa Gravy, Aloo Rasila Gravy, Dal Adraki, Veg Pulao, Chapati, Rassam, Salad + Onion"
    },
    "Friday": {
        "B": "Uttappa / Medhu Wada",
        "L": "Veg Jalfrizi Gravy, Rajma Masala, Kaali Masoori Dal, Rice, Pickle, Chapati, Curd, Khaman Dhokla / Salad",
        "S": "Veg Maggi",
        "D": "Egg / Chicken Masala, Paneer Masala, Dudhi Channa Dry, Dal Tadka, Rice, Pickle, Paratha + Chapati, Boondi Raita, Papad"
    },
    "Saturday": {
        "B": "Puri Bhaji",
        "L": "Veg Kholapuri Gravy, Soya Dry, Dal Tadka, Jeera Rice, Pickle, Chapati, Butter Milk, Kharari Boondi, Moong / Channa Salad",
        "S": "Dabeli",
        "D": "Mix Usal Gravy, Mix Veg Dry, Sambar, Lemon Rice, Chapati, Dal Fry, Salad"
    },
    "Sunday": {
        "B": "Chole Bhature",
        "L": "Veg Kurma Gravy, Veg Biryani, Dal Fry, Rice, Pickle, Chapati, Jeera Raita, Fryums",
        "S": "Bread Pakoda",
        "D": "Green Peas Gravy, Onion Uttapam / Pav Bhaji, Dal Fry, Veg Noodles, Pickle, Chapati, Rice, Papad"
    }
}

var everyday = {
    "B": "Tea + Coffee, Boiled Egg / Omelette, Bread + Jam, Bournvita, Hot + Cold Milk",
    "L": "",
    "S": "Tea + Coffee",
    "D": ""
}

for(let [day, list] of Object.entries(menu)) {
    for(let [category, items] of Object.entries(menu[day])) {
        items = items.split(", ")
        if(everyday[category] != '') items.push(...everyday[category].split(", "))
        menu[day][category] = items
    }
}