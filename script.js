$(document).ready(function () {
    // Xử lý khi nhấp nút Add Lane
    $('#addLaneBtn').on('click', function () {
        var laneNumber = $('.lane').length + 1;
        var newLane = $('<div class="lane" id="lane-' + laneNumber + '"><div class="lane-label">Lane ' + laneNumber + '</div></div>');
        $('#roadmapBody').append(newLane);
        // Make the new lane droppable
        makeDroppable(newLane);
    });

    // Xử lý khi nhấp nút Add Bar
    $('#addBarBtn').on('click', function () {
        var barWidth = 100; // Starting width for new bars
        var barNumber = $('.bar').length + 1;
        var newBar = $('<div class="bar yellow" style="width: ' + barWidth + 'px;">Bar ' + barNumber + '</div>');
        var targetLane = $('.lane').length > 0 ? $('.lane').last() : $('<div class="lane"></div>').appendTo('#roadmapBody');
        targetLane.append(newBar);
        // Make the new bar draggable and resizable
        makeDraggable(newBar);
        makeResizable(newBar);
    });

    // Function to make elements draggable within the roadmap body
    function makeDraggable(element) {
        element.draggable({
            revert: 'invalid',
            stack: '.bar',
            start: function (event, ui) {
                $(this).css('z-index', 9999);
            },
            stop: function (event, ui) {
                $(this).css('z-index', '');
            }
        });
    }

    // Function to make elements resizable
    function makeResizable(element) {
        element.resizable({
            handles: 'e, w',
            stop: function(event, ui) {
                // Adjust the height of the lane if necessary
                adjustLaneHeight(ui.element.parent());
            }
        });
    }

    // Function to make lanes droppable
    function makeDroppable(element) {
        element.droppable({
            accept: '.bar',
            drop: function (event, ui) {
                ui.draggable.detach().css({top: '', left: '', width: ''}).appendTo($(this));
                // Adjust the height of the lane after dropping a bar
                adjustLaneHeight($(this));
            }
        });
    }

    // Function to adjust the height of lanes
    function adjustLaneHeight(lane) {
        var maxHeight = 0;
        lane.children('.bar').each(function() {
            maxHeight = Math.max(maxHeight, $(this).outerHeight(true));
        });
        lane.css('height', maxHeight + 'px');
    }
});