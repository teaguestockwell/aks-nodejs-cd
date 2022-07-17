echo running localhost bench
autocannon http://localhost:3000/ -c 100 -d 10 -m 'GET'
echo running production bench
autocannon https://buildablekc0b119-buildablekc0-13ef.6857f2b11c5a4bfbb931.eastus.aksapp.io -c 100 -d 10 -m 'GET'