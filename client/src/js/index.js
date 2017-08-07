var socket = io()

socket.on('bucket.5.temperature', (value) => {
  //TODO: evaluate range
  document.querySelector('#reservoir-temperature').innerHTML = value + '°C'
  App.log('info', 'bucket.5.temperature', value)
})

socket.on('reservoir.ph', (value) => {
  document.querySelector('#reservoir-ph').innerHTML = value
  App.log('info', 'reservoir.ph', value)
})

socket.on('tent.humidity', (value) => {
  document.querySelector('#tent-humidity').innerHTML = value + '%'
  App.log('info', 'tent.humidity', value)
})

socket.on('tent.temperature', (value) => {
  document.querySelector('#tent-temperature').innerHTML = value + '°C'
  App.log('info', 'tent.temperature', value)
})

socket.on('reservoir.water_level', (value) => {
  document.querySelector('#reservoir-water-level').innerHTML = value + 'cm'
  App.log('info', 'reservoir.water_level', value)
})

socket.on('tent.infrared_spectrum', (value) => {
  document.querySelector('#tent-infrared-spectrum').innerHTML = 'IR: ' + value
  App.log('info', 'tent.infrared_spectrum', value)
})

socket.on('tent.full_spectrum', (value) => {
  document.querySelector('#tent-full-spectrum').innerHTML = 'Full: ' + value
  App.log('info', 'tent.full_spectrum', value)
})

socket.on('tent.visible_spectrum', (value) => {
  document.querySelector('#tent-visible-spectrum').innerHTML = 'Visible: ' + value
  App.log('info', 'tent.visible_spectrum', value)
})

socket.on('tent.illuminance', (value) => {
  document.querySelector('#tent-illuminance').innerHTML = value + ' Lux'
  App.log('info', 'tent.illuminance', value)
})

App.api('/status').get().success((value) => {
  document.querySelector('#ac-status').innerHTML = App.status(value)
  document.querySelector('#light-status').innerHTML = App.status(value)
  document.querySelector('#exhaust-status').innerHTML = App.status(value)
  document.querySelector('#drain-valve-status').innerHTML = App.status(value)
  document.querySelector('#fill-valve-status').innerHTML = App.status(value)
  document.querySelector('#drain-pump-status').innerHTML = App.status(value)
  document.querySelector('#grow-system-pumps-status').innerHTML = App.status(value)
}).error((err) => {
  console.log(err)
})

d3.json('/api/tent/temperature', function(data) {
  data.forEach(function(d){ d.timestamp = new Date(d.timestamp) });
  MG.data_graphic({
    data: data,
    full_width: true,
    height: 150,
    area: false,
    right: 40,
    target: document.getElementById('tent-temperature-chart'),
    missing_is_hidden: true,
    show_tooltips: false,
    x_accessor: 'timestamp',
    y_accessor: 'value'
  });
});

d3.json('/api/tent/humidity', function(data) {
  data.forEach(function(d){ d.timestamp = new Date(d.timestamp) });
  MG.data_graphic({
    data: data,
    full_width: true,
    height: 150,
    area: false,
    right: 40,
    target: document.getElementById('tent-humidity-chart'),
    missing_is_hidden: true,
    show_tooltips: false,
    x_accessor: 'timestamp',
    y_accessor: 'value'
  });
});

d3.json('/api/reservoir/water_level', function(data) {
  data.forEach(function(d){ d.timestamp = new Date(d.timestamp) });
  MG.data_graphic({
    data: data,
    full_width: true,
    height: 150,
    area: false,
    right: 40,
    target: document.getElementById('reservoir-water-level-chart'),
    missing_is_hidden: true,
    show_tooltips: false,
    x_accessor: 'timestamp',
    y_accessor: 'value'
  });
});

d3.json('/api/reservoir/ph', function(data) {
  data.forEach(function(d){ d.timestamp = new Date(d.timestamp) });
  MG.data_graphic({
    data: data,
    full_width: true,
    height: 150,
    area: false,
    right: 40,
    target: document.getElementById('reservoir-ph-chart'),
    missing_is_hidden: true,
    show_tooltips: false,
    x_accessor: 'timestamp',
    y_accessor: 'value'
  });
});

d3.json('/api/tent/illuminance', function(data) {
  data.forEach(function(d){ d.timestamp = new Date(d.timestamp) });
  MG.data_graphic({
    data: data,
    full_width: true,
    height: 150,
    area: false,
    right: 40,
    target: document.getElementById('tent-illuminance-chart'),
    missing_is_hidden: true,
    show_tooltips: false,
    x_accessor: 'timestamp',
    y_accessor: 'value'
  });
});
