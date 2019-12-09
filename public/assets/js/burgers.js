$(document).ready(function() {
    $.ajax("/burgers", {
        type: "GET",

    }).then(data => {
        let burgersMenu = $("#burgersMenu");
        let burgersDevour = $("#burgersDevour");

        let burgers = data.burgers;
        let len = burgers.length;

        for (let i = 0; i < len; i++) {

            // Create two seperate buttons. One for devour and the other one for delete.
            // Devour button should append burgersMenu and delete should append burgersDevour.

            let new_elem =
                "<li><p>" +
                burgers[i].burger_name +
                "<button class='devourBurger' data-id='" +
                burgers[i].id +
                "' data-devour='" +
                !burgers[i].devoured +
                "'>";

            if (burgers[i].devoured) {
                new_elem += "Delete";
                burgersDevour.append(new_elem);
            } else {
                new_elem += "Devour";
                burgersMenu.append(new_elem);
            }

            new_elem += "</button></p></li>";

            // new_elem +=
            //     "<button class='delete' data-id='" +
            //     burgers[i].id +
            //     "'>Delete</button></p></li>"

            // if (!burgers[i].devoured) {
            //     burgersMenu.append(new_elem);

            // }
        }
    });

    $("#addBurger").on("submit", function(event) {
        event.preventDefault();

        let newBurger = {
            burger: $("#burger_name").val().trim(),
            devoured: false
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

    $(document).on("click", ".devourBurger", function(event) {
        event.preventDefault();

        let id = $(this).data("id");
        let devourBurger = $(this).data("devour") === true;

        let devoured = {
            devoured: devourBurger
        };

        // Send the PUT request.
        $.ajax("/burgers/" + id, {
            type: "PUT",
            data: JSON.stringify(devoured),
            dataType: 'json',
            contentType: 'application/json'
        }).then(function() {
            console.log("changed burger to", devourBurger);
            // Reload the page to get the updated list
            location.reload();
        });
    });


    $(document).on("click", ".delete", function(event) {
        event.preventDefault();

        let burgerid = $(this).data("id");

        $.ajax("/burgers/" + burgerid, {
            type: "DELETE",

        }).then(function() {
            console.log("Deleted burger ", burgerid);
            location.reload();
        });
    });


});