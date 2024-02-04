
// if if "token" exists in the sessionStorage, redirect user
if (!sessionStorage.getItem("token")) {
    location.replace("login.html");
}

// fetch curriculum list
function getNastavniPlan() {
    fetch(
        'https://www.fulek.com/data/api/supit/curriculum-list/hr',
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        }
    )
    .then((response) => response.json())
    .then((result) => showNastavniPlan(result.data))
    .catch((error) => console.log(error))
}
getNastavniPlan();

// display curriculum list with autocomplete
function showNastavniPlan(data) {

    $("[name=nameCourse]").autocomplete({
        source: data.map(course => course.kolegij),
        autoFocus: true, // focus on first item
        minLength: 4,    // min characters before triggering autocomplete
        delay: 100,      // in ms
        open: function(event, ui) {
            // customize appearance of autocomplete menu
            $(".ui-autocomplete").css({
                "font-size": "1rem", 
                "letter-spacing": "2px",
                "padding": "10px",
            });
        },
        select: function(event, ui) {
            event.preventDefault();
            const selectedCourse = ui.item.value;
            const selectedCourseId = data.find(course => course.kolegij === selectedCourse).id;
            getKolegij(selectedCourseId);
        }
    });

    // keypress event listener for enter
    $("[name=nameCourse]").on("keypress", function(event) {
        if (event.keyCode === 13) { // 13 is Enter
            $(this).val(""); // clear input
        }
    });
}

// fetch curriculum details by ID
function getKolegij(id){
    fetch(
        'https://www.fulek.com/data/api/supit/get-curriculum/' + id,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        }
    )
    .then((response) => response.json())
    .then((result) => prikaziTablicu(result))
    .catch((error) => console.log(error))
}

let totalEcts = 0;
let totalSati = 0;
let totalPredavanja = 0;
let totalVjezbe = 0;

function prikaziTablicu(result) {

    const tableBody = $("#curriculum tbody");

    // access data from the API response
    const row = `
        <tr>
            <td>${result.data.kolegij}</td>
            <td>${result.data.ects}</td>
            <td>${result.data.sati}</td>
            <td>${result.data.predavanja}</td>
            <td>${result.data.vjezbe}</td>
            <td>${result.data.semestar}</td>
            <td>${result.data.tip}</td>
            <td><button class="btn btn-danger remove-btn">Ukloni</button></td>
        </tr>`;

    const newRow = $(row); // add click event to remove row
    newRow.find(".remove-btn").on("click", function() {
        newRow.remove();

        totalEcts -= result.data.ects;
        totalSati -= result.data.sati;
        totalPredavanja -= result.data.predavanja;
        totalVjezbe -= result.data.vjezbe;

        updateTotalValues();
    });
    
    tableBody.append(newRow);
     // each created row append to table

     totalEcts += result.data.ects;
     totalSati += result.data.sati;
     totalPredavanja += result.data.predavanja;
     totalVjezbe += result.data.vjezbe;
 
     updateTotalValues();
}

function updateTotalValues() {
    // update the total values in the table footer
    $("#total-ects").text(totalEcts);
    $("#total-sati").text(totalSati);
    $("#total-predavanja").text(totalPredavanja);
    $("#total-vjezbe").text(totalVjezbe);
}