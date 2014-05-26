# Install Node.js and npm via Homebrew

    brew install node

# Install yeoman, bower and grunt

    npm install -g yo

# Install AngularJS yeoman generator

    npm install -g generator-angular

# Scaffold an AngularJS app

    mkdir first-try
    cd first-try
    yo angular

# Use LESS instead of Sass

    npm install grunt-contrib-less --save-dev

# Update your **Gruntfile.js** accordingly to execute the LESS compiler:

    watch: {
      ...
      less: {
        files: ['<%= yeoman.app %>/styles/*.less'],
        tasks: ['less', 'autoprefixer'],
        options: {
          livereload: true
        }
      },
      ...
    },
    
    grunt.initConfig({
    ...
    
      less: {
        default: {
          options: {
            compress: false,
          },
          files: {
            '.tmp/styles/main.css': ['<%= yeoman.app %>/styles/*.less']
          }
        }
      }
    });
    
    grunt.loadNpmTasks('grunt-contrib-less');
    
    grunt.registerTask('serve', function (target) {
      if (target === 'dist') {
        return grunt.task.run(['build', 'connect:dist:keepalive']);
      }
    
      grunt.task.run([
        'clean:server',
        'bowerInstall',
        'less',
        'concurrent:server',
        'autoprefixer',
        'connect:livereload',
        'watch'
      ]);
    });
    
    grunt.registerTask('build', [
        'clean:dist',
        'bowerInstall',
        'less',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'ngmin',
        'copy:dist',
        'cdnify',
        'cssmin',
        'uglify',
        'rev',
        'usemin',
        'htmlmin'
      ]);

Install the *less.js* dependency though bower:

    bower install less --save

Now, running `grunt serve` will start a web server that automatically reloads the browser when a modification is done on any of the *less* files in the *styles* directory.

# Install Font Awesome

    bower install font-awesome --save

# Working on the actual application

## Styles & Layout

First, we'll need to add some initial containers and structure in the *index.html*.

Then, we'll start modifying the *main.less* by:

1. Delete the original CSS content added by Yeoman.
2. Add some media queries and sizing variables.
3. Add the styles for the root components.

## Sidebar menu

1. Create the content of the sidebar using simple `div` and `a` elements.
2. Add some simple sidebar menu styling.
3. Test the sidebar menu.

## Write some code to toggle the side menu

Before writing the code we need to install *angular-touch*:

    bower install angular-touch --save

Apparently for the install to go smooth, we first need to upgrade angular *1.2.15* to *1.2.16*. In order to do that, open *bower.json* and modify the angular dependencies versions to *1.2.16* and then run `bower install`.

Include `ngTouch` as a dependency in the app and run `grunt build` to refresh the *index.html*.

Create a root controller:

    yo angular:controller root

Add the controller logic and you should get to the point referred by [commit 31fcb](https://github.com/npacemo/beit-first-try/commit/d31fcb "Add sidebar menu interaction"):

    'use strict';
    
    angular.module('firstTryApp')
      .controller('RootCtrl', function ($scope) {
        $scope.menuSidebarShown = false;
    
        $scope.showSidebarMenu = function(visible) {
          $scope.menuSidebarShown = visible;
        };
    
        $scope.hideSidebarMenu = function() {
          $scope.menuSidebarShown = false;
        };
    
        $scope.$watch("menuSidebarShown", function() {
          $scope.updateContainerWrapperTransform();
        });
    
        $scope.updateContainerWrapperTransform = function() {
          var containerWrapper = $(".container-wrapper");
          if ($scope.menuSidebarShown) {
            containerWrapper.css("transform", "translate3d(80%, 0, 0)");
          } else {
            containerWrapper.css("transform", "");
          }
        };
      });

The controller will use *jquery*, so run `bower install jquery --save` and then `grunt build` again.

## Fixing the bugs with the sidebar navigation

At this point you should have a working interaction and you should notice there's a bug on mobile where at the end of the transition the whole application scales down. The fix for that is to disable the automatic zooming by changing the default `<meta name="viewport" content="width=device-width">` with `<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui" />`.

Do you notice the slight delay between the user gesture and the actual transition? Note there is a difference between a *click* and a *tap*.

    bower install angular-hammer --save

Load the `hmTouchEvents` module in the *app.js* and replace `ng-click` with `hm-tap`.

To run the changes interaction run `grunt clean build serve`. 

Since *angular-touch* is no longer used, we should remove this dependency:

    bower uninstall angular-touch --save

And then remove the `ngTouch` module dependency from the *app.js*.

At this point you'll notice that when the sidebar menu is toggled still the content can be scrolled. Let's fix that!

    bower install angular-jqm-events --save

Replace the `hmTouchEvents` with `jqmEvents` in the *app.js* and then replace `hm-tap` with `jqm-tam` in the *index.html*.

Test the tap-gesture is still working and then apply the following trick in the *index.html*:

    <div class="interaction-blocker sidebar-pushed" jqm-vmousedown="hideSidebarMenu()"
        jqm-vmousemove="preventDefaultEvent($event)"></div>

and once again on the `sidebar`:

    <div class="sidebar menu-sidebar" jqm-vmousemove="preventDefaultEvent($event)">
    ...
    </div>

Now clean-up the no longer user `angular-hammer` module.

    bower uninstall angular-hammer --save




## Demonstrate the Angular Model, Repeater and Filter
