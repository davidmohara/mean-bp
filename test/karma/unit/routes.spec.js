(function(){
    'use strict';

    describe('Routes', function(){

        // load
        beforeEach(module('appname'));

        var routes;

        beforeEach(inject(function($route){
            routes = $route;
        }));

        it('Should respond for "/"', function(){
            expect(routes.routes['/'].templateUrl).toEqual('views/index.html');
        });
    });

})();
