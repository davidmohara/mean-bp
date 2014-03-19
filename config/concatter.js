var uglify = require('uglify-js'),
    fs = require('fs');

module.exports = function(options) {
        options = options || {};

        var uglies = {};

        var capture = options.capture || '-generated.js';

        var target_dir = options.target_dir;

        if (!target_dir) throw new Error('Concatter middleware requires a target directory (target_dir).');

        return function(req, res, next){
            // Pass along if we're not looking for the files.
            if ('GET' != req.method) return next();

            // Uglify the contents of the given directory
            var parts = req.originalUrl.split('/');
            var target = parts.filter(function(p){ if (~p.indexOf('-generated.js')) return p;});

            if (target.length === 0) return next();

            var dirName = target[0].split('-')[0];
            console.log('Targeting ' + dirName);

            // Find if already made ugly & not localhost
            if (req.host != 'localhost' && dirName in uglies){
                console.log('Found an ugly');
                res.send(uglies[dirName]);
                return;
            }

            path = 'public/js/' + dirName + '/';

            fs.readdir(path, function(err, files){
                var full_files = files.map(function(f){ return fs.realpathSync(path + f) });
                var ug = uglify.minify(full_files);
                uglies[dirName] = ug.code;
                res.send(ug.code);
                console.log('Sent over ' + dirName);
            });
        };
    };