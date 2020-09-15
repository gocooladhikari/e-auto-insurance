$(document).ready(() => {
    $("#spouse2").hide()
    $("#spouse3").hide()
    $("#spouse4").hide()

    var count = 1

    $("#addSpouse1").click(() =>{
        count = 2
        $('#spouse' + count).show()
        $("#addSpouse1").hide()
    })

    $("#addSpouse2").click(() =>{
        count = 3
        $('#spouse' + count).show()
        $("#addSpouse2").hide()
    })

    $("#addSpouse3").click(() =>{
        count = 4
        $('#spouse' + count).show()
        $("#addSpouse3").hide()
    })

    

    $("#form3").submit((e) => {
        e.preventDefault()
        var details = []
        details[0] = $("#firstName1").val()
        details[1] = $("#firstName2").val()
        details[2] = $("#firstName3").val()
        details[3] = $("#firstName4").val()

        var id = $("#dataID").val()
        // console.log(details)
        return fetch(`/form/${id}/3`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(details)
        })
        .then(res => res.json(res))
        .then(data =>{
            console.log(data)
            window.location.href = `/form/${data._id}/4`
        })
        // .catch(err => console.log(err))
    })

})
