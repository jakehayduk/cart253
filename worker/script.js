$(document).ready(function() {

    // Firebase Database
    
    const db = firebase.firestore();

    let projectsRef;
    
    projectsRef = db.collection('projects');


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
        })
    }, 100)

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

                // totalTime = totalTime + data.duration;
                // console.log(totalTime);
                if (data.duration > 0) {
                    // $('.time-share').append("<div class='share' style='background-color: " + data.colour + "; width: " + (data.duration / totalTime) * 100 +"%'>" + data.name + "<br>" + ((data.duration / totalTime) * 100).toFixed() + "%</div>");
                    
                    $('.time-share').append("<div class='share " + doc.id + "' style='background-color: " + data.colour + ";'>" + data.name + "<span></span></div>");
                }
                // console.log(totalTotalTime);
                // console.log((data.duration / totalTime) * 100);
                
                // console.log($('.project').length)
                // if (docIndex == $('.project').length) {
                //     console.log(data.duration);
                // }
                // docIndex ++;
                // console.log(totalTime);
            }
        })
    })

    // Get the top seller
    projectsRef.orderBy("price", "desc").limit(1).onSnapshot(querySnapshot => {
        querySnapshot.docs.forEach((doc) => {
            const data = doc.data();
            $('.top-seller').html('<b>' + data.name + '</b> is the top seller! ($' + data.price + ')');
        })
    })

    // When a "data-block" is clicked, bring up the relevant information on the viewable 3D cube in another modal window
    $('body').on('click', '.data-block', function() {
        
        let docRef = projectsRef.doc($(this).attr('id'));
        docRef.get().then((doc) => {
            if (doc.exists) {
                const data = doc.data();
                $('.modal-cube-data-1').text(data.name);
                $('.modal-cube-data-2').text(data.city);
                $('.modal-cube-data-3').text(data.age);
                $('.modal-cube-data-4').text(data.criteria);
                $('.modal-cube-data-5').text(data.friend);
                $('.modal-cube-data-6').text(data.goal);

                $('.modal-cube h2').text(data.name + '\'s data block');

                $('.modal-cube').css('display', 'flex');
                $('.modal-cube-close').show();

                // Reset the cube's location in 3D space
                x = 0;
                y = 0;
                x2 = 0;
                y2 = 0;
                zoom = 1.2;
                $('.container').css('transform', 'scale(' + zoom + ')');
            }
            else {
                console.log('No such document.');
            }
        })
    })

    $('.modal-cube-close').on('click', function() {
        $('.modal-cube').hide();
        $('.modal-cube-close').hide();
    })
})