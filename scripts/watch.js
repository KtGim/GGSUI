const chokidar = require('chokidar');
const fs = require('fs');
const {resolve, join} = require('path');
const buildRoutesTemplate = require('./buildRoutesTemplate')

const buildRoutes = require('./buildRoutes');
const buildDoc = require('./buildDoc');

const { danger } = require('./chalkLog');

const watcher = chokidar.watch(resolve(__dirname, '../components'), {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true
});

const root = resolve(__dirname, '../components');
const docDir = resolve(__dirname, '../docs');
const routes = resolve(__dirname, '../routes');

let leadingInNames = fs.readdirSync(root)
  .filter((f) =>
    (fs.statSync(join(root, f)).isDirectory()) && (f !== 'style')
  )

// type ActionType = 'created' | 'moved' | 'modified';
watcher
  // .on('add', path => log(`File ${path} has been added`))
  // .on('change', path => log(`File ${path} has been changed`))
  // .on('unlink', path => log(`File ${path} has been removed`))
  // .on('addDir', path => {
  //   const dir = path.split('/').pop();
  //   if(['components', 'style'].indexOf(dir) === -1) {
  //     const leadingInNames = fs.readdirSync(root)
  //       .filter(async (f) =>
  //         await fs.statSync(join(root, f)).isDirectory() && f !== 'style'
  //       )
  //     (leadingInNames.indexOf(dir) === -1) && leadingInNames.push(dir);
  //     // const str = buildRoutesTemplate(leadingInNames);
  //     // log(str);
  //   }
  // })
  // .on('unlinkDir', path => log(`Directory ${path} has been removed`))
  // .on('error', error => log(`Watcher error: ${error}`))
  .on('ready', () => {
    if (leadingInNames.length) {
      buildDoc(leadingInNames, 'created')
      buildRoutes(buildRoutesTemplate(leadingInNames), 'created');
    }
  })
  .on('raw', (event, path, {type}) => { // internal
    let dir = path.split('/').pop();
    if(type === 'directory') {
      // console.log(leadingInNames, 'in', event);
      
      switch(event) {
        case 'created':
          leadingInNames.push(dir);
          break;
        case 'moved':
          leadingInNames = leadingInNames.filter(name => name !== dir);
          break;
      }

      buildDoc(dir, event);
      buildRoutes(buildRoutesTemplate(leadingInNames), 'modified')
    } else {
      dir = resolve(path, '..').split('/').pop();
      buildDoc(dir, event);
    }
  })