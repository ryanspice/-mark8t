import { writable } from 'svelte/store';
let phpStore = writable('');
let phpCache = {};

import * as htmlparser2 from 'htmlparser2';
import { SHA256 } from 'crypto-js';

import { Parser } from 'htmlparser2';


function formatHTML(html) {
  let indent = 0;
  let formattedHTML = '';

  const parser = new Parser({
    onopentag(name, attribs) {
      formattedHTML += ' '.repeat(indent) + '<' + name;
      for (let i in attribs) {
        formattedHTML += ' ' + i + '="' + attribs[i] + '"';
      }
      formattedHTML += '>\n';
      indent += 2;
    },
    ontext(text) {
      formattedHTML += ' '.repeat(indent) + text + '\n';
    },
    onclosetag(name) {
      indent -= 2;
      formattedHTML += ' '.repeat(indent) + '</' + name + '>\n';
    },
    oncomment(data) {
      formattedHTML += ' '.repeat(indent) + '<!--' + data + '-->\n';
    },
    onprocessinginstruction(name, data) {
      formattedHTML += ' '.repeat(indent) + '<?' + name + ' ' + data + '?>\n';
    }
  }, { decodeEntities: true });

  parser.write(html);
  parser.end();

  return formattedHTML;
}

function transformPHP(fileContent, isReverse = false) {
  let output = fileContent;
  let php = '';
  let phpHash = '';
  let doctype = '';

  if (!isReverse) {
    // Capture PHP code before doctype
    let index = output.indexOf('<!DOCTYPE');
    if (index !== -1) {
      doctype = output.substring(index, output.indexOf('>', index) + 1);
      php = output.substring(0, index);
      // Cache the PHP code and store the hash
      phpHash = SHA256(php).toString();
      phpCache[phpHash] = php;
      output = output.replace(php, phpHash);
    }
    // Replace variables
    output = output.replace(/<\?php echo (.+?); \?>/g, function (match, group1) {
      // replaces the `$text[$lang]['greeting']` to  `text.lang.greeting`
      return '{{' + group1.replace(/\[/g, '.').replace(/\]/g, '.').replace(/['"]/g, '') + '}}';
    });
  } else {
    // Look up the PHP code by its hash
    phpHash = output.substring(0, 64);
    php = phpCache[phpHash];
    // Remove the hash from the output
    output = output.substring(64);
    // Add the cached PHP code back to the output
    output = php + output;
    //add the doctype back to the start of the output
    output = doctype + output;
  }
  // Use htmlparser2to parse the output string
  const parser = new Parser({
    onopentag(name, attribs) {
      output += '<' + name;
      for (let i in attribs) {
        output += ' ' + i + '="' + attribs[i] + '"';
      }
      output += '>';
    },
    ontext(text) {
      output += text;
    },
    onclosetag(name) {
      output += '</' + name + '>';
    },
    oncomment(data) {
      output += '<!--' + data + '-->';
    },
    onprocessinginstruction(name, data) {
      if (name !== "php") {
        output += "<?" + name + " " + data + "?>";
      }
    }
  }, { decodeEntities: true });



  //parser.write(output);
  parser.end();

  return output;
}



export { phpStore, formatHTML, transformPHP };