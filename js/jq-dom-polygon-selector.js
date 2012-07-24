// Author: Tegan Snyder
// DOM Polygon Selector
// www.tegdesign.com

$(function() {

	document.oncontextmenu = function() {return false;};

	$(document).on("mousedown", "#map", function(e) {
	
		if (e.which == 3) {
		
			var normal_marker ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAgCAYAAAAi7kmXAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAwNy8yNC8xMtnNTbQAAAAedEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzUuMasfSOsAAAGcSURBVDiNlZRBTsJAFIa/DgQWBsG4MyHhBpL0ApxGtxyBI7DtTm/AEcpeEzyACcQ1sY0KgrbjojPTaTst8hLCzPzv6//edDqelBId3v3zAJiqX18tx8AcmMvAj0yuBhUUAre44wWYaFhYQhOE0kI9EcptZkNet4cYDBGDIV63V4BVLh53TwNgrXsSF9eIq1HBKn1fk35t9TQGRgKYaIh2pwIB2Vq7o6d9YKJBAFqXN7UNlrSJAMZ2b3VR0saioLY61EZJM2CTmytHNOQ1hgHl4eNkspUTCazTcEasBNnLP+la0lYCWP3LIzkWQRn4BpSHz3rH404PYxn4a705SwD5s3NCmbbXwxDyXc1cf48VIK/G9FgFax2L/RXA0FFS7lbsb2VAGfhrYJOVezhZpu1oFl3v0trtRT3oKjXv/f+Ocm9uxI1qqQjafVrJyG8zNmWWHY1ou6b5+KEJDAHSXXajyd1WH4qNfTQroAz8BRCTJiTbV5LozenmcszL3UeQJmeB5aSlvZu1oAz8EPW1qJg5Hl57WU3V/6N6UCX+ABJcv65f6a53AAAAAElFTkSuQmCC";
			
			$('.marker').attr('src', normal_marker);
		
			var sm_id = $('.sm_square').length;
			
			$('body').append('<div class="sm_square" id="sm_' + sm_id + '"></div>');
			
			$('#sm_' + sm_id ).drag_sm();
			
			$('#sm_' + sm_id).css('left', e.pageX + 'px');
			$('#sm_' + sm_id).css('top', e.pageY + 'px');
			

			if (sm_id > 0) {
			
				var x1 = $('#sm_' + (sm_id - 1)).position().left;
				var y1 = $('#sm_' + (sm_id - 1)).position().top;
			
				createLine(sm_id, x1,y1,e.pageX,e.pageY);

			}
		
		}
	
	});
	
	$(document).on("mousedown", "#sm_0", function(e) {

		if (e.which == 3) {
		
			var sm_id = $('.sm_square').length;
			
			var x1 = $('#sm_' + (sm_id - 1)).position().left;
			var y1 = $('#sm_' + (sm_id - 1)).position().top;
		
			createLine(sm_id, x1,y1,$(this).position().left,$(this).position().top);
			
			var points = [];
			
			$('.sm_square').each(function() {
			
				var point = {
					x: $(this).position().left,
					y: $(this).position().top
				};
				
				points.push(point);
			});
			
			var selected_marker ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAgCAYAAAAi7kmXAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAwNy8yNC8xMtnNTbQAAAAedEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzUuMasfSOsAAAGlSURBVDiNlZRNTsMwEEafXVHxU4myQiobuEDgCF1wD67AEXqEHoHcgB3bcIPAHtEuzAYJGqmlpW1SFtiO48SFjpSFZ+b5m5lOLZRSGLt5PusCt/o71u4MGALDOFITkysMqKEEuKTZnoC+gaUT2AahY4k5SK02cKG9DnR6gk5PsNepwjoXcf1AFxiZnvZPBEcXm0r27FWw+LS+DDiXQN9ArTY1CH59rbY9HgN9AwJweCprUCDWl8BV2ZsIgl7sqnKNOMiDoB+zoDe9gGoDuKtZcDX9O9nJmUicbdjBUsnvjw/AehKu3IulEkj/I1GsPMU4UhZcfdW3xirOy5WLIzUy+o8A+XwLuLCxBMqppgD5MlyqM9E6uJ43Q5t5yz1WwMR482l9sl5/qQXjSI2AMUDRUO5qWu3PVbROJ6kEZ9Z3HwSd6TmlVnMCip7ah00Z65aqoNunk8wyq5fpK9qg26fT3902MAH41i/a8l2apRi7q1kD40jdA1mRw/QFZm9Fo1qToi33O4OifGb+BfpJj+40g2AcqQT9b9E2aLg8+Fjdmnv0RTX7AZOgtDj7h8KFAAAAAElFTkSuQmCC";
			
			$('.marker').each(function() {
			
				
				if (isPointInPoly(points, {x: $(this).position().left, y: $(this).position().top})) {
				
					$(this).attr('src', selected_marker);
				
				}
				
			});
			
			$('.sm_square').remove();
			$('.line').remove();
			
			
		}
	});
	


});

