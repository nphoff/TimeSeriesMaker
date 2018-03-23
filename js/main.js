$(document).ready(function () {

  var accessors = [
    createTimeSeriesMaker('#canvas', 1, 'foo'),
    createTimeSeriesMaker('#canvas-test', 2, 'bar'),
  ];
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


});
