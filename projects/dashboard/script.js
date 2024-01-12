var myChart = new Chart("myChart", { 
    type: 'bar', 
    data: { 
        labels: [20, 22, 25, 27, 30, 33, 35, 37, 40, 50, 60], 
        datasets: [{ 
            label: 'Employer: 73,500', 
            backgroundColor: "darkblue", 
            data: [20, 25, 50, 60, 70, 90, 125, 175, 210, 240, 270], 
        }, { 
            label: 'Employee: 52,500', 
            backgroundColor: "lightblue", 
            data: [50, 60, 80, 100, 120, 150, 175, 215, 225, 270, 280], 
        }, { 
            label: 'Total Interest: 244,313', 
            backgroundColor: "blue", 
            data: [75, 70, 110, 120, 150, 175, 225, 240, 270, 290, 300], 
        }], 
    }, 
    options: { 
        plugins: { 
            title: { 
                display: true, 
                text: '' 
            }, 
        },
        scales: { 
            xAxes: [{
                stacked: true
            }],
            yAxes: [{
                stacked: true
            }]
        }, 
        responsive: true
    } 
});

function changeValueOne() {

    var slider_one = document.getElementById("slider-1");
    var slider_one_value = document.getElementById("slider-1-value");

    slider_one_value.innerHTML = slider_one.value.toString() + "%";

}

function changeValueTwo() {

    var slider_two = document.getElementById("slider-2");
    var slider_two_value = document.getElementById("slider-2-value");

    slider_two_value.innerHTML = slider_two.value.toString();

}