//modified version of https://gist.github.com/1330150
$.fn.drag_sm = function() {
  var $document = $(document)
    , mouse = { update: function(e) {this.x = e.pageX; this.y = e.pageY;} };
    
  return this.each(function(){
    var $elem = $(this);
    $elem.bind('mousedown.drag', function(e) {
      mouse.update(e);
      if ( !/^(relative|absolute)$/.test($elem.css('position') ) ) {
        $elem.css('position', 'relative');
      }
      $document.bind('mousemove.drag', function(e) {

		if ($elem.attr('id') == 'sm_0') { return false; }
	  
		var left = (parseInt($elem.css('left'))||0) + (e.pageX - mouse.x) + 'px';
		var top = (parseInt($elem.css('top'))||0) +  (e.pageY - mouse.y) + 'px';
	  
        $elem.css({
          left: left,
          top: top
        });
		
		x2 = e.pageX;
        y2 = e.pageY;
		
        var line_sm = parseInt($elem.attr('id').split('sm_')[1],10);
		
		var x1 = $('#sm_' + (line_sm - 1)).position().left;
		var y1 = $('#sm_' + (line_sm - 1)).position().top;

		var length = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
		var angle  = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
		var transform = 'rotate('+angle+'deg)';

		$('.line[rel=' + line_sm + ']').css({
		  'position': 'absolute',
		  '-webkit-transform':  transform,
		  '-moz-transform':     transform,
		  'transform':          transform
		})
		.width(length);
		
		
		//check for multiple sides and handle moving lines
		if ($('.sm_square').length - 1 != line_sm) {
		
			$('.line[rel=' + (line_sm + 1) + ']').css('top', top);
			$('.line[rel=' + (line_sm + 1) + ']').css('left', left);
			
			var x1 = $('#sm_' + (line_sm + 1)).position().left;
			var y1 = $('#sm_' + (line_sm + 1)).position().top;

			var length = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
			var angle  = Math.atan2(y1 - y2, x1 - x2) * 180 / Math.PI;
			var transform = 'rotate('+angle+'deg)';
			
			$('.line[rel=' + (line_sm + 1) + ']').css({
			  'position': 'absolute',
			  '-webkit-transform':  transform,
			  '-moz-transform':     transform,
			  'transform':          transform
			})
			.width(length);
		
        }
        
        mouse.update(e);
        e.preventDefault();
		
      });
      $document.one('mouseup.drag', function(e) {
        $document.unbind('mousemove.drag');
      });
      e.preventDefault();
    });  
  });
}

//modified version of http://monkeyandcrow.com/blog/drawing_lines_with_css3/
function createLine(sm_id, x1,y1, x2,y2){
	var length = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
	var angle  = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
	var transform = 'rotate('+angle+'deg)';

    var line = $('<div>')
        .appendTo('body')
        .addClass('line')
        .css({
          'position': 'absolute',
          '-webkit-transform':  transform,
		  '-moz-transform':     transform,
		  'transform':          transform
        })
		.attr('rel', sm_id)
        .width(length)
        .offset({left: x1, top: y1});

    return line;
}

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/math/is-point-in-poly [v1.0]

function isPointInPoly(poly, pt){
	for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
		((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
		&& (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
		&& (c = !c);
	return c;
}

