$(document).ready(function() {

    // Firebase Database
    
    const db = firebase.firestore();

    let projectsRef;
    let notesRef;
    
    projectsRef = db.collection('projects');
    notesRef = db.collection('notes');

    $('.add').on('click', function() {
        const projectName = $('.add-input').val();
        const colour = $('.colour-select').css('background-color');
        addProject(projectName, colour);
        $('.add-input').val('');
    })

    $('.colour').on('click', function() {
        $('.colour').removeClass('colour-select');
        $(this).addClass('colour-select');
    })

    $('.add-note-button').on('click', function() {
        const noteText = $('.add-note').val();
        addNote(noteText);
        $('.add-note').val('');
    })

    // Uploads data once survey is completed
    function addProject(name, colour) {

        // const { serverTimestamp } = firebase.firestore.FieldValue;

        // timestamp: Date()

        projectsRef.add({
            name: name,
            working: false,
            start: new Date(),
            end: null,
            duration: 0,
            colour: colour
        })
    }

    let totalTime = 0;
    let totalTimer = 0;
    setInterval(function() {
        totalTimer = 0;
        $('.project').each(function(i) {
            if ($(this).hasClass('working')) {
                const startDate = new Date($(this).find('.dater').text());
                const endDate = new Date();
                const timeDifference = (Math.abs(endDate - startDate) / 1000);
                $(this).find('.seconds').text((timeDifference).toFixed(2) + 's');
                $(this).find('.minutes').text((timeDifference/60).toFixed(2) + 'mins');
                $(this).find('.hours').text((timeDifference/60/60).toFixed(2) + 'hrs');
            }
            
            const timer = $(this).find('.timer').text();
            totalTimer = totalTimer + Number(timer);
            const percentage = (Number(timer))/totalTime * 100;
            const id = $(this).attr('id');
            if (id) {
                $(`.share.${id}`).css('width', percentage + '%');
                $(`.share.${id} span`).text(percentage.toFixed() + '%');
                if ($('.share.' + id).width() !== undefined && $('.share.' + id).width() < 50) {
                    $('.share.' + id).text('');
                }
            }
            
            // console.log($('.share.' + id).width());
            
            
            
            if (i == $('.project').length - 1) {
                if (money == true) {
                    totalTime = totalTimer;
                    const moneyTime = totalTime/60/60;
                    $('.total-time').text('Total money: $' + (moneyTime * 28).toFixed(2));
                }
                else {
                    totalTime = totalTimer;
                    if (totalTime < 60) {
                        $('.total-time').text('Total time: ' + (totalTime).toFixed(2) + ' s');
                    }
                    else if (totalTime > 60 && totalTime < 3600) {
                        $('.total-time').text('Total time: ' + (totalTime/60).toFixed(2) + ' mins');
                    }
                    else if (totalTime > 3600) {
                        $('.total-time').text('Total time: ' + (totalTime/60/60).toFixed(2) + ' hrs');
                    }
                }
            }

            
        })
    }, 100)

    let money = false;

    $('.total-time').on('click', function() {
        if (money == false) {
            money = true;
        }
        else {
            money = false;
        }
    })

    setTimeout(function() {
        projectsRef.add({
            name: "null",
            working: false,
            start: new Date(),
            end: new Date(),
            duration: 0,
            colour: 'rgb(0,0,0)'
        })

        setTimeout(function() {
            projectsRef.where("name", "==", "null").get().then((querySnapshot) => {
                querySnapshot.docs.forEach((doc) => {
                    doc.ref.delete();
                }) 
            })
        }, 100)
    }, 200)



    // let startDate;
    // let endDate;

    $('body').on('click', '.start', function() {
        // get the ref for the clicked project
        const docRef = projectsRef.doc($(this).attr('id'));
        // read the doc's data
        docRef.get().then((doc) => {
            if (doc.exists) {
                const data = doc.data();
                //update the doc data
                if (data.working == false) {
                    // Start the timer
                    docRef.update({
                        working: true,
                        start: new Date()
                    });
                }
                else {
                    // End the timer
                    const startDate = data.start.toDate();
                    const endDate = new Date();
                    // const difference = (endDate.getTime() - startDate.getTime()) / 1000;
                    const timeDifference = (Math.abs(endDate - startDate) / 1000);
                    const duration = timeDifference + data.duration;
                    // console.log(duration);
                    docRef.update({
                        working: false,
                        end: new Date(),
                        duration: duration
                    });
                }
            }
            else {
                console.log('No such document.');
            }
        })
    })

    $('body').on('click', '.reset', function() {
        const docRef = projectsRef.doc($(this).attr('id'));
        docRef.get().then((doc) => {
            if (doc.exists) {
                //RESET the project status
                docRef.update({
                    working: false,
                    start: null,
                    end: null,
                    duration: 0
                });
            }
            else {
                console.log('No such document.');
            }
        })
    })

    let deleteMenu = false;
    let deleteProject;
    $('body').on('contextmenu', '.project', function(e) {
        e.preventDefault();
        $('.delete').show();
        $('.delete').css('top', e.pageY);
        $('.delete').css('left', e.pageX);
        deleteMenu = true;
        deleteProject = $(this);
    })

    $('body').on('click', function() {
        if (deleteMenu == true) {
            deleteMenu = false;
            $('.delete').hide();
        }
    })

    $('.delete').on('click', function() {
        $(this).hide();
        deleteMenu = false;
        const projectID = deleteProject.attr('id');
        projectsRef.doc(projectID).delete();
    })

    // Data is updated in real time
    projectsRef.onSnapshot(querySnapshot => {
        $('.projects').html('');
        // totalTime = 0;
        // let docIndex = 0;
        $('.time-share').html('');
        // Create and display a "data-block" for each array of data in the database 
        querySnapshot.docs.forEach((doc) => {
            // console.log(querySnapshot.data().count)
            const data = doc.data();
            // working project
            if (data.name !== "null") {
                if (data.working == true) {
                    $('.projects').append("<div class='project working' id='" + doc.id + "' style='animation: working 2s infinite; background-color: " + data.colour + ";'><button class='start' id='" + doc.id + "' style='background-color: crimson;'>&#9724;</button><p><b>" + data.name + "</b></p><p class='seconds'>" + data.duration.toFixed(2) + " s</p><p class='minutes'>" + (data.duration/60).toFixed(2) + " mins</p><p class='hours'>" + (data.duration/60/60).toFixed(2) + " hrs</p><p class='timer'>" + data.duration + "</p><p class='dater'>" + (data.start).toDate() + "</p><button class='reset' id='" + doc.id + "'>&#8634;</button></div>");
                }
                // static project
                else {
                    $('.projects').append("<div class='project' id='" + doc.id + "' style='background-color: " + data.colour + ";'><button class='start' id='" + doc.id + "'>&#9654;</button><p><b>" + data.name + "</b></p><p class='seconds'>" + data.duration.toFixed(2) + " s</p><p class='minutes'>" + (data.duration/60).toFixed(2) + " mins</p><p class='hours'>" + (data.duration/60/60).toFixed(2) + " hrs</p><p class='timer'>" + data.duration + "</p><button class='reset' id='" + doc.id + "'>&#8634;</button></div>");
                }

                if (data.duration > 0) {
                    $('.time-share').append("<div class='share " + doc.id + "' style='background-color: " + data.colour + ";'>" + data.name + "<span></span></div>");
                }
            }
        })
    })

    function addNote(noteText) {
        notesRef.add({
            text: noteText,
            date: new Date()
        })
    }

    notesRef.orderBy("date", "asc").onSnapshot(querySnapshot => {
        $('.notes-list').html('');
        querySnapshot.docs.forEach((doc) => {
            const data = doc.data();
            const date = data.date;
            $('.notes-list').append("<div class='note'><div class='note-check'><div class='note-id' style='display: none;'>" + doc.id + "</div></div><p>" + data.text + "</p><span>" + date.toDate().toDateString() + "</span></div>")
        })
    })

    $('body').on('click', '.note-check', function() { 
        const note = $(this);
        note.css('transform', 'scale(100)');
        note.css('background-color', 'rgb(48, 161, 76))');
        note.css('opacity', '0');
        note.parent().css('background-color', 'rgb(48, 161, 76)');

        setTimeout(function() {
            note.parent().css('transform', 'scaleY(0)');
            const id = note.find('.note-id').text();

            setTimeout(function() {
                notesRef.doc(id).delete();
            }, 500)
        }, 600)
    })

    // Handle enter key presses

    $(document).on('keypress',function(e) {
        if(e.which == 13) {
            if ($('.add-input').is(':focus')) {
                const projectName = $('.add-input').val();
                const colour = $('.colour-select').css('background-color');
                addProject(projectName, colour);
                $('.add-input').val('');
            }
            else if ($('.add-note').is(':focus')) {
                const noteText = $('.add-note').val();
                addNote(noteText);
                $('.add-note').val('');
            }
        }
    });

})