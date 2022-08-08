echo running localhost bench
autocannon http://localhost:3000/ -c 100 -d 10 -m 'GET'
echo running production bench
autocannon https://node-boiler.teaguestockwell.com -c 100 -d 10 -m 'GET'