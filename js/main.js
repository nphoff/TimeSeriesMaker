$(document).ready(function () {

  var accessors = [
    createTimeSeriesMaker('#canvas-1', 0, 'foo'),
    createTimeSeriesMaker('#canvas-2', 1, 'bar'),
    createTimeSeriesMaker('#canvas-3', 2, 'baz'),
  ];

  var numAccessors = 2;
  // Function that generates JSON representation of the data
  // and allows to download it
  function exportDataToJson(filename) {
    var jsonData = {
      times: [],
      values: []
      //names: []
    };
    accessors.forEach(function(accessor) {
      jsonData.times = jsonData.times.concat(accessor.getTimes());
      jsonData.values = jsonData.values.concat(accessor.getValues());
    });

    var data = 'data:application/json;charset=utf-8,'
      + encodeURIComponent(JSON.stringify(jsonData));
    $(this).attr({
      'download': filename,
      'href': data,
      'target': '_blank'
    });

  }

  // Function taht generates CSV representation of the data
  // and allows to download it
  function exportDataToCsv(filename){
    var colDelim = ',';
    var rowDelim = '\r\n';

    var csv = 'time'+colDelim+'value'+rowDelim;
    var times = [];
    var values = [];
    accessors.forEach(function(accessor) {
      times = times.concat(accessor.getTimes());
      values = values.concat(accessor.getValues());
    });
    times.map(function(v, i){
      var t = v;
      var val = values[i];
      csv += t+colDelim+val+rowDelim;
    });

    var csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);

    $(this).attr({
      'download': filename,
      'href': csvData,
      'target': '_blank'
    });

  }

  // The events are associated to hyperlinks:
  // don't do event.preventDefault() or return false
  // We actually need this to be a typical hyperlink
  $("#exportCsv").on('click', function (event) {
    var haveData = accessors.reduce(function(accessor, carry) {
      return carry || accessor.getTimes().length > 0
    })
    if(haveData){
      exportDataToCsv.apply(this, ['data.csv']);
    }

  });
  $("#exportJSON").on('click', function (event) {
    var haveData = accessors.reduce(function(accessor, carry) {
      return carry || accessor.getTimes().length > 0
    })
    if(haveData){
      exportDataToJson.apply(this, ['data.json']);
    }
  });

  /*

  $("#addNew").on("click", function(e) {
    e.preventDefault();
    console.log('was called');
    var newId = "#canvas-" + numAccessors;
    $('#canvas-container').append('<div class="row">' +
      '<div class="col-md-10 col-md-offset-1" id="' + newId + '">' +
      '</div>' +
      '</div>'
    );
    accessors.push(createTimeSeriesMaker(newId, numAccessors, 'foo'))
    numAccessors += 1
  });
  */


});
