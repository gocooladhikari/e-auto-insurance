$(document).ready(() => {
    $("#2").hide()
    $("#3").hide()
    $("#4").hide()

    var count = 1

    $("#addCar1").click(() =>{
        count = 2
        $('#' + count).show()
        $("#addCar1").hide()
    })

    $("#addCar2").click(() =>{
        count = 3
        $('#' + count).show()
        $("#addCar2").hide()
    })

    $("#addCar3").click(() =>{
        count = 4
        $('#' + count).show()
        $("#addCar3").hide()
    })

    

    $("#form1").submit((e) => {
        e.preventDefault()
        var details = []
        details[0] = $("#vinnumber1").val()
        details[1] = $("#vinnumber2").val()
        details[2] = $("#vinnumber3").val()
        details[3] = $("#vinnumber4").val()
        // console.log(details)
        return fetch('/form/1', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(details)
        })
        .then(res => res.json(res))
        .then(data =>{
            // console.log(data)
            window.location.href = `/form/${data._id}/2`
        })
        // .catch(err => console.log(err))
    })

})
