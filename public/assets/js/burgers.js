$(document).ready(function() {
    $.ajax("/burgers", {
        type: "GET",

    }).then(data => {
        let burgersMenu = $("#burgersMenu");
        let burgersDevour = $("#burgersDevour");

        let burgers = data.burgers;
        let len = burgers.length;

        for (let i = 0; i < len; i++) {
            let new_elem =
                "<li><p>" +
                burgers[i].burger_name +
                "<button class='devourBurger delete' data-id'" +
                burgers[i].id +
                "' data-devour='" +
                !burgers[i].devoured +
                "'>"

            if (burgers[i].devoured) {
                new_elem += "Devour";
                burgersMenu.append(new_elem);
            } else {
                new_elem += "Delete";
                burgersDevour.append(new_elem);
            }

            new_elem += "</button></p></li>";
        }
    });

    $("#addBurger").on("submit", function(event) {
        event.preventDefault();

        let newBurger = {
            burger: $("#burger_name").val().trim(),
            devoured: true
        }

        console.log("Added new burger to the menu");
        console.log(newBurger)

        $.ajax("/burgers", {
            type: "POST",
            data: JSON.stringify(newBurger),
            dataType: "json",
            contentType: "application/json",
        }).then(function() {
            console.log("Created a new burger!");
            location.reload();
        });
    });


    // $(document).on("click", ".delete", function(event) {
    //     let burgerid = $(this).data("id");

    //     console.log("working??");

    //     $.ajax("/burgers/" + burgerid, {
    //         type: "DELETE",

    //     }).then(function() {
    //         console.log("Deleted burger ", burgerid);
    //         location.reload();
    //     });
    // });


});