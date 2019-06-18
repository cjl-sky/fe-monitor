let util = {};
util.title = function(title) {
  title = title ? title + ' - Home' : 'Fe-Monitor';
  window.document.title = title;
};

export default util;
