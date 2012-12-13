{exec} = require 'child_process'

bin = "./node_modules/.bin"

run = (cmds...) ->
  exec cmds.join(' && '), (err, stdout, stderr) ->
    stderr = stderr.trim()
    stdout = stdout.trim()
    console.log stderr if stderr
    console.log stdout if stdout
    if err
      console.log "Failed."
    else
      console.log "Great success!"

task "build", "coffee-compile and browserify phantom", ->
  run(
    "#{bin}/coffee -c phantom.coffee"
    "#{bin}/coffee -cb shim_head.coffee"
    "rm -f shim.js shim_br.js"
    "#{bin}/browserify shim.coffee -o shim_br.js"
    "cat shim_head.js shim_br.js > shim.js"
  )
task "test", "run phantom's unit tests", -> run "#{bin}/vows --spec test/*.coffee"
