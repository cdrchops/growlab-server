function setCamera(e, src) {
  document.getElementById('camera').src = src
  Elem.each(document.querySelectorAll('.camera-action'), function(elem) {
    elem.classList.remove('active')
  })
  e.target.classList.add('active')
}

var socket = io()

var end = new Date().getTime()
var start = new Date().setTime(end - (12*60*60*1000))

socket.on('bucket.4.temperature', (value) => {
  //TODO: evaluate range
  document.querySelector('#reservoir-temperature').innerHTML = value + '°C'
  App.log('info', 'bucket.4.temperature', value)
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

socket.on('ac.status', (value) => {
  document.querySelector('#ac-status').innerHTML = App.status(value)
})

socket.on('light.status', (value) => {
  document.querySelector('#light-status').innerHTML = App.status(value)
})

socket.on('exhaust.status', (value) => {
  document.querySelector('#exhaust-status').innerHTML = App.status(value)
})

socket.on('drain_valve.status', (value) => {
  document.querySelector('#drain-valve-status').innerHTML = App.status(value)
})

socket.on('fill_valve.status', (value) => {
  document.querySelector('#fill-valve-status').innerHTML = App.status(value)
})

socket.on('drain_pump.status', (value) => {
  document.querySelector('#drain-pump-status').innerHTML = App.status(value)
})

socket.on('grow_system_pumps.status', (value) => {
  document.querySelector('#grow-system-pumps-status').innerHTML = App.status(value)
})

socket.on('system.state', (value) => {
  document.querySelector('#system-state').innerHTML = value
})

App.api('/info').get().success((data) => {
  var start = new Date(data.started_at)
  var now = new Date()
  var days = (now - start) / (24 * 60 * 60 * 1000)
  var weeks = days / 7

  document.querySelector('#system-state').innerHTML = data.state
  document.querySelector('#grow-stage').innerHTML = data.stage

  var info = 'Week ' + Math.ceil(weeks) + ' - Day ' + Math.round(days) + ' - ' + data.strain
  document.querySelector('#grow-info').innerHTML = info

  document.querySelector('#ac-status').innerHTML = App.status(data.relays.ac)
  document.querySelector('#light-status').innerHTML = App.status(data.relays.light)
  document.querySelector('#exhaust-status').innerHTML = App.status(data.relays.exhaust)
  document.querySelector('#drain-valve-status').innerHTML = App.status(data.relays.drain_valve)
  document.querySelector('#fill-valve-status').innerHTML = App.status(data.relays.fill_valve)
  document.querySelector('#drain-pump-status').innerHTML = App.status(data.relays.drain_pump)
  document.querySelector('#grow-system-pumps-status').innerHTML = App.status(data.relays.grow_system_pumps)

}).error((err) => {
  console.error(err)
})

d3.json('/api/bucket.4.temperature?start=' + start.toString() + '&end=' + end.toString(), function(data) {
  data.forEach(function(d){ d.timestamp = new Date(d.timestamp) });
  MG.data_graphic({
    data: data,
    full_width: true,
    height: 200,
    area: true,
    target: document.getElementById('reservoir-temperature-chart'),
    missing_is_hidden: true,
    show_tooltips: false,
    x_accessor: 'timestamp',
    y_accessor: 'value'
  });
});

d3.json('/api/tent.temperature?start=' + start.toString() + '&end=' + end.toString(), function(data) {
  data.forEach(function(d){ d.timestamp = new Date(d.timestamp) });
  MG.data_graphic({
    data: data,
    full_width: true,
    height: 200,
    area: true,
    target: document.getElementById('tent-temperature-chart'),
    missing_is_hidden: true,
    show_tooltips: false,
    x_accessor: 'timestamp',
    y_accessor: 'value',
    max_y: 28,
    min_y: 20
  });
});

d3.json('/api/tent.humidity?start=' + start.toString() + '&end=' + end.toString(), function(data) {
  data.forEach(function(d){ d.timestamp = new Date(d.timestamp) });
  MG.data_graphic({
    data: data,
    full_width: true,
    height: 200,
    area: true,
    target: document.getElementById('tent-humidity-chart'),
    missing_is_hidden: true,
    show_tooltips: false,
    x_accessor: 'timestamp',
    y_accessor: 'value'
  });
});

d3.json('/api/reservoir.water_level?start=' + start.toString() + '&end=' + end.toString(), function(data) {
  data.forEach(function(d){ d.timestamp = new Date(d.timestamp) });
  MG.data_graphic({
    data: data,
    full_width: true,
    height: 200,
    area: true,
    target: document.getElementById('reservoir-water-level-chart'),
    missing_is_hidden: true,
    show_tooltips: false,
    x_accessor: 'timestamp',
    y_accessor: 'value'
  });
});

d3.json('/api/reservoir.ph?start=' + start.toString() + '&end=' + end.toString(), function(data) {
  data.forEach(function(d){ d.timestamp = new Date(d.timestamp) });
  MG.data_graphic({
    data: data,
    full_width: true,
    height: 200,
    area: true,
    target: document.getElementById('reservoir-ph-chart'),
    missing_is_hidden: true,
    show_tooltips: false,
    x_accessor: 'timestamp',
    y_accessor: 'value'
  });
});

d3.json('/api/tent.illuminance?start=' + start.toString() + '&end=' + end.toString(), function(data) {
  data.forEach(function(d){ d.timestamp = new Date(d.timestamp) });
  MG.data_graphic({
    data: data,
    full_width: true,
    height: 200,
    area: true,
    target: document.getElementById('tent-illuminance-chart'),
    missing_is_hidden: true,
    show_tooltips: false,
    x_accessor: 'timestamp',
    y_accessor: 'value'
  });
});
