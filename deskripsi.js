$(function() {
    //CRUD Application

    var form = $(".form");
    var inputTitle = $("#judulkomentar");
    var inputDescription = $("#isikomentar");
    var list = $(".komen-list");
    var url = "http://localhost:3000";

    function readkomen() {

        $.ajax({
                method: "GET",
                url: url + "/komentar",
                dataType: "json"
            }).done(function(response) {
                list.empty();
                insertkomen(response);

            })
            .fail(function(error) {
                console.log(error);
            })
    }

    readkomen();


    function insertkomen(komentar) {
        komentar.forEach(function(e) {
            var li = $(`<li class="komen">
            <div class="isikomen">
            <h5 class="judulkomen"><p>Nama Wisata :</p> ${e.title}</h3>
            <p class="isikomen1"><a>Komentar :</a> ${e.description}</p>
            </div>
            <button class="btn-delete" data-id="${e.id}">Hapus</button>
        </li>`);
            list.append(li);
        })
    }


    function addkomen(title, description) {
        var kom = {
            "title": title,
            "description": description
        };
        $.ajax({
                method: "POST",
                url: url + "/komentar",
                dataType: "json",
                data: kom
            }).done(function(response) {
                readkomen();
            })
            .fail(function(error) {
                console.log(error);
            })


    }


    form.on("submit", function(e) {
        e.preventDefault();
        addkomen(inputTitle.val(), inputDescription.val());
        inputTitle.val("");
        inputDescription.val("");
    });





    function removekomen(id) {
        $.ajax({
                method: "DELETE",
                url: url + "/komentar/" + id,
                dataType: "json",
            }).done(function(response) {
                readkomen();
            })
            .fail(function(error) {
                console.log(error);
            })

    }

    list.on("click", ".btn-delete", function() {
        var id = $(this).data("id");
        removekomen(id);

    });


